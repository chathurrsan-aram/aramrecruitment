import { notFound } from 'next/navigation';
import { parseSection } from '@/components/members/redesign/routes';

export const dynamic = 'force-dynamic';

// Section URLs are validated here; the version itself is rendered by the shared layout.
export default async function VersionSection({ params }) {
  const { section } = await params;
  if (parseSection(section).view === 'not-found') notFound();
  return null;
}
