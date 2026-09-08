'use client';

import Navbar from './nav';
import Footer from './footer';

export default function LayoutShell({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
