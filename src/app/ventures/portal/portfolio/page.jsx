'use client';

import { useState, useMemo } from 'react';
import { StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { ViewToggle } from '@/components/ventures/portal-shell';
import { PortfolioCard } from '@/components/ventures/venture-card';
import SlidePanel from '@/components/ventures/slide-panel';
import { portfolioCompanies, ventureSectors, ventureRegions, getVenturesByDistrict, investorPositions } from '@/data/venturesData';
import { Search, Filter, TrendingUp, DollarSign, PieChart, Briefcase, Star } from 'lucide-react';
import dynamic from 'next/dynamic';

const SriLankaMap = dynamic(() => import('@/components/ui/sri-lanka-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-[#6D4A9E] rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Loading map...</p>
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
    label: `Portfolio: ${company.name}`,
  };
}

const portfolioLegend = [
  { color: '#6D4A9E', label: 'Portfolio venture' },
  { color: '#E5E5E0', label: 'No ventures' },
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

  const truePotentialCount = portfolioCompanies.filter(c => c.truePotential).length;

  return (
    <div className="flex flex-col h-[calc(100vh-110px)]">
      {/* Filter bar */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-white flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search portfolio..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#6D4A9E] transition-colors"
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
                  ? 'border-[#6D4A9E] text-[#6D4A9E] bg-[#6D4A9E]/10'
                  : 'border-gray-200 text-gray-500 hover:border-[#6D4A9E]/50'
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

      {/* Portfolio Summary Bar */}
      <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-200">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
          <div className="bg-[#0D0D14] rounded-xl p-4 border border-[#2A2A40]">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-[#9B72CF]" />
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A]">Active Ventures</p>
            </div>
            <p className="text-xl font-bold text-white">{portfolioCompanies.length}</p>
          </div>
          <div className="bg-[#0D0D14] rounded-xl p-4 border border-[#2A2A40]">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-[#9B72CF]" />
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A]">Total Seeking</p>
            </div>
            <p className="text-xl font-bold text-white">£{(portfolioCompanies.reduce((sum, c) => sum + c.seeking, 0) / 1000).toFixed(0)}k</p>
          </div>
          <div className="bg-[#0D0D14] rounded-xl p-4 border border-[#2A2A40]">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-[#C9A84C]" />
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A]">True Potential Backed</p>
            </div>
            <p className="text-xl font-bold text-white">{truePotentialCount}</p>
          </div>
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
                <p className="text-gray-400">No ventures match your filters</p>
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
      <SlidePanel
        item={selectedItem}
        type="portfolio"
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
