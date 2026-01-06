'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Poem } from '@/lib/poems';

interface PoemsPageContentProps {
  poems: Poem[];
}

export default function PoemsPageContent({ poems }: PoemsPageContentProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-parchment to-sage/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-earth mb-4 px-4">
            Poetry Collection
          </h1>
          <p className="font-sans text-base sm:text-lg text-soil max-w-2xl mx-auto px-4">
            Verses born from observation, reflection, and the quiet reverence for life's fleeting moments.
          </p>
        </motion.div>

        {/* Poems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {poems.map((poem, index) => (
            <motion.div
              key={poem.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/poems/${poem.slug}`}>
                <motion.article
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`${poem.background || 'bg-cream'} rounded-lg p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-clay/30 h-full`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' /%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23paper)' opacity='0.03'/%3E%3C/svg%3E")`,
                  }}
                >
                  {poem.category && (
                    <span className="inline-block font-sans text-xs uppercase tracking-wider text-soil/70 mb-3">
                      {poem.category}
                    </span>
                  )}
                  
                  <h2 className="font-serif text-2xl sm:text-3xl text-earth mb-3 sm:mb-4">
                    {poem.title}
                  </h2>
                  
                  <p className="font-serif text-base sm:text-lg text-charcoal/80 italic leading-relaxed mb-4">
                    {poem.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-6">
                    <time className="font-sans text-sm text-soil/60">
                      {new Date(poem.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="font-sans text-sm text-clay-dark font-medium"
                    >
                      Read More →
                    </motion.span>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
