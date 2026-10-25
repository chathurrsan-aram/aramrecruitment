import './versions.css';
import { memberPaths } from '@/lib/members/presentation';

export const metadata = { title: 'Dashboard Versions', robots: { index: false, follow: false } };

const versions = [
  { name: 'V1', note: 'Before the feedback', href: '/p1/v1' },
  { name: 'V2', note: 'The updated experience', href: memberPaths.Overview },
  { name: 'V3', note: 'Members overview', href: '/p1/v3' },
  { name: 'V4', note: 'Member dashboard, Aram brand', href: '/p1/v4' },
  { name: 'V5', note: 'Member home, the best of all', href: '/p1/v5' },
];

export default function VersionsPage() {
  return <main className="aram-version-index"><div className="version-index-content"><img src="/members/aram-logo.png" width="120" height="120" alt="The Aram Initiative"/><span className="version-eyebrow">Members dashboard</span><h1>See how it’s evolving.</h1><p>Five versions. One place to compare.</p><div className="version-choices">{versions.map(v => <a key={v.name} href={v.href}><strong>{v.name}</strong><span>{v.note}</span><span aria-hidden="true">↗</span></a>)}</div></div></main>;
}
