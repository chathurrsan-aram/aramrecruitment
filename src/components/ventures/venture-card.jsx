'use client';

import { ventureSectors } from '@/data/venturesData';

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

function StagePill({ stage }) {
  const colors = stage === 'pre-seed'
    ? { bg: '#6D4A9E', text: '#EDE8F5' }
    : { bg: '#1ABC9C', text: '#E0F7F3' };
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium capitalize"
      style={{ backgroundColor: `${colors.bg}20`, color: colors.bg, border: `1px solid ${colors.bg}30` }}
    >
      {stage}
    </span>
  );
}

export function TruePotentialBadge({ size = 'sm' }) {
  const px = size === 'sm' ? 'px-2.5 py-0.5' : 'px-3 py-1';
  const text = size === 'sm' ? 'text-[11px]' : 'text-xs';
  return (
    <span className={`inline-flex items-center gap-1 ${px} rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] ${text} font-medium`}>
      ✦ True Potential
    </span>
  );
}

/* ─── Portfolio Company Card ─────────────────────────────────────────── */
export function PortfolioCard({ company, onClick }) {
  return (
    <button
      onClick={() => onClick(company)}
      className="w-full text-left bg-[#13131F] border border-[#2A2A40] rounded-xl p-5 transition-all duration-200 hover:border-[#6D4A9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6D4A9E]/5 group"
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <SectorPill sectorId={company.sector} />
        <StagePill stage={company.stage} />
        {company.truePotential && <TruePotentialBadge />}
      </div>
      <h3 className="font-display text-lg font-semibold text-white mb-1 group-hover:text-[#9B72CF] transition-colors">
        {company.name}
      </h3>
      <p className="text-sm text-[#7A7A9A] mb-3 line-clamp-2">{company.tagline}</p>
      <div className="flex items-center gap-3 text-xs text-[#7A7A9A]">
        <span className="font-mono">{company.region}</span>
        <span className="text-[#2A2A40]">·</span>
        <span className="font-mono text-[#9B72CF]">Seeking £{(company.seeking / 1000).toFixed(0)}k</span>
      </div>
    </button>
  );
}

/* ─── Emerging Venture Card ──────────────────────────────────────────── */
export function EmergingCard({ venture, onClick }) {
  return (
    <button
      onClick={() => onClick(venture)}
      className="w-full text-left bg-[#13131F] border border-dashed border-[#2A2A40] rounded-xl p-5 transition-all duration-200 hover:border-[#C9A84C]/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#C9A84C]/5 group"
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <SectorPill sectorId={venture.sector} />
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C]">
          Emerging Opportunity
        </span>
      </div>
      <h3 className="font-display text-lg font-semibold text-white mb-1 group-hover:text-[#C9A84C] transition-colors">
        {venture.name}
      </h3>
      <p className="text-sm text-[#7A7A9A] mb-3 line-clamp-2">{venture.tagline}</p>
      <div className="flex items-center gap-3 text-xs text-[#7A7A9A]">
        <span className="font-mono">{venture.region}</span>
        <span className="text-[#2A2A40]">·</span>
        <span className="font-mono text-[#C9A84C]">Est. Opportunity: {venture.estimateRange}</span>
      </div>
    </button>
  );
}

/* ─── Insight Card (ventures dark theme) ─────────────────────────────── */
export function VentureInsightCard({ insight, onClick }) {
  return (
    <button
      onClick={() => onClick?.(insight)}
      className="w-full text-left bg-[#13131F] border border-[#2A2A40] rounded-xl p-5 transition-all duration-200 hover:border-[#6D4A9E] hover:-translate-y-0.5 hover:shadow-lg group"
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {insight.sectors.map(s => <SectorPill key={s} sectorId={s} />)}
      </div>
      <h3 className="font-display text-base font-semibold text-white mb-2 leading-snug group-hover:text-[#9B72CF] transition-colors">
        {insight.title}
      </h3>
      <p className="text-sm text-[#7A7A9A] leading-relaxed mb-3 line-clamp-2">{insight.summary}</p>
      <div className="flex items-center gap-3 text-xs text-[#7A7A9A]">
        <span className="font-mono">{insight.region}</span>
        <span className="text-[#2A2A40]">·</span>
        <span>{insight.readTime} min read</span>
      </div>
    </button>
  );
}
