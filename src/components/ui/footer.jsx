'use client';

import Link from 'next/link';
import { Instagram, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-aram-green-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <img src="https://res.cloudinary.com/dhzuwjkkz/image/upload/v1771802172/a730ae79-83b6-460d-b17f-c562f2948100_pcjimk.png" alt="Aram" className="h-12 mb-4 brightness-0 invert" />
            <p className="text-sm text-white/50 leading-relaxed font-body">
              Uniting the next generation of diaspora to create sustainable impact in Sri Lanka.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-aram-purple-light mb-5">Explore</h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/trip', label: 'The Trip' },
                { href: '/research', label: 'Research & Insights' },
                { href: '/initiatives', label: 'Initiatives' },
                { href: '/reports', label: 'Reports' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-aram-purple-light mb-5">Get Involved</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/join" className="text-sm text-white/50 hover:text-white transition-colors">
                  Join the Team
                </Link>
              </li>
              <li>
                <Link href="/initiatives#mentorship" className="text-sm text-white/50 hover:text-white transition-colors">
                  Become a Mentor
                </Link>
              </li>
              <li>
                <a href="mailto:hello@aram.org.uk" className="text-sm text-white/50 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-aram-purple-light mb-5">Connect</h4>
            <div className="space-y-3">
              <a
                href="mailto:hello@aram.org.uk"
                className="text-sm text-white/50 hover:text-white transition-colors block"
              >
                hello@aram.org.uk
              </a>
              <a
                href="https://www.instagram.com/aram.initiative/"
                className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <a
                href="https://www.tiktok.com/@aram.initiative"
                className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight className="w-4 h-4" /> TikTok
              </a>
              <a
                href="https://aramresearchinsights.substack.com/"
                className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight className="w-4 h-4" /> Substack
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} The Aram Initiative. All rights reserved.
          </p>
          <a
            href="https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/4014211/charity-overview"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Charity Commission Registration
          </a>
        </div>
      </div>
    </footer>
  );
}
