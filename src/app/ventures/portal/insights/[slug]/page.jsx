import { insightPages } from '@/data/insightPages';
import InsightDetailClient from './InsightDetailClient';

export function generateStaticParams() {
  return insightPages.map(page => ({
    slug: page.slug,
  }));
}

export default function InsightDetailPage({ params }) {
  return <InsightDetailClient />;
}
