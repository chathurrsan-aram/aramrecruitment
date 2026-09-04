'use client';

import SectorTag from './sector-tag';
import TypeBadge from './type-badge';
import { regions } from '@/data/regions';
import { Clock } from 'lucide-react';

export default function InsightCard({ insight, compact = false }) {
  const region = regions.find((r) => r.id === insight.region);
  const isMacro = insight.type === 'macro';

  return (
    <div className="rounded-xl border border-aram-warm-200 bg-white p-5 transition-all hover:border-aram-purple hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <TypeBadge type={insight.type} />
        {isMacro ? (
          <span className="font-mono text-[11px] text-amber-600">
            All regions
          </span>
        ) : region && (
          <span className="font-mono text-[11px] text-aram-warm-400">
            {region.name}
          </span>
        )}
      </div>
      <h3 className="font-display text-lg font-semibold text-aram-green-900 mb-2 leading-snug">
        {insight.title}
      </h3>
      {!compact && (
        <p className="text-sm text-aram-warm-500 leading-relaxed mb-3 line-clamp-3">
          {insight.summary}
        </p>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        {insight.sectors.map((s) => (
          <SectorTag key={s} sector={s} />
        ))}
        {insight.readTime && (
          <span className="flex items-center gap-1 text-[11px] text-aram-warm-300 ml-auto">
            <Clock className="w-3 h-3" /> {insight.readTime} min
          </span>
        )}
      </div>
    </div>
  );
}
