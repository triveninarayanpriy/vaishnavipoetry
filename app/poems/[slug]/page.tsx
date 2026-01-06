'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Poem {
  slug: string;
  title: string;
  date: string;
  category?: string;
  excerpt?: string;
  theme?: string;
  background?: string;
  featuredImage?: string;
  content: string;
}

interface PoemPageContentProps {
  poem: Poem | null;
}

function PoemPageContent({ poem }: PoemPageContentProps) {
  if (!poem) {
    notFound();
  }

  return (
    <div className={`min-h-screen ${poem.background || 'bg-gradient-to-br from-cream via-parchment to-sage/10'}`}>
      {/* Paper Texture */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/poems">
            <motion.span
              whileHover={{ x: -5 }}
              className="font-sans text-soil hover:text-earth transition-colors inline-flex items-center gap-2"
            >
              ← Back to Poems
            </motion.span>
          </Link>
        </motion.div>

        {/* Poem Container - Book-like */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-cream/80 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-16 border border-clay/30"
          style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          {/* Category Badge */}
          {poem.category && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block font-sans text-xs uppercase tracking-widest text-soil/70 mb-6"
            >
              {poem.category}
            </motion.span>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-4xl md:text-6xl text-earth mb-8 leading-tight"
          >
            {poem.title}
          </motion.h1>

          {/* Date */}
          <motion.time
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="block font-sans text-sm text-soil/60 mb-12"
          >
            {new Date(poem.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </motion.time>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-px bg-clay/40 mb-12"
          />

          {/* Poem Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-serif text-xl md:text-2xl text-charcoal leading-loose whitespace-pre-line"
          >
            {poem.content}
          </motion.div>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="h-px bg-clay/40 mt-12 mb-8"
          />

          {/* Interaction Placeholders */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-6 text-sm text-soil/60"
          >
            <button className="flex items-center gap-2 hover:text-clay-dark transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="font-sans">Hearts (Coming Soon)</span>
            </button>
            
            <button className="flex items-center gap-2 hover:text-clay-dark transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="font-sans">Comments (Coming Soon)</span>
            </button>
          </motion.div>
        </motion.article>

        {/* Navigation to Next/Previous */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 flex justify-between items-center"
        >
          <Link href="/poems">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              className="px-6 py-3 bg-clay/80 hover:bg-clay text-cream font-sans rounded-full transition-all"
            >
              View All Poems
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function PoemPage({ params }: { params: { slug: string } }) {
  const [poem, setPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const response = await fetch(`/api/poems?slug=${params.slug}`);
        if (!response.ok) {
          throw new Error('Poem not found');
        }
        const data = await response.json();
        setPoem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load poem');
      } finally {
        setLoading(false);
      }
    };

    fetchPoem();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-soil font-serif text-xl"
        >
          Loading poem...
        </motion.div>
      </div>
    );
  }

  if (error || !poem) {
    notFound();
  }

  return <PoemPageContent poem={poem} />;
}
