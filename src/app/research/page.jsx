'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

const researchAreas = [
  {
    title: 'Health Data Analysis',
    desc: 'Analysing data from our health camps to identify trends, prevalence rates, and community health needs.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    title: 'Initiative Case Studies',
    desc: 'Documenting successful programmes so they can be replicated and improved by future teams.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'Community Needs Assessment',
    desc: 'Understanding what communities actually need — not what we assume they need — to direct resources effectively.',
    icon: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z',
  },
  {
    title: 'Impact Measurement',
    desc: 'Developing frameworks to measure whether our initiatives are creating lasting change.',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
];

export default function ResearchPage() {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => setPageLoaded(true));
  }, []);

  return (
    <div
      className="min-h-screen bg-white"
      style={{ opacity: pageLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
    >
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-aram-purple via-aram-purple-dark to-[#3D2266]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-sector rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}
          >
            Research
          </h1>
          <p
            className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
            }}
          >
            Evidence-driven work. We research to understand, measure to improve, and share our learnings with the world.
          </p>
        </div>
      </section>

      {/* Why Research Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why We Research</h2>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                Good intentions aren't enough. Every initiative we run should be grounded in evidence — understanding what communities actually need, measuring whether our programmes work, and sharing what we learn so others can benefit too.
              </p>
              <p>
                Our research function ensures we're not just guessing. We analyse data from our trips, document case studies of what works (and what doesn't), and collaborate with academics and experts to produce insights that drive better decisions.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Research Areas</h2>
            <p className="text-gray-600 leading-relaxed">
              Our research spans the breadth of our work — from health outcomes to educational impact.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {researchAreas.map((area, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-gray-200 h-full hover:shadow-md transition-shadow duration-200">
                  <div className="w-10 h-10 bg-aram-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-aram-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={area.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{area.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{area.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How Research Feeds Into Our Work</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-gradient-to-r from-aram-purple-50 to-sector-bg/30 rounded-2xl p-8 border border-aram-purple-100">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-aram-purple rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Gather</h4>
                  <p className="text-xs text-gray-500">Collect data during trips and year-round initiatives</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-sector rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Analyse</h4>
                  <p className="text-xs text-gray-500">Turn raw data into insights with rigorous methodology</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-priority rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Apply</h4>
                  <p className="text-xs text-gray-500">Use findings to improve programmes and share with others</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 bg-aram-purple-100">
        <AnimatedSection className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-aram-purple-dark mb-4">Contribute to Our Research</h2>
          <p className="text-aram-purple text-lg mb-6 leading-relaxed">
            If you have research, data analysis, or academic writing skills, we'd love your help turning our experiences into evidence.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 bg-aram-purple hover:bg-aram-purple-dark text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[52px]"
          >
            Apply for Research Lead
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
