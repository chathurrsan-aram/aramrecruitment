'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Mail, Lock } from 'lucide-react';
import { ideas } from '@/data/ideas';
import Image from 'next/image';

/* ------------------------------------------------------------------ */
/*  COLOUR MAPS                                                       */
/* ------------------------------------------------------------------ */

const sectorColors = {
  Healthcare: '#ef4444',
  Education: '#22c55e',
  Technology: '#7c3aed',
  'Economic Development': '#d97706',
  SEN: '#ec4899',
  Wellbeing: '#8b5cf6',
  'Diaspora Reconnection': '#0d9488',
  'Community Development': '#0d9488',
  Media: '#64748b',
};

const statusColors = {
  Exploring: { bg: 'bg-white/5', text: 'text-white/50' },
  'Semi-clear': { bg: 'bg-white/5', text: 'text-white/50' },
  'Research done': { bg: 'bg-amber-500/10', text: 'text-amber-400' },
  'Template done': { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  'Clear idea': { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  'Short-term idea': { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  'Long-term idea': { bg: 'bg-purple-500/10', text: 'text-purple-400' },
  Unsure: { bg: 'bg-white/5', text: 'text-white/50' },
};

const FILTER_CHIPS = [
  'All',
  'Community Development',
  'Technology',
  'Education',
  'Healthcare',
  'Wellbeing',
  'SEN',
  'Diaspora Reconnection',
  'Economic Development',
  'Media',
];

const PASSWORD = 'aram2026';

const READINESS_LABELS = [
  'Research',
  'Template',
  "Partner ID'd",
  'Pre-trip plan',
  'Budget',
  'Confirmed',
];

const READINESS_KEYS = [
  'research',
  'template',
  'partnerIdentified',
  'preTripPlan',
  'budget',
  'confirmed',
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                           */
/* ------------------------------------------------------------------ */

function getStatusStyle(status) {
  return statusColors[status] || statusColors.Unsure;
}

function getSectorColor(sector) {
  return sectorColors[sector] || '#6D4A9E';
}

function countForSector(sector) {
  if (sector === 'All') return ideas.length;
  return ideas.filter((i) =>
    Array.isArray(i.sectors)
      ? i.sectors.includes(sector)
      : i.sector === sector
  ).length;
}

function filterIdeas(sector) {
  if (sector === 'All') return ideas;
  return ideas.filter((i) =>
    Array.isArray(i.sectors)
      ? i.sectors.includes(sector)
      : i.sector === sector
  );
}

function getSectors(idea) {
  if (Array.isArray(idea.sectors)) return idea.sectors;
  if (idea.sector) return [idea.sector];
  return [];
}

function hasContent(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  return true;
}

/* ------------------------------------------------------------------ */
/*  PASSWORD GATE                                                     */
/* ------------------------------------------------------------------ */

function PasswordGate({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (password === PASSWORD) {
      sessionStorage.setItem('ideas-auth', 'true');
      onSuccess();
    } else {
      setError(true);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-aram-green-950 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-10">
          <div className="flex justify-center mb-6">
            <Image
              src="https://res.cloudinary.com/dhzuwjkkz/image/upload/v1771802172/a730ae79-83b6-460d-b17f-c562f2948100_pcjimk.png"
              alt="Aram"
              width={120}
              height={40}
              style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
              unoptimized
            />
          </div>

          <h1 className="font-display text-2xl font-bold text-white text-center mb-2">
            Ideas Hub
          </h1>
          <p className="text-white/50 text-sm text-center mb-8 leading-relaxed">
            Enter the password to access emerging initiative ideas for the 2026 trip.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-aram-purple transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">
                Incorrect password
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-aram-purple text-white rounded-xl py-3 text-sm font-medium hover:bg-aram-purple-dark transition-colors"
            >
              Access Ideas Hub
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  OVERVIEW                                                          */
/* ------------------------------------------------------------------ */

function Overview({ onSelectIdea }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = filterIdeas(activeFilter);

  const emptySectors =
    activeFilter === 'All'
      ? FILTER_CHIPS.filter((s) => s !== 'All' && countForSector(s) === 0)
      : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-aram-green-950"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            Ideas Hub
          </h1>
          <p className="text-white/60">
            Emerging initiative ideas for the 2026 trip
          </p>
        </div>

        {/* Filter chips */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
          `}</style>
          <div className="flex gap-2 hide-scrollbar">
            {FILTER_CHIPS.map((chip) => {
              const count = countForSector(chip);
              const isActive = activeFilter === chip;
              return (
                <button
                  key={chip}
                  onClick={() => setActiveFilter(chip)}
                  className={`rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-aram-purple text-white'
                      : 'border border-white/10 text-white/50 hover:border-white/20'
                  }`}
                >
                  {chip} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Idea cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/40 text-lg mb-2">
                  No ideas in this sector yet.
                </p>
                <a
                  href="mailto:trip@aram.org.uk"
                  className="text-aram-purple-light text-sm hover:text-aram-purple transition-colors"
                >
                  Be the first to submit one &rarr;
                </a>
              </div>
            ) : (
              filtered.map((idea, index) => {
                const sectors = getSectors(idea);
                const primaryColor = getSectorColor(sectors[0]);
                const status = getStatusStyle(idea.status);
                const initials = (idea.owner || '?')
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <motion.div
                    key={idea.id || idea.slug || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => onSelectIdea(idea)}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 md:p-6 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all cursor-pointer"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Top row */}
                      <div className="flex justify-between items-start">
                        <h3 className="font-display text-lg font-semibold text-white pr-3">
                          {idea.name}
                        </h3>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${status.bg} ${status.text}`}
                        >
                          {idea.status}
                        </span>
                      </div>

                      {/* Description */}
                      {idea.shortDescription && (
                        <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                          {idea.shortDescription}
                        </p>
                      )}

                      {/* Bottom row */}
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Owner avatar */}
                        {idea.owner && (
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                              style={{ backgroundColor: primaryColor }}
                            >
                              {initials}
                            </div>
                            <span className="text-sm text-white/40">
                              {idea.owner}
                            </span>
                          </div>
                        )}

                        {/* Sector pills */}
                        {sectors.map((sector) => {
                          const color = getSectorColor(sector);
                          return (
                            <span
                              key={sector}
                              className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                              style={{
                                backgroundColor: `${color}15`,
                                color: color,
                              }}
                            >
                              {sector}
                            </span>
                          );
                        })}

                        {/* View link */}
                        <span className="text-sm text-aram-purple-light font-medium hover:text-aram-purple transition-colors ml-auto">
                          View &rarr;
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom bar — sectors with 0 ideas */}
        {activeFilter === 'All' && emptySectors.length > 0 && (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-white/40 mr-1">
                Sectors still looking for ideas:
              </span>
              {emptySectors.map((sector) => {
                const color = getSectorColor(sector);
                return (
                  <span
                    key={sector}
                    className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: `${color}15`,
                      color: color,
                    }}
                  >
                    {sector}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  DETAIL VIEW                                                       */
/* ------------------------------------------------------------------ */

function DetailView({ idea, onBack }) {
  const sectors = getSectors(idea);
  const status = getStatusStyle(idea.status);

  /* Readiness */
  const readiness = idea.readiness || {};
  const readinessValues = READINESS_KEYS.map((k) => !!readiness[k]);
  const filledCount = readinessValues.filter(Boolean).length;
  const hasAnyReadiness = filledCount > 0;
  const barColor = filledCount >= 4 ? 'bg-emerald-500' : 'bg-amber-500';

  /* Content sections */
  const contentSections = [
    { title: 'The Observation', value: idea.observation },
    { title: 'Root Cause', value: idea.rootCause },
    { title: 'The Idea', value: idea.description },
    {
      title: 'Impact',
      value:
        hasContent(idea.impactType) || hasContent(idea.impactDescription)
          ? [idea.impactType, idea.impactDescription].filter(Boolean).join(' — ')
          : null,
    },
    { title: 'What Changes After We Leave?', value: idea.afterWeLeave },
    { title: 'Has Anything Similar Been Tried?', value: idea.similarTried },
    { title: '__phases__', value: null }, // placeholder — handled separately
    { title: 'Logistics Needed', value: idea.logisticsNeeded },
    { title: 'Resources Needed', value: idea.resources },
    { title: 'Success Metrics', value: idea.successMetrics },
    { title: 'Risks & Backup', value: idea.risks },
    { title: 'Open Questions', value: idea.openQuestions },
    { title: 'Next Steps', value: idea.nextSteps },
  ];

  const phases = idea.phases || {};
  const hasPhases =
    hasContent(phases.preTrip) ||
    hasContent(phases.onTrip) ||
    hasContent(phases.postTrip);

  /* Info grid items */
  const infoItems = [
    { label: 'Owner', value: idea.owner },
    { label: 'Location', value: idea.location },
    { label: 'Partners', value: idea.partnersNeeded },
    { label: 'Group', value: idea.group },
  ].filter((item) => hasContent(item.value));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-aram-green-950"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-16">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors cursor-pointer mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all ideas
        </button>

        {/* Header */}
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
          {idea.name}
        </h1>

        <div className="flex flex-wrap gap-2 items-center">
          {sectors.map((sector) => {
            const color = getSectorColor(sector);
            return (
              <span
                key={sector}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: `${color}15`,
                  color: color,
                }}
              >
                {sector}
              </span>
            );
          })}
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.bg} ${status.text}`}
          >
            {idea.status}
          </span>
        </div>

        {/* Readiness progress bar */}
        {hasAnyReadiness && (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 mt-6">
            <p className="font-mono text-xs uppercase tracking-wider text-white/40 mb-3">
              Readiness
            </p>
            <div className="grid grid-cols-6 gap-1">
              {readinessValues.map((filled, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full ${filled ? barColor : 'bg-white/10'}`}
                />
              ))}
            </div>
            <div className="grid grid-cols-6 gap-1">
              {READINESS_LABELS.map((label) => (
                <p
                  key={label}
                  className="text-[10px] text-white/30 text-center mt-1.5"
                >
                  {label}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Info grid */}
        {infoItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
              >
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/30 mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-white/80">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Content sections */}
        {contentSections.map((section) => {
          if (section.title === '__phases__') {
            if (!hasPhases) return null;
            return (
              <div key="phases" className="mt-8">
                <h2 className="font-display text-lg font-semibold text-white mb-3">
                  Phases
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: 'Pre-trip', value: phases.preTrip },
                    { label: 'On-trip', value: phases.onTrip },
                    { label: 'Post-trip', value: phases.postTrip },
                  ]
                    .filter((p) => hasContent(p.value))
                    .map((phase) => (
                      <div
                        key={phase.label}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
                      >
                        <p className="font-mono text-[11px] uppercase tracking-wider text-white/30 mb-2">
                          {phase.label}
                        </p>
                        <p className="text-sm text-white/60 leading-relaxed whitespace-pre-line">
                          {phase.value}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            );
          }

          if (!hasContent(section.value)) return null;

          return (
            <div key={section.title} className="mt-8">
              <h2 className="font-display text-lg font-semibold text-white mb-3">
                {section.title}
              </h2>
              <p className="text-sm text-white/60 leading-relaxed whitespace-pre-line">
                {section.value}
              </p>
            </div>
          );
        })}

        {/* Action bar */}
        <div className="flex flex-wrap gap-3 mt-10 pb-8">
          {hasContent(idea.driveLink) && (
            <a
              href={idea.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:border-white/20 transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View full template on Drive
            </a>
          )}
          <a
            href={`mailto:trip@aram.org.uk?subject=Interested in helping: ${encodeURIComponent(idea.name)}`}
            className="bg-aram-purple text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-aram-purple-dark transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            I&apos;m interested in helping
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN CONTENT (uses useSearchParams)                               */
/* ------------------------------------------------------------------ */

function IdeasContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [authed, setAuthed] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [mounted, setMounted] = useState(false);

  /* Check auth + URL param on mount (client-only: sessionStorage) */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional client-only mount gate
    setMounted(true);
    const isAuthed = sessionStorage.getItem('ideas-auth') === 'true';
    setAuthed(isAuthed);

    if (isAuthed) {
      const idParam = searchParams.get('id');
      if (idParam) {
        const found = ideas.find(
          (i) => (i.slug || i.id) === idParam
        );
        if (found) setSelectedIdea(found);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSelectIdea(idea) {
    setSelectedIdea(idea);
    const slug = idea.slug || idea.id;
    if (slug) {
      router.push(`/ideas?id=${slug}`, { scroll: false });
    }
  }

  function handleBack() {
    setSelectedIdea(null);
    router.push('/ideas', { scroll: false });
  }

  function handleAuthSuccess() {
    setAuthed(true);
  }

  /* Avoid hydration mismatch — render nothing until mounted */
  if (!mounted) {
    return <div className="min-h-screen bg-aram-green-950" />;
  }

  return (
    <AnimatePresence mode="wait">
      {!authed ? (
        <PasswordGate key="gate" onSuccess={handleAuthSuccess} />
      ) : selectedIdea ? (
        <DetailView key="detail" idea={selectedIdea} onBack={handleBack} />
      ) : (
        <Overview key="overview" onSelectIdea={handleSelectIdea} />
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE EXPORT (with Suspense boundary)                              */
/* ------------------------------------------------------------------ */

export default function IdeasPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-aram-green-950" />}
    >
      <IdeasContent />
    </Suspense>
  );
}
