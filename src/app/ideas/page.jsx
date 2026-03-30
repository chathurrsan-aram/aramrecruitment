'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Mail, Lock } from 'lucide-react';
import { ideas, SECTOR_COLOURS, ALL_SECTORS, STATUS_STYLES, READINESS_LABELS } from '@/data/ideas';

const PASSWORD = 'aram2026';

/* ─── Password Gate ──────────────────────────────────── */
function PasswordGate({ onAuth }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem('ideas-auth', 'true');
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#0f1729' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-7 h-7 text-purple-400" />
        </div>
        <h1 className="font-display text-2xl font-bold text-white mb-2">Aram Ideas Hub</h1>
        <p className="text-sm text-gray-400 mb-8">Enter the volunteer password to continue</p>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Password"
            autoFocus
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors ${
              error ? 'border-red-500' : 'border-white/10'
            }`}
          />
          {error && <p className="text-red-400 text-xs">Incorrect password</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors"
          >
            Enter
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ─── Sector Pill ────────────────────────────────────── */
function SectorPill({ sector, small = false }) {
  const colour = SECTOR_COLOURS[sector] || '#64748b';
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${
        small ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
      style={{ backgroundColor: `${colour}20`, color: colour }}
    >
      {sector}
    </span>
  );
}

/* ─── Status Badge ───────────────────────────────────── */
function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES['Unsure'];
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
      {status}
    </span>
  );
}

/* ─── Avatar ─────────────────────────────────────────── */
function OwnerAvatar({ name, sector }) {
  const colour = SECTOR_COLOURS[sector] || '#7c3aed';
  const initial = name.charAt(0).toUpperCase();
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold shrink-0"
      style={{ backgroundColor: colour }}
    >
      {initial}
    </span>
  );
}

/* ─── Filter Chips ───────────────────────────────────── */
function FilterChips({ active, onChange, counts }) {
  const total = ideas.length;
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
      <button
        onClick={() => onChange('All')}
        className={`shrink-0 text-xs font-medium px-3.5 py-2 rounded-full transition-colors ${
          active === 'All'
            ? 'bg-purple-600 text-white'
            : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
        }`}
      >
        All ({total})
      </button>
      {ALL_SECTORS.map((sector) => {
        const count = counts[sector] || 0;
        const colour = SECTOR_COLOURS[sector];
        const isActive = active === sector;
        return (
          <button
            key={sector}
            onClick={() => onChange(sector)}
            className={`shrink-0 text-xs font-medium px-3.5 py-2 rounded-full transition-colors ${
              isActive
                ? 'text-white'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
            }`}
            style={isActive ? { backgroundColor: colour } : undefined}
          >
            {sector} ({count})
          </button>
        );
      })}
    </div>
  );
}

/* ─── Readiness Bar (Detail only) ────────────────────── */
function ReadinessBar({ readiness }) {
  const filled = READINESS_LABELS.filter((r) => readiness[r.key]).length;
  if (filled === 0) return null;
  const colour = filled >= 4 ? '#22c55e' : filled >= 2 ? '#f59e0b' : '#ef4444';

  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-gray-300 mb-3">Readiness</h3>
      <div className="flex gap-1 mb-2">
        {READINESS_LABELS.map((r) => (
          <div
            key={r.key}
            className="flex-1 h-2.5 rounded-full"
            style={{ backgroundColor: readiness[r.key] ? colour : 'rgba(255,255,255,0.08)' }}
          />
        ))}
      </div>
      <div className="flex gap-1">
        {READINESS_LABELS.map((r) => (
          <span key={r.key} className="flex-1 text-[10px] text-gray-500 text-center">
            {r.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Idea Card (Overview) ───────────────────────────── */
function IdeaCard({ idea, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group w-full rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] p-5 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="text-white font-semibold text-sm">{idea.name}</h3>
            <StatusBadge status={idea.status} />
          </div>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">
            {idea.description}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <OwnerAvatar name={idea.owner} sector={idea.sectors[0]} />
              <span className="text-xs text-gray-400">{idea.owner}</span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {idea.sectors.map((s) => (
                <SectorPill key={s} sector={s} small />
              ))}
            </div>
          </div>
        </div>
        <span className="shrink-0 text-purple-400 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          View <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Detail View ────────────────────────────────────── */
function DetailView({ idea, onBack }) {
  const infoItems = [
    idea.owner && { label: 'Owner', value: idea.owner },
    idea.location && { label: 'Location / Region', value: idea.location },
    idea.partnersNeeded && { label: 'Partners', value: idea.partnersNeeded },
    idea.group && { label: 'Group', value: idea.group },
  ].filter(Boolean);

  const sections = [
    { label: 'The observation', content: idea.observation },
    { label: 'Root cause', content: idea.rootCause },
    { label: 'The idea', content: idea.description },
    { label: 'Impact type', content: idea.impactDescription ? `${idea.impactType} — ${idea.impactDescription}` : idea.impactType },
    { label: 'What changes after we leave?', content: idea.afterWeLeave },
    { label: 'Has anything similar been tried?', content: idea.similarTried },
    { label: 'Logistics needed', content: idea.logisticsNeeded },
    { label: 'Resources needed', content: idea.resources },
    { label: 'Success metrics', content: idea.successMetrics },
    { label: 'Risks & backup', content: idea.risks },
    { label: 'Open questions', content: idea.openQuestions },
    { label: 'Next steps', content: idea.nextSteps },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-purple-400 text-sm font-medium mb-6 hover:gap-2.5 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to all ideas
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">{idea.name}</h1>
        <div className="flex items-center gap-2 flex-wrap">
          {idea.sectors.map((s) => <SectorPill key={s} sector={s} />)}
          <StatusBadge status={idea.status} />
        </div>
      </div>

      {/* Readiness */}
      <ReadinessBar readiness={idea.readiness} />

      {/* Info grid */}
      {infoItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {infoItems.map((item) => (
            <div key={item.label} className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{item.label}</p>
              <p className="text-sm text-gray-200">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Content sections */}
      <div className="space-y-6">
        {sections.map(
          ({ label, content }) =>
            content && (
              <div key={label}>
                <h3 className="text-sm font-semibold text-gray-300 mb-2">{label}</h3>
                <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{content}</p>
              </div>
            )
        )}
      </div>

      {/* Phases */}
      {idea.phases && (idea.phases.preTrip || idea.phases.onTrip || idea.phases.postTrip) && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Phases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: 'Pre-trip', content: idea.phases.preTrip },
              { label: 'On-trip', content: idea.phases.onTrip },
              { label: 'Post-trip', content: idea.phases.postTrip },
            ].map(
              (phase) =>
                phase.content && (
                  <div key={phase.label} className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                    <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
                      {phase.label}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">{phase.content}</p>
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {/* Action bar */}
      <div className="flex flex-col sm:flex-row gap-3 mt-10 pt-6 border-t border-white/5">
        {idea.driveLink && (
          <a
            href={idea.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-200 hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> View full template on Drive
          </a>
        )}
        <a
          href={`mailto:trip@aram.org.uk?subject=${encodeURIComponent(`Interested in helping: ${idea.name}`)}`}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-medium text-white transition-colors"
        >
          <Mail className="w-4 h-4" /> I&apos;m interested in helping
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ──────────────────────────────────────── */
export default function IdeasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: '#0f1729' }} />}>
      <IdeasPageInner />
    </Suspense>
  );
}

function IdeasPageInner() {
  const searchParams = useSearchParams();
  const [authed, setAuthed] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(null);

  // Check auth on mount
  useEffect(() => {
    if (sessionStorage.getItem('ideas-auth') === 'true') setAuthed(true);
  }, []);

  // Sync selected idea from URL
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) setSelectedId(id);
  }, [searchParams]);

  const sectorCounts = useMemo(() => {
    const counts = {};
    ALL_SECTORS.forEach((s) => (counts[s] = 0));
    ideas.forEach((idea) => idea.sectors.forEach((s) => { counts[s] = (counts[s] || 0) + 1; }));
    return counts;
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'All') return ideas;
    return ideas.filter((idea) => idea.sectors.includes(filter));
  }, [filter]);

  const emptySectors = useMemo(() => {
    return ALL_SECTORS.filter((s) => (sectorCounts[s] || 0) === 0);
  }, [sectorCounts]);

  const selectedIdea = selectedId ? ideas.find((i) => i.id === selectedId) : null;

  const openDetail = (id) => {
    setSelectedId(id);
    window.history.pushState(null, '', `/ideas?id=${id}`);
    window.scrollTo(0, 0);
  };

  const closeDetail = () => {
    setSelectedId(null);
    window.history.pushState(null, '', '/ideas');
  };

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f1729' }}>
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <AnimatePresence mode="wait">
          {selectedIdea ? (
            <DetailView key="detail" idea={selectedIdea} onBack={closeDetail} />
          ) : (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400 mb-2">
                  2026 Trip
                </p>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                  Ideas Hub
                </h1>
                <p className="text-gray-400 text-sm">
                  Browse emerging initiative ideas for the 2026 trip. Click any idea to see full details.
                </p>
              </div>

              {/* Filters */}
              <FilterChips active={filter} onChange={setFilter} counts={sectorCounts} />

              {/* Cards */}
              <div className="mt-6 space-y-3">
                <AnimatePresence mode="popLayout">
                  {filtered.length > 0 ? (
                    filtered.map((idea) => (
                      <IdeaCard key={idea.id} idea={idea} onClick={() => openDetail(idea.id)} />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16"
                    >
                      <p className="text-gray-400 text-sm">
                        No ideas in this sector yet. Be the first to submit one{' '}
                        <a
                          href="mailto:trip@aram.org.uk?subject=New idea submission"
                          className="text-purple-400 hover:underline"
                        >
                          &rarr;
                        </a>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Empty sectors bar */}
              {filter === 'All' && emptySectors.length > 0 && (
                <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-xs text-gray-500 mb-2">Sectors still looking for ideas:</p>
                  <div className="flex gap-2 flex-wrap">
                    {emptySectors.map((s) => (
                      <SectorPill key={s} sector={s} small />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
