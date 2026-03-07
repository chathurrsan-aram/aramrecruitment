'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { StaggerContainer, StaggerItem, Reveal } from '@/components/ui/motion';
import { VentureInsightCard } from '@/components/ventures/venture-card';
import { ventureInsights, ventureSectors, ventureRegions } from '@/data/venturesData';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';

export default function InsightsTab() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState(null);
  const [regionFilter, setRegionFilter] = useState('all');

  // Separate featured (macro overview) from sector insights
  const featuredInsight = ventureInsights.find(i => i.featured);
  const sectorInsights = ventureInsights.filter(i => !i.featured);

  const filteredInsights = useMemo(() => {
    let result = sectorInsights;
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
  }, [searchQuery, sectorFilter, regionFilter, sectorInsights]);

  const insightSectors = ventureSectors.filter(s =>
    sectorInsights.some(i => i.sectors.includes(s.id))
  );

  // Hide featured card if filters are active
  const showFeatured = !searchQuery && !sectorFilter && regionFilter === 'all';

  return (
    <div className="flex flex-col h-[calc(100vh-110px)]">
      {/* Filter bar */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-white flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search insights..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#6D4A9E] transition-colors"
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
                  ? 'border-[#6D4A9E] text-[#6D4A9E] bg-[#6D4A9E]/10'
                  : 'border-gray-200 text-gray-400 hover:border-[#6D4A9E]/50'
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
            className="appearance-none pl-3 pr-8 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#6D4A9E] transition-colors"
          >
            {ventureRegions.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* Featured Macro Overview Card */}
        {showFeatured && featuredInsight && (
          <Reveal>
            <button
              onClick={() => router.push(`/ventures/portal/insights/${featuredInsight.insightPageSlug}`)}
              className="w-full text-left mb-6 bg-gradient-to-br from-gray-50 to-white border border-[#6D4A9E]/20 rounded-xl p-6 md:p-8 transition-all duration-200 hover:border-[#6D4A9E]/40 hover:shadow-xl hover:shadow-[#6D4A9E]/5 group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#6D4A9E]/10 text-[#6D4A9E] border border-[#6D4A9E]/20">
                  Macro Overview
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/15">
                  Start Here
                </span>
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#6D4A9E] transition-colors">
                Why Sri Lanka&apos;s Tamil-majority regions, why now, and why diaspora capital
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-3xl">
                {featuredInsight.summary}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#6D4A9E] font-medium group-hover:gap-3 transition-all">
                Read the macro thesis <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </Reveal>
        )}

        {/* Section label */}
        {showFeatured && (
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400">Sector Deep Dives</h3>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-mono">{sectorInsights.length} sectors</span>
          </div>
        )}

        {/* Sector Insight Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInsights.map(insight => (
            <StaggerItem key={insight.id}>
              <VentureInsightCard insight={insight} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        {filteredInsights.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No insights match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
