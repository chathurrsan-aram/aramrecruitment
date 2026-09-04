'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import InitiativeCard from './InitiativeCard';
import ActivityCard from './ActivityCard';
import ActivityDetailPanel from './ActivityDetailPanel';
import AnimatedSection from '@/components/AnimatedSection';
import { sectorColors } from '@/data/initiatives';

/* Map activity sector ids to the display labels used in the filter bar */
const activitySectorToFilter = {
  education: 'Education',
  wellbeing: 'Wellbeing',
  sen: 'SEN',
  healthcare: 'Healthcare',
  technology: 'Technology',
};

/* The long-term initiative sectors use display names directly (e.g. "Economic Development").
   Activity sectors use lowercase ids. This helper normalises for filtering. */
function activityMatchesFilter(activity, filter) {
  if (filter === 'All') return true;
  const mapped = activitySectorToFilter[activity.sector];
  /* "Holistic Wellbeing" filter should also match "wellbeing" activities */
  if (filter === 'Holistic Wellbeing' && activity.sector === 'wellbeing') return true;
  return mapped === filter;
}

/* Build the ordered list of filter labels, deduped */
function buildFilterLabels() {
  const base = ['All'];
  const seen = new Set();
  /* Long-term initiative sectors first */
  for (const key of Object.keys(sectorColors)) {
    if (!seen.has(key)) {
      seen.add(key);
      base.push(key);
    }
  }
  /* Then activity-specific sectors that don't already have a filter
     (Wellbeing overlaps with Holistic Wellbeing so skip it) */
  for (const [, label] of Object.entries(activitySectorToFilter)) {
    if (!seen.has(label) && label !== 'Wellbeing') {
      seen.add(label);
      base.push(label);
    }
  }
  return base;
}

export default function InitiativeGrid({ initiatives, activities }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState(null);

  const filterLabels = useMemo(() => buildFilterLabels(), []);

  const filteredInitiatives = useMemo(() => {
    if (activeFilter === 'All') return initiatives;
    return initiatives.filter((i) => i.sector === activeFilter);
  }, [activeFilter, initiatives]);

  const filteredActivities = useMemo(() => {
    if (activeFilter === 'All') return activities;
    return activities.filter((a) => activityMatchesFilter(a, activeFilter));
  }, [activeFilter, activities]);

  const showInitiatives = filteredInitiatives.length > 0;
  const showActivities = filteredActivities.length > 0;

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {filterLabels.map((sector) => (
          <button
            key={sector}
            onClick={() => setActiveFilter(sector)}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 min-h-[36px] ${
              activeFilter === sector
                ? 'bg-aram-purple text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {sector}
          </button>
        ))}
      </div>

      {/* ── Long-term Initiatives Section ── */}
      {showInitiatives && (
        <AnimatedSection>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1.5">Long-term Initiatives</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Community-led projects designed for sustained impact over multiple years.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInitiatives.map((initiative) => (
              <InitiativeCard key={initiative.slug} initiative={initiative} />
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* ── Visual Separator ── */}
      {showInitiatives && showActivities && (
        <div className="my-14 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">Trip Activities</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      )}

      {/* ── Trip Activities Section ── */}
      {showActivities && (
        <AnimatedSection delay={showInitiatives ? 0.15 : 0}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1.5">Trip Activities</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
              Workshops, sessions, and experiences delivered during our annual trips — what we tried, what worked, and what we&apos;d do differently.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onClick={() => setSelectedActivity(activity)}
              />
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* Empty state */}
      {!showInitiatives && !showActivities && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-sm">No initiatives or activities found for this filter.</p>
        </div>
      )}

      {/* ── Activity Detail Panel (slide-in) ── */}
      <AnimatePresence>
        {selectedActivity && (
          <ActivityDetailPanel
            key={selectedActivity.id}
            activity={selectedActivity}
            onClose={() => setSelectedActivity(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
