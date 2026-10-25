import Home from '@/components/members/v5/Home';
import '../versions.css';

export const metadata = { title: 'V5 · Member Home', robots: { index: false, follow: false } };

export default function MemberHomePage() {
  return <><Home/><a className="version-return" href="/p1">← Versions</a></>;
}
