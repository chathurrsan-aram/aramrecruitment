import { allowedEmail, checkOrigin, createMemberClient, memberSiteUrl } from '@/lib/members/auth';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store, private', Pragma: 'no-cache', Expires: '0' };
function redirect(url) { return new Response(null, { status: 303, headers: { ...headers, Location: url.toString() } }); }
async function readForm(request) {
  const reader = request.body?.getReader(); const chunks = []; let length = 0;
  if (reader) { try { for (;;) { const {done,value} = await reader.read(); if (done) break; length += value.byteLength; if (length > 2048) { await reader.cancel(); throw new Error('Form too large'); } chunks.push(value); } } finally { reader.releaseLock(); } }
  const body = new Uint8Array(length); let offset = 0; for (const part of chunks) { body.set(part,offset); offset += part.byteLength; }
  return new URLSearchParams(new TextDecoder('utf-8', {fatal:true}).decode(body));
}
export async function POST(request) {
  try {
    checkOrigin(request);
    if (Number(request.headers.get('content-length') || 0) > 2048) return Response.json({ error: 'Form too large.' }, { status: 413, headers });
    if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) return Response.json({ error: 'Unsupported form.' }, {status:415,headers});
    const form = await readForm(request);
    const email = String(form.get('email') || '').trim().toLowerCase();
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return redirect(new URL('/members/login?status=invalid', request.url));
    if (allowedEmail(email)) {
      const client = await createMemberClient();
      const { error } = await client.auth.signInWithOtp({ email, options: { emailRedirectTo: `${memberSiteUrl()}/members/auth/callback`, shouldCreateUser: true } });
      if (error) return redirect(new URL('/members/login?status=unavailable', request.url));
    }
    return redirect(new URL('/members/login?status=sent', request.url));
  } catch {
    return redirect(new URL('/members/login?status=unavailable', request.url));
  }
}
