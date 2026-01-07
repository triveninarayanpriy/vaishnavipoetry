import { getAllPoems, getHomepage } from '@/lib/api';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata = {
  title: 'The Tactile Verse | Poems by Vaishnavi',
  description: 'Nature distilled into words. A compact, tactile reading room for poems shaped by nature, memory, and slow observation.',
};

export default function HomePage() {
  const homepage = getHomepage();
  const poems = getAllPoems();
  const featured = poems[0];
  const recent = poems.slice(0, 4);

  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      <header className="container-prose py-20 md:py-32 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-burnt/10 text-burnt mb-6">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-pine font-bold tracking-tight leading-[1.1] mb-6">
            {homepage?.heroTitle || 'The Tactile Verse'}
          </h1>

          <p className="font-serif text-lg md:text-xl text-pine/70 leading-relaxed max-w-xl mx-auto mb-8">
            {homepage?.heroSubtitle || 'Nature distilled into words. An unbleached, minimalist collection of tactile poetry.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/poems" className="btn-primary">
              Explore Collection
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-pine/70 hover:text-burnt transition-colors text-sm font-medium"
            >
              About the Poet
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Featured Poem */}
      {featured && (
        <section className="container-prose pb-16">
          <Link href={`/poems/${featured.slug}`} className="group block">
            <div className="glass-card overflow-hidden hover:border-burnt/30 transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                {/* Image Side */}
                {featured.featuredImage && (
                  <div className="lg:w-1/2 aspect-[4/3] lg:aspect-auto relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url(${featured.featuredImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-paper/80 lg:to-paper" />
                  </div>
                )}

                {/* Content Side */}
                <div className="lg:w-1/2 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-burnt mb-3">Featured Poem</p>
                  <h2 className="font-serif text-3xl md:text-4xl text-pine font-semibold mb-4 group-hover:text-burnt transition-colors">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="font-serif text-pine/60 italic leading-relaxed mb-6 line-clamp-3">
                      "{featured.excerpt}"
                    </p>
                  )}
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-burnt group-hover:gap-3 transition-all">
                    Read Full Poem
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Quote Section */}
      {homepage?.featuredQuote && (
        <section className="container-prose pb-16">
          <div className="glass-card p-8 md:p-12 text-center bg-pine/[0.03]">
            <blockquote className="font-serif text-2xl md:text-3xl text-pine italic leading-relaxed max-w-2xl mx-auto">
              "{homepage.featuredQuote}"
            </blockquote>
          </div>
        </section>
      )}

      {/* Recent Poems */}
      {recent.length > 1 && (
        <section className="container-prose pb-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl text-pine font-semibold">Recent Works</h3>
            <Link href="/poems" className="text-sm text-pine/50 hover:text-burnt transition-colors">
              View All →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {recent.slice(1).map((poem, idx) => (
              <Link
                key={poem.slug}
                href={`/poems/${poem.slug}`}
                className="group glass-card p-6 hover:border-burnt/30 transition-all duration-300"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-burnt/70 mb-2">
                  {poem.category || 'Poem'}
                </p>
                <h4 className="font-serif text-xl text-pine group-hover:text-burnt transition-colors mb-2">
                  {poem.title}
                </h4>
                <p className="text-xs text-pine/40 uppercase tracking-[0.2em]">
                  {new Date(poem.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
