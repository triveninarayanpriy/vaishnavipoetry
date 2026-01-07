import { getAllPoems, getHomepage } from '@/lib/api';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Vaishnavi | Selected Works',
  description: 'Recent additions to the collection.',
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

export default function HomePage() {
  const homepage = getHomepage();
  const poems = getAllPoems();
  const displayed = poems.slice(0, 12);

  const title = homepage?.heroTitle?.trim() || 'Selected Works';
  const subtitle = homepage?.heroSubtitle?.trim() || 'Recent additions to the collection';
  const ctaText = homepage?.ctaText?.trim() || 'Next Page';

  return (
    <section className="min-h-screen bg-paper/70">
      <div className="container-prose max-w-4xl py-12 md:py-20 flex flex-col gap-12 md:gap-16">
        {/* Header */}
        <header className="border-b border-pine/10 pb-6 text-center md:text-left">
          <h1 className="font-serif text-4xl md:text-5xl text-pine font-semibold tracking-tight">
            {title}
          </h1>
          <p className="font-sans text-sm text-pine/60 mt-2 tracking-wide">
            {subtitle}
          </p>
        </header>

        {/* Selected Works */}
        <div className="space-y-6 md:space-y-8">
          {displayed.map((poem, idx) => (
            <Link
              key={poem.slug}
              href={`/poems/${poem.slug}`}
              className="group relative block bg-white/80 rounded-lg p-6 md:p-8 shadow-[0_4px_20px_-2px_rgba(45,58,47,0.05)] hover:shadow-[0_10px_25px_-5px_rgba(45,58,47,0.12)] border border-pine/10 hover:border-burnt/30 transition-all duration-300"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                <h2 className="font-serif text-2xl md:text-3xl text-pine group-hover:text-burnt transition-colors">
                  {poem.title}
                </h2>
                <time className="text-[10px] font-bold tracking-[0.25em] text-pine/50 uppercase">
                  {formatDate(poem.date)}
                </time>
              </div>

              {poem.excerpt && (
                <p className="font-serif text-lg text-pine/70 italic leading-relaxed">
                  "{poem.excerpt}"
                </p>
              )}
            </Link>
          ))}

          {displayed.length === 0 && (
            <div className="glass-card p-10 text-center">
              <p className="font-serif text-lg text-pine/60">No poems yet. Add one from the Admin page.</p>
            </div>
          )}
        </div>

        {/* Next / More */}
        <div className="flex justify-center pt-4">
          <Link
            href="/poems"
            className="group relative px-8 py-3 overflow-hidden rounded-md border border-burnt/40 hover:border-burnt text-pine hover:text-paper transition-all duration-300"
          >
            <span className="absolute inset-0 bg-burnt transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative font-sans text-sm font-bold tracking-[0.25em] uppercase flex items-center gap-2">
              {ctaText}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
