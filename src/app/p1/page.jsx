import './versions.css';

export const metadata = { title: 'Dashboard Versions', robots: { index: false, follow: false } };

export default function VersionsPage() {
  return <main className="aram-version-index"><div className="version-index-content"><img src="/members/aram-logo.png" width="120" height="120" alt="The Aram Initiative"/><span className="version-eyebrow">Members dashboard</span><h1>See how it’s evolving.</h1><p>Two versions. One place to compare.</p><div className="version-choices"><a href="/p1/v1"><strong>V1</strong><span>Before the feedback</span><span aria-hidden="true">↗</span></a><a href="/members"><strong>V2</strong><span>The updated experience</span><span aria-hidden="true">↗</span></a></div></div></main>;
}
