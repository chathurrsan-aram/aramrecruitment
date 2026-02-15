'use client';

import { useState, useEffect } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import InitiativeGrid from '@/components/initiatives/InitiativeGrid';
import initiatives from '@/data/initiatives';

export default function InitiativesPage() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-[#1a1a2e]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-aram-purple rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sector rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div
            className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s',
            }}
          >
            The Aram Initiative
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}
          >
            Our Initiatives
          </h1>
          <p
            className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
            }}
          >
            Long-term, community-led projects designed and supported by the Aram Initiative across Sri Lanka.
          </p>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <InitiativeGrid initiatives={initiatives} />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <AnimatedSection className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Want to Support an Initiative?</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Whether you want to lead, volunteer, or contribute expertise — every initiative needs people. Join the team and help us scale what works.
          </p>
          <a
            href="/join"
            className="inline-flex items-center gap-2 bg-aram-purple hover:bg-aram-purple-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[48px]"
          >
            Join the Team
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </AnimatedSection>
      </section>
    </div>
  );
}
