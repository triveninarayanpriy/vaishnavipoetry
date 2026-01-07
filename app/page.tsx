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
  const recent = poems.slice(0, 6);

  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      <header className="container-prose py-24 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-soil font-bold tracking-tight leading-[1.05] mb-6">
            {homepage?.heroTitle || "Where Ink Meets the Earth's Whisper"}
          </h1>

          <p className="font-serif text-xl md:text-2xl text-soil/70 leading-relaxed max-w-2xl mx-auto mb-12">
            {homepage?.heroSubtitle || 'Tactile verses, born from nature, crafted for the soul.'}
          </p>

          <Link href="/poems" className="inline-block px-8 py-3 bg-burnt hover:bg-burnt/90 text-cream rounded-lg font-medium transition-colors">
            {homepage?.ctaText || 'Read Poems'}
          </Link>
        </div>
      </header>

      {/* Recent Works Section */}
      {recent.length > 0 && (
        <section className="container-prose pb-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-soil font-bold">
              Recent Works
            </h2>
            <Link href="/poems" className="text-burnt hover:text-burnt/80 transition-colors font-medium flex items-center gap-2">
              View All
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map((poem) => (
              <Link key={poem.slug} href={`/poems/${poem.slug}`} className="group block">
                <div className="glass-card p-6 md:p-8 hover:border-burnt/30 transition-all duration-300 h-full flex flex-col">
                  <h3 className="font-serif text-2xl text-soil font-semibold mb-3 group-hover:text-burnt transition-colors line-clamp-2">
                    {poem.title}
                  </h3>
                  {poem.excerpt && (
                    <p className="font-serif text-soil/60 text-base leading-relaxed mb-4 line-clamp-3 flex-grow">
                      {poem.excerpt}
                    </p>
                  )}
                  <time className="text-sm text-soil/50 uppercase tracking-wide font-medium">
                    {new Date(poem.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }).toUpperCase()}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
