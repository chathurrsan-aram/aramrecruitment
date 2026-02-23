'use client';

import { useState, useMemo, useCallback, useEffect, Suspense } from 'react';
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
  Search, Map, LayoutGrid, ArrowLeft, X, ChevronRight,
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

/* ─── Apple-style Toggle (compact) ────────────────── */
function Toggle({ leftLabel, rightLabel, isRight, onChange, leftIcon: LeftIcon, rightIcon: RightIcon }) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onChange(false)}
        className={`flex items-center gap-1 text-[11px] font-medium transition-colors duration-200 ${
          !isRight ? 'text-aram-green-900' : 'text-aram-warm-300'
        }`}
      >
        {LeftIcon && <LeftIcon className="w-3 h-3" />}
        <span className="hidden sm:inline">{leftLabel}</span>
      </button>
      <button
        onClick={() => onChange(!isRight)}
        className={`relative w-9 h-[18px] rounded-full transition-colors duration-300 flex-shrink-0 ${
          isRight ? 'bg-aram-purple' : 'bg-aram-purple/40'
        }`}
        role="switch"
        aria-checked={isRight}
      >
        <span
          className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-300 ${
            isRight ? 'translate-x-[19px]' : 'translate-x-[2px]'
          }`}
        />
      </button>
      <button
        onClick={() => onChange(true)}
        className={`flex items-center gap-1 text-[11px] font-medium transition-colors duration-200 ${
          isRight ? 'text-aram-green-900' : 'text-aram-warm-300'
        }`}
      >
        {RightIcon && <RightIcon className="w-3 h-3" />}
        <span className="hidden sm:inline">{rightLabel}</span>
      </button>
    </div>
  );
}

/* ─── Full-page Detail View (slide-in) ───────────── */
function DetailView({ item, type, onBack, backLabel }) {
  if (type === 'insight') {
    const region = regions.find(r => r.id === item.region);
    return (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-0 top-[64px] z-40 bg-white overflow-y-auto"
      >
        <div className="max-w-3xl mx-auto px-6 py-10">
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-aram-warm-400 hover:text-aram-green-900 mb-8 transition-colors">
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
        className="fixed inset-0 top-[64px] z-40 bg-white overflow-y-auto"
      >
        <div className="max-w-3xl mx-auto px-6 py-10">
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-aram-warm-400 hover:text-aram-green-900 mb-8 transition-colors">
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

        {/* Content based on mode */}
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

/* ─── Card Grid ───────────────────────────────────── */
function CardGrid({ contentMode, searchQuery, onSelectDetail }) {
  const filteredInsights = useMemo(() => {
    if (!searchQuery) return insights;
    const q = searchQuery.toLowerCase();
    return insights.filter(i => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredPartners = useMemo(() => {
    if (!searchQuery) return partners;
    const q = searchQuery.toLowerCase();
    return partners.filter(p => p.name.toLowerCase().includes(q) || p.oneLiner.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }, [searchQuery]);

  if (contentMode === 'insights') {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-sm text-aram-warm-400 font-mono mb-6">{filteredInsights.length} insights</p>
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
        {filteredInsights.length === 0 && (
          <div className="text-center py-20"><p className="text-aram-warm-400">No insights found.</p></div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <p className="text-sm text-aram-warm-400 font-mono mb-6">{filteredPartners.length} partners</p>
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
      {filteredPartners.length === 0 && (
        <div className="text-center py-20"><p className="text-aram-warm-400">No partners found.</p></div>
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
  const [headerCollapsed, setHeaderCollapsed] = useState(false);

  useEffect(() => {
    const handler = () => setHeaderCollapsed(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Collapsing hero header ─────────────────── */}
      <div
        className={`bg-aram-warm-50 overflow-hidden transition-all duration-500 ease-in-out ${
          headerCollapsed ? 'max-h-0 opacity-0' : 'max-h-[400px] opacity-100'
        }`}
      >
        <div className="pt-28 pb-8 md:pt-36 md:pb-10">
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

      {/* ── Floating toggles (top-right) ──────────── */}
      <div className="sticky top-[64px] z-30 h-0">
        <div className="absolute top-3 right-4 flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-full border border-aram-warm-200 shadow-sm px-3.5 py-1.5">
          <Toggle
            leftLabel="Insights"
            rightLabel="Partners"
            leftIcon={Lightbulb}
            rightIcon={Users}
            isRight={isPartners}
            onChange={setIsPartners}
          />
          <div className="w-px h-4 bg-aram-warm-200" />
          <Toggle
            leftLabel="Map"
            rightLabel="Cards"
            leftIcon={Map}
            rightIcon={LayoutGrid}
            isRight={isCardView}
            onChange={handleViewToggle}
          />
          <div className="w-px h-4 bg-aram-warm-200" />
          <Link href="/partners" className="text-aram-warm-300 hover:text-aram-purple transition-colors" title="Partners Directory">
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Detail overlay ────────────────────────── */}
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
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {!isCardView ? (
            /* ── MAP VIEW ── */
            <motion.div
              key="map-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 64px)' }}>
                {/* Map */}
                <div
                  className="relative h-[500px] lg:h-full transition-all duration-500 ease-in-out"
                  style={{ flex: hasSidebar ? '1 1 50%' : '1 1 100%' }}
                >
                  <SriLankaMap
                    selectedRegion={selectedRegion}
                    onSelectRegion={setSelectedRegion}
                    selectedDistrict={selectedDistrict}
                    onSelectDistrict={handleDistrictClick}
                  />

                  {/* "Click to explore" overlay */}
                  {!hasSidebar && (
                    <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none">
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

                {/* Sidebar (slides in) */}
                <AnimatePresence>
                  {hasSidebar && (
                    <motion.div
                      key="sidebar"
                      initial={{ flex: '0 0 0%', opacity: 0 }}
                      animate={{ flex: '0 0 50%', opacity: 1 }}
                      exit={{ flex: '0 0 0%', opacity: 0 }}
                      transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                      className="bg-white border-l border-aram-warm-200 overflow-y-auto overflow-x-hidden hidden lg:block"
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
