'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, DrawPath } from '@/components/ui/motion';
import { timelineEvents } from '@/data/timeline';
import { ChevronDown, ChevronUp } from 'lucide-react';

/* ─── Hero ─────────────────────────────────────────── */
function AboutHero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-aram-warm-50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-aram-green-900 mb-6">
            About <span className="text-aram-purple">Aram</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-lg text-aram-warm-500 leading-relaxed">
            A youth-led movement connecting the Sri Lankan Tamil diaspora with communities on the ground, because presence, not just funding, creates lasting change.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Who We Are ───────────────────────────────────── */
function WhoWeAre() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <p className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-4">
            Who We Are
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-aram-warm-500 leading-relaxed mb-6">
            The Aram Initiative is a youth-led movement connecting the Sri Lankan Tamil diaspora with communities on the ground. Founded by young UK professionals, we believe that presence, not just funding, creates lasting change.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg text-aram-warm-500 leading-relaxed">
            Through annual volunteering trips, grassroots research, and long-term development initiatives, we bridge the gap between diaspora expertise and local needs across healthcare, education, technology, wellbeing, special educational needs, and economic development.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Our Model (Interactive) ──────────────────────── */
function OurModel() {
  const [expanded, setExpanded] = useState(null);

  const pillars = [
    {
      id: 'discovery',
      icon: '🔍',
      title: 'Discovery',
      color: '#40916C',
      summary: 'Annual trips to observe, connect, and understand community needs first-hand.',
      details: [
        'Annual volunteering trips with 20–40 young professionals and students',
        'Community engagement across healthcare, education, SEN, technology, wellbeing, and economic development',
        'Structured observation frameworks to capture field insights',
        'Building trust-based relationships with local partners',
        'Identifying systemic challenges that go beyond surface-level problems',
      ],
    },
    {
      id: 'research',
      icon: '🔬',
      title: 'Research & Insights',
      color: '#6D4A9E',
      summary: 'Translating field observations into data-driven, publishable insights.',
      details: [
        'Converting trip observations into structured research pieces',
        'Publishing thought leadership on Substack and independent platforms',
        'Building a living knowledge base organised by sector, region, and partner',
        'Collaborating with academics and sector experts for rigorous analysis',
        'Creating actionable recommendations for partners and stakeholders',
      ],
    },
    {
      id: 'initiatives',
      icon: '🚀',
      title: 'Long-term Initiatives',
      color: '#C85C5C',
      summary: 'Sustainable projects tackling systemic issues identified through our research.',
      details: [
        'Microcredit revolving fund for women\'s self-help groups in eastern Sri Lanka',
        'Virtual mentorship programme connecting UK professionals with Sri Lankan students',
        'Pen pal project bridging UK and Sri Lankan young people',
        'Partner capacity building: training, resources, and ongoing support',
        'Year-round engagement beyond the annual trip window',
      ],
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-aram-warm-50">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
            Our Approach
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-aram-green-900">
            Three Pillars, One Mission
          </h2>
        </Reveal>

        {/* SVG connecting arrows */}
        <div className="hidden md:block mb-12">
          <svg viewBox="0 0 800 40" className="w-full max-w-3xl mx-auto" style={{ overflow: 'visible' }}>
            <DrawPath d="M 100 20 L 380 20" color="#E8E4DE" strokeWidth={2} duration={1} />
            <DrawPath d="M 420 20 L 700 20" color="#E8E4DE" strokeWidth={2} duration={1} />
            <DrawPath d="M 375 15 L 390 20 L 375 25" color="#E8E4DE" strokeWidth={2} duration={0.5} />
            <DrawPath d="M 695 15 L 710 20 L 695 25" color="#E8E4DE" strokeWidth={2} duration={0.5} />
          </svg>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <motion.div
              key={p.id}
              layout
              className="rounded-xl border border-aram-warm-200 bg-white p-6 cursor-pointer transition-colors hover:border-aram-purple"
              onClick={() => setExpanded(expanded === p.id ? null : p.id)}
            >
              <motion.div layout="position">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl"
                  style={{ backgroundColor: `${p.color}15` }}
                >
                  {p.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-aram-green-900 mb-2">{p.title}</h3>
                <p className="text-sm text-aram-warm-500 leading-relaxed">{p.summary}</p>
              </motion.div>

              <AnimatePresence>
                {expanded === p.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 pt-4 border-t border-aram-warm-200 space-y-2">
                      {p.details.map((d, i) => (
                        <li key={i} className="flex gap-2 text-sm text-aram-warm-500">
                          <span className="text-aram-purple mt-1">•</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-1 mt-4 text-xs text-aram-warm-400">
                {expanded === p.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {expanded === p.id ? 'Less' : 'More'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Timeline ─────────────────────────────────────── */
function Timeline() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
            Our Journey
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-aram-green-900">
            From Idea to Movement
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-aram-warm-200 hidden md:block" />
          <div className="absolute left-6 top-0 bottom-0 w-px bg-aram-warm-200 md:hidden" />

          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, i) => (
              <Reveal key={event.id} delay={i * 0.1} direction={event.side === 'left' ? 'left' : 'right'}>
                <div className={`relative flex items-start gap-6 md:gap-0 ${
                  event.side === 'right' ? 'md:flex-row-reverse' : ''
                }`}>
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className={`w-4 h-4 rounded-full border-2 ${
                        event.isFuture
                          ? 'border-aram-warm-300 bg-white'
                          : 'border-aram-purple bg-aram-purple'
                      }`}
                      whileInView={{ scale: [0.5, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </div>

                  <div className="md:hidden flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      event.isFuture ? 'bg-aram-warm-300' : 'bg-aram-purple'
                    }`} />
                  </div>

                  <div className={`md:w-[calc(50%-2rem)] ${
                    event.side === 'right' ? 'md:text-left md:ml-auto md:pl-12' : 'md:text-right md:mr-auto md:pr-12'
                  }`}>
                    <span className={`font-mono text-xs ${
                      event.isFuture ? 'text-aram-warm-300' : 'text-aram-purple'
                    }`}>
                      {event.date}
                    </span>
                    <h3 className={`font-display text-lg font-bold mt-1 mb-2 ${
                      event.isFuture ? 'text-aram-warm-400' : 'text-aram-green-900'
                    }`}>
                      {event.title}
                    </h3>
                    <p className="text-sm text-aram-warm-500 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <WhoWeAre />
      <OurModel />
      <Timeline />
    </div>
  );
}
