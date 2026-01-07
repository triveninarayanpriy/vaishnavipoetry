import { getAllPoems } from '@/lib/api';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Poetry Collection | The Tactile Verse',
  description: 'A curated collection of poems exploring nature, memory, and slow observation.',
};

export default function PoemsPage() {
  const poems = getAllPoems();

  return (
    <section className="container-prose py-16 md:py-24">
      {/* Header */}
      <header className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-burnt mb-3">Collection</p>
        <h1 className="font-serif text-4xl md:text-5xl text-pine font-semibold mb-4">
          Poetry Archive
        </h1>
        <p className="font-sans text-pine/60 max-w-lg mx-auto leading-relaxed">
          Words shaped by nature, memory, and the quiet spaces between thought and feeling.
        </p>
      </header>

      {/* Poems Grid */}
      <div className="grid gap-6 md:gap-8">
        {poems.map((poem, idx) => (
          <Link
            key={poem.slug}
            href={`/poems/${poem.slug}`}
            className="group glass-card p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 hover:border-burnt/30 transition-all duration-300"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            {/* Left: Index */}
            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-pine/5 text-pine/40 font-serif text-lg shrink-0">
              {String(idx + 1).padStart(2, '0')}
            </div>

            {/* Center: Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-burnt/70 font-medium">
                  {poem.category || 'Poem'}
                </span>
                <span className="h-px w-6 bg-pine/15" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-pine/40">
                  {new Date(poem.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <h2 className="font-serif text-xl md:text-2xl text-pine group-hover:text-burnt transition-colors leading-tight mb-2">
                {poem.title}
              </h2>
              {poem.excerpt && (
                <p className="text-sm text-pine/60 leading-relaxed line-clamp-2">
                  {poem.excerpt}
                </p>
              )}
            </div>

            {/* Right: Arrow */}
            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-burnt/10 text-burnt group-hover:bg-burnt group-hover:text-paper transition-all shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {poems.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="font-serif text-lg text-pine/60">No poems yet. Check back soon.</p>
        </div>
      )}
    </section>
  );
}
