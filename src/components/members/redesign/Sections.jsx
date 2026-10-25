'use client';
// Working sections shared by V3–V5. Each version wraps them in its own shell and
// styles the rd- classes through CSS variables set on its root (see redesign.css).
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, Check, Download, ExternalLink, Link2, Search } from 'lucide-react';
import { communityEvents, thoughtLeadership } from '@/data/community';
import { filterProjects, labelStatus } from '@/lib/members/presentation';
import { day, formatPercent, money } from './model';
import { links, shareLinks } from './links';
import './redesign.css';

export function useVoteDraft(ws) {
  const vote = ws.model?.vote;
  const choiceId = vote?.choice?.id ?? null;
  const [picked, setPicked] = useState(null);
  const current = picked ?? choiceId;
  const dirty = current !== null && current !== choiceId;
  const open = !!vote?.open;
  const label = !open ? 'Voting has closed' : ws.busy ? 'Saving…' : current === null ? 'Choose an initiative above' : dirty ? (choiceId ? 'Change my vote' : 'Cast my vote') : 'Vote recorded';
  const cast = async () => { if (open && dirty && await ws.mutate({ type: 'vote', projectId: current }, 'Vote saved')) setPicked(null); };
  return { current, choiceId, dirty, open, label, cast, pick: id => setPicked(id), disabled: !open || !dirty || ws.busy };
}

export function voteStatus(ws, draft) {
  const choice = ws.model.vote.choice;
  if (!draft.open) return choice ? `Voting closed. Your vote went to ${choice.title}.` : 'Voting has closed for this round.';
  if (draft.dirty) return 'Not saved yet. Cast your vote to record it.';
  if (choice) return `Vote recorded for ${choice.title}. You can change it until voting closes.`;
  return 'Your vote is private to you. This prototype does not publish a shared tally.';
}

export function Head({ eyebrow, title, lede, action, id }) {
  return <div className="rd-head"><div>{eyebrow && <span className="rd-eyebrow">{eyebrow}</span>}<h2 id={id} className="rd-title">{title}</h2>{lede && <p className="rd-lede">{lede}</p>}</div>{action}</div>;
}

export function Progress({ value, label }) {
  return <div className="rd-track" role="img" aria-label={label}><i style={{ width: `${Math.min(100, Math.max(0, value))}%` }}/></div>;
}

export function AccessNote({ ws }) {
  if (ws.isPrivate) return <p className="rd-access"><Check size={15} aria-hidden="true"/><span>Signed in as <strong>{ws.model.member.name}</strong>. Changes save to your account. Figures are demonstration records; no real payments.</span></p>;
  return <p className="rd-access"><span><strong>Demo.</strong> Votes and changes save in this browser only. Figures are demonstration records; no real payments.</span><a href={links.signIn}>Sign in to save to your account</a><button type="button" onClick={ws.resetDemo}>Reset demo</button></p>;
}

export function Status({ ws }) {
  return <div className="rd-status" aria-live="polite">
    {ws.error && <p className="rd-error" role="alert"><span>{ws.error}</span><button type="button" onClick={ws.dismissError}>Dismiss</button></p>}
    {ws.toast && <p className="rd-toast"><Check size={16} aria-hidden="true"/>{ws.toast}</p>}
  </div>;
}

export function Loading({ ws }) {
  if (ws.error && !ws.state) return <div className="rd-card rd-empty"><h2 className="rd-title">The dashboard could not load.</h2><p>{ws.error}</p><button type="button" className="rd-btn rd-btn-primary" onClick={ws.refresh}>Try again</button></div>;
  return <div className="rd-card rd-empty" aria-busy="true"><p>Loading your members area…</p></div>;
}

export function NotFound({ to }) {
  return <div className="rd-card rd-empty"><h2 className="rd-title">Page not found</h2><p>That page isn’t part of the members area. Try one of these instead.</p><div className="rd-actions"><Link className="rd-btn rd-btn-primary" href={to()}>Go to the overview</Link><Link className="rd-btn" href={to('initiatives')}>See the initiatives</Link></div></div>;
}

function SaveButton({ ws, id, compact = false }) {
  const saved = ws.savedIds.includes(id);
  return <button type="button" className={`rd-btn ${compact ? 'rd-btn-quiet' : ''}`} aria-pressed={saved} onClick={() => ws.toggleSaved(id)}>{saved ? <BookmarkCheck size={16} aria-hidden="true"/> : <Bookmark size={16} aria-hidden="true"/>}{saved ? 'Saved' : 'Save'}</button>;
}

export function InitiativeCard({ ws, project, to }) {
  const p = project;
  return <article className="rd-card rd-initiative">
    <img src={p.image} alt="" className="rd-initiative-img"/>
    <div className="rd-initiative-body">
      <div className="rd-chips"><span className="rd-chip">{p.category}</span><span className={`rd-chip ${p.status === 'proposed' ? 'rd-chip-dashed' : 'rd-chip-gold'}`}>{p.statusLabel}</span>{ws.model.vote.choice?.id === p.id && <span className="rd-chip rd-chip-good"><Check size={12} aria-hidden="true"/>Your vote</span>}</div>
      <h3><Link href={to('initiatives', p.id)}>{p.title}</Link></h3>
      <p className="rd-small">{p.location}{p.meta.partner ? ` · with ${p.meta.partner.name}` : ''}</p>
      <p>{p.description}</p>
      {p.fundingGoalPence > 0 && p.status !== 'proposed' && <div className="rd-progress"><div><span><strong>{money(p.fundedPence)}</strong> of {money(p.fundingGoalPence)}</span><span>{p.pctFunded}% funded</span></div><Progress value={p.pctFunded} label={`${p.pctFunded}% funded`}/></div>}
      <div className="rd-actions"><Link className="rd-btn" href={to('initiatives', p.id)}>View the initiative<ArrowRight size={16} aria-hidden="true"/></Link><SaveButton ws={ws} id={p.id} compact/></div>
    </div>
  </article>;
}

export function InitiativesSection({ ws, to }) {
  const [search, setSearch] = useState(''), [status, setStatus] = useState('All'), [savedOnly, setSavedOnly] = useState(false);
  const { projects } = ws.model;
  const statuses = ['All', ...['In progress', 'Completed', 'Proposal'].filter(s => projects.some(p => labelStatus(p.status) === s))];
  const visible = filterProjects(projects, { search, status }).filter(p => !savedOnly || ws.savedIds.includes(p.id));
  return <section className="rd-section" aria-labelledby="rd-initiatives">
    <Head id="rd-initiatives" eyebrow="Initiatives" title="What we are funding." lede={`${projects.length} initiatives across Aram’s pillars. ${ws.model.funded.length} have received money from the fund so far.`}/>
    <div className="rd-filters">
      <label className="rd-search"><Search size={16} aria-hidden="true"/><span className="rd-sr">Search initiatives, places or partners</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, place or partner"/></label>
      <div className="rd-segment" role="group" aria-label="Filter by status">{statuses.map(s => <button key={s} type="button" aria-pressed={status === s} onClick={() => setStatus(s)}>{s}</button>)}</div>
      <button type="button" className="rd-btn rd-btn-quiet" aria-pressed={savedOnly} onClick={() => setSavedOnly(v => !v)}><Bookmark size={16} aria-hidden="true"/>Saved only ({ws.savedIds.filter(id => ws.model.byId[id]).length})</button>
    </div>
    <div className="rd-grid rd-grid-wide">{visible.map(p => <InitiativeCard key={p.id} ws={ws} project={p} to={to}/>)}</div>
    {!visible.length && <div className="rd-card rd-empty"><p>No initiatives match these filters.</p><button type="button" className="rd-btn" onClick={() => { setSearch(''); setStatus('All'); setSavedOnly(false); }}>Clear filters</button></div>}
  </section>;
}

export function InitiativeDetail({ ws, to, projectId }) {
  const p = ws.model.byId[projectId];
  const [linkCopied, setLinkCopied] = useState(false);
  if (!p) return <NotFound to={to}/>;
  const { vote } = ws.model;
  const eligible = p.status !== 'completed';
  const updates = ws.model.updates.filter(u => u.projectId === p.id);
  const copyLink = async () => { if (await ws.copy(new URL(to('initiatives', p.id), window.location.origin).href, 'Initiative link copied.')) setLinkCopied(true); };
  return <section className="rd-section" aria-labelledby="rd-detail">
    <Link className="rd-back" href={to('initiatives')}><ArrowLeft size={16} aria-hidden="true"/>All initiatives</Link>
    <article className="rd-card rd-detail">
      <img src={p.image} alt="" className="rd-detail-img"/>
      <div className="rd-detail-body">
        <div className="rd-chips"><span className="rd-chip">{p.category}</span><span className={`rd-chip ${p.status === 'proposed' ? 'rd-chip-dashed' : 'rd-chip-gold'}`}>{p.statusLabel}</span></div>
        <h2 id="rd-detail" className="rd-title">{p.title}</h2>
        <p className="rd-small">{p.location}</p>
        <p>{p.description}</p>
        {p.status !== 'proposed' && <div className="rd-progress"><div><span><strong>{money(p.fundedPence)}</strong> of {money(p.fundingGoalPence)} planning budget</span><span>{p.pctFunded}%</span></div><Progress value={p.pctFunded} label={`${p.pctFunded}% of the planning budget`}/></div>}
        <dl className="rd-facts"><div><dt>Raised</dt><dd>{money(p.fundedPence)}</dd></div><div><dt>Sent to partners</dt><dd>{money(p.deployedPence)}</dd></div><div><dt>People reached</dt><dd>{p.peopleReached}</dd></div></dl>
        <div className="rd-actions">
          {eligible && vote.open && (vote.choice?.id === p.id
            ? <span className="rd-chip rd-chip-good"><Check size={14} aria-hidden="true"/>You voted for this</span>
            : <button type="button" className="rd-btn rd-btn-primary" disabled={ws.busy} onClick={() => ws.mutate({ type: 'vote', projectId: p.id }, 'Vote saved')}>{vote.choice ? 'Move my vote here' : 'Vote for this initiative'}</button>)}
          <SaveButton ws={ws} id={p.id}/>
          <button type="button" className="rd-btn" onClick={copyLink}><Link2 size={16} aria-hidden="true"/>{linkCopied ? 'Link copied' : 'Copy link'}</button>
        </div>
      </div>
    </article>
    <div className="rd-grid">
      <div className="rd-card"><h3>Who’s behind the work</h3><p>{p.meta.aramRole}</p>
        {p.meta.partner ? <><p><strong>{p.meta.partner.name}</strong>: {p.meta.partner.role}</p><a className="rd-link" href={p.meta.partner.website} target="_blank" rel="noreferrer">Visit {p.meta.partner.name}<ExternalLink size={14} aria-hidden="true"/></a></>
          : <p className="rd-small">{p.status === 'proposed' ? 'No delivery partner is confirmed for this concept.' : 'No named delivery partner is listed on the public initiative page.'}</p>}
        {p.meta.sourceUrl && <a className="rd-link" href={p.meta.sourceUrl} target="_blank" rel="noreferrer">Read the public initiative page<ExternalLink size={14} aria-hidden="true"/></a>}
      </div>
      <div className="rd-card"><h3>How you can take part</h3><p>{p.meta.participation}</p><a className="rd-btn" href={links.join}>See ways to help</a></div>
    </div>
    <div className="rd-card"><h3>Updates from this initiative</h3>
      {updates.length ? <ul className="rd-list">{updates.map(u => <li key={u.id}><span className="rd-small">{day(u.date)}</span><strong>{u.title}</strong><p>{u.body}</p></li>)}</ul> : <p className="rd-small">No updates yet.</p>}
    </div>
  </section>;
}

export function SplitBar({ areas }) {
  return <>
    <div className="rd-split-bar" aria-hidden="true">{areas.map(a => <i key={a.name} style={{ flex: a.pence, background: a.color }}/>)}</div>
    <ul className="rd-legend">{areas.map(a => <li key={a.name}><span><i aria-hidden="true" style={{ background: a.color }}/>{a.name}</span><span>{money(a.pence)}</span><strong>{formatPercent(a.pct)}</strong></li>)}</ul>
  </>;
}

export function LedgerSection({ ws }) {
  const [kind, setKind] = useState('all'), [projectId, setProjectId] = useState('');
  const { totals, ledger, projects, areas } = ws.model;
  const rows = ledger.filter(t => (kind === 'all' || t.kind === kind) && (!projectId || (projectId === 'fund' ? !t.projectId : t.projectId === projectId)));
  return <section className="rd-section" aria-labelledby="rd-ledger">
    <Head id="rd-ledger" eyebrow="Fund and ledger" title="Where the money went." lede="Every pound in and out of the shared fund, with the running balance." action={<button type="button" className="rd-btn" onClick={ws.exportLedger}><Download size={16} aria-hidden="true"/>Download CSV</button>}/>
    <dl className="rd-stats"><div><dt>Money in</dt><dd>{money(totals.contributedPence)}</dd></div><div><dt>Sent to partners</dt><dd>{money(totals.deployedPence)}</dd></div><div><dt>Held in the fund</dt><dd>{money(totals.balancePence)}</dd></div><div><dt>People reached</dt><dd>{totals.peopleReached}</dd></div></dl>
    <div className="rd-card"><h3>How {money(totals.deployedPence)} was split</h3><SplitBar areas={areas}/></div>
    <div className="rd-card">
      <div className="rd-filters">
        <div className="rd-segment" role="group" aria-label="Filter by entry type">{[['all', 'All entries'], ['contribution', 'Money in'], ['deployment', 'Money out']].map(([v, l]) => <button key={v} type="button" aria-pressed={kind === v} onClick={() => setKind(v)}>{l}</button>)}</div>
        <label className="rd-select"><span>Initiative</span><select value={projectId} onChange={e => setProjectId(e.target.value)}><option value="">All initiatives</option><option value="fund">Community fund</option>{projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}</select></label>
      </div>
      <div className="rd-scroll"><table className="rd-table">
        <caption className="rd-sr">Fund ledger, newest first</caption>
        <thead><tr><th scope="col">Date</th><th scope="col">Description</th><th scope="col">Initiative</th><th scope="col" className="rd-num">Amount</th><th scope="col" className="rd-num">Balance</th></tr></thead>
        <tbody>{rows.map(t => <tr key={t.id}><td className="rd-mono">{day(t.date)}</td><td>{t.description}</td><td>{t.projectTitle}</td><td className={`rd-num rd-mono ${t.amountPence > 0 ? 'rd-in' : ''}`}>{t.amountPence > 0 ? '+' : '−'}{money(Math.abs(t.amountPence))}</td><td className="rd-num rd-mono">{money(t.balancePence)}</td></tr>)}</tbody>
      </table></div>
      {!rows.length && <p className="rd-small">No entries match these filters.</p>}
      <p className="rd-small">{rows.length} of {ledger.length} entries · Last entry {ws.model.lastEntryDate ? day(ws.model.lastEntryDate) : 'none'} · Demonstration records, not Aram’s bank account.</p>
    </div>
  </section>;
}

export function VotePanel({ ws, to }) {
  const draft = useVoteDraft(ws);
  const { vote, eligible, totals } = ws.model;
  return <section className="rd-section" aria-labelledby="rd-vote">
    <Head id="rd-vote" eyebrow="Community vote" title="Choose the next award." lede="Pick the initiative you want the fund to back next. You can change your vote until voting closes."/>
    <dl className="rd-stats"><div><dt>Status</dt><dd>{vote.open ? 'Voting open' : 'Closed'}</dd></div><div><dt>Closes</dt><dd className="rd-dd-sm">{vote.deadline}</dd></div><div><dt>Time left</dt><dd className="rd-dd-sm">{vote.remaining || '…'}</dd></div><div><dt>Held in the fund</dt><dd>{money(totals.balancePence)}</dd></div></dl>
    <div className="rd-grid">{eligible.map(p => <button key={p.id} type="button" className="rd-option" aria-pressed={draft.current === p.id} disabled={!vote.open} onClick={() => draft.pick(p.id)}>
      <span className="rd-option-top"><span>{p.category}</span><span className="rd-tick" aria-hidden="true">{draft.current === p.id && <Check size={14} strokeWidth={3}/>}</span></span>
      <span className="rd-option-name">{p.title}</span>
      <span className="rd-small">{p.location}{p.meta.partner ? ` · with ${p.meta.partner.name}` : ''}</span>
      <span className="rd-small">{p.statusLabel}{draft.choiceId === p.id ? ' · your current vote' : ''}</span>
    </button>)}</div>
    <div className="rd-cast"><p aria-live="polite">{voteStatus(ws, draft)}</p><button type="button" className="rd-btn rd-btn-primary" disabled={draft.disabled} onClick={draft.cast}>{draft.label}</button></div>
    <p className="rd-small">Want more detail first? <Link className="rd-link" href={to('initiatives')}>Read about each initiative</Link>.</p>
  </section>;
}

export function UpdatesSection({ ws, to }) {
  const params = useSearchParams();
  const filter = ws.model.byId[params.get('initiative')] ? params.get('initiative') : '';
  const shown = ws.model.updates.filter(u => !filter || u.projectId === filter);
  return <section className="rd-section" aria-labelledby="rd-updates">
    <Head id="rd-updates" eyebrow="Field updates" title="From the field." lede="Notes from the initiatives the fund supports."/>
    <nav className="rd-segment" aria-label="Filter updates by initiative"><Link href={to('updates')} aria-current={!filter ? 'page' : undefined}>All</Link>{ws.model.projects.filter(p => ws.model.updates.some(u => u.projectId === p.id)).map(p => <Link key={p.id} href={`${to('updates')}?initiative=${p.id}`} aria-current={filter === p.id ? 'page' : undefined}>{p.title}</Link>)}</nav>
    <div className="rd-grid">{shown.map(u => <article key={u.id} className="rd-card"><span className="rd-eyebrow">{u.project?.title || 'Community fund'}</span><h3>{u.title}</h3><p>{u.body}</p><div className="rd-card-foot"><span>{day(u.date)}</span>{u.project && <Link className="rd-link" href={to('initiatives', u.project.id)}>View the initiative</Link>}</div></article>)}</div>
    {!shown.length && <div className="rd-card rd-empty"><p>No updates for this initiative yet.</p></div>}
  </section>;
}

export function InsightsSection() {
  return <section className="rd-section" aria-labelledby="rd-insights">
    <Head id="rd-insights" eyebrow="Thought leadership" title="Ideas worth staying with." lede="Published perspectives from Aram Research & Insights."/>
    <div className="rd-grid">{thoughtLeadership.map(a => <article key={a.id} className="rd-card"><span className="rd-eyebrow">{a.topic}</span><h3>{a.title}</h3><p>{a.summary}</p><p className="rd-small">{a.authors.join(', ').replace(/, ([^,]*)$/, ' and $1')}</p><div className="rd-card-foot"><span>{day(a.publishedAt)}</span><a className="rd-link" href={a.url} target="_blank" rel="noreferrer">Read on Substack<ExternalLink size={14} aria-hidden="true"/></a></div></article>)}</div>
  </section>;
}

export function EventsSection() {
  return <section className="rd-section" aria-labelledby="rd-events">
    <Head id="rd-events" eyebrow="Events" title="Come together." lede="Gatherings and conversations for the Aram community."/>
    {communityEvents.length ? <div className="rd-grid">{communityEvents.map(e => <article key={e.id} className="rd-card"><h3>{e.title}</h3><p>{e.summary}</p><a className="rd-btn" href={e.url}>Find out more</a></article>)}</div>
      : <div className="rd-card rd-empty"><h3>No gatherings announced yet.</h3><p>New events are listed here once a date and venue are confirmed.</p><a className="rd-btn" href="/community/events">See community events</a></div>}
  </section>;
}

export function ShareCard({ ws, compact = false }) {
  const [copied, setCopied] = useState(false);
  const caption = ws.model.shareCaption;
  return <div className={`rd-share ${compact ? 'rd-share-compact' : ''}`}>
    <div className="rd-share-card"><div className="rd-share-brand"><img src="/members/aram-logo.png" width="36" height="36" alt=""/><span>Your share card</span></div><div className="rd-share-line">I’m rooted in the work.</div><p>{caption}</p></div>
    <button type="button" className="rd-btn rd-btn-primary rd-btn-block" onClick={async () => setCopied(await ws.copy(caption, 'Caption copied.'))}>{copied ? 'Caption copied' : 'Copy caption'}</button>
    <div className="rd-actions">{shareLinks(caption).map(l => <a key={l.label} className="rd-btn" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}</div>
  </div>;
}

export function ContributionForm({ ws }) {
  const current = ws.model.monthlyPence;
  const [value, setValue] = useState(String(current / 100));
  const pence = Math.round(Number(value) * 100);
  const valid = Number.isFinite(pence) && pence >= 0 && pence <= 1_000_000;
  const submit = async e => { e.preventDefault(); if (valid && pence !== current) await ws.mutate({ type: 'updateMember', monthlyPence: pence }, 'Monthly contribution saved'); };
  return <form className="rd-card rd-form" onSubmit={submit}>
    <h3>Manage your contribution</h3>
    <p>You currently give <strong>{money(current)}</strong> a month. Change it below and your slice of the work updates straight away. Your share of the fund counts recorded contributions only.</p>
    <div className="rd-segment" role="group" aria-label="Quick amounts">{[10, 25, 50, 100].map(v => <button key={v} type="button" aria-pressed={pence === v * 100} onClick={() => setValue(String(v))}>£{v}</button>)}</div>
    <label className="rd-field"><span>Monthly amount (£)</span><input type="number" inputMode="decimal" min="0" max="10000" step="0.01" value={value} onChange={e => setValue(e.target.value)} required aria-invalid={!valid}/></label>
    {!valid && <p className="rd-error-text">Enter an amount between £0 and £10,000.</p>}
    <button type="submit" className="rd-btn rd-btn-primary" disabled={!valid || pence === current || ws.busy}>{ws.busy ? 'Saving…' : pence === current ? 'No change to save' : `Save ${money(valid ? pence : 0)} a month`}</button>
    <p className="rd-small">This is a demonstration preference. No payment is taken and no subscription is created.</p>
  </form>;
}

export function PaymentsTable({ ws }) {
  const { memberEntries, memberGivenPence, monthlyPence } = ws.model;
  return <div className="rd-card"><h3>Your recorded contributions</h3>
    <div className="rd-scroll"><table className="rd-table">
      <thead><tr><th scope="col">Date</th><th scope="col">Status</th><th scope="col" className="rd-num">Amount</th><th scope="col">Note</th></tr></thead>
      <tbody>{memberEntries.map(t => <tr key={t.id}><td>{day(t.date)}</td><td className="rd-in">Recorded</td><td className="rd-num">{money(t.amountPence)}</td><td>{t.description}</td></tr>)}
        <tr className="rd-muted-row"><td>Each month</td><td>Preference</td><td className="rd-num">{money(monthlyPence)}</td><td>Not a subscription</td></tr></tbody>
    </table></div>
    <p className="rd-small">Total recorded: {money(memberGivenPence)}. Every recorded pound also appears in the fund ledger.</p>
  </div>;
}

/** Every section except the version's own home screen. */
export function SectionView({ route, ws, to }) {
  switch (route.view) {
    case 'initiatives': return <InitiativesSection ws={ws} to={to}/>;
    case 'initiative': return <InitiativeDetail key={route.projectId} ws={ws} to={to} projectId={route.projectId}/>;
    case 'ledger': return <LedgerSection ws={ws}/>;
    case 'vote': return <VotePanel ws={ws} to={to}/>;
    case 'updates': return <UpdatesSection ws={ws} to={to}/>;
    case 'insights': return <InsightsSection/>;
    case 'events': return <EventsSection/>;
    case 'membership': return <MembershipSection ws={ws} to={to}/>;
    default: return <NotFound to={to}/>;
  }
}

export function MembershipSection({ ws, to }) {
  const m = ws.model;
  return <section className="rd-section" aria-labelledby="rd-membership">
    <Head id="rd-membership" eyebrow="Your membership" title="Payments and sharing." lede={`${m.member.name} · member since ${m.member.joined}`}/>
    <dl className="rd-stats"><div><dt>Recorded so far</dt><dd>{money(m.memberGivenPence)}</dd></div><div><dt>Each month</dt><dd>{money(m.monthlyPence)}</dd></div><div><dt>Your share of the fund</dt><dd>{formatPercent(m.sharePct)}</dd></div><div><dt>Your vote</dt><dd className="rd-dd-sm">{m.vote.choice ? m.vote.choice.title : 'Not cast yet'}</dd></div></dl>
    <div className="rd-grid">
      <ContributionForm key={m.monthlyPence} ws={ws}/>
      <div className="rd-card"><h3>Your {money(m.monthlyPence)} this month</h3><p className="rd-small">Split in line with how the fund has been sent so far.</p>
        <ul className="rd-legend">{m.areas.map(a => <li key={a.name}><span><i aria-hidden="true" style={{ background: a.color }}/>{a.name}</span><strong>{money(a.slicePence)}</strong></li>)}</ul>
        <Link className="rd-link" href={to('ledger')}>Open the ledger</Link>
      </div>
    </div>
    <div className="rd-grid"><PaymentsTable ws={ws}/><ShareCard ws={ws}/></div>
  </section>;
}
