import { getAllPoems } from '@/lib/api';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Poems | Vaishnavi',
  description: 'Explore the collection by category.',
};

type SearchParams = {
  category?: string | string[];
};

function getUniqueCategories(poems: ReturnType<typeof getAllPoems>): string[] {
  const categories = poems
    .map(poem => poem.category)
    .filter((cat): cat is string => Boolean(cat));
  return Array.from(new Set(categories));
}

export default function PoemsPage({ searchParams }: { searchParams?: SearchParams }) {
  const poems = getAllPoems();
  const categories = getUniqueCategories(poems);

  const rawCategory = searchParams?.category;
  const activeCategory = Array.isArray(rawCategory) ? rawCategory[0] : rawCategory;

  const filteredPoems = activeCategory
    ? poems.filter(poem => (poem.category || '').toLowerCase() === activeCategory.toLowerCase())
    : poems;

  return (
    <section className="min-h-screen bg-paper/60">
      <div className="container-prose max-w-5xl py-16 md:py-24 relative z-10">
        {/* Hero */}
        <header className="w-full mb-10 text-center md:text-left border-b border-pine/10 pb-6">
          <h1 className="font-serif text-4xl md:text-5xl text-pine">Poems</h1>
          <p className="font-sans text-sm text-pine/60 mt-2 tracking-wide">Explore the collection by category.</p>
        </header>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            href="/poems"
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${
              !activeCategory
                ? 'bg-burnt text-paper shadow-md'
                : 'bg-paper text-pine/70 border-pine/10 hover:border-burnt/40 hover:text-burnt'
            }`}
          >
            All
          </Link>
          {categories.map(category => (
            <Link
              key={category}
              href={`/poems?category=${encodeURIComponent(category)}`}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory?.toLowerCase() === category.toLowerCase()
                  ? 'bg-burnt text-paper shadow-md'
                  : 'bg-paper text-pine/70 border-pine/10 hover:border-burnt/40 hover:text-burnt'
              }`}
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Poems List */}
        <div className="space-y-6">
          {filteredPoems.map((poem, idx) => (
            <Link
              key={poem.slug}
              href={`/poems/${poem.slug}`}
              className="group relative bg-white/80 rounded-lg p-6 shadow-[0_4px_20px_-2px_rgba(45,58,47,0.05)] hover:shadow-[0_10px_25px_-5px_rgba(45,58,47,0.12)] transition-all duration-300 border border-pine/10 hover:border-burnt/30 overflow-hidden"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                <div className="flex flex-col gap-1">
                  {poem.category && (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold bg-pine/10 text-pine/60 w-fit">
                      {poem.category}
                    </span>
                  )}
                  <h2 className="font-serif text-2xl md:text-3xl text-pine group-hover:text-burnt transition-colors mt-1">
                    {poem.title}
                  </h2>
                </div>
                <time className="text-xs font-bold tracking-[0.25em] text-pine/50 uppercase mt-2 md:mt-1 shrink-0">
                  {new Date(poem.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                </time>
              </div>

              {poem.excerpt && (
                <p className="font-serif italic text-pine/70 text-lg leading-relaxed line-clamp-2">
                  {poem.excerpt}
                </p>
              )}
              <div className="flex items-center text-xs font-bold tracking-[0.2em] text-burnt uppercase border-t border-pine/10 pt-4">
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Poem
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredPoems.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="font-serif text-lg text-pine/60">No poems in this category yet.</p>
          </div>
        )}
        {/* Next Page CTA (link to full list) */}
        <div className="mt-16 w-full flex justify-center">
          <Link href="/poems" className="group relative px-8 py-3 overflow-hidden rounded-md border border-burnt/40 hover:border-burnt text-pine hover:text-paper transition-all duration-300">
            <span className="absolute inset-0 bg-burnt transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative font-sans text-sm font-bold tracking-[0.25em] uppercase flex items-center gap-2">
              Next Page
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
