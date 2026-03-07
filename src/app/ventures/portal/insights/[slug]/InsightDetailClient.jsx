'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, TrendingUp, AlertTriangle, Users, BarChart3, Zap } from 'lucide-react';
import { insightPages } from '@/data/insightPages';
import { ventureSectors } from '@/data/venturesData';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/motion';

function SectorPill({ sectorId }) {
  const sector = ventureSectors.find(s => s.id === sectorId);
  if (!sector) return null;
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium"
      style={{ backgroundColor: `${sector.color}15`, color: sector.color, border: `1px solid ${sector.color}30` }}
    >
      {sector.name}
    </span>
  );
}

export default function InsightDetailClient() {
  const params = useParams();
  const router = useRouter();
  const page = insightPages.find(p => p.slug === params.slug);

  if (!page) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
        <p className="text-lg">Insight not found</p>
        <button
          onClick={() => router.push('/ventures/portal/insights')}
          className="mt-4 text-[#6D4A9E] hover:text-gray-900 transition-colors text-sm"
        >
          Back to Insights
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Back link */}
      <Reveal>
        <button
          onClick={() => router.push('/ventures/portal/insights')}
          className="flex items-center gap-1.5 text-gray-400 hover:text-gray-900 transition-colors text-sm mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Insights
        </button>
      </Reveal>

      {/* Header */}
      <Reveal delay={0.05}>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {page.sectors.map(s => <SectorPill key={s} sectorId={s} />)}
          <span className="text-gray-400 text-xs font-mono">{page.region}</span>
          <span className="text-gray-200">|</span>
          <span className="flex items-center gap-1 text-gray-400 text-xs">
            <Clock className="w-3 h-3" /> {page.readTime} min read
          </span>
        </div>
      </Reveal>

      {/* ── TOP LINE ─────────────────────────────────────────────────────── */}
      <Reveal delay={0.1}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
          {page.topLine}
        </h1>
      </Reveal>

      <div className="h-px bg-gradient-to-r from-[#6D4A9E]/40 via-[#6D4A9E]/10 to-transparent mb-8" />

      {/* ── OBSERVATION ──────────────────────────────────────────────────── */}
      <Reveal delay={0.15}>
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#6D4A9E] mb-3 flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5" /> Observation
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-600">
            {page.observation}
          </p>
        </section>
      </Reveal>

      <div className="h-px bg-gray-200 mb-8" />

      {/* ── KEY METRICS STRIP ────────────────────────────────────────────── */}
      <Reveal delay={0.2}>
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#6D4A9E] mb-4 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" /> Key Metrics
          </h2>
          <StaggerContainer staggerDelay={0.07} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {page.keyMetrics.map((metric, i) => (
              <StaggerItem key={i}>
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#6D4A9E]/30 transition-colors shadow-sm">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">{metric.label}</p>
                  <p className="text-xl font-bold text-gray-900 font-mono mb-1">{metric.value}</p>
                  <p className="text-xs text-gray-500 leading-snug">{metric.context}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </Reveal>

      <div className="h-px bg-gray-200 mb-8" />

      {/* ── WHY NOW ──────────────────────────────────────────────────────── */}
      <Reveal delay={0.25}>
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#6D4A9E] mb-4 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> Why Now
          </h2>
          <div className="space-y-3">
            {page.whyNow.map((item, i) => (
              <div key={i} className="flex gap-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex-shrink-0 mt-0.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#6D4A9E]/10 text-[#6D4A9E] border border-[#6D4A9E]/15">
                    {item.catalyst}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <div className="h-px bg-gray-200 mb-8" />

      {/* ── INVESTMENT PARAMETERS ────────────────────────────────────────── */}
      <Reveal delay={0.3}>
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#6D4A9E] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5" /> Investment Parameters
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-0.5">Market Opportunity</p>
                <p className="text-base font-semibold text-gray-900">{page.investmentParameters.marketOpportunity}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-0.5">Timeline</p>
                <p className="text-base font-semibold text-gray-900">{page.investmentParameters.timeline}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-0.5">Ticket Size</p>
                <p className="text-sm text-gray-900">
                  <span className="text-[#6D4A9E]">Angel/HNW:</span> {page.investmentParameters.ticketSize.angel}
                  {page.investmentParameters.ticketSize.institutional && (
                    <span className="ml-3"><span className="text-[#6D4A9E]">Institutional:</span> {page.investmentParameters.ticketSize.institutional}</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-0.5">Risk Level</p>
                <p className="text-base font-semibold">
                  <span className={
                    page.investmentParameters.riskLevel === 'High' ? 'text-[#C85C5C]' :
                    page.investmentParameters.riskLevel === 'Very High' ? 'text-red-500' :
                    'text-[#C9A84C]'
                  }>
                    {page.investmentParameters.riskLevel}
                  </span>
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">Key Risk</p>
              <p className="text-sm text-gray-600 leading-relaxed">{page.investmentParameters.keyRisk}</p>
            </div>
          </div>
        </section>
      </Reveal>

      <div className="h-px bg-gray-200 mb-8" />

      {/* ── NAMED PLAYERS ────────────────────────────────────────────────── */}
      <Reveal delay={0.35}>
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#6D4A9E] mb-4 flex items-center gap-2">
            <Users className="w-3.5 h-3.5" /> Named Players
          </h2>
          <StaggerContainer staggerDelay={0.06} className="space-y-2">
            {page.namedPlayers.map((player, i) => (
              <StaggerItem key={i}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-[#6D4A9E]/20 transition-colors shadow-sm">
                  <div className="flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-900">{player.name}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed sm:border-l sm:border-gray-200 sm:pl-3">
                    {player.description} - <span className="text-gray-700">{player.relevance}</span>
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </Reveal>

      {/* Footer spacer */}
      <div className="h-8" />
    </div>
  );
}
