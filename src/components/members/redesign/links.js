import { memberPaths, projectPath } from '@/lib/members/presentation';
import { thoughtLeadership } from '@/data/community';

/** Destinations shared by the V3–V5 redesign previews on /p1. */
export const links = {
  initiatives: memberPaths.Initiatives,
  ledger: memberPaths['Funding & ledger'],
  vote: memberPaths['Community vote'],
  updates: memberPaths['Field updates'],
  insights: memberPaths['Thought leadership'],
  events: memberPaths['Community events'],
  microcredit: projectPath('microcredit'),
  research: '/research',
  team: '/about',
  join: '/join',
  signIn: '/members/login',
  signOut: '/members/logout',
};

export const featuredInsight = thoughtLeadership[0];

export const shareCaption = 'I’ve joined Aram, a diaspora community funding long-term, community-led work in Sri Lanka. Together we’ve sent £8,150 to local partners so far. Find your part in the work at join.aram.org.uk';

export const shareLinks = [
  { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(shareCaption)}` },
  { label: 'Instagram', href: 'https://www.instagram.com/aram.initiative/' },
  { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.aram.org.uk/join')}` },
];

export const ledgerPreview = [
  { date: '15 Oct 2026', label: 'Member contributions', amount: '+£[amount]', incoming: true },
  { date: '[date]', label: 'Microcredit Revolving Fund, with Vanni Hope', amount: '−£[amount]' },
  { date: '[date]', label: 'Member contributions', amount: '+£[amount]', incoming: true },
  { date: '[date]', label: '[Initiative and partner]', amount: '−£[amount]' },
];

// Display face for the V4 and V5 headlines; Poppins and JetBrains Mono come from the root layout.
export const displayFont ='https://fonts.googleapis.com/css2?family=Baloo+Thambi+2:wght@600;700;800&display=swap';
