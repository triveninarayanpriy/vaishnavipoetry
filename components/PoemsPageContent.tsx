'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Poem } from '@/lib/api';

interface PoemsPageContentProps {
  poems: Poem[];
}

export default function PoemsPageContent({ poems }: PoemsPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories and count poems in each
  const categoryCounts = poems.reduce(
    (acc, poem) => {
      const category = poem.category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const categories = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  // Filter poems based on search and category
  const filteredPoems = poems.filter((poem) => {
    const matchesSearch =
      poem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poem.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || poem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#2D3A2F] overflow-x-hidden">
      <style>{`
        body {
          font-family: "Merriweather", serif;
        }
        .font-display {
          font-family: "Playfair Display", serif
        }
        .font-ui {
          font-family: "Inter", sans-serif
        }
        .texture-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 50;
          background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuAhWml-BKSt7j5nceMJKXQ30DoXKCNW7U0Z_HIVIgqrBLAsMvMxAVirVvVQiFqwbSAGN5BfB3S77eIdPfFxAW_vUwYnM-7bz3hskTk3egYhuiyJuM6PgyyxY07K8OhmrcV9FRGlwC5UwDFAOx3bzdx0zVXopXYdg0syK_BobGucRShjGxfgJNep3e2Sa0jBco3KPCae0WDmFgISyCzF4DqpK-xzXhmqUJ_iJkq9fJqnwA4fQ3oKKIHVDF14o_kaa0-xE5LnJRBSPXPL);
          opacity: 0.15;
          mix-blend-mode: multiply
        }
        .polaroid-card {
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
          backface-visibility: hidden;
        }
        .polaroid-card:hover {
          transform: scale(1.03) translateY(-12px) rotate(1deg);
          box-shadow: 0 25px 30px -10px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          z-index: 20;
        }
        .polaroid-card:hover .polaroid-img {
          transform: scale(1.08);
        }
        .polaroid-img {
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        details > summary {
          list-style: none;
        }
        details > summary::-webkit-details-marker {
          display: none;
        }
        .sidebar-link {
          position: relative;
        }
        .sidebar-link::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-50%) scale(0);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #b45309;
          transition: transform 0.2s ease;
        }
        .sidebar-link:hover::before, .sidebar-link.active::before {
          transform: translateY(-50%) scale(1);
        }
      `}</style>

      <div className="texture-overlay"></div>

      <div className="relative z-10 layout-container flex h-full grow flex-col pb-36">
        {/* Header */}
        <header className="w-full max-w-7xl mx-auto px-6 pt-12 pb-6 flex justify-between items-end border-b border-[#2D3A2F]/10">
          <div>
            <p className="font-ui text-sm font-semibold text-[#b45309] uppercase tracking-widest mb-2">
              Vaishnavi's Collection
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#2D3A2F]">
              Poem Library
            </h1>
          </div>
          <div className="hidden sm:block">
            <p className="font-body italic text-[#2D3A2F]/60 text-sm">
              Sorting by:{' '}
              <span className="text-[#2D3A2F] font-semibold not-italic cursor-pointer hover:text-[#b45309] transition-colors">
                Newest First
              </span>
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-8">
              {/* Search */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search poems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F4F1EA] border-none rounded-lg py-3 pl-10 pr-4 font-ui text-sm focus:ring-2 focus:ring-[#b45309]/20 transition-all placeholder:text-[#2D3A2F]/40 shadow-inner"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#2D3A2F]/40 group-focus-within:text-[#b45309] transition-colors text-lg">
                  search
                </span>
              </div>

              {/* Categories */}
              <details className="group" open>
                <summary className="flex items-center justify-between cursor-pointer mb-4 select-none">
                  <h3 className="font-display text-xl font-bold text-[#2D3A2F]">
                    Categories
                  </h3>
                  <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <ul className="space-y-3 pl-2 border-l border-[#2D3A2F]/10 ml-2">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`sidebar-link block font-ui text-sm font-semibold transition-colors ${
                        selectedCategory === null
                          ? 'text-[#b45309] active'
                          : 'text-[#2D3A2F]/70 hover:text-[#b45309]'
                      }`}
                    >
                      All Poems ({poems.length})
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => setSelectedCategory(category.name)}
                        className={`sidebar-link block font-ui text-sm font-medium transition-colors ${
                          selectedCategory === category.name
                            ? 'text-[#b45309] active'
                            : 'text-[#2D3A2F]/70 hover:text-[#b45309]'
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPoems.map((poem) => (
                <Link key={poem.slug} href={`/poems/${poem.slug}`}>
                  <div className="polaroid-card group flex flex-col gap-3 bg-white p-3 pb-5 rounded-sm shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#EBE8E1] h-full cursor-pointer">
                    {/* Image Section */}
                    {poem.featuredImage ? (
                      <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#F0ECE4] relative">
                        <div
                          className="polaroid-img w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url("${poem.featuredImage}")`,
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-4 py-2 bg-white/90 rounded-full text-xs font-bold font-ui uppercase tracking-wider">
                            Read Now
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#F4F1EA] relative flex items-center justify-center p-6 text-center border border-black/5">
                        <div className="absolute top-4 left-4 text-[#b45309]/20">
                          <span className="material-symbols-outlined !text-4xl">format_quote</span>
                        </div>
                        <p className="font-display font-bold text-2xl text-[#2D3A2F] italic">
                          {poem.title}
                        </p>
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-4 py-2 bg-white/90 rounded-full text-xs font-bold font-ui uppercase tracking-wider">
                            Read Now
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Text Section */}
                    <div className="px-2 pt-2">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-[10px] font-ui font-bold text-[#b45309] uppercase tracking-widest">
                          {poem.category || 'Uncategorized'}
                        </span>
                        <span className="text-[10px] font-ui text-[#2D3A2F]/40">
                          {new Date(poem.date).toLocaleDateString('en-US', {
                            month: 'short',
                            year: '2-digit',
                          })}
                        </span>
                      </div>
                      <h4 className="font-display text-xl font-bold text-[#2D3A2F] mb-2 leading-tight">
                        {poem.title}
                      </h4>
                      <p className="font-body text-sm leading-relaxed text-[#2D3A2F]/70 line-clamp-3">
                        {poem.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-16 flex justify-center">
              <button className="group relative px-8 py-3 rounded-full bg-transparent border border-[#2D3A2F]/20 hover:border-[#b45309] text-[#2D3A2F] font-ui font-bold transition-all overflow-hidden">
                <span className="relative z-10 group-hover:text-[#b45309] transition-colors">
                  Load More Poems
                </span>
                <div className="absolute inset-0 bg-[#b45309]/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
