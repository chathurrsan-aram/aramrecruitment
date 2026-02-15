'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

const impactStats = [
  { value: '3', label: 'Trips to Sri Lanka' },
  { value: '100+', label: 'Volunteers Mobilised' },
  { value: '£40k+', label: 'Raised for Communities' },
  { value: '6', label: 'Focus Sectors' },
];

const sectors = [
  { name: 'Healthcare', desc: 'Health camps, nutrition programs, and mental health awareness.', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { name: 'Education', desc: 'Career guidance, mentoring, and curriculum support for schools.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { name: 'Technology', desc: 'Digital skills training and IT infrastructure support.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'SEN', desc: 'Supporting children with disabilities and their families.', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { name: 'Wellbeing', desc: 'Mental health awareness, life skills, and safeguarding.', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { name: 'Economic Development', desc: 'Livelihoods, entrepreneurship, and cooperative development.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
];

export default function HomePage() {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setPageLoaded(true));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/Community.png"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center top' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
          <div
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}
          >
            Tamil Diaspora-Led Initiative
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
            }}
          >
            Building a Thriving
            <span className="block">Sri Lanka</span>
          </h1>
          <p
            className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
            }}
          >
            Aram unites the next generation of diaspora to create sustainable impact — through presence, not just funding.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s',
            }}
          >
            <Link
              href="/join"
              className="bg-white text-aram-purple font-bold py-3 px-8 rounded-full hover:bg-aram-purple-50 transition-all duration-200 hover:scale-[1.02] min-h-[48px] flex items-center justify-center"
            >
              Join the Team
            </Link>
            <Link
              href="/about"
              className="border-2 border-white/50 text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] min-h-[48px] flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div
            className="mt-14 pb-8 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl mx-auto"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s',
            }}
          >
            {impactStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              Impact Through Presence
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The crises scattered Tamils across the world. We grew up in the UK, Canada, Australia, Europe. We built careers, learned skills, and had opportunities that our brothers and sisters back home haven't had. Aram exists to channel that back — not someday, but now.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-aram-purple-50 rounded-2xl p-6 border border-aram-purple-100 text-center">
                <div className="w-12 h-12 bg-aram-purple rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">On the Ground</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Three years of annual trips. Over 100 young diaspora reconnecting with communities across Sri Lanka.
                </p>
              </div>
              <div className="bg-sector-bg rounded-2xl p-6 border border-sector/20 text-center">
                <div className="w-12 h-12 bg-sector rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Year-Round</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Impact doesn't stop after the trip. Mentorship, research, and initiatives run throughout the year.
                </p>
              </div>
              <div className="bg-priority-bg rounded-2xl p-6 border border-priority/20 text-center">
                <div className="w-12 h-12 bg-priority rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Youth-Led</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Every team member is a young professional or student. We prove you don't need to wait to make a difference.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What We Do - Sectors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What We Do</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Six sectors. One mission. Sustainable change across Sri Lanka.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectors.map((sector, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-aram-purple/30 hover:shadow-lg transition-all duration-200 h-full">
                  <div className="w-10 h-10 bg-aram-purple-50 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-aram-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sector.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{sector.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{sector.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10" delay={0.3}>
            <Link
              href="/initiatives"
              className="inline-flex items-center gap-2 text-aram-purple font-semibold hover:text-aram-purple-dark transition-colors"
            >
              Explore all initiatives
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Trip Highlight */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <AnimatedSection>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/images/Hope.jpg"
                  alt="Aram volunteers in Sri Lanka"
                  className="w-full h-[350px] object-cover"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Aram Trip</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Every year, 40+ volunteers travel to Sri Lanka to deliver healthcare camps, education workshops, technology training, and community development. It's where everything comes together.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Three successful trips. Trust built on the ground by showing up — not just talking. And each year, we go further.
              </p>
              <Link
                href="/trip"
                className="inline-flex items-center gap-2 bg-aram-purple hover:bg-aram-purple-dark text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                Learn about the trip
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-aram-purple via-aram-purple-dark to-[#3D2266]">
        <AnimatedSection className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Ready to Build Something That Matters?
          </h2>
          <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl mx-auto">
            We're looking for driven young Tamils who want to give back. Whether you have 2 hours a week or 10, there's a place for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/join"
              className="bg-white text-aram-purple font-bold py-4 px-10 rounded-full text-lg hover:bg-aram-purple-50 transition-all duration-200 hover:scale-[1.02] min-h-[52px] flex items-center justify-center"
            >
              Join the Team
            </Link>
            <Link
              href="/initiatives#mentorship"
              className="border-2 border-white/50 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] min-h-[52px] flex items-center justify-center"
            >
              Become a Mentor
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
