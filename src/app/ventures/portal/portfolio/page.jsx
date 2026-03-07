'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { ViewToggle } from '@/components/ventures/portal-shell';
import { PortfolioCard } from '@/components/ventures/venture-card';
import SlidePanel from '@/components/ventures/slide-panel';
import { portfolioCompanies, ventureSectors, ventureRegions, getVenturesByDistrict } from '@/data/venturesData';
import { Search, Filter } from 'lucide-react';
import dynamic from 'next/dynamic';

const SriLankaMap = dynamic(() => import('@/components/ui/sri-lanka-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#13131F]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#2A2A40] border-t-[#6D4A9E] rounded-full animate-spin mx-auto mb-3" />
        <p className="text-[#7A7A9A] text-sm">Loading map...</p>
      </div>
    </div>
  ),
});

// Build district highlights from portfolio data
const portfolioHighlights = {};
for (const company of portfolioCompanies) {
  const sector = ventureSectors.find(s => s.id === company.sector);
  portfolioHighlights[company.districtCode] = {
    color: sector?.color || '#6D4A9E',
    label: `Portfolio — ${company.name}`,
  };
}

const portfolioLegend = [
  { color: '#6D4A9E', label: 'Portfolio venture' },
  { color: '#D1D5DB', label: 'No ventures' },
];

export default function PortfolioTab() {
  const [isCards, setIsCards] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const filteredCompanies = useMemo(() => {
    let result = portfolioCompanies;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
      );
    }
    if (sectorFilter) {
      result = result.filter(c => c.sector === sectorFilter);
    }
    return result;
  }, [searchQuery, sectorFilter]);

  const handleDistrictSelect = (code) => {
    setSelectedDistrict(code);
    if (code) {
      const { portfolio } = getVenturesByDistrict(code);
      if (portfolio.length > 0) {
        setSelectedItem(portfolio[0]);
      } else {
        setSelectedItem(null);
      }
    } else {
      setSelectedItem(null);
    }
  };

  const activeSectors = ventureSectors.filter(s =>
    portfolioCompanies.some(c => c.sector === s.id)
  );

  return (
    <div className="flex flex-col h-[calc(100vh-110px)]">
      {/* Filter bar */}
      <div className="px-4 md:px-6 py-4 border-b border-[#2A2A40] flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A9A]" />
          <input
            type="text"
            placeholder="Search portfolio..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#1A1A2E] border border-[#2A2A40] text-sm text-white placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E] transition-colors"
          />
        </div>

        {/* Sector filters */}
        <div className="flex gap-1.5 flex-wrap">
          {activeSectors.map(s => (
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

        <div className="ml-auto">
          <ViewToggle isCards={isCards} onChange={setIsCards} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {isCards ? (
          <div className="p-4 md:p-6">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompanies.map(company => (
                <StaggerItem key={company.id}>
                  <PortfolioCard company={company} onClick={setSelectedItem} />
                </StaggerItem>
              ))}
            </StaggerContainer>
            {filteredCompanies.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#7A7A9A]">No ventures match your filters</p>
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
              districtHighlights={portfolioHighlights}
              legendItems={portfolioLegend}
            />
          </div>
        )}
      </div>

      {/* Slide-out panel */}
      <AnimatePresence>
        {selectedItem && (
          <SlidePanel
            item={selectedItem}
            type="portfolio"
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
