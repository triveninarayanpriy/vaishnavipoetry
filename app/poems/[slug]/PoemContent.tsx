'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { Poem } from '@/lib/poems';

interface PoemContentProps {
  poem: Poem;
}

export default function PoemContent({ poem }: PoemContentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const [hearted, setHearted] = useState(false);
  const [heartCount, setHeartCount] = useState<number>(0);

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

  return (
    <div ref={containerRef} className={`min-h-screen ${moodBackground}`}>
      {/* Paper Texture */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Parallax Cover */}
      {poem.featuredImage && (
        <motion.div style={{ y: parallaxY }} className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-b-2xl shadow-lg">
          <img
            src={poem.featuredImage}
            alt={poem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream/40" />
        </motion.div>
      )}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <Link href="/poems">
            <motion.span
              whileHover={{ x: -5 }}
              className="font-sans text-sm sm:text-base text-soil hover:text-earth transition-colors inline-flex items-center gap-2"
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
          className="bg-cream/80 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 sm:p-8 md:p-16 border border-clay/30"
          style={{
            boxShadow: '0 30px 80px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          {/* Category Badge */}
          {poem.category && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block font-sans text-xs uppercase tracking-widest text-soil/70 mb-4 sm:mb-6"
            >
              {poem.category}
            </motion.span>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-3xl sm:text-4xl md:text-6xl text-earth mb-6 sm:mb-8 leading-tight"
          >
            {poem.title}
          </motion.h1>

          {/* Date */}
          <motion.time
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="block font-sans text-xs sm:text-sm text-soil/60 mb-8 sm:mb-12"
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
            className="h-px bg-clay/40 mb-8 sm:mb-12"
          />

          {/* Poem Content */}
          {/* Kinetic Poem Lines */}
          <div className="space-y-3 sm:space-y-4">
            {lines.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 + idx * 0.08, duration: 0.5 }}
                className="font-serif text-lg sm:text-xl md:text-2xl text-charcoal"
                style={{ lineHeight: 1.8 }}
              >
                {line || '\u00A0'}
              </motion.p>
            ))}
          </div>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="h-px bg-clay/40 mt-8 sm:mt-12 mb-6 sm:mb-8"
          />

          {/* Interaction Placeholders */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-xs sm:text-sm text-soil/70"
          >
            {/* Heart */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              animate={{ scale: hearted ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              onClick={() => { setHearted(!hearted); setHeartCount((c) => (hearted ? Math.max(0, c - 1) : c + 1)); }}
              className="flex items-center gap-2 hover:text-clay-dark transition-colors"
            >
              <svg className={`w-5 h-5 ${hearted ? 'text-clay' : ''}`} fill={hearted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="font-sans">{hearted ? 'Loved' : 'Love'}</span>
              <span className="font-sans text-soil/60">{heartCount}</span>
            </motion.button>

            {/* Share to Instagram Story */}
            <button onClick={() => generateStoryImage(poem)} className="flex items-center gap-2 hover:text-clay-dark transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 9l-3 3m0 0l-3 3m3-3h8m-6 6H6a2 2 0 01-2-2V7a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2z" />
              </svg>
              <span className="font-sans">Share to Instagram Story</span>
            </button>
          </motion.div>
        </motion.article>

        {/* Navigation to Next/Previous */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-8 sm:mt-12 flex justify-center"
        >
          <Link href="/poems">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              className="px-6 py-3 bg-clay hover:bg-clay-dark text-cream font-sans rounded-full transition-all shadow-lg text-sm sm:text-base"
            >
              View All Poems
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function generateStoryImage(poem: Poem) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background by theme
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  if (poem.theme === 'Dark') {
    gradient.addColorStop(0, '#2f2f2f');
    gradient.addColorStop(1, '#1f1f1f');
  } else if (poem.theme === 'Vintage') {
    gradient.addColorStop(0, '#E8E2D5');
    gradient.addColorStop(1, '#C4A485');
  } else {
    gradient.addColorStop(0, '#F5F1E8');
    gradient.addColorStop(1, '#E8E2D5');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glass card
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  const cardX = 80, cardY = 220, cardW = canvas.width - 160, cardH = canvas.height - 440;
  roundRect(ctx, cardX, cardY, cardW, cardH, 32);

  // Title
  ctx.fillStyle = '#6B5744';
  ctx.font = 'bold 64px serif';
  ctx.textAlign = 'center';
  ctx.fillText(poem.title, canvas.width / 2, cardY + 100);

  // Poem excerpt/content wrapped
  ctx.fillStyle = '#3A3A3A';
  ctx.font = '36px serif';
  ctx.textAlign = 'left';
  const lines = (poem.excerpt || poem.content).split('\n');
  let y = cardY + 170;
  const maxWidth = cardW - 80;
  for (const line of lines) {
    y = drawWrappedText(ctx, line, cardX + 40, y, maxWidth, 60);
    if (y > cardY + cardH - 80) break;
  }

  // Footer
  ctx.textAlign = 'center';
  ctx.fillStyle = '#8B7355';
  ctx.font = '28px sans-serif';
  ctx.fillText('Vaishnavi Poetry • vaishnavipoetry.me', canvas.width / 2, canvas.height - 80);

  // Download
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `${poem.slug}-story.png`;
  a.click();
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

function drawWrappedText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
  return y + lineHeight;
}
