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
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const hasHero = ['/', '/trip'].includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || !hasHero;
  const bg = solid ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent';
  const textColor = solid ? 'text-aram-green-900' : 'text-white';
  const hoverColor = solid ? 'hover:text-aram-gold-500' : 'hover:text-aram-gold-400';
  const logoFilter = solid ? '' : 'brightness-0 invert';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bg}`}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/whitetamil-1.png" alt="Aram" className={`h-[50px] transition-all duration-300 ${logoFilter}`} />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${textColor} ${hoverColor} ${
                pathname === link.href ? 'text-aram-gold-500' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/join"
            className="bg-aram-gold-500 text-aram-green-900 font-semibold py-2.5 px-6 rounded-xl text-sm transition-all duration-200 hover:shadow-[0_8px_24px_rgba(212,168,67,0.3)] hover:-translate-y-0.5 min-h-[40px] flex items-center"
          >
            Join Us
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 ${textColor} min-w-[44px] min-h-[44px] flex items-center justify-center`}
          aria-label="Toggle menu"
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
                  pathname === link.href ? 'text-aram-gold-500' : 'text-aram-green-900 hover:text-aram-gold-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setMobileOpen(false)}
              className="mt-3 bg-aram-gold-500 text-aram-green-900 font-semibold py-3 px-6 rounded-xl text-sm text-center transition-all duration-200"
            >
              Join Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
