'use client';

import { useState, useMemo, useCallback, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import InsightCard from '@/components/ui/insight-card';
import PartnerCard from '@/components/ui/partner-card';
import SectorTag from '@/components/ui/sector-tag';
import { insights } from '@/data/insights';
import { partners } from '@/data/partners';
import { regions } from '@/data/regions';
import { sectors } from '@/data/sectors';
import { districtProjects, DISTRICT_TO_ARAM_REGION } from '@/data/districtProjects';
import {
  Search, Map, LayoutGrid, Globe, ArrowLeft, X, ChevronRight,
  ChevronUp, ChevronDown, Users, Lightbulb, MapPin, Filter,
} from 'lucide-react';

const DISTRICT_NAMES = {
  CO: 'Colombo', GQ: 'Gampaha', KT: 'Kalutara', KY: 'Kandy', MT: 'Matale',
  NW: 'Nuwara Eliya', GL: 'Galle', MH: 'Matara', HB: 'Hambantota', JA: 'Jaffna',
  KL: 'Kilinochchi', MB: 'Mannar', VA: 'Vavuniya', MP: 'Mullaitivu', BC: 'Batticaloa',
  AP: 'Ampara', TC: 'Trincomalee', PR: 'Polonnaruwa', AD: 'Anuradhapura',
  KG: 'Kurunegala', PX: 'Puttalam', BD: 'Badulla', MJ: 'Moneragala',
  KE: 'Kegalle', RN: 'Ratnapura',
};

/* Dynamically import the Leaflet map (no SSR) */
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

/* ─── View Switcher (pill-style segmented control) ──── */
function ViewSwitcher({ active, onChange }) {
  const views = [
    { id: 'map', label: 'Map', icon: Map },
    { id: 'sectors', label: 'Sectors', icon: LayoutGrid },
    { id: 'macro', label: 'Macro', icon: Globe },
  ];

  return (
    <div className="sticky top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-aram-warm-200">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between py-3">
        {/* Pill toggle on the left */}
        <div className="inline-flex bg-aram-warm-100 rounded-xl p-1">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => onChange(v.id)}
              className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            >
              {active === v.id && (
                <motion.div
                  layoutId="view-pill"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 flex items-center gap-2 transition-colors ${
                active === v.id ? 'text-aram-green-900' : 'text-aram-warm-400'
              }`}>
                <v.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{v.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Aram logo on the right */}
        <img
          src="https://res.cloudinary.com/dhzuwjkkz/image/upload/v1771802172/a730ae79-83b6-460d-b17f-c562f2948100_pcjimk.png"
          alt="Aram"
          className="h-8 hidden md:block"
        />
      </div>
    </div>
  );
}

/* ─── Search Bar ───────────────────────────────────── */
function SearchBar({ query, onChange }) {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-aram-warm-300" />
      <input
        type="text"
        placeholder="Search insights, partners, regions..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-10 py-3 rounded-xl border border-aram-warm-200 bg-white text-sm text-aram-green-900 placeholder:text-aram-warm-300 focus:outline-none focus:ring-2 focus:ring-aram-purple/30 focus:border-aram-purple transition-all"
      />
      {query && (
        <button onClick={() => onChange('')} className="absolute right-3 top-1/2 -translate-y-1/2">
          <X className="w-4 h-4 text-aram-warm-300 hover:text-aram-warm-500" />
        </button>
      )}
    </div>
  );
}

/* ─── Content Mode Selector (prominent Partners / Insights choice) ── */
function ContentModeSelector({ mode, onChange }) {
  const modes = [
    {
      id: 'partners',
      icon: Users,
      label: 'Partners',
      desc: 'Community organisations',
    },
    {
      id: 'insights',
      icon: Lightbulb,
      label: 'Insights',
      desc: 'Field observations & analysis',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mb-5">
      {modes.map((m) => {
        const active = mode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
              active
                ? 'border-aram-purple bg-aram-purple-50'
                : 'border-aram-warm-200 bg-white hover:border-aram-warm-300'
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
              active ? 'bg-aram-purple text-white' : 'bg-aram-warm-100 text-aram-warm-400'
            }`}>
              <m.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className={`text-sm font-semibold ${active ? 'text-aram-purple' : 'text-aram-green-900'}`}>
                {m.label}
              </p>
              <p className="text-[11px] text-aram-warm-400 truncate">{m.desc}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Sector Filter Chips ─────────────────────────── */
function SectorFilterChips({ activeSectors, onToggle }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-3 h-3 text-aram-warm-400" />
        <span className="text-[11px] font-mono uppercase tracking-wider text-aram-warm-400">Filter by sector</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {sectors.map((s) => {
          const isActive = activeSectors.length === 0 || activeSectors.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => onToggle(s.id)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all border ${
                isActive
                  ? 'border-current opacity-100'
                  : 'border-aram-warm-200 text-aram-warm-300 opacity-60'
              }`}
              style={isActive ? { color: `var(--color-sector-${s.color})`, borderColor: `var(--color-sector-${s.color})` } : undefined}
            >
              <span className="text-xs">{s.icon}</span>
              {s.name}
            </button>
          );
        })}
        {activeSectors.length > 0 && (
          <button
            onClick={() => onToggle(null)}
            className="text-[11px] text-aram-warm-400 hover:text-aram-green-900 px-2 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── MAP VIEW ─────────────────────────────────────── */
function MapView({ selectedRegion, onSelectRegion, searchQuery }) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [mapMode, setMapMode] = useState('partners');
  const [sectorFilter, setSectorFilter] = useState([]);
  const [showPanel, setShowPanel] = useState(false);

  const region = regions.find((r) => r.id === selectedRegion);
  const districtProject = selectedDistrict ? districtProjects[selectedDistrict] : null;
  const districtName = selectedDistrict ? DISTRICT_NAMES[selectedDistrict] : null;

  const handleToggleSector = useCallback((sectorId) => {
    if (sectorId === null) {
      setSectorFilter([]);
      return;
    }
    setSectorFilter((prev) =>
      prev.includes(sectorId)
        ? prev.filter((s) => s !== sectorId)
        : [...prev, sectorId]
    );
  }, []);

  const filteredInsights = useMemo(() => {
    let filtered = insights;
    if (selectedRegion) filtered = filtered.filter((i) => i.region === selectedRegion);
    if (sectorFilter.length > 0) filtered = filtered.filter((i) => i.sectors.some((s) => sectorFilter.includes(s)));
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((i) => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q));
    }
    return filtered;
  }, [selectedRegion, searchQuery, sectorFilter]);

  const filteredPartners = useMemo(() => {
    let filtered = partners;
    if (selectedRegion) filtered = filtered.filter((p) => p.region === selectedRegion);
    if (sectorFilter.length > 0) filtered = filtered.filter((p) => p.sectors.some((s) => sectorFilter.includes(s)));
    return filtered;
  }, [selectedRegion, sectorFilter]);

  const handleDistrictSelect = useCallback((code) => {
    setSelectedDistrict(code);
    if (code) setShowPanel(true);
  }, []);

  const hasSelection = selectedDistrict || selectedRegion;

  return (
    <div className="flex flex-col lg:flex-row relative" style={{ minHeight: 'calc(100vh - 140px)' }}>
      {/* Map area */}
      <div className={`relative transition-all duration-300 ${
        showPanel && hasSelection ? 'hidden lg:block lg:w-3/5' : 'w-full lg:w-3/5'
      } h-[450px] lg:h-auto`} style={{ minHeight: 'calc(100vh - 140px)' }}>
        <SriLankaMap
          selectedRegion={selectedRegion}
          onSelectRegion={onSelectRegion}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={handleDistrictSelect}
        />
      </div>

      {/* Side panel — solid white, full page on mobile when active */}
      <div className={`bg-white border-l border-aram-warm-200 overflow-y-auto ${
        showPanel && hasSelection
          ? 'fixed inset-0 top-[64px] z-40 lg:static lg:w-2/5'
          : 'lg:w-2/5'
      }`} style={{ maxHeight: showPanel && hasSelection ? undefined : 'calc(100vh - 140px)' }}>
        <AnimatePresence mode="wait">
          {/* District selected → show district details */}
          {selectedDistrict && districtProject ? (
            <motion.div
              key={`district-${selectedDistrict}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="p-6"
            >
              {/* Back to Map (mobile) */}
              <button
                onClick={() => { setShowPanel(false); setSelectedDistrict(null); onSelectRegion(null); }}
                className="lg:hidden flex items-center gap-1.5 text-sm text-aram-purple font-medium mb-4"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Map
              </button>

              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs text-aram-warm-400 mb-4 font-mono">
                <button onClick={() => { onSelectRegion(null); setSelectedDistrict(null); setShowPanel(false); }} className="hover:text-aram-green-900">
                  Sri Lanka
                </button>
                {region && (
                  <>
                    <ChevronRight className="w-3 h-3" />
                    <button onClick={() => setSelectedDistrict(null)} className="hover:text-aram-green-900">
                      {region.name}
                    </button>
                  </>
                )}
                <ChevronRight className="w-3 h-3" />
                <span className="text-aram-green-900">{districtName}</span>
              </div>

              <h2 className="font-display text-2xl font-bold text-aram-green-900 mb-2">
                {districtName}
              </h2>

              {/* Status badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  districtProject.status === 'active'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    districtProject.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} />
                  {districtProject.status === 'active' ? 'Active' : 'Planned Expansion'}
                </span>
              </div>

              <p className="text-sm text-aram-warm-500 leading-relaxed mb-6">{districtProject.description}</p>

              {/* Projects */}
              <div className="mb-6">
                <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
                  {districtProject.status === 'active' ? 'Active Projects' : 'Planned Initiatives'}
                </h3>
                <div className="space-y-2">
                  {districtProject.projects.map((project, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-aram-warm-500">
                      <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        districtProject.status === 'active' ? 'text-emerald-600' : 'text-amber-500'
                      }`} />
                      {project}
                    </div>
                  ))}
                </div>
              </div>

              {/* Volunteer count */}
              {districtProject.status === 'active' && districtProject.volunteers > 0 && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-emerald-900 font-semibold text-lg">{districtProject.volunteers} Volunteers</p>
                      <p className="text-emerald-700 text-xs">Active in this district</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Region insights/partners if available */}
              {region && (
                <>
                  <ContentModeSelector mode={mapMode} onChange={setMapMode} />
                  <SectorFilterChips activeSectors={sectorFilter} onToggle={handleToggleSector} />
                </>
              )}
              {region && mapMode === 'partners' && filteredPartners.length > 0 && (
                <div>
                  <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
                    Regional Partners ({filteredPartners.length})
                  </h3>
                  <div className="space-y-3">
                    {filteredPartners.map((p) => (
                      <PartnerCard key={p.id} partner={p} />
                    ))}
                  </div>
                </div>
              )}
              {region && mapMode === 'insights' && filteredInsights.length > 0 && (
                <div>
                  <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
                    Regional Insights ({filteredInsights.length})
                  </h3>
                  <div className="space-y-3">
                    {filteredInsights.map((insight) => (
                      <InsightCard key={insight.id} insight={insight} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : selectedDistrict && !districtProject ? (
            /* District selected but no project data (inactive) */
            <motion.div
              key={`district-inactive-${selectedDistrict}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="p-6"
            >
              {/* Back to Map (mobile) */}
              <button
                onClick={() => { setShowPanel(false); setSelectedDistrict(null); onSelectRegion(null); }}
                className="lg:hidden flex items-center gap-1.5 text-sm text-aram-purple font-medium mb-4"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Map
              </button>

              <div className="flex items-center gap-1.5 text-xs text-aram-warm-400 mb-4 font-mono">
                <button onClick={() => { onSelectRegion(null); setSelectedDistrict(null); setShowPanel(false); }} className="hover:text-aram-green-900">
                  Sri Lanka
                </button>
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
            </motion.div>
          ) : selectedRegion ? (
            /* Region selected */
            <motion.div
              key={selectedRegion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="p-6"
            >
              {/* Back to Map (mobile) */}
              <button
                onClick={() => { setShowPanel(false); onSelectRegion(null); setSelectedDistrict(null); }}
                className="lg:hidden flex items-center gap-1.5 text-sm text-aram-purple font-medium mb-4"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Map
              </button>

              <div className="flex items-center gap-1.5 text-xs text-aram-warm-400 mb-4 font-mono">
                <button onClick={() => { onSelectRegion(null); setSelectedDistrict(null); setShowPanel(false); }} className="hover:text-aram-green-900">
                  Sri Lanka
                </button>
                <ChevronRight className="w-3 h-3" />
                <span className="text-aram-green-900">{region?.name}</span>
              </div>

              <h2 className="font-display text-2xl font-bold text-aram-green-900 mb-2">{region?.name}</h2>
              <p className="text-sm text-aram-warm-500 leading-relaxed mb-5">{region?.description}</p>

              <ContentModeSelector mode={mapMode} onChange={setMapMode} />
              <SectorFilterChips activeSectors={sectorFilter} onToggle={handleToggleSector} />

              {mapMode === 'partners' ? (
                <div>
                  <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
                    Partners ({filteredPartners.length})
                  </h3>
                  {filteredPartners.length > 0 ? (
                    <div className="space-y-3">
                      {filteredPartners.map((p) => (
                        <PartnerCard key={p.id} partner={p} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-aram-warm-400 py-4">No partners match this filter.</p>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
                    Insights ({filteredInsights.length})
                  </h3>
                  <div className="space-y-3">
                    {filteredInsights.map((insight) => (
                      <InsightCard key={insight.id} insight={insight} />
                    ))}
                    {filteredInsights.length === 0 && (
                      <p className="text-sm text-aram-warm-400 py-4">No insights match this filter.</p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            /* Default: overview */
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6"
            >
              <div className="text-center py-6 mb-6">
                <Map className="w-10 h-10 text-aram-warm-300 mx-auto mb-3" />
                <p className="text-aram-warm-400 text-sm mb-1">Click a district on the map to explore.</p>
                <p className="text-aram-warm-300 text-xs">Green = active, amber = planned expansion.</p>
              </div>

              {/* Partners directory callout */}
              <div className="rounded-xl border border-aram-warm-200 bg-aram-warm-50 p-5 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-aram-purple" />
                  <h3 className="font-body text-sm font-semibold text-aram-green-900">Partner Directory</h3>
                </div>
                <div className="space-y-2">
                  {partners.slice(0, 5).map((p) => (
                    <div key={p.id} className="flex items-center gap-2 text-xs">
                      <span className="w-5 h-5 rounded bg-aram-green-100 flex items-center justify-center font-display font-bold text-aram-green-900 text-[9px]">
                        {p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </span>
                      <span className="text-aram-warm-500 truncate">{p.name}</span>
                      <span className="text-aram-warm-300 ml-auto text-[10px] flex-shrink-0">
                        {regions.find(r => r.id === p.region)?.name || ''}
                      </span>
                    </div>
                  ))}
                  {partners.length > 5 && (
                    <p className="text-[10px] text-aram-warm-300 pt-1">+ {partners.length - 5} more partners</p>
                  )}
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-aram-warm-50 border border-aram-warm-200 p-3 text-center">
                  <p className="font-display text-xl font-bold text-aram-purple">{Object.values(districtProjects).filter(d => d.status === 'active').length}</p>
                  <p className="text-[10px] text-aram-warm-400 font-mono uppercase">Active</p>
                </div>
                <div className="rounded-lg bg-aram-warm-50 border border-aram-warm-200 p-3 text-center">
                  <p className="font-display text-xl font-bold text-aram-purple">{Object.values(districtProjects).filter(d => d.status === 'planned').length}</p>
                  <p className="text-[10px] text-aram-warm-400 font-mono uppercase">Planned</p>
                </div>
                <div className="rounded-lg bg-aram-warm-50 border border-aram-warm-200 p-3 text-center">
                  <p className="font-display text-xl font-bold text-aram-purple">{partners.length}</p>
                  <p className="text-[10px] text-aram-warm-400 font-mono uppercase">Partners</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── SECTOR VIEW ──────────────────────────────────── */
function SectorView({ searchQuery }) {
  const [expandedSector, setExpandedSector] = useState(null);
  const [partnerFilter, setPartnerFilter] = useState(null);

  const sectorData = sectors.map((s) => ({
    ...s,
    insights: insights.filter((i) => i.sectors.includes(s.id)),
    partners: partners.filter((p) => p.sectors.includes(s.id)),
  }));

  const expanded = sectorData.find((s) => s.id === expandedSector);

  const filteredExpandedPartners = useMemo(() => {
    if (!expanded) return [];
    if (!partnerFilter) return expanded.partners;
    return expanded.partners.filter((p) => p.id === partnerFilter);
  }, [expanded, partnerFilter]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <AnimatePresence mode="wait">
        {expandedSector && expanded ? (
          <motion.div
            key={expanded.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => { setExpandedSector(null); setPartnerFilter(null); }}
              className="flex items-center gap-1.5 text-sm text-aram-warm-400 hover:text-aram-green-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Sectors
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{expanded.icon}</span>
              <h2 className="font-display text-2xl font-bold text-aram-green-900">{expanded.name}</h2>
            </div>
            <p className="text-aram-warm-500 leading-relaxed mb-6 max-w-2xl">{expanded.description}</p>

            {/* Partner filter chips */}
            {expanded.partners.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="w-3 h-3 text-aram-warm-400" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-aram-warm-400">Filter by partner</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setPartnerFilter(null)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                      !partnerFilter ? 'border-aram-purple text-aram-purple bg-aram-purple-50' : 'border-aram-warm-200 text-aram-warm-400'
                    }`}
                  >
                    All
                  </button>
                  {expanded.partners.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPartnerFilter(partnerFilter === p.id ? null : p.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                        partnerFilter === p.id ? 'border-aram-purple text-aram-purple bg-aram-purple-50' : 'border-aram-warm-200 text-aram-warm-400'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredExpandedPartners.length > 0 && (
              <div className="mb-8">
                <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">Partners</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {filteredExpandedPartners.map((p) => (
                    <PartnerCard key={p.id} partner={p} />
                  ))}
                </div>
              </div>
            )}

            <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
              Insights ({expanded.insights.length})
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {expanded.insights.map((i) => (
                <InsightCard key={i.id} insight={i} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.08}>
              {sectorData.map((s) => (
                <StaggerItem key={s.id}>
                  <div
                    className="rounded-xl border border-aram-warm-200 bg-white p-5 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    onClick={() => setExpandedSector(s.id)}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `var(--color-sector-${s.color})`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
                  >
                    <span className="text-2xl">{s.icon}</span>
                    <h3 className="font-body text-lg font-semibold text-aram-green-900 mt-2 mb-1">{s.name}</h3>
                    <p className="text-xs text-aram-warm-400 font-mono">
                      {s.insights.length} insights · {s.partners.length} partners
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── MACRO VIEW ───────────────────────────────────── */
function MacroView({ searchQuery }) {
  const [sectorFilter, setSectorFilter] = useState([]);

  const macroInsights = insights.filter(
    (i) => i.type === 'article' || i.type === 'research' || i.sectors.length > 1
  );

  const handleToggleSector = useCallback((sectorId) => {
    if (sectorId === null) {
      setSectorFilter([]);
      return;
    }
    setSectorFilter((prev) =>
      prev.includes(sectorId)
        ? prev.filter((s) => s !== sectorId)
        : [...prev, sectorId]
    );
  }, []);

  const filtered = useMemo(() => {
    let result = macroInsights;
    if (sectorFilter.length > 0) result = result.filter((i) => i.sectors.some((s) => sectorFilter.includes(s)));
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((i) => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q));
    }
    return result;
  }, [macroInsights, sectorFilter, searchQuery]);

  return (
    <div className="max-w-[720px] mx-auto px-6 py-10">
      <SectorFilterChips activeSectors={sectorFilter} onToggle={handleToggleSector} />

      <StaggerContainer className="space-y-6" staggerDelay={0.08}>
        {filtered.map((insight) => {
          const region = regions.find((r) => r.id === insight.region);
          return (
            <StaggerItem key={insight.id}>
              <article className="pb-6 border-b border-aram-warm-200 last:border-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`font-mono text-[11px] font-medium px-2 py-0.5 rounded-full ${
                    insight.type === 'article' ? 'bg-aram-purple-50 text-aram-purple' :
                    insight.type === 'research' ? 'bg-aram-green-100 text-aram-green-700' :
                    'bg-aram-warm-100 text-aram-warm-400'
                  }`}>
                    {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                  </span>
                  {region && (
                    <span className="font-mono text-[11px] text-aram-warm-400">{region.name}</span>
                  )}
                </div>
                <h2 className="font-display text-xl font-semibold text-aram-green-900 mb-2">{insight.title}</h2>
                <p className="text-sm text-aram-warm-500 leading-relaxed mb-3">{insight.summary}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {insight.sectors.map((s) => (
                    <SectorTag key={s} sector={s} />
                  ))}
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}

/* ─── Scroll Navigation Arrows ─────────────────────── */
function ScrollArrow({ direction, targetRef, label }) {
  const handleClick = () => {
    targetRef?.current?.scrollIntoView({ behavior: 'smooth', block: direction === 'up' ? 'start' : 'end' });
  };

  const Icon = direction === 'up' ? ChevronUp : ChevronDown;

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-aram-warm-200 shadow-sm text-aram-warm-400 hover:text-aram-green-900 transition-all hover:shadow-md text-xs"
      aria-label={label}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

/* ─── Page (wrapped with Suspense for useSearchParams) */
function ResearchContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams?.get('view') || 'map';
  const initialRegion = searchParams?.get('region') || null;

  const [view, setView] = useState(initialView);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);

  const headerRef = useRef(null);
  const footerRef = useRef(null);

  const handleViewChange = useCallback((v) => {
    setView(v);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('view', v);
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const handleSelectRegion = useCallback((regionId) => {
    setSelectedRegion(regionId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (regionId) url.searchParams.set('region', regionId);
      else url.searchParams.delete('region');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header section — scrolls naturally */}
      <section ref={headerRef} className="pt-32 pb-10 md:pt-40 md:pb-14 bg-aram-warm-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-aram-green-900 mb-4">
              Research & <span className="text-aram-purple">Insights</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-aram-warm-500 leading-relaxed mb-8">
              Explore our field observations, research, and analysis — organised by region, sector, and theme.
            </p>
          </Reveal>
          <SearchBar query={searchQuery} onChange={setSearchQuery} />
        </div>
      </section>

      <ViewSwitcher active={view} onChange={handleViewChange} />

      {/* Navigation arrow — scroll to header */}
      <div className="flex justify-end max-w-6xl mx-auto px-6 py-2">
        <ScrollArrow direction="up" targetRef={headerRef} label="Header" />
      </div>

      {/* Content area — stable min-height prevents footer bounce */}
      <div style={{ minHeight: 'calc(100vh - 200px)' }}>
        <AnimatePresence mode="wait">
          {view === 'map' && (
            <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MapView selectedRegion={selectedRegion} onSelectRegion={handleSelectRegion} searchQuery={searchQuery} />
            </motion.div>
          )}
          {view === 'sectors' && (
            <motion.div key="sectors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SectorView searchQuery={searchQuery} />
            </motion.div>
          )}
          {view === 'macro' && (
            <motion.div key="macro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MacroView searchQuery={searchQuery} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation arrow — scroll to footer */}
      <div ref={footerRef} className="flex justify-end max-w-6xl mx-auto px-6 py-2">
        <ScrollArrow direction="down" targetRef={footerRef} label="Footer" />
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
