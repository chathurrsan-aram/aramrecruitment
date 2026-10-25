// V4 · Member dashboard (Aram brand), from the Aram Members Redesign canvas. Sample figures; the vote stays in this tab.
'use client';
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import './v4.css';
import { displayFont, links, shareCaption, shareLinks } from '../redesign/links';
import { useShare } from '../redesign/useShare';

const proposals = [
  { area: 'Economic development · [district]', ask: '£[amount] requested · with [partner]' },
  { area: 'Education · [district]', ask: '£[amount] requested · with [partner]' },
  { area: 'Wellbeing · [district]', ask: '£[amount] requested · with [partner]' },
];
const slices = [['£16.50', 'Livelihoods', 66], ['£5.50', 'Education', 22], ['£3.00', 'Connection', 12]];
const totals = [['£13,125', 'Contributed by members'], ['£8,150', 'Sent to partners'], ['186', 'People reached'], ['[n]', 'Aram members']];
const placeholders = [
  { area: 'Education · [district]', tone: 'lilac' },
  { area: 'Wellbeing · [district]', tone: 'sand' },
];

export default function Dashboard() {
  const [picked, setPicked] = useState(null);
  const [voted, setVoted] = useState(false);
  const { copied, copy, canShare, share } = useShare(shareCaption);
  const castLabel = voted ? 'Change my vote' : picked === null ? 'Choose a proposal above' : 'Cast my vote';

  return <div className="aram-v4">
    <link rel="stylesheet" href={displayFont} precedence="default"/>
    <div className="v4-wrap">
      <header className="v4-top">
        <div className="v4-brand"><span className="v4-logo"><img src="/members/aram-logo.png" width="46" height="46" alt="The Aram Initiative"/></span><span className="v4-pill">Members dashboard</span><span className="v4-note">Sample figures</span></div>
        <div className="v4-top-actions"><button type="button" className="v4-outline" onClick={() => window.location.reload()}>Refresh</button><a className="v4-outline" href={links.signOut}>Sign out</a></div>
      </header>

      <div className="v4-row">
        <section className="v4-panel v4-impact" aria-labelledby="v4-who">
          <div className="v4-eyebrow"><span className="v4-tamil" lang="ta">வணக்கம்</span><span aria-hidden="true">·</span>Your impact</div>
          <h1 id="v4-who">Chath Thaneswaran</h1>
          <p className="v4-lede">From where you are to where we’re rooted. This is what your contribution is doing in Sri Lanka.</p>
          <p className="v4-quiet">Member since October 2026</p>
          <dl className="v4-stats">
            <div><dt>Put in</dt><dd>£25</dd></div>
            <div><dt>Each month</dt><dd>£25</dd></div>
            <div><dt>Initiatives backed</dt><dd>4</dd></div>
            <div className="v4-stat-gold"><dt>Your share of the fund</dt><dd>0.19%</dd></div>
          </dl>
        </section>

        <section className="v4-panel v4-membership" aria-labelledby="v4-status">
          <div className="v4-eyebrow">Membership</div>
          <h2 id="v4-status">You’re part of it.</h2>
          <p className="v4-body">Your £25 a month is pooled with other members and sent to community partners after each vote.</p>
          <a className="v4-gold-btn" href={links.ledger}>Manage contribution</a>
          <p className="v4-quiet v4-center">Next contribution 15 Nov 2026</p>
          <div className="v4-steps">
            <div className="v4-steps-title">Your next steps</div>
            <a href="#v4-vote"><span><strong>Vote in round [n]</strong><span className="v4-quiet"> · closes [date]</span></span><ArrowRight size={18} aria-hidden="true"/></a>
            <a href={links.updates}><span>Read the latest field update</span><ArrowRight size={18} aria-hidden="true"/></a>
            <a href={links.join}><span>Bring a skill to a partner</span><ArrowRight size={18} aria-hidden="true"/></a>
          </div>
        </section>
      </div>

      <section id="v4-vote" className="v4-panel" aria-labelledby="v4-vote-title">
        <div className="v4-vote-head"><span className="v4-eyebrow">Community vote [n]</span><span className="v4-open"><i aria-hidden="true"/>Voting open</span></div>
        <h2 id="v4-vote-title" className="v4-display">Choose the next award.</h2>
        <dl className="v4-vote-facts">
          <div><dt>Opens</dt><dd>[date and time]</dd></div>
          <div><dt>Closes</dt><dd>[date and time]</dd></div>
          <div><dt>Available to award</dt><dd>£4,975</dd></div>
          <div><dt>Voting as</dt><dd className="v4-gold-text">Chath Thaneswaran</dd></div>
        </dl>
        <div className="v4-options">
          {proposals.map((p, i) => <button key={i} type="button" className="v4-option" aria-pressed={picked === i} onClick={() => { setPicked(i); setVoted(false); }}>
            <span className="v4-option-top"><span>{p.area}</span><span className="v4-tick" aria-hidden="true">{picked === i && <Check size={14} strokeWidth={3}/>}</span></span>
            <span className="v4-option-name">[Proposal name]</span>
            <span className="v4-option-ask">{p.ask}</span>
          </button>)}
        </div>
        <div className="v4-cast">
          <p aria-live="polite">{voted ? <><strong>Vote recorded.</strong> <span>You can change it until voting closes.</span></> : '[n] of [n] members have voted so far.'}</p>
          <button type="button" className="v4-gold-btn" onClick={() => { if (picked !== null) setVoted(true); }}>{castLabel}</button>
        </div>
      </section>

      <section className="v4-panel" aria-labelledby="v4-slice-title">
        <div className="v4-eyebrow">Your slice of the work</div>
        <h2 id="v4-slice-title" className="v4-display">Where your £25 went.</h2>
        <p className="v4-body">Your contribution, split in line with this month’s awards.</p>
        <div className="v4-cards v4-cards-slices">{slices.map(([amount, area, pct]) => <div key={area} className="v4-light-card"><strong>{amount}</strong><span>{area} · {pct}%</span><div className="v4-track" aria-hidden="true"><i style={{ width: `${pct}%` }}/></div></div>)}</div>
      </section>

      <section className="v4-panel" aria-labelledby="v4-totals-title">
        <div className="v4-head-row"><div><div className="v4-eyebrow">Community totals</div><h2 id="v4-totals-title" className="v4-display">Together, so far.</h2></div><span className="v4-quiet">Reported October 2026</span></div>
        <div className="v4-cards v4-cards-totals">{totals.map(([value, label]) => <div key={label} className="v4-light-card"><strong>{value}</strong><span>{label}</span></div>)}</div>
      </section>

      <section className="v4-panel" aria-labelledby="v4-init-title">
        <div className="v4-head-row"><div><div className="v4-eyebrow">Initiatives</div><h2 id="v4-init-title" className="v4-display">What you’re helping build.</h2></div><span className="v4-quiet">Since you joined</span></div>
        <div className="v4-rail">
          <article className="v4-init">
            <img src="/members/aram-community.jpg" alt="Aram members in conversation with community members in Sri Lanka"/>
            <div className="v4-init-body">
              <span className="v4-init-area">Economic development · Eastern Province</span>
              <h3><a href={links.microcredit}>Microcredit Revolving Fund</a></h3>
              <p>Small loans for local livelihoods, with Vanni Hope.</p>
              <div className="v4-init-foot"><div className="v4-init-progress"><span><strong>£8,250</strong> of £12,000</span><span>69%</span></div><div className="v4-track v4-track-gold" aria-hidden="true"><i style={{ width: '69%' }}/></div></div>
            </div>
          </article>
          {placeholders.map(p => <article key={p.area} className="v4-init">
            <div className={`v4-photo v4-photo-${p.tone}`}>[Initiative photo]</div>
            <div className="v4-init-body"><span className="v4-init-area">{p.area}</span><h3>[Initiative name]</h3><p>[One line on what it does and who with.]</p><div className="v4-init-foot">£[amount] sent · [n] people</div></div>
          </article>)}
          <article className="v4-init v4-concept">
            <span className="v4-init-area">Concept · not yet approved</span>
            <h3>[Concept name]</h3>
            <p>Still in research. It reaches a vote only once a partner and a plan are in place.</p>
            <a href={links.initiatives}>Follow its progress</a>
          </article>
        </div>
      </section>

      <div className="v4-row">
        <section className="v4-panel v4-half" aria-labelledby="v4-pay-title">
          <div className="v4-eyebrow">Contribution history</div>
          <h2 id="v4-pay-title" className="v4-display v4-display-sm">Your payments.</h2>
          <div className="v4-table-scroll"><table className="v4-table">
            <thead><tr><th scope="col">Date</th><th scope="col">Status</th><th scope="col">Amount</th><th scope="col">Note</th></tr></thead>
            <tbody>
              <tr><td>15 Oct 2026</td><td className="v4-paid">Paid</td><td>£25</td><td>First contribution</td></tr>
              <tr className="v4-scheduled"><td>15 Nov 2026</td><td>Scheduled</td><td>£25</td><td>Monthly contribution</td></tr>
            </tbody>
          </table></div>
          <p className="v4-ledger-note"><span>Every pound you give appears in the public ledger.</span><a href={links.ledger}>Open the ledger</a></p>
        </section>

        <section className="v4-panel v4-half" aria-labelledby="v4-share-title">
          <div className="v4-eyebrow">Tell people</div>
          <h2 id="v4-share-title" className="v4-display v4-display-sm">Bring someone with you.</h2>
          <div className="v4-share-card">
            <div className="v4-share-brand"><img src="/members/aram-logo.png" width="36" height="36" alt=""/><span>Your share card</span></div>
            <div className="v4-share-line">I’m rooted in the work.</div>
            <p>{shareCaption}</p>
          </div>
          <button type="button" className="v4-gold-btn v4-copy" onClick={copy}><span aria-live="polite">{copied ? 'Caption copied' : 'Copy caption'}</span></button>
          <div className="v4-share-links">
            {shareLinks.map(l => <a key={l.label} className="v4-outline" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}
            {canShare && <button type="button" className="v4-outline" onClick={share}>Share elsewhere</button>}
          </div>
        </section>
      </div>

      <footer className="v4-foot"><span>The Aram Initiative · The desire to do good.</span><span>Figures are sample data while the members area is in development.</span></footer>
    </div>
  </div>;
}
