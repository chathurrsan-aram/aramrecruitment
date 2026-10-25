// V5 · Member home (best of all), from the Aram Members Redesign canvas. Sample figures; the vote stays in this tab.
'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import './v5.css';
import { displayFont, featuredInsight, ledgerPreview, links, shareCaption, shareLinks } from '../redesign/links';
import { useShare } from '../redesign/useShare';

const nav = [['Home', '#v5-top'], ['Vote', '#v5-vote'], ['Fund and ledger', '#v5-money'], ['Initiatives', '#v5-work'], ['Field updates', '#v5-field'], ['Events', '#v5-field']];
const proposals = ['Economic development', 'Education', 'Wellbeing'];
const stats = [['£25', 'Put in so far'], ['£25', 'Each month'], ['4', 'Initiatives backed'], ['0.19%', 'Your share of the fund']];
const splits = {
  you: { caption: 'Your £25 this month, split in line with the awards.', values: ['£16.50', '£5.50', '£3.00'] },
  all: { caption: 'All £8,150 sent to partners so far, by area of work.', values: ['£5,379', '£1,793', '£978'] },
};
const areas = [['Livelihoods', 66, '#5E3F8C'], ['Education', 22, '#8B6BC4'], ['Connection', 12, '#F2B33D']];

export default function Home() {
  const [picked, setPicked] = useState(null);
  const [voted, setVoted] = useState(false);
  const [view, setView] = useState('you');
  const { copied, copy } = useShare(shareCaption);
  const split = splits[view];
  const castLabel = voted ? 'Change my vote' : picked === null ? 'Choose a proposal above' : 'Cast my vote';

  return <div className="aram-v5" id="v5-top">
    <link rel="stylesheet" href={displayFont} precedence="default"/>
    <header className="v5-header">
      <div className="v5-header-inner">
        <div className="v5-brand"><img src="/members/aram-logo.png" width="48" height="48" alt="The Aram Initiative"/><span>Members</span></div>
        <nav className="v5-nav" aria-label="Members">{nav.map(([name, href], i) => <a key={name} href={href} aria-current={i === 0 ? 'page' : undefined}>{name}</a>)}</nav>
        <div className="v5-header-end">
          <span className="v5-sent"><i aria-hidden="true"/><strong>£8,150</strong><span>sent to partners</span></span>
          <details className="v5-account"><summary aria-label="Account menu for Chath Thaneswaran">CT</summary><div><a href={links.ledger}>Manage contribution</a><a href={links.signOut}>Sign out</a></div></details>
        </div>
      </div>
    </header>

    <main className="v5-main">
      <section className="v5-hero" aria-labelledby="v5-hello">
        <div className="v5-hero-body">
          <div className="v5-hero-copy">
            <div className="v5-tamil" lang="ta">வணக்கம்</div>
            <h1 id="v5-hello">Chath, your £25 is at work.</h1>
            <p>You are one of the members funding community-led work in Sri Lanka. Here is where your money went and what needs you this month.</p>
            <div className="v5-hero-meta">Member since October 2026 · Next contribution 15 Nov 2026</div>
          </div>
          <div className="v5-month">
            <div className="v5-month-top"><span className="v5-eyebrow">This month</span><span className="v5-open"><i aria-hidden="true"/>Voting open</span></div>
            <h2>Help choose the next award.</h2>
            <p>£4,975 is ready to award across three proposals. Voting closes [date].</p>
            <a className="v5-gold-btn" href="#v5-vote">Vote now</a>
            <div className="v5-month-note">[n] of [n] members have voted</div>
          </div>
        </div>
        <dl className="v5-stats">{stats.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>

      <section id="v5-vote" className="v5-section" aria-labelledby="v5-vote-title">
        <div className="v5-section-head">
          <div><div className="v5-eyebrow">Community vote [n]</div><h2 id="v5-vote-title" className="v5-display">Choose the next award.</h2></div>
          <div className="v5-vote-facts"><span><span>Closes</span> <strong>[date and time]</strong></span><span><span>To award</span> <strong>£4,975</strong></span></div>
        </div>
        <div className="v5-options">
          {proposals.map((area, i) => <button key={area} type="button" className="v5-option" aria-pressed={picked === i} onClick={() => { setPicked(i); setVoted(false); }}>
            <span className="v5-option-top"><span>{area}</span><span className="v5-tick" aria-hidden="true">{picked === i && <Check size={14} strokeWidth={3}/>}</span></span>
            <span className="v5-option-name">[Proposal name]</span>
            <span className="v5-option-blurb">[One line on the work, the district and the partner.]</span>
            <span className="v5-option-ask">£[amount] requested</span>
          </button>)}
        </div>
        <div className="v5-cast">
          <p aria-live="polite">{voted ? <><strong>Vote recorded.</strong> <span>You can change it until voting closes.</span></> : 'Every proposal has a partner and a plan in place before it reaches a vote.'}</p>
          <button type="button" className="v5-dark-btn" onClick={() => { if (picked !== null) setVoted(true); }}>{castLabel}</button>
        </div>
      </section>

      <section id="v5-money" className="v5-section" aria-labelledby="v5-money-title">
        <div className="v5-section-head">
          <div><div className="v5-eyebrow">Out in the open</div><h2 id="v5-money-title" className="v5-display">Where the money went.</h2></div>
          <div className="v5-toggle" role="group" aria-label="Show figures for">
            <button type="button" aria-pressed={view === 'you'} onClick={() => setView('you')}>Your £25</button>
            <button type="button" aria-pressed={view === 'all'} onClick={() => setView('all')}>Everyone</button>
          </div>
        </div>
        <div className="v5-money">
          <div className="v5-card v5-split">
            <p className="v5-split-caption" aria-live="polite">{split.caption}</p>
            <ul>{areas.map(([name, pct, color], i) => <li key={name}><div><span>{name}</span><strong>{split.values[i]}</strong></div><div className="v5-track" aria-hidden="true"><i style={{ width: `${pct}%`, background: color }}/></div></li>)}</ul>
            <dl className="v5-split-totals"><div><dt>Money in</dt><dd>£13,125</dd></div><div><dt>Sent to partners</dt><dd>£8,150</dd></div><div><dt>Held for the vote</dt><dd>£4,975</dd></div></dl>
          </div>
          <div className="v5-card v5-ledger">
            <div className="v5-ledger-meta"><span>Source · [bank or provider]</span><span>Updated · [date and time]</span></div>
            <div className="v5-scroll"><ul>{ledgerPreview.map((row, i) => <li key={i}><span>{row.date}</span><span>{row.label}</span><span className={row.incoming ? 'v5-in' : undefined}>{row.amount}</span></li>)}</ul></div>
            <p className="v5-running"><span>Running costs: £[amount] a month, listed in full</span><a href={links.ledger}>Open the ledger</a></p>
          </div>
        </div>
      </section>

      <section id="v5-work" className="v5-section" aria-labelledby="v5-work-title">
        <div className="v5-section-head">
          <div><div className="v5-eyebrow">Initiatives</div><h2 id="v5-work-title" className="v5-display">Where your money is working.</h2></div>
          <a href={links.initiatives}>See all four initiatives</a>
        </div>
        <div className="v5-work">
          <div className="v5-map">
            <img src="/members/sri-lanka-districts.svg" width="190" height="314" alt="Map of Sri Lanka’s 25 districts, with districts where Aram works highlighted"/>
            <div className="v5-map-key"><span><i aria-hidden="true" className="v5-key-active"/>Active work</span><span><i aria-hidden="true" className="v5-key-planned"/>Planned work</span></div>
            <a href={links.research}>Open the research map</a>
          </div>
          <article className="v5-card v5-feature">
            <img src="/members/aram-community.jpg" alt="Aram members in conversation with community members in Sri Lanka"/>
            <div className="v5-feature-body">
              <div className="v5-tags"><span>Economic development</span><span className="v5-tag-gold">In progress</span></div>
              <h3>Microcredit Revolving Fund</h3>
              <p>Small loans for local livelihoods in the Eastern Province. As each loan is repaid, the money goes out again to the next family. Aram works with Vanni Hope on support and training.</p>
              <div className="v5-progress"><div><span><strong>£8,250</strong> of £12,000</span><span>69% funded</span></div><div className="v5-track" aria-hidden="true"><i style={{ width: '69%' }}/></div></div>
              <a className="v5-outline-btn" href={links.microcredit}>View the initiative</a>
            </div>
          </article>
        </div>
        <div className="v5-grid">
          {['Education · [district]', 'Wellbeing · [district]'].map(area => <article key={area} className="v5-card v5-mini"><div className="v5-eyebrow">{area}</div><h3>[Initiative name]</h3><p>[One line on what it does and who with.]</p><div className="v5-mini-foot">£[amount] sent · [n] people</div></article>)}
          <article className="v5-card v5-mini v5-concept"><div className="v5-eyebrow">Concept · not yet approved</div><h3>[Concept name]</h3><p>Still in research. It reaches a vote once a partner and a plan are in place.</p><a href={links.initiatives}>Follow its progress</a></article>
        </div>
      </section>

      <section id="v5-field" className="v5-section" aria-labelledby="v5-field-title">
        <div><div className="v5-eyebrow">Stay close</div><h2 id="v5-field-title" className="v5-display">From the field.</h2></div>
        <div className="v5-grid">
          <article className="v5-card v5-post"><div className="v5-eyebrow">Field update</div><h3>A new chapter for local enterprise</h3><p>A community check-in brings participants together to share plans and practical next steps.</p><div className="v5-post-foot">17 Oct 2026</div></article>
          <article className="v5-card v5-post"><div className="v5-eyebrow">Thought leadership</div><h3>{featuredInsight.title}</h3><p>{featuredInsight.authors.join(', ').replace(/, ([^,]*)$/, ' and $1')}</p><div className="v5-post-foot"><span>26 Dec 2024</span><a href={featuredInsight.url} target="_blank" rel="noreferrer">Read on Substack</a></div></article>
          <article className="v5-card v5-post"><div className="v5-eyebrow">Next gathering</div><h3>[Event name]</h3><p>[Date] · [Venue, London]</p><a className="v5-outline-btn" href={links.events}>Save a place</a></article>
        </div>
      </section>

      <section className="v5-section" aria-labelledby="v5-you-title">
        <div><div className="v5-eyebrow">Your membership</div><h2 id="v5-you-title" className="v5-display">Payments and sharing.</h2></div>
        <div className="v5-membership">
          <div className="v5-card v5-payments">
            <div className="v5-scroll"><table className="v5-table">
              <thead><tr><th scope="col">Date</th><th scope="col">Status</th><th scope="col">Amount</th><th scope="col">Note</th></tr></thead>
              <tbody>
                <tr><td>15 Oct 2026</td><td className="v5-paid">Paid</td><td>£25</td><td>First contribution</td></tr>
                <tr className="v5-scheduled"><td>15 Nov 2026</td><td>Scheduled</td><td>£25</td><td>Monthly contribution</td></tr>
              </tbody>
            </table></div>
            <div className="v5-payment-actions"><a className="v5-dark-btn" href={links.ledger}>Manage contribution</a><a className="v5-outline-btn" href={links.join}>Bring a skill instead</a></div>
          </div>
          <div className="v5-share">
            <div className="v5-share-card">
              <div className="v5-share-brand"><img src="/members/aram-logo.png" width="36" height="36" alt=""/><span>Your share card</span></div>
              <div className="v5-share-line">I’m rooted in the work.</div>
              <p>{shareCaption}</p>
            </div>
            <button type="button" className="v5-gold-btn" onClick={copy}><span aria-live="polite">{copied ? 'Caption copied' : 'Copy caption'}</span></button>
            <div className="v5-share-links">{shareLinks.map(l => <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}</div>
          </div>
        </div>
      </section>

      <footer className="v5-foot"><span><img src="/members/aram-logo.png" width="32" height="32" alt=""/>The Aram Initiative · The desire to do good.</span><span>Figures are sample data while the members area is in development.</span></footer>
    </main>
  </div>;
}
