'use client';

import { ArrowRight } from 'lucide-react';
import { useFounderModal } from './founder-modal';

export default function TruePotentialBanner() {
  const { open } = useFounderModal();

  return (
    <button
      onClick={open}
      className="w-full py-3 px-6 flex items-center justify-center gap-3 text-sm hover:brightness-110 transition-all duration-200 bg-[#0D0D14] border-t border-[#2A2A40]"
      style={{ height: '44px' }}
    >
      <span className="text-[#C9A84C] font-semibold text-base tracking-wide">✦ TRUE POTENTIAL</span>
      <span className="text-[#C9A84C]/80 font-medium">
        The execution layer behind Aram Ventures
      </span>
      <span className="text-[#C9A84C]/60 hidden md:inline-flex items-center gap-1 ml-2">
        Learn more <ArrowRight className="w-3 h-3" />
      </span>
    </button>
  );
}
