'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import { videos } from '@/lib/cloudinary';

export default function AboutPage() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-aram-purple via-aram-purple-dark to-[#3D2266]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-priority rounded-full blur-3xl" />
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
            About Aram
          </h1>
          <p
            className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
            }}
          >
            A movement of young diaspora Tamils giving back to Sri Lanka — through presence, skills, and sustained commitment.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                The crises scattered Tamils across the world. We grew up in the UK, Canada, Australia, Europe. We built careers, learned skills, and had opportunities that our brothers and sisters back home haven't had. But most of us stayed connected to a place we barely knew.
              </p>
              <p>
                For our parents' generation, giving back meant sending money. And that matters. But we wanted more than that. We wanted to reconnect to our roots through the work itself — not just fund it from a distance.
              </p>
              <p>
                Aram exists to unite the next generation of diaspora to give back. Not someday when we're older and established. Now, with what we have.
              </p>
              <p>
                In our first year, we wanted to break a myth: that you need to be older, well-connected, know the areas inside out, and have money to create impact. We didn't have any of that. We just showed up.
              </p>
              <p>
                Three years in, we've taken over 100 young diaspora back home. We've built trust on the ground by being there, not just talking. No one else is doing this, and it can't be replicated easily, because trust takes time.
              </p>
              <p>
                Now we're building the foundations for something bigger. Long-term projects. Sustainable systems. Showing up consistently until the work speaks for itself.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Video */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <video
                className="w-full aspect-video bg-gray-900"
                controls
                preload="metadata"
                poster="/images/Hope.jpg"
              >
                <source src={videos.heroMain} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What We Believe</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Presence over cheques',
                desc: 'Real impact comes from showing up — building relationships, understanding needs, and working alongside communities.',
              },
              {
                title: 'Young people can lead',
                desc: "You don't need to be older, richer, or more connected. You need to care enough to commit and follow through.",
              },
              {
                title: 'Trust takes time',
                desc: "We've spent three years building trust on the ground. That's our greatest asset and it compounds with every trip.",
              },
              {
                title: 'Sustainable over spectacular',
                desc: "We'd rather build systems that last than create one-off moments. The goal is lasting change, not photo ops.",
              },
            ].map((belief, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-full">
                  <h3 className="font-bold text-gray-900 mb-2">{belief.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{belief.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              Everyone on the team has a full-time job or university alongside this. We're not asking you to drop everything, but we need people who can commit a few hours a week and follow through.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">What we look for:</h3>
              <ul className="space-y-3">
                {[
                  'People who lead by default, not by title',
                  'People who commit consistently — not huge hours, but reliably showing up week after week',
                  'People who are comfortable with ambiguity and building as they go',
                  'People who feel the pull to do something for the communities back home that gave us everything',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-aram-purple mt-0.5 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-6">
            <div className="bg-gradient-to-r from-aram-purple-100/50 to-priority-bg/50 rounded-2xl p-8 border border-aram-purple-100">
              <h3 className="font-bold text-gray-900 mb-4">What you get:</h3>
              <ul className="space-y-3">
                {[
                  'Ownership of real work from day one',
                  "A community of driven young Tamils building something together that doesn't exist anywhere else",
                  'Impact you can see with your own eyes on the ground',
                  'Skills and experience from people who are strong operators in their own careers',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-aram-purple mt-0.5 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-aram-purple-100">
        <AnimatedSection className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-aram-purple-dark mb-4">Want to Be Part of This?</h2>
          <p className="text-aram-purple text-lg mb-6 leading-relaxed">
            If that sounds like you, we'd love to have you.
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
