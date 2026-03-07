'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem, Counter } from '@/components/ui/motion';
import { ArrowRight, ArrowLeft, Briefcase, TrendingUp, BookOpen, ChevronDown, X, Search, Filter, DollarSign, PieChart, Map, LayoutGrid, Star, Clock, AlertTriangle, Users, BarChart3, Zap } from 'lucide-react';
import { useFounderModal } from '@/components/ventures/founder-modal';
import { videos } from '@/lib/cloudinary';
import { portfolioCompanies, emergingVentures, ventureInsights, ventureSectors, ventureRegions, investorPositions, getVenturesByDistrict } from '@/data/venturesData';
import { insightPages } from '@/data/insightPages';
import { ViewToggle } from '@/components/ventures/portal-shell';
import { PortfolioCard, EmergingCard, VentureInsightCard } from '@/components/ventures/venture-card';
import SlidePanel from '@/components/ventures/slide-panel';
import dynamic from 'next/dynamic';

const SriLankaMap = dynamic(() => import('@/components/ui/sri-lanka-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-[#6D4A9E] rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Loading map...</p>
      </div>
    </div>
  ),
});

/* ─── Venture Opportunity Popout ─────────────────────────────────────────── */
function OpportunityPopout({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-4 top-[6%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[640px] max-h-[88vh] overflow-y-auto z-[60] rounded-2xl bg-[#0D0D14] border border-[#2A2A40]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <p className="font-mono text-xs tracking-[0.25em] text-[#6D4A9E] uppercase mb-4">
                The Opportunity
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Sri Lanka&apos;s diaspora capital moment
              </h2>
              <p className="text-[#A0A0B8] leading-relaxed mb-8">
                The UK Sri Lankan Tamil diaspora represents one of the most economically engaged diasporas in Europe, yet capital flows remain almost entirely informal. Aram Ventures is building the infrastructure to channel diaspora investment into vetted, high-potential ventures across Tamil Sri Lanka.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: '500K+', label: 'Sri Lankan diaspora in the UK' },
                  { value: '£6bn', label: 'Annual remittances to Sri Lanka' },
                  { value: '£10B', label: 'FDI opportunity pipeline' },
                  { value: '90%', label: 'SMEs with no strategic advisory' },
                ].map(stat => (
                  <div key={stat.label} className="bg-[#13131F] border border-[#2A2A40] rounded-xl p-4 text-center">
                    <p className="font-display text-2xl font-bold text-[#9B72CF] mb-1">{stat.value}</p>
                    <p className="text-[#7A7A9A] text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Why now */}
              <h3 className="font-display text-lg font-semibold text-white mb-4">Why now?</h3>
              <ul className="space-y-3 mb-8">
                {[
                  'Post-war land resettlement complete: agricultural and commercial recovery underway',
                  'IMF recovery programme prioritising SME development and foreign investment',
                  'Diaspora trust in formal investment channels at historic low, creating space for community-backed platforms',
                  'First generation of diaspora-founded ventures reaching investable stage',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#A0A0B8]">
                    <span className="text-[#6D4A9E] mt-0.5 flex-shrink-0 font-bold">{i + 1}</span>
                    {point}
                  </li>
                ))}
              </ul>

              {/* What's Inside */}
              <h3 className="font-display text-lg font-semibold text-white mb-4">What&apos;s inside the platform</h3>
              <div className="space-y-3 mb-6">
                {[
                  { icon: Briefcase, title: 'Your Portfolio', desc: 'Track active ventures: financials, thesis, growth plans, founder profiles.' },
                  { icon: TrendingUp, title: 'Opportunities', desc: 'Pre-investment pipeline mapped across Sri Lanka, sector by sector, district by district.' },
                  { icon: BookOpen, title: 'Insights', desc: "Aram's proprietary research layer: district-level intelligence for informed capital." },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-[#13131F] border border-[#2A2A40]">
                    <div className="w-10 h-10 rounded-lg bg-[#6D4A9E]/15 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#9B72CF]" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm mb-0.5">{item.title}</p>
                      <p className="text-xs text-[#7A7A9A]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-[#2A2A40] mb-6" />
              <p className="text-center text-sm text-[#7A7A9A]">
                Scroll down to explore the demo platform.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Hero with Video Background ─────────────────────────────────────────── */
function VenturesHero({ onOpenOpportunity }) {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, -60]);
  const { open: openFounderModal } = useFounderModal();

  useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);

  const scrollToDemo = (e) => {
    e.preventDefault();
    document.getElementById('platform-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay loop muted playsInline
          poster="/images/Community.png"
        >
          <source src={videos.researchHero} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0D0D14]/90" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#6D4A9E]/20"
          style={{
            width: 4 + i * 3,
            height: 4 + i * 3,
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        />
      ))}

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={loaded ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img
            src="/images/Untitled design-6.png"
            alt="True Potential"
            className="h-16 md:h-24"
            style={{ filter: 'invert(1)', mixBlendMode: 'screen', background: 'transparent' }}
          />
        </motion.div>
        <motion.p
          className="font-mono text-[10px] tracking-[0.25em] text-[#9B72CF] uppercase mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={loaded ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Aram Initiative · Ventures
        </motion.p>
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold text-white mb-5 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          The venture
          <span className="block text-white/80">intelligence platform</span>
        </motion.h1>
        <motion.p
          className="font-body text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          The Aram Initiative has spent four years researching Tamil Sri Lanka from the ground up. Aram Ventures is where that intelligence becomes investable.
        </motion.p>
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-row gap-3 justify-center">
            <button
              onClick={onOpenOpportunity}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border border-white text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:bg-white/10 transition-all min-h-[48px]"
            >
              The Opportunity
            </button>
            <button
              onClick={openFounderModal}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#C9A84C] text-[#C9A84C] rounded-xl font-semibold hover:bg-[#C9A84C]/10 hover:-translate-y-0.5 transition-all min-h-[48px] bg-transparent"
            >
              + True Potential
            </button>
          </div>
          <button
            onClick={scrollToDemo}
            className="mt-6 inline-flex items-center justify-center gap-1.5 px-8 py-3.5 bg-[#0F172A] text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:bg-[#1E293B] transition-all min-h-[48px] cursor-pointer border-none"
          >
            Explore the demo <ChevronDown className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
          <div className="w-1.5 h-1.5 rounded-full bg-[#6D4A9E] absolute left-1/2 -translate-x-1/2 animate-bounce-dot" />
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works Onboarding Strip ─────────────────────────────────────── */
function HowItWorks() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <p className="font-mono text-[10px] tracking-[0.25em] text-[#6D4A9E] uppercase text-center mb-6 font-medium">
          How it works
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Discover', desc: 'Browse vetted ventures across Tamil Sri Lanka, filtered by sector and district.' },
            { step: '02', title: 'Research', desc: 'Access founder profiles, financials, growth plans, and Aram intelligence reports.' },
            { step: '03', title: 'Connect', desc: 'Express interest directly. Aram facilitates introductions and due diligence.' },
            { step: '04', title: 'Invest', desc: 'Deploy capital with ongoing portfolio tracking and community-backed support.' },
          ].map(item => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 rounded-full bg-[#6D4A9E]/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#6D4A9E] font-mono text-sm font-bold">{item.step}</span>
              </div>
              <h4 className="font-display font-semibold text-gray-900 mb-1 text-sm md:text-base">{item.title}</h4>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── District highlights for map views ──────────────────────────────────── */
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

/* ─── Full Inline Portal ─────────────────────────────────────────────────── */
function InlineInsightDetail({ insight, onBack }) {
  const page = insightPages.find(p => p.slug === insight.insightPageSlug);
  if (!page) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <Reveal>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-[#9B72CF] hover:text-white transition-colors mb-6 bg-[#6D4A9E]/10 px-4 py-2 rounded-lg group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Insights
        </button>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {page.sectors.map(s => {
            const sector = ventureSectors.find(sec => sec.id === s);
            if (!sector) return null;
            return (
              <span key={s} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium"
                style={{ backgroundColor: `${sector.color}15`, color: sector.color, border: `1px solid ${sector.color}30` }}>
                {sector.name}
              </span>
            );
          })}
          <span className="text-[#7A7A9A] text-xs font-mono">{page.region}</span>
          <span className="text-[#2A2D3E]">|</span>
          <span className="flex items-center gap-1 text-[#7A7A9A] text-xs">
            <Clock className="w-3 h-3" /> {page.readTime} min read
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-6 tracking-tight">
          {page.topLine}
        </h1>
      </Reveal>

      <div className="h-px bg-gradient-to-r from-[#6D4A9E]/40 via-[#6D4A9E]/10 to-transparent mb-8" />

      <Reveal delay={0.15}>
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#9B72CF] mb-3 flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5" /> Observation
          </h2>
          <p className="text-[15px] leading-relaxed text-[#A0A0B8]">{page.observation}</p>
        </section>
      </Reveal>

      <div className="h-px bg-[#2A2D3E] mb-8" />

      <Reveal delay={0.2}>
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#9B72CF] mb-4 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" /> Key Metrics
          </h2>
          <StaggerContainer staggerDelay={0.07} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {page.keyMetrics.map((metric, i) => (
              <StaggerItem key={i}>
                <div className="bg-[#1E2130] border border-[#2A2D3E] rounded-lg p-4 hover:border-[#6D4A9E]/30 transition-colors">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A] mb-1">{metric.label}</p>
                  <p className="text-xl font-bold text-white font-mono mb-1">{metric.value}</p>
                  <p className="text-xs text-[#A0A0B8] leading-snug">{metric.context}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </Reveal>

      <div className="h-px bg-[#2A2D3E] mb-8" />

      <Reveal delay={0.25}>
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#9B72CF] mb-4 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> Why Now
          </h2>
          <div className="space-y-3">
            {page.whyNow.map((item, i) => (
              <div key={i} className="flex gap-3 bg-[#1E2130] border border-[#2A2D3E] rounded-lg p-4">
                <div className="flex-shrink-0 mt-0.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#6D4A9E]/10 text-[#9B72CF] border border-[#6D4A9E]/15">
                    {item.catalyst}
                  </span>
                </div>
                <p className="text-sm text-[#A0A0B8] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <div className="h-px bg-[#2A2D3E] mb-8" />

      <Reveal delay={0.3}>
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#9B72CF] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5" /> Investment Parameters
          </h2>
          <div className="bg-[#1E2130] border border-[#2A2D3E] rounded-lg p-5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A] mb-0.5">Market Opportunity</p>
                <p className="text-base font-semibold text-white">{page.investmentParameters.marketOpportunity}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A] mb-0.5">Timeline</p>
                <p className="text-base font-semibold text-white">{page.investmentParameters.timeline}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A] mb-0.5">Ticket Size</p>
                <p className="text-sm text-white">
                  <span className="text-[#9B72CF]">Angel/HNW:</span> {page.investmentParameters.ticketSize.angel}
                  {page.investmentParameters.ticketSize.institutional && (
                    <span className="ml-3"><span className="text-[#9B72CF]">Institutional:</span> {page.investmentParameters.ticketSize.institutional}</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A] mb-0.5">Risk Level</p>
                <p className="text-base font-semibold">
                  <span className={
                    page.investmentParameters.riskLevel === 'High' ? 'text-[#C85C5C]' :
                    page.investmentParameters.riskLevel === 'Very High' ? 'text-red-500' :
                    'text-[#C9A84C]'
                  }>
                    {page.investmentParameters.riskLevel}
                  </span>
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-[#2A2D3E]">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A] mb-1">Key Risk</p>
              <p className="text-sm text-[#A0A0B8] leading-relaxed">{page.investmentParameters.keyRisk}</p>
            </div>
          </div>
        </section>
      </Reveal>

      <div className="h-px bg-[#2A2D3E] mb-8" />

      <Reveal delay={0.35}>
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#9B72CF] mb-4 flex items-center gap-2">
            <Users className="w-3.5 h-3.5" /> Named Players
          </h2>
          <StaggerContainer staggerDelay={0.06} className="space-y-2">
            {page.namedPlayers.map((player, i) => (
              <StaggerItem key={i}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 bg-[#1E2130] border border-[#2A2D3E] rounded-lg p-4 hover:border-[#6D4A9E]/20 transition-colors">
                  <div className="flex-shrink-0">
                    <p className="text-sm font-semibold text-white">{player.name}</p>
                  </div>
                  <p className="text-xs text-[#A0A0B8] leading-relaxed sm:border-l sm:border-[#2A2D3E] sm:pl-3">
                    {player.description} - <span className="text-white/80">{player.relevance}</span>
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </Reveal>
    </div>
  );
}

function InlinePortal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [isCards, setIsCards] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState(null);
  const [regionFilter, setRegionFilter] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const tabs = [
    { id: 'portfolio', label: 'Your Portfolio', icon: Briefcase },
    { id: 'opportunities', label: 'Opportunities', icon: TrendingUp },
    { id: 'insights', label: 'Insights', icon: BookOpen },
  ];

  const resetFilters = () => {
    setSearchQuery('');
    setSectorFilter(null);
    setRegionFilter('all');
    setSelectedItem(null);
    setSelectedInsight(null);
    setSelectedDistrict(null);
    setSelectedRegion(null);
    setIsCards(true);
  };

  const filteredPortfolio = useMemo(() => {
    let result = portfolioCompanies;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q) || c.region.toLowerCase().includes(q));
    }
    if (sectorFilter) result = result.filter(c => c.sector === sectorFilter);
    return result;
  }, [searchQuery, sectorFilter]);

  const filteredEmerging = useMemo(() => {
    let result = emergingVentures;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(v => v.name.toLowerCase().includes(q) || v.tagline.toLowerCase().includes(q) || v.region.toLowerCase().includes(q));
    }
    if (sectorFilter) result = result.filter(v => v.sector === sectorFilter);
    return result;
  }, [searchQuery, sectorFilter]);

  const featuredInsight = ventureInsights.find(i => i.featured);
  const sectorInsights = ventureInsights.filter(i => !i.featured);
  const filteredInsights = useMemo(() => {
    let result = sectorInsights;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(i => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q));
    }
    if (sectorFilter) result = result.filter(i => i.sectors.includes(sectorFilter));
    if (regionFilter !== 'all') result = result.filter(i => i.region === regionFilter);
    return result;
  }, [searchQuery, sectorFilter, regionFilter, sectorInsights]);
  const showFeatured = !searchQuery && !sectorFilter && regionFilter === 'all';

  const activeSectors = activeTab === 'portfolio'
    ? ventureSectors.filter(s => portfolioCompanies.some(c => c.sector === s.id))
    : activeTab === 'opportunities'
      ? ventureSectors.filter(s => emergingVentures.some(v => v.sector === s.id))
      : ventureSectors.filter(s => sectorInsights.some(i => i.sectors.includes(s.id)));

  const handleDistrictSelect = (code) => {
    setSelectedDistrict(code);
    if (code) {
      const data = getVenturesByDistrict(code);
      const items = activeTab === 'portfolio' ? data.portfolio : data.emerging;
      setSelectedItem(items.length > 0 ? items[0] : null);
    } else {
      setSelectedItem(null);
    }
  };

  const truePotentialCount = portfolioCompanies.filter(c => c.truePotential).length;

  return (
    <section id="platform-preview" className="bg-[#13151F]">
      {/* ── Portal Navbar ─────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-[#1B3A4B] border-b border-[#1B3A4B] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/Aram_Ventures.png"
              alt="Aram Ventures"
              className="h-11"
              style={{ filter: 'invert(1)', mixBlendMode: 'screen', background: 'transparent' }}
            />
          </div>
          <div className="flex bg-[#0F2A38] rounded-xl p-1 max-w-md">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); resetFilters(); }}
                  className={`relative z-10 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive ? 'bg-[#6D4A9E] text-white shadow-sm' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
          <span className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-[10px] font-mono tracking-wider uppercase">
            Demo
          </span>
        </div>
      </div>

      {/* ── Filter Bar ────────────────────────────────────────── */}
      <div className="bg-[#181B24] border-b border-[#2A2D3E]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A9A]" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
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
                    ? 'border-[#6D4A9E] text-[#9B72CF] bg-[#6D4A9E]/10'
                    : 'border-[#2A2D3E] text-[#7A7A9A] hover:border-[#6D4A9E]/50'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
          {activeTab === 'insights' && (
            <div className="relative ml-auto">
              <select
                value={regionFilter}
                onChange={e => setRegionFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-lg bg-[#13151F] border border-[#2A2D3E] text-sm text-white focus:outline-none focus:border-[#6D4A9E] transition-colors"
              >
                {ventureRegions.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A9A] pointer-events-none" />
            </div>
          )}
          {activeTab !== 'insights' && (
            <div className="ml-auto">
              <ViewToggle isCards={isCards} onChange={setIsCards} />
            </div>
          )}
        </div>
      </div>

      {/* ── Portfolio Summary Bar ─────────────────────────────── */}
      {activeTab === 'portfolio' && (
        <div className="bg-gradient-to-r from-[#181B24] via-[#1A1D2A] to-[#181B24] border-b border-[#2A2D3E]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#1E2130] rounded-xl p-4 border border-[#2A2D3E] border-l-[3px] border-l-[#6D4A9E]">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4 text-[#9B72CF]" />
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A]">Active Ventures</p>
                </div>
                <p className="text-2xl font-bold text-white">{portfolioCompanies.length}</p>
              </div>
              <div className="bg-[#1E2130] rounded-xl p-4 border border-[#2A2D3E] border-l-[3px] border-l-[#6D4A9E]">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-[#9B72CF]" />
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A]">Total Seeking</p>
                </div>
                <p className="text-2xl font-bold text-white">£{(portfolioCompanies.reduce((sum, c) => sum + c.seeking, 0) / 1000).toFixed(0)}k</p>
              </div>
              <div className="bg-[#1E2130] rounded-xl p-4 border border-[#2A2D3E] border-l-[3px] border-l-[#C9A84C]">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-[#C9A84C]" />
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A]">True Potential Backed</p>
                </div>
                <p className="text-2xl font-bold text-[#C9A84C]">{truePotentialCount}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab Content ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto" style={{ minHeight: '600px' }}>
        {/* ── Portfolio Tab ──────────────────────────────────── */}
        {activeTab === 'portfolio' && (
          isCards ? (
            <div className="p-4 md:p-6">
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPortfolio.map(company => (
                  <StaggerItem key={company.id}>
                    <PortfolioCard company={company} onClick={setSelectedItem} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
              {filteredPortfolio.length === 0 && (
                <div className="text-center py-20"><p className="text-[#7A7A9A]">No ventures match your filters</p></div>
              )}
            </div>
          ) : (
            <div className="h-[600px] relative bg-[#F5F5F0]">
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
          )
        )}

        {/* ── Opportunities Tab ─────────────────────────────── */}
        {activeTab === 'opportunities' && (
          isCards ? (
            <div className="p-4 md:p-6">
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEmerging.map(venture => (
                  <StaggerItem key={venture.id}>
                    <EmergingCard venture={venture} onClick={setSelectedItem} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
              {filteredEmerging.length === 0 && (
                <div className="text-center py-20"><p className="text-[#7A7A9A]">No opportunities match your filters</p></div>
              )}
            </div>
          ) : (
            <div className="h-[600px] relative bg-[#F5F5F0]">
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
          )
        )}

        {/* ── Insights Tab ──────────────────────────────────── */}
        {activeTab === 'insights' && (
          selectedInsight ? (
            <InlineInsightDetail
              insight={selectedInsight}
              onBack={() => setSelectedInsight(null)}
            />
          ) : (
            <div className="p-4 md:p-6">
              {showFeatured && featuredInsight && (
                <Reveal>
                  <button
                    onClick={() => setSelectedInsight(featuredInsight)}
                    className="w-full text-left mb-6 bg-gradient-to-br from-[#1E2130] to-[#1A1D2A] border border-[#6D4A9E]/20 rounded-xl p-6 md:p-8 transition-all duration-200 hover:border-[#6D4A9E]/40 hover:shadow-xl hover:shadow-[#6D4A9E]/5 group"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#6D4A9E]/10 text-[#9B72CF] border border-[#6D4A9E]/20">
                        Macro Overview
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/15">
                        Start Here
                      </span>
                    </div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-[#9B72CF] transition-colors">
                      Why Sri Lanka&apos;s Tamil-majority regions, why now, and why diaspora capital
                    </h2>
                    <p className="text-sm text-[#A0A0B8] leading-relaxed mb-4 max-w-3xl">{featuredInsight.summary}</p>
                    <div className="flex items-center gap-2 text-xs text-[#9B72CF] font-medium group-hover:gap-3 transition-all">
                      Read the macro thesis <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                </Reveal>
              )}
              {showFeatured && (
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#7A7A9A]">Sector Deep Dives</h3>
                  <div className="flex-1 h-px bg-[#2A2D3E]" />
                  <span className="text-xs text-[#7A7A9A] font-mono">{sectorInsights.length} sectors</span>
                </div>
              )}
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredInsights.map(insight => (
                  <StaggerItem key={insight.id}>
                    <VentureInsightCard insight={insight} onClick={setSelectedInsight} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
              {filteredInsights.length === 0 && (
                <div className="text-center py-20"><p className="text-[#7A7A9A]">No insights match your filters</p></div>
              )}
            </div>
          )
        )}
      </div>

      {/* Slide-out panel */}
      <SlidePanel
        item={selectedItem}
        type={activeTab === 'opportunities' ? 'emerging' : 'portfolio'}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}

/* ─── Landing Page ────────────────────────────────────────────────────────── */
export default function VenturesLanding() {
  const [showOpportunity, setShowOpportunity] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* ── Hero with Video ─────────────────────────────────────── */}
      <VenturesHero onOpenOpportunity={() => setShowOpportunity(true)} />

      {/* ── Venture Opportunity Popout ──────────────────────────── */}
      <OpportunityPopout isOpen={showOpportunity} onClose={() => setShowOpportunity(false)} />

      {/* ── How It Works ─────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── Embedded Portal (light theme) ─────────────────────── */}
      <InlinePortal />

      {/* ── Waitlist ──────────────────────────────────────────── */}
      <section id="waitlist" className="py-24 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900">Join the Investor Waitlist</h2>
            <p className="text-gray-500 mb-10">
              ventures.aram.org.uk is currently in private beta. Request access below.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <WaitlistForm />
          </Reveal>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/Aram_Ventures.png"
              alt="Aram Ventures"
              className="h-8"
              style={{ mixBlendMode: 'multiply', background: 'transparent' }}
            />
            <span className="text-sm text-gray-500">Aram Ventures © 2026</span>
          </div>
          <Link href="/" className="text-sm text-gray-500 hover:text-[#6D4A9E] transition-colors">
            ← Back to aram.org.uk
          </Link>
        </div>
      </footer>
    </div>
  );
}

/* ─── Waitlist Form ───────────────────────────────────────────────────────── */
function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', investorType: '', interests: [] });

  const interestOptions = ['AgriTech', 'HealthTech', 'EdTech', 'Renewable Energy', 'Tourism', 'All Sectors'];

  const toggleInterest = (interest) => {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter(i => i !== interest)
        : [...f.interests, interest],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Waitlist submission:', form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-[#6D4A9E]/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-[#6D4A9E]">✓</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">We&apos;ll be in touch shortly</h3>
        <p className="text-gray-500 mb-6">In the meantime, explore what&apos;s inside.</p>
        <a
          href="#platform-preview"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#6D4A9E] text-white rounded-xl font-medium hover:bg-[#5A3D82] transition-colors"
        >
          Explore the Demo <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        required
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#6D4A9E] focus:ring-1 focus:ring-[#6D4A9E]/20 transition-colors"
      />
      <input
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#6D4A9E] focus:ring-1 focus:ring-[#6D4A9E]/20 transition-colors"
      />
      <div className="relative">
        <select
          required
          value={form.investorType}
          onChange={e => setForm(f => ({ ...f, investorType: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#6D4A9E] focus:ring-1 focus:ring-[#6D4A9E]/20 transition-colors appearance-none"
        >
          <option value="" disabled>Investor Type</option>
          <option>Angel Investor</option>
          <option>Institutional</option>
          <option>Diaspora Individual</option>
          <option>Family Office</option>
          <option>Other</option>
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Primary Interest</p>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => toggleInterest(opt)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                form.interests.includes(opt)
                  ? 'bg-[#6D4A9E]/10 border-[#6D4A9E] text-[#6D4A9E]'
                  : 'bg-transparent border-gray-200 text-gray-500 hover:border-[#6D4A9E]/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-[#6D4A9E] text-white rounded-xl font-semibold hover:bg-[#5A3D82] transition-colors flex items-center justify-center gap-2"
      >
        Request Access <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
