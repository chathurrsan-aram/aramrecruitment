import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6 bg-aram-warm-50">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-aram-purple mb-4">404</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-aram-green-900 mb-4">
          We couldn&apos;t find that page
        </h1>
        <p className="text-aram-warm-500 mb-8">
          The link may be out of date, or the page may have moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-aram-purple text-white font-semibold px-8 py-3.5 rounded-xl hover:-translate-y-0.5 transition-all"
        >
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
