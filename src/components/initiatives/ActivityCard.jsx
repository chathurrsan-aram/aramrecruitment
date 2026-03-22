'use client';

import { MapPin, Clock, User, FileText } from 'lucide-react';
import { activitySectorColors } from '@/data/tripActivities';

export default function ActivityCard({ activity, onClick }) {
  const { title, sector, locations, duration, volunteerLead, whatIsIt, detailStatus } = activity;
  const sectorStyle = activitySectorColors[sector];

  return (
    <button
      onClick={onClick}
      className="group block w-full text-left rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-aram-purple/40"
    >
      {/* Top row: sector badge + full guide indicator */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span
          className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full text-white"
          style={{ backgroundColor: sectorStyle.bg }}
        >
          {sectorStyle.label}
        </span>
        {detailStatus === 'full' && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-aram-purple bg-aram-purple-50 px-2 py-0.5 rounded-full">
            <FileText className="w-3 h-3" />
            Full guide
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-aram-purple transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
        {whatIsIt}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-400">
        <span className="inline-flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {locations.length > 1 ? `${locations[0]} +${locations.length - 1}` : locations[0]}
        </span>
        {duration && (
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {duration}
          </span>
        )}
        {volunteerLead && (
          <span className="inline-flex items-center gap-1">
            <User className="w-3 h-3" />
            {volunteerLead}
          </span>
        )}
      </div>
    </button>
  );
}
