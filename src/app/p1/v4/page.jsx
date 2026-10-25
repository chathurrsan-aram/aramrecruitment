import Dashboard from '@/components/members/v4/Dashboard';
import '../versions.css';

export const metadata = { title: 'V4 · Member Dashboard', robots: { index: false, follow: false } };

export default function MemberDashboardPage() {
  return <><Dashboard/><a className="version-return" href="/p1">← Versions</a></>;
}
