import { getAbout, getPoemBySlug, getPoemSlugs } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getPoemSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);
  if (!poem) return { title: 'Poem Not Found' };
  return {
    title: `${poem.title} | The Tactile Verse`,
    description: poem.excerpt || poem.content.substring(0, 155),
  };
}

export default async function PoemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);
  if (!poem) notFound();

  const author = getAbout();
  const lines = poem.content.split('\n');

  return (
    <section className="min-h-screen relative">
      {/* Parallax Cover Background */}
      {poem.featuredImage && (
        <div
          className="fixed inset-0 bg-cover bg-center bg-fixed opacity-20"
          style={{ backgroundImage: `url(${poem.featuredImage})` }}
          aria-hidden
        />
      )}

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-paper/60 via-paper/90 to-paper" aria-hidden />

      {/* Content */}
      <div className="relative z-10 container-prose py-16 md:py-24">
        {/* Back Link */}
        <Link
          href="/poems"
          className="inline-flex items-center gap-2 text-sm text-pine/50 hover:text-burnt transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to collection
        </Link>

        {/* Main Glass Card */}
        <article className="glass-card overflow-hidden">
          {/* Header Section */}
          <div className="relative px-6 py-8 md:px-10 md:py-12 border-b border-pine/8 bg-gradient-to-br from-pine/5 to-transparent">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-burnt mb-2">
                  {poem.category || 'Poem'}
                </p>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-pine font-semibold leading-tight">
                  {poem.title}
                </h1>
              </div>
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-pine/50">
                <span className="h-px w-6 bg-pine/20" />
                {new Date(poem.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
            {poem.excerpt && (
              <p className="mt-4 text-sm text-pine/60 italic max-w-xl">{poem.excerpt}</p>
            )}
          </div>

          {/* Poem Body - Dense Line Height */}
          <div className="px-6 py-8 md:px-10 md:py-12">
            <div className="poem-text">
              {lines.map((line, idx) => (
                <p key={idx} className="leading-snug">
                  {line || '\u00A0'}
                </p>
              ))}
            </div>
          </div>

          {/* Author Signature Section */}
          <div className="px-6 py-6 md:px-10 md:py-8 border-t border-pine/8 bg-pine/[0.02]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-burnt to-burnt-hover flex items-center justify-center text-paper font-serif text-lg font-semibold shadow-md author-initial">
                  {author.writerName.charAt(0)}
                </div>
                <div>
                  <p className="font-serif text-lg text-pine">{author.writerName}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-pine/50">{author.tagline}</p>
                </div>
              </div>

              {/* Signature with Breathing Animation */}
              {author.signature && (
                <div
                  className="text-pine/40 text-sm italic author-initial"
                  dangerouslySetInnerHTML={{ __html: author.signature }}
                />
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
