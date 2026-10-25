// V5 · Member home (best of all), from the Aram Members Redesign canvas, running on the shared members workspace.
'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Check } from 'lucide-react';
import './v5.css';
import { communityEvents, thoughtLeadership } from '@/data/community';
import { links } from '../redesign/links';
import { day, formatPercent, money } from '../redesign/model';
import { linker, routeFromPath } from '../redesign/routes';
import { AccessNote, Loading, PaymentsTable, Progress, SectionView, ShareCard, Status, useVoteDraft, voteStatus } from '../redesign/Sections';
import { useWorkspace } from '../redesign/useWorkspace';

const base = '/p1/v5';
const to = linker(base);
const nav = [['Home', ''], ['Vote', 'vote'], ['Fund and ledger', 'ledger'], ['Initiatives', 'initiatives'], ['Field updates', 'updates'], ['Events', 'events']];

function AccountMenu({ ws }) {
  const ref = useRef(null);
  const pathname = usePathname();
  // Close the menu after navigating or when clicking elsewhere.
  useEffect(() => { if (ref.current) ref.current.open = false; }, [pathname]);
  useEffect(() => {
    const close = e => { if (ref.current?.open && !ref.current.contains(e.target)) ref.current.open = false; };
    document.addEventListener('click', close); return () => document.removeEventListener('click', close);
  }, []);
  const m = ws.model;
  return <details className="v5-account" ref={ref}><summary aria-label={`Account menu${m ? ` for ${m.member.name}` : ''}`}>{m?.member.initials || '…'}</summary><div>
    {m && <p className="v5-account-name"><strong>{m.member.name}</strong><span>{ws.isPrivate ? 'Signed in' : 'Demo · saved in this browser'}</span></p>}
    <Link href={to('membership')}>Your membership</Link><Link href={to('membership')}>Manage contribution</Link>
    {ws.isPrivate ? <a href={links.signOut}>Sign out</a> : <a href={links.signIn}>Sign in</a>}
  </div></details>;
}

export default function App() {
  const ws = useWorkspace();
  const route = routeFromPath(base, usePathname());
  const active = route.view === 'home' ? '' : route.view === 'initiative' ? 'initiatives' : route.view;
  return <div className="aram-v5">
    <header className="v5-header">
      <div className="v5-header-inner">
        <Link className="v5-brand" href={to()}><img src="/members/aram-logo.png" width="48" height="48" alt="The Aram Initiative"/><span>Members</span></Link>
        <nav className="v5-nav" aria-label="Members">{nav.map(([name, section]) => <Link key={name} href={to(section)} aria-current={active === section ? 'page' : undefined}>{name}</Link>)}</nav>
        <div className="v5-header-end">
          {ws.model && <Link className="v5-sent" href={to('ledger')}><i aria-hidden="true"/><strong>{money(ws.model.totals.deployedPence)}</strong><span>sent to partners</span></Link>}
          <AccountMenu ws={ws}/>
        </div>
      </div>
    </header>
    <main className="v5-main">
      <Status ws={ws}/>
      {!ws.model ? <Loading ws={ws}/> : <>
        <AccessNote ws={ws}/>
        {route.view === 'home' ? <Overview ws={ws}/> : <SectionView route={route} ws={ws} to={to}/>}
      </>}
      <footer className="v5-foot"><span><img src="/members/aram-logo.png" width="32" height="32" alt=""/>The Aram Initiative · The desire to do good.</span><span>Figures are demonstration records while the members area is in development.</span></footer>
    </main>
  </div>;
}

function Overview({ ws }) {
  const m = ws.model;
  const draft = useVoteDraft(ws);
  const [view, setView] = useState('you');
  const feature = m.funded[0] || m.projects[0];
  const others = m.projects.filter(p => p.id !== feature.id);
  const latest = m.updates[0], insight = thoughtLeadership[0], event = communityEvents[0];
  const stats = [[money(m.memberGivenPence), 'Put in so far'], [money(m.monthlyPence), 'Each month'], [m.funded.length, 'Initiatives backed'], [formatPercent(m.sharePct), 'Your share of the fund']];
  const caption = view === 'you' ? `Your ${money(m.monthlyPence)} this month, split in line with how the fund has been sent.` : `All ${money(m.totals.deployedPence)} sent to partners so far, by area of work.`;
  return <>
    <section className="v5-hero" aria-labelledby="v5-hello">
      <div className="v5-hero-body">
        <div className="v5-hero-copy">
          <div className="v5-tamil" lang="ta">வணக்கம்</div>
          <h1 id="v5-hello">{ws.isPrivate ? `${m.member.first}, your ${money(m.monthlyPence)} is at work.` : `Your ${money(m.monthlyPence)}, at work.`}</h1>
          <p>You are one of the members funding community-led work in Sri Lanka. Here is where your money went and what needs you this month.</p>
          <div className="v5-hero-meta">Member since {m.member.joined} · {money(m.monthlyPence)} a month · <Link href={to('membership')}>Manage</Link></div>
        </div>
        <div className="v5-month">
          <div className="v5-month-top"><span className="v5-eyebrow">This month</span><span className={`v5-open ${m.vote.open ? '' : 'v5-closed'}`}><i aria-hidden="true"/>{m.vote.open ? 'Voting open' : 'Voting closed'}</span></div>
          <h2>{m.vote.choice ? 'Thanks, your vote is in.' : 'Help choose the next award.'}</h2>
          <p>{m.vote.choice ? `You voted for ${m.vote.choice.title}. You can change it until voting closes.` : `${money(m.totals.balancePence)} is held for the next award across ${m.eligible.length} initiatives.`} {m.vote.open && `Voting closes ${m.vote.deadline}.`}</p>
          <a className="v5-gold-btn" href="#v5-vote">{m.vote.choice ? 'Review my vote' : 'Vote now'}</a>
          <div className="v5-month-note">{m.vote.remaining || '…'}</div>
        </div>
      </div>
      <dl className="v5-stats">{stats.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </section>

    <section id="v5-vote" className="v5-section" aria-labelledby="v5-vote-title">
      <div className="v5-section-head">
        <div><div className="v5-eyebrow">Community vote</div><h2 id="v5-vote-title" className="v5-display">Choose the next award.</h2></div>
        <div className="v5-vote-facts"><span><span>Closes</span> <strong>{m.vote.deadline}</strong></span><span><span>Held in the fund</span> <strong>{money(m.totals.balancePence)}</strong></span></div>
      </div>
      <div className="v5-options">
        {m.eligible.map(p => <button key={p.id} type="button" className="v5-option" aria-pressed={draft.current === p.id} disabled={!draft.open} onClick={() => draft.pick(p.id)}>
          <span className="v5-option-top"><span>{p.category}</span><span className="v5-tick" aria-hidden="true">{draft.current === p.id && <Check size={14} strokeWidth={3}/>}</span></span>
          <span className="v5-option-name">{p.title}</span>
          <span className="v5-option-blurb">{p.description}</span>
          <span className="v5-option-ask">{p.location}{p.meta.partner ? ` · with ${p.meta.partner.name}` : ''}{p.status === 'proposed' ? ' · concept' : ''}</span>
        </button>)}
      </div>
      <div className="v5-cast">
        <p aria-live="polite">{draft.choiceId && !draft.dirty ? <><strong>Vote recorded.</strong> <span>You can change it until voting closes.</span></> : voteStatus(ws, draft)}</p>
        <button type="button" className="v5-dark-btn" disabled={draft.disabled} onClick={draft.cast}>{draft.label}</button>
      </div>
    </section>

    <section id="v5-money" className="v5-section" aria-labelledby="v5-money-title">
      <div className="v5-section-head">
        <div><div className="v5-eyebrow">Out in the open</div><h2 id="v5-money-title" className="v5-display">Where the money went.</h2></div>
        <div className="v5-toggle" role="group" aria-label="Show figures for">
          <button type="button" aria-pressed={view === 'you'} onClick={() => setView('you')}>Your {money(m.monthlyPence)}</button>
          <button type="button" aria-pressed={view === 'all'} onClick={() => setView('all')}>Everyone</button>
        </div>
      </div>
      <div className="v5-money">
        <div className="v5-card v5-split">
          <p className="v5-split-caption" aria-live="polite">{caption}</p>
          <ul>{m.areas.map(a => <li key={a.name}><div><span>{a.name}</span><strong>{money(view === 'you' ? a.slicePence : a.pence)}</strong></div><div className="v5-track" aria-hidden="true"><i style={{ width: `${a.pct}%`, background: a.color }}/></div></li>)}</ul>
          <dl className="v5-split-totals"><div><dt>Money in</dt><dd>{money(m.totals.contributedPence)}</dd></div><div><dt>Sent to partners</dt><dd>{money(m.totals.deployedPence)}</dd></div><div><dt>Held for the vote</dt><dd>{money(m.totals.balancePence)}</dd></div></dl>
        </div>
        <div className="v5-card v5-ledger">
          <div className="v5-ledger-meta"><span>Source · Fund ledger</span><span>Last entry · {m.lastEntryDate ? day(m.lastEntryDate) : 'none'}</span></div>
          <div className="v5-scroll"><ul>{m.ledger.slice(0, 5).map(t => <li key={t.id}><span>{day(t.date)}</span><span>{t.projectId ? `${t.description}, ${t.projectTitle}` : t.description}</span><span className={t.amountPence > 0 ? 'v5-in' : undefined}>{t.amountPence > 0 ? '+' : '−'}{money(Math.abs(t.amountPence))}</span></li>)}</ul></div>
          <p className="v5-running"><span>{m.ledger.length} entries · download them as a spreadsheet</span><Link href={to('ledger')}>Open the ledger</Link></p>
        </div>
      </div>
    </section>

    <section id="v5-work" className="v5-section" aria-labelledby="v5-work-title">
      <div className="v5-section-head">
        <div><div className="v5-eyebrow">Initiatives</div><h2 id="v5-work-title" className="v5-display">Where your money is working.</h2></div>
        <Link href={to('initiatives')}>See all {m.projects.length} initiatives</Link>
      </div>
      <div className="v5-work">
        <div className="v5-map">
          <img src="/members/sri-lanka-districts.svg" width="190" height="314" alt="Map of Sri Lanka’s 25 districts, with districts where Aram works highlighted"/>
          <div className="v5-map-key"><span><i aria-hidden="true" className="v5-key-active"/>Active work</span><span><i aria-hidden="true" className="v5-key-planned"/>Planned work</span></div>
          <a href={links.research}>Open the research map</a>
        </div>
        <article className="v5-card v5-feature">
          <img src={feature.image} alt=""/>
          <div className="v5-feature-body">
            <div className="v5-tags"><span>{feature.category}</span><span className="v5-tag-gold">{feature.statusLabel}</span></div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <div className="v5-progress"><div><span><strong>{money(feature.fundedPence)}</strong> of {money(feature.fundingGoalPence)}</span><span>{feature.pctFunded}% funded</span></div><Progress value={feature.pctFunded} label={`${feature.pctFunded}% funded`}/></div>
            <Link className="v5-outline-btn" href={to('initiatives', feature.id)}>View the initiative</Link>
          </div>
        </article>
      </div>
      <div className="v5-grid">
        {others.map(p => <article key={p.id} className={`v5-card v5-mini ${p.status === 'proposed' ? 'v5-concept' : ''}`}>
          <div className="v5-eyebrow">{p.status === 'proposed' ? p.statusLabel : `${p.category} · ${p.location}`}</div>
          <h3><Link href={to('initiatives', p.id)}>{p.title}</Link></h3>
          <p>{p.status === 'proposed' ? 'Still in research. It reaches a vote once a partner and a plan are in place.' : p.description}</p>
          <div className="v5-mini-foot">{p.status === 'proposed' ? <Link href={to('initiatives', p.id)}>Follow its progress</Link> : `${money(p.deployedPence)} sent · ${p.peopleReached} people`}</div>
        </article>)}
      </div>
    </section>

    <section id="v5-field" className="v5-section" aria-labelledby="v5-field-title">
      <div className="v5-section-head"><div><div className="v5-eyebrow">Stay close</div><h2 id="v5-field-title" className="v5-display">From the field.</h2></div><Link href={to('updates')}>All field updates</Link></div>
      <div className="v5-grid">
        {latest && <article className="v5-card v5-post"><div className="v5-eyebrow">Field update · {latest.project?.title}</div><h3>{latest.title}</h3><p>{latest.body}</p><div className="v5-post-foot"><span>{day(latest.date)}</span>{latest.project && <Link href={to('initiatives', latest.project.id)}>View the initiative</Link>}</div></article>}
        <article className="v5-card v5-post"><div className="v5-eyebrow">Thought leadership</div><h3>{insight.title}</h3><p>{insight.authors.join(', ').replace(/, ([^,]*)$/, ' and $1')}</p><div className="v5-post-foot"><span>{day(insight.publishedAt)}</span><a href={insight.url} target="_blank" rel="noreferrer">Read on Substack</a></div></article>
        <article className="v5-card v5-post"><div className="v5-eyebrow">Next gathering</div><h3>{event ? event.title : 'No gathering announced yet'}</h3><p>{event ? event.summary : 'Events appear here once a date and venue are confirmed.'}</p><Link className="v5-outline-btn" href={to('events')}>{event ? 'Save a place' : 'See events'}</Link></article>
      </div>
    </section>

    <section className="v5-section" aria-labelledby="v5-you-title">
      <div className="v5-section-head"><div><div className="v5-eyebrow">Your membership</div><h2 id="v5-you-title" className="v5-display">Payments and sharing.</h2></div><Link href={to('membership')}>Manage contribution</Link></div>
      <div className="v5-membership"><PaymentsTable ws={ws}/><ShareCard ws={ws}/></div>
    </section>
  </>;
}
