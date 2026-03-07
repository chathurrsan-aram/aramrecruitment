'use client';

import { useRouter } from 'next/navigation';
import { ventureSectors } from '@/data/venturesData';
import { useFounderModal } from './founder-modal';

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

export function TruePotentialBadge({ size = 'sm', clickable = true }) {
  const { open } = useFounderModal();
  const px = size === 'sm' ? 'px-2.5 py-0.5' : 'px-3 py-1';
  const text = size === 'sm' ? 'text-[11px]' : 'text-xs';

  if (clickable) {
    return (
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); open(); }}
        className={`inline-flex items-center gap-1 ${px} rounded-full bg-transparent border border-[#C9A84C] text-[#C9A84C] ${text} font-medium hover:bg-[#C9A84C]/15 transition-colors cursor-pointer`}
      >
        ✦ True Potential
      </button>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 ${px} rounded-full bg-transparent border border-[#C9A84C] text-[#C9A84C] ${text} font-medium`}>
      ✦ True Potential
    </span>
  );
}

/* ─── Portfolio Company Card (dark theme) ──────────────────────────── */
export function PortfolioCard({ company, onClick }) {
  return (
    <button
      onClick={() => onClick(company)}
      className="relative w-full text-left bg-[#1E2130] border border-[#2A2D3E] rounded-xl p-5 transition-all duration-200 hover:border-[#6D4A9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6D4A9E]/10 group"
      style={{ transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s' }}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <SectorPill sectorId={company.sector} />
        <StagePill stage={company.stage} />
      </div>
      <h3 className="font-display text-lg font-semibold text-white mb-1 group-hover:text-[#9B72CF] transition-colors">
        {company.name}
      </h3>
      <p className="text-sm text-[#A0A0B8] mb-3 line-clamp-2">{company.tagline}</p>
      <div className="flex items-center gap-3 text-xs text-[#7A7A9A]">
        <span className="font-mono">{company.region}</span>
        <span className="text-[#2A2D3E]">·</span>
        <span className="font-mono text-[#9B72CF]">Seeking £{(company.seeking / 1000).toFixed(0)}k</span>
      </div>
      {company.truePotential && (
        <div className="absolute bottom-3 right-3">
          <TruePotentialBadge />
        </div>
      )}
    </button>
  );
}

/* ─── Emerging Venture Card (dark theme) ───────────────────────────── */
export function EmergingCard({ venture, onClick }) {
  return (
    <button
      onClick={() => onClick(venture)}
      className="w-full text-left bg-[#1E2130] border border-dashed border-[#2A2D3E] rounded-xl p-5 transition-all duration-200 hover:border-[#C9A84C]/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#C9A84C]/5 group"
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <SectorPill sectorId={venture.sector} />
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C]">
          Opportunity
        </span>
      </div>
      <h3 className="font-display text-lg font-semibold text-white mb-1 group-hover:text-[#C9A84C] transition-colors">
        {venture.name}
      </h3>
      <p className="text-sm text-[#A0A0B8] mb-3 line-clamp-2">{venture.tagline}</p>
      <div className="flex items-center gap-3 text-xs text-[#7A7A9A]">
        <span className="font-mono">{venture.region}</span>
        <span className="text-[#2A2D3E]">·</span>
        <span className="font-mono text-[#C9A84C]">Est. Opportunity: {venture.estimateRange}</span>
      </div>
    </button>
  );
}

/* ─── Insight Card (dark theme) ────────────────────────────────────── */
export function VentureInsightCard({ insight, onClick }) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(insight);
    } else if (insight.insightPageSlug) {
      router.push(`/ventures/portal/insights/${insight.insightPageSlug}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left bg-[#1E2130] border rounded-xl p-5 transition-all duration-200 hover:border-[#6D4A9E] hover:-translate-y-0.5 hover:shadow-lg group ${
        insight.featured
          ? 'border-[#6D4A9E]/30 ring-1 ring-[#6D4A9E]/10'
          : 'border-[#2A2D3E]'
      }`}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {insight.sectors.map(s => <SectorPill key={s} sectorId={s} />)}
        {insight.insightPageSlug && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono text-[#9B72CF] bg-[#6D4A9E]/10 border border-[#6D4A9E]/20">
            Full Report
          </span>
        )}
      </div>
      <h3 className="font-display text-base font-semibold text-white mb-2 leading-snug group-hover:text-[#9B72CF] transition-colors">
        {insight.title}
      </h3>
      <p className="text-sm text-[#A0A0B8] leading-relaxed mb-3 line-clamp-3">{insight.summary}</p>
      <div className="flex items-center gap-3 text-xs text-[#7A7A9A]">
        <span className="font-mono">{insight.region}</span>
        <span className="text-[#2A2D3E]">·</span>
        <span>{insight.readTime} min read</span>
      </div>
    </button>
  );
}
