'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem, Counter } from '@/components/ui/motion';
import { ArrowRight, Briefcase, TrendingUp, BookOpen, ChevronDown, X } from 'lucide-react';
import { useFounderModal } from '@/components/ventures/founder-modal';
import { videos } from '@/lib/cloudinary';

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
                The UK Sri Lankan Tamil diaspora represents one of the most economically engaged diasporas in Europe — yet capital flows remain almost entirely informal. Aram Ventures is building the infrastructure to channel diaspora investment into vetted, high-potential ventures across Tamil Sri Lanka.
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
                  'Post-war land resettlement complete — agricultural and commercial recovery underway',
                  'IMF recovery programme prioritising SME development and foreign investment',
                  'Diaspora trust in formal investment channels at historic low — creating space for community-backed platforms',
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
                  { icon: Briefcase, title: 'Your Portfolio', desc: 'Track active ventures — financials, thesis, growth plans, founder profiles.' },
                  { icon: TrendingUp, title: 'Opportunities', desc: 'Pre-investment pipeline mapped across Sri Lanka — sector by sector, district by district.' },
                  { icon: BookOpen, title: 'Insights', desc: "Aram's proprietary research layer — district-level intelligence for informed capital." },
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
            src="/images/Gemini_Generated_Image_sdboy7sdboy7sdbo-2.png"
            alt="Aram Ventures"
            className="h-20 md:h-28"
          />
        </motion.div>
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold text-white mb-5 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          The diaspora venture
          <span className="block text-white/80">intelligence platform</span>
        </motion.h1>
        <motion.p
          className="font-body text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Connecting UK diaspora capital with vetted, high-potential ventures across Tamil Sri Lanka — backed by four years of on-the-ground research.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={onOpenOpportunity}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#6D4A9E] text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(109,74,158,0.3)] transition-all min-h-[48px]"
          >
            The Venture Opportunity <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={openFounderModal}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#C9A84C]/40 text-[#C9A84C] rounded-xl font-semibold hover:bg-[#C9A84C]/10 hover:-translate-y-0.5 transition-all min-h-[48px]"
          >
            ✦ True Potential
          </button>
          <a
            href="#demo"
            className="border border-white/20 text-white px-8 py-3.5 rounded-xl hover:border-white/40 hover:bg-white/5 transition-all min-h-[48px] flex items-center justify-center gap-2"
          >
            Explore the Demo <ChevronDown className="w-4 h-4" />
          </a>
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

/* ─── Landing Page ────────────────────────────────────────────────────────── */
export default function VenturesLanding() {
  const [showOpportunity, setShowOpportunity] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D14] text-white overflow-hidden">
      {/* ── Hero with Video ─────────────────────────────────────── */}
      <VenturesHero onOpenOpportunity={() => setShowOpportunity(true)} />

      {/* ── Venture Opportunity Popout ──────────────────────────── */}
      <OpportunityPopout isOpen={showOpportunity} onClose={() => setShowOpportunity(false)} />

      {/* ── Demo Section (inline scroll-down) ──────────────────── */}
      <section id="demo" className="bg-[#FAFAFA] text-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          {/* Demo header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src="/images/Gemini_Generated_Image_sdboy7sdboy7sdbo-2.png"
                alt="Aram Ventures"
                className="h-8"
              />
              <span className="px-2.5 py-1 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-[10px] font-mono tracking-wider uppercase">
                Demo
              </span>
            </div>
            <div className="flex gap-2">
              <Link
                href="/ventures/portal/portfolio"
                className="px-4 py-2 rounded-lg bg-[#6D4A9E] text-white text-sm font-medium hover:bg-[#5A3D82] transition-colors flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5" /> Portfolio
              </Link>
              <Link
                href="/ventures/portal/emerging"
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:border-[#6D4A9E] transition-colors flex items-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5" /> Opportunities
              </Link>
              <Link
                href="/ventures/portal/insights"
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:border-[#6D4A9E] transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" /> Insights
              </Link>
            </div>
          </div>

          {/* Preview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/ventures/portal/portfolio" className="group block">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#6D4A9E] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 h-full">
                <div className="w-12 h-12 rounded-xl bg-[#6D4A9E]/10 flex items-center justify-center mb-5">
                  <Briefcase className="w-6 h-6 text-[#6D4A9E]" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-[#6D4A9E] transition-colors">Your Portfolio</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">Track active ventures backed by True Potential — financials, thesis, growth plans.</p>
                <span className="text-[#6D4A9E] text-sm font-medium inline-flex items-center gap-1">
                  View portfolio <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
            <Link href="/ventures/portal/emerging" className="group block">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#C9A84C] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 h-full">
                <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mb-5">
                  <TrendingUp className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-[#C9A84C] transition-colors">Opportunities</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">Explore the Sri Lanka opportunity map — pre-investment pipeline across sectors.</p>
                <span className="text-[#C9A84C] text-sm font-medium inline-flex items-center gap-1">
                  View opportunities <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
            <Link href="/ventures/portal/insights" className="group block">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#6D4A9E] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 h-full">
                <div className="w-12 h-12 rounded-xl bg-[#6D4A9E]/10 flex items-center justify-center mb-5">
                  <BookOpen className="w-6 h-6 text-[#6D4A9E]" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-[#6D4A9E] transition-colors">Insights</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">Aram&apos;s proprietary research layer — district-level intelligence for informed capital.</p>
                <span className="text-[#6D4A9E] text-sm font-medium inline-flex items-center gap-1">
                  View insights <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Waitlist ──────────────────────────────────────────── */}
      <section id="waitlist" className="py-24 px-6 border-t border-[#2A2A40]/50">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Join the Investor Waitlist</h2>
            <p className="text-[#7A7A9A] mb-10">
              ventures.aram.org.uk is currently in private beta. Request access below.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <WaitlistForm />
          </Reveal>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-[#2A2A40]/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/Gemini_Generated_Image_sdboy7sdboy7sdbo-2.png"
              alt="Aram Ventures"
              className="h-8"
            />
            <span className="text-sm text-[#7A7A9A]">Aram Ventures © 2026</span>
          </div>
          <Link href="/" className="text-sm text-[#7A7A9A] hover:text-white transition-colors">
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
        <div className="w-16 h-16 rounded-full bg-[#6D4A9E]/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✓</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">We&apos;ll be in touch shortly</h3>
        <p className="text-[#7A7A9A] mb-6">In the meantime, explore what&apos;s inside.</p>
        <a
          href="#demo"
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
        className="w-full px-4 py-3 rounded-xl bg-[#1A1A2E] border border-[#2A2A40] text-white placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E] transition-colors"
      />
      <input
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        className="w-full px-4 py-3 rounded-xl bg-[#1A1A2E] border border-[#2A2A40] text-white placeholder:text-[#7A7A9A] focus:outline-none focus:border-[#6D4A9E] transition-colors"
      />
      <div className="relative">
        <select
          required
          value={form.investorType}
          onChange={e => setForm(f => ({ ...f, investorType: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl bg-[#1A1A2E] border border-[#2A2A40] text-white focus:outline-none focus:border-[#6D4A9E] transition-colors appearance-none"
        >
          <option value="" disabled>Investor Type</option>
          <option>Angel Investor</option>
          <option>Institutional</option>
          <option>Diaspora Individual</option>
          <option>Family Office</option>
          <option>Other</option>
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A9A] pointer-events-none" />
      </div>
      <div>
        <p className="text-sm text-[#7A7A9A] mb-2">Primary Interest</p>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => toggleInterest(opt)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                form.interests.includes(opt)
                  ? 'bg-[#6D4A9E]/20 border-[#6D4A9E] text-[#9B72CF]'
                  : 'bg-transparent border-[#2A2A40] text-[#7A7A9A] hover:border-[#6D4A9E]/50'
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
