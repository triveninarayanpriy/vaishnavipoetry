import { getAbout } from '@/lib/api';

export const dynamic = 'force-static';

export const metadata = {
  title: 'About Vaishnavi | Poetry Portfolio',
  description: 'Poet exploring the quiet spaces between thoughts, where the unspoken finds its voice.',
};

function convertMarkdownToHTML(markdown: string): string {
  // Simple markdown to HTML converter for paragraphs
  return markdown
    .split('\n\n')
    .filter(p => p.trim() && !p.startsWith('>'))
    .map(p => `<p>${p.trim()}</p>`)
    .join('');
}

export default function AboutPage() {
  const about = getAbout();

  return (
    <section className="min-h-screen bg-paper/80">
      <div className="container-prose max-w-4xl py-12 md:py-20 flex flex-col items-center gap-12 relative z-10">
        {/* Profile Image with Glow */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-burnt/20 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-paper shadow-xl ring-1 ring-pine/5">
            {about.writerPhoto ? (
              <img
                alt={`Portrait of ${about.writerName}`}
                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                src={about.writerPhoto}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-burnt/20 to-pine/20 flex items-center justify-center">
                <span className="font-serif text-8xl text-pine/80">{about.writerName.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl text-pine text-center leading-tight">
          About {about.writerName}
        </h1>

        {/* Bio Content */}
        <div
          className="prose prose-lg prose-stone font-serif text-lg md:text-xl leading-relaxed text-justify md:text-left space-y-8 max-w-none text-pine/80"
          dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(about.content) }}
        />

        {/* Decorative Divider */}
        <div className="opacity-60">
          <svg fill="none" height="40" viewBox="0 0 100 40" width="100" xmlns="http://www.w3.org/2000/svg">
            <path className="text-burnt" d="M10 20 C 30 10, 50 30, 90 20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
