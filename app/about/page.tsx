'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAbout } from '@/lib/api';

interface AboutData {
  title: string;
  writerPhoto: string;
  writerName: string;
  tagline: string;
  content: string;
}

export default function AboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    // Fetch the about markdown content and parse basic markdown
    fetch('/api/about')
      .then(res => res.json())
      .then(data => {
        setAbout(data);
        // Simple markdown to HTML conversion for paragraphs
        const processed = data.content
          .split('\n\n')
          .map((para: string) => {
            if (para.startsWith('>')) {
              return `<blockquote class="italic text-soil border-l-4 border-clay pl-4 my-4">${para.replace(/^> /, '')}</blockquote>`;
            }
            return `<p class="leading-relaxed">${para}</p>`;
          })
          .join('');
        setHtml(processed);
      })
      .catch(err => console.error('Failed to load about:', err));
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  if (!about) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sage/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clay mx-auto mb-4"></div>
          <p className="text-soil">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/20 via-cream to-parchment">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.article
          initial="initial"
          animate="animate"
          className="bg-cream/80 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 md:p-16 border border-clay/30"
        >
          {/* Writer Circle Photo - Perfect Circle with Soft Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="relative w-56 h-56 md:w-64 md:h-64">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-clay/30 to-sage/20 blur-2xl" />
              {/* Inner circle photo */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-clay shadow-2xl">
                <img
                  src={about.writerPhoto}
                  alt={about.writerName}
                  className="w-full h-full object-cover"
                />
                {/* Soft overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl text-earth mb-3 text-center tracking-tight"
          >
            {about.writerName}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-center text-clay font-sans text-lg md:text-xl font-medium mb-10 tracking-wide uppercase"
          >
            {about.tagline}
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-px bg-clay/30 mb-10 w-16 mx-auto"
          />

          <motion.div
            variants={fadeInUp}
            className="space-y-6 font-sans text-base md:text-lg text-charcoal/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex justify-center"
          >
            <Link href="/poems">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-clay hover:bg-clay-dark text-cream font-sans font-medium rounded-full shadow-lg transition-all duration-300"
              >
                Explore the Collection
              </motion.button>
            </Link>
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
}


