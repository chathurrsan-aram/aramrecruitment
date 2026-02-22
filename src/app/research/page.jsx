'use client';

import { useState, useMemo, useCallback, Suspense } from 'react';
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
import { Search, Map, LayoutGrid, Globe, ArrowLeft, X, ChevronRight } from 'lucide-react';

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

/* ─── MAP VIEW ─────────────────────────────────────── */
function MapView({ selectedRegion, onSelectRegion, searchQuery }) {
  const [selectedSubRegion, setSelectedSubRegion] = useState(null);

  const region = regions.find((r) => r.id === selectedRegion);

  const filteredInsights = useMemo(() => {
    let filtered = insights;
    if (selectedRegion) filtered = filtered.filter((i) => i.region === selectedRegion);
    if (selectedSubRegion) filtered = filtered.filter((i) => i.subRegion === selectedSubRegion);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((i) => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q));
    }
    return filtered;
  }, [selectedRegion, selectedSubRegion, searchQuery]);

  const filteredPartners = useMemo(() => {
    let filtered = partners;
    if (selectedRegion) filtered = filtered.filter((p) => p.region === selectedRegion);
    if (selectedSubRegion) filtered = filtered.filter((p) => p.subRegions.includes(selectedSubRegion));
    return filtered;
  }, [selectedRegion, selectedSubRegion]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[70vh]">
      {/* Map area */}
      <div className="lg:w-1/2 relative bg-aram-green-900 flex items-center justify-center p-8 min-h-[400px]">
        {selectedRegion && (
          <button
            onClick={() => { onSelectRegion(null); setSelectedSubRegion(null); }}
            className="absolute top-4 left-4 z-20 flex items-center gap-1.5 text-sm text-white/70 hover:text-white bg-white/10 rounded-lg px-3 py-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Regions
          </button>
        )}

        {/* SVG Sri Lanka map */}
        <svg viewBox="0 0 300 450" className="w-full max-w-[280px]" style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))' }}>
          {/* Simplified Sri Lanka outline */}
          <path
            d="M150 20 C160 20 180 40 190 60 C200 80 210 100 215 130 C220 160 225 190 220 220 C218 240 215 260 210 280 C205 300 195 320 185 340 C175 360 165 375 155 390 C150 400 145 410 140 415 C135 410 130 400 125 390 C115 375 105 360 95 340 C85 320 80 300 78 280 C75 260 73 240 72 220 C70 190 75 160 80 130 C85 100 95 80 105 60 C115 40 135 20 150 20Z"
            fill="rgba(45,106,79,0.15)"
            stroke="rgba(45,106,79,0.3)"
            strokeWidth="1"
          />

          {/* Region zones */}
          {regions.map((r) => {
            const isSelected = selectedRegion === r.id;
            const zonePositions = {
              'hill-country': { cx: 145, cy: 260, rx: 35, ry: 30 },
              eastern: { cx: 200, cy: 200, rx: 30, ry: 50 },
              northern: { cx: 140, cy: 70, rx: 40, ry: 45 },
              western: { cx: 100, cy: 280, rx: 25, ry: 25 },
            };
            const pos = zonePositions[r.id];
            if (!pos) return null;

            return (
              <g key={r.id}>
                <motion.ellipse
                  cx={pos.cx} cy={pos.cy} rx={pos.rx} ry={pos.ry}
                  fill={isSelected ? 'rgba(109,74,158,0.35)' : 'rgba(45,106,79,0.25)'}
                  stroke={isSelected ? '#6D4A9E' : 'rgba(45,106,79,0.4)'}
                  strokeWidth={isSelected ? 2 : 1}
                  className="cursor-pointer"
                  onClick={() => { onSelectRegion(r.id); setSelectedSubRegion(null); }}
                  whileHover={{ fill: 'rgba(109,74,158,0.25)' }}
                  animate={isSelected ? { scale: [1, 1.05, 1] } : {}}
                  transition={isSelected ? { duration: 2, repeat: Infinity } : { duration: 0.2 }}
                />
                <text
                  x={pos.cx} y={pos.cy + 2}
                  textAnchor="middle"
                  className="fill-white text-[9px] font-semibold pointer-events-none select-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {r.name}
                </text>
              </g>
            );
          })}

          {/* Sub-region markers */}
          {(selectedRegion ? (region?.subRegions || []) : []).map((sr) => {
            const markerPositions = {
              maskeliya: { x: 130, y: 250 },
              ohiya: { x: 160, y: 265 },
              batticaloa: { x: 210, y: 220 },
              trincomalee: { x: 195, y: 175 },
              muthur: { x: 195, y: 190 },
              jaffna: { x: 130, y: 40 },
              vavuniya: { x: 145, y: 90 },
              mullaitivu: { x: 155, y: 60 },
              colombo: { x: 95, y: 280 },
            };
            const pos = markerPositions[sr.id];
            if (!pos) return null;
            const isActive = selectedSubRegion === sr.id;

            return (
              <g key={sr.id} className="cursor-pointer" onClick={() => setSelectedSubRegion(isActive ? null : sr.id)}>
                <motion.circle
                  cx={pos.x} cy={pos.y} r={isActive ? 6 : 4}
                  fill="#6D4A9E"
                  stroke="white"
                  strokeWidth={1.5}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                />
                <text
                  x={pos.x} y={pos.y - 10}
                  textAnchor="middle"
                  className="fill-white/80 text-[7px] pointer-events-none"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {sr.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Side panel */}
      <AnimatePresence mode="wait">
        {selectedRegion ? (
          <motion.div
            key={selectedRegion}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3 }}
            className="lg:w-1/2 bg-white border-l border-aram-warm-200 p-6 overflow-y-auto max-h-[70vh]"
          >
            <div className="flex items-center gap-1.5 text-xs text-aram-warm-400 mb-4 font-mono">
              <button onClick={() => { onSelectRegion(null); setSelectedSubRegion(null); }} className="hover:text-aram-green-900">
                Sri Lanka
              </button>
              <ChevronRight className="w-3 h-3" />
              <span className={selectedSubRegion ? 'hover:text-aram-green-900 cursor-pointer' : 'text-aram-green-900'}
                    onClick={() => setSelectedSubRegion(null)}>
                {region.name}
              </span>
              {selectedSubRegion && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-aram-green-900">
                    {region.subRegions.find((s) => s.id === selectedSubRegion)?.name}
                  </span>
                </>
              )}
            </div>

            <h2 className="font-display text-2xl font-bold text-aram-green-900 mb-2">
              {selectedSubRegion ? region.subRegions.find((s) => s.id === selectedSubRegion)?.name : region.name}
            </h2>
            <p className="text-sm text-aram-warm-500 leading-relaxed mb-6">{region.description}</p>

            {filteredPartners.length > 0 && (
              <div className="mb-6">
                <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">Partners</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {filteredPartners.map((p) => (
                    <PartnerCard key={p.id} partner={p} />
                  ))}
                </div>
              </div>
            )}

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
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:w-1/2 bg-aram-warm-50 flex items-center justify-center p-8"
          >
            <div className="text-center max-w-xs">
              <Map className="w-10 h-10 text-aram-warm-300 mx-auto mb-4" />
              <p className="text-aram-warm-400 text-sm">Click a region on the map to explore insights and partners.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
