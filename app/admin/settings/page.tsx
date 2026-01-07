'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SiteSettings {
  siteName: string;
  siteUrl: string;
  siteDescription: string;
  siteKeywords: string;
  authorName: string;
  // Header
  headerLogo: string;
  headerLogoText: string;
  showAdminLink: boolean;
  // Footer
  footerText: string;
  footerCopyright: string;
  socialTwitter: string;
  socialInstagram: string;
  socialEmail: string;
  // Navigation
  navItems: { label: string; href: string; enabled: boolean }[];
}

const defaultNavItems = [
  { label: 'Home', href: '/', enabled: true },
  { label: 'Poems', href: '/poems', enabled: true },
  { label: 'About', href: '/about', enabled: true },
  { label: 'Admin', href: '/admin', enabled: true },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: '',
    siteUrl: '',
    siteDescription: '',
    siteKeywords: '',
    authorName: '',
    headerLogo: '',
    headerLogoText: '',
    showAdminLink: true,
    footerText: '',
    footerCopyright: '',
    socialTwitter: '',
    socialInstagram: '',
    socialEmail: '',
    navItems: defaultNavItems,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'header' | 'footer' | 'seo'>('general');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings({ ...settings, ...data });
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving.' });
    } finally {
      setSaving(false);
    }
  };

  const updateNavItem = (index: number, field: string, value: string | boolean) => {
    const newNavItems = [...settings.navItems];
    newNavItems[index] = { ...newNavItems[index], [field]: value };
    setSettings({ ...settings, navItems: newNavItems });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'header', label: 'Header & Navigation', icon: '📍' },
    { id: 'footer', label: 'Footer', icon: '📄' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                  Site Settings
                </h1>
                <p className="text-sm text-slate-600">
                  Configure header, footer, navigation, and SEO
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
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                General Information
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Vaishnavi Poetry"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Site URL
                    </label>
                    <input
                      type="text"
                      value={settings.siteUrl}
                      onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="https://vaishnavipoetry.me"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={settings.authorName}
                    onChange={(e) => setSettings({ ...settings, authorName: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="Vaishnavi"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Header & Navigation Tab */}
          {activeTab === 'header' && (
            <>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Header Settings
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Logo Image URL (optional)
                      </label>
                      <input
                        type="text"
                        value={settings.headerLogo}
                        onChange={(e) => setSettings({ ...settings, headerLogo: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        placeholder="/images/logo.png"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Logo Text
                      </label>
                      <input
                        type="text"
                        value={settings.headerLogoText}
                        onChange={(e) => setSettings({ ...settings, headerLogoText: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        placeholder="Vaishnavi"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="showAdminLink"
                      checked={settings.showAdminLink}
                      onChange={(e) => setSettings({ ...settings, showAdminLink: e.target.checked })}
                      className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="showAdminLink" className="text-sm text-slate-700">
                      Show Admin link in navigation
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Navigation Links
                </h2>

                <div className="space-y-4">
                  {settings.navItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                      <input
                        type="checkbox"
                        checked={item.enabled}
                        onChange={(e) => updateNavItem(index, 'enabled', e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                      />
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => updateNavItem(index, 'label', e.target.value)}
                          className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          placeholder="Label"
                        />
                        <input
                          type="text"
                          value={item.href}
                          onChange={(e) => updateNavItem(index, 'href', e.target.value)}
                          className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          placeholder="/path"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Footer Tab */}
          {activeTab === 'footer' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-3.5-3.5A2 2 0 0015.5 4H14" />
                </svg>
                Footer Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Footer Text / Tagline
                  </label>
                  <textarea
                    value={settings.footerText}
                    onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="A quiet space for poetry and reflection..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Copyright Text
                  </label>
                  <input
                    type="text"
                    value={settings.footerCopyright}
                    onChange={(e) => setSettings({ ...settings, footerCopyright: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="© 2026 Vaishnavi Poetry. All rights reserved."
                  />
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-sm font-medium text-slate-900 mb-4">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Twitter/X</label>
                      <input
                        type="text"
                        value={settings.socialTwitter}
                        onChange={(e) => setSettings({ ...settings, socialTwitter: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Instagram</label>
                      <input
                        type="text"
                        value={settings.socialInstagram}
                        onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Email</label>
                      <input
                        type="email"
                        value={settings.socialEmail}
                        onChange={(e) => setSettings({ ...settings, socialEmail: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        placeholder="hello@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                SEO Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="Explore poetry celebrating nature, memory, and the human condition through thoughtful verse and observation."
                  />
                  <p className="mt-1 text-sm text-slate-500">
                    This appears in search engine results. Keep it under 160 characters.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={settings.siteKeywords}
                    onChange={(e) => setSettings({ ...settings, siteKeywords: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="poetry, nature poetry, original poetry, literature, creative writing"
                  />
                  <p className="mt-1 text-sm text-slate-500">
                    Separate keywords with commas
                  </p>
                </div>

                {/* SEO Preview */}
                <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Search Engine Preview</h3>
                  <div className="bg-white p-4 rounded border border-slate-200">
                    <p className="text-blue-600 text-lg hover:underline cursor-pointer">
                      {settings.siteName || 'Site Name'} | Poetry Collection
                    </p>
                    <p className="text-green-700 text-sm">{settings.siteUrl || 'https://example.com'}</p>
                    <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                      {settings.siteDescription || 'Your site description will appear here...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
