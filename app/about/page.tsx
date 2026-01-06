'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SiteConfig {
  about: {
    writerName: string;
    writerPhotoUrl: string;
    bioIntro: string;
    bioMain: string[];
    quote: string;
    quoteAuthor: string;
  };
}

export default function AboutPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    fetch('/data/siteConfig.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error('Failed to load config:', err));
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  if (!config) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/20 via-cream to-parchment">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.article
          initial="initial"
          animate="animate"
          className="bg-cream/80 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 md:p-16 border border-clay/30"
        >
          {/* Writer Circle Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-clay/30 shadow-lg">
              <img
                src={config.about.writerPhotoUrl}
                alt={config.about.writerName}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl text-earth mb-2 text-center"
          >
            {config.about.writerName}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-center text-soil mb-8 font-sans text-lg"
          >
            Poet & Observer of Life
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="space-y-6 font-sans text-base sm:text-lg text-charcoal/80 leading-relaxed"
          >
            <p>
              {config.about.bioIntro}
            </p>

            {config.about.bioMain.map((paragraph, idx) => (
              <p key={idx}>
                {paragraph}
              </p>
            ))}

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="h-px bg-clay/40 my-8"
            />

            <p className="italic text-soil text-center">
              "{config.about.quote}"
              <br />
              <span className="text-sm not-italic">— {config.about.quoteAuthor}</span>
            </p>
          </motion.div>

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
