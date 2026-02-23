'use client';

import { useState } from 'react';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { Download, FileText, ArrowRight } from 'lucide-react';

const reports = [
  {
    title: 'Aram Trip Report 2024',
    description: '30 volunteers across hill country, eastern, and northern provinces. Healthcare camps, career talks, mentoring pilots, and technology workshops.',
    url: 'https://aram.org.uk/wp-content/uploads/2024/12/aram-2024-trip-report-1.pdf',
    year: '2024',
    type: 'Trip Report',
  },
  {
    title: 'Aram Trip Report 2023',
    description: 'Inaugural trip with 20 volunteers supported by Tamil Aid. Two weeks of workshops, infrastructure projects, and community engagement.',
    url: 'https://aram.org.uk/wp-content/uploads/2025/02/aram-trip-report-2023vf.pdf',
    year: '2023',
    type: 'Trip Report',
  },
  {
    title: 'How We Organise Our Impact',
    description: 'Our framework for structuring volunteer trips, research, and long-term initiatives across Sri Lanka.',
    url: 'https://aram.org.uk/wp-content/uploads/2026/01/how-we-organise-our-impact-1.pdf',
    year: '2026',
    type: 'Framework',
  },
  {
    title: 'Aram Trip 2026 FAQ',
    description: 'Everything you need to know about the upcoming Aram Trip 2026 — logistics, expectations, and preparation.',
    url: 'https://aram.org.uk/wp-content/uploads/2026/01/aram-trip-2026-1.pdf',
    year: '2026',
    type: 'FAQ',
  },
];

const YEARS = ['2026', '2025', '2024', '2023'];

export default function ReportsPage() {
  const [activeYear, setActiveYear] = useState(null);

  const filtered = activeYear
    ? reports.filter((r) => r.year === activeYear)
    : reports;

  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-10 md:pt-40 md:pb-14 bg-aram-warm-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-aram-green-900 mb-4">
              Reports & <span className="text-aram-purple">Resources</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-aram-warm-500 leading-relaxed">
              Download our trip reports, frameworks, and key documents.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Year toggle */}
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <button
              onClick={() => setActiveYear(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeYear === null
                  ? 'bg-aram-purple text-white shadow-md'
                  : 'bg-aram-warm-100 text-aram-warm-500 hover:bg-aram-warm-200'
              }`}
            >
              All
            </button>
            {YEARS.map((year) => {
              const count = reports.filter((r) => r.year === year).length;
              return (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeYear === year
                      ? 'bg-aram-purple text-white shadow-md'
                      : 'bg-aram-warm-100 text-aram-warm-500 hover:bg-aram-warm-200'
                  }`}
                >
                  {year}
                  {count > 0 && (
                    <span className={`ml-1.5 text-xs ${activeYear === year ? 'text-white/70' : 'text-aram-warm-300'}`}>
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {filtered.length > 0 ? (
            <StaggerContainer key={activeYear || 'all'} className="space-y-5" staggerDelay={0.1}>
              {filtered.map((report) => (
                <StaggerItem key={report.title}>
                  <a
                    href={report.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-5 rounded-xl border border-aram-warm-200 bg-white p-6 transition-all hover:border-aram-purple hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-aram-green-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-aram-green-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[11px] text-aram-purple">{report.year}</span>
                        <span className="font-mono text-[11px] text-aram-warm-300">{report.type}</span>
                      </div>
                      <h2 className="font-display text-lg font-semibold text-aram-green-900 mb-1 group-hover:text-aram-purple transition-colors">
                        {report.title}
                      </h2>
                      <p className="text-sm text-aram-warm-500 leading-relaxed">{report.description}</p>
                    </div>
                    <Download className="w-5 h-5 text-aram-warm-300 group-hover:text-aram-purple transition-colors flex-shrink-0 mt-1" />
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-aram-warm-100 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-aram-warm-300" />
              </div>
              <p className="text-aram-warm-400 font-medium mb-1">No documents for {activeYear}</p>
              <p className="text-sm text-aram-warm-300">Check back later or browse another year.</p>
            </div>
          )}

          <Reveal delay={0.4} className="mt-12 text-center">
            <p className="text-sm text-aram-warm-400 mb-3">Want to read our research insights?</p>
            <a href="/research?view=macro" className="inline-flex items-center gap-2 text-aram-green-900 font-semibold hover:text-aram-purple transition-colors">
              Browse Research & Insights <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
