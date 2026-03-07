'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

export default function TruePotentialBanner() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Persistent footer banner */}
      <button
        onClick={() => setModalOpen(true)}
        className="w-full bg-[#13131F] border-t border-[#C9A84C]/20 py-3 px-6 flex items-center justify-center gap-3 text-sm hover:bg-[#1A1A2E] transition-colors duration-200"
      >
        <span className="text-[#C9A84C] font-medium">✦ True Potential</span>
        <span className="text-[#2A2A40]">|</span>
        <span className="text-[#7A7A9A] hidden sm:inline">The execution arm of Aram Ventures</span>
        <span className="text-[#2A2A40] hidden sm:inline">|</span>
        <span className="text-[#7A7A9A] hidden md:inline">Strategy · Delivery · Tech</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] max-h-[80vh] overflow-y-auto bg-[#13131F] border border-[#C9A84C]/30 rounded-2xl z-50 p-8"
            >
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-[#7A7A9A] hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>

              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-medium mb-6">
                ✦ True Potential
              </span>

              <h2 className="font-display text-2xl font-bold text-white mb-2">Partners in Strategy. Structure. Execution.</h2>
              <p className="text-[#7A7A9A] leading-relaxed mb-8">
                True Potential is the operating arm of Aram Ventures. It provides strategy, project delivery and tech enablement to portfolio companies — taking equity and success fees rather than day rates. Every True Potential-backed venture has a dedicated execution partner invested in the outcome.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { emoji: '🧠', title: 'Problem Structuring', subtitle: 'Strategy Sprints', desc: 'Turning ambiguous challenges into structured plans through rapid problem framing and strategic analysis.' },
                  { emoji: '📦', title: 'Project Delivery', subtitle: 'Execution Retainers', desc: 'End-to-end execution you can hand over and trust — from roadmap to delivery with embedded accountability.' },
                  { emoji: '💻', title: 'Tech Enablement', subtitle: 'Digital Build', desc: "Digital tools built for your community's context — from WhatsApp-native platforms to offline-first apps." },
                ].map(pillar => (
                  <div key={pillar.title} className="p-5 rounded-xl bg-[#1A1A2E] border border-[#C9A84C]/15">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{pillar.emoji}</span>
                      <div>
                        <h3 className="font-semibold text-[#C9A84C]">{pillar.title}</h3>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A7A9A]">{pillar.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#7A7A9A] pl-10">{pillar.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#1A1A2E] rounded-xl p-5 border border-[#2A2A40]">
                <p className="text-sm text-[#7A7A9A]">
                  <span className="text-white font-semibold">Skin in the game.</span> True Potential takes equity and success fees — never day rates. Portfolio companies get a strategic partner who is genuinely invested in building something that works.
                </p>
              </div>

              <div className="text-center mt-6">
                <a href="#" className="text-sm text-[#C9A84C] hover:text-[#F2E4B8] transition-colors inline-flex items-center gap-1">
                  Learn more about True Potential <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
