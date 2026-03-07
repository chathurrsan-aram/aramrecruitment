'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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
              className="fixed inset-x-4 top-[8%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[580px] max-h-[84vh] overflow-y-auto z-[60] rounded-2xl border border-[#C9A84C]/20"
              style={{ backgroundColor: '#1B3A4B' }}
            >
              <button
                onClick={close}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                  <img
                    src="/images/tempImage5CilK3.jpeg"
                    alt="True Potential"
                    className="h-12 rounded-lg object-contain"
                  />
                </div>

                {/* Headline */}
                <h2 className="font-display text-2xl font-bold text-white text-center mb-4">
                  What does True Potential backing mean?
                </h2>
                <p className="text-[#A8C4D4] text-sm text-center leading-relaxed mb-8">
                  True Potential-backed ventures are directly supported by the founder — bringing PE-grade strategy thinking and hands-on technical execution to early-stage opportunities in Tamil Sri Lanka.
                </p>

                {/* Founder card */}
                <div className="bg-[#0D2B3A] rounded-xl border border-[#2A4A5A] p-6 mb-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#C9A84C]/60 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-lg font-bold text-[#0D2B3A]">F</span>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">[FOUNDER NAME]</h3>
                      <p className="text-[#A8C4D4] text-sm">Strategy Consultant & Founder, Aram Ventures</p>
                      <p className="text-[#A8C4D4]/60 text-xs mt-0.5">Age 25 · London, UK · Sri Lankan Tamil</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: '📊', title: 'Strategy & Due Diligence', desc: 'Commercial due diligence for PE firms across fintech, wealth management and data — delivered at PwC, Alpha FMC, Marathon Capital and McKinsey' },
                      { icon: '🌍', title: 'Founded Aram', desc: '4 years building the diaspora organisation behind this platform — 500+ members, original field research, grassroots development projects across Sri Lanka' },
                      { icon: '⚙️', title: 'Strategy + Builder', desc: 'Can structure a problem at consulting speed and build the technical solution — websites, automations, AI-powered workflows' },
                      { icon: '✦', title: 'Known for', desc: 'Breaking ambiguous, complex problems into structured, executable plans. Every client and collaborator says the same thing.' },
                    ].map(row => (
                      <div key={row.title} className="flex items-start gap-3 p-3 rounded-lg bg-[#1B3A4B] border border-[#2A4A5A]">
                        <span className="text-base flex-shrink-0 mt-0.5">{row.icon}</span>
                        <div>
                          <p className="font-semibold text-sm text-white mb-0.5">{row.title}</p>
                          <p className="text-xs text-[#A8C4D4] leading-relaxed">{row.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gold divider */}
                <div className="h-px bg-[#C9A84C]/30 mb-6" />

                {/* Bottom line */}
                <p className="text-center text-sm text-[#A8C4D4]/60">
                  When you see the True Potential badge, this is who&apos;s behind it.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </FounderModalContext.Provider>
  );
}
