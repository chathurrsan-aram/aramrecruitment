import './globals.css';
import LayoutShell from '@/components/ui/layout-shell';

export const metadata = {
  title: {
    default: 'Aram | Building a Thriving Sri Lanka',
    template: '%s | Aram',
  },
  description: 'The Aram Initiative unites the next generation of diaspora to create sustainable impact in Sri Lanka through healthcare, education, technology, and community development.',
  openGraph: {
    title: 'Aram | Building a Thriving Sri Lanka',
    description: 'The Aram Initiative unites the next generation of diaspora to create sustainable impact in Sri Lanka.',
    url: 'https://aram.org.uk',
    siteName: 'Aram',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-aram-warm-50 text-aram-warm-500 antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
