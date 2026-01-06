'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-parchment to-moss/10 relative">
      {/* Paper grain */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=100 height=100 xmlns=http://www.w3.org/2000/svg%3E%3Cfilter id=grain%3E%3CfeTurbulence type=fractalNoise baseFrequency=0.6 numOctaves=4 /%3E%3C/filter%3E%3Crect width=100 height=100 filter=url(%23grain) opacity=0.05/%3E%3C/svg%3E')",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-cream/80 backdrop-blur-xl border border-clay/30 rounded-xl shadow-2xl p-8 sm:p-12"
        >
          <h1 className="font-serif text-earth text-4xl sm:text-5xl mb-4">Page Not Found</h1>
          <p className="font-sans text-soil text-base sm:text-lg mb-8">
            The poem you’re seeking may have drifted downstream. Try returning to the collection.
          </p>
          <Link href="/poems" className="inline-block">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="font-sans px-6 py-3 rounded-md bg-clay text-cream shadow-md border border-clay/40"
            >
              Back to Poems
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
