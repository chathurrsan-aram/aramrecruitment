'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

const tripHighlights = [
  {
    title: 'Healthcare Camps',
    desc: 'Free health screenings and medical consultations in underserved communities.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    title: 'Education Workshops',
    desc: 'Career guidance, mock interviews, and skills sessions with local students.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    title: 'SEN Support',
    desc: 'Working with children with disabilities and their families through partner centres.',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    title: 'Community Building',
    desc: 'Engaging with local communities, cultural exchange, and building lasting trust.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    title: 'Technology Training',
    desc: 'Digital skills workshops and IT infrastructure support with partners like Dreamspace.',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    title: 'Economic Initiatives',
    desc: 'Supporting cooperatives and livelihood programs for sustainable income.',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
];

const partnerOrgs = [
  { name: 'Tea Leaf Trust', desc: 'Education and empowerment in the hill country' },
  { name: 'Dreamspace', desc: 'Digital skills and technology access' },
  { name: "Children's Homes", desc: 'Residential care and development support' },
  { name: 'Local Schools', desc: 'Career guidance and curriculum support' },
  { name: 'SPARKS', desc: 'Supporting children with disabilities' },
  { name: 'Varany Central College', desc: 'Education partnerships in the north' },
];

export default function TripPage() {
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
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img
            src="/images/Hope.jpg"
            alt="Aram volunteers in Sri Lanka"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
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
            The Aram Trip
          </h1>
          <p
            className="text-lg text-white/85 max-w-xl mx-auto leading-relaxed"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
            }}
          >
            Every year, 40+ volunteers travel to Sri Lanka to deliver healthcare, education, and community development. This is where everything comes together.
          </p>
          <div
            className="mt-10 grid grid-cols-3 gap-8 max-w-md mx-auto"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
            }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white">3</div>
              <div className="text-white/60 text-xs mt-1">Trips Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">40+</div>
              <div className="text-white/60 text-xs mt-1">Volunteers Per Trip</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">6</div>
              <div className="text-white/60 text-xs mt-1">Sectors of Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens on a Trip */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Happens on a Trip</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Each trip spans multiple locations across Sri Lanka. Volunteers are split into teams aligned with our six sectors, working alongside local partners who know the communities best.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-gradient-to-r from-aram-purple-50 to-priority-bg/30 rounded-2xl p-8 border border-aram-purple-100 mb-10">
              <p className="text-gray-700 leading-relaxed">
                The trip isn't a holiday with a side of volunteering. It's intense, rewarding, and often challenging. You'll be operating in a developing country, adapting to curveballs, and relying on your team. The connections you make — with communities and with each other — are what people remember most.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tripHighlights.map((highlight, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-full">
                  <div className="w-10 h-10 bg-aram-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-aram-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={highlight.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{highlight.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Organisations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Partners on the Ground</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We work with trusted local organisations who know their communities. These relationships — built over three years of showing up — are our foundation.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partnerOrgs.map((org, i) => (
                <div key={i} className="bg-white rounded-xl p-5 text-center border border-gray-200">
                  <div className="w-10 h-10 bg-aram-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-aram-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{org.name}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{org.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Join the Next Trip</h2>
            <p className="text-gray-600 leading-relaxed">
              Trip volunteers come from our wider team. To be part of the next trip, the first step is to join our team and contribute year-round.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="space-y-0">
              {[
                { num: '1', title: 'Join the Team', desc: 'Apply for a role that fits your skills and interests.' },
                { num: '2', title: 'Contribute Year-Round', desc: 'Drive initiatives and show consistent commitment.' },
                { num: '3', title: 'Get Selected', desc: 'Trip places are given to active team members first.' },
                { num: '4', title: 'Make Impact', desc: 'Travel to Sri Lanka and deliver real change on the ground.' },
              ].map((step, i) => (
                <div key={i} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-aram-purple text-white rounded-full flex items-center justify-center text-lg font-bold min-w-[40px]">{step.num}</div>
                    {i < 3 && <div className="w-0.5 h-16 bg-aram-purple-100" />}
                  </div>
                  <div className="pt-1 pb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-aram-purple-100">
        <AnimatedSection className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-aram-purple-dark mb-4">Be Part of the Next Chapter</h2>
          <p className="text-aram-purple text-lg mb-6 leading-relaxed">
            The 2027 trip is in planning. Join the team now to be part of it.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 bg-aram-purple hover:bg-aram-purple-dark text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[52px]"
          >
            Join the Team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
