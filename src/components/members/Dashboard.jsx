'use client';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, CheckCircle2, Download, Globe2, HelpCircle, Home, Leaf, Menu, Pencil, Plus, RefreshCw, Settings2, Sparkles, Users, Vote, Wallet, X } from 'lucide-react';
import { calculateTotals } from '../../lib/members/domain';
import { memberPaths, memberReturnPath, parseMembersPath, projectContext, projectPath, voteDeadline, voteRemaining } from '../../lib/members/presentation';
import { FundingExplanation, FundingView, InitiativeList, money, ProjectCard, ProjectDetails, recordDate } from './MemberViews';
import { ledgerCsv } from './ledger';
import { AramBrandMark, AramRoots } from './AramBrand';
import { CommunityEvents, CommunityPreview, ThoughtLeadership } from '../community/CommunityContent';
import './members.css';
const nav = [{ name: 'Overview', icon: Home }, { name: 'Initiatives', icon: Globe2 }, { name: 'Funding & ledger', icon: Wallet }, { name: 'Community vote', icon: Users }, { name: 'Field updates', icon: BookOpen }, { name: 'Thought leadership', icon: BookOpen }, { name: 'Community events', icon: CalendarDays }];
const headings = { Overview: 'A community connected.', Initiatives: 'Good work, taking root.', 'Funding & ledger': 'Every contribution, accounted for.', 'Community vote': 'Your voice belongs here.', 'Field updates': 'Closer to the work.', 'Thought leadership': 'Ideas worth staying with.', 'Community events': 'Come together. Find your part.', 'Admin studio': 'Workspace studio.', 'About this prototype': 'A working beginning.' };
const descriptions = { Overview: 'Understand the work. Find a useful way to take part.', Initiatives: 'Meet the people, partnerships and ideas behind the work.', 'Funding & ledger': 'Follow the money in and out of the shared fund.', 'Community vote': 'Explore a preference exercise before any real funding decision.', 'Field updates': 'Sample stories showing how continuing updates could work.', 'Thought leadership': 'Published perspectives from Aram Research & Insights.', 'Community events': 'Gatherings, conversations and ways to bring the community together.', 'Admin studio': 'Maintain the private demonstration workspace.', 'About this prototype': 'How this prototype works, where its content comes from, and what comes next.' };
const savedKey = 'aram-demo-saved-initiatives-v1';
const subscribeSaved = callback => { window.addEventListener('storage', callback); window.addEventListener('aram-saved', callback); return () => { window.removeEventListener('storage', callback); window.removeEventListener('aram-saved', callback); }; };
const savedSnapshot = () => { try { return localStorage.getItem(savedKey) || '[]'; } catch { return '[]'; } };
function Button({ children, onClick, kind = 'secondary', disabled = false, type = 'button' }) { return <button type={type} className={'button ' + kind} onClick={onClick} disabled={disabled}>{children}</button>; }
function Field({ label, children, hint }) { return <div className="field"><label>{label}{children}</label>{hint && <small>{hint}</small>}</div>; }
function ModalShell({ title, children, onClose }) {
    const reduced = useReducedMotion();
    const ref = useRef(null);
    useEffect(() => { const previous = document.activeElement; const old = document.body.style.overflow; document.body.style.overflow = 'hidden'; ref.current?.querySelector('button')?.focus(); const handler = (e) => { if (e.key === 'Escape')
        onClose(); if (e.key === 'Tab') {
        const els = ref.current?.querySelectorAll('button:not(:disabled),input,textarea,select,a[href],video[controls]');
        if (!els?.length)
            return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        }
        else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    } }; document.addEventListener('keydown', handler); return () => { document.body.style.overflow = old; document.removeEventListener('keydown', handler); previous?.focus(); }; }, [onClose]);
    return <motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.16}} onMouseDown={e => { if (e.target === e.currentTarget)
        onClose(); }}><motion.div className="drawer" initial={reduced?false:{x:28}} animate={{x:0}} exit={reduced?{}:{x:28}} transition={{duration:reduced?0:.22,ease:[.22,1,.36,1]}} role="dialog" aria-modal="true" aria-labelledby="drawer-title" ref={ref}><div className="drawer-top"><h2 id="drawer-title">{title}</h2><button className="icon-button" aria-label="Close panel" onClick={onClose}><X size={17}/></button></div><div className="drawer-body">{children}</div></motion.div></motion.div>;
}
export default function Dashboard() {
  const reduced = useReducedMotion();
  const router = useRouter(), pathname = usePathname(), params = useSearchParams();
  const route = parseMembersPath(pathname), view = route.view;
  const [state, setState] = useState(null), [error, setError] = useState(''), [loading, setLoading] = useState(true), [busy, setBusy] = useState(false), [toast, setToast] = useState(''), [dialog, setDialog] = useState(null), [mobile, setMobile] = useState(false), [now, setNow] = useState(null), [shareUrl, setShareUrl] = useState('');
  const menuRef = useRef(null), menuButton = useRef(null);
  const savedString = useSyncExternalStore(subscribeSaved, savedSnapshot, () => '[]');
  let savedIds = [];
  try { const value = JSON.parse(savedString); if (Array.isArray(value)) savedIds = value.filter(id => typeof id === 'string'); } catch { /* malformed local bookmarks are ignored */ }
  const isPublicDemo = state?.access?.mode !== 'private';
  const projects = state?.projects || [], updates = state?.updates || [], transactions = state?.transactions || [];
  const currentProject = projects.find(p => p.id === route.projectId);
  const modal = dialog || (currentProject ? { type: 'project', project: currentProject } : null);
  const closeModal = useCallback(() => {
    setDialog(null); setShareUrl('');
    if (route.projectId) router.replace(memberReturnPath(params.get('from')));
  }, [route.projectId, router, params]);
  const openModal = next => { setError(''); setShareUrl(''); setDialog(next); };
  const rememberOrigin = event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const destination = new URL(event.currentTarget.href);
    const origin = route.projectId ? memberReturnPath(params.get('from')) : `${pathname}${params.size ? `?${params}` : ''}`;
    destination.searchParams.set('from', origin);
    router.push(`${destination.pathname}${destination.search}`);
  };
  const load = useCallback(async () => {
    try {
      const response = await fetch('/api/members/dashboard', { cache: 'no-store' });
      if (!response.ok) throw new Error('The dashboard could not load. Please try again.');
      setState(await response.json()); setError('');
    } catch (e) { setError(e instanceof Error ? e.message : 'The dashboard could not load.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { const timer = setTimeout(load, 0); return () => clearTimeout(timer); }, [load]);
  useEffect(() => { const tick = () => setNow(Date.now()); const first = setTimeout(tick, 0), timer = setInterval(tick, 30000); return () => { clearTimeout(first); clearInterval(timer); }; }, []);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 5500); return () => clearTimeout(timer); }, [toast]);
  useEffect(() => {
    if (!mobile) return;
    const opener = menuButton.current;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const links = menuRef.current?.querySelectorAll('a[href],button:not(:disabled)');
    const first = links?.[0], last = links?.[links.length - 1]; first?.focus();
    const close = event => {
      if (event.key === 'Escape') { setMobile(false); menuButton.current?.focus(); }
      if (event.key === 'Tab' && first && last) {
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', close); return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', close); opener?.focus(); };
  }, [mobile]);
  const refresh = () => { setLoading(true); setError(''); load(); };
  const mutate = async (action, success) => {
    if (isPublicDemo) { openModal({ type: 'signin' }); return false; }
    if (!state || busy) return false;
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/members/dashboard', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ version: state.version, action }) });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) { setState(null); setDialog(null); }
        if (response.status === 409) { if (data.state) setState(data.state); setDialog(null); }
        throw new Error(data.error || 'Your change could not be saved. Please try again.');
      }
      setState(data); setToast(success); return true;
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not save changes.'); return false; }
    finally { setBusy(false); }
  };
  const toggleSaved = id => {
    try {
      const next = savedIds.includes(id) ? savedIds.filter(value => value !== id) : [...savedIds, id];
      localStorage.setItem(savedKey, JSON.stringify(next)); window.dispatchEvent(new Event('aram-saved'));
      setToast(next.includes(id) ? 'Saved in this browser. No email alerts are sent.' : 'Removed from this browser’s saved initiatives.');
    } catch { setError('This browser could not save the initiative. You can bookmark its page instead.'); }
  };
  const share = async id => {
    const url = new URL(projectPath(id), window.location.origin).href;
    try { await navigator.clipboard.writeText(url); setToast('Initiative link copied. You can share it when you’re ready.'); }
    catch { setShareUrl(url); }
  };
  const exportLedger = () => {
    if (!state) return;
    const url = URL.createObjectURL(new Blob([ledgerCsv(state)], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a'); a.href = url; a.download = 'aram-demo-ledger.csv'; a.click(); URL.revokeObjectURL(url); setToast('Sample ledger exported.');
  };
  const formSubmit = async e => {
    e.preventDefault(); if (!modal || !state || isPublicDemo) return;
    const fd = new FormData(e.currentTarget), text = key => String(fd.get(key) || '').trim(), amount = key => Math.round(Number(text(key)) * 100);
    let action, success;
    if (modal.type === 'edit') {
      action = { type: 'updateProject', projectId: modal.project.id, patch: { title: text('title'), description: text('description'), status: text('status'), fundingGoalPence: amount('goal'), peopleReached: Number(text('people')) } }; success = 'Initiative saved';
    } else if (modal.type === 'update') {
      action = { type: 'addUpdate', projectId: text('projectId'), title: text('title'), body: text('body') }; success = 'Field update saved';
    } else if (modal.type === 'transaction') {
      const kind = text('kind'), raw = amount('amount');
      action = { type: 'addTransaction', projectId: text('projectId') || null, description: text('description'), amountPence: kind === 'deployment' ? -raw : raw, kind, date: text('date') }; success = 'Sample entry saved';
    } else if (modal.type === 'member') { action = { type: 'updateMember', monthlyPence: amount('monthly') }; success = 'Demonstration preference saved'; }
    if (action && await mutate(action, success)) setDialog(null);
  };
  const totals = state ? calculateTotals(state) : null;
  const recordedGiving = transactions.filter(t => t.memberContribution).reduce((sum, t) => sum + t.amountPence, 0);
  const memberName = isPublicDemo ? 'Guest' : state?.member.name || 'Member';
  const voteClosed = now !== null && state && Date.parse(state.vote.closesAt) <= now;
  const shownUpdates = updates.filter(u => !params.get('initiative') || u.projectId === params.get('initiative'));
  const featured = projects.find(p => p.id === 'microcredit') || projects[0];
  const stats = totals ? [{ title: 'Money in', value: money(totals.contributedPence), note: 'Recorded contributions', icon: Wallet }, { title: 'Money out', value: money(totals.deployedPence), note: 'Recorded programme transfers', icon: Leaf }, { title: 'Cash held', value: money(totals.balancePence), note: 'Before commitments or new awards', icon: Wallet }, { title: 'Initiatives to explore', value: projects.length, note: 'Includes one unapproved concept', icon: Globe2 }] : [];
  const updateLink = id => { setDialog(null); router.push(`${memberPaths['Field updates']}?initiative=${encodeURIComponent(id)}`); };
  return <div className="aram-members"><a className="skip-link" href="#members-content">Skip to content</a><div className="app">
    {mobile && <button className="sidebar-backdrop" tabIndex={-1} aria-label="Close navigation" onClick={() => { setMobile(false); menuButton.current?.focus(); }}/>}
    <aside className={`sidebar ${mobile ? 'open' : ''}`} inert={!!modal} ref={menuRef}>
      <a className="brand" href="/"><img src="/members/aram-logo.png" alt="The Aram Initiative"/><small>Your connection<br/>to the work.</small></a>
      <nav className="nav" aria-label="Dashboard navigation">{nav.map(n => <Link key={n.name} href={memberPaths[n.name]} className={view === n.name ? 'active' : ''} aria-current={view === n.name ? 'page' : undefined} onClick={() => setMobile(false)}><n.icon/><span>{n.name}</span>{view === n.name && <motion.span className="nav-current" layoutId="members-nav-current" aria-hidden="true" transition={reduced?{duration:0}:{type:"spring",bounce:0,duration:.35}}/>}</Link>)}<div className="nav-divider"/>
        <Link href={memberPaths['About this prototype']} className={view === 'About this prototype' ? 'active' : ''} aria-current={view === 'About this prototype' ? 'page' : undefined} onClick={() => setMobile(false)}><HelpCircle/>About & how it works</Link>
        {!isPublicDemo && <Link href={memberPaths['Admin studio']} onClick={() => setMobile(false)}><Settings2/>Workspace studio</Link>}
      </nav>
      <div className="sidebar-bottom"><div className="sidebar-note"><Sparkles size={21}/><strong>Rooted in something bigger.</strong><p>Connecting the diaspora with people and possibilities in Sri Lanka.</p><a href="/about">Meet Aram<ArrowUpRight size={14}/></a></div><div className="profile"><div className="avatar">{isPublicDemo ? 'G' : memberName.split(/\s+/).map(p => p[0]).slice(0, 2).join('')}</div><div><strong>{memberName}</strong>{isPublicDemo ? <a href="/members/login">Sign in for private access</a> : <a href="/members/logout">Sign out</a>}</div></div></div>
    </aside>
    <main id="members-content" tabIndex={-1} className="main" inert={!!modal || mobile}>
      <header className="topbar"><button ref={menuButton} className="icon-button mobile-menu" aria-label="Open navigation" aria-expanded={mobile} onClick={() => setMobile(true)}><Menu size={20}/></button><div className="breadcrumb">Your Aram / <b>{view}</b></div><div className="top-actions"><Button onClick={refresh} disabled={loading}><RefreshCw size={15}/><span>Refresh data</span></Button>{isPublicDemo ? <a className="text-button" href="/join">Join Aram<ArrowRight size={14}/></a> : <span className="eyeline">Private workspace</span>}</div></header>
      <div className="access-banner"><span><Sparkles size={15}/><strong>Demonstration · Fictional money, votes and updates. No payments.</strong></span>{isPublicDemo ? <a href="/members/login">Sign in for private saved changes<ArrowRight size={14}/></a> : <Link href={memberPaths['About this prototype']}>How it works<ArrowRight size={14}/></Link>}</div>
      {error && !modal && <div className="error-banner" role="alert"><span>{error}</span><Button onClick={refresh}>Try again</Button></div>}
      {loading ? <div className="loading" role="status"><span className="spinner"/>Connecting you to Aram…</div> : !state ? <div className="empty"><h1>Let’s reconnect.</h1><p>Reload to explore the sample dashboard, or sign in for private saved changes.</p><Button onClick={refresh}>Try again</Button><a className="source-link" href="/members/login">Sign in</a></div> : <div key={view} className="view">
        <div className="page-heading"><div><h1>{headings[view] || 'Page not found.'}</h1><p>{descriptions[view]}</p></div>{view === 'Funding & ledger' && <Button onClick={exportLedger}><Download/>Export sample CSV</Button>}</div>
        {route.projectId && !currentProject && <div className="notice">That initiative is not available. <Link href={memberPaths.Initiatives}>Browse all initiatives</Link></div>}
        {view === 'Overview' && <>
          <section className="hero motion-hero"><div className="hero-copy"><div className="hero-kicker"><Globe2 size={15}/>From where we are. To where we’re rooted.</div><h2>Find your part<br/>in the work.</h2><p>Meet local partners, explore continuing initiatives and bring your time, skills or curiosity.</p><a className="button primary" href="/join">Explore ways to contribute<ArrowRight size={15}/></a><Link className="source-link" href={memberPaths.Initiatives}>Meet the initiatives<ArrowRight size={14}/></Link></div><AramBrandMark/></section>
          <AramRoots/>
          <CommunityPreview now={now}/>
          <section className="stats" aria-label="Sample community fund totals">{stats.map(s => <div className="stat" key={s.title}><div className="stat-top">{s.title}<s.icon size={18}/></div><div className="stat-number">{s.value}</div><div className="stat-note">{s.note}</div></div>)}</section>
          <div className="content-grid"><section><div className="section-head"><h2>Inside an initiative</h2><Link className="text-button" href={memberPaths.Initiatives}>View all<ArrowRight size={14}/></Link></div>{featured && <ProjectCard project={featured} onOpen={rememberOrigin}/>}
            {!isPublicDemo && <section className="panel member-panel"><h2>Your recorded support</h2><div className="member-summary"><div><strong>{money(recordedGiving)}</strong><small>Total recorded entries, not inferred monthly payments</small></div><Button onClick={() => openModal({ type: 'member' })}>Monthly preference<Pencil size={15}/></Button></div><p>Your {money(state.member.monthlyPence)} monthly preference does not create a subscription. The sample history contains {transactions.filter(t => t.memberContribution).length} recorded contribution(s), even though the example profile starts earlier.</p><p className="panel-footnote">No individual outcomes are attributed to a contribution without supporting evidence.</p></section>}
          </section><div className="right-column"><section className="panel"><h2>What makes Aram?</h2><p>Discovery. Research & Insights. Long-term Initiatives.</p><p className="panel-footnote">These are Aram’s three pillars. Education, wellbeing and economic development are areas of work within them.</p><a className="source-link" href="/about">Meet the team and approach<ArrowRight size={14}/></a></section>
            <section className="panel activity-section"><h2>Your next step</h2><p>Explore a partnership, bring a skill, or save an initiative to revisit.</p><Link className="source-link" href={memberPaths['Community vote']}>Explore the preference exercise<ArrowRight size={14}/></Link><Link className="source-link" href={memberPaths['Funding & ledger']}>See how the sample fund adds up<ArrowRight size={14}/></Link></section>
            <section className="panel activity-section"><h2>Saved in this browser</h2>{projects.filter(p=>savedIds.includes(p.id)).length ? projects.filter(p=>savedIds.includes(p.id)).map(p=><Link className="source-link" key={p.id} href={projectPath(p.id)} onClick={rememberOrigin}>{p.title}<ArrowRight size={14}/></Link>) : <p>Open an initiative and choose “Save to follow”. This is a local bookmark, without email alerts.</p>}</section>
          </div></div>
        </>}
        {view === 'Initiatives' && <InitiativeList projects={projects} partnerId={params.get('partner') || ''} onOpen={rememberOrigin}/>}
        {view === 'Thought leadership' && <ThoughtLeadership/>}
        {view === 'Community events' && <CommunityEvents now={now}/>}
        {view === 'Funding & ledger' && <FundingView state={state} onOpen={rememberOrigin}/>}
        {view === 'Community vote' && <>
          <div className="vote-intro"><section className="panel"><span className="pill demo">Private preference exercise</span><h2>Which initiative would<br/>you like to explore next?</h2><p>This records one choice in your private workspace. It does not award funds, select an official winner or represent a community-wide ballot.</p>{isPublicDemo && <a className="button primary" href="/members/login">Sign in to save a private choice<ArrowRight size={15}/></a>}</section><div className="vote-guide"><div><span>1</span>Read the initiatives and partner context.</div><div><span>2</span>Save one choice; change it before the deadline.</div><div><span>3</span><p><strong>Closes {voteDeadline(state.vote.closesAt)}</strong><br/>UK time · {now === null ? 'Checking time…' : voteRemaining(state.vote.closesAt, now)}</p></div></div></div>
          <FundingExplanation/>
          <div className="project-grid">{projects.filter(p=>p.status!=='completed').map(p=><ProjectCard key={p.id} project={p} onOpen={rememberOrigin} selected={!isPublicDemo && state.vote.projectId===p.id}>{!isPublicDemo && <Button kind={state.vote.projectId===p.id?'subtle':'primary'} disabled={busy || voteClosed || now === null} onClick={()=>mutate({type:'vote',projectId:p.id},'Private demonstration choice saved')}>{state.vote.projectId===p.id ? <><Check size={15}/>Your saved choice</> : 'Choose this initiative'}</Button>}</ProjectCard>)}</div>
          <section className="panel activity-section"><h2>{voteClosed ? 'Round closed' : 'After the deadline'}</h2><p>{voteClosed ? 'The sample round has closed; saved preferences remain private.' : 'Your saved preference will remain private when this exercise closes.'} There is no shared tally or results publication in V1. A real round needs an agreed budget, delivery scope, eligibility, decision rules, tie policy and results date.</p></section>
        </>}
        {view === 'Field updates' && <>
          <div className="notice">Fictional sample stories, not field reports. No real authors, quotes or delivery photographs are attributed to them.</div>
          {params.get('initiative') && <p className="section-title">Updates for {projects.find(p=>p.id===params.get('initiative'))?.title || 'this initiative'}. <Link className="ledger-link" href={memberPaths['Field updates']}>Show all</Link></p>}
          <div className="updates-grid">{shownUpdates.map(u=><article className="panel update-card" key={u.id}><span className="eyeline"><BookOpen size={15}/>{projects.find(p=>p.id===u.projectId)?.title || 'Community'}</span><h3>{u.title}</h3><p>{u.body}</p><footer><time>{recordDate(u.date)}</time><span>Sample story</span></footer><Link className="source-link" href={projectPath(u.projectId)} onClick={rememberOrigin}>View initiative and its updates<ArrowRight size={14}/></Link></article>)}</div>
          {!shownUpdates.length && <div className="empty"><p>No sample updates for this selection.</p><Link className="source-link" href={memberPaths['Field updates']}>Show all updates</Link></div>}
        </>}
        {view === 'Admin studio' && <>
          <div className="notice"><strong>{isPublicDemo ? 'Read-only studio preview' : 'Private workspace tools'}</strong><p>{isPublicDemo ? 'You can inspect the forms. Saving requires existing private access; this preview grants no role or permission.' : 'These tools edit demonstration records, not real finances or public programme claims.'}</p><Link href={memberPaths.Overview}>Return to member view</Link></div>
          <div className="studio-grid"><section className="panel studio-card"><h2>Initiative records</h2><div className="studio-list">{projects.map(p=><div className="studio-row" key={p.id}><div>{p.title}<small>{money(p.fundingGoalPence)} illustrative planning budget</small></div><Button onClick={()=>openModal({type:'edit',project:p})}>{isPublicDemo?'Preview':'Edit'}<Pencil size={15}/></Button></div>)}</div></section><section className="panel studio-card"><h2>Workspace records</h2><div className="studio-list"><div className="studio-row"><span>Field updates</span><Button onClick={()=>openModal({type:'update'})}>{isPublicDemo?'Preview form':'Add update'}</Button></div><div className="studio-row"><span>Cash ledger</span><Button onClick={()=>openModal({type:'transaction'})}>{isPublicDemo?'Preview form':'Add entry'}</Button></div><div className="studio-row"><span>Monthly preference</span><Button onClick={()=>openModal({type:'member'})}>{isPublicDemo?'Preview form':'Edit'}</Button></div><div className="studio-row"><span>Sample ledger</span><Button onClick={exportLedger}><Download size={15}/>Export CSV</Button></div></div></section></div>
        </>}
        {view === 'About this prototype' && <div className="help-grid">
          <section className="panel"><h2>Built around Aram.</h2><p>This explores how the diaspora can understand, connect and contribute to continuing locally grounded work. The logo, research map and initiative context come from Aram’s public website.</p><p>Aram’s pillars are Discovery, Research & Insights, and Long-term Initiatives. Programme categories describe areas of work; they are not the pillars.</p><a className="source-link" href="/about">Who Aram is and how it works<ArrowRight size={14}/></a><a className="source-link" href="/reports">Public reports<ArrowRight size={14}/></a></section>
          <section className="panel"><h2>Explore. Take part. Return.</h2><ul><li>Meet initiatives and their confirmed partners.</li><li>Use Aram’s existing join route to explore volunteering.</li><li>Save initiatives locally and copy links to share.</li><li>Read the sample ledger and export it as CSV.</li><li>Use existing private access to save a demonstration choice.</li></ul><p>Local saves are browser bookmarks. There are no email alerts or payments.</p></section>
          <section className="panel"><h2>Funding and decisions</h2><FundingExplanation/><p>Public programme status is separate from editable prototype status. Pen Pal is publicly described as a pilot; the AI learning concept is unapproved. No real programme outcome is inferred from the sample financials.</p></section>
          <section className="panel"><h2>Before a real launch</h2><p>Confirm the legal receiving entity, governing responsibilities, safeguards, payment handling, funding rules and partner-reviewed evidence. This page does not assert that those arrangements are approved.</p><p>Reach figures in the workspace are fictional counts. They have no measurement period, deduplication method or outcome attribution, so they are not presented as a headline impact total.</p><Link className="source-link" href={memberPaths['Admin studio']}>Preview the workspace studio<ArrowRight size={14}/></Link></section>
          <section className="panel"><h2>Example membership record</h2><p>Profile start: {recordDate(state.member.joinedAt)}. That date does not establish a paid subscription or a complete payment history.</p><p>Monthly preference: {money(state.member.monthlyPence)}. Total in recorded example member entries: {money(recordedGiving)}. Missing months are not invented.</p></section>
        </div>}
        <footer className="bottom-note"><span>The Aram Initiative · The desire to do good.</span><a href="/about">Meet Aram<ArrowUpRight size={13}/></a></footer>
      </div>}
    </main>
    <AnimatePresence>{modal && state && <ModalShell title={modal.type === 'project' ? 'Inside the initiative' : modal.type === 'signin' ? 'Private saved changes' : modal.type === 'edit' ? 'Initiative record' : modal.type === 'update' ? 'Field update' : modal.type === 'transaction' ? 'Ledger entry' : 'Monthly preference'} onClose={closeModal}>
      {error && <div className="error-banner" role="alert">{error}</div>}
      {modal.type === 'project' ? <><div className="notice">Sample workspace · Financials and updates are fictional.</div><ProjectDetails project={modal.project} state={state} followed={savedIds.includes(modal.project.id)} onFollow={()=>toggleSaved(modal.project.id)} onShare={()=>share(modal.project.id)} onUpdates={()=>updateLink(modal.project.id)}/>{shareUrl && <Field label="Copy this initiative link"><input readOnly value={shareUrl} onFocus={e=>e.target.select()}/></Field>}</> : modal.type === 'signin' ? <div className="signin-prompt"><h3>Explore freely. Save privately.</h3><p>The public demo is open to everyone. Private editing is available to accounts with existing access.</p><a className="button primary" href="/members/login">Sign in<ArrowRight size={15}/></a><a className="source-link" href="/join">New to Aram? Explore joining</a></div> : <>
        {isPublicDemo && <div className="notice">Read-only preview. <a href="/members/login">Sign in with existing private access to save.</a></div>}
        <form className="form" onSubmit={formSubmit} key={modal.type === 'edit' ? modal.project.id : modal.type}><fieldset disabled={isPublicDemo || busy}>
          {modal.type === 'edit' ? <><Field label="Initiative name"><input name="title" defaultValue={modal.project.title} required maxLength={120}/></Field><Field label="Description"><textarea name="description" defaultValue={modal.project.description} required maxLength={2000}/></Field><Field label="Prototype status" hint={`Public source status: ${projectContext(modal.project).publicStatus}. Editing this form does not change the public programme.`}><select name="status" defaultValue={modal.project.status}><option value="active">In progress</option><option value="completed">Completed</option><option value="proposed">Proposal</option></select></Field><Field label="Illustrative planning budget (£)" hint="A planning figure, not a fundraising target or funding award."><input name="goal" type="number" defaultValue={modal.project.fundingGoalPence/100} min="0.01" max="1000000" step="0.01" required/></Field><div className="detail-stat"><strong>{money(modal.project.deployedPence)}</strong><small>Money out is calculated from the ledger. Use an entry to change it.</small></div><Field label="Fictional reach count" hint="Not a measured or attributable outcome."><input name="people" type="number" defaultValue={modal.project.peopleReached} min="0" step="1" required/></Field></> : modal.type === 'update' ? <><Field label="Initiative"><select name="projectId" required>{projects.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></Field><Field label="Title"><input name="title" maxLength={120} required/></Field><Field label="Sample update"><textarea name="body" maxLength={3000} required/></Field></> : modal.type === 'transaction' ? <><Field label="Entry type"><select name="kind"><option value="contribution">Money into the fund</option><option value="deployment">Money out of the fund</option></select></Field><Field label="Initiative"><select name="projectId"><option value="">General fund</option>{projects.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></Field><Field label="Description"><input name="description" maxLength={180} required/></Field><Field label="Amount (£)"><input name="amount" type="number" step="0.01" min="0.01" required/></Field><Field label="Record date"><input name="date" type="date" defaultValue={new Date().toISOString().slice(0,10)} required/></Field><p className="notice">Records a fictional cash entry only. No money is collected, transferred or awarded by this action.</p></> : <><p>This amount is a demonstration preference. It does not create a subscription or generate payment history.</p><Field label="Monthly preference (£)"><input name="monthly" defaultValue={state.member.monthlyPence/100} type="number" min="0" max="10000" step="0.01" required/></Field></>}
          <Button type="submit" kind="primary" disabled={isPublicDemo || busy}>{isPublicDemo ? 'Preview only · saving disabled' : busy ? 'Saving…' : 'Save demonstration record'}</Button>
        </fieldset><Button onClick={closeModal}>{isPublicDemo ? 'Close preview' : 'Cancel'}</Button></form>
      </>}
    </ModalShell>}</AnimatePresence>
    {toast && <div className="toast" role="status"><CheckCircle2 size={18}/>{toast}</div>}
  </div></div>;
}
