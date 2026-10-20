import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { DomainError } from './domain.js';

export function allowedEmail(email) {
  return typeof email === 'string' && (process.env.MEMBERS_ALLOWED_EMAILS || '').split(',').map(v => v.trim().toLowerCase()).filter(Boolean).includes(email.trim().toLowerCase());
}
export function memberSiteUrl() {
  const url = new URL(process.env.MEMBERS_SITE_URL || 'https://www.aram.org.uk');
  return url.origin;
}
export function checkOrigin(request) {
  const origin = request.headers.get('origin');
  const aliases = new Set(['https://aram.org.uk', 'https://www.aram.org.uk']);
  const target = new URL(request.url).origin;
  if (!origin || request.headers.get('sec-fetch-site') === 'cross-site' || (origin !== target && !(aliases.has(origin) && aliases.has(target)))) {
    throw new DomainError('Please use the form on the Aram website.', 'INVALID_ORIGIN', 403);
  }
}
export async function createMemberClient() {
  const url = process.env.MEMBERS_SUPABASE_URL;
  const key = process.env.MEMBERS_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new DomainError('Private sign-in is being configured. The public demo is available.', 'AUTH_NOT_CONFIGURED', 503);
  const jar = await cookies();
  return createServerClient(url, key, {
    cookieOptions: { path: '/members', sameSite: 'lax', secure: process.env.NODE_ENV === 'production', httpOnly: true },
    cookies: {
      getAll: () => jar.getAll(),
      setAll: values => { for (const { name, value, options } of values) jar.set(name, value, { ...options, path: '/', httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' }); },
    },
  });
}
export async function requireMember() {
  const jar = await cookies();
  if (!jar.getAll().some(c => c.name.startsWith('sb-'))) throw new DomainError('Sign in to save private changes.', 'UNAUTHENTICATED', 401);
  const client = await createMemberClient();
  const { data, error } = await client.auth.getUser();
  const user = data?.user;
  if (error || !user || !user.email_confirmed_at) throw new DomainError('Please sign in again.', 'UNAUTHENTICATED', 401);
  if (!allowedEmail(user.email)) throw new DomainError('This account cannot edit the private dashboard.', 'FORBIDDEN', 403);
  const { data: allowed, error: accessError } = await client.from('members_allowed_emails').select('email').eq('email', user.email.toLowerCase()).maybeSingle();
  if (accessError) throw new DomainError('Private membership could not be verified.', 'ACCESS_UNAVAILABLE', 503);
  if (!allowed) throw new DomainError('This account cannot edit the private dashboard.', 'FORBIDDEN', 403);
  return { userId: user.id, email: user.email, displayName: user.email.split('@')[0] };
}
