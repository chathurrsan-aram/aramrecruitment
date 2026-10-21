import { notFound } from 'next/navigation';
import { parseMembersPath } from '@/lib/members/presentation';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Members', robots: { index: false, follow: false } };

// Section and initiative URLs are validated here; the dashboard is rendered by the shared layout.
export default async function MembersSection({ params }) {
  const { section } = await params;
  if (parseMembersPath(`/members/${section.join('/')}`).view === 'Not found') notFound();
  return null;
}
