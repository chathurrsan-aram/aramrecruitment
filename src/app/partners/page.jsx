'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import SectorTag from '@/components/ui/sector-tag';
import { partners } from '@/data/partners';
import { regions } from '@/data/regions';
import { sectors } from '@/data/sectors';
import { Search, X, ArrowLeft } from 'lucide-react';

export default function PartnersPage() {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);

  const filtered = partners.filter((p) => {
    if (selectedRegion && p.region !== selectedRegion) return false;
    if (selectedSector && !p.sectors.includes(selectedSector)) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !p.name.toLowerCase().includes(q) &&
        !p.oneLiner.toLowerCase().includes(q) &&
        !p.description.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-14 bg-aram-warm-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 text-sm text-aram-warm-400 hover:text-aram-green-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research & Insights
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-aram-green-900 mb-4">
              Partners <span className="text-aram-purple">Directory</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-aram-warm-500 leading-relaxed mb-8">
              The organisations and individuals we work alongside in Sri Lanka.
            </p>
          </Reveal>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-aram-warm-300" />
            <input
              type="text"
              placeholder="Search partners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-xl border border-aram-warm-200 bg-white text-sm text-aram-green-900 placeholder:text-aram-warm-300 focus:outline-none focus:ring-2 focus:ring-aram-purple/30 focus:border-aram-purple transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-aram-warm-300 hover:text-aram-warm-500" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-aram-warm-200">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <div className="flex flex-wrap gap-2">
            {/* Region filters */}
            <button
              onClick={() => setSelectedRegion(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                !selectedRegion ? 'bg-aram-green-900 text-white' : 'bg-aram-warm-100 text-aram-warm-400 hover:text-aram-green-900'
              }`}
            >
              All Regions
            </button>
            {regions.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(selectedRegion === r.id ? null : r.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedRegion === r.id ? 'bg-aram-green-900 text-white' : 'bg-aram-warm-100 text-aram-warm-400 hover:text-aram-green-900'
                }`}
              >
                {r.name}
              </button>
            ))}

            <div className="w-px h-6 bg-aram-warm-200 mx-1 self-center" />

            {/* Sector filters */}
            {sectors.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSector(selectedSector === s.id ? null : s.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedSector === s.id ? 'bg-aram-purple text-white' : 'bg-aram-warm-100 text-aram-warm-400 hover:text-aram-green-900'
                }`}
              >
                {s.icon} {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Partner cards */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <p className="text-sm text-aram-warm-400 mb-6 font-mono">
          {filtered.length} {filtered.length === 1 ? 'partner' : 'partners'}
          {selectedRegion && ` in ${regions.find(r => r.id === selectedRegion)?.name}`}
          {selectedSector && ` · ${sectors.find(s => s.id === selectedSector)?.name}`}
        </p>

        <StaggerContainer className="grid md:grid-cols-2 gap-5" staggerDelay={0.06}>
          {filtered.map((partner) => {
            const region = regions.find(r => r.id === partner.region);
            return (
              <StaggerItem key={partner.id}>
                <div className="rounded-xl border border-aram-warm-200 bg-white p-6 transition-all hover:border-aram-purple hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-aram-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-sm font-bold text-aram-green-900">
                        {partner.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold text-aram-green-900 mb-0.5">{partner.name}</h3>
                      {region && (
                        <p className="text-xs text-aram-warm-300 font-mono mb-2">{region.name}</p>
                      )}
                      <p className="text-sm text-aram-warm-500 font-medium mb-2">{partner.oneLiner}</p>
                      <p className="text-sm text-aram-warm-400 leading-relaxed mb-3">{partner.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {partner.sectors.map((s) => (
                          <SectorTag key={s} sector={s} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-aram-warm-400 text-sm">No partners match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
