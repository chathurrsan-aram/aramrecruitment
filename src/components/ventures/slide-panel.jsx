'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, ArrowRight, FileText, Table, Lock } from 'lucide-react';
import { TruePotentialBadge } from './venture-card';
import { ventureSectors } from '@/data/venturesData';

/* ─── Stat Block ─────────────────────────────────────────────────────── */
function StatBlock({ label, value }) {
  return (
    <div className="bg-[#1A1A2E] rounded-lg p-3 text-center">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A]">{label}</p>
    </div>
  );
}

/* ─── Tab Pill ────────────────────────────────────────────────────────── */
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

/* ─── Document Row ────────────────────────────────────────────────────── */
function DocumentRow({ doc, onRequest }) {
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
    <div className="p-3 rounded-lg bg-[#1A1A2E] border border-[#2A2A40]">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-[#7A7A9A] flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">{doc.name}</p>
          <p className="text-[10px] font-mono text-[#7A7A9A] uppercase">{doc.type}</p>
        </div>
        {submitted ? (
          <span className="text-xs text-[#2ECC71]">Requested</span>
        ) : (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1 text-xs text-[#9B72CF] hover:text-white transition-colors"
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
              className="w-full px-3 py-2 rounded-lg bg-[#0D0D14] border border-[#2A2A40] text-white text-sm placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E]"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-[#0D0D14] border border-[#2A2A40] text-white text-sm placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E]"
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

/* ─── Interest Form ───────────────────────────────────────────────────── */
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
      <div className="p-4 rounded-xl bg-[#2ECC71]/10 border border-[#2ECC71]/30 text-center">
        <p className="text-sm text-[#2ECC71] font-medium">Interest registered successfully</p>
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
        className="w-full px-4 py-2.5 rounded-xl bg-[#1A1A2E] border border-[#2A2A40] text-white text-sm placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E]"
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        className="w-full px-4 py-2.5 rounded-xl bg-[#1A1A2E] border border-[#2A2A40] text-white text-sm placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E]"
      />
      <textarea
        placeholder="Short note (optional)"
        rows={2}
        value={form.note}
        onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
        className="w-full px-4 py-2.5 rounded-xl bg-[#1A1A2E] border border-[#2A2A40] text-white text-sm placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E] resize-none"
      />
      <div className="flex gap-2">
        <button type="submit" className="flex-1 py-2.5 bg-[#6D4A9E] text-white rounded-xl text-sm font-medium hover:bg-[#5A3D82] transition-colors">
          Submit
        </button>
        <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-[#2A2A40] text-[#7A7A9A] rounded-xl text-sm hover:text-white transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ─── Portfolio Panel Content ─────────────────────────────────────────── */
function PortfolioPanelContent({ company }) {
  const [tab, setTab] = useState('overview');
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
        <p className="text-[#7A7A9A] mt-2">{company.tagline}</p>
      </div>

      {/* Stat bar */}
      <div className="grid grid-cols-4 gap-2">
        <StatBlock label="Seeking" value={`£${(company.seeking / 1000).toFixed(0)}k`} />
        <StatBlock label="Equity" value={`${company.equity}%`} />
        <StatBlock label="Raised" value={`£${(company.raised / 1000).toFixed(0)}k`} />
        <StatBlock label="Valuation" value={`£${(company.valuation / 1000).toFixed(0)}k`} />
      </div>

      {/* Internal tabs */}
      <div className="flex gap-1 bg-[#1A1A2E] rounded-lg p-1">
        {['Overview', 'Growth Plan', 'Financials', 'Documents'].map(t => (
          <TabPill key={t} label={t} active={tab === t.toLowerCase().replace(' ', '-')} onClick={() => setTab(t.toLowerCase().replace(' ', '-'))} />
        ))}
      </div>

      {/* Tab content */}
      {tab === 'overview' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Problem</h3>
            <p className="text-sm text-[#7A7A9A] leading-relaxed">{company.problem}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Thesis</h3>
            <p className="text-sm text-[#7A7A9A] leading-relaxed">{company.thesis}</p>
          </div>
          {/* Founder card */}
          <div className="p-4 rounded-xl bg-[#1A1A2E] border border-[#2A2A40]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#6D4A9E]/20 flex items-center justify-center">
                <span className="font-display text-sm font-bold text-[#9B72CF]">{company.founder.initials}</span>
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{company.founder.name}</p>
                <p className="text-xs text-[#7A7A9A]">Age {company.founder.age} · {company.founder.based}</p>
              </div>
            </div>
            <p className="text-sm text-[#7A7A9A] mb-2">{company.founder.background}</p>
            <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#6D4A9E]/10 text-[#9B72CF] border border-[#6D4A9E]/20">
              {company.founder.experience}
            </span>
          </div>
          {/* Why Now */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Why Now</h3>
            <ul className="space-y-2">
              {company.whyNow.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#7A7A9A]">
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
              {/* Timeline line */}
              {i < company.growthPlan.length - 1 && (
                <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-[#2A2A40]" />
              )}
              {/* Dot */}
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
                    <li key={j} className="text-sm text-[#7A7A9A] flex items-start gap-2">
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
          <div className="p-4 rounded-xl bg-[#2ECC71]/10 border border-[#2ECC71]/20">
            <p className="text-xs font-mono uppercase tracking-wider text-[#2ECC71] mb-1">Key Metric</p>
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
      <div className="pt-4 border-t border-[#2A2A40]">
        <InterestForm companyName={company.name} variant="portfolio" />
      </div>
    </div>
  );
}

/* ─── Emerging Panel Content ─────────────────────────────────────────── */
function EmergingPanelContent({ venture }) {
  const [tab, setTab] = useState('overview');
  const sector = ventureSectors.find(s => s.id === venture.sector);

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
            Emerging Opportunity
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-1">{venture.name}</h2>
        <p className="text-xs font-mono text-[#7A7A9A]">{venture.region}</p>
        <p className="text-[#7A7A9A] mt-2">{venture.tagline}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#1A1A2E] rounded-lg p-1">
        {['Overview', 'Why Now', 'Opportunity', 'Register Interest'].map(t => (
          <TabPill key={t} label={t} active={tab === t.toLowerCase().replace(' ', '-')} onClick={() => setTab(t.toLowerCase().replace(' ', '-'))} />
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#6D4A9E]/10 text-[#9B72CF] border border-[#6D4A9E]/20">
              Aram-identified
            </span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Problem</h3>
            <p className="text-sm text-[#7A7A9A] leading-relaxed">{venture.problem}</p>
          </div>
        </div>
      )}

      {tab === 'why-now' && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Macro Tailwinds</h3>
          <ul className="space-y-3">
            {venture.whyNow.map((point, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#1A1A2E] border border-[#2A2A40] text-sm text-[#7A7A9A]">
                <span className="text-[#C9A84C] mt-0.5 flex-shrink-0 font-bold">{i + 1}</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 'opportunity' && venture.opportunity && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-2">
            <StatBlock label="TAM" value={venture.opportunity.tam} />
            <StatBlock label="SAM" value={venture.opportunity.sam} />
            <StatBlock label="SOM" value={venture.opportunity.som} />
          </div>
          <div className="p-4 rounded-xl bg-[#1A1A2E] border border-[#2A2A40]">
            <p className="text-xs font-mono uppercase tracking-wider text-[#7A7A9A] mb-2">Ideal Raise</p>
            <p className="text-lg font-bold text-[#C9A84C]">{venture.opportunity.idealRaise}</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#7A7A9A] mb-2">Seeking</p>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C]">
              {venture.opportunity.seeking}
            </span>
          </div>
        </div>
      )}

      {tab === 'register-interest' && (
        <InterestForm companyName={venture.name} variant="emerging" />
      )}
    </div>
  );
}

/* ─── Main Slide Panel ────────────────────────────────────────────────── */
export default function SlidePanel({ item, type, onClose }) {
  const [fullscreen, setFullscreen] = useState(false);

  if (!item) return null;

  const panelClasses = fullscreen
    ? 'fixed inset-0 z-50'
    : 'fixed top-0 right-0 bottom-0 w-full md:w-[480px] z-50';

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-40 ${fullscreen ? 'bg-black/80 backdrop-blur-md' : 'bg-black/40 backdrop-blur-sm'}`}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: fullscreen ? 0 : '100%', opacity: fullscreen ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: fullscreen ? 0 : '100%', opacity: fullscreen ? 0 : 1 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`${panelClasses} bg-[#0D0D14] border-l-2 border-l-[#6D4A9E] overflow-y-auto`}
          >
            {/* Panel header */}
            <div className="sticky top-0 bg-[#0D0D14]/95 backdrop-blur-sm border-b border-[#2A2A40] px-6 py-3 flex items-center justify-between z-10">
              <button onClick={onClose} className="text-[#7A7A9A] hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              <button onClick={() => setFullscreen(!fullscreen)} className="text-[#7A7A9A] hover:text-white transition-colors">
                {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Content */}
            <div className={`p-6 ${fullscreen ? 'max-w-3xl mx-auto' : ''}`}>
              {type === 'portfolio' && <PortfolioPanelContent company={item} />}
              {type === 'emerging' && <EmergingPanelContent venture={item} />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
