'use client';

import { useState, useMemo } from 'react';
import { StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { ViewToggle } from '@/components/ventures/portal-shell';
import { EmergingCard } from '@/components/ventures/venture-card';
import SlidePanel from '@/components/ventures/slide-panel';
import { emergingVentures, ventureSectors, getVenturesByDistrict } from '@/data/venturesData';
import { Search } from 'lucide-react';
import dynamic from 'next/dynamic';

const SriLankaMap = dynamic(() => import('@/components/ui/sri-lanka-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#13151F]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#2A2D3E] border-t-[#6D4A9E] rounded-full animate-spin mx-auto mb-3" />
        <p className="text-[#7A7A9A] text-sm">Loading map...</p>
      </div>
    </div>
  ),
});

// Build district highlights from emerging/opportunities data
const opportunityHighlights = {};
for (const venture of emergingVentures) {
  const sector = ventureSectors.find(s => s.id === venture.sector);
  opportunityHighlights[venture.districtCode] = {
    color: sector?.color || '#C9A84C',
    label: `Opportunity: ${venture.name}`,
  };
}

const opportunityLegend = [
  { color: '#C9A84C', label: 'Opportunity' },
  { color: '#E5E5E0', label: 'No opportunities' },
];

export default function EmergingTab() {
  const [isCards, setIsCards] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const filteredVentures = useMemo(() => {
    let result = emergingVentures;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.tagline.toLowerCase().includes(q) ||
        v.region.toLowerCase().includes(q)
      );
    }
    if (sectorFilter) {
      result = result.filter(v => v.sector === sectorFilter);
    }
    return result;
  }, [searchQuery, sectorFilter]);

  const handleDistrictSelect = (code) => {
    setSelectedDistrict(code);
    if (code) {
      const { emerging } = getVenturesByDistrict(code);
      if (emerging.length > 0) {
        setSelectedItem(emerging[0]);
      } else {
        setSelectedItem(null);
      }
    } else {
      setSelectedItem(null);
    }
  };

  const activeSectors = ventureSectors.filter(s =>
    emergingVentures.some(v => v.sector === s.id)
  );

  return (
    <div className="flex flex-col h-[calc(100vh-110px)]">
      {/* Filter bar */}
      <div className="px-4 md:px-6 py-4 border-b border-[#2A2D3E] bg-[#181B24] flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A9A]" />
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#13151F] border border-[#2A2D3E] text-sm text-white placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E] transition-colors"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {activeSectors.map(s => (
            <button
              key={s.id}
              onClick={() => setSectorFilter(sectorFilter === s.id ? null : s.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                sectorFilter === s.id
                  ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10'
                  : 'border-[#2A2D3E] text-[#7A7A9A] hover:border-[#C9A84C]/50'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="ml-auto">
          <ViewToggle isCards={isCards} onChange={setIsCards} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {isCards ? (
          <div className="p-4 md:p-6">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVentures.map(venture => (
                <StaggerItem key={venture.id}>
                  <EmergingCard venture={venture} onClick={setSelectedItem} />
                </StaggerItem>
              ))}
            </StaggerContainer>
            {filteredVentures.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#7A7A9A]">No opportunities match your filters</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full relative">
            <SriLankaMap
              selectedRegion={selectedRegion}
              onSelectRegion={setSelectedRegion}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={handleDistrictSelect}
              hasSidebar={!!selectedItem}
              districtHighlights={opportunityHighlights}
              legendItems={opportunityLegend}
            />
          </div>
        )}
      </div>

      <SlidePanel
        item={selectedItem}
        type="emerging"
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
