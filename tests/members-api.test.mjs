import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { createSeedState } from '../src/lib/members/seed.js';

const key = Symbol.for('aram.members.api-tests');
const encoded = source => `data:text/javascript,${encodeURIComponent(source)}`;
const authUrl = new URL('../src/lib/members/auth.js', import.meta.url).href;
const previous = Object.fromEntries(['MEMBERS_SUPABASE_URL', 'MEMBERS_SUPABASE_PUBLISHABLE_KEY', 'MEMBERS_ALLOWED_EMAILS', 'MEMBERS_SITE_URL', 'NODE_ENV'].map(name => [name, process.env[name]]));
Object.assign(process.env, { MEMBERS_SUPABASE_URL: 'https://test.invalid', MEMBERS_SUPABASE_PUBLISHABLE_KEY: 'test-publishable-key', MEMBERS_ALLOWED_EMAILS: 'owner@example.test', MEMBERS_SITE_URL: 'https://www.aram.org.uk', NODE_ENV: 'production' });
after(() => { for (const [name, value] of Object.entries(previous)) { if (value === undefined) delete process.env[name]; else process.env[name] = value; } });

registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier === '@/lib/members/auth') return { url: authUrl, shortCircuit: true };
  if (specifier === 'next/headers') return { shortCircuit: true, url: encoded('export async function cookies(){return globalThis[Symbol.for("aram.members.api-tests")].jar;}') };
  if (specifier === '@supabase/ssr') return { shortCircuit: true, url: encoded('export function createServerClient(url,key,options){return globalThis[Symbol.for("aram.members.api-tests")].makeClient(options);}') };
  if (specifier.endsWith('/members/storage.js')) return { shortCircuit: true, url: encoded(`
    const env=()=>globalThis[Symbol.for('aram.members.api-tests')];
    export async function loadWorkspace(owner){env().loads.push(owner);return structuredClone(env().state);}
    export async function readWorkspace(owner){env().reads.push(owner);return structuredClone(env().state);}
    export async function saveWorkspace(owner,state,version){env().saves.push({owner,version});if(env().conflict)return false;env().state=structuredClone(state);return true;}
  `) };
  return nextResolve(specifier, context);
} });

const dashboard = await import('../src/app/api/members/dashboard/route.js');
const login = await import('../src/app/api/members/login/route.js');
const callback = await import('../src/app/members/auth/callback/route.js');
const logout = await import('../src/app/members/logout/route.js');

function environment() {
  const env = { cookies: [], clients: 0, loads: [], reads: [], saves: [], otp: [], state: createSeedState(), conflict: false,
    user: { id: 'owner-uid', email: 'owner@example.test', email_confirmed_at: '2026-10-20T12:00:00Z' }, allowed: true, exchangeError: null };
  env.jar = {
    getAll: () => env.cookies.map(cookie => ({ ...cookie })),
    set: (name, value, options) => { env.cookies = env.cookies.filter(cookie => cookie.name !== name); env.cookies.push({ name, value, options }); },
  };
  env.makeClient = options => {
    env.clients++;
    return {
      auth: {
        getUser: async () => ({ data: { user: env.user }, error: null }),
        signInWithOtp: async input => {
          env.otp.push(input);
          options.cookies.setAll([{ name: 'sb-test-code-verifier', value: 'test-verifier', options: { path: '/members' } }], { 'Cache-Control': 'private, no-store' });
          return { error: null };
        },
        exchangeCodeForSession: async () => {
          if (env.exchangeError || !options.cookies.getAll().some(cookie => cookie.name === 'sb-test-code-verifier')) return { error: new Error('Invalid verifier') };
          options.cookies.setAll([{ name: 'sb-test-auth-token', value: 'test-session', options: { path: '/members' } }], { 'Cache-Control': 'private, no-store' });
          return { error: null };
        },
        signOut: async () => { if (env.signOutError) return { error: new Error('Session unavailable') }; env.cookies = []; return { error: null }; },
      },
      from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: env.allowed ? { email: env.user.email } : null, error: null }) }) }) }),
    };
  };
  env.signIn = () => { env.cookies = [{ name: 'sb-test-auth-token', value: 'test-session' }]; };
  globalThis[key] = env;
  return env;
}

const mutation = { version: 0, action: { type: 'updateMember', monthlyPence: 4000 } };
function request(path = '/api/members/dashboard', body = JSON.stringify(mutation), headers = {}) {
  return new Request(`https://www.aram.org.uk${path}`, { method: 'POST', body, headers: { origin: 'https://www.aram.org.uk', 'content-type': 'application/json', ...headers } });
}
function privateResponse(response) {
  assert.ok(response.headers.get('cache-control')?.includes('no-store'));
  assert.ok(response.headers.get('cache-control')?.includes('private'));
}

test('public GET returns only freshly created sample data without constructing auth/database clients', async () => {
  const env = environment();
  env.state.member.name = 'Private owner name';
  env.state.updates[0].body = 'Private saved note';
  const response = await dashboard.GET();
  const body = await response.json();
  assert.equal(response.status, 200);
  privateResponse(response);
  assert.equal(response.headers.get('vary'), 'Cookie');
  assert.equal(body.access.mode, 'public-demo');
  assert.equal(body.member.name, 'Demo member');
  assert.equal(JSON.stringify(body).includes('Private saved note'), false);
  assert.equal(JSON.stringify(body).includes('Chath'), false);
  assert.equal(env.clients, 0);
  assert.deepEqual(env.loads, []);
});

test('unconfirmed and forbidden users see a sample and cannot write private workspaces', async () => {
  for (const change of [env => { env.user.email_confirmed_at = null; }, env => { env.user.email = 'other@example.test'; }, env => { env.allowed = false; }]) {
    const env = environment(); env.signIn(); change(env);
    assert.equal((await (await dashboard.GET()).json()).access.mode, 'public-demo');
    const response = await dashboard.POST(request());
    assert.ok([401, 403].includes(response.status));
    privateResponse(response);
    assert.deepEqual(env.loads, []);
    assert.deepEqual(env.saves, []);
  }
});

test('authenticated reads and writes derive the owner from verified identity', async () => {
  const env = environment(); env.signIn();
  const loaded = await dashboard.GET();
  assert.equal((await loaded.json()).access.mode, 'private');
  const saved = await dashboard.POST(request());
  privateResponse(saved);
  assert.equal((await saved.json()).member.monthlyPence, 4000);
  assert.deepEqual(env.loads, ['owner-uid', 'owner-uid']);
  assert.deepEqual(env.saves, [{ owner: 'owner-uid', version: 0 }]);
  const response = await dashboard.POST(request(undefined, JSON.stringify({ ...mutation, ownerId: 'different-owner' })));
  assert.equal(response.status, 400);
  assert.equal(env.saves.length, 1);
});

test('CSRF checks reject missing, foreign and misleading origins before loading private state', async () => {
  const env = environment(); env.signIn();
  for (const origin of ['', 'https://evil.example', 'https://www.aram.org.uk.evil.example', 'null']) {
    assert.equal((await dashboard.POST(request(undefined, undefined, { origin }))).status, 403);
  }
  assert.equal((await dashboard.POST(request(undefined, undefined, { 'sec-fetch-site': 'cross-site' }))).status, 403);
  assert.deepEqual(env.loads, []);
  assert.equal((await dashboard.POST(request(undefined, undefined, { origin: 'https://aram.org.uk' }))).status, 200);
});

test('JSON mutations enforce actual byte limits, content type and strict schema', async () => {
  const env = environment(); env.signIn();
  assert.equal((await dashboard.POST(request(undefined, undefined, { 'content-type': 'application/jsonp' }))).status, 415);
  assert.equal((await dashboard.POST(request(undefined, ' '.repeat(32769), { 'content-length': '1' }))).status, 413);
  assert.equal((await dashboard.POST(request(undefined, '{'))).status, 400);
  assert.equal((await dashboard.POST(request(undefined, JSON.stringify({ version: 0, action: { ...mutation.action, ownerId: 'another-owner' } })))).status, 400);
  assert.deepEqual(env.loads, []);
});

test('stale and concurrent saves return the current private state with no-store headers', async () => {
  const env = environment(); env.signIn();
  env.state.version = 2;
  let response = await dashboard.POST(request());
  assert.equal(response.status, 409); privateResponse(response);
  assert.equal((await response.json()).state.version, 2);
  env.state.version = 0; env.conflict = true;
  response = await dashboard.POST(request());
  assert.equal(response.status, 409); privateResponse(response);
  assert.equal((await response.json()).state.access.mode, 'private');
  assert.deepEqual(env.reads, ['owner-uid']);
});

test('login bounds actual URL-encoded bytes and never sends links for foreign email addresses', async () => {
  const env = environment();
  const formHeaders = { 'content-type': 'application/x-www-form-urlencoded' };
  let response = await login.POST(request('/api/members/login', 'email=other%40example.test', formHeaders));
  assert.equal(response.status, 303); privateResponse(response);
  assert.deepEqual(env.otp, []);
  response = await login.POST(request('/api/members/login', 'email=owner%40example.test&padding=' + 'x'.repeat(2049), { ...formHeaders, 'content-length': '1' }));
  privateResponse(response);
  assert.deepEqual(env.otp, []);
  response = await login.POST(request('/api/members/login', 'email=owner%40example.test', { ...formHeaders, origin: 'https://evil.example' }));
  privateResponse(response);
  assert.deepEqual(env.otp, []);
});

test('PKCE cookie adapter remains readable at callback and emits root-path HttpOnly secure cookies', async () => {
  const env = environment();
  const response = await login.POST(request('/api/members/login', 'email=owner%40example.test', { 'content-type': 'application/x-www-form-urlencoded' }));
  privateResponse(response);
  assert.equal(env.otp[0].options.emailRedirectTo, 'https://www.aram.org.uk/members/auth/callback');
  const verifier = env.cookies.find(cookie => cookie.name === 'sb-test-code-verifier');
  assert.deepEqual({ path: verifier.options.path, httpOnly: verifier.options.httpOnly, secure: verifier.options.secure, sameSite: verifier.options.sameSite }, { path: '/', httpOnly: true, secure: true, sameSite: 'lax' });
  const result = await callback.GET(new Request('https://www.aram.org.uk/members/auth/callback?code=test-code'));
  assert.equal(result.headers.get('location'), 'https://www.aram.org.uk/members');
  privateResponse(result);
  assert.ok(env.cookies.some(cookie => cookie.name === 'sb-test-auth-token'));
});

test('callback failures remain private and logout GET cannot change sessions', async () => {
  const env = environment();
  const result = await callback.GET(new Request('https://www.aram.org.uk/members/auth/callback?code=missing-verifier'));
  assert.equal(result.headers.get('location'), 'https://www.aram.org.uk/members/login?status=expired');
  privateResponse(result);
  env.signIn();
  const response = await logout.GET(); privateResponse(response);
  assert.equal(env.cookies.length, 1);
  const signedOut = await logout.POST(request('/members/logout', ''));
  privateResponse(signedOut);
  assert.equal(env.cookies.length, 0);
});


test('logout failure reports failure without claiming the session ended', async () => {
  const env = environment(); env.signIn(); env.signOutError = true;
  const response = await logout.POST(request('/members/logout', ''));
  assert.equal(response.status, 403); privateResponse(response);
  assert.equal(env.cookies.length, 1);
});
