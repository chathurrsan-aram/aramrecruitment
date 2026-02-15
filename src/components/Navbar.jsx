'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/trip', label: 'Trip' },
  { href: '/research', label: 'Research' },
  { href: '/initiatives', label: 'Initiatives' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-40">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/whitetamil-1.png" alt="Aram" className="h-[60px]" />
          <img src="/images/SL.png" alt="Sri Lanka" className="h-7 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-aram-purple transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/join"
            className="bg-aram-purple hover:bg-aram-purple-dark text-white font-semibold py-2 px-5 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[40px] flex items-center gap-2"
          >
            Join Us
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-aram-purple min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-gray-600 hover:text-aram-purple py-3 border-b border-gray-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setMobileOpen(false)}
              className="mt-3 bg-aram-purple hover:bg-aram-purple-dark text-white font-semibold py-3 px-5 rounded-full text-sm text-center transition-all duration-200"
            >
              Join Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
