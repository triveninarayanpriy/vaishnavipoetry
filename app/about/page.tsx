import { getAboutContent } from '@/lib/site';
import Link from 'next/link';

export const metadata = {
  title: 'About Vaishnavi | Poetry & Digital Artisan',
  description: 'Poet exploring the intersection of nature and tactile design through Tactile Maximalism',
};

export default function AboutPage() {
  const about = getAboutContent();

  return (
    <>
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60 mix-blend-multiply" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
      }} />

      <main className="relative z-10 flex flex-col items-center justify-start px-6 py-20 pb-40 min-h-screen" style={{ background: '#F3F0E6' }}>
        <div className="max-w-[900px] w-full mx-auto flex flex-col items-center gap-10">
          <div className="flex justify-center items-center relative group mb-2">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute -inset-6 z-0 text-[#b35309]/20 transition-transform duration-[3000ms] ease-in-out group-hover:rotate-12">
                <svg className="w-full h-full fill-current" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,71.2,32.6C60.2,43.7,49.5,53,37.8,61.1C26.1,69.2,13.4,76.1,0.5,75.2C-12.4,74.3,-24.5,65.6,-36.4,57.7C-48.3,49.8,-60,42.7,-69.5,32.3C-79,21.9,-86.3,8.2,-85.7,-5.1C-85.1,-18.4,-76.6,-31.3,-66.2,-41.7C-55.8,-52.1,-43.5,-60,-30.9,-68C-18.3,-76,-5.4,-84.1,8.3,-85.5L8.9,-85.4" transform="translate(100 100)" />
                </svg>
              </div>
              <div className="absolute inset-0 z-20 text-[#b35309] pointer-events-none">
                <svg className="w-full h-full fill-none stroke-current stroke-[1.5]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path d="M41.3,-72.6C54.4,-63.8,66.6,-55.1,76.2,-43.9C85.8,-32.7,92.8,-19,92.3,-5.5C91.8,8,83.8,21.3,73.5,32.4C63.2,43.5,50.6,52.4,38.2,60.5C25.8,68.6,13.6,75.9,1.1,74C-11.4,72.1,-24.2,61,-35.8,52.5C-47.4,44,-57.8,38.1,-66.1,28.8C-74.4,19.5,-80.6,6.8,-79.3,-5.3C-78,-17.4,-69.2,-28.9,-59.1,-39.2C-49,-49.5,-37.6,-58.6,-25.6,-68C-13.6,-77.4,-1,-87.1,12.3,-88.3L13.1,-88.1" transform="translate(100 100)" />
                </svg>
              </div>
              <div className="absolute inset-2 z-10 overflow-hidden rounded-full border-4 border-[#F3F0E6] shadow-lg">
                <img
                  alt="Vaishnavi"
                  className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                  src={about.authorPhoto || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3Jvs4wIhUtJqp1yoy0xHiml8EWZaparXMni0EUTW8sFKnOsfh-c6mr38v3CWmqJQT6G32bQEqRTjXEyFLn4yHOqrmy_BUM28jQWF3Tcu9FMhUVStpilCTnirgoFBxePWa7faRK3x5SzpidrvVVJ6vl3tnuHrTP2V-gIlz48E_7itq4UNwZ8aJOygZLSbcmJKObpY_cPzGgRhGx9FvjS1Vp3O5mAV9Sk1WaNLvBv4yG5Tm0ojOWDSvOhrvUosRAdtBGvZlQsIIJ8aW'}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 text-center max-w-[700px]">
            <header>
              <span className="text-[#b35309] font-bold tracking-[0.2em] uppercase text-sm mb-4 block opacity-80" style={{ fontFamily: 'Newsreader, serif' }}>
                The Creator
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-[#2D3A2F]" style={{ fontFamily: 'Playfair Display, serif' }}>
                About <span className="italic text-[#b35309] font-medium">Vaishnavi</span>
              </h1>
            </header>

            <div className="mx-auto" style={{ fontFamily: 'Merriweather, serif' }}>
              <p className="text-[1.125rem] md:text-[1.25rem] leading-[1.8] font-normal text-[#2D3A2F]/90">
                Vaishnavi is a poet and digital artisan exploring the intersection of nature and tactile design. Her work, characterized by <span className="text-[#b35309] font-semibold italic">'Tactile Maximalism,'</span> seeks to bring the sensory richness of the physical world into the digital realm.
              </p>
              <p className="text-[1.125rem] md:text-[1.25rem] leading-[1.8] font-normal text-[#2D3A2F]/90 mt-6">
                Every poem is treated as a landscape, and every pixel is a grain of sand. She believes that technology should not be sterile, but rather a canvas for the organic imperfections that define our humanity.
              </p>
            </div>

            <div className="relative py-6 px-4 md:px-12 mt-2">
              <span className="absolute top-0 left-0 text-6xl text-[#b35309]/20" style={{ fontFamily: 'Playfair Display, serif' }}>"</span>
              <blockquote className="text-2xl md:text-3xl font-medium italic text-[#b35309] leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
                Poetry is not just written; it is felt like rough bark and cool water.
              </blockquote>
              <span className="absolute bottom-0 right-0 text-6xl text-[#b35309]/20 leading-[0]" style={{ fontFamily: 'Playfair Display, serif' }}>"</span>
            </div>

            <div className="mt-4 opacity-80 flex flex-col items-center">
              <svg fill="none" height="60" viewBox="0 0 200 60" width="200" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 40C20 35 30 20 40 30C45 35 42 45 38 48C34 51 30 45 35 35C40 25 60 20 70 30C75 35 72 42 68 45M80 35C85 30 95 30 100 35C102 37 101 40 98 42M110 40L115 25L120 45M125 35C130 35 135 35 140 35M150 35C155 30 165 30 170 35C172 37 171 40 168 42" stroke="#b35309" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <p className="text-sm mt-2 text-[#2D3A2F]/60 font-medium tracking-wide uppercase" style={{ fontFamily: 'Newsreader, serif' }}>
                New Delhi, India
              </p>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}


