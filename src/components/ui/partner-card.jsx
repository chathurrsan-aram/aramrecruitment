'use client';

import SectorTag from './sector-tag';

export default function PartnerCard({ partner }) {
  return (
    <div className="rounded-xl border border-aram-warm-200 bg-white p-5 transition-all hover:border-aram-gold-500 hover:-translate-y-0.5 hover:shadow-lg min-w-[260px]">
      <div className="w-10 h-10 rounded-lg bg-aram-green-100 flex items-center justify-center mb-3">
        <span className="font-display text-sm font-bold text-aram-green-900">
          {partner.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
        </span>
      </div>
      <h3 className="font-display text-base font-semibold text-aram-green-900 mb-1">
        {partner.name}
      </h3>
      <p className="text-sm text-aram-warm-400 mb-3 leading-relaxed">
        {partner.oneLiner}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {partner.sectors.map((s) => (
          <SectorTag key={s} sector={s} />
        ))}
      </div>
    </div>
  );
}
