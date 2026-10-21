'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, ExternalLink, GraduationCap, HeartHandshake, Lightbulb, Sprout, Wallet } from 'lucide-react';
import { filterProjects, labelStatus, ledgerRows, memberPaths, projectContext, projectFinance, projectPath } from '../../lib/members/presentation';

export const money = p => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: p % 100 ? 2 : 0 }).format(p / 100);
export const recordDate = d => new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(d));
const artworkIcons = { microcredit: Sprout, mentorship: GraduationCap, penpal: HeartHandshake, 'ai-curriculum': Lightbulb };
export function InitiativeArt({ project, compact = false }) {
  const Icon = artworkIcons[project.id] || Sprout;
  return <div className={`initiative-art art-${project.id} ${compact ? 'compact' : ''}`} aria-hidden="true"><div className="art-orbit"/><Icon/><span>{projectContext(project).category}</span></div>;
}
export function ProjectCard({ project, onOpen, children, selected = false }) {
  const meta = projectContext(project);
  return <article className={`panel project-feature ${selected ? 'selected-project' : ''}`}>
    <Link className="project-card-main" href={projectPath(project.id)} onClick={onOpen}>
      <InitiativeArt project={project}/>
      <div className="feature-content"><div className="section-head"><span className={`pill ${project.status === 'proposed' ? 'proposal' : 'neutral'}`}>{project.status === 'proposed' ? 'Unapproved proposal' : labelStatus(project.status)}</span></div>
        <h3>{project.title}</h3><p>{project.description}</p>
        <div className="project-meta"><span>{project.location}</span>{meta.partner && <span>With {meta.partner.name}</span>}</div>
        <span className="text-button">View initiative<ArrowRight size={16}/></span>
      </div>
    </Link>{children && <div className="card-actions">{children}</div>}
  </article>;
}
export function InitiativeList({ projects, partnerId, onOpen }) {
  const [search, setSearch] = useState(''), [status, setStatus] = useState('All');
  const visible = filterProjects(projects, { search, status, partnerId });
  const statuses = ['All', ...['In progress', 'Completed', 'Proposal'].filter(s => projects.some(p => labelStatus(p.status) === s))];
  return <>{partnerId && <div className="notice">Showing initiatives with this confirmed partner. <Link href={memberPaths.Initiatives}>Show all initiatives</Link></div>}
    <div className="filters"><label className="search"><span className="sr-only">Search initiatives, places or partners</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, place or partner"/></label>{statuses.map(s => <button key={s} className={`filter ${status === s ? 'active' : ''}`} aria-pressed={status === s} onClick={() => setStatus(s)}>{s}</button>)}</div>
    <div className="project-grid">{visible.map(p => <ProjectCard key={p.id} project={p} onOpen={onOpen}/>)}</div>
    {!visible.length && <div className="empty"><p>No initiatives match these filters. Specific delivery districts are still being confirmed.</p><button className="button secondary" onClick={() => { setSearch(''); setStatus('All'); }}>Clear filters</button>{partnerId && <Link className="source-link" href={memberPaths.Initiatives}>Clear partner filter</Link>}</div>}
    <p className="panel-footnote">Locations reflect published programme descriptions. Historical work by partner organisations is not treated as a current Aram delivery location.</p>
  </>;
}
export function PartnerContext({ project, projects }) {
  const meta = projectContext(project);
  const related = projects.filter(p => p.id !== project.id && meta.partner && projectContext(p).partner?.id === meta.partner.id);
  return <section className="drawer-section"><h4>Who’s behind the work?</h4>
    <p>{meta.aramRole}</p>
    {meta.partner ? <div className="partner-panel"><h3>{meta.partner.name}</h3><p>{meta.partner.role}</p><a className="source-link" href={meta.partner.website} target="_blank" rel="noreferrer">Visit {meta.partner.name}<ExternalLink size={14}/></a>
      <h4>Other Aram initiatives with this partner</h4>{related.length ? related.map(p => <Link className="source-link" key={p.id} href={projectPath(p.id)}>{p.title}<ArrowRight size={14}/></Link>) : <p>No other joint initiatives are confirmed in this dashboard’s current public sources.</p>}
      <Link className="source-link" href={`${memberPaths.Initiatives}?partner=${meta.partner.id}`}>Browse this partner’s Aram initiatives<ArrowRight size={14}/></Link>
      <a className="source-link" href="https://vannihope.org/projects-overview" target="_blank" rel="noreferrer">Explore Vanni Hope’s wider work<ExternalLink size={14}/></a><small>Their wider portfolio includes work outside Aram.</small>
    </div> : <p className="notice">{project.status === 'proposed' ? 'No delivery partner is confirmed for this proposal.' : 'The public initiative page does not identify a named delivery partner. Details need confirmation with Aram.'}</p>}
  </section>;
}
export function FundingExplanation() {
  return <div className="notice"><strong>One community fund, a clear decision.</strong><p>This prototype explores pooled support. Initiative cards are not separate fundraising campaigns. A saved preference does not allocate money.</p><p>The amount for a future round, the winner’s delivery scope, any direct giving and the treatment of surplus funds must be agreed before a real ballot. Surplus is not automatically redistributed.</p></div>;
}
export function ProjectDetails({ project, state, onFollow, followed, onShare, onUpdates }) {
  const meta = projectContext(project);
  const finance = projectFinance(state).find(row => row.projectId === project.id);
  const updates = state.updates.filter(u => u.projectId === project.id);
  return <><InitiativeArt project={project}/><span className="pill neutral">{meta.publicStatus}</span><h3>{project.title}</h3><p className="eyeline">{project.location} · {meta.category}</p><p className="detail-description">{project.description}</p>
    <section className="drawer-section"><h4>Take part in the work</h4><p>{meta.participation}</p>
      <div className="action-grid"><a className="button primary" href="/join">Explore ways to contribute<ArrowRight size={15}/></a><a className="button secondary" href="/join">Volunteer your skills</a><button className="button secondary" onClick={onFollow} aria-pressed={followed}>{followed ? 'Saved in this browser' : 'Save to follow'}</button><button className="button secondary" onClick={onShare}>Share / copy link</button></div>
      <p className="panel-footnote">The join page lets you explore getting involved; it is not a payment checkout. Saved initiatives stay in this browser only. No email alerts are sent.</p>
    </section>
    <PartnerContext project={project} projects={state.projects}/>
    <section className="drawer-section"><h4>Money recorded for this initiative</h4><p>Fictional cash entries linked to this initiative, not money awarded by a vote.</p><div className="detail-stats"><div className="detail-stat"><strong>{money(finance.inPence)}</strong><small>Money in</small></div><div className="detail-stat"><strong>{money(finance.outPence)}</strong><small>Money out</small></div><div className="detail-stat"><strong>{money(finance.remainingPence)}</strong><small>Net linked cash</small></div><div className="detail-stat"><strong>{money(project.fundingGoalPence)}</strong><small>Illustrative planning budget</small></div></div><p>Net linked cash is a bookkeeping subtotal, not an approved allocation or permission to spend.</p></section>
    <FundingExplanation/>
    {meta.sourceUrl ? <a className="source-link" href={meta.sourceUrl} target="_blank" rel="noreferrer">Read the published Aram initiative<ExternalLink size={14}/></a> : <p className="notice">This AI learning concept is an unapproved illustration, not an existing public Aram programme.</p>}
    <section className="drawer-section"><h4>Updates for this initiative</h4>{updates.length ? updates.map(u => <article className="activity-row" key={u.id}><BookOpen size={18}/><div><h3>{u.title}</h3><p>{u.body}</p><time>{recordDate(u.date)}</time></div></article>) : <p>No sample updates yet.</p>}<button className="text-button" onClick={onUpdates}>View initiative updates<ArrowRight size={14}/></button></section>
  </>;
}
export function FundingView({ state, onOpen }) {
  const [kind, setKind] = useState('All'), [projectId, setProjectId] = useState('All'), [search, setSearch] = useState(''), [from, setFrom] = useState(''), [to, setTo] = useState('');
  const rows = ledgerRows(state.transactions);
  const visible = rows.filter(t => (kind === 'All' || t.kind === kind) && (projectId === 'All' || (projectId === 'fund' ? !t.projectId : t.projectId === projectId)) && (!from || t.date >= from) && (!to || t.date <= to) && t.description.toLowerCase().includes(search.toLowerCase()));
  const totals = projectFinance(state);
  const balance = state.transactions.reduce((sum, t) => sum + t.amountPence, 0);
  const linked = totals.reduce((sum, row) => sum + row.remainingPence, 0);
  return <><div className="finance-hero"><Wallet size={30}/><div><span className="eyeline">Sample cash balance</span><h2>{money(balance)} held in the fund</h2><p>Money in minus money out. This includes {money(linked)} net linked to initiatives and {money(balance - linked)} in general fund entries. It does not establish uncommitted money available for a new award.</p></div></div><FundingExplanation/>
    <h2 className="section-title">Initiative breakdown</h2><div className="table-wrap"><table><caption>Fictional initiative cash subtotals</caption><thead><tr><th>Initiative</th><th>Money in</th><th>Money out</th><th>Net linked cash</th></tr></thead><tbody>{totals.map(row => <tr key={row.projectId}><td><Link className="ledger-link" href={projectPath(row.projectId)} onClick={onOpen}>{state.projects.find(p => p.id === row.projectId)?.title}</Link></td><td>{money(row.inPence)}</td><td>{money(row.outPence)}</td><td>{money(row.remainingPence)}</td></tr>)}</tbody></table></div>
    <h2 className="section-title">Every entry</h2><div className="ledger-filters"><label>Entry type<select value={kind} onChange={e=>setKind(e.target.value)}><option value="All">All types</option><option value="contribution">Money in</option><option value="deployment">Money out</option></select></label><label>Initiative<select value={projectId} onChange={e=>setProjectId(e.target.value)}><option value="All">All initiatives</option><option value="fund">General fund</option>{state.projects.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></label><label>From<input type="date" value={from} onChange={e=>setFrom(e.target.value)}/></label><label>To<input type="date" value={to} onChange={e=>setTo(e.target.value)}/></label><label>Search description<input value={search} onChange={e=>setSearch(e.target.value)} type="search"/></label></div>
    {from && to && from > to && <p role="alert">The start date must be on or before the end date.</p>}
    <div className="table-wrap"><table><caption>Sample ledger · {visible.length} of {rows.length} entries · balances include all earlier entries</caption><thead><tr><th scope="col">Date</th><th scope="col">Description</th><th scope="col">Initiative</th><th scope="col">Amount</th><th scope="col">Fund balance</th></tr></thead><tbody>{visible.map(t=><tr key={t.id}><td>{recordDate(t.date)}</td><td className="table-title">{t.description}</td><td>{t.projectId ? <Link className="ledger-link" href={projectPath(t.projectId)} onClick={onOpen}>{state.projects.find(p=>p.id===t.projectId)?.title}</Link> : 'General fund'}</td><td className={t.amountPence>0?'money-in':'money-out'}>{t.amountPence>0?'+':'−'}{money(Math.abs(t.amountPence))}</td><td>{money(t.balancePence)}</td></tr>)}</tbody></table></div>
    {!visible.length && <div className="empty"><p>No entries match.</p><button className="button secondary" onClick={()=>{setKind('All');setProjectId('All');setSearch('');setFrom('');setTo('');}}>Clear ledger filters</button></div>}
    <div className="notice">These are fictional entries, so no receipts or real spending evidence are attached. The published initiative pages explain the work; they are not proof of these amounts. A real ledger needs reviewed evidence and reconciliation.</div>
  </>;
}
