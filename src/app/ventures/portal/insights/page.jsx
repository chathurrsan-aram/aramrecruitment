'use client';

import { useState, useMemo } from 'react';
import { StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { VentureInsightCard } from '@/components/ventures/venture-card';
import { ventureInsights, ventureSectors, ventureRegions } from '@/data/venturesData';
import { Search, ChevronDown } from 'lucide-react';

export default function InsightsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState(null);
  const [regionFilter, setRegionFilter] = useState('all');

  const filteredInsights = useMemo(() => {
    let result = ventureInsights;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q)
      );
    }
    if (sectorFilter) {
      result = result.filter(i => i.sectors.includes(sectorFilter));
    }
    if (regionFilter !== 'all') {
      result = result.filter(i => i.region === regionFilter);
    }
    return result;
  }, [searchQuery, sectorFilter, regionFilter]);

  const insightSectors = ventureSectors.filter(s =>
    ventureInsights.some(i => i.sectors.includes(s.id))
  );

  return (
    <div className="flex flex-col h-[calc(100vh-110px)]">
      {/* Filter bar */}
      <div className="px-4 md:px-6 py-4 border-b border-[#2A2A40] flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A9A]" />
          <input
            type="text"
            placeholder="Search insights..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#1A1A2E] border border-[#2A2A40] text-sm text-white placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E] transition-colors"
          />
        </div>

        {/* Sector filters */}
        <div className="flex gap-1.5 flex-wrap">
          {insightSectors.map(s => (
            <button
              key={s.id}
              onClick={() => setSectorFilter(sectorFilter === s.id ? null : s.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                sectorFilter === s.id
                  ? 'border-[#6D4A9E] text-[#9B72CF] bg-[#6D4A9E]/10'
                  : 'border-[#2A2A40] text-[#7A7A9A] hover:border-[#6D4A9E]/50'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Region dropdown */}
        <div className="relative ml-auto">
          <select
            value={regionFilter}
            onChange={e => setRegionFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg bg-[#1A1A2E] border border-[#2A2A40] text-sm text-white focus:outline-none focus:border-[#6D4A9E] transition-colors"
          >
            {ventureRegions.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A9A] pointer-events-none" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInsights.map(insight => (
            <StaggerItem key={insight.id}>
              <VentureInsightCard insight={insight} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        {filteredInsights.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#7A7A9A]">No insights match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
