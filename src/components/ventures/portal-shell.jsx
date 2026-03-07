'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, TrendingUp, BookOpen, Map, LayoutGrid } from 'lucide-react';
import TruePotentialBanner from './true-potential-banner';

const portalTabs = [
  { href: '/ventures/portal/portfolio', label: 'Your Portfolio', icon: Briefcase },
  { href: '/ventures/portal/emerging', label: 'Opportunities', icon: TrendingUp },
  { href: '/ventures/portal/insights', label: 'Insights', icon: BookOpen },
];

/* ─── Segmented Control ────────────────────────────────────────────────── */
function PortalSegmentedControl({ tabs, activeHref }) {
  const activeIdx = tabs.findIndex(t => activeHref.startsWith(t.href));
  return (
    <div className="relative flex bg-[#1A1A2E] rounded-xl p-1">
      {tabs.map((tab, idx) => {
        const Icon = tab.icon;
        const isActive = activeHref.startsWith(tab.href);
        const isPortfolioActive = isActive && tab.href.includes('portfolio');
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative z-10 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex-1 text-center ${
              isPortfolioActive
                ? 'bg-[#6D4A9E] text-white'
                : isActive
                  ? 'bg-[#6D4A9E]/20 text-[#9B72CF]'
                  : 'text-[#7A7A9A] hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4 hidden sm:block" />
            <span className="hidden md:inline">{tab.label}</span>
            <span className="md:hidden text-xs">{tab.label.split(' ').pop()}</span>
          </Link>
        );
      })}
    </div>
  );
}

/* ─── Map/Cards Toggle (light theme) ───────────────────────────────────── */
export function ViewToggle({ isCards, onChange }) {
  return (
    <div className="relative flex bg-gray-100 rounded-lg p-0.5">
      <div
        className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] bg-white rounded-md shadow-sm transition-transform duration-300 ease-in-out ${
          isCards ? 'translate-x-[calc(100%+2px)]' : 'translate-x-0'
        }`}
        style={{ left: '2px' }}
      />
      <button
        onClick={() => onChange(false)}
        className={`relative z-10 flex items-center justify-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 ${
          !isCards ? 'text-[#6D4A9E]' : 'text-gray-400'
        }`}
      >
        <Map className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Map</span>
      </button>
      <button
        onClick={() => onChange(true)}
        className={`relative z-10 flex items-center justify-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 ${
          isCards ? 'text-[#6D4A9E]' : 'text-gray-400'
        }`}
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Cards</span>
      </button>
    </div>
  );
}

/* ─── Portal Shell ───────────────────────────────────────────────────── */
export default function PortalShell({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 flex flex-col">
      {/* Portal Nav: stays dark */}
      <header className="sticky top-0 z-40 bg-[#0D0D14]/95 backdrop-blur-xl border-b border-[#2A2A40]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link href="/ventures" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/images/Gemini_Generated_Image_sdboy7sdboy7sdbo-2.png"
              alt="Aram Ventures"
              className="h-10"
              style={{ mixBlendMode: 'lighten' }}
            />
          </Link>

          {/* Tabs */}
          <div className="flex-1 flex justify-center">
            <PortalSegmentedControl tabs={portalTabs} activeHref={pathname} />
          </div>

          {/* Demo badge */}
          <span className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-[10px] font-mono tracking-wider uppercase">
            Demo
          </span>
        </div>
      </header>

      {/* Tab Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* True Potential Footer Banner */}
      <TruePotentialBanner />
    </div>
  );
}
