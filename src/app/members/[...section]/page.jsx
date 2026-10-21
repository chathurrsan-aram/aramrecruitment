import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Dashboard from '@/components/members/Dashboard';
import { parseMembersPath } from '@/lib/members/presentation';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Members', robots: { index: false, follow: false } };
export default async function MembersSection({ params }) {
  const { section } = await params;
  if (parseMembersPath(`/members/${section.join('/')}`).view === 'Not found') notFound();
  return <Suspense fallback={<p>Loading Aram…</p>}><Dashboard/></Suspense>;
}
