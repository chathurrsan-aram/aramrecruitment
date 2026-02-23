'use client';

import { useState, useMemo, useCallback, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
  Search, Map, LayoutGrid, ArrowLeft, X, ChevronRight,
  Users, Lightbulb, MapPin, ExternalLink, Filter, ArrowDown, MousePointerClick,
  Globe, Building2, BookOpen, Layers,
} from 'lucide-react';
import { videos } from '@/lib/cloudinary';

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

/* ─── Search Autocomplete ─────────────────────────── */
function SearchAutocomplete({ searchQuery, onChange, onSelectSuggestion, className }) {
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 1) return [];
    const q = searchQuery.toLowerCase();
    const results = [];

    // Match regions
    for (const r of regions) {
      if (r.name.toLowerCase().includes(q)) {
        results.push({ type: 'region', id: r.id, label: r.name, sub: r.provinces?.join(', ') || '' });
      }
    }

    // Match sectors
    for (const s of sectors) {
      if (s.name.toLowerCase().includes(q)) {
        results.push({ type: 'sector', id: s.id, label: s.name, sub: s.description?.slice(0, 60) + '...' });
      }
    }

    // Match partners
    for (const p of partners) {
      if (p.name.toLowerCase().includes(q) || p.oneLiner.toLowerCase().includes(q)) {
        results.push({ type: 'partner', id: p.id, label: p.name, sub: p.oneLiner });
      }
    }

    // Match insights
    for (const i of insights) {
      if (i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q)) {
        results.push({ type: 'insight', id: i.id, label: i.title, sub: i.summary.slice(0, 60) + '...' });
      }
    }

    return results.slice(0, 8);
  }, [searchQuery]);

  const typeIcons = {
    region: Globe,
    sector: Layers,
    partner: Building2,
    insight: BookOpen,
  };
  const typeLabels = { region: 'Region', sector: 'Sector', partner: 'Partner', insight: 'Insight' };
  const showDropdown = isFocused && suggestions.length > 0;

  return (
    <div ref={wrapperRef} className={`relative ${className || ''}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 z-10" />
      <input
        type="text"
        placeholder="Search regions, partners, insights..."
        value={searchQuery}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-aram-purple/50 focus:border-aram-purple/50 focus:bg-white/15 transition-all shadow-lg"
      />
      {searchQuery && (
        <button onClick={() => { onChange(''); setIsFocused(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
          <X className="w-4 h-4 text-white/40 hover:text-white/70" />
        </button>
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-xl border border-aram-warm-200 shadow-2xl overflow-hidden z-50 max-h-[320px] overflow-y-auto"
          >
            {suggestions.map((s, idx) => {
              const Icon = typeIcons[s.type];
              return (
                <button
                  key={`${s.type}-${s.id}`}
                  onClick={() => {
                    onSelectSuggestion(s);
                    setIsFocused(false);
                  }}
                  className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-aram-purple-50 transition-colors ${
                    idx > 0 ? 'border-t border-aram-warm-100' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-aram-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-aram-purple" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-aram-green-900 truncate">{s.label}</span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-aram-warm-300 flex-shrink-0">
                        {typeLabels[s.type]}
                      </span>
                    </div>
                    <p className="text-xs text-aram-warm-400 truncate mt-0.5">{s.sub}</p>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
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
  const [loaded, setLoaded] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const tutorialInteractionsRef = useRef(0);

  /* Refs for section-based scroll (Fix #4, #5) */
  const heroRef = useRef(null);
  const controlsRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);
  const sidebarRef = useRef(null);

  /* Parallax for video hero */
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 280]);
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, -60]);

  useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);

  /* Auto-dismiss tutorial after 8 s */
  useEffect(() => {
    if (!showTutorial) return;
    const t = setTimeout(() => setShowTutorial(false), 8000);
    return () => clearTimeout(t);
  }, [showTutorial]);

  /* Hide global navbar when the immersive content area (map/cards) is in view.
     Sets a data attribute on <html> that the navbar listens for via useEffect. */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.setAttribute('data-immersive', entry.isIntersecting ? 'true' : 'false');
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.removeAttribute('data-immersive');
    };
  }, []);

  /* Reset sidebar scroll to top whenever selection changes */
  useEffect(() => {
    if (sidebarRef.current) sidebarRef.current.scrollTop = 0;
  }, [selectedDistrict, selectedRegion]);

  const contentMode = isPartners ? 'partners' : 'insights';
  const backLabel = isCardView ? 'Back to Cards' : 'Back to Map';
  const hasSidebar = !!(selectedDistrict || selectedRegion);

  const dismissTutorialOnInteraction = useCallback(() => {
    tutorialInteractionsRef.current += 1;
    if (tutorialInteractionsRef.current >= 2) setShowTutorial(false);
  }, []);

  const handleViewToggle = useCallback((val) => {
    setIsCardView(val);
    setDetailItem(null);
    dismissTutorialOnInteraction();
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('view', val ? 'cards' : 'map');
      window.history.replaceState({}, '', url.toString());
    }
  }, [dismissTutorialOnInteraction]);

  const focusImmersiveViewport = useCallback(() => {
    const controlsEl = controlsRef.current;
    if (!controlsEl || typeof window === 'undefined') return;
    const top = controlsEl.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }, []);

  const handleDistrictClick = useCallback((code) => {
    if (code) {
      const aramRegion = DISTRICT_TO_ARAM_REGION[code];
      if (aramRegion) setSelectedRegion(aramRegion);
    }
    setSelectedDistrict(prev => prev === code ? null : code);
    /* Ensure map + sidebar are pulled cleanly into viewport from any scroll position */
    setTimeout(() => focusImmersiveViewport(), 50);
  }, [focusImmersiveViewport]);

  const handleClearAll = useCallback(() => {
    setSelectedRegion(null);
    setSelectedDistrict(null);
  }, []);

  const handleClearDistrict = useCallback(() => {
    setSelectedDistrict(null);
  }, []);

  const scrollToContent = useCallback(() => {
    const controlsEl = controlsRef.current;
    if (controlsEl) {
      controlsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSuggestionSelect = useCallback((suggestion) => {
    if (suggestion.type === 'region') {
      setSelectedRegion(suggestion.id);
      setSelectedDistrict(null);
      setSearchQuery('');
      setIsCardView(false);
      setTimeout(() => focusImmersiveViewport(), 100);
    } else if (suggestion.type === 'sector') {
      // Keep the sector name as search query to filter results
      setSearchQuery(suggestion.label);
      setTimeout(() => focusImmersiveViewport(), 100);
    } else if (suggestion.type === 'partner') {
      const partner = partners.find(p => p.id === suggestion.id);
      if (partner) {
        setSearchQuery('');
        setDetailItem({ type: 'partner', data: partner });
      }
    } else if (suggestion.type === 'insight') {
      const insight = insights.find(i => i.id === suggestion.id);
      if (insight) {
        setSearchQuery('');
        setDetailItem({ type: 'insight', data: insight });
      }
    }
  }, [focusImmersiveViewport]);

  return (
    <div className="flex flex-col">
      {/* ── Hero section — video background like home page ────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video background with parallax */}
        <motion.div className="absolute inset-0 noise-overlay" style={{ y: bgY, scale: bgScale }}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay loop muted playsInline
            poster="/images/Community.png"
          >
            <source src={videos.researchHero} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-aram-green-950/80" />
        </motion.div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-aram-purple/20"
            style={{
              width: 6 + i * 4,
              height: 6 + i * 4,
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
          />
        ))}

        {/* Hero content */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.25em] text-aram-purple-light mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={loaded ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            THE ARAM INITIATIVE
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Research & <span className="text-aram-purple-light">Insights</span>
          </motion.h1>
          <motion.p
            className="font-body text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explore our interactive map to discover insights and organisations across Sri Lanka.
          </motion.p>

          {/* Search with autocomplete */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SearchAutocomplete
              searchQuery={searchQuery}
              onChange={setSearchQuery}
              onSelectSuggestion={handleSuggestionSelect}
              className="max-w-md mx-auto"
            />
          </motion.div>
        </motion.div>

        {/* Hero CTA — balanced prominence */}
        <motion.button
          onClick={scrollToContent}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 group"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-col items-center gap-3">
            <motion.div
              className="bg-aram-purple/75 backdrop-blur-sm border border-white/30 rounded-2xl px-7 py-3.5 flex items-center gap-2.5 shadow-xl shadow-black/25 group-hover:bg-aram-purple/90 group-hover:shadow-aram-purple/40 transition-all duration-300"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            >
              <Map className="w-5 h-5 text-white transition-colors" />
              <span className="text-sm md:text-base font-semibold text-white tracking-wide">
                Explore the Map
              </span>
              <ArrowDown className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
            </motion.div>
            <div className="w-px h-6 bg-white/30 relative overflow-hidden">
              <div className="w-1.5 h-1.5 rounded-full bg-white absolute left-1/2 -translate-x-1/2 animate-bounce-dot" />
            </div>
          </div>
        </motion.button>
      </section>

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
            onChange={(val) => { setIsPartners(val); dismissTutorialOnInteraction(); }}
          />
          <Link href="/partners" className="text-aram-warm-300 hover:text-aram-purple transition-colors flex items-center gap-1 text-xs font-medium" title="Partners Directory">
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Directory</span>
          </Link>
        </div>
      </div>

      {/* ── Tutorial callouts — sticky pointers to toggles, auto-dismiss ── */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 64 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="sticky top-[49px] z-20 overflow-visible pointer-events-none"
          >
            <div className="max-w-6xl mx-auto px-4 relative h-full">
              <div className="absolute left-4 top-2 pointer-events-auto">
                <div className="relative rounded-lg bg-white border border-aram-purple/20 shadow-lg px-3 py-2">
                  <div className="absolute -top-1.5 left-8 w-3 h-3 bg-white border-l border-t border-aram-purple/20 rotate-45" />
                  <p className="text-[11px] text-aram-purple-dark whitespace-nowrap">
                    Switch <strong>Map</strong> / <strong>Cards</strong>
                  </p>
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 top-2 pointer-events-auto">
                <div className="relative rounded-lg bg-white border border-aram-purple/20 shadow-lg px-3 py-2 pr-8">
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-aram-purple/20 rotate-45" />
                  <p className="text-[11px] text-aram-purple-dark whitespace-nowrap">
                    Toggle <strong>Insights</strong> / <strong>Partners</strong>
                  </p>
                  <button
                    onClick={() => setShowTutorial(false)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-aram-purple/40 hover:text-aram-purple transition-colors"
                    aria-label="Dismiss hint"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* ── Content area (isolate creates stacking context so map z-indexes stay below toggle bar) ── */}
      <div className="flex-1 relative isolate z-0" ref={contentRef}>
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
                      hasSidebar={hasSidebar}
                    />
                  </div>

                  {/* Map hint — only when no district selected */}
                  {!hasSidebar && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        <div className="bg-white/90 backdrop-blur-sm text-aram-purple-dark border border-aram-purple/20 rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2.5 whitespace-nowrap">
                          <MousePointerClick className="w-4 h-4 flex-shrink-0 text-aram-purple" />
                          <p className="text-xs font-semibold leading-tight">
                            {isPartners ? 'Click a district to see Partners' : 'Click a district to see Insights'}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Sidebar (Fix #6: 45% width, no truncation) */}
                <AnimatePresence>
                  {hasSidebar && (
                    <motion.div
                      key="sidebar"
                      ref={sidebarRef}
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
