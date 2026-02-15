import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'Aram | Building a Thriving Sri Lanka',
    template: '%s | Aram',
  },
  description: 'Aram unites the next generation of diaspora to create sustainable impact in Sri Lanka through healthcare, education, technology, and community development.',
  openGraph: {
    title: 'Aram | Building a Thriving Sri Lanka',
    description: 'Aram unites the next generation of diaspora to create sustainable impact in Sri Lanka.',
    url: 'https://aram.org.uk',
    siteName: 'Aram',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
