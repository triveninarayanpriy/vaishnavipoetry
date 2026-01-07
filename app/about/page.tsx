import { getAbout } from '@/lib/api';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata = {
  title: 'About Vaishnavi | The Tactile Verse',
  description: 'Poet exploring the intersection of nature and tactile design through Tactile Maximalism.',
};

export default function AboutPage() {
  const about = getAbout();

  return (
    <section className="container-prose py-16 md:py-24">
      {/* Header */}
      <header className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-burnt mb-3">The Creator</p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-pine font-bold mb-4">
          About <span className="italic text-burnt font-medium">{about.writerName.split(' ')[0]}</span>
        </h1>
      </header>

      {/* Main Card */}
      <div className="glass-card overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Photo Side */}
          <div className="lg:w-2/5 relative">
            <div className="aspect-square lg:aspect-auto lg:absolute lg:inset-0 overflow-hidden">
              {about.writerPhoto ? (
                <img
                  src={about.writerPhoto}
                  alt={about.writerName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-burnt/20 to-pine/20 flex items-center justify-center">
                  <span className="font-serif text-8xl text-paper/80">{about.writerName.charAt(0)}</span>
                </div>
              )}
              {/* Decorative Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-paper/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-paper/80" />
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:w-3/5 p-8 md:p-10 lg:p-12">
            {/* Name & Tagline */}
            <div className="mb-8">
              <h2 className="font-serif text-3xl md:text-4xl text-pine font-semibold mb-2">
                {about.writerName}
              </h2>
              <p className="text-sm uppercase tracking-[0.2em] text-burnt/70">{about.tagline}</p>
            </div>

            {/* Bio Content */}
            <div className="prose prose-pine max-w-none mb-8">
              <div
                className="font-serif text-lg text-pine/80 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: about.content.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') }}
              />
            </div>

            {/* Quote Block */}
            <div className="relative py-6 px-6 border-l-2 border-burnt/30 bg-pine/[0.02] rounded-r-xl mb-8">
              <blockquote className="font-serif text-xl md:text-2xl text-burnt italic leading-relaxed">
                "Poetry is not just written; it is felt like rough bark and cool water."
              </blockquote>
            </div>

            {/* Signature */}
            {about.signature && (
              <div className="flex items-center gap-4 pt-6 border-t border-pine/10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-burnt to-burnt-hover flex items-center justify-center text-paper font-serif text-lg font-semibold shadow-md author-initial">
                  {about.writerName.charAt(0)}
                </div>
                <div
                  className="text-pine/50 italic"
                  dangerouslySetInnerHTML={{ __html: about.signature }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link href="/poems" className="btn-primary">
          Explore the Collection
        </Link>
      </div>
    </section>
  );
}
