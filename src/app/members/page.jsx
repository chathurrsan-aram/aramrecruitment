import Dashboard from '@/components/members/Dashboard';

export const metadata = {
  title: 'Members',
  description: 'Your connection to Aram initiatives, community updates and demonstration funding records.',
  robots: { index: false, follow: false },
};

export default function MembersPage() {
  return <Dashboard />;
}
