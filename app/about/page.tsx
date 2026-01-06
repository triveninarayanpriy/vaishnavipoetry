'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/20 via-cream to-parchment">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.article
          initial="initial"
          animate="animate"
          className="bg-cream/80 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-16 border border-clay/30"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl text-earth mb-8"
          >
            About
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="space-y-6 font-sans text-lg text-charcoal/80 leading-relaxed"
          >
            <p>
              Welcome to my poetry portfolio—a quiet space where words meet the natural world, 
              and observations transform into verse.
            </p>

            <p>
              Each poem here is an attempt to capture the ephemeral: the way light filters through 
              autumn leaves, the silence between stars, the persistent flow of a river that knows 
              more than we ever will.
            </p>

            <p>
              This collection explores themes of nature, memory, and the human condition through 
              a lens of contemplation and wonder. Poetry, for me, is both a practice of attention 
              and an act of reverence.
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="h-px bg-clay/40 my-8"
            />

            <p className="italic text-soil">
              "We write to taste life twice, in the moment and in retrospect."
              <br />
              <span className="text-sm not-italic">— Anaïs Nin</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12"
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
