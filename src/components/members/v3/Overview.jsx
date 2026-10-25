// V3 · Members overview, from the Aram Members Redesign canvas. Static preview with sample figures.
import { ArrowRight, BookOpen, CalendarDays, Check, FileText, Globe2, Home, Wallet } from 'lucide-react';
import './v3.css';
import { featuredInsight, ledgerPreview, links } from '../redesign/links';

const nav = [
  { name: 'Overview', icon: Home, href: '/p1/v3', current: true },
  { name: 'Initiatives', icon: Globe2, href: links.initiatives },
  { name: 'Fund and ledger', icon: Wallet, href: links.ledger },
  { name: 'Community vote', icon: Check, href: links.vote },
  { name: 'Field updates', icon: FileText, href: links.updates },
  { name: 'Thought leadership', icon: BookOpen, href: links.insights },
  { name: 'Events', icon: CalendarDays, href: links.events },
];
const totals = [
  ['Money in', '£13,125', 'Member contributions'],
  ['Money out', '£8,150', 'Sent to partners'],
  ['Held', '£4,975', 'Awaiting the next vote'],
  ['People reached', '186', 'Reported by partners'],
];
const split = [['Livelihoods', 66, '#5E3F8C'], ['Education', 22, '#A88BD6'], ['Connection', 12, '#F2B33D']];

export default function Overview() {
  return <div className="aram-v3">
    <aside className="v3-side">
      <div className="v3-brand"><img src="/members/aram-logo.png" width="56" height="56" alt="The Aram Initiative"/><span>Members area</span></div>
      <nav className="v3-nav" aria-label="Members">
        {nav.map(({ name, icon: Icon, href, current }) => <a key={name} href={href} aria-current={current ? 'page' : undefined}><Icon size={18} strokeWidth={1.8} aria-hidden="true"/>{name}</a>)}
      </nav>
      <div className="v3-side-foot">
        <div className="v3-how"><strong>How Aram works</strong><p>Discovery, research and long-term initiatives, led by the communities we work with.</p><a href={links.team}>Meet the team</a></div>
        <div className="v3-member"><span aria-hidden="true">DM</span><div><strong>Demo member</strong><small>Member since [month year]</small></div></div>
      </div>
    </aside>

    <main className="v3-main">
      <header className="v3-top">
        <div className="v3-status">
          <p className="v3-live"><i aria-hidden="true"/>Live<span aria-hidden="true">·</span><strong>£8,150 deployed across 4 initiatives</strong></p>
          <span className="v3-sample">Sample figures while we build</span>
        </div>
        <div className="v3-actions"><a className="v3-btn" href={links.signIn}>Sign in</a><a className="v3-btn v3-btn-primary" href={links.join}>Join Aram</a></div>
      </header>

      <section className="v3-hero" aria-labelledby="v3-hero-title">
        <div className="v3-hero-body">
          <div className="v3-hero-copy">
            <span className="v3-hero-eyebrow">Members · October 2026</span>
            <h1 id="v3-hero-title">Find your part in the work.</h1>
            <p>Every pound members give is pooled, voted on and sent to community partners in Sri Lanka. This page shows where it went and what you can do next.</p>
            <div className="v3-hero-ctas"><a className="v3-cta-gold" href={links.initiatives}>Explore the initiatives<ArrowRight size={16} strokeWidth={2} aria-hidden="true"/></a><a className="v3-cta-ghost" href="#v3-money">See where the money went</a></div>
          </div>
          <div className="v3-hero-map">
            <img src="/members/sri-lanka-districts.svg" width="200" height="330" alt="Map of Sri Lanka’s 25 districts, with districts where Aram works highlighted"/>
            <div>
              <strong>Rooted in Sri Lanka. Connected across borders.</strong>
              <span><i aria-hidden="true" className="v3-key-active"/>Active work</span>
              <span><i aria-hidden="true" className="v3-key-planned"/>Planned work</span>
              <a href={links.research}>Open the research map</a>
            </div>
          </div>
        </div>
        <dl className="v3-totals">{totals.map(([label, value, note]) => <div key={label}><dt>{label}</dt><dd><strong>{value}</strong><span>{note}</span></dd></div>)}</dl>
      </section>

      <section id="v3-money" className="v3-section" aria-labelledby="v3-money-title">
        <div className="v3-section-head"><div><h2 id="v3-money-title">Where the money went</h2><p>Every pound in and out, straight from the fund’s account.</p></div><a href={links.ledger}>Open the full ledger</a></div>
        <div className="v3-money">
          <div className="v3-card v3-split">
            <h3>How £8,150 was split</h3>
            <div className="v3-split-bar" aria-hidden="true">{split.map(([name, pct, color]) => <i key={name} style={{ flex: pct, background: color }}/>)}</div>
            <ul>{split.map(([name, pct, color]) => <li key={name}><span><i aria-hidden="true" style={{ background: color }}/>{name}</span><strong>{pct}%</strong></li>)}</ul>
            <p>Members vote on each award. Money is held until a vote closes and a partner agreement is signed.</p>
          </div>
          <div className="v3-card v3-ledger">
            <div className="v3-ledger-meta"><span>Source · [bank or provider]</span><span>Updated · [date and time]</span></div>
            <div className="v3-ledger-scroll"><ul>{ledgerPreview.map((row, i) => <li key={i}><span>{row.date}</span><span>{row.label}</span><span className={row.incoming ? 'v3-in' : undefined}>{row.amount}</span></li>)}</ul></div>
            <p className="v3-running"><span>Running costs this month</span><strong>£[amount], listed in full</strong></p>
          </div>
        </div>
      </section>

      <section className="v3-section" aria-labelledby="v3-init-title">
        <div className="v3-section-head"><div><h2 id="v3-init-title">What we are funding</h2><p>Four initiatives across Aram’s three pillars, one of them still a concept.</p></div><a href={links.initiatives}>See all initiatives</a></div>
        <div className="v3-funding">
          <article className="v3-card v3-feature">
            <img src="/members/aram-community.jpg" alt="Aram members in conversation with community members in Sri Lanka"/>
            <div className="v3-feature-body">
              <div className="v3-tags"><span>Economic development</span><span className="v3-tag-gold">In progress</span></div>
              <h3>Microcredit Revolving Fund</h3>
              <p>Small loans for local livelihoods in the Eastern Province. As each loan is repaid, the money goes out again to the next family. Aram works with Vanni Hope on support and training.</p>
              <div className="v3-progress"><div><span><strong>£8,250</strong> of £12,000</span><span>69% funded</span></div><div className="v3-track" aria-hidden="true"><i style={{ width: '69%' }}/></div></div>
              <dl className="v3-facts"><div><dt>[n]</dt><dd>Families supported</dd></div><div><dt>Eastern</dt><dd>Province</dd></div><div><dt>Vanni Hope</dt><dd>Partner</dd></div></dl>
              <a className="v3-btn" href={links.microcredit}>View the initiative</a>
            </div>
          </article>
          <div className="v3-funding-side">
            <div className="v3-vote-card"><span className="v3-eyebrow">Community vote</span><h3>Your voice decides the next award.</h3><p>[n] proposals are open. Voting closes on [date].</p><a className="v3-btn v3-btn-primary" href={links.vote}>Cast your vote</a></div>
            <div className="v3-card v3-skill"><h3>Bring a skill</h3><p>Volunteer, mentor or lend your professional skills to a partner.</p><a href={links.join}>See ways to help</a></div>
          </div>
        </div>
      </section>

      <section className="v3-section" aria-labelledby="v3-field-title">
        <h2 id="v3-field-title">From the field</h2>
        <div className="v3-field">
          <article className="v3-card"><span className="v3-eyebrow">Field update</span><h3>A new chapter for local enterprise</h3><p>A community check-in brings participants together to share plans and practical next steps.</p><div className="v3-field-foot">17 Oct 2026</div></article>
          <article className="v3-card"><span className="v3-eyebrow">Thought leadership</span><h3>{featuredInsight.title}</h3><p>{featuredInsight.authors.join(', ').replace(/, ([^,]*)$/, ' and $1')}</p><div className="v3-field-foot"><span>26 Dec 2024</span><a href={featuredInsight.url} target="_blank" rel="noreferrer">Read on Substack</a></div></article>
          <article className="v3-card"><span className="v3-eyebrow">Next gathering</span><h3>[Event name]</h3><p>[Date] · [Venue, London]</p><a className="v3-btn v3-field-cta" href={links.events}>Save a place</a></article>
        </div>
      </section>

      <footer className="v3-foot"><span><img src="/members/aram-logo.png" width="36" height="36" alt=""/>The Aram Initiative · The desire to do good.</span><span>Figures on this page are sample data while the members area is in development.</span></footer>
    </main>
  </div>;
}
