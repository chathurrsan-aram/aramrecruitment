'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem, Counter, DrawPath } from '@/components/ui/motion';
import { heroVideos } from '@/lib/cloudinary';
import useHeroVideo from '@/components/ui/use-hero-video';
import { partners } from '@/data/partners';
import { regions } from '@/data/regions';
import { ArrowRight, ChevronDown } from 'lucide-react';

/* ─── Hero ─────────────────────────────────────────── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 280]);
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, -60]);

  useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);

  useHeroVideo(videoRef, { startAt: 4.5 });

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 noise-overlay" style={{ y: bgY, scale: bgScale }}>
        <video
          ref={videoRef}
          className="hero-video w-full h-full object-cover"
          autoPlay muted playsInline preload="auto"
          poster="/images/Community.jpg"
        >
          <source src={heroVideos.home} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-aram-green-950/80" />
      </motion.div>

      {/* Purple floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-aram-purple/20"
          style={{
            width: 6 + i * 4,
            height: 6 + i * 4,
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.6,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.25em] text-aram-purple-light mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={loaded ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          THE ARAM INITIATIVE
        </motion.p>
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold text-white mb-5 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Inspiring Young Leaders
          <span className="block text-white/80">Across the Globe</span>
        </motion.h1>
        <motion.p
          className="font-body text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          To shape a sustainable future in their motherland
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/join"
            className="bg-aram-purple text-white font-semibold px-8 py-3.5 rounded-xl hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(109,74,158,0.3)] transition-all min-h-[48px] flex items-center justify-center"
          >
            Join the Movement
          </Link>
          <a
            href="#tagline"
            className="border border-white/20 text-white px-8 py-3.5 rounded-xl hover:border-white/50 transition-all min-h-[48px] flex items-center justify-center gap-2"
          >
            Our Story <ChevronDown className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
          <div className="w-1.5 h-1.5 rounded-full bg-aram-purple absolute left-1/2 -translate-x-1/2 animate-bounce-dot" />
        </div>
      </div>
    </section>
  );
}

/* ─── Tagline ──────────────────────────────────────── */
function Tagline() {
  return (
    <section id="tagline" className="py-24 bg-aram-warm-50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal delay={0}>
          <p className="font-mono text-sm uppercase tracking-[0.15em] text-aram-purple mb-3">
            ஆரம் செய விரும்பு
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-aram-green-900 mb-3">
            Aram Seya Virumbu
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="font-display text-xl text-aram-warm-400 italic">
            &ldquo;The desire to do good&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Impact Stats ─────────────────────────────────── */
function ImpactStats() {
  const stats = [
    { target: 60, prefix: '£', suffix: 'k', label: 'Raised', sub: 'See what we\u2019re funding', link: '/initiatives' },
    { target: 100, suffix: '', label: 'Volunteers', sub: 'Find out why we\u2019re reconnecting the diaspora', link: '/about' },
    { target: 3, suffix: '', label: 'Trips to Sri Lanka', sub: 'Read our trip reports and findings', link: '/reports' },
    { target: 6, suffix: '', label: 'Sectors', sub: 'Explore our emerging insights', link: '/research' },
  ];

  return (
    <section className="py-24 md:py-32 relative" style={{ backgroundColor: '#F6F2FC' }}>
      <div className="max-w-5xl mx-auto px-6">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6" staggerDelay={0.12}>
          {stats.map((stat, i) => (
            <StaggerItem key={i} className="text-center">
              <Link href={stat.link} className="group block">
                <div className="font-display text-5xl md:text-6xl font-bold text-aram-purple mb-2">
                  <Counter target={stat.target} prefix={stat.prefix || ''} suffix={stat.suffix} />
                </div>
                <div className="text-aram-green-900 font-semibold text-sm">{stat.label}</div>
                <div className="text-aram-purple/60 text-xs mt-2 leading-relaxed">{stat.sub}</div>
                <span className="inline-flex items-center gap-1 text-aram-purple text-xs font-semibold mt-3 group-hover:underline transition-all">
                  {stat.sub} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── Three-Pillar Model ──────────────────────────── */
function ThreePillarModel() {
  const pillars = [
    { icon: '🔍', title: 'Discovery', color: '#40916C', label: 'PILLAR 01', desc: 'Annual volunteering trips to Sri Lanka. On-the-ground observations, community engagement, and needs assessment.', link: '/trip', cta: 'Read our trip reports' },
    { icon: '🔬', title: 'Research', color: '#6D4A9E', label: 'PILLAR 02', desc: 'Translating field observations into actionable insights, thought pieces, and data-driven recommendations.', link: '/research', cta: 'Explore our insights' },
    { icon: '🚀', title: 'Initiatives', color: '#C85C5C', label: 'PILLAR 03', desc: 'Long-term projects addressing systemic challenges: mentoring, microcredit, and sustainable partnerships.', link: '/initiatives', cta: 'See our active projects' },
  ];

  return (
    <section className="py-24 md:py-32 bg-aram-warm-50">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
            How We Work
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-aram-green-900">
            Our Three-Pillar Model
          </h2>
        </Reveal>

        {/* SVG connecting line */}
        <div className="hidden md:block mb-12">
          <svg viewBox="0 0 800 40" className="w-full max-w-3xl mx-auto" style={{ overflow: 'visible' }}>
            <DrawPath d="M 100 20 L 700 20" color="#E8E4DE" strokeWidth={2} duration={1.5} />
            {[100, 400, 700].map((x, i) => (
              <motion.circle
                key={i}
                cx={x} cy={20} r={8}
                fill={pillars[i].color}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.5 + i * 0.5, type: 'spring', stiffness: 200 }}
              />
            ))}
          </svg>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {pillars.map((p, i) => (
            <StaggerItem key={i}>
              <div className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl"
                  style={{ backgroundColor: `${p.color}15` }}
                >
                  {p.icon}
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.15em] mb-2" style={{ color: p.color }}>
                  {p.label}
                </p>
                <h3 className="font-display text-xl font-bold text-aram-green-900 mb-2">{p.title}</h3>
                <p className="text-sm text-aram-warm-500 leading-relaxed mb-4">{p.desc}</p>
                <Link
                  href={p.link}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:-translate-y-0.5 transition-transform"
                  style={{ color: p.color }}
                >
                  {p.cta} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── Regions Preview ─────────────────────────────── */
function RegionsPreview() {
  return (
    <section className="py-24 md:py-32 bg-aram-warm-100">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-10">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-aram-warm-400 mb-3">
            Where We Work
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-aram-green-900 mb-2">
            Four Provinces, One Mission
          </h2>
          <p className="text-aram-warm-500">Connecting with communities across Sri Lanka&apos;s diverse regions.</p>
        </Reveal>

        <div className="flex gap-5 overflow-x-auto pb-4 -mr-6 pr-6 snap-x snap-mandatory">
          {regions.map((region, i) => {
            const partnerCount = partners.filter((p) => p.region === region.id).length;
            return (
              <Reveal key={region.id} delay={i * 0.1} direction="right" className="snap-start">
                <Link href={`/research?view=map&region=${region.id}`}>
                  <div className="min-w-[300px] rounded-xl overflow-hidden border border-aram-warm-200 bg-white hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
                    <div className={`h-32 bg-gradient-to-br ${region.gradient} flex items-end p-5`}>
                      <h3 className="font-display text-xl font-bold text-white">{region.name}</h3>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-aram-warm-500 leading-relaxed mb-3 line-clamp-2">
                        {region.description}
                      </p>
                      <div className="flex gap-4 text-xs text-aram-warm-400 font-mono">
                        <span>{partnerCount} partners</span>
                        <span>{region.subRegions.length} sub-regions</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Partners Marquee ─────────────────────────────── */
function PartnersMarquee() {
  const partnerNames = ['Tamil Aid', 'Tea Leaf Trust', 'Dreamspace', 'HOPE', 'SPARKS', 'ORHAN', 'Kullu Projects'];

  return (
    <section className="py-10 border-y border-aram-warm-200 bg-aram-warm-50">
      <p className="text-center font-mono text-xs uppercase tracking-[0.15em] text-aram-warm-400 mb-6">
        Our Partners on the Ground
      </p>
      <div className="overflow-hidden relative">
        <div className="animate-marquee flex gap-8 whitespace-nowrap">
          {[...partnerNames, ...partnerNames].map((name, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-aram-warm-200 bg-white"
            >
              <span className="w-7 h-7 rounded-full bg-aram-green-100 flex items-center justify-center text-xs font-display font-bold text-aram-green-900">
                {name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </span>
              <span className="text-sm font-medium text-aram-green-900">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ──────────────────────────────────── */
function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <img
        src="https://res.cloudinary.com/dhzuwjkkz/image/upload/q_auto,f_auto/screenshot-2024-11-21-at-20.32.53_fetvtw"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-aram-green-950/70" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5">
            Ready to Build Something That Matters?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-xl mx-auto">
            We&apos;re looking for driven young Tamils who want to give back. Whether you have 2 hours a week or 10, there&apos;s a place for you.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/join"
              className="bg-aram-purple text-white font-semibold px-8 py-3.5 rounded-xl hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(109,74,158,0.3)] transition-all min-h-[52px] flex items-center justify-center"
            >
              Join the Team
            </Link>
            <Link
              href="/initiatives#mentorship"
              className="border border-white/20 text-white px-8 py-3.5 rounded-xl hover:border-white/50 transition-all min-h-[52px] flex items-center justify-center"
            >
              Become a Mentor
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Tagline />
      <ImpactStats />
      <ThreePillarModel />
      <RegionsPreview />
      <PartnersMarquee />
      <CTASection />
    </div>
  );
}
