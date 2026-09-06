'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Quote } from 'lucide-react';

/* ─── Region colour mapping ──────────────────────── */
const REGION_COLORS = {
  'western':      { bg: 'rgba(109, 74, 158, 0.12)', text: '#6D4A9E', border: 'rgba(109, 74, 158, 0.25)' },
  'hill-country': { bg: 'rgba(16, 185, 129, 0.10)', text: '#047857', border: 'rgba(16, 185, 129, 0.25)' },
  'eastern':      { bg: 'rgba(59, 130, 246, 0.10)', text: '#1D4ED8', border: 'rgba(59, 130, 246, 0.25)' },
  'northern':     { bg: 'rgba(245, 158, 11, 0.12)', text: '#B45309', border: 'rgba(245, 158, 11, 0.25)' },
};

function getRegionStyle(regionId) {
  return REGION_COLORS[regionId] || REGION_COLORS['western'];
}

/* ─── Photo placeholder gradients ────────────────── */
const GRADIENTS = [
  'from-aram-green-700/20 to-aram-green-900/20',
  'from-aram-purple-100/30 to-aram-purple/20',
  'from-aram-warm-200 to-aram-warm-100',
];

/* ─── Format date ────────────────────────────────── */
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

/* ─── Day Card ───────────────────────────────────── */
const TripDayCard = forwardRef(function TripDayCard({ day, isActive }, ref) {
  const primaryRegion = day.locations[0]?.region || 'western';
  const regionStyle = getRegionStyle(primaryRegion);

  return (
    <div
      ref={ref}
      data-day={day.day}
      className="min-h-[80vh] flex items-center py-12 md:py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg mx-auto px-6 lg:px-8"
      >
        {/* Day number + date */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center font-mono text-sm font-bold shrink-0 transition-all duration-500 ${
              isActive
                ? 'bg-aram-purple text-white shadow-lg shadow-aram-purple/25 scale-110'
                : 'bg-aram-warm-100 text-aram-warm-500'
            }`}
          >
            {day.day}
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-aram-warm-400">
              {formatDate(day.date)}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl md:text-2xl font-bold text-aram-green-900 mb-3 leading-tight">
          {day.title}
        </h3>

        {/* Location labels */}
        <div className="flex flex-wrap gap-2 mb-4">
          {day.locations.map((loc, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: regionStyle.bg,
                color: regionStyle.text,
                border: `1px solid ${regionStyle.border}`,
              }}
            >
              <MapPin className="w-3 h-3" />
              {loc.group && <span className="font-bold">{loc.group}:</span>}
              {loc.label}
            </span>
          ))}
        </div>

        {/* Summary */}
        <p className="text-sm md:text-base text-aram-warm-500 leading-relaxed mb-5">
          {day.summary}
        </p>

        {/* Activities */}
        {day.activities.length > 0 && (
          <ul className="space-y-1.5 mb-5">
            {day.activities.map((activity, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-aram-warm-500">
                <span className="w-1.5 h-1.5 rounded-full bg-aram-purple/40 mt-1.5 shrink-0" />
                {activity}
              </li>
            ))}
          </ul>
        )}

        {/* Highlight callout */}
        {day.highlight && (
          <div className="rounded-xl border border-aram-warm-200 bg-aram-warm-50 p-4 mb-5">
            <Quote className="w-5 h-5 text-aram-purple-light mb-2" />
            <p className="text-sm text-aram-green-900 leading-relaxed italic">
              {day.highlight}
            </p>
          </div>
        )}

        {/* Photo placeholders */}
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`rounded-lg bg-gradient-to-br ${GRADIENTS[i % 3]} ${
                i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'
              } flex items-center justify-center`}
            >
              <span className="text-[10px] text-aram-warm-400 font-mono">Photo</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
});

export default TripDayCard;
