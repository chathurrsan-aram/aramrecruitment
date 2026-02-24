'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import TripDayCard from '@/components/ui/trip-day-card';
import { tripDays, tripMeta } from '@/data/tripDays2025';

/* Dynamically import the map (Leaflet needs browser APIs) */
const TripJourneyMap = dynamic(
  () => import('@/components/ui/trip-journey-map'),
  { ssr: false, loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-aram-warm-50">
      <div className="w-8 h-8 border-2 border-aram-warm-300 border-t-aram-purple rounded-full animate-spin" />
    </div>
  )}
);

/* ─── Progress dots ──────────────────────────────── */
function ProgressBar({ activeDay, onDayClick }) {
  return (
    <div className="flex items-center gap-1">
      {tripDays.map((day) => {
        const isActive = day.day === activeDay;
        const isVisited = day.day < activeDay;
        return (
          <button
            key={day.day}
            onClick={() => onDayClick(day.day)}
            className="group relative flex items-center"
            aria-label={`Go to Day ${day.day}`}
          >
            {/* Connecting line (not before first dot) */}
            {day.day > 1 && (
              <div
                className={`w-2 sm:w-3 h-0.5 transition-colors duration-300 ${
                  day.day <= activeDay ? 'bg-aram-purple/40' : 'bg-aram-warm-200'
                }`}
              />
            )}
            {/* Dot */}
            <div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-aram-purple shadow-md shadow-aram-purple/30 scale-125'
                  : isVisited
                  ? 'w-2 h-2 bg-aram-purple/50'
                  : 'w-2 h-2 bg-aram-warm-300'
              }`}
            />
            {/* Tooltip on hover */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="text-[10px] font-mono bg-aram-green-950/90 text-white px-2 py-1 rounded-md whitespace-nowrap">
                Day {day.day}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Main Scrollytelling Component ──────────────── */
export default function TripScrollytelling({ onClose }) {
  const [activeDay, setActiveDay] = useState(1);
  const cardRefs = useRef({});
  const scrollContainerRef = useRef(null);

  /* Lock body scroll when mounted */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* IntersectionObserver to detect active day */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const day = parseInt(entry.target.dataset.day, 10);
            if (!isNaN(day)) setActiveDay(day);
          }
        }
      },
      {
        root: container,
        threshold: 0.4,
        rootMargin: '-30% 0px -30% 0px',
      }
    );

    const refs = cardRefs.current;
    for (const key of Object.keys(refs)) {
      if (refs[key]) observer.observe(refs[key]);
    }

    return () => observer.disconnect();
  }, []);

  /* Scroll to a specific day when clicking progress dots */
  const scrollToDay = useCallback((day) => {
    const el = cardRefs.current[day];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  /* Assign refs to card elements */
  const setCardRef = useCallback((day) => (el) => {
    cardRefs.current[day] = el;
  }, []);

  /* Current day data for the top bar label */
  const currentDayData = tripDays.find(d => d.day === activeDay);
  const locationLabel = currentDayData?.locations[0]?.label || '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-white flex flex-col"
    >
      {/* ─── Top bar ─── */}
      <div className="relative z-20 flex items-center justify-between px-4 md:px-6 py-3 bg-white/90 backdrop-blur-md border-b border-aram-warm-100">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-sm font-medium text-aram-warm-500 hover:text-aram-green-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Trip</span>
        </button>

        <div className="text-right">
          <p className="text-sm font-semibold text-aram-green-900">
            Day {activeDay} <span className="text-aram-warm-400 font-normal">of {tripMeta.totalDays}</span>
          </p>
          <p className="text-xs text-aram-warm-400 hidden sm:block">{locationLabel}</p>
        </div>
      </div>

      {/* ─── Main content ─── */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Map panel */}
        <div className="w-full lg:w-1/2 h-[35vh] lg:h-auto shrink-0 relative">
          <TripJourneyMap activeDay={activeDay} tripDays={tripDays} />
        </div>

        {/* Day cards scroll panel */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overscroll-contain"
        >
          {/* Intro spacer */}
          <div className="min-h-[20vh] flex items-center justify-center px-6">
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-aram-purple mb-2">
                Aram Trip 2025
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-aram-green-900 mb-2">
                15 Days Across Sri Lanka
              </h2>
              <p className="text-sm text-aram-warm-400 max-w-sm mx-auto">
                Scroll down to journey through each day of our 2025 mission.
              </p>
            </div>
          </div>

          {/* Day cards */}
          {tripDays.map((day) => (
            <TripDayCard
              key={day.day}
              ref={setCardRef(day.day)}
              day={day}
              isActive={day.day === activeDay}
            />
          ))}

          {/* Outro spacer */}
          <div className="min-h-[40vh] flex items-center justify-center px-6">
            <div className="text-center">
              <p className="font-display text-xl font-bold text-aram-green-900 mb-2">
                End of Journey
              </p>
              <p className="text-sm text-aram-warm-400 max-w-sm mx-auto mb-4">
                {tripMeta.volunteers}+ volunteers. {tripMeta.districts} districts. {tripMeta.totalDays} days.
              </p>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 text-sm font-semibold text-aram-purple hover:text-aram-purple-dark transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Trip Page
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom progress bar ─── */}
      <div className="relative z-20 flex items-center justify-center px-4 py-3 bg-white/90 backdrop-blur-md border-t border-aram-warm-100">
        <ProgressBar activeDay={activeDay} onDayClick={scrollToDay} />
      </div>
    </motion.div>
  );
}
