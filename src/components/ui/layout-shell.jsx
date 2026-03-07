'use client';

import { usePathname } from 'next/navigation';
import Navbar from './nav';
import Footer from './footer';

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isVentures = pathname.startsWith('/ventures');
  const isVenturesLanding = pathname === '/ventures';

  // Show navbar on ventures landing page (transparent), hide on portal pages
  const showNavbar = !isVentures || isVenturesLanding;

  return (
    <>
      {showNavbar && <Navbar />}
      <main>{children}</main>
      {!isVentures && <Footer />}
    </>
  );
}
