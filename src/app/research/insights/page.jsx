import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ThoughtLeadership } from '@/components/community/CommunityContent';

export const metadata = {
  title: 'Thought Leadership | Research & Insights',
  description: 'Articles and reflections from Aram Research & Insights on community-led development and connections with Sri Lanka.',
  alternates: { canonical: '/research/insights' },
};

export default function InsightsPage() {
  return <div className="community-public-page"><header className="community-public-header"><span>Research & Insights · Thought leadership</span><h1>Ideas worth<br/>staying with.</h1><p>Perspectives on community, development and our connection to Sri Lanka. Read, reflect, and bring a question back to the work.</p></header><ThoughtLeadership/><nav className="community-public-crosslink" aria-label="Explore Aram"><Link href="/community/events">Meet the community<ArrowRight size={16}/></Link><Link href="/members/insights">Read in your dashboard<ArrowRight size={16}/></Link></nav></div>;
}
