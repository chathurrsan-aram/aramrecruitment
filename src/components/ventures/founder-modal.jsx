'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Cpu, Rocket } from 'lucide-react';

/* ─── Context ─────────────────────────────────────────────────────────────── */
const FounderModalContext = createContext({ open: () => {} });

export function useFounderModal() {
  return useContext(FounderModalContext);
}

/* ─── Provider + Modal ────────────────────────────────────────────────────── */
export function FounderModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const blocks = [
    {
      icon: Target,
      title: 'Strategy',
      desc: "The venture's problem is structured and stress-tested before any capital moves. A clear thesis, go-to-market plan and 90-day milestone set is in place from day one.",
    },
    {
      icon: Cpu,
      title: 'Technology',
      desc: 'Where the venture needs digital infrastructure, it gets built. From WhatsApp-native tools to full web platforms, the technical layer is delivered directly.',
    },
    {
      icon: Rocket,
      title: 'Delivery',
      desc: "True Potential acts as the embedded execution partner across the venture's early phase. Milestones are tracked, stakeholders coordinated, and blockers removed.",
    },
  ];

  return (
    <FounderModalContext.Provider value={{ open }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={close}
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed inset-x-4 top-[8%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[580px] max-h-[84vh] overflow-y-auto z-[60] rounded-2xl bg-white border border-gray-200 shadow-2xl"
            >
              <button
                onClick={close}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                {/* True Potential Logo */}
                <div className="flex justify-center mb-8">
                  <div className="px-6 py-3">
                    <svg width="200" height="48" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <text x="100" y="20" textAnchor="middle" fill="#C9A84C" fontFamily="Poppins, sans-serif" fontSize="14" fontWeight="700" letterSpacing="0.15em">TRUE</text>
                      <text x="100" y="40" textAnchor="middle" fill="#C9A84C" fontFamily="Poppins, sans-serif" fontSize="14" fontWeight="700" letterSpacing="0.15em">POTENTIAL</text>
                      <line x1="30" y1="24" x2="70" y2="24" stroke="#C9A84C" strokeWidth="0.5" opacity="0.4" />
                      <line x1="130" y1="24" x2="170" y2="24" stroke="#C9A84C" strokeWidth="0.5" opacity="0.4" />
                    </svg>
                  </div>
                </div>

                {/* Headline */}
                <h2 className="font-display text-2xl font-bold text-gray-900 text-center mb-4">
                  What True Potential backing means
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-sm text-center leading-relaxed mb-8">
                  True Potential is the execution layer behind select Aram Ventures portfolio companies. Backed ventures receive direct support across strategy, technology and delivery from a founder with a background in PE-grade strategy consulting and hands-on technical build.
                </p>

                {/* Three blocks */}
                <div className="space-y-4 mb-8">
                  {blocks.map(block => {
                    const Icon = block.icon;
                    return (
                      <div key={block.title} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                        <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-5 h-5 text-[#C9A84C]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm mb-1">{block.title}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{block.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Gold divider */}
                <div className="h-px bg-[#C9A84C]/30 mb-6" />

                {/* Bottom line */}
                <p className="text-center text-xs text-gray-400">
                  Built by Chathurrsan T, strategy consultant and founder of the Aram Initiative.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </FounderModalContext.Provider>
  );
}
