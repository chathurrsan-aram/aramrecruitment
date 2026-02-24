'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

/* ─── Progress dots (fixed at viewport bottom) ── */
function ProgressBar({ activeDay, onDayClick }) {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
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
            {/* Connecting line */}
            {day.day > 1 && (
              <div
                className={`w-1.5 sm:w-3 h-0.5 transition-colors duration-300 ${
                  day.day <= activeDay ? 'bg-aram-purple/40' : 'bg-aram-warm-200'
                }`}
              />
            )}
            {/* Dot */}
            <div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3.5 h-3.5 bg-aram-purple shadow-md shadow-aram-purple/30'
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

/* ─── Main Scrollytelling Component (inline, not overlay) ─ */
export default function TripScrollytelling({ onClose }) {
  const [activeDay, setActiveDay] = useState(1);
  const [showProgress, setShowProgress] = useState(true);
  const sectionRef = useRef(null);

  /* ── IntersectionObserver: detect which day card is in viewport center ── */
  useEffect(() => {
    // Small delay to ensure DOM is painted
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('[data-day]');
      if (cards.length === 0) return;

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
          root: null, // window viewport
          threshold: 0,
          rootMargin: '-45% 0px -45% 0px',
        }
      );

      cards.forEach((card) => observer.observe(card));

      return () => observer.disconnect();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  /* ── Show/hide progress bar based on journey section visibility ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowProgress(entry.isIntersecting),
      { root: null, threshold: 0.01 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* ── Scroll to a specific day ── */
  const scrollToDay = useCallback((day) => {
    const el = document.querySelector(`[data-day="${day}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  /* Current day data for info overlay */
  const currentDayData = tripDays.find(d => d.day === activeDay);
  const locationLabel = currentDayData?.locations[0]?.label || '';

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ─── Intro banner ─── */}
      <div className="bg-aram-warm-50 border-b border-aram-warm-100 py-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-aram-purple mb-1">
          Aram Trip 2025
        </p>
        <h2 className="font-display text-xl md:text-2xl font-bold text-aram-green-900">
          15 Days Across Sri Lanka
        </h2>
        <p className="text-sm text-aram-warm-400 mt-1">
          {tripMeta.volunteers}+ volunteers &middot; {tripMeta.districts} districts &middot; Scroll to explore
        </p>
      </div>

      {/* ─── Split layout: sticky map + scrolling cards ─── */}
      <div className="flex flex-col lg:flex-row">
        {/* Map panel — sticky */}
        <div className="h-[40vh] lg:h-screen lg:w-1/2 sticky top-0 z-10 border-b lg:border-b-0 lg:border-r border-aram-warm-100">
          <TripJourneyMap activeDay={activeDay} tripDays={tripDays} />

          {/* Day indicator overlay on the map */}
          <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-sm rounded-xl border border-aram-warm-200 shadow-lg px-4 py-2.5">
            <p className="text-sm font-semibold text-aram-green-900">
              Day {activeDay} <span className="text-aram-warm-400 font-normal">of {tripMeta.totalDays}</span>
            </p>
            <p className="text-xs text-aram-warm-400">{locationLabel}</p>
          </div>
        </div>

        {/* Day cards column — scrolls naturally */}
        <div className="lg:w-1/2 pb-20">
          {tripDays.map((day) => (
            <TripDayCard
              key={day.day}
              day={day}
              isActive={day.day === activeDay}
            />
          ))}

          {/* End of journey */}
          <div className="min-h-[50vh] flex items-center justify-center px-6">
            <div className="text-center">
              <p className="font-display text-xl font-bold text-aram-green-900 mb-2">
                End of Journey
              </p>
              <p className="text-sm text-aram-warm-400 max-w-sm mx-auto mb-6">
                {tripMeta.volunteers}+ volunteers. {tripMeta.districts} districts. {tripMeta.totalDays} days of direct community connection.
              </p>
              <button
                onClick={() => {
                  onClose();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-aram-purple hover:text-aram-purple-dark transition-colors"
              >
                Back to Trip Page
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Fixed progress bar at bottom of viewport ─── */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center px-4 py-3 bg-white/90 backdrop-blur-md border-t border-aram-warm-100"
          >
            <ProgressBar activeDay={activeDay} onDayClick={scrollToDay} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
