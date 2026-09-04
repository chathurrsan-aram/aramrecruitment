'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import StatusBadge from '@/components/initiatives/StatusBadge';
import SectorTag from '@/components/initiatives/SectorTag';
import ProjectDetails from '@/components/initiatives/ProjectDetails';

export default function InitiativeDetail({ initiative }) {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => setPageLoaded(true));
  }, []);

  if (!initiative) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Initiative Not Found</h1>
          <Link href="/initiatives" className="text-aram-purple hover:text-aram-purple-dark font-medium">
            &larr; Back to Initiatives
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{ opacity: pageLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
    >
      {/* Back button + Title */}
      <section className="pt-28 pb-8 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/initiatives"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-aram-purple transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Initiatives
          </Link>

          <div
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {initiative.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="pb-10">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="relative rounded-2xl overflow-hidden aspect-[21/9]">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${initiative.sectorColor}88, ${initiative.sectorColor}cc)`,
                }}
              />
              {initiative.image && (
                <img
                  src={initiative.image}
                  alt={initiative.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <StatusBadge status={initiative.status} />
              </div>
              <div className="absolute top-4 right-4">
                <SectorTag sector={initiative.sector} color={initiative.sectorColor} />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <span>{initiative.flag}</span>
                  <span>{initiative.region}</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Metadata bar */}
      <section className="pb-10">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection delay={0.05}>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Sector:</span>
                <SectorTag sector={initiative.sector} color={initiative.sectorColor} />
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-gray-500 font-medium">Region:</span>
                {initiative.flag} {initiative.region}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Status:</span>
                <StatusBadge status={initiative.status} />
              </div>
              {initiative.partner && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-gray-500 font-medium">Partner:</span>
                  {initiative.partner}
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Description */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection delay={0.1}>
            <div className="space-y-5 text-gray-600 leading-relaxed text-[15px]">
              {initiative.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Evolution timeline (for Virtual Mentorship) */}
      {initiative.evolution && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection delay={0.12}>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-aram-purple rounded-full"></span>
                Our Evolution
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                {initiative.evolution.map((step, i) => (
                  <div key={i} className="flex-1 relative">
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 h-full">
                      <div className="text-2xl font-bold text-aram-purple mb-1">{step.year}</div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">{step.label}</div>
                      <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                    {i < initiative.evolution.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 text-gray-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* The Need (for Virtual Mentorship) */}
      {initiative.theNeed && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection delay={0.13}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-priority rounded-full"></span>
                The Need
              </h2>
              <ul className="space-y-2">
                {initiative.theNeed.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 text-[15px] leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-priority rounded-full mt-2.5 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Objectives (for Pen Pal) */}
      {initiative.objectives && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection delay={0.12}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-sector rounded-full"></span>
                Objectives
              </h2>
              <ul className="space-y-3">
                {initiative.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 text-[15px] leading-relaxed">
                    <svg className="w-5 h-5 text-sector flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {obj}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* How It Works */}
      {initiative.howItWorks && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection delay={0.15}>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-aram-purple rounded-full"></span>
                How It Works
              </h2>
              <div className="space-y-6">
                {initiative.howItWorks.map((step, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">{step.phase}</h3>
                    <p className="text-gray-600 text-[15px] leading-relaxed">{step.content}</p>
                  </div>
                ))}
              </div>
              {initiative.loanInfo && (
                <div className="mt-6 bg-gradient-to-r from-aram-purple-50 to-sector-bg/30 rounded-xl p-6 border border-aram-purple-100">
                  <p className="text-gray-700 text-[15px] leading-relaxed">{initiative.loanInfo}</p>
                </div>
              )}
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Aram's Role (for Microcredit) */}
      {initiative.aramRole && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection delay={0.18}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-aram-purple rounded-full"></span>
                Aram&apos;s Role
              </h2>
              <ul className="space-y-2">
                {initiative.aramRole.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 text-[15px] leading-relaxed">
                    <svg className="w-5 h-5 text-aram-purple flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Impact Measurement (for Virtual Mentorship) */}
      {initiative.impactMeasurement && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection delay={0.18}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-sector rounded-full"></span>
                Impact Measurement
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Short-term</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{initiative.impactMeasurement.shortTerm}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Long-term</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{initiative.impactMeasurement.longTerm}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Benefits (for Virtual Mentorship) */}
      {initiative.benefits && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection delay={0.2}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-aram-purple-50 rounded-xl p-6 border border-aram-purple-100">
                  <h3 className="font-bold text-gray-900 mb-3">For Mentees</h3>
                  <ul className="space-y-2">
                    {initiative.benefits.forMentees.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-aram-purple flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-sector-bg rounded-xl p-6 border border-sector/20">
                  <h3 className="font-bold text-gray-900 mb-3">For Mentors</h3>
                  <ul className="space-y-2">
                    {initiative.benefits.forMentors.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-sector flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Progress */}
      {initiative.progress && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection delay={0.2}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-sector rounded-full"></span>
                Current Progress
              </h2>
              <div className="bg-gradient-to-r from-sector-bg to-aram-purple-50 rounded-xl p-6 border border-sector/20">
                <ul className="space-y-2">
                  {initiative.progress.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px] leading-relaxed">
                      <svg className="w-5 h-5 text-sector flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Volunteer Note (for Pen Pal) */}
      {initiative.volunteerNote && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection delay={0.22}>
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">Volunteers Needed</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{initiative.volunteerNote}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Future Vision */}
      {initiative.futureVision && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection delay={0.25}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-priority rounded-full"></span>
                Future Vision
              </h2>
              <ul className="space-y-2">
                {initiative.futureVision.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 text-[15px] leading-relaxed">
                    <svg className="w-5 h-5 text-priority flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Project Details (expandable) */}
      {initiative.details && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection delay={0.28}>
              <ProjectDetails details={initiative.details} />
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <AnimatedSection className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Get Involved</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            This initiative needs people like you. Whether through volunteering, mentoring, or contributing expertise, there are ways to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={initiative.cta.primary.href}
              className="bg-aram-purple hover:bg-aram-purple-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[48px] flex items-center justify-center gap-2"
            >
              {initiative.cta.primary.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href={initiative.cta.secondary.href}
              className="border-2 border-aram-purple text-aram-purple hover:bg-aram-purple-50 font-bold py-3 px-8 rounded-full transition-all duration-200 min-h-[48px] flex items-center justify-center"
            >
              {initiative.cta.secondary.label}
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
