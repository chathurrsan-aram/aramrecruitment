'use client';

import { useState, useMemo, useCallback, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { StaggerContainer, StaggerItem } from '@/components/ui/motion';
import InsightCard from '@/components/ui/insight-card';
import PartnerCard from '@/components/ui/partner-card';
import SectorTag from '@/components/ui/sector-tag';
import TypeBadge from '@/components/ui/type-badge';
import { insights } from '@/data/insights';
import { partners } from '@/data/partners';
import { regions } from '@/data/regions';
import { sectors } from '@/data/sectors';
import { districtProjects, DISTRICT_TO_ARAM_REGION } from '@/data/districtProjects';
import {
  Search, Map, LayoutGrid, ArrowLeft, X, ChevronRight, ChevronUp, ChevronDown,
  Users, Lightbulb, MapPin, ExternalLink, Filter,
} from 'lucide-react';

const DISTRICT_NAMES = {
  CO: 'Colombo', GQ: 'Gampaha', KT: 'Kalutara', KY: 'Kandy', MT: 'Matale',
  NW: 'Nuwara Eliya', GL: 'Galle', MH: 'Matara', HB: 'Hambantota', JA: 'Jaffna',
  KL: 'Kilinochchi', MB: 'Mannar', VA: 'Vavuniya', MP: 'Mullaitivu', BC: 'Batticaloa',
  AP: 'Ampara', TC: 'Trincomalee', PR: 'Polonnaruwa', AD: 'Anuradhapura',
  KG: 'Kurunegala', PX: 'Puttalam', BD: 'Badulla', MJ: 'Moneragala',
  KE: 'Kegalle', RN: 'Ratnapura',
};

import dynamic from 'next/dynamic';
const SriLankaMap = dynamic(() => import('@/components/ui/sri-lanka-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-aram-warm-50">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-aram-warm-300 border-t-aram-purple rounded-full animate-spin mx-auto mb-3" />
        <p className="text-aram-warm-400 text-sm">Loading map...</p>
      </div>
    </div>
  ),
});

/* ─── Segmented Control (prominent, for Insights/Partners) ── */
function SegmentedControl({ leftLabel, rightLabel, isRight, onChange, leftIcon: LeftIcon, rightIcon: RightIcon }) {
  return (
    <div className="relative flex bg-aram-warm-100 rounded-xl p-1">
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-transform duration-300 ease-in-out ${
          isRight ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'
        }`}
        style={{ left: '4px' }}
      />
      <button
        onClick={() => onChange(false)}
        className={`relative z-10 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 min-w-[100px] ${
          !isRight ? 'text-aram-purple' : 'text-aram-warm-400'
        }`}
      >
        {LeftIcon && <LeftIcon className="w-4 h-4" />}
        {leftLabel}
      </button>
      <button
        onClick={() => onChange(true)}
        className={`relative z-10 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 min-w-[100px] ${
          isRight ? 'text-aram-purple' : 'text-aram-warm-400'
        }`}
      >
        {RightIcon && <RightIcon className="w-4 h-4" />}
        {rightLabel}
      </button>
    </div>
  );
}

/* ─── Small Toggle (compact, for Map/Cards) ──────── */
function SmallToggle({ leftLabel, rightLabel, isRight, onChange, leftIcon: LeftIcon, rightIcon: RightIcon }) {
  return (
    <div className="relative flex bg-aram-warm-100 rounded-lg p-0.5">
      <div
        className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] bg-white rounded-md shadow-sm transition-transform duration-300 ease-in-out ${
          isRight ? 'translate-x-[calc(100%+2px)]' : 'translate-x-0'
        }`}
        style={{ left: '2px' }}
      />
      <button
        onClick={() => onChange(false)}
        className={`relative z-10 flex items-center justify-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 ${
          !isRight ? 'text-aram-purple' : 'text-aram-warm-400'
        }`}
      >
        {LeftIcon && <LeftIcon className="w-3.5 h-3.5" />}
        <span className="hidden sm:inline">{leftLabel}</span>
      </button>
      <button
        onClick={() => onChange(true)}
        className={`relative z-10 flex items-center justify-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 ${
          isRight ? 'text-aram-purple' : 'text-aram-warm-400'
        }`}
      >
        {RightIcon && <RightIcon className="w-3.5 h-3.5" />}
        <span className="hidden sm:inline">{rightLabel}</span>
      </button>
    </div>
  );
}

/* ─── Full-page Detail View (slide-in, fully opaque — Fix #2) ── */
function DetailView({ item, type, onBack, backLabel }) {
  if (type === 'insight') {
    const region = regions.find(r => r.id === item.region);
    return (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-0 z-[9999] bg-white overflow-y-auto"
      >
        <div className="max-w-3xl mx-auto px-6 py-10">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-aram-purple hover:text-aram-green-900 mb-8 transition-colors bg-aram-purple-50 px-4 py-2 rounded-lg">
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </button>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <TypeBadge type={item.type} />
            {region && <span className="font-mono text-[11px] text-aram-warm-400">{region.name}</span>}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-aram-green-900 mb-6 leading-tight">{item.title}</h1>
          <p className="text-lg text-aram-warm-500 leading-relaxed mb-8">{item.summary}</p>
          <div className="flex gap-2 flex-wrap">
            {item.sectors.map(s => <SectorTag key={s} sector={s} size="md" />)}
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'partner') {
    const region = regions.find(r => r.id === item.region);
    return (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-0 z-[9999] bg-white overflow-y-auto"
      >
        <div className="max-w-3xl mx-auto px-6 py-10">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-aram-purple hover:text-aram-green-900 mb-8 transition-colors bg-aram-purple-50 px-4 py-2 rounded-lg">
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </button>
          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 rounded-xl bg-aram-green-100 flex items-center justify-center flex-shrink-0">
              <span className="font-display text-lg font-bold text-aram-green-900">
                {item.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-aram-green-900 mb-1 leading-tight">{item.name}</h1>
              {region && <p className="font-mono text-sm text-aram-warm-400">{region.name}</p>}
            </div>
          </div>
          <p className="text-lg text-aram-warm-500 font-medium mb-4">{item.oneLiner}</p>
          <p className="text-base text-aram-warm-500 leading-relaxed mb-8">{item.description}</p>
          <div className="flex gap-2 flex-wrap">
            {item.sectors.map(s => <SectorTag key={s} sector={s} size="md" />)}
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}

/* ─── Map Sidebar ─────────────────────────────────── */
function MapSidebar({ selectedDistrict, selectedRegion, contentMode, searchQuery, onClearAll, onClearDistrict, onSelectDetail }) {
  const region = regions.find(r => r.id === selectedRegion);
  const districtProject = selectedDistrict ? districtProjects[selectedDistrict] : null;
  const districtName = selectedDistrict ? DISTRICT_NAMES[selectedDistrict] : null;

  const filteredInsights = useMemo(() => {
    let filtered = insights;
    if (selectedRegion) filtered = filtered.filter(i => i.region === selectedRegion);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(i => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q));
    }
    return filtered;
  }, [selectedRegion, searchQuery]);

  const filteredPartners = useMemo(() => {
    let filtered = partners;
    if (selectedRegion) filtered = filtered.filter(p => p.region === selectedRegion);
    return filtered;
  }, [selectedRegion]);

  /* District with project data */
  if (selectedDistrict && districtProject) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-1.5 text-xs text-aram-warm-400 mb-4 font-mono">
          <button onClick={onClearAll} className="hover:text-aram-green-900">Sri Lanka</button>
          {region && (
            <>
              <ChevronRight className="w-3 h-3" />
              <button onClick={onClearDistrict} className="hover:text-aram-green-900">{region.name}</button>
            </>
          )}
          <ChevronRight className="w-3 h-3" />
          <span className="text-aram-green-900">{districtName}</span>
        </div>

        <h2 className="font-display text-2xl font-bold text-aram-green-900 mb-2">{districtName}</h2>

        <div className="mb-4">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
            districtProject.status === 'active'
              ? 'bg-aram-purple-50 text-aram-purple border border-aram-purple/20'
              : 'bg-aram-purple-50 text-aram-purple-light border border-aram-purple-light/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              districtProject.status === 'active' ? 'bg-aram-purple' : 'bg-aram-purple-light'
            }`} />
            {districtProject.status === 'active' ? 'Active' : 'Planned Expansion'}
          </span>
        </div>

        <p className="text-sm text-aram-warm-500 leading-relaxed mb-6">{districtProject.description}</p>

        <div className="mb-6">
          <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
            {districtProject.status === 'active' ? 'Active Projects' : 'Planned Initiatives'}
          </h3>
          <div className="space-y-2">
            {districtProject.projects.map((project, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-aram-warm-500">
                <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  districtProject.status === 'active' ? 'text-aram-purple' : 'text-aram-purple-light'
                }`} />
                {project}
              </div>
            ))}
          </div>
        </div>

        {districtProject.status === 'active' && districtProject.volunteers > 0 && (
          <div className="rounded-xl bg-aram-purple-50 border border-aram-purple/10 p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-aram-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-aram-purple" />
              </div>
              <div>
                <p className="text-aram-green-900 font-semibold text-lg">{districtProject.volunteers} Volunteers</p>
                <p className="text-aram-warm-400 text-xs">Active in this district</p>
              </div>
            </div>
          </div>
        )}

        {contentMode === 'partners' && filteredPartners.length > 0 && (
          <div>
            <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
              Regional Partners ({filteredPartners.length})
            </h3>
            <div className="space-y-3">
              {filteredPartners.map(p => (
                <div key={p.id} onClick={() => onSelectDetail({ type: 'partner', data: p })} className="cursor-pointer">
                  <PartnerCard partner={p} />
                </div>
              ))}
            </div>
          </div>
        )}
        {contentMode === 'insights' && filteredInsights.length > 0 && (
          <div>
            <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
              Regional Insights ({filteredInsights.length})
            </h3>
            <div className="space-y-3">
              {filteredInsights.map(insight => (
                <div key={insight.id} onClick={() => onSelectDetail({ type: 'insight', data: insight })} className="cursor-pointer">
                  <InsightCard insight={insight} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* District with no data */
  if (selectedDistrict && !districtProject) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-1.5 text-xs text-aram-warm-400 mb-4 font-mono">
          <button onClick={onClearAll} className="hover:text-aram-green-900">Sri Lanka</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-aram-green-900">{districtName}</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-aram-green-900 mb-2">{districtName}</h2>
        <div className="text-center py-10">
          <div className="w-14 h-14 bg-aram-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-6 h-6 text-aram-warm-300" />
          </div>
          <p className="text-aram-warm-400 text-sm mb-1">No current operations</p>
          <p className="text-aram-warm-300 text-xs">We don&apos;t currently have active programmes in this district.</p>
        </div>
      </div>
    );
  }

  /* Region selected (no specific district) */
  if (selectedRegion && region) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-1.5 text-xs text-aram-warm-400 mb-4 font-mono">
          <button onClick={onClearAll} className="hover:text-aram-green-900">Sri Lanka</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-aram-green-900">{region.name}</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-aram-green-900 mb-2">{region.name}</h2>
        <p className="text-sm text-aram-warm-500 leading-relaxed mb-5">{region.description}</p>

        {contentMode === 'partners' ? (
          <div>
            <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">Partners ({filteredPartners.length})</h3>
            {filteredPartners.length > 0 ? (
              <div className="space-y-3">
                {filteredPartners.map(p => (
                  <div key={p.id} onClick={() => onSelectDetail({ type: 'partner', data: p })} className="cursor-pointer">
                    <PartnerCard partner={p} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-aram-warm-400 py-4">No partners in this region yet.</p>
            )}
          </div>
        ) : (
          <div>
            <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">Insights ({filteredInsights.length})</h3>
            {filteredInsights.length > 0 ? (
              <div className="space-y-3">
                {filteredInsights.map(insight => (
                  <div key={insight.id} onClick={() => onSelectDetail({ type: 'insight', data: insight })} className="cursor-pointer">
                    <InsightCard insight={insight} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-aram-warm-400 py-4">No insights for this region.</p>
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
}

/* ─── Card Grid with Filters (Fix #7) ────────────── */
function CardGrid({ contentMode, searchQuery, onSelectDetail }) {
  const [sectorFilter, setSectorFilter] = useState(null);
  const [regionFilter, setRegionFilter] = useState(null);

  const filteredInsights = useMemo(() => {
    let filtered = insights;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(i => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q));
    }
    if (sectorFilter === 'cross-sector') {
      filtered = filtered.filter(i => i.sectors.length > 1);
    } else if (sectorFilter) {
      filtered = filtered.filter(i => i.sectors.includes(sectorFilter));
    }
    if (regionFilter) {
      filtered = filtered.filter(i => i.region === regionFilter);
    }
    return filtered;
  }, [searchQuery, sectorFilter, regionFilter]);

  const filteredPartners = useMemo(() => {
    let filtered = partners;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.oneLiner.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (sectorFilter === 'cross-sector') {
      filtered = filtered.filter(p => p.sectors.length > 1);
    } else if (sectorFilter) {
      filtered = filtered.filter(p => p.sectors.includes(sectorFilter));
    }
    if (regionFilter) {
      filtered = filtered.filter(p => p.region === regionFilter);
    }
    return filtered;
  }, [searchQuery, sectorFilter, regionFilter]);

  const items = contentMode === 'insights' ? filteredInsights : filteredPartners;
  const itemLabel = contentMode === 'insights' ? 'insights' : 'partners';

  const filterBar = (
    <div className="mb-6 space-y-3">
      {/* Sector pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setSectorFilter(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            sectorFilter === null
              ? 'bg-aram-purple text-white shadow-sm'
              : 'bg-aram-warm-100 text-aram-warm-500 hover:bg-aram-warm-200'
          }`}
        >
          All
        </button>
        {sectors.map(s => (
          <button
            key={s.id}
            onClick={() => setSectorFilter(sectorFilter === s.id ? null : s.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              sectorFilter === s.id
                ? 'bg-aram-purple text-white shadow-sm'
                : 'bg-aram-warm-100 text-aram-warm-500 hover:bg-aram-warm-200'
            }`}
          >
            {s.name}
          </button>
        ))}
        <button
          onClick={() => setSectorFilter(sectorFilter === 'cross-sector' ? null : 'cross-sector')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            sectorFilter === 'cross-sector'
              ? 'bg-aram-purple text-white shadow-sm'
              : 'bg-aram-warm-100 text-aram-warm-500 hover:bg-aram-warm-200'
          }`}
        >
          Cross-sector
        </button>
      </div>

      {/* Region dropdown */}
      <div className="flex items-center gap-3">
        <select
          value={regionFilter || ''}
          onChange={(e) => setRegionFilter(e.target.value || null)}
          className="text-sm border border-aram-warm-200 rounded-lg px-3 py-1.5 bg-white text-aram-warm-500 focus:outline-none focus:ring-2 focus:ring-aram-purple/30 focus:border-aram-purple transition-all"
        >
          <option value="">All Regions</option>
          {regions.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
        {(sectorFilter || regionFilter) && (
          <button
            onClick={() => { setSectorFilter(null); setRegionFilter(null); }}
            className="text-xs text-aram-purple hover:text-aram-green-900 font-medium transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );

  if (contentMode === 'insights') {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        {filterBar}
        <p className="text-sm text-aram-warm-400 font-mono mb-6">{filteredInsights.length} {itemLabel}</p>
        {filteredInsights.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
            {filteredInsights.map(insight => {
              const region = regions.find(r => r.id === insight.region);
              return (
                <StaggerItem key={insight.id}>
                  <div
                    className="rounded-xl border border-aram-warm-200 bg-white p-5 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-aram-purple group h-full"
                    onClick={() => onSelectDetail({ type: 'insight', data: insight })}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <TypeBadge type={insight.type} />
                      {region && <span className="font-mono text-[10px] text-aram-warm-300">{region.name}</span>}
                    </div>
                    <h3 className="font-display text-base font-semibold text-aram-green-900 mb-2 group-hover:text-aram-purple transition-colors line-clamp-2">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-aram-warm-400 leading-relaxed line-clamp-3 mb-3">{insight.summary}</p>
                    <div className="flex gap-1.5 flex-wrap mt-auto">
                      {insight.sectors.slice(0, 3).map(s => <SectorTag key={s} sector={s} />)}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        ) : (
          <div className="text-center py-20">
            <div className="w-14 h-14 bg-aram-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-6 h-6 text-aram-warm-300" />
            </div>
            <p className="text-aram-warm-400 text-sm mb-1">No insights found for this combination</p>
            <p className="text-aram-warm-300 text-xs">Try adjusting your sector or region filters.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {filterBar}
      <p className="text-sm text-aram-warm-400 font-mono mb-6">{filteredPartners.length} {itemLabel}</p>
      {filteredPartners.length > 0 ? (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
          {filteredPartners.map(partner => {
            const region = regions.find(r => r.id === partner.region);
            return (
              <StaggerItem key={partner.id}>
                <div
                  className="rounded-xl border border-aram-warm-200 bg-white p-5 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-aram-purple group h-full"
                  onClick={() => onSelectDetail({ type: 'partner', data: partner })}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-aram-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-xs font-bold text-aram-green-900">
                        {partner.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-aram-green-900 group-hover:text-aram-purple transition-colors">
                        {partner.name}
                      </h3>
                      {region && <p className="font-mono text-[10px] text-aram-warm-300">{region.name}</p>}
                    </div>
                  </div>
                  <p className="text-sm text-aram-warm-500 font-medium mb-1">{partner.oneLiner}</p>
                  <p className="text-sm text-aram-warm-400 leading-relaxed line-clamp-2 mb-3">{partner.description}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {partner.sectors.slice(0, 3).map(s => <SectorTag key={s} sector={s} />)}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      ) : (
        <div className="text-center py-20">
          <div className="w-14 h-14 bg-aram-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-6 h-6 text-aram-warm-300" />
          </div>
          <p className="text-aram-warm-400 text-sm mb-1">No partners found for this combination</p>
          <p className="text-aram-warm-300 text-xs">Try adjusting your sector or region filters.</p>
        </div>
      )}
    </div>
  );
}

/* ─── Main page content ───────────────────────────── */
function ResearchContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams?.get('view') || 'map';
  const initialRegion = searchParams?.get('region') || null;

  const [isCardView, setIsCardView] = useState(initialView === 'cards');
  const [isPartners, setIsPartners] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [detailItem, setDetailItem] = useState(null);

  /* Refs for section-based scroll (Fix #4, #5) */
  const heroRef = useRef(null);
  const controlsRef = useRef(null);
  const contentRef = useRef(null);
  const [currentSection, setCurrentSection] = useState('hero'); // 'hero' | 'content' | 'footer'
  const [headerVisible, setHeaderVisible] = useState(true);

  const contentMode = isPartners ? 'partners' : 'insights';
  const backLabel = isCardView ? 'Back to Cards' : 'Back to Map';
  const hasSidebar = !!(selectedDistrict || selectedRegion);

  const handleViewToggle = useCallback((val) => {
    setIsCardView(val);
    setDetailItem(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('view', val ? 'cards' : 'map');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const handleDistrictClick = useCallback((code) => {
    if (code) {
      const aramRegion = DISTRICT_TO_ARAM_REGION[code];
      if (aramRegion) setSelectedRegion(aramRegion);
    }
    setSelectedDistrict(prev => prev === code ? null : code);
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedRegion(null);
    setSelectedDistrict(null);
  }, []);

  const handleClearDistrict = useCallback(() => {
    setSelectedDistrict(null);
  }, []);

  /* Fix #4: Header visibility — hide when scrolled past hero into immersive content */
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = heroRef.current;
      if (!heroEl) return;
      const heroBottom = heroEl.getBoundingClientRect().bottom;
      // When the hero section scrolls out of view, hide the header
      setHeaderVisible(heroBottom > 0);

      // Determine current section for arrow visibility
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;

      if (scrollY < (heroEl.offsetHeight - 50)) {
        setCurrentSection('hero');
      } else if (scrollY + viewHeight >= docHeight - 50) {
        setCurrentSection('footer');
      } else {
        setCurrentSection('content');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Communicate header visibility to the parent layout navbar */
  useEffect(() => {
    const navbar = document.querySelector('header');
    if (!navbar) return;
    if (headerVisible) {
      navbar.style.transform = 'translateY(0)';
      navbar.style.opacity = '1';
      navbar.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      navbar.style.pointerEvents = 'auto';
    } else {
      navbar.style.transform = 'translateY(-100%)';
      navbar.style.opacity = '0';
      navbar.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      navbar.style.pointerEvents = 'none';
    }
    return () => {
      if (navbar) {
        navbar.style.transform = '';
        navbar.style.opacity = '';
        navbar.style.transition = '';
        navbar.style.pointerEvents = '';
      }
    };
  }, [headerVisible]);

  /* Fix #5: Scroll navigation helpers */
  const scrollToHero = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToContent = useCallback(() => {
    const controlsEl = controlsRef.current;
    if (controlsEl) {
      controlsEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToFooter = useCallback(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex flex-col">
      {/* ── Hero section (scrolls naturally) ────── */}
      <div ref={heroRef} className="bg-aram-warm-50">
        <div className="pt-10 pb-8 md:pt-14 md:pb-10">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-aram-green-900 mb-3">
              Research & <span className="text-aram-purple">Insights</span>
            </h1>
            <p className="text-base text-aram-warm-500 leading-relaxed mb-6">
              Explore our field observations, research, and analysis — organised by region, sector, and theme.
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-aram-warm-300" />
              <input
                type="text"
                placeholder="Search insights, partners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-aram-warm-200 bg-white text-sm text-aram-green-900 placeholder:text-aram-warm-300 focus:outline-none focus:ring-2 focus:ring-aram-purple/30 focus:border-aram-purple transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-aram-warm-300 hover:text-aram-warm-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Toggle bar (Fix #1: sits above map with z-30, clear boundary) ── */}
      <div ref={controlsRef} className="sticky top-0 z-30 bg-white border-b border-aram-warm-200">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <SmallToggle
            leftLabel="Map"
            rightLabel="Cards"
            leftIcon={Map}
            rightIcon={LayoutGrid}
            isRight={isCardView}
            onChange={handleViewToggle}
          />
          <SegmentedControl
            leftLabel="Insights"
            rightLabel="Partners"
            leftIcon={Lightbulb}
            rightIcon={Users}
            isRight={isPartners}
            onChange={setIsPartners}
          />
          <Link href="/partners" className="text-aram-warm-300 hover:text-aram-purple transition-colors flex items-center gap-1 text-xs font-medium" title="Partners Directory">
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Directory</span>
          </Link>
        </div>
      </div>

      {/* ── Detail overlay (Fix #2: z-[9999], fully opaque) ── */}
      <AnimatePresence>
        {detailItem && (
          <DetailView
            key="detail"
            item={detailItem.data}
            type={detailItem.type}
            onBack={() => setDetailItem(null)}
            backLabel={backLabel}
          />
        )}
      </AnimatePresence>

      {/* ── Content area ──────────────────────────── */}
      <div className="flex-1 relative" ref={contentRef}>
        {/* Fix #5: Navigation arrows — context-aware */}
        <AnimatePresence>
          {currentSection === 'content' && (
            <motion.button
              key="arrow-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollToHero}
              className="fixed top-14 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-white/60 backdrop-blur-sm border border-aram-warm-200 shadow-sm flex items-center justify-center text-aram-warm-300 hover:text-aram-purple hover:bg-white/90 transition-all"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {(currentSection === 'content' || currentSection === 'hero') && (
            <motion.button
              key="arrow-down"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={currentSection === 'hero' ? scrollToContent : scrollToFooter}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-white/60 backdrop-blur-sm border border-aram-warm-200 shadow-sm flex items-center justify-center text-aram-warm-300 hover:text-aram-purple hover:bg-white/90 transition-all"
              aria-label="Scroll down"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {currentSection === 'footer' && (
            <motion.button
              key="arrow-up-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollToContent}
              className="fixed top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-white/60 backdrop-blur-sm border border-aram-warm-200 shadow-sm flex items-center justify-center text-aram-warm-300 hover:text-aram-purple hover:bg-white/90 transition-all"
              aria-label="Scroll to research view"
            >
              <ChevronUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!isCardView ? (
            /* ── MAP VIEW (Fix #1 + #6) ── */
            <motion.div
              key="map-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Fix #1: overflow-hidden prevents map bleeding into controls.
                  Fix #6: 55/45 split gives sidebar enough room. */}
              <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 49px)' }}>
                {/* Map container — overflow hidden clips the map strictly */}
                <div
                  className="relative overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    flex: hasSidebar ? '1 1 55%' : '1 1 100%',
                    minHeight: '400px',
                  }}
                >
                  <div className="absolute inset-0">
                    <SriLankaMap
                      selectedRegion={selectedRegion}
                      onSelectRegion={setSelectedRegion}
                      selectedDistrict={selectedDistrict}
                      onSelectDistrict={handleDistrictClick}
                    />
                  </div>

                  {/* "Click to explore" overlay */}
                  {!hasSidebar && (
                    <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none z-10">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg border border-aram-warm-200"
                      >
                        <p className="text-sm text-aram-warm-500 font-medium">Click a district to explore</p>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Sidebar (Fix #6: 45% width, no truncation) */}
                <AnimatePresence>
                  {hasSidebar && (
                    <motion.div
                      key="sidebar"
                      initial={{ flex: '0 0 0%', opacity: 0 }}
                      animate={{ flex: '0 0 45%', opacity: 1 }}
                      exit={{ flex: '0 0 0%', opacity: 0 }}
                      transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                      className="bg-white border-l border-aram-warm-200 overflow-y-auto overflow-x-hidden hidden lg:block min-w-0"
                    >
                      <MapSidebar
                        selectedDistrict={selectedDistrict}
                        selectedRegion={selectedRegion}
                        contentMode={contentMode}
                        searchQuery={searchQuery}
                        onClearAll={handleClearAll}
                        onClearDistrict={handleClearDistrict}
                        onSelectDetail={setDetailItem}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile sidebar (below map) */}
              {hasSidebar && (
                <div className="lg:hidden bg-white border-t border-aram-warm-200">
                  <MapSidebar
                    selectedDistrict={selectedDistrict}
                    selectedRegion={selectedRegion}
                    contentMode={contentMode}
                    searchQuery={searchQuery}
                    onClearAll={handleClearAll}
                    onClearDistrict={handleClearDistrict}
                    onSelectDetail={setDetailItem}
                  />
                </div>
              )}
            </motion.div>
          ) : (
            /* ── CARD VIEW ── */
            <motion.div
              key="card-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardGrid
                contentMode={contentMode}
                searchQuery={searchQuery}
                onSelectDetail={setDetailItem}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ResearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-aram-warm-400">Loading...</div>}>
      <ResearchContent />
    </Suspense>
  );
}
