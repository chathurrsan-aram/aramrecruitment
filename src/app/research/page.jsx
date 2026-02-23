'use client';

import { useState, useMemo, useCallback, Suspense, lazy } from 'react';
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
import { Search, Map, LayoutGrid, Globe, ArrowLeft, X, ChevronRight, Users, Eye, Lightbulb } from 'lucide-react';

/* Dynamically import the Leaflet map (no SSR) */
import dynamic from 'next/dynamic';
const SriLankaMap = dynamic(() => import('@/components/ui/sri-lanka-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-aram-green-900">
      <p className="text-white/50 text-sm">Loading map...</p>
    </div>
  ),
});

/* ─── View Switcher ────────────────────────────────── */
function ViewSwitcher({ active, onChange }) {
  const views = [
    { id: 'map', label: 'Map View', icon: Map },
    { id: 'sectors', label: 'Sector View', icon: LayoutGrid },
    { id: 'macro', label: 'Macro View', icon: Globe },
  ];

  return (
    <div className="sticky top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-aram-warm-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex gap-1 py-2 relative">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => onChange(v.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                active === v.id ? 'text-aram-green-900' : 'text-aram-warm-400 hover:text-aram-green-900'
              }`}
            >
              <v.icon className="w-4 h-4" />
              {v.label}
              {active === v.id && (
                <motion.div
                  layoutId="research-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-aram-purple rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
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

/* ─── Map Mode Toggle ─────────────────────────────── */
function MapModeToggle({ mode, onChange }) {
  return (
    <div className="flex gap-1 bg-aram-warm-100 rounded-lg p-0.5">
      <button
        onClick={() => onChange('partners')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
          mode === 'partners' ? 'bg-white text-aram-green-900 shadow-sm' : 'text-aram-warm-400 hover:text-aram-green-900'
        }`}
      >
        <Users className="w-3 h-3" /> Partners
      </button>
      <button
        onClick={() => onChange('insights')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
          mode === 'insights' ? 'bg-white text-aram-green-900 shadow-sm' : 'text-aram-warm-400 hover:text-aram-green-900'
        }`}
      >
        <Lightbulb className="w-3 h-3" /> Insights
      </button>
    </div>
  );
}

/* ─── MAP VIEW ─────────────────────────────────────── */
function MapView({ selectedRegion, onSelectRegion, searchQuery }) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [mapMode, setMapMode] = useState('partners');

  const region = regions.find((r) => r.id === selectedRegion);

  const filteredInsights = useMemo(() => {
    let filtered = insights;
    if (selectedRegion) filtered = filtered.filter((i) => i.region === selectedRegion);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((i) => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q));
    }
    return filtered;
  }, [selectedRegion, searchQuery]);

  const filteredPartners = useMemo(() => {
    let filtered = partners;
    if (selectedRegion) filtered = filtered.filter((p) => p.region === selectedRegion);
    return filtered;
  }, [selectedRegion]);

  return (
    <div className="flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 180px)' }}>
      {/* Map area */}
      <div className="lg:w-3/5 relative min-h-[450px] lg:min-h-0">
        {selectedRegion && (
          <button
            onClick={() => { onSelectRegion(null); setSelectedDistrict(null); }}
            className="absolute top-4 left-4 z-[1000] flex items-center gap-1.5 text-sm text-white/70 hover:text-white bg-aram-green-950/80 backdrop-blur-sm rounded-lg px-3 py-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Regions
          </button>
        )}

        <SriLankaMap
          selectedRegion={selectedRegion}
          onSelectRegion={onSelectRegion}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={setSelectedDistrict}
          mode={mapMode}
          partners={filteredPartners}
          insights={filteredInsights}
        />
      </div>

      {/* Side panel */}
      <div className="lg:w-2/5 bg-white border-l border-aram-warm-200 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
        <AnimatePresence mode="wait">
          {selectedRegion ? (
            <motion.div
              key={selectedRegion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="p-6"
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs text-aram-warm-400 mb-4 font-mono">
                <button onClick={() => { onSelectRegion(null); setSelectedDistrict(null); }} className="hover:text-aram-green-900">
                  Sri Lanka
                </button>
                <ChevronRight className="w-3 h-3" />
                <span className={selectedDistrict ? 'hover:text-aram-green-900 cursor-pointer' : 'text-aram-green-900'}
                      onClick={() => setSelectedDistrict(null)}>
                  {region.name}
                </span>
                {selectedDistrict && (
                  <>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-aram-green-900">{selectedDistrict}</span>
                  </>
                )}
              </div>

              <h2 className="font-display text-2xl font-bold text-aram-green-900 mb-2">
                {selectedDistrict || region.name}
              </h2>
              <p className="text-sm text-aram-warm-500 leading-relaxed mb-5">{region.description}</p>

              {/* Mode toggle */}
              <div className="mb-5">
                <MapModeToggle mode={mapMode} onChange={setMapMode} />
              </div>

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
                    <p className="text-sm text-aram-warm-400 py-4">No partners in this region yet.</p>
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
                      <p className="text-sm text-aram-warm-400 py-4">No insights for this selection.</p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6"
            >
              <div className="text-center py-6 mb-6">
                <Map className="w-10 h-10 text-aram-warm-300 mx-auto mb-3" />
                <p className="text-aram-warm-400 text-sm mb-1">Click a region on the map to explore.</p>
                <p className="text-aram-warm-300 text-xs">Coloured regions are where Aram operates.</p>
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
                  <p className="font-display text-xl font-bold text-aram-purple">{partners.length}</p>
                  <p className="text-[10px] text-aram-warm-400 font-mono uppercase">Partners</p>
                </div>
                <div className="rounded-lg bg-aram-warm-50 border border-aram-warm-200 p-3 text-center">
                  <p className="font-display text-xl font-bold text-aram-purple">{insights.length}</p>
                  <p className="text-[10px] text-aram-warm-400 font-mono uppercase">Insights</p>
                </div>
                <div className="rounded-lg bg-aram-warm-50 border border-aram-warm-200 p-3 text-center">
                  <p className="font-display text-xl font-bold text-aram-purple">{regions.length}</p>
                  <p className="text-[10px] text-aram-warm-400 font-mono uppercase">Regions</p>
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

  const sectorData = sectors.map((s) => ({
    ...s,
    insights: insights.filter((i) => i.sectors.includes(s.id)),
    partners: partners.filter((p) => p.sectors.includes(s.id)),
  }));

  const expanded = sectorData.find((s) => s.id === expandedSector);

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
              onClick={() => setExpandedSector(null)}
              className="flex items-center gap-1.5 text-sm text-aram-warm-400 hover:text-aram-green-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Sectors
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{expanded.icon}</span>
              <h2 className="font-display text-2xl font-bold text-aram-green-900">{expanded.name}</h2>
            </div>
            <p className="text-aram-warm-500 leading-relaxed mb-8 max-w-2xl">{expanded.description}</p>

            {expanded.partners.length > 0 && (
              <div className="mb-8">
                <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">Partners</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {expanded.partners.map((p) => (
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
  const macroInsights = insights.filter(
    (i) => i.type === 'article' || i.type === 'research' || i.sectors.length > 1
  );

  const filtered = searchQuery
    ? macroInsights.filter(
        (i) => i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : macroInsights;

  return (
    <div className="max-w-[720px] mx-auto px-6 py-10">
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

/* ─── Page (wrapped with Suspense for useSearchParams) */
function ResearchContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams?.get('view') || 'map';
  const initialRegion = searchParams?.get('region') || null;

  const [view, setView] = useState(initialView);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);

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
      <section className="pt-32 pb-10 md:pt-40 md:pb-14 bg-aram-warm-50">
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
  );
}

export default function ResearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-aram-warm-400">Loading...</div>}>
      <ResearchContent />
    </Suspense>
  );
}
