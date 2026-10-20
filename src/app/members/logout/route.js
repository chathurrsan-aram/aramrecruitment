import { checkOrigin, createMemberClient, memberSiteUrl } from '@/lib/members/auth';
export const dynamic = 'force-dynamic';
export async function GET() {
  return new Response('<!doctype html><html><head><title>Sign out · Aram</title></head><body><main><h1>Sign out of your private dashboard?</h1><form method="post" action="/members/logout"><button>Sign out</button></form><p><a href="/members">Return to dashboard</a></p></main></body></html>', { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store, private', 'Content-Security-Policy': "default-src 'none'; form-action 'self'; base-uri 'none'" } });
}
export async function POST(request) {
  try { checkOrigin(request); const client = await createMemberClient(); const { error } = await client.auth.signOut(); if (error) throw error; }
  catch { return new Response('Unable to sign out. Please return to Aram and try again.', { status: 403, headers: { 'Cache-Control': 'no-store, private', Pragma: 'no-cache', Expires: '0' } }); }
  return new Response(null, {status:303,headers:{Location:`${memberSiteUrl()}/members`,'Cache-Control':'no-store, private',Pragma:'no-cache',Expires:'0'}});
}
