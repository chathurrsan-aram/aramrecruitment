'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem, Counter } from '@/components/ui/motion';
import { ArrowRight, Briefcase, TrendingUp, BookOpen, ChevronDown } from 'lucide-react';
import { useFounderModal } from '@/components/ventures/founder-modal';

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
        <Link
          href="/ventures/portal"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#6D4A9E] text-white rounded-xl font-medium hover:bg-[#5A3D82] transition-colors"
        >
          Explore the Demo <ArrowRight className="w-4 h-4" />
        </Link>
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

/* ─── Hero ────────────────────────────────────────────────────────────────── */
function VenturesHero() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, -60]);

  useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <div className="absolute inset-0 bg-[#0D0D14]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#6D4A9E]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#1ABC9C]/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-[#C9A84C]/5 rounded-full blur-[100px]" />
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
            className="h-20 md:h-28 brightness-0 invert"
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
          className="font-body text-lg md:text-xl text-[#7A7A9A] mb-10 max-w-2xl mx-auto leading-relaxed"
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
          <Link
            href="/ventures/portal"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#6D4A9E] text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(109,74,158,0.3)] transition-all min-h-[48px]"
          >
            Explore the Demo <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#content"
            className="border border-[#2A2A40] text-white px-8 py-3.5 rounded-xl hover:border-[#6D4A9E] transition-all min-h-[48px] flex items-center justify-center gap-2"
          >
            Our Story <ChevronDown className="w-4 h-4" />
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

/* ─── True Potential Section ───────────────────────────────────────────────── */
function TruePotentialSection() {
  const { open } = useFounderModal();

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#1B3A4B' }}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img
                src="/images/tempImage5CilK3.jpeg"
                alt="True Potential"
                className="h-14 md:h-16 rounded-xl object-contain"
              />
            </div>
            <p className="font-mono text-xs tracking-[0.25em] text-[#C9A84C] uppercase mb-4">
              THE EXECUTION LAYER
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Every True Potential-backed venture has an execution partner built in.
            </h2>
            <p className="text-lg text-[#A8C4D4] max-w-3xl mx-auto leading-relaxed">
              Spotting opportunities isn&apos;t enough. True Potential is the hands-on capability that turns early-stage ideas into structured, deliverable ventures — strategy, technology, and project execution in one.
            </p>
          </div>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { emoji: '🧠', title: 'Strategy', desc: 'Structuring the problem, validating the thesis, building the plan' },
            { emoji: '📦', title: 'Delivery', desc: 'Project execution from first milestone to market' },
            { emoji: '💻', title: 'Tech', desc: "Digital tools and platforms built for the venture's specific context" },
          ].map(pillar => (
            <StaggerItem key={pillar.title}>
              <div className="bg-[#0D2B3A] border border-[#2A4A5A] rounded-2xl p-8 text-center hover:border-[#C9A84C]/40 transition-all duration-200">
                <span className="text-3xl mb-4 block">{pillar.emoji}</span>
                <h3 className="font-display text-lg font-semibold text-[#C9A84C] mb-2">{pillar.title}</h3>
                <p className="text-[#A8C4D4] text-sm">{pillar.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.2}>
          <p className="text-center text-sm text-[#A8C4D4]/60 mb-8">
            Ventures carrying the ✦ badge have True Potential actively involved.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="text-center">
            <button
              onClick={open}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A84C] text-[#0D2B3A] rounded-xl font-semibold hover:-translate-y-0.5 transition-all"
            >
              Meet the founder <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Landing Page ────────────────────────────────────────────────────────── */
export default function VenturesLanding() {
  return (
    <div className="min-h-screen bg-[#0D0D14] text-white overflow-hidden">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <VenturesHero />

      {/* ── 1. What's Inside ─────────────────────────────────────── */}
      <section id="content" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">What&apos;s Inside</h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Briefcase, title: 'Your Portfolio', desc: 'Track active ventures backed by True Potential — financials, thesis, growth plans.' },
              { icon: TrendingUp, title: 'Opportunities', desc: 'Explore the Sri Lanka opportunity map — pre-investment pipeline across sectors.' },
              { icon: BookOpen, title: 'Insights', desc: "Aram's proprietary research layer — district-level intelligence for informed capital." },
            ].map(item => (
              <StaggerItem key={item.title}>
                <div className="bg-[#13131F] border border-[#2A2A40] rounded-2xl p-8 hover:border-[#6D4A9E]/50 transition-all duration-200 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#6D4A9E]/15 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-[#9B72CF]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-[#7A7A9A] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 2. True Potential ────────────────────────────────────── */}
      <TruePotentialSection />

      {/* ── 3. The Opportunity ───────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[#2A2A40]/50">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">The Opportunity</h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 500, suffix: 'K+', label: 'Sri Lankan diaspora in the UK' },
              { value: 6, prefix: '£', suffix: 'bn', label: 'Annual remittances from UK to Sri Lanka' },
              { value: 10, prefix: '£', suffix: 'B', label: 'Sri Lanka FDI opportunity pipeline' },
              { value: 90, suffix: '%', label: 'SMEs with no access to strategic advisory' },
            ].map(stat => (
              <StaggerItem key={stat.label}>
                <div className="bg-[#13131F] border border-[#2A2A40] rounded-2xl p-6 text-center">
                  <p className="font-display text-3xl md:text-4xl font-bold text-[#9B72CF] mb-2">
                    <Counter target={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix} />
                  </p>
                  <p className="text-[#7A7A9A] text-sm">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 4. Waitlist ──────────────────────────────────────────── */}
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
              className="h-8 brightness-0 invert"
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
