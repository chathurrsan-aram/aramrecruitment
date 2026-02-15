'use client';

import { useState } from 'react';
import InitiativeCard from './InitiativeCard';
import { sectorColors } from '@/data/initiatives';

export default function InitiativeGrid({ initiatives }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const sectors = ['All', ...Object.keys(sectorColors)];
  const filtered = activeFilter === 'All'
    ? initiatives
    : initiatives.filter((i) => i.sector === activeFilter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {sectors.map((sector) => (
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

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((initiative) => (
          <InitiativeCard key={initiative.slug} initiative={initiative} />
        ))}
      </div>
    </div>
  );
}
