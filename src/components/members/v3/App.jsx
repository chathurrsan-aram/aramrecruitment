// V3 · Members overview, from the Aram Members Redesign canvas, running on the shared members workspace.
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, BookOpen, CalendarDays, Check, FileText, Globe2, Home, Wallet } from 'lucide-react';
import './v3.css';
import { communityEvents, thoughtLeadership } from '@/data/community';
import { links } from '../redesign/links';
import { day, formatPercent, money } from '../redesign/model';
import { linker, routeFromPath } from '../redesign/routes';
import { AccessNote, Loading, Progress, SectionView, Status } from '../redesign/Sections';
import { useWorkspace } from '../redesign/useWorkspace';

const base = '/p1/v3';
const to = linker(base);
const nav = [
  ['Overview', '', Home], ['Initiatives', 'initiatives', Globe2], ['Fund and ledger', 'ledger', Wallet], ['Community vote', 'vote', Check],
  ['Field updates', 'updates', FileText], ['Thought leadership', 'insights', BookOpen], ['Events', 'events', CalendarDays],
];

export default function App() {
  const ws = useWorkspace();
  const route = routeFromPath(base, usePathname());
  const m = ws.model;
  const active = route.view === 'home' ? '' : route.view === 'initiative' ? 'initiatives' : route.view;
  return <div className="aram-v3">
    <aside className="v3-side">
      <Link className="v3-brand" href={to()}><img src="/members/aram-logo.png" width="56" height="56" alt="The Aram Initiative"/><span>Members area</span></Link>
      <nav className="v3-nav" aria-label="Members">
        {nav.map(([name, section, Icon]) => <Link key={name} href={to(section)} aria-current={active === section ? 'page' : undefined}><Icon size={18} strokeWidth={1.8} aria-hidden="true"/>{name}</Link>)}
      </nav>
      <div className="v3-side-foot">
        <div className="v3-how"><strong>How Aram works</strong><p>Discovery, research and long-term initiatives, led by the communities we work with.</p><a href={links.team}>Meet the team</a></div>
        {m && <Link className="v3-member" href={to('membership')} aria-current={active === 'membership' ? 'page' : undefined}><span aria-hidden="true">{m.member.initials}</span><div><strong>{m.member.name}</strong><small>Member since {m.member.joined}</small></div></Link>}
      </div>
    </aside>

    <main className="v3-main">
      <header className="v3-top">
        <div className="v3-status">
          {m && <p className="v3-live"><i aria-hidden="true"/>Live<span aria-hidden="true">·</span><strong>{money(m.totals.deployedPence)} deployed across {m.funded.length} initiatives</strong></p>}
          <span className="v3-sample">Demonstration figures</span>
        </div>
        <div className="v3-actions">{ws.isPrivate
          ? <><Link className="v3-btn" href={to('membership')}>Your membership</Link><a className="v3-btn" href={links.signOut}>Sign out</a></>
          : <><a className="v3-btn" href={links.signIn}>Sign in</a><a className="v3-btn v3-btn-primary" href={links.join}>Join Aram</a></>}</div>
      </header>
      <Status ws={ws}/>
      {!m ? <Loading ws={ws}/> : <>
        <AccessNote ws={ws}/>
        {route.view === 'home' ? <Overview ws={ws}/> : <SectionView route={route} ws={ws} to={to}/>}
      </>}
      <footer className="v3-foot"><span><img src="/members/aram-logo.png" width="36" height="36" alt=""/>The Aram Initiative · The desire to do good.</span><span>Figures are demonstration records while the members area is in development.</span></footer>
    </main>
  </div>;
}

function Overview({ ws }) {
  const m = ws.model;
  const feature = m.funded[0] || m.projects[0];
  const latest = m.updates[0], insight = thoughtLeadership[0], event = communityEvents[0];
  const totals = [
    ['Money in', money(m.totals.contributedPence), 'Member contributions'],
    ['Money out', money(m.totals.deployedPence), 'Sent to partners'],
    ['Held', money(m.totals.balancePence), 'Awaiting the next vote'],
    ['People reached', m.totals.peopleReached, 'Reported by partners'],
  ];
  return <>
    <section className="v3-hero" aria-labelledby="v3-hero-title">
      <div className="v3-hero-body">
        <div className="v3-hero-copy">
          <span className="v3-hero-eyebrow">Members · {m.reportedMonth}</span>
          <h1 id="v3-hero-title">Find your part in the work.</h1>
          <p>Every pound members give is pooled, voted on and sent to community partners in Sri Lanka. This page shows where it went and what you can do next.</p>
          <div className="v3-hero-ctas"><Link className="v3-cta-gold" href={to('initiatives')}>Explore the initiatives<ArrowRight size={16} strokeWidth={2} aria-hidden="true"/></Link><a className="v3-cta-ghost" href="#v3-money">See where the money went</a></div>
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
      <div className="v3-section-head"><div><h2 id="v3-money-title">Where the money went</h2><p>Every pound in and out, straight from the fund’s ledger.</p></div><Link href={to('ledger')}>Open the full ledger</Link></div>
      <div className="v3-money">
        <div className="v3-card v3-split">
          <h3>How {money(m.totals.deployedPence)} was split</h3>
          <div className="v3-split-bar" aria-hidden="true">{m.areas.map(a => <i key={a.name} style={{ flex: a.pence, background: a.color }}/>)}</div>
          <ul>{m.areas.map(a => <li key={a.name}><span><i aria-hidden="true" style={{ background: a.color }}/>{a.name}</span><strong>{formatPercent(a.pct)}</strong></li>)}</ul>
          <p>Members vote on each award. Money is held until a vote closes and a partner agreement is signed.</p>
        </div>
        <div className="v3-card v3-ledger">
          <div className="v3-ledger-meta"><span>Source · Fund ledger</span><span>Last entry · {m.lastEntryDate ? day(m.lastEntryDate) : 'none'}</span></div>
          <div className="v3-ledger-scroll"><ul>{m.ledger.slice(0, 4).map(t => <li key={t.id}><span>{day(t.date)}</span><span>{t.projectId ? `${t.description}, ${t.projectTitle}` : t.description}</span><span className={t.amountPence > 0 ? 'v3-in' : undefined}>{t.amountPence > 0 ? '+' : '−'}{money(Math.abs(t.amountPence))}</span></li>)}</ul></div>
          <p className="v3-running"><span>{m.ledger.length} entries in the ledger</span><Link href={to('ledger')}>See every entry</Link></p>
        </div>
      </div>
    </section>

    <section className="v3-section" aria-labelledby="v3-init-title">
      <div className="v3-section-head"><div><h2 id="v3-init-title">What we are funding</h2><p>{m.projects.length} initiatives across Aram’s pillars, {m.projects.filter(p => p.status === 'proposed').length} of them still a concept.</p></div><Link href={to('initiatives')}>See all initiatives</Link></div>
      <div className="v3-funding">
        <article className="v3-card v3-feature">
          <img src={feature.image} alt=""/>
          <div className="v3-feature-body">
            <div className="v3-tags"><span>{feature.category}</span><span className="v3-tag-gold">{feature.statusLabel}</span></div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <div className="v3-progress"><div><span><strong>{money(feature.fundedPence)}</strong> of {money(feature.fundingGoalPence)}</span><span>{feature.pctFunded}% funded</span></div><Progress value={feature.pctFunded} label={`${feature.pctFunded}% funded`}/></div>
            <dl className="v3-facts"><div><dt>{feature.peopleReached}</dt><dd>People reached</dd></div><div><dt>{money(feature.deployedPence)}</dt><dd>Sent so far</dd></div><div><dt>{feature.meta.partner?.name || 'Aram'}</dt><dd>{feature.meta.partner ? 'Partner' : 'Delivery'}</dd></div></dl>
            <Link className="v3-btn" href={to('initiatives', feature.id)}>View the initiative</Link>
          </div>
        </article>
        <div className="v3-funding-side">
          <div className="v3-vote-card"><span className="v3-eyebrow">Community vote</span>
            <h3>{m.vote.choice ? 'Thanks, your vote is in.' : 'Your voice decides the next award.'}</h3>
            <p>{m.vote.choice ? `You voted for ${m.vote.choice.title}. ` : `${m.eligible.length} initiatives are open for your vote. `}{m.vote.open ? `Voting closes ${m.vote.deadline}.` : 'Voting has closed.'}</p>
            <Link className="v3-btn v3-btn-primary" href={to('vote')}>{m.vote.choice ? 'Review my vote' : 'Cast your vote'}</Link>
          </div>
          <div className="v3-card v3-skill"><h3>Bring a skill</h3><p>Volunteer, mentor or lend your professional skills to a partner.</p><a href={links.join}>See ways to help</a></div>
        </div>
      </div>
    </section>

    <section className="v3-section" aria-labelledby="v3-field-title">
      <h2 id="v3-field-title">From the field</h2>
      <div className="v3-field">
        {latest && <article className="v3-card"><span className="v3-eyebrow">Field update</span><h3>{latest.title}</h3><p>{latest.body}</p><div className="v3-field-foot"><span>{day(latest.date)}</span><Link href={to('updates')}>All updates</Link></div></article>}
        <article className="v3-card"><span className="v3-eyebrow">Thought leadership</span><h3>{insight.title}</h3><p>{insight.authors.join(', ').replace(/, ([^,]*)$/, ' and $1')}</p><div className="v3-field-foot"><span>{day(insight.publishedAt)}</span><a href={insight.url} target="_blank" rel="noreferrer">Read on Substack</a></div></article>
        <article className="v3-card"><span className="v3-eyebrow">Next gathering</span><h3>{event ? event.title : 'No gathering announced yet'}</h3><p>{event ? event.summary : 'Events appear here once a date and venue are confirmed.'}</p><Link className="v3-btn v3-field-cta" href={to('events')}>{event ? 'Save a place' : 'See events'}</Link></article>
      </div>
    </section>
  </>;
}
