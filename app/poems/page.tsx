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
        <header className="text-center mb-14 space-y-4">
          <h1 className="font-serif text-5xl md:text-6xl text-pine font-semibold tracking-tight">Poems</h1>
          <p className="font-serif text-lg md:text-xl text-pine/70 italic max-w-2xl mx-auto">
            Explore the collection by category.
          </p>
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
              className="group relative bg-white/90 rounded-xl p-8 shadow-[0_4px_20px_-2px_rgba(45,58,47,0.05)] hover:shadow-[0_10px_25px_-5px_rgba(45,58,47,0.1)] transition-all duration-300 border border-transparent hover:border-pine/10 overflow-hidden"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="flex justify-between items-start mb-4 gap-3">
                <h2 className="font-serif text-2xl sm:text-3xl text-pine group-hover:text-burnt transition-colors">
                  {poem.title}
                </h2>
                {poem.category && (
                  <span className="inline-block bg-pine/5 text-pine/70 text-xs px-3 py-1 rounded-full uppercase tracking-wide font-semibold">
                    {poem.category}
                  </span>
                )}
              </div>

              {poem.excerpt && (
                <p className="font-serif text-pine/70 text-base leading-relaxed mb-6 line-clamp-2">
                  {poem.excerpt}
                </p>
              )}

              <div className="flex items-center text-xs font-bold tracking-[0.2em] text-burnt uppercase border-t border-pine/10 pt-4">
                <span>
                  {new Date(poem.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                <span className="mx-2 text-pine/30">•</span>
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
      </div>
    </section>
  );
}
