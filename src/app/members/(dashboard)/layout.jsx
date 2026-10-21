import { Suspense } from 'react';
import Dashboard from '@/components/members/Dashboard';

// One dashboard instance for every member section, so navigation keeps the
// loaded workspace, the sidebar and open panels instead of remounting and
// refetching on each click. The pages below only provide metadata and 404s.
export default function MembersDashboardLayout({ children }) {
  return <><Suspense fallback={<p>Loading Aram…</p>}><Dashboard/></Suspense>{children}</>;
}
