'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem, Counter } from '@/components/ui/motion';
import { ArrowRight, Briefcase, TrendingUp, BookOpen, ChevronDown, X, Search, Filter, DollarSign, PieChart, Map, LayoutGrid } from 'lucide-react';
import { useFounderModal } from '@/components/ventures/founder-modal';
import { videos } from '@/lib/cloudinary';
import { portfolioCompanies, emergingVentures, ventureInsights, ventureSectors, investorPositions, getVenturesByDistrict } from '@/data/venturesData';
import { PortfolioCard, EmergingCard, VentureInsightCard } from '@/components/ventures/venture-card';
import SlidePanel from '@/components/ventures/slide-panel';
import dynamic from 'next/dynamic';

const SriLankaMap = dynamic(() => import('@/components/ui/sri-lanka-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center bg-[#13131F]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#2A2A40] border-t-[#6D4A9E] rounded-full animate-spin mx-auto mb-3" />
        <p className="text-[#7A7A9A] text-sm">Loading map...</p>
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
            alt="Aram Ventures - True Potential"
            className="h-20 md:h-28"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </motion.div>
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
          Connecting UK diaspora capital with vetted, high-potential ventures across Tamil Sri Lanka, backed by four years of on-the-ground research.
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

/* ─── Light-Themed Embedded Portal (original structure) ──────────────────── */
function EmbeddedPortalPreview() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'opportunities', label: 'Opportunities', icon: TrendingUp },
    { id: 'insights', label: 'Insights', icon: BookOpen },
  ];

  const filteredPortfolio = portfolioCompanies.filter(c => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q);
  });

  const filteredEmerging = emergingVentures.filter(v => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return v.name.toLowerCase().includes(q) || v.tagline.toLowerCase().includes(q);
  });

  const filteredInsights = ventureInsights.filter(i => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q);
  });

  return (
    <section id="platform-preview" className="bg-[#F8F9FB] py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Light card container */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Portal header */}
          <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/Untitled design-6.png"
                alt="Aram Ventures - True Potential"
                className="h-8"
              />
            </div>
          </div>

          {/* Tab toggles */}
          <div className="px-4 md:px-6 py-3 border-b border-gray-200">
            <div className="flex bg-gray-100 rounded-xl p-1 max-w-md mx-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setSearchQuery(''); setSelectedItem(null); }}
                    className={`relative z-10 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex-1 ${
                      isActive
                        ? 'bg-[#6D4A9E] text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-4 md:p-6 bg-[#F8F9FB]">
            {/* Search */}
            <div className="relative max-w-sm mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#6D4A9E] focus:ring-1 focus:ring-[#6D4A9E]/20 transition-colors"
              />
            </div>

            {/* Portfolio tab */}
            {activeTab === 'portfolio' && (
              <div>
                {/* Summary bar */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Active Ventures</p>
                    <p className="text-xl font-bold text-gray-900">{portfolioCompanies.length}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Total Seeking</p>
                    <p className="text-xl font-bold text-gray-900">£{(portfolioCompanies.reduce((sum, c) => sum + c.seeking, 0) / 1000).toFixed(0)}k</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">True Potential Backed</p>
                    <p className="text-xl font-bold text-gray-900">{portfolioCompanies.filter(c => c.truePotential).length}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPortfolio.map(company => (
                    <div key={company.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#6D4A9E] hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setSelectedItem({ ...company, _type: 'portfolio' })}>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {company.truePotential && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6D4A9E]/10 border border-[#6D4A9E]/20 text-[#6D4A9E] text-[11px] font-medium">
                            ✦ True Potential
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">{company.name}</h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{company.tagline}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="font-mono">{company.region}</span>
                        <span className="text-gray-300">·</span>
                        <span className="font-mono text-[#6D4A9E]">Seeking £{(company.seeking / 1000).toFixed(0)}k</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opportunities tab */}
            {activeTab === 'opportunities' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEmerging.map(venture => (
                  <div key={venture.id} className="bg-white border border-dashed border-gray-300 rounded-xl p-5 hover:border-[#6D4A9E]/50 transition-all duration-200 cursor-pointer" onClick={() => setSelectedItem({ ...venture, _type: 'emerging' })}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#6D4A9E]/10 border border-[#6D4A9E]/20 text-[#6D4A9E]">
                        Opportunity
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">{venture.name}</h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{venture.tagline}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="font-mono">{venture.region}</span>
                      <span className="text-gray-300">·</span>
                      <span className="font-mono text-[#6D4A9E]">Est. {venture.estimateRange}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Insights tab */}
            {activeTab === 'insights' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredInsights.map(insight => (
                  <div key={insight.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#6D4A9E] hover:shadow-md transition-all duration-200">
                    <h3 className="font-display text-base font-semibold text-gray-900 mb-2 leading-snug">{insight.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{insight.summary}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="font-mono">{insight.region}</span>
                      <span className="text-gray-300">·</span>
                      <span>{insight.readTime} min read</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-out panel */}
      <AnimatePresence>
        {selectedItem && (
          <SlidePanel
            item={selectedItem}
            type={selectedItem._type || 'portfolio'}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
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
      <EmbeddedPortalPreview />

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
              src="/images/Untitled design-6.png"
              alt="Aram Ventures - True Potential"
              className="h-8"
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
