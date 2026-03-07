'use client';

import { ArrowRight } from 'lucide-react';
import { useFounderModal } from './founder-modal';

export default function TruePotentialBanner() {
  const { open } = useFounderModal();

  return (
    <button
      onClick={open}
      className="w-full py-3 px-6 flex items-center justify-center gap-3 text-sm hover:brightness-110 transition-all duration-200"
      style={{ backgroundColor: '#1B3A4B', height: '44px' }}
    >
      <img
        src="/images/tempImage5CilK3.jpeg"
        alt="True Potential"
        className="h-5 rounded object-contain"
      />
      <span className="text-[#C9A84C] font-medium">
        ✦ True Potential · The execution layer behind Aram Ventures
      </span>
      <span className="text-[#C9A84C]/60 hidden md:inline-flex items-center gap-1 ml-2">
        Who&apos;s behind this? <ArrowRight className="w-3 h-3" />
      </span>
    </button>
  );
}
