import Overview from '@/components/members/v3/Overview';
import '../versions.css';

export const metadata = { title: 'V3 · Members Overview', robots: { index: false, follow: false } };

export default function MembersOverviewPage() {
  return <><Overview/><a className="version-return" href="/p1">← Versions</a></>;
}
