'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  featuredQuote: string;
  ctaText: string;
  authorByline: string;
}

export default function HomeEditorPage() {
  const [content, setContent] = useState<HomeContent>({
    heroTitle: '',
    heroSubtitle: '',
    featuredQuote: '',
    ctaText: '',
    authorByline: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/admin/home');
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Homepage content saved successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to save content. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Edit Homepage
                </h1>
                <p className="text-sm text-slate-600">
                  Customize the hero section and featured content
                </p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <div className="space-y-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-200 p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Hero Section
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hero Title
                </label>
                <input
                  type="text"
                  value={content.heroTitle}
                  onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="The Tactile Verse"
                />
                <p className="mt-1 text-sm text-slate-500">The main heading displayed on the homepage</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hero Subtitle
                </label>
                <textarea
                  value={content.heroSubtitle}
                  onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Nature distilled into words..."
                />
                <p className="mt-1 text-sm text-slate-500">A brief tagline that appears below the title</p>
              </div>
            </div>
          </motion.div>

          {/* Featured Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Featured Quote
            </h2>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Featured Poetry Quote
              </label>
              <textarea
                value={content.featuredQuote}
                onChange={(e) => setContent({ ...content, featuredQuote: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors font-serif"
                placeholder="The river carries ancient songs..."
              />
              <p className="mt-1 text-sm text-slate-500">A poem excerpt or quote to feature prominently</p>
            </div>
          </motion.div>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Call to Action
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={content.ctaText}
                  onChange={(e) => setContent({ ...content, ctaText: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Explore the Collection"
                />
                <p className="mt-1 text-sm text-slate-500">Text for the main call-to-action button</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Author Byline
                </label>
                <input
                  type="text"
                  value={content.authorByline}
                  onChange={(e) => setContent({ ...content, authorByline: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="By Vaishnavi"
                />
                <p className="mt-1 text-sm text-slate-500">Author attribution shown on poem cards</p>
              </div>
            </div>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200 p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Live Preview
            </h2>
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="mb-2 inline-flex items-center justify-center size-10 rounded-full bg-orange-600/10 text-orange-600">
                <span className="text-xl">✦</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {content.heroTitle || 'Your Title Here'}
              </h3>
              <p className="text-slate-600 mb-4">
                {content.heroSubtitle || 'Your subtitle will appear here'}
              </p>
              {content.featuredQuote && (
                <blockquote className="text-lg italic text-slate-700 border-l-4 border-orange-300 pl-4 my-4 text-left">
                  {content.featuredQuote}
                </blockquote>
              )}
              <button className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg font-medium">
                {content.ctaText || 'Call to Action'}
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
