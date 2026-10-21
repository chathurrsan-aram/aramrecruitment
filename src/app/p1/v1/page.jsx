import Dashboard from '@/components/members/v1/Dashboard';
import '../versions.css';

export const metadata = { title: 'V1 · Before Feedback', robots: { index: false, follow: false } };

export default function OriginalDashboardPage() {
  return <><Dashboard/><a className="version-return" href="/p1">← Versions</a></>;
}
