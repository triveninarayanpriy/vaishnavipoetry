'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HomepageData {
  heroTitle: string;
  heroSubtitle: string;
  featuredQuote: string;
  ctaText: string;
}

export default function Home() {
  const [homepage, setHomepage] = useState<HomepageData | null>(null);

  useEffect(() => {
    fetch('/api/homepage')
      .then(res => res.json())
      .then(data => setHomepage(data))
      .catch(err => console.error('Failed to load homepage:', err));
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  if (!homepage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clay mx-auto mb-4"></div>
          <p className="text-soil">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-parchment to-moss/10 relative overflow-hidden">
      {/* Paper Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div 
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="text-center space-y-12 py-20">
          {/* Animated Poem Quote */}
          <motion.div 
            variants={fadeInUp}
            className="space-y-6"
          >
            <motion.blockquote 
              className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-earth leading-tight px-4 whitespace-pre-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0.7] }}
              transition={{ 
                duration: 8,
                times: [0, 0.2, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              {homepage.featuredQuote}
            </motion.blockquote>
          </motion.div>

          {/* Intro Text */}
          <motion.div 
            variants={fadeInUp}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-earth px-4">
              {homepage.heroTitle}
            </h1>
            <p className="font-sans text-base sm:text-lg md:text-xl text-soil px-4">
              {homepage.heroSubtitle}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/poems">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-clay hover:bg-clay-dark text-cream font-sans font-medium rounded-full shadow-lg transition-all duration-300"
              >
                {homepage.ctaText}
              </motion.button>
            </Link>
            
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-transparent border-2 border-soil hover:border-earth text-soil hover:text-earth font-sans font-medium rounded-full transition-all duration-300"
              >
                About
              </motion.button>
            </Link>
          </motion.div>

          {/* Decorative Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
            className="flex items-center justify-center gap-2 pt-8"
          >
            <div className="h-px w-12 bg-clay" />
            <div className="w-2 h-2 rounded-full bg-clay" />
            <div className="h-px w-12 bg-clay" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
