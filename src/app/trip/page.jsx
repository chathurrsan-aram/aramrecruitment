'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem, Counter } from '@/components/ui/motion';
import { ArrowRight, Download, Calendar, MapPin, Users, FileText, Quote } from 'lucide-react';

/* ─── Hero ─────────────────────────────────────────── */
function TripHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#F6F2FC' }}>
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, #6D4A9E 0%, transparent 60%), radial-gradient(circle at 70% 80%, #5A3D82 0%, transparent 50%)',
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-20">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-aram-purple-dark mb-5">
            The Aram <span className="text-aram-purple">Trip</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-lg text-aram-warm-500 leading-relaxed max-w-xl mx-auto">
            The cornerstone of our mission: a yearly trip to Sri Lanka where our team connects directly with communities.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── How It Works ─────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Apply', desc: 'Submit your application and tell us about your skills and motivation.' },
    { num: '02', title: 'Prepare', desc: 'Join training sessions, learn about the communities, and plan your contribution.' },
    { num: '03', title: 'Travel', desc: 'Fly to Sri Lanka as a team and begin two weeks of immersive community work.' },
    { num: '04', title: 'Deliver', desc: 'Run workshops, health camps, mentoring sessions, and infrastructure projects.' },
    { num: '05', title: 'Reflect', desc: 'Document observations, build lasting relationships, and feed into our research.' },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-purple-light mb-3">
            The Process
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-aram-purple-dark">
            How It Works
          </h2>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-4">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1} direction="left" className="flex-1">
              <div className="flex md:flex-col items-start gap-4 md:text-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-aram-purple text-white font-mono text-sm font-bold flex items-center justify-center">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-aram-purple-dark mb-1">{step.title}</h3>
                  <p className="text-sm text-aram-warm-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Trip 2026 ────────────────────────────────────── */
function Trip2026() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="rounded-2xl border border-aram-warm-200 bg-aram-warm-50 p-8 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-aram-purple mb-2">Upcoming</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-aram-green-900 mb-6">
              Aram Trip 2026
            </h2>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-aram-purple mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-aram-green-900">Dates</p>
                  <p className="text-sm text-aram-warm-500">June – July 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-aram-purple mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-aram-green-900">Regions</p>
                  <p className="text-sm text-aram-warm-500">Hill Country, Eastern, Northern</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-aram-purple mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-aram-green-900">Team Size</p>
                  <p className="text-sm text-aram-warm-500">40+ volunteers</p>
                </div>
              </div>
            </div>

            <div className="bg-aram-purple-50 rounded-xl px-4 py-3 mb-6">
              <p className="text-sm text-aram-green-900 font-medium">Applications are now closed for Aram Trip 2026.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://aram.org.uk/wp-content/uploads/2026/01/how-we-organise-our-impact-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-aram-green-900 border border-aram-warm-200 rounded-xl px-4 py-2.5 hover:border-aram-purple transition-colors"
              >
                <Download className="w-4 h-4" /> How We Organise Our Impact
              </a>
              <a
                href="https://aram.org.uk/wp-content/uploads/2026/01/aram-trip-2026-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-aram-green-900 border border-aram-warm-200 rounded-xl px-4 py-2.5 hover:border-aram-purple transition-colors"
              >
                <FileText className="w-4 h-4" /> Trip FAQ
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Past Trips ───────────────────────────────────── */
function PastTrips() {
  const [activeTab, setActiveTab] = useState('2025');

  const trips = {
    '2025': {
      summary: 'Our most ambitious trip — 40+ volunteers across two groups deployed across 7 districts over 15 days, delivering healthcare camps, career guidance, technology workshops, mentoring, and community development.',
      stats: [
        { target: 40, suffix: '+', label: 'Volunteers' },
        { target: 7, suffix: '', label: 'Districts' },
        { target: 15, suffix: '', label: 'Days' },
      ],
      reportUrl: null,
    },
    '2024': {
      summary: 'Our largest trip yet: 30 volunteers deployed across three provinces, delivering healthcare camps, career guidance sessions, mentoring pilots, and technology workshops to 12+ communities.',
      stats: [
        { target: 30, suffix: '', label: 'Volunteers' },
        { target: 4, suffix: '', label: 'Provinces' },
        { target: 12, suffix: '+', label: 'Communities' },
      ],
      reportUrl: 'https://aram.org.uk/wp-content/uploads/2024/12/aram-2024-trip-report-1.pdf',
    },
    '2023': {
      summary: 'The inaugural Aram Trip: 20 volunteers partnered with Tamil Aid for two weeks of workshops, infrastructure projects, and community engagement across Sri Lanka.',
      stats: [
        { target: 20, suffix: '', label: 'Volunteers' },
        { target: 2, suffix: '', label: 'Provinces' },
        { target: 8, suffix: '+', label: 'Communities' },
      ],
      reportUrl: 'https://aram.org.uk/wp-content/uploads/2025/02/aram-trip-report-2023vf.pdf',
    },
  };

  const trip = trips[activeTab];

  return (
    <section className="py-24 md:py-32 bg-aram-warm-50">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="text-center mb-10">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
            Track Record
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-aram-green-900">
            Past Trips
          </h2>
        </Reveal>

        <div className="flex justify-center gap-1 mb-10 relative">
          {['2025', '2024', '2023'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                activeTab === tab
                  ? 'text-aram-green-900'
                  : 'text-aram-warm-400 hover:text-aram-green-900'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="trip-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-aram-gold-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-aram-warm-500 leading-relaxed mb-8 text-center max-w-2xl mx-auto">
              {trip.summary}
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {trip.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-4xl font-bold text-aram-purple">
                    <Counter target={stat.target} suffix={stat.suffix} key={`${activeTab}-${i}`} />
                  </div>
                  <div className="text-sm text-aram-warm-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Photo grid placeholder */}
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8" staggerDelay={0.08}>
              {[...Array(6)].map((_, i) => (
                <StaggerItem key={i}>
                  <div className={`rounded-xl bg-gradient-to-br ${
                    i % 3 === 0 ? 'from-aram-green-700/20 to-aram-green-900/20' :
                    i % 3 === 1 ? 'from-aram-purple-100/30 to-aram-purple/20' :
                    'from-aram-warm-200 to-aram-warm-100'
                  } ${i % 3 === 0 ? 'aspect-square' : 'aspect-[4/3]'} flex items-center justify-center`}>
                    <span className="text-xs text-aram-warm-400 font-mono">Photo {i + 1}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Report link */}
            {trip.reportUrl && (
              <div className="text-center">
                <a
                  href={trip.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-aram-green-900 font-semibold hover:text-aram-purple transition-colors"
                >
                  Read Full Report <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Testimonials ─────────────────────────────────── */
function Testimonials() {
  const quotes = [
    {
      text: "Being on the ground changed everything. You can't understand these communities from a distance.",
      author: 'Volunteer, 2024',
    },
    {
      text: "The connections we made weren't just for two weeks. They're lasting partnerships.",
      author: 'Volunteer, 2023',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.15}>
          {quotes.map((q, i) => (
            <StaggerItem key={i}>
              <div className="rounded-xl border border-aram-warm-200 bg-aram-warm-50 p-8">
                <Quote className="w-8 h-8 text-aram-purple-light mb-4" />
                <p className="font-display text-lg text-aram-green-900 leading-relaxed mb-4 italic">
                  &ldquo;{q.text}&rdquo;
                </p>
                <p className="font-mono text-xs text-aram-warm-400">- {q.author}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────── */
export default function TripPage() {
  return (
    <div>
      <TripHero />
      <HowItWorks />
      <Trip2026 />
      <PastTrips />
      <Testimonials />
    </div>
  );
}
