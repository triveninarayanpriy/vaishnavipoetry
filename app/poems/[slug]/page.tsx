import { getAbout, getPoemBySlug, getPoemSlugs } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getPoemSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const poem = getPoemBySlug(params.slug);
  if (!poem) return { title: 'Poem Not Found' };
  return {
    title: `${poem.title} | The Tactile Verse`,
    description: poem.excerpt || poem.content.substring(0, 155),
  };
}

export default function PoemPage({ params }: { params: { slug: string } }) {
  const poem = getPoemBySlug(params.slug);
  if (!poem) notFound();

  const author = getAbout();
  const lines = poem.content.split('\n');

  const background = poem.featuredImage
    ? `linear-gradient(140deg, rgba(253,251,247,0.92) 15%, rgba(45,58,47,0.72) 120%), url(${poem.featuredImage})`
    : 'radial-gradient(circle at 20% 20%, rgba(180,83,9,0.12), transparent 35%), radial-gradient(circle at 80% 0%, rgba(45,58,47,0.18), transparent 35%), linear-gradient(135deg, #fdfbf7 0%, #f3ecde 60%, #e5dcc7 100%)';

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: background }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-paper/70 via-paper/85 to-paper" aria-hidden />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-24 pb-24">
        <div className="glass-panel rounded-[28px] border border-ink/10 overflow-hidden">
          <div className="relative h-40 overflow-hidden">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(180,83,9,0.25),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(45,58,47,0.25),transparent_32%),linear-gradient(120deg,rgba(31,32,31,0.85),rgba(31,32,31,0.65))]"
            />
            <div className="absolute inset-0 flex items-end justify-between px-6 pb-6 text-paper">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-paper/70">{poem.category || 'Poem'}</p>
                <h1 className="font-serif text-3xl md:text-4xl leading-tight drop-shadow-md">{poem.title}</h1>
              </div>
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-paper/70">
                <span className="h-px w-8 bg-paper/40" aria-hidden />
                {new Date(poem.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            {poem.excerpt && (
              <p className="mb-6 font-sans text-sm uppercase tracking-[0.24em] text-ink/50">{poem.excerpt}</p>
            )}

            <div className="poem-body space-y-3 text-[17px] leading-[1.65] text-ink/90">
              {lines.map((line, idx) => (
                <p key={idx} className="leading-[1.65]">
                  {line || '\u00A0'}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-ink/8 pt-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 text-sm text-ink/70">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5 text-ink font-serif text-base">{author.writerName.slice(0, 1)}</span>
                <div>
                  <p className="font-serif text-base text-ink">{author.writerName}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/50">{author.tagline}</p>
                </div>
              </div>
              <Link
                href="/poems"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/5 px-4 py-2 text-sm font-medium text-ink hover:border-burnt/30 hover:bg-paper transition"
              >
                ← Back to collection
              </Link>
            </div>

            {author.signature && (
              <div className="mt-8 flex justify-end text-ink/60">
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: author.signature }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
