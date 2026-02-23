'use client';

import { useState, useMemo, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
  Users, Lightbulb, MapPin, ExternalLink,
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

/* ─── Apple-style iOS Toggle ──────────────────────── */
function Toggle({ leftLabel, rightLabel, isRight, onChange, leftIcon: LeftIcon, rightIcon: RightIcon }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(false)}
        className={`flex items-center gap-1 text-xs font-medium transition-colors ${
          !isRight ? 'text-aram-green-900' : 'text-aram-warm-300 hover:text-aram-warm-400'
        }`}
      >
        {LeftIcon && <LeftIcon className="w-3.5 h-3.5" />}
        <span className="hidden sm:inline">{leftLabel}</span>
      </button>
      <button
        onClick={() => onChange(!isRight)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
          isRight ? 'bg-aram-purple' : 'bg-aram-green-700'
        }`}
        role="switch"
        aria-checked={isRight}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
            isRight ? 'translate-x-[22px]' : 'translate-x-1'
          }`}
        />
      </button>
      <button
        onClick={() => onChange(true)}
        className={`flex items-center gap-1 text-xs font-medium transition-colors ${
          isRight ? 'text-aram-green-900' : 'text-aram-warm-300 hover:text-aram-warm-400'
        }`}
      >
        {RightIcon && <RightIcon className="w-3.5 h-3.5" />}
        <span className="hidden sm:inline">{rightLabel}</span>
      </button>
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
function MapView({ selectedRegion, onSelectRegion, searchQuery, contentMode }) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const region = regions.find((r) => r.id === selectedRegion);
  const districtProject = selectedDistrict ? districtProjects[selectedDistrict] : null;
  const districtName = selectedDistrict ? DISTRICT_NAMES[selectedDistrict] : null;

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
      <div className="lg:w-3/5 relative h-[450px] lg:h-auto lg:min-h-0">
        <SriLankaMap
          selectedRegion={selectedRegion}
          onSelectRegion={onSelectRegion}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={setSelectedDistrict}
        />
      </div>

      {/* Side panel */}
      <div className="lg:w-2/5 bg-white border-l border-aram-warm-200 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
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
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs text-aram-warm-400 mb-4 font-mono">
                <button onClick={() => { onSelectRegion(null); setSelectedDistrict(null); }} className="hover:text-aram-green-900">
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

              {/* Region content based on contentMode */}
              {region && contentMode === 'partners' && filteredPartners.length > 0 && (
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
              {region && contentMode === 'insights' && filteredInsights.length > 0 && (
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
            /* District selected but no project data (inactive district) */
            <motion.div
              key={`district-inactive-${selectedDistrict}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="p-6"
            >
              <div className="flex items-center gap-1.5 text-xs text-aram-warm-400 mb-4 font-mono">
                <button onClick={() => { onSelectRegion(null); setSelectedDistrict(null); }} className="hover:text-aram-green-900">
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
            /* Region selected → show region details */
            <motion.div
              key={selectedRegion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="p-6"
            >
              <div className="flex items-center gap-1.5 text-xs text-aram-warm-400 mb-4 font-mono">
                <button onClick={() => { onSelectRegion(null); setSelectedDistrict(null); }} className="hover:text-aram-green-900">
                  Sri Lanka
                </button>
                <ChevronRight className="w-3 h-3" />
                <span className="text-aram-green-900">{region?.name}</span>
              </div>

              <h2 className="font-display text-2xl font-bold text-aram-green-900 mb-2">{region?.name}</h2>
              <p className="text-sm text-aram-warm-500 leading-relaxed mb-5">{region?.description}</p>

              {contentMode === 'partners' ? (
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

              {contentMode === 'partners' ? (
                <div className="rounded-xl border border-aram-warm-200 bg-aram-warm-50 p-5 mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-aram-purple" />
                    <h3 className="font-body text-sm font-semibold text-aram-green-900">Partners Overview</h3>
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
              ) : (
                <div className="rounded-xl border border-aram-warm-200 bg-aram-warm-50 p-5 mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-aram-purple" />
                    <h3 className="font-body text-sm font-semibold text-aram-green-900">Latest Insights</h3>
                  </div>
                  <div className="space-y-2">
                    {insights.slice(0, 5).map((i) => (
                      <div key={i.id} className="flex items-center gap-2 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-aram-purple flex-shrink-0" />
                        <span className="text-aram-warm-500 truncate">{i.title}</span>
                      </div>
                    ))}
                    {insights.length > 5 && (
                      <p className="text-[10px] text-aram-warm-300 pt-1">+ {insights.length - 5} more insights</p>
                    )}
                  </div>
                </div>
              )}

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

/* ─── CARD VIEW (Macro card + Sector cards) ────────── */
function CardView({ searchQuery, contentMode }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const macroInsights = useMemo(() => {
    let filtered = insights.filter(
      (i) => i.type === 'article' || i.type === 'research' || i.sectors.length > 1
    );
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((i) => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q));
    }
    return filtered;
  }, [searchQuery]);

  const sectorData = useMemo(() => sectors.map((s) => ({
    ...s,
    insights: insights.filter((i) => i.sectors.includes(s.id)),
    partners: partners.filter((p) => p.sectors.includes(s.id)),
  })), []);

  const expanded = expandedItem !== 'macro' ? sectorData.find((s) => s.id === expandedItem) : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <AnimatePresence mode="wait">
        {expandedItem === 'macro' ? (
          /* ── Macro expanded ─────────────────────── */
          <motion.div
            key="macro-expanded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setExpandedItem(null)}
              className="flex items-center gap-1.5 text-sm text-aram-warm-400 hover:text-aram-green-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Cards
            </button>

            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-aram-purple" />
              <h2 className="font-display text-2xl font-bold text-aram-green-900">Cross-Sector Research & Analysis</h2>
            </div>
            <p className="text-aram-warm-500 leading-relaxed mb-8 max-w-2xl">
              Macro-level insights spanning multiple sectors — articles, research findings, and cross-cutting themes from our field work.
            </p>

            {contentMode === 'insights' ? (
              <StaggerContainer className="space-y-6" staggerDelay={0.08}>
                {macroInsights.map((insight) => {
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
            ) : (
              <div>
                <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-4">
                  All Partners ({partners.length})
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {partners.map((p) => (
                    <PartnerCard key={p.id} partner={p} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : expandedItem && expanded ? (
          /* ── Sector expanded ────────────────────── */
          <motion.div
            key={expanded.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setExpandedItem(null)}
              className="flex items-center gap-1.5 text-sm text-aram-warm-400 hover:text-aram-green-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Cards
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{expanded.icon}</span>
              <h2 className="font-display text-2xl font-bold text-aram-green-900">{expanded.name}</h2>
            </div>
            <p className="text-aram-warm-500 leading-relaxed mb-8 max-w-2xl">{expanded.description}</p>

            {contentMode === 'insights' ? (
              <>
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
              </>
            ) : (
              <>
                <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
                  Partners ({expanded.partners.length})
                </h3>
                {expanded.partners.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {expanded.partners.map((p) => (
                      <PartnerCard key={p.id} partner={p} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-aram-warm-400 py-4">No partners in this sector yet.</p>
                )}

                {expanded.insights.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
                      Related Insights ({expanded.insights.length})
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {expanded.insights.map((i) => (
                        <InsightCard key={i.id} insight={i} compact />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        ) : (
          /* ── Card grid ──────────────────────────── */
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.08}>
              {/* Macro overview card (first) */}
              <StaggerItem>
                <div
                  className="rounded-xl border-2 border-aram-purple/20 bg-gradient-to-br from-aram-purple-50 to-white p-5 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-aram-purple/40"
                  onClick={() => setExpandedItem('macro')}
                >
                  <Globe className="w-7 h-7 text-aram-purple mb-2" />
                  <h3 className="font-body text-lg font-semibold text-aram-green-900 mt-2 mb-1">Macro Overview</h3>
                  <p className="text-xs text-aram-warm-400 font-mono">
                    {contentMode === 'insights'
                      ? `${macroInsights.length} cross-sector insights`
                      : `${partners.length} partners across all sectors`
                    }
                  </p>
                </div>
              </StaggerItem>

              {/* Sector cards */}
              {sectorData.map((s) => (
                <StaggerItem key={s.id}>
                  <div
                    className="rounded-xl border border-aram-warm-200 bg-white p-5 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    onClick={() => setExpandedItem(s.id)}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `var(--color-sector-${s.color})`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
                  >
                    <span className="text-2xl">{s.icon}</span>
                    <h3 className="font-body text-lg font-semibold text-aram-green-900 mt-2 mb-1">{s.name}</h3>
                    <p className="text-xs text-aram-warm-400 font-mono">
                      {contentMode === 'insights'
                        ? `${s.insights.length} insights · ${s.partners.length} partners`
                        : `${s.partners.length} partners · ${s.insights.length} insights`
                      }
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

/* ─── Page (wrapped with Suspense for useSearchParams) */
function ResearchContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams?.get('view') || 'map';
  const initialRegion = searchParams?.get('region') || null;

  const [isCardView, setIsCardView] = useState(initialView === 'cards');
  const [isPartners, setIsPartners] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);

  const handleViewToggle = useCallback((val) => {
    setIsCardView(val);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('view', val ? 'cards' : 'map');
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

  const contentMode = isPartners ? 'partners' : 'insights';

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

      {/* ── Sticky toggle bar ─────────────────────── */}
      <div className="sticky top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-aram-warm-200">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <Link
            href="/partners"
            className="flex items-center gap-1.5 text-xs font-medium text-aram-warm-400 hover:text-aram-purple transition-colors"
          >
            <Users className="w-3.5 h-3.5" />
            Partners Directory
            <ExternalLink className="w-3 h-3" />
          </Link>

          <div className="flex items-center gap-6">
            <Toggle
              leftLabel="Insights"
              rightLabel="Partners"
              leftIcon={Lightbulb}
              rightIcon={Users}
              isRight={isPartners}
              onChange={setIsPartners}
            />
            <div className="w-px h-5 bg-aram-warm-200" />
            <Toggle
              leftLabel="Map"
              rightLabel="Cards"
              leftIcon={Map}
              rightIcon={LayoutGrid}
              isRight={isCardView}
              onChange={handleViewToggle}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isCardView ? (
          <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MapView
              selectedRegion={selectedRegion}
              onSelectRegion={handleSelectRegion}
              searchQuery={searchQuery}
              contentMode={contentMode}
            />
          </motion.div>
        ) : (
          <motion.div key="cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CardView searchQuery={searchQuery} contentMode={contentMode} />
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
