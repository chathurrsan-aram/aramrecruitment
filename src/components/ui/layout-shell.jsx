'use client';

import { usePathname } from 'next/navigation';
import Navbar from './nav';
import Footer from './footer';

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  if (pathname === '/members' || pathname?.startsWith('/members/')) {
    return children;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
