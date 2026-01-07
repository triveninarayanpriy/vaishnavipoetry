import { getAbout, getPoemBySlug, getPoemSlugs } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getPoemSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);
  if (!poem) return { title: 'Poem Not Found' };
  return {
    title: `${poem.title} | Vaishnavi Poems`,
    description: poem.excerpt || poem.content.substring(0, 155),
  };
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });
}

export default async function PoemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);
  if (!poem) notFound();

  const author = getAbout();
  const lines = poem.content.split('\n');

  return (
    <section className="min-h-screen bg-paper/80">
      <div className="container-prose max-w-3xl py-14 md:py-20 flex flex-col gap-12 relative z-10">
        {/* Back */}
        <Link
          href="/poems"
          className="group inline-flex items-center text-sm font-medium text-pine/60 hover:text-burnt transition-colors w-fit"
        >
          <svg
            className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Poems
        </Link>

        <header className="text-center space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-pine leading-tight">
            {poem.title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm font-sans tracking-[0.18em] text-pine/60 uppercase">
            <span>{formatDate(poem.date)}</span>
            {poem.category && <span className="w-1 h-1 rounded-full bg-pine/40" />}
            {poem.category && <span>{poem.category}</span>}
          </div>
        </header>

        <article className="font-serif text-xl md:text-2xl leading-relaxed text-pine/80 whitespace-pre-wrap">
          {lines.map((line, idx) => (
            <p key={idx} className="mb-2">
              {line || '\u00A0'}
            </p>
          ))}
        </article>

        <div className="flex justify-center opacity-60">
          <svg fill="none" height="40" viewBox="0 0 100 40" width="100" xmlns="http://www.w3.org/2000/svg">
            <path className="text-burnt" d="M10 20 C 30 10, 50 30, 90 20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Author block remains editable via About page in CMS */}
        <div className="flex flex-col items-center gap-3 text-center text-pine/60">
          <div className="text-sm uppercase tracking-[0.18em]">{author.writerName}</div>
          {author.tagline && <div className="text-xs tracking-[0.2em] text-pine/50">{author.tagline}</div>}
        </div>
      </div>
    </section>
  );
}
