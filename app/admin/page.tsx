'use client';

import { motion } from 'framer-motion';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-parchment to-clay/10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Card Container */}
        <div className="bg-cream/80 backdrop-blur-sm rounded-lg shadow-2xl p-12 border border-clay/30">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-clay/20 mb-8"
          >
            <svg 
              className="w-10 h-10 text-clay-dark" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" 
              />
            </svg>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-serif text-4xl md:text-5xl text-earth mb-4"
          >
            Admin Portal
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-sans text-lg text-soil mb-8 leading-relaxed"
          >
            Content management system integration placeholder.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="h-px bg-clay/40 mb-8"
          />

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="space-y-4 text-left bg-parchment/50 rounded-lg p-6"
          >
            <h2 className="font-serif text-2xl text-earth mb-4">
              Sveltia CMS Integration
            </h2>
            
            <div className="space-y-3 font-sans text-charcoal/80">
              <p className="flex items-start gap-3">
                <span className="text-clay-dark mt-1">✓</span>
                <span>Git-based content management with Sveltia CMS</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-clay-dark mt-1">✓</span>
                <span>Markdown-based poem editing and versioning</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-clay-dark mt-1">✓</span>
                <span>Media library for background images</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-clay-dark mt-1">✓</span>
                <span>No database required - all content in Git</span>
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-8 space-y-4"
          >
            <a
              href="/admin/index.html"
              className="inline-block"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-clay hover:bg-clay-dark text-cream font-sans font-medium rounded-full shadow-lg transition-all duration-300"
              >
                Open Sveltia CMS Dashboard
              </motion.button>
            </a>
            
            <p className="text-sm text-soil/70">
              or visit{' '}
              <a href="/admin/index.html" className="text-clay-dark hover:underline">
                /admin/index.html
              </a>
            </p>
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="font-sans text-sm text-soil/60 mt-6 italic"
          >
            Setup required: Configure GitHub OAuth in{' '}
            <a 
              href="https://github.com/settings/developers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-clay-dark hover:underline"
            >
              GitHub Settings
            </a>
            {' '}(see GITHUB_OAUTH_SETUP.md)
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
