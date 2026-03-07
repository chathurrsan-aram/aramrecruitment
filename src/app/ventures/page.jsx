'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem, Counter } from '@/components/ui/motion';
import { ArrowRight, Briefcase, TrendingUp, BookOpen, ChevronDown } from 'lucide-react';

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

/* ─── Landing Page ────────────────────────────────────────────────────────── */
export default function VenturesLanding() {
  return (
    <div className="min-h-screen bg-[#0D0D14] text-white overflow-hidden">
      {/* ── Minimal Nav ──────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D14]/80 backdrop-blur-xl border-b border-[#2A2A40]/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/dhzuwjkkz/image/upload/v1771802172/a730ae79-83b6-460d-b17f-c562f2948100_pcjimk.png"
              alt="Aram"
              className="h-10 brightness-0 invert"
            />
            <span className="font-mono text-xs tracking-[0.2em] text-[#9B72CF] uppercase">Ventures</span>
          </Link>
          <Link
            href="/ventures/portal"
            className="text-sm text-[#7A7A9A] hover:text-white transition-colors"
          >
            View Demo
          </Link>
        </div>
      </header>

      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#6D4A9E]/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#1ABC9C]/8 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-[#9B72CF] uppercase mb-4">
              Aram Ventures
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
              The diaspora venture<br />intelligence platform
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-[#7A7A9A] max-w-2xl mx-auto mb-10 leading-relaxed">
              Connecting UK diaspora capital with vetted, high-potential ventures across Tamil Sri Lanka — backed by four years of on-the-ground research.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#6D4A9E] text-white rounded-xl font-semibold hover:bg-[#5A3D82] transition-all duration-200 shadow-lg shadow-[#6D4A9E]/25"
              >
                Request Access <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/ventures/portal"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#2A2A40] text-white rounded-xl font-semibold hover:border-[#6D4A9E] transition-all duration-200"
              >
                View Demo
              </Link>
            </div>
          </Reveal>

          {/* Frosted portal preview */}
          <Reveal delay={0.5}>
            <div className="mt-16 relative rounded-2xl border border-[#2A2A40] overflow-hidden">
              <div className="bg-[#13131F] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#2A2A40]" />
                    <div className="w-3 h-3 rounded-full bg-[#2A2A40]" />
                    <div className="w-3 h-3 rounded-full bg-[#2A2A40]" />
                  </div>
                  <div className="flex-1 h-7 bg-[#1A1A2E] rounded-lg" />
                </div>
                <div className="flex gap-3 mb-6">
                  {['Your Portfolio', 'Emerging Ventures', 'Insights'].map((tab, i) => (
                    <div key={tab} className={`px-4 py-2 rounded-lg text-sm font-medium ${i === 0 ? 'bg-[#6D4A9E]/20 text-[#9B72CF]' : 'text-[#7A7A9A]'}`}>
                      {tab}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Vanni AgriConnect', sector: 'AgriTech', amount: '£120k' },
                    { name: 'Nalam Health', sector: 'HealthTech', amount: '£250k' },
                    { name: 'Malai Learn', sector: 'EdTech', amount: '£80k' },
                  ].map(card => (
                    <div key={card.name} className="bg-[#1A1A2E] rounded-xl p-4 border border-[#2A2A40]">
                      <p className="text-sm font-semibold text-white mb-1">{card.name}</p>
                      <p className="text-xs text-[#7A7A9A]">{card.sector} · Seeking {card.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Frost overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D14] via-[#0D0D14]/60 to-transparent pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. What's Inside ─────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">What&apos;s Inside</h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Briefcase, title: 'Your Portfolio', desc: 'Track active ventures backed by True Potential — financials, thesis, growth plans.' },
              { icon: TrendingUp, title: 'Emerging Ventures', desc: 'Explore the Sri Lanka opportunity map — pre-investment pipeline across sectors.' },
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

      {/* ── 3. True Potential ────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[#2A2A40]/50">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-medium mb-6">
                ✦ True Potential
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Backed by True Potential</h2>
              <p className="text-lg text-[#7A7A9A]">Every venture in our portfolio has execution support built in.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[#7A7A9A] max-w-3xl mx-auto text-center leading-relaxed mb-16">
              True Potential is the operating arm of Aram Ventures. It provides strategy, project delivery and tech enablement to portfolio companies — taking equity and success fees rather than day rates. That means every True Potential-backed venture has a dedicated execution partner invested in the outcome, not just the invoice.
            </p>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🧠', title: 'Problem Structuring', desc: 'Turning ambiguous challenges into structured plans' },
              { emoji: '📦', title: 'Project Delivery', desc: 'End-to-end execution you can hand over and trust' },
              { emoji: '💻', title: 'Tech Enablement', desc: "Digital tools built for your community's context" },
            ].map(pillar => (
              <StaggerItem key={pillar.title}>
                <div className="bg-[#13131F] border border-[#C9A84C]/20 rounded-2xl p-8 text-center hover:border-[#C9A84C]/40 transition-all duration-200">
                  <span className="text-3xl mb-4 block">{pillar.emoji}</span>
                  <h3 className="font-display text-lg font-semibold text-[#C9A84C] mb-2">{pillar.title}</h3>
                  <p className="text-[#7A7A9A] text-sm">{pillar.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <Reveal delay={0.3}>
            <div className="text-center mt-8">
              <a href="#" className="text-sm text-[#C9A84C] hover:text-[#F2E4B8] transition-colors inline-flex items-center gap-1">
                Learn more about True Potential <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. The Opportunity ───────────────────────────────────────── */}
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

      {/* ── 5. About the Founder ─────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[#2A2A40]/50">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="bg-[#13131F] border border-[#2A2A40] rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#C9A84C]/60 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl font-bold text-[#0D0D14]">C</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Strategy Consultant & Co-Founder</h3>
                  <p className="text-[#7A7A9A] text-sm">Aram Ventures / True Potential · Age 25 · London, UK · Sri Lankan Tamil</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { icon: '📊', title: 'Strategy & CDD', desc: 'PwC, Alpha FMC, Marathon Capital, Barclays, McKinsey — PE-grade commercial due diligence' },
                  { icon: '🌍', title: 'Founded Aram', desc: '4 years, 500+ members, grassroots development across Sri Lanka' },
                  { icon: '⚡', title: 'Strategy + Builder', desc: 'Structures problems at consulting speed, builds the technical solution' },
                  { icon: '🎯', title: 'Known for', desc: 'Breaking ambiguous problems into structured, executable plans' },
                ].map(row => (
                  <div key={row.title} className="flex items-start gap-4 p-4 rounded-xl bg-[#1A1A2E] border border-[#2A2A40]">
                    <span className="text-lg flex-shrink-0 mt-0.5">{row.icon}</span>
                    <div>
                      <p className="font-semibold text-sm text-white mb-0.5">{row.title}</p>
                      <p className="text-sm text-[#7A7A9A]">{row.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-medium">
                  PwC · Alpha FMC · Private Equity
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-medium">
                  Co-founded Aram & True Potential
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Waitlist ──────────────────────────────────────────────── */}
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

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-[#2A2A40]/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/dhzuwjkkz/image/upload/v1771802172/a730ae79-83b6-460d-b17f-c562f2948100_pcjimk.png"
              alt="Aram"
              className="h-6 brightness-0 invert opacity-50"
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
