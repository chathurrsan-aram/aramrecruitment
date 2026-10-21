import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CommunityEvents } from '@/components/community/CommunityContent';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Community Events',
  description: 'Find announced Aram community gatherings and explore bringing your ideas and skills to the team.',
  alternates: { canonical: '/community/events' },
};

export default async function EventsPage() {
  // eslint-disable-next-line react-hooks/purity -- This dynamic server page filters events at request time.
  const requestTime = Date.now();
  return <div className="community-public-page"><header className="community-public-header"><span>The Aram community</span><h1>Good things begin<br/>with a conversation.</h1><p>A place to come together, exchange ideas and find your part in Aram.</p></header><CommunityEvents now={requestTime}/><nav className="community-public-crosslink" aria-label="Explore Aram"><Link href="/research/insights">Explore our thinking<ArrowRight size={16}/></Link><Link href="/members/events">Events in your dashboard<ArrowRight size={16}/></Link></nav></div>;
}
