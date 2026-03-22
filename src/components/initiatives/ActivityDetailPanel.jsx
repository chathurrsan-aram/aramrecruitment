'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars -- motion used in JSX as motion.div
import { X, MapPin, Clock, User, ExternalLink, Lightbulb, CheckCircle2 } from 'lucide-react';
import { activitySectorColors } from '@/data/tripActivities';

/* Render text that may contain \n line breaks as paragraphs */
function MultiLineText({ text, className = '' }) {
  const lines = text.split('\n').filter(Boolean);
  if (lines.length === 1) return <p className={className}>{text}</p>;
  return (
    <div className={`space-y-2 ${className}`}>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}

export default function ActivityDetailPanel({ activity, onClose }) {
  const containerRef = useRef(null);

  /* Scroll panel to top when it opens */
  useEffect(() => {
    if (!activity) return;
    requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    });
  }, [activity]);

  if (!activity) return null;

  const {
    title, sector, locations, duration, volunteerLead,
    whatIsIt, whatHappened, materialsNeeded, howToRunIt,
    followUpIdeas, resourceLink, detailStatus,
  } = activity;

  const sectorStyle = activitySectorColors[sector];

  return (
    <motion.div
      ref={containerRef}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-[9999] bg-white overflow-y-auto"
    >
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-medium text-aram-purple hover:text-gray-900 mb-8 transition-colors bg-aram-purple-50 px-4 py-2 rounded-lg"
        >
          <X className="w-4 h-4" />
          Close
        </button>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {title}
        </h1>

        {/* Metadata bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-gray-200">
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: sectorStyle.bg }}
          >
            {sectorStyle.label}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            {locations.join(', ')}
          </span>
          {duration && (
            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {duration}
            </span>
          )}
          {volunteerLead && (
            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
              <User className="w-4 h-4" />
              {volunteerLead}
            </span>
          )}
        </div>

        {/* What is it? */}
        {whatIsIt && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">What is it?</h2>
            <MultiLineText text={whatIsIt} className="text-base text-gray-600 leading-relaxed" />
          </section>
        )}

        {/* What happened? */}
        {whatHappened && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">What happened?</h2>

            {whatHappened.expected && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Expected outcome</p>
                <p className="text-sm text-gray-600 leading-relaxed">{whatHappened.expected}</p>
              </div>
            )}

            {whatHappened.actual && (
              <div>
                {whatHappened.expected && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">What actually happened</p>
                )}
                <p className="text-base text-gray-600 leading-relaxed">{whatHappened.actual}</p>
              </div>
            )}
          </section>
        )}

        {/* Materials needed */}
        {materialsNeeded && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Materials needed</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <MultiLineText text={materialsNeeded} className="text-sm text-gray-600 leading-relaxed" />
            </div>
          </section>
        )}

        {/* How to run it */}
        {howToRunIt && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">How to run it</h2>
            <MultiLineText text={howToRunIt} className="text-base text-gray-600 leading-relaxed" />
          </section>
        )}

        {/* Follow-up ideas */}
        {followUpIdeas && followUpIdeas.length > 0 && (
          <section className="mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold text-gray-900">Follow-up ideas</h2>
              </div>
              <ul className="space-y-2">
                {followUpIdeas.map((idea, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Resource link */}
        {resourceLink && (
          <section className="mb-8">
            <a
              href={resourceLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-aram-purple text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-aram-purple-dark transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              {resourceLink.label}
            </a>
          </section>
        )}

        {/* Minimal notice */}
        {detailStatus === 'minimal' && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <p className="text-sm text-gray-400">
              Detailed documentation for this activity is not yet available. More information will be added as it becomes available.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
