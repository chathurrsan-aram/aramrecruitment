'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, FileText, Table, Lock } from 'lucide-react';
import { TruePotentialBadge } from './venture-card';
import { useFounderModal } from './founder-modal';
import { ventureSectors, investorPositions } from '@/data/venturesData';

/* ─── True Potential involvement data per venture ─────────────────────── */
const TP_INVOLVEMENT = {
  'vanni-agriconnect': {
    strategy: 'Go-to-market planning and farmer network structure for the Vanni corridor',
    tech: 'WhatsApp-native ordering platform design and build',
    delivery: 'Colombo buyer partnership coordination and pilot management',
  },
  'malai-learn': {
    strategy: 'Estate school market entry scoping and distribution strategy',
    tech: 'Offline-first Android app architecture and Tamil content integration',
    delivery: 'NGO licensing pipeline and estate welfare society outreach',
  },
};

/* ─── True Potential Involvement Block ────────────────────────────────── */
function TruePotentialBlock({ ventureId }) {
  const { open } = useFounderModal();
  const involvement = TP_INVOLVEMENT[ventureId];
  if (!involvement) return null;

  return (
    <div className="rounded-xl border-l-4 border-l-[#C9A84C] overflow-hidden" style={{ backgroundColor: '#1B3A4B' }}>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold text-[#C9A84C] tracking-wider">✦ TRUE POTENTIAL</span>
          <span className="text-xs font-semibold text-[#C9A84C]">True Potential Involvement</span>
        </div>
        <div className="space-y-3">
          {[
            { icon: '🧠', label: 'Strategy', text: involvement.strategy },
            { icon: '💻', label: 'Tech', text: involvement.tech },
            { icon: '📦', label: 'Delivery', text: involvement.delivery },
          ].map(row => (
            <div key={row.label} className="flex items-start gap-2.5">
              <span className="text-sm flex-shrink-0 mt-0.5">{row.icon}</span>
              <div>
                <span className="text-xs font-semibold text-[#C9A84C]">{row.label}: </span>
                <span className="text-xs text-[#A8C4D4]">{row.text}</span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={open}
          className="mt-4 text-xs text-[#C9A84C] hover:text-[#F2E4B8] transition-colors inline-flex items-center gap-1"
        >
          Who is behind True Potential? <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

/* ─── Stat Block (dark theme) ──────────────────────────────────────── */
function StatBlock({ label, value }) {
  return (
    <div className="bg-[#1E2130] rounded-lg p-3 text-center border border-[#2A2D3E]">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A]">{label}</p>
    </div>
  );
}

/* ─── Tab Pill (dark theme) ─────────────────────────────────────────── */
function TabPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
        active ? 'bg-[#6D4A9E]/20 text-[#9B72CF]' : 'text-[#7A7A9A] hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

/* ─── Document Row (dark theme) ─────────────────────────────────────── */
function DocumentRow({ doc }) {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Document access request:', { document: doc.name, ...form });
    setSubmitted(true);
    setShowForm(false);
  };

  const Icon = doc.type === 'XLSX' ? Table : FileText;

  return (
    <div className="p-3 rounded-lg bg-[#1E2130] border border-[#2A2D3E]">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-[#7A7A9A] flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">{doc.name}</p>
          <p className="text-[10px] font-mono text-[#7A7A9A] uppercase">{doc.type}</p>
        </div>
        {submitted ? (
          <span className="text-xs text-emerald-400">Requested</span>
        ) : (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1 text-xs text-[#9B72CF] hover:text-[#6D4A9E] transition-colors"
          >
            <Lock className="w-3 h-3" /> Request Access
          </button>
        )}
      </div>
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleSubmit}
            className="mt-3 space-y-2 overflow-hidden"
          >
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-[#13151F] border border-[#2A2D3E] text-white text-sm placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E]"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-[#13151F] border border-[#2A2D3E] text-white text-sm placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E]"
            />
            <button type="submit" className="w-full py-2 bg-[#6D4A9E] text-white rounded-lg text-sm font-medium hover:bg-[#5A3D82] transition-colors">
              Submit
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Interest Form (dark theme) ────────────────────────────────────── */
function InterestForm({ companyName, variant = 'portfolio' }) {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', note: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${variant} interest:`, { company: companyName, ...form });
    setSubmitted(true);
    setShowForm(false);
  };

  if (submitted) {
    return (
      <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-700/30 text-center">
        <p className="text-sm text-emerald-400 font-medium">Interest registered successfully</p>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="flex gap-3">
        <button
          onClick={() => setShowForm(true)}
          className="flex-1 py-3 bg-[#6D4A9E] text-white rounded-xl font-medium hover:bg-[#5A3D82] transition-colors flex items-center justify-center gap-2 text-sm"
        >
          {variant === 'portfolio' ? 'Express Interest' : 'Register Interest'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        required
        placeholder="Name"
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        className="w-full px-4 py-2.5 rounded-xl bg-[#13151F] border border-[#2A2D3E] text-white text-sm placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E]"
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        className="w-full px-4 py-2.5 rounded-xl bg-[#13151F] border border-[#2A2D3E] text-white text-sm placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E]"
      />
      <textarea
        placeholder="Short note (optional)"
        rows={2}
        value={form.note}
        onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
        className="w-full px-4 py-2.5 rounded-xl bg-[#13151F] border border-[#2A2D3E] text-white text-sm placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E] resize-none"
      />
      <div className="flex gap-2">
        <button type="submit" className="flex-1 py-2.5 bg-[#6D4A9E] text-white rounded-xl text-sm font-medium hover:bg-[#5A3D82] transition-colors">
          Submit
        </button>
        <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-[#2A2D3E] text-[#7A7A9A] rounded-xl text-sm hover:text-white transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ─── Portfolio Panel Content (dark theme) ──────────────────────────── */
function PortfolioPanelContent({ company }) {
  const [tab, setTab] = useState('your-position');
  const sector = ventureSectors.find(s => s.id === company.sector);

  const stageColor = company.stage === 'pre-seed' ? '#6D4A9E' : '#1ABC9C';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          {sector && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium" style={{ backgroundColor: `${sector.color}15`, color: sector.color, border: `1px solid ${sector.color}30` }}>
              {sector.name}
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium capitalize" style={{ backgroundColor: `${stageColor}20`, color: stageColor, border: `1px solid ${stageColor}30` }}>
            {company.stage}
          </span>
          <span className="text-xs text-[#7A7A9A] font-mono">{company.region}</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-1">{company.name}</h2>
        {company.truePotential && <TruePotentialBadge size="md" />}
        <p className="text-[#A0A0B8] mt-2">{company.tagline}</p>
      </div>

      {/* Stat bar */}
      <div className="grid grid-cols-4 gap-2">
        <StatBlock label="Seeking" value={`£${(company.seeking / 1000).toFixed(0)}k`} />
        <StatBlock label="Equity" value={`${company.equity}%`} />
        <StatBlock label="Raised" value={`£${(company.raised / 1000).toFixed(0)}k`} />
        <StatBlock label="Valuation" value={`£${(company.valuation / 1000).toFixed(0)}k`} />
      </div>

      {/* Internal tabs */}
      <div className="flex gap-1 bg-[#13151F] rounded-lg p-1">
        {['Your Position', 'Overview', 'Growth Plan', 'Financials', 'Documents'].map(t => (
          <TabPill key={t} label={t} active={tab === t.toLowerCase().replace(' ', '-')} onClick={() => setTab(t.toLowerCase().replace(' ', '-'))} />
        ))}
      </div>

      {/* Tab content */}
      {tab === 'your-position' && (() => {
        const position = investorPositions[company.id];
        if (!position) {
          return (
            <div className="text-center py-8">
              <p className="text-[#7A7A9A] text-sm">No position data available for this venture.</p>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1E2130] rounded-xl p-4 border border-[#2A2D3E]">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A] mb-1">Amount Invested</p>
                <p className="text-xl font-bold text-white">£{position.invested.toLocaleString()}</p>
              </div>
              <div className="bg-[#1E2130] rounded-xl p-4 border border-[#2A2D3E]">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A] mb-1">Current Value</p>
                <p className="text-xl font-bold text-white">£{position.positionValue.toLocaleString()}</p>
              </div>
              <div className="bg-[#1E2130] rounded-xl p-4 border border-[#2A2D3E]">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A] mb-1">Equity Held</p>
                <p className="text-xl font-bold text-white">{position.equityHeld}%</p>
              </div>
              <div className="bg-[#1E2130] rounded-xl p-4 border border-[#2A2D3E]">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A] mb-1">Return Multiple</p>
                <p className={`text-xl font-bold ${position.returnMultiple >= 1 ? 'text-emerald-400' : 'text-white'}`}>{position.returnMultiple.toFixed(2)}x</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-[#2A2D3E]">
                <span className="text-sm text-[#7A7A9A]">Share Class</span>
                <span className="text-sm font-medium text-white">{position.shareClass}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#2A2D3E]">
                <span className="text-sm text-[#7A7A9A]">Investment Date</span>
                <span className="text-sm font-medium text-white">{new Date(position.investmentDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#2A2D3E]">
                <span className="text-sm text-[#7A7A9A]">Company Valuation</span>
                <span className="text-sm font-medium text-white">£{(position.currentValuation / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#2A2D3E]">
                <span className="text-sm text-[#7A7A9A]">Status</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-900/30 text-emerald-400 border border-emerald-700/30 font-medium">{position.status}</span>
              </div>
            </div>
            <p className="text-xs text-[#7A7A9A] text-center italic">
              Position data shown for demo purposes. Live positions would be connected to your investor account.
            </p>
          </div>
        );
      })()}

      {tab === 'overview' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Problem</h3>
            <p className="text-sm text-[#A0A0B8] leading-relaxed">{company.problem}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Thesis</h3>
            <p className="text-sm text-[#A0A0B8] leading-relaxed">{company.thesis}</p>
          </div>
          {/* True Potential involvement */}
          {company.truePotential && <TruePotentialBlock ventureId={company.id} />}
          {/* Founder card */}
          <div className="p-4 rounded-xl bg-[#1E2130] border border-[#2A2D3E]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#6D4A9E]/20 flex items-center justify-center">
                <span className="font-display text-sm font-bold text-[#9B72CF]">{company.founder.initials}</span>
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{company.founder.name}</p>
                <p className="text-xs text-[#7A7A9A]">Age {company.founder.age} · {company.founder.based}</p>
              </div>
            </div>
            <p className="text-sm text-[#A0A0B8] mb-2">{company.founder.background}</p>
            <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#6D4A9E]/10 text-[#9B72CF] border border-[#6D4A9E]/20">
              {company.founder.experience}
            </span>
          </div>
          {/* Why Now */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Why Now</h3>
            <ul className="space-y-2">
              {company.whyNow.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#A0A0B8]">
                  <span className="text-[#9B72CF] mt-1 flex-shrink-0">→</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab === 'growth-plan' && (
        <div className="space-y-4">
          {company.growthPlan.map((phase, i) => (
            <div key={i} className="relative pl-6">
              {i < company.growthPlan.length - 1 && (
                <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-[#2A2D3E]" />
              )}
              <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: phase.color, backgroundColor: `${phase.color}20` }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: phase.color }} />
              </div>
              <div className="pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-white">{phase.label}</span>
                  <span className="text-[10px] font-mono text-[#7A7A9A]">{phase.timeframe}</span>
                </div>
                <ul className="space-y-1">
                  {phase.milestones.map((m, j) => (
                    <li key={j} className="text-sm text-[#A0A0B8] flex items-start gap-2">
                      <span className="mt-1 flex-shrink-0" style={{ color: phase.color }}>·</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'financials' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-2">
            <StatBlock label="Revenue" value={company.financials.revenue} />
            <StatBlock label="Monthly Burn" value={company.financials.burn} />
            <StatBlock label="Runway" value={company.financials.runway} />
            <StatBlock label="Model" value={company.financials.model.split(' ').slice(0, 2).join(' ')} />
          </div>
          <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-700/30">
            <p className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">Key Metric</p>
            <p className="text-lg font-bold text-white">{company.financials.keyMetric}</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#7A7A9A] mb-3">Market Size</p>
            <div className="grid grid-cols-3 gap-2">
              <StatBlock label="TAM" value={company.financials.tam} />
              <StatBlock label="SAM" value={company.financials.sam} />
              <StatBlock label="SOM" value={company.financials.som} />
            </div>
          </div>
          <p className="text-xs text-[#7A7A9A] text-center italic">Detailed financials available on request</p>
        </div>
      )}

      {tab === 'documents' && (
        <div className="space-y-3">
          {company.documents.map(doc => (
            <DocumentRow key={doc.name} doc={doc} />
          ))}
        </div>
      )}

      {/* Footer actions */}
      <div className="pt-4 border-t border-[#2A2D3E]">
        <InterestForm companyName={company.name} variant="portfolio" />
      </div>
    </div>
  );
}

/* ─── Emerging Panel Content (dark, single scrollable layout) ────────── */
function EmergingPanelContent({ venture }) {
  const sector = ventureSectors.find(s => s.id === venture.sector);
  const [form, setForm] = useState({ name: '', email: '', note: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Emerging interest:', { company: venture.name, ...form });
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          {sector && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium" style={{ backgroundColor: `${sector.color}15`, color: sector.color, border: `1px solid ${sector.color}30` }}>
              {sector.name}
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C]">
            Opportunity
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-1">{venture.name}</h2>
        <p className="text-xs font-mono text-[#7A7A9A]">{venture.region}</p>
        <p className="text-[#A0A0B8] mt-2">{venture.tagline}</p>
      </div>

      {/* Problem */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#6D4A9E]/10 text-[#9B72CF] border border-[#6D4A9E]/20 font-medium">
            Aram-identified
          </span>
        </div>
        <h3 className="text-sm font-semibold text-white mb-2">Problem</h3>
        <p className="text-sm text-[#A0A0B8] leading-relaxed">{venture.problem}</p>
      </div>

      <div className="h-px bg-[#2A2D3E]" />

      {/* Why Now */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Why Now</h3>
        <ul className="space-y-3">
          {venture.whyNow.map((point, i) => (
            <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#1E2130] border border-[#2A2D3E] text-sm text-[#A0A0B8]">
              <span className="text-[#C9A84C] mt-0.5 flex-shrink-0 font-bold">{i + 1}</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-[#2A2D3E]" />

      {/* Opportunity Overview */}
      {venture.opportunity && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white">Opportunity Overview</h3>
          <div className="grid grid-cols-3 gap-2">
            <StatBlock label="TAM" value={venture.opportunity.tam} />
            <StatBlock label="SAM" value={venture.opportunity.sam} />
            <StatBlock label="SOM" value={venture.opportunity.som} />
          </div>
          <div className="p-4 rounded-xl bg-[#1E2130] border border-[#2A2D3E]">
            <p className="text-xs font-mono uppercase tracking-wider text-[#7A7A9A] mb-2">Ideal Raise</p>
            <p className="text-lg font-bold text-[#C9A84C]">{venture.opportunity.idealRaise}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs font-mono uppercase tracking-wider text-[#7A7A9A]">Seeking</p>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C]">
              {venture.opportunity.seeking}
            </span>
          </div>
        </div>
      )}

      <div className="h-px bg-[#2A2D3E]" />

      {/* Register Interest CTA */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Register Interest</h3>
        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-700/30 text-center">
            <p className="text-sm text-emerald-400 font-medium">Interest registered successfully</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#13151F] border border-[#2A2D3E] text-white text-sm placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E]"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#13151F] border border-[#2A2D3E] text-white text-sm placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E]"
            />
            <textarea
              placeholder="Short note (optional)"
              rows={2}
              value={form.note}
              onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#13151F] border border-[#2A2D3E] text-white text-sm placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E] resize-none"
            />
            <button type="submit" className="w-full py-3 bg-[#6D4A9E] text-white rounded-xl text-sm font-medium hover:bg-[#5A3D82] transition-colors flex items-center justify-center gap-2">
              Register Interest <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ─── Main Slide Panel (dark, renders below portal nav) ──────────────── */
export default function SlidePanel({ item, type, onClose }) {
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop — sits below portal nav (z-30 < portal nav z-40) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel — slides in from the right, below the portal nav */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[480px] z-30 bg-[#181B24] border-l border-[#2A2D3E] overflow-y-auto shadow-2xl"
          >
            {/* Panel header — back button replicating Research platform pattern */}
            <div className="sticky top-0 bg-[#181B24]/95 backdrop-blur-sm border-b border-[#2A2D3E] px-6 py-3 z-10">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm font-medium text-[#9B72CF] hover:text-white transition-colors bg-[#6D4A9E]/10 px-4 py-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                {type === 'portfolio' ? 'All Ventures' : 'All Opportunities'}
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {type === 'portfolio' && <PortfolioPanelContent company={item} />}
              {type === 'emerging' && <EmergingPanelContent venture={item} />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
