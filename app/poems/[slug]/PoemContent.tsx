'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { Poem } from '@/lib/api';

interface PoemContentProps {
  poem: Poem;
}

export default function PoemContent({ poem }: PoemContentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const [hearted, setHearted] = useState(false);
  const [heartCount, setHeartCount] = useState<number>(0);

  // Mood-based background
  const moodBackground = useMemo(() => {
    switch (poem.theme) {
      case 'Dark':
        return 'bg-gradient-to-b from-charcoal via-earth to-charcoal';
      case 'Vintage':
        return 'bg-gradient-to-b from-parchment via-cream to-clay/20';
      default:
        return 'bg-gradient-to-br from-cream via-parchment to-moss/10';
    }
  }, [poem.theme]);

  const lines = useMemo(() => poem.content.split('\n'), [poem.content]);

  const textColor = poem.theme === 'Dark' ? 'text-cream' : 'text-charcoal';
  const subtleColor = poem.theme === 'Dark' ? 'text-cream/60' : 'text-charcoal/60';

  return (
    <div ref={containerRef} className={`min-h-screen ${moodBackground}`}>
      {/* Paper Texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Featured Image - Full Width Banner */}
      {poem.featuredImage && (
        <motion.div
          style={{ y: parallaxY }}
          className="relative w-full h-96 sm:h-[500px] md:h-[600px] overflow-hidden"
        >
          <img
            src={poem.featuredImage}
            alt={poem.title}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        </motion.div>
      )}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
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
              className={`font-sans text-sm sm:text-base ${subtleColor} transition-colors inline-flex items-center gap-2`}
            >
              ← Back to Poems
            </motion.span>
          </Link>
        </motion.div>

        {/* Main Content Card - Glassmorphism */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`${poem.theme === 'Dark' ? 'bg-charcoal/90' : 'bg-cream/90'} backdrop-blur-2xl rounded-3xl shadow-2xl p-8 sm:p-12 md:p-20 border ${poem.theme === 'Dark' ? 'border-clay/20' : 'border-clay/30'}`}
          style={{
            boxShadow: poem.theme === 'Dark'
              ? '0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 30px 80px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          {/* Category Badge */}
          {poem.category && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-block font-sans text-xs uppercase tracking-widest ${poem.theme === 'Dark' ? 'text-clay' : 'text-soil'}/70 mb-6`}
            >
              {poem.category}
            </motion.span>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`font-serif text-4xl sm:text-5xl md:text-6xl ${poem.theme === 'Dark' ? 'text-cream' : 'text-earth'} mb-4 leading-tight`}
          >
            {poem.title}
          </motion.h1>

          {/* Date */}
          <motion.time
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`block font-sans text-sm ${subtleColor} mb-10`}
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
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`h-px ${poem.theme === 'Dark' ? 'bg-clay/30' : 'bg-clay/40'} mb-12`}
          />

          {/* Poem Content - Kinetic Lines */}
          <div className="space-y-6 mb-12">
            {lines.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.06, duration: 0.5 }}
                className={`font-serif text-lg sm:text-xl md:text-2xl ${textColor} leading-8 sm:leading-10`}
              >
                {line || '\u00A0'}
              </motion.p>
            ))}
          </div>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className={`h-px ${poem.theme === 'Dark' ? 'bg-clay/30' : 'bg-clay/40'} my-12`}
          />

          {/* Interaction Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            {/* Heart Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              animate={{ scale: hearted ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              onClick={() => {
                setHearted(!hearted);
                setHeartCount((c) => (hearted ? Math.max(0, c - 1) : c + 1));
              }}
              className={`flex items-center gap-2 font-sans text-sm sm:text-base transition-colors ${
                hearted
                  ? 'text-clay'
                  : poem.theme === 'Dark'
                  ? 'text-cream/70 hover:text-clay'
                  : 'text-soil hover:text-clay'
              }`}
            >
              <svg className={`w-5 h-5 ${hearted ? 'fill-current' : ''}`} viewBox="0 0 24 24" fill={hearted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{hearted ? 'Loved' : 'Love'}</span>
              {heartCount > 0 && <span className={`text-xs ${subtleColor}`}>({heartCount})</span>}
            </motion.button>

            {/* Share Button */}
            <button className={`flex items-center gap-2 font-sans text-sm sm:text-base transition-colors ${
              poem.theme === 'Dark'
                ? 'text-cream/70 hover:text-clay'
                : 'text-soil hover:text-clay'
            }`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 9l-3 3m0 0l-3 3m3-3h8m-6 6H6a2 2 0 01-2-2V7a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2z" />
              </svg>
              <span>Share</span>
            </button>
          </motion.div>
        </motion.article>

        {/* Navigation to Poems */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-16 flex justify-center"
        >
          <Link href="/poems">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-full font-sans font-medium transition-all shadow-lg ${
                poem.theme === 'Dark'
                  ? 'bg-clay hover:bg-clay-dark text-charcoal'
                  : 'bg-clay hover:bg-clay-dark text-cream'
              }`}
            >
              View All Poems
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
