// V4 · Member dashboard (Aram brand), from the Aram Members Redesign canvas, running on the shared members workspace.
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import './v4.css';
import { links, shareLinks } from '../redesign/links';
import { day, formatPercent, money } from '../redesign/model';
import { linker, routeFromPath } from '../redesign/routes';
import { AccessNote, Loading, Progress, SectionView, Status, useVoteDraft, voteStatus } from '../redesign/Sections';
import { useWorkspace } from '../redesign/useWorkspace';

const base = '/p1/v4';
const to = linker(base);
const nav = [['Dashboard', ''], ['Vote', 'vote'], ['Fund and ledger', 'ledger'], ['Initiatives', 'initiatives'], ['Field updates', 'updates'], ['Events', 'events'], ['Membership', 'membership']];

export default function App() {
  const ws = useWorkspace();
  const route = routeFromPath(base, usePathname());
  const active = route.view === 'home' ? '' : route.view === 'initiative' ? 'initiatives' : route.view;
  return <div className="aram-v4">
    <div className="v4-wrap">
      <header className="v4-top">
        <div className="v4-brand"><Link className="v4-logo" href={to()}><img src="/members/aram-logo.png" width="46" height="46" alt="The Aram Initiative"/></Link><span className="v4-pill">Members dashboard</span><span className="v4-note">Demonstration figures</span></div>
        <div className="v4-top-actions"><button type="button" className="v4-outline" onClick={ws.refresh} disabled={ws.loading}>{ws.loading ? 'Refreshing…' : 'Refresh'}</button>{ws.isPrivate ? <a className="v4-outline" href={links.signOut}>Sign out</a> : <a className="v4-outline" href={links.signIn}>Sign in</a>}</div>
        <nav className="v4-nav" aria-label="Members">{nav.map(([name, section]) => <Link key={name} href={to(section)} aria-current={active === section ? 'page' : undefined}>{name}</Link>)}</nav>
      </header>
      <Status ws={ws}/>
      {!ws.model ? <Loading ws={ws}/> : <>
        <AccessNote ws={ws}/>
        {route.view === 'home' ? <Overview ws={ws}/> : <SectionView route={route} ws={ws} to={to}/>}
      </>}
      <footer className="v4-foot"><span>The Aram Initiative · The desire to do good.</span><span>Figures are demonstration records while the members area is in development.</span></footer>
    </div>
  </div>;
}

function Overview({ ws }) {
  const m = ws.model;
  const draft = useVoteDraft(ws);
  const [copied, setCopied] = useState(false);
  const latest = m.updates[0];
  return <>
    <div className="v4-row">
      <section className="v4-panel v4-impact" aria-labelledby="v4-who">
        <div className="v4-eyebrow"><span className="v4-tamil" lang="ta">வணக்கம்</span><span aria-hidden="true">·</span>Your impact</div>
        <h1 id="v4-who">{m.member.name}</h1>
        <p className="v4-lede">From where you are to where we’re rooted. This is what your contribution is doing in Sri Lanka.</p>
        <p className="v4-quiet">Member since {m.member.joined}</p>
        <dl className="v4-stats">
          <div><dt>Put in</dt><dd>{money(m.memberGivenPence)}</dd></div>
          <div><dt>Each month</dt><dd>{money(m.monthlyPence)}</dd></div>
          <div><dt>Initiatives backed</dt><dd>{m.funded.length}</dd></div>
          <div className="v4-stat-gold"><dt>Your share of the fund</dt><dd>{formatPercent(m.sharePct)}</dd></div>
        </dl>
      </section>

      <section className="v4-panel v4-membership" aria-labelledby="v4-status">
        <div className="v4-eyebrow">Membership</div>
        <h2 id="v4-status">You’re part of it.</h2>
        <p className="v4-body">Your {money(m.monthlyPence)} a month is pooled with other members and sent to community partners after each vote.</p>
        <Link className="v4-gold-btn" href={to('membership')}>Manage contribution</Link>
        <p className="v4-quiet v4-center">Monthly preference · no payment is taken</p>
        <div className="v4-steps">
          <div className="v4-steps-title">Your next steps</div>
          <a href="#v4-vote"><span>{m.vote.choice ? <><strong>Your vote: {m.vote.choice.title}</strong></> : <><strong>Cast your vote</strong><span className="v4-quiet"> · {m.vote.open ? m.vote.remaining || 'open now' : 'closed'}</span></>}</span><ArrowRight size={18} aria-hidden="true"/></a>
          {latest && <Link href={to('updates')}><span>Read the latest field update</span><ArrowRight size={18} aria-hidden="true"/></Link>}
          <a href={links.join}><span>Bring a skill to a partner</span><ArrowRight size={18} aria-hidden="true"/></a>
        </div>
      </section>
    </div>

    <section id="v4-vote" className="v4-panel" aria-labelledby="v4-vote-title">
      <div className="v4-vote-head"><span className="v4-eyebrow">Community vote</span><span className={`v4-open ${m.vote.open ? '' : 'v4-closed'}`}><i aria-hidden="true"/>{m.vote.open ? 'Voting open' : 'Voting closed'}</span></div>
      <h2 id="v4-vote-title" className="v4-display">Choose the next award.</h2>
      <dl className="v4-vote-facts">
        <div><dt>Closes</dt><dd>{m.vote.deadline}</dd></div>
        <div><dt>Time left</dt><dd>{m.vote.remaining || '…'}</dd></div>
        <div><dt>Held in the fund</dt><dd>{money(m.totals.balancePence)}</dd></div>
        <div><dt>Voting as</dt><dd className="v4-gold-text">{m.member.name}</dd></div>
      </dl>
      <div className="v4-options">
        {m.eligible.map(p => <button key={p.id} type="button" className="v4-option" aria-pressed={draft.current === p.id} disabled={!draft.open} onClick={() => draft.pick(p.id)}>
          <span className="v4-option-top"><span>{p.category} · {p.location}</span><span className="v4-tick" aria-hidden="true">{draft.current === p.id && <Check size={14} strokeWidth={3}/>}</span></span>
          <span className="v4-option-name">{p.title}</span>
          <span className="v4-option-ask">{p.statusLabel}{p.meta.partner ? ` · with ${p.meta.partner.name}` : ''}</span>
        </button>)}
      </div>
      <div className="v4-cast">
        <p aria-live="polite">{draft.choiceId && !draft.dirty ? <><strong>Vote recorded.</strong> <span>You can change it until voting closes.</span></> : voteStatus(ws, draft)}</p>
        <button type="button" className="v4-gold-btn" disabled={draft.disabled} onClick={draft.cast}>{draft.label}</button>
      </div>
    </section>

    <section className="v4-panel" aria-labelledby="v4-slice-title">
      <div className="v4-eyebrow">Your slice of the work</div>
      <h2 id="v4-slice-title" className="v4-display">Where your {money(m.monthlyPence)} goes.</h2>
      <p className="v4-body">Your monthly contribution, split in line with how the fund has been sent so far.</p>
      <div className="v4-cards v4-cards-slices">{m.areas.map(a => <div key={a.name} className="v4-light-card"><strong>{money(a.slicePence)}</strong><span>{a.name} · {formatPercent(a.pct)}</span><Progress value={a.pct} label={`${formatPercent(a.pct)} of money sent`}/></div>)}</div>
    </section>

    <section className="v4-panel" aria-labelledby="v4-totals-title">
      <div className="v4-head-row"><div><div className="v4-eyebrow">Community totals</div><h2 id="v4-totals-title" className="v4-display">Together, so far.</h2></div><Link className="v4-head-link" href={to('ledger')}>Open the ledger</Link></div>
      <div className="v4-cards v4-cards-totals">
        <div className="v4-light-card"><strong>{money(m.totals.contributedPence)}</strong><span>Contributed by members</span></div>
        <div className="v4-light-card"><strong>{money(m.totals.deployedPence)}</strong><span>Sent to partners</span></div>
        <div className="v4-light-card"><strong>{m.totals.peopleReached}</strong><span>People reached</span></div>
        <div className="v4-light-card"><strong>{money(m.totals.balancePence)}</strong><span>Held for the next vote</span></div>
      </div>
    </section>

    <section className="v4-panel" aria-labelledby="v4-init-title">
      <div className="v4-head-row"><div><div className="v4-eyebrow">Initiatives</div><h2 id="v4-init-title" className="v4-display">What you’re helping build.</h2></div><Link className="v4-head-link" href={to('initiatives')}>See all initiatives</Link></div>
      <div className="v4-rail">
        {m.projects.map(p => p.status === 'proposed'
          ? <article key={p.id} className="v4-init v4-concept"><span className="v4-init-area">{p.statusLabel}</span><h3>{p.title}</h3><p>Still in research. It reaches a vote only once a partner and a plan are in place.</p><Link href={to('initiatives', p.id)}>Follow its progress</Link></article>
          : <article key={p.id} className="v4-init">
            <img src={p.image} alt=""/>
            <div className="v4-init-body">
              <span className="v4-init-area">{p.category} · {p.location}</span>
              <h3><Link href={to('initiatives', p.id)}>{p.title}</Link></h3>
              <p>{p.meta.partner ? `With ${p.meta.partner.name}. ` : ''}{money(p.deployedPence)} sent · {p.peopleReached} people</p>
              <div className="v4-init-foot"><div className="v4-init-progress"><span><strong>{money(p.fundedPence)}</strong> of {money(p.fundingGoalPence)}</span><span>{p.pctFunded}%</span></div><Progress value={p.pctFunded} label={`${p.pctFunded}% funded`}/></div>
            </div>
          </article>)}
      </div>
    </section>

    <div className="v4-row">
      <section className="v4-panel v4-half" aria-labelledby="v4-pay-title">
        <div className="v4-eyebrow">Contribution history</div>
        <h2 id="v4-pay-title" className="v4-display v4-display-sm">Your payments.</h2>
        <div className="v4-table-scroll"><table className="v4-table">
          <thead><tr><th scope="col">Date</th><th scope="col">Status</th><th scope="col">Amount</th><th scope="col">Note</th></tr></thead>
          <tbody>
            {m.memberEntries.map(t => <tr key={t.id}><td>{day(t.date)}</td><td className="v4-paid">Recorded</td><td>{money(t.amountPence)}</td><td>{t.description}</td></tr>)}
            <tr className="v4-scheduled"><td>Each month</td><td>Preference</td><td>{money(m.monthlyPence)}</td><td>Not a subscription</td></tr>
          </tbody>
        </table></div>
        <p className="v4-ledger-note"><span>Every pound you give appears in the ledger.</span><Link href={to('ledger')}>Open the ledger</Link></p>
      </section>

      <section className="v4-panel v4-half" aria-labelledby="v4-share-title">
        <div className="v4-eyebrow">Tell people</div>
        <h2 id="v4-share-title" className="v4-display v4-display-sm">Bring someone with you.</h2>
        <div className="v4-share-card">
          <div className="v4-share-brand"><img src="/members/aram-logo.png" width="36" height="36" alt=""/><span>Your share card</span></div>
          <div className="v4-share-line">I’m rooted in the work.</div>
          <p>{m.shareCaption}</p>
        </div>
        <button type="button" className="v4-gold-btn v4-copy" onClick={async () => setCopied(await ws.copy(m.shareCaption, 'Caption copied.'))}>{copied ? 'Caption copied' : 'Copy caption'}</button>
        <div className="v4-share-links">{shareLinks(m.shareCaption).map(l => <a key={l.label} className="v4-outline" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}</div>
      </section>
    </div>
  </>;
}
