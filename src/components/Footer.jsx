import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src="/images/whitetamil-1.png" alt="Aram" className="h-12 mb-4 brightness-0 invert" />
            <p className="text-sm text-gray-400 leading-relaxed">
              Uniting the next generation of diaspora to create sustainable impact in Sri Lanka.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/trip', label: 'The Trip' },
                { href: '/research', label: 'Research' },
                { href: '/initiatives', label: 'Initiatives' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-4">Get Involved</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/join" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Join the Team
                </Link>
              </li>
              <li>
                <Link href="/initiatives#mentorship" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Become a Mentor
                </Link>
              </li>
              <li>
                <a href="mailto:hello@aram.org.uk" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-4">Connect</h4>
            <a
              href="mailto:hello@aram.org.uk"
              className="text-sm text-gray-400 hover:text-white transition-colors block mb-3"
            >
              hello@aram.org.uk
            </a>
            <a
              href="https://aram.org.uk"
              className="text-sm text-gray-400 hover:text-white transition-colors block"
              target="_blank"
              rel="noopener noreferrer"
            >
              aram.org.uk
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Aram Initiative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
