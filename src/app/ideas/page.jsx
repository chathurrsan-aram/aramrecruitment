'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Mail, Lock, LayoutGrid, List } from 'lucide-react';
import { ideas, SECTOR_COLOURS, ALL_SECTORS, READINESS_LABELS, getCurrentStep } from '@/data/ideas';

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
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-[#1a1a2e]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-aram-purple/20 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-7 h-7 text-aram-purple-light" />
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
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-aram-purple/50 transition-colors ${
              error ? 'border-red-500' : 'border-white/10'
            }`}
          />
          {error && <p className="text-red-400 text-xs">Incorrect password</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-aram-purple hover:bg-aram-purple-dark text-white font-semibold text-sm transition-colors"
          >
            Enter
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ─── Shared Components ──────────────────────────────── */

function SectorPill({ sector, small = false }) {
  const colour = SECTOR_COLOURS[sector] || '#64748b';
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${
        small ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
      style={{ backgroundColor: `${colour}15`, color: colour }}
    >
      {sector}
    </span>
  );
}

function OwnerAvatar({ name, sector, size = 'sm' }) {
  const colour = SECTOR_COLOURS[sector] || '#7c3aed';
  const initial = name.charAt(0).toUpperCase();
  const sizeClass = size === 'lg' ? 'w-9 h-9 text-sm' : 'w-7 h-7 text-xs';
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full text-white font-bold shrink-0 ${sizeClass}`}
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
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onChange('All')}
        className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-all ${
          active === 'All'
            ? 'bg-aram-purple text-white shadow-sm'
            : 'bg-white text-gray-500 border border-gray-200 hover:border-aram-purple/30 hover:text-aram-purple'
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
            className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-all ${
              isActive
                ? 'text-white shadow-sm'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
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

/* ─── Pulsating CSS ──────────────────────────────────── */
function PulseStyle() {
  return (
    <style jsx global>{`
      @media (prefers-reduced-motion: no-preference) {
        @keyframes readiness-pulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
        .readiness-pulse {
          animation: readiness-pulse 2s ease-in-out infinite;
        }
      }
    `}</style>
  );
}

/* ─── Readiness Bar (detail) ─────────────────────────── */
function DetailReadinessBar({ readiness }) {
  const filled = READINESS_LABELS.filter((r) => readiness[r.key]).length;
  if (filled === 0) return null;
  const currentStep = getCurrentStep(readiness);

  return (
    <div className="mt-5">
      <PulseStyle />
      <div className="flex gap-1 mb-1.5">
        {READINESS_LABELS.map((r, i) => {
          const isFilled = readiness[r.key];
          const isCurrent = i === currentStep;
          return (
            <div
              key={r.key}
              className={`flex-1 h-2 rounded-full ${isCurrent ? 'readiness-pulse' : ''}`}
              style={{
                backgroundColor: isFilled ? '#97C459' : '#e5e7eb',
              }}
            />
          );
        })}
      </div>
      <div className="flex gap-1">
        {READINESS_LABELS.map((r, i) => {
          const isFilled = readiness[r.key];
          const isCurrent = i === currentStep;
          return (
            <span
              key={r.key}
              className="flex-1 text-[10px] text-center"
              style={{
                color: isFilled ? '#3B6D11' : '#9ca3af',
                fontWeight: isCurrent ? 500 : 400,
              }}
            >
              {r.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Grid Card (compact overview) ───────────────────── */
function GridCard({ idea, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="group rounded-xl border border-gray-200 bg-white hover:shadow-md hover:border-aram-purple/20 p-4 cursor-pointer transition-all flex flex-col"
      onClick={onClick}
    >
      <div className="flex items-start gap-2.5 mb-3">
        <OwnerAvatar name={idea.owner} sector={idea.sectors[0]} />
        <div className="min-w-0 flex-1">
          <h3 className="text-gray-900 font-semibold text-sm leading-tight truncate">{idea.name}</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">{idea.owner}</p>
        </div>
      </div>
      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3 flex-1">
        {idea.description}
      </p>
      <div className="flex gap-1.5 flex-wrap">
        {idea.sectors.map((s) => (
          <SectorPill key={s} sector={s} small />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── List Card (full-width row) ─────────────────────── */
function ListCard({ idea, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group w-full rounded-xl border border-gray-200 bg-white hover:shadow-md hover:border-aram-purple/20 p-5 cursor-pointer transition-all"
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 font-semibold text-sm mb-1.5">{idea.name}</h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
            {idea.description}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <OwnerAvatar name={idea.owner} sector={idea.sectors[0]} />
              <span className="text-xs text-gray-500 font-medium">{idea.owner}</span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {idea.sectors.map((s) => (
                <SectorPill key={s} sector={s} small />
              ))}
            </div>
          </div>
        </div>
        <span className="shrink-0 text-aram-purple text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
          View <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Detail View ────────────────────────────────────── */
function DetailView({ idea, onBack }) {
  const hasPhases = idea.phases && (idea.phases.preTrip || idea.phases.onTrip || idea.phases.postTrip);
  const whyText = [idea.observation, idea.rootCause].filter(Boolean).join(' ');

  const factsItems = [
    idea.partnersNeeded && { label: 'Partners', value: idea.partnersNeeded },
    idea.resources && { label: 'Resources', value: idea.resources },
    idea.successMetrics && { label: 'Success looks like', value: idea.successMetrics },
    idea.afterWeLeave && { label: 'After we leave', value: idea.afterWeLeave },
  ].filter(Boolean);

  const hasRisks = idea.risks || idea.nextSteps;
  const ownerFirst = idea.owner.split(' ')[0];

  const metaDots = [
    idea.impactType && idea.impactType,
    idea.group && idea.group,
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-aram-purple text-sm font-medium mb-6 hover:gap-2.5 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to all ideas
      </button>

      {/* ── Header ── */}
      <div className="flex items-start gap-3 mb-1">
        <OwnerAvatar name={idea.owner} sector={idea.sectors[0]} size="lg" />
        <h1 className="font-display text-[22px] font-medium text-gray-900 leading-tight pt-1">{idea.name}</h1>
      </div>
      <div className="ml-12">
        <p className="text-[13px] text-gray-400">{idea.owner}{idea.location ? ` \u00B7 ${idea.location}` : ''}</p>
        <div className="flex gap-1.5 flex-wrap mt-2">
          {idea.sectors.map((s) => <SectorPill key={s} sector={s} />)}
        </div>
      </div>

      {/* ── Readiness bar ── */}
      {READINESS_LABELS.some((r) => idea.readiness[r.key]) && (
        <DetailReadinessBar readiness={idea.readiness} />
      )}

      {/* ── Why this matters ── */}
      {whyText && (
        <div className="mt-8">
          <p className="text-[12px] font-medium text-gray-400 mb-2">Why this matters</p>
          <p className="text-[14px] text-gray-600 leading-relaxed">{whyText}</p>
        </div>
      )}

      {/* ── The idea (hero card) ── */}
      {idea.description && (
        <div
          className="mt-6 border-l-[3px] py-5 pr-5 pl-5"
          style={{
            borderColor: '#7F77DD',
            backgroundColor: '#EEEDFE',
            borderRadius: '0 12px 12px 0',
          }}
        >
          <p className="text-[13px] font-medium mb-2" style={{ color: '#534AB7' }}>The idea</p>
          <p className="text-[15px] leading-[1.65]" style={{ color: '#26215C' }}>{idea.description}</p>
          {metaDots.length > 0 && (
            <div className="flex gap-4 mt-3 flex-wrap">
              {metaDots.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-[12px]" style={{ color: '#534AB7' }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#7F77DD' }} />
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Phases ── */}
      {hasPhases && (
        <div className="mt-8">
          <p className="text-[12px] font-medium text-gray-400 mb-2">What we&apos;d do</p>
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: '#e5e7eb' }}>
              {[
                { label: 'Before the trip', content: idea.phases.preTrip },
                { label: 'During the trip', content: idea.phases.onTrip },
                { label: 'After the trip', content: idea.phases.postTrip },
              ].map(
                (phase) =>
                  phase.content && (
                    <div key={phase.label} className="bg-white p-3.5">
                      <p className="text-[11px] font-medium mb-1.5" style={{ color: '#534AB7' }}>{phase.label}</p>
                      <p className="text-[12px] text-gray-600 leading-[1.5]">{phase.content}</p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Facts grid ── */}
      {factsItems.length > 0 && (
        <div className="mt-8">
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <div
              className={`grid gap-px ${factsItems.length <= 2 ? 'grid-cols-1 sm:grid-cols-' + factsItems.length : 'grid-cols-1 sm:grid-cols-2'}`}
              style={{ backgroundColor: '#e5e7eb' }}
            >
              {factsItems.map((item) => (
                <div key={item.label} className="bg-white p-3.5">
                  <p className="text-[10px] text-gray-400 mb-1">{item.label}</p>
                  <p className="text-[13px] text-gray-700 leading-[1.5]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── What's still open ── */}
      {hasRisks && (
        <div className="mt-8 rounded-xl bg-gray-100 p-4 sm:px-5">
          <p className="text-[12px] font-medium text-gray-400 mb-3">What&apos;s still open</p>
          <div className={`grid gap-6 ${idea.risks && idea.nextSteps ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
            {idea.risks && (
              <div>
                <p className="text-[11px] text-gray-400 mb-1">Risks flagged</p>
                <p className="text-[13px] text-gray-600 leading-[1.5]">{idea.risks}</p>
              </div>
            )}
            {idea.nextSteps && (
              <div>
                <p className="text-[11px] text-gray-400 mb-1">Next steps</p>
                <p className="text-[13px] text-gray-600 leading-[1.5]">{idea.nextSteps}</p>
              </div>
            )}
          </div>
          {idea.openQuestions && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-[11px] text-gray-400 mb-1">Open questions</p>
              <p className="text-[13px] text-gray-600 leading-[1.5]">{idea.openQuestions}</p>
            </div>
          )}
        </div>
      )}

      {/* ── Previous experience footnote ── */}
      {idea.similarTried && (
        <p className="mt-6 text-[12px] text-gray-400 leading-relaxed">{idea.similarTried}</p>
      )}

      {/* ── Action buttons ── */}
      <div className="flex flex-col sm:flex-row gap-2 mt-8 pt-6" style={{ borderTop: '0.5px solid #e5e7eb' }}>
        {idea.driveLink && (
          <a
            href={idea.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-50 text-[13px] font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            style={{ border: '0.5px solid #d1d5db' }}
          >
            <ExternalLink className="w-3.5 h-3.5" /> View template on Drive
          </a>
        )}
        <a
          href={`mailto:trip@aram.org.uk?subject=${encodeURIComponent(`Re: ${idea.name}`)}`}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[13px] font-medium text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: '#7c3aed' }}
        >
          <Mail className="w-3.5 h-3.5" /> Contact {ownerFirst} to discuss more
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ──────────────────────────────────────── */
export default function IdeasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <IdeasPageInner />
    </Suspense>
  );
}

function IdeasPageInner() {
  const searchParams = useSearchParams();
  const [authed, setAuthed] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    if (sessionStorage.getItem('ideas-auth') === 'true') setAuthed(true);
  }, []);

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero banner */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-[#1a1a2e]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-aram-purple rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sector rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4">
            2026 Trip
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Ideas Hub
          </h1>
          <p className="text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Browse emerging initiative ideas for the 2026 trip. Click any idea to see full details.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-6">
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
                {/* Toolbar: filters + view toggle */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 overflow-hidden">
                    <FilterChips active={filter} onChange={setFilter} counts={sectorCounts} />
                  </div>
                  <div className="flex gap-1 bg-white border border-gray-200 rounded-lg p-0.5 shrink-0">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' ? 'bg-aram-purple text-white' : 'text-gray-400 hover:text-gray-600'
                      }`}
                      aria-label="Grid view"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' ? 'bg-aram-purple text-white' : 'text-gray-400 hover:text-gray-600'
                      }`}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Cards */}
                <AnimatePresence mode="popLayout">
                  {filtered.length > 0 ? (
                    viewMode === 'grid' ? (
                      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((idea) => (
                          <GridCard key={idea.id} idea={idea} onClick={() => openDetail(idea.id)} />
                        ))}
                      </motion.div>
                    ) : (
                      <div className="space-y-3">
                        {filtered.map((idea) => (
                          <ListCard key={idea.id} idea={idea} onClick={() => openDetail(idea.id)} />
                        ))}
                      </div>
                    )
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
                          className="text-aram-purple hover:underline"
                        >
                          &rarr;
                        </a>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Empty sectors bar */}
                {filter === 'All' && emptySectors.length > 0 && (
                  <div className="mt-8 p-4 rounded-xl bg-white border border-gray-100">
                    <p className="text-xs text-gray-400 mb-2">Sectors still looking for ideas:</p>
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
      </section>
    </div>
  );
}
