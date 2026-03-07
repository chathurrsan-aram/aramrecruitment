'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/initiatives', label: 'Initiatives' },
  { href: '/research', label: 'Research' },
  { href: '/trip', label: 'Trip' },
  { href: '/reports', label: 'Reports' },
  { href: '/ventures', label: 'Ventures' },
  { href: '/join', label: 'Join Us' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const pathname = usePathname();

  const hasHero = ['/', '/research'].includes(pathname);
  const isVenturesLanding = pathname === '/ventures';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Listen for data-immersive attribute set by the research page. */
  useEffect(() => {
    const html = document.documentElement;
    const check = () => setImmersive(html.getAttribute('data-immersive') === 'true');
    check();
    const observer = new MutationObserver(check);
    observer.observe(html, { attributes: true, attributeFilter: ['data-immersive'] });
    return () => observer.disconnect();
  }, []);

  // Ventures landing: no navbar at all — hero content stands alone
  if (isVenturesLanding) return null;

  const solid = scrolled || !hasHero;
  const bg = solid ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent';
  const textColor = solid ? 'text-aram-green-900' : 'text-white';
  const hoverColor = solid ? 'hover:text-aram-purple' : 'hover:text-aram-purple-light';
  const logoFilter = solid ? '' : 'brightness-0 invert';

  const hidden = immersive && !mobileOpen;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bg} ${hidden ? '-translate-y-full opacity-0 pointer-events-none' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/dhzuwjkkz/image/upload/v1771802172/a730ae79-83b6-460d-b17f-c562f2948100_pcjimk.png"
            alt="Aram"
            className={`h-[72px] transition-all duration-300 ${logoFilter}`}
            style={{ mixBlendMode: solid ? 'multiply' : 'screen', background: 'transparent' }}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${textColor} ${hoverColor} ${
                pathname === link.href ? 'text-aram-purple' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 ${textColor} min-w-[44px] min-h-[44px] flex items-center justify-center`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-aram-warm-200 bg-white">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium py-3 border-b border-aram-warm-100 transition-colors ${
                  pathname === link.href ? 'text-aram-purple' : 'text-aram-green-900 hover:text-aram-purple'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setMobileOpen(false)}
              className="mt-3 bg-aram-purple text-white font-semibold py-3 px-6 rounded-xl text-sm text-center transition-all duration-200"
            >
              Join Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
