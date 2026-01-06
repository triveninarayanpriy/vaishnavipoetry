'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
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
              className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-earth leading-tight px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0.7] }}
              transition={{ 
                duration: 8,
                times: [0, 0.2, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <span className="block italic">
                "In whispered winds
              </span>
              <span className="block italic mt-4">
                the earth remembers"
              </span>
            </motion.blockquote>
            
            <motion.p 
              className="font-sans text-soil text-lg md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              — from "Echoes of Autumn"
            </motion.p>
          </motion.div>

          {/* Intro Text */}
          <motion.div 
            variants={fadeInUp}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl text-earth px-4">
              Poetry Portfolio
            </h1>
            <p className="font-sans text-sm sm:text-base md:text-lg text-soil leading-relaxed px-4">
              A curated collection exploring the intersections of nature, memory, 
              and the quiet moments that shape our human experience.
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
                Explore Poems
              </motion.button>
            </Link>
            
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-transparent border-2 border-soil hover:border-earth text-soil hover:text-earth font-sans font-medium rounded-full transition-all duration-300"
              >
                About Me
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
