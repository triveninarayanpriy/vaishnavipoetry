import { getAllPoems } from '@/lib/poems';
import Link from 'next/link';

export const metadata = {
  title: 'The Tactile Verse - Vaishnavi',
  description: 'Nature distilled into words. An unbleached, minimalist collection of tactile poetry.',
};

interface HomepageHeader {
  title: string;
  subtitle: string;
}

async function getHomepageHeader(): Promise<HomepageHeader> {
  // Return default values directly for now (can be made dynamic with database later)
  return {
    title: 'The Tactile Verse',
    subtitle: 'Nature distilled into words. An unbleached, minimalist collection of tactile poetry exploring the spaces between thought and feeling.'
  };
}

export default async function Home() {
  const poems = getAllPoems();
  const latest = poems[0];
  const recentPoems = poems.slice(0, 3);
  const header = await getHomepageHeader();

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <style>{`
        .polaroid-card { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease; }
        .polaroid-card:hover { transform: scale(1.02) translateY(-8px) rotate(1deg); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); z-index: 10; }
        .polaroid-card:hover .polaroid-img { transform: scale(1.05); }
        .polaroid-img { transition: transform 0.6s ease; }
        .kinetic-text span { display: inline-block; opacity: 0; transform: translateY(20px); animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Hero Section */}
      <header className="relative px-4 sm:px-10 py-16 sm:py-24 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="mb-4 inline-flex items-center justify-center size-12 rounded-full bg-orange-600/10 text-orange-600">
            <span className="text-2xl">✦</span>
          </div>
          <h1 className="kinetic-text text-5xl sm:text-7xl font-serif font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            {header.title ? header.title.split(' ').map((word, idx) => (
              <span key={idx} style={{ animationDelay: `${0.1 + idx * 0.1}s` }}>
                {word}{' '}
              </span>
            )) : (
              <>
                <span style={{ animationDelay: '0.1s' }}>The</span>{' '}
                <span style={{ animationDelay: '0.2s' }}>Tactile</span>{' '}
                <span className="text-orange-600" style={{ animationDelay: '0.3s' }}>Verse</span>
              </>
            )}
          </h1>
          <div className="max-w-2xl mx-auto mt-6">
            <p className="text-lg sm:text-xl font-serif leading-relaxed text-slate-700/80 max-w-[65ch] mx-auto">
              {header.subtitle}
            </p>
          </div>
        </div>
      </header>

      {/* Featured Section */}
      {latest && (
        <section className="px-4 sm:px-10 py-12 flex justify-center">
          <div className="w-full max-w-[1024px] bg-white p-3 sm:p-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#EBE8E1]">
            <Link href={`/poems/${latest.slug}`} className="polaroid-card flex flex-col items-stretch justify-start rounded-lg bg-orange-50 overflow-hidden md:flex-row md:items-center relative group cursor-pointer">
              <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-square overflow-hidden">
                <div className="polaroid-img w-full h-full bg-center bg-no-repeat bg-cover" style={{
                  backgroundImage: latest.featuredImage ? `url(${latest.featuredImage})` : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA8nBsftp80EoX0_9LXiv0dw7EQv6mUW7P8_PhzK-82pb8ThVQHIyi0LAFvQnpZ_zenst0RyS9GROx052NzEzh0-OO4Tip3IGnhJDBNc1_k92vABEbvSGjyiME3uE0o0WEAbASkFPafaGUuN8fJZ7JcZ4sMXTEXTKqgl6oaMpr8CxlQ-CjwKeI4Sav0Juf-kqZ8BqzfsUkHRpI6Z-sm0ilBjoc4s5dYo2BKcidIV-ruq9zmu--Z2QhiXHJT56j8G0UA8WbYPdLrzo7t")'
                }} />
              </div>
              <div className="flex w-full md:w-1/2 flex-col items-start justify-center gap-4 p-8 md:p-12 bg-orange-50 relative">
                <span className="absolute top-6 right-6 text-orange-600/40 text-4xl">✧</span>
                <div className="space-y-2">
                  <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">Featured Poem</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">{latest.title}</h2>
                </div>
                <div className="relative pl-4 border-l-2 border-orange-600/30 my-2">
                  <p className="font-serif text-lg leading-[1.8] text-slate-800 italic">
                    {latest.excerpt || 'A featured poem from the collection...'}
                  </p>
                </div>
                <button className="mt-4 flex items-center gap-2 text-sm font-bold text-orange-600 group-hover:gap-3 transition-all">
                  Read Full Poem →
                </button>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid Collection */}
      <section className="px-4 sm:px-10 py-12 flex justify-center bg-white/50">
        <div className="w-full max-w-[1024px]">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="font-serif text-2xl font-bold text-slate-900">Recent Collections</h3>
            <Link className="text-sm font-medium text-slate-700/60 hover:text-orange-600 transition-colors" href="/poems">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPoems.map((poem, idx) => (
              <Link
                key={poem.slug}
                href={`/poems/${poem.slug}`}
                className="polaroid-card group flex flex-col gap-4 bg-white p-4 pb-6 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#EBE8E1] transition-all duration-300"
                style={{ 
                  rotate: idx === 0 ? '-1deg' : idx === 1 ? '1deg' : '-0.5deg',
                  transform: idx === 1 ? 'translateY(2rem)' : undefined 
                }}
              >
                <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#F0ECE4]">
                  <div className="polaroid-img w-full h-full bg-cover bg-center" style={{
                    backgroundImage: poem.featuredImage ? `url(${poem.featuredImage})` : undefined
                  }} />
                </div>
                <div className="px-2">
                  <h4 className="font-serif text-xl font-bold text-slate-900 mb-1">{poem.title}</h4>
                  <p className="text-xs font-medium text-orange-600 mb-3">By Vaishnavi</p>
                  <p className="font-serif text-sm leading-relaxed text-slate-700/70 line-clamp-3">
                    {poem.excerpt || 'A beautiful piece from the collection...'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
