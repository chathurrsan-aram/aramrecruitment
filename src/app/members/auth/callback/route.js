import { createMemberClient, requireMember, memberSiteUrl } from '@/lib/members/auth';
export const dynamic = 'force-dynamic';
function redirect(url) { return new Response(null, { status: 303, headers: { Location: url, 'Cache-Control': 'no-store, private', Pragma: 'no-cache', Expires: '0' } }); }
export async function GET(request) {
  const target = memberSiteUrl();
  const code = new URL(request.url).searchParams.get('code');
  try {
    if (!code) throw new Error('Missing code');
    const client = await createMemberClient();
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (error) throw error;
    await requireMember();
    return redirect(`${target}/members`);
  } catch {
    return redirect(`${target}/members/login?status=expired`);
  }
}
