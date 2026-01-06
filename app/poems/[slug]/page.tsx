import { getPoemBySlug, getPoemSlugs } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = getPoemSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);
  if (!poem) return { title: 'Poem Not Found' };
  return {
    title: `${poem.title} | Vaishnavi Poetry`,
    description: poem.excerpt || poem.content.substring(0, 155),
  };
}

export default async function PoemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);
  if (!poem) notFound();

  const lines = poem.content.split('\n');
  const baseDelay = 1.5;
  const inc = 0.8;

  const bgStyle = poem.featuredImage
    ? { backgroundImage: `url(${poem.featuredImage})` }
    : { backgroundImage: 'linear-gradient(135deg, #0b1221 0%, #1f2937 60%)' };

  return (
    <main className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: '#221810' }}>
      {/* Local styles for reading mode (no styled-jsx) */}
      <style>{`
        .glass-card-poem { background: rgba(253,251,247,0.3); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
        .animate-dim { animation: dimBackground 3s ease-in-out forwards; animation-delay: 0.5s; }
        @keyframes dimBackground { from { background-color: rgba(0,0,0,0); } to { background-color: rgba(0,0,0,0.5); } }
        @keyframes fadeInLine { from { opacity:0; transform: translateY(15px); filter: blur(4px);} to { opacity:1; transform: translateY(0); filter: blur(0);} }
        .poem-line { opacity:0; animation: fadeInLine 1.5s cubic-bezier(0.2,0.8,0.2,1) forwards; }
      `}</style>

      {/* Background image + dim overlay */}
      <div className="fixed inset-0 z-0 w-full h-full">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[40s] ease-linear hover:scale-110" style={bgStyle} />
        <div className="absolute inset-0 bg-black/30 animate-dim z-10 pointer-events-none" />
      </div>

      {/* Reader card */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <main className="flex-grow flex items-center justify-center px-4 pb-24">
          <div className="w-full max-w-2xl mx-auto py-10">
            <article className="glass-card-poem rounded-2xl md:rounded-[2rem] p-10 md:p-16 text-center md:text-left shadow-2xl relative overflow-hidden transition-all duration-500 backdrop-blur-xl border-white/20">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none mix-blend-overlay">
                <span className="text-white text-6xl">✦</span>
              </div>

              <div className="relative mb-10 poem-line" style={{ animationDelay: '0.8s' }}>
                <span className="text-xs font-semibold tracking-[0.25em] text-white/80 uppercase mb-4 block">{poem.category || 'Single Poem'}</span>
                <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-4" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                  {poem.title}
                </h1>
                <div className="h-1 w-16 bg-orange-600/90 rounded-full mt-6 mx-auto md:mx-0 shadow-[0_2px_10px_rgba(180,83,9,0.4)]" />
              </div>

              <div className="font-serif text-[20px] md:text-[22px] leading-[1.9] text-white space-y-7 max-w-[75ch] mx-auto md:mx-0 font-normal tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                {lines.map((line, idx) => (
                  <p
                    key={idx}
                    className="poem-line"
                    style={{ animationDelay: `${baseDelay + idx * inc}s` }}
                  >
                    {line || '\u00A0'}
                  </p>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-white/20 flex justify-between items-center opacity-0" style={{ animation: 'fadeInLine 1s ease-out forwards', animationDelay: `${baseDelay + lines.length * inc + 0.8}s` }}>
                <span className="text-sm text-white/70 font-medium tracking-wider uppercase">
                  {new Date(poem.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <div className="flex gap-5">
                  <button aria-label="Like" className="text-white/70 hover:text-red-400 transition-all transform hover:scale-110 active:scale-95 duration-200">♥</button>
                  <button aria-label="Share" className="text-white/70 hover:text-orange-500 transition-all transform hover:scale-110 active:scale-95 duration-200">↗</button>
                </div>
              </div>

              <div className="mt-6 text-sm">
                <Link href="/poems" className="text-white/80 hover:text-white underline">Back to poems</Link>
              </div>
            </article>
          </div>
        </main>
      </div>
    </main>
  );
}
