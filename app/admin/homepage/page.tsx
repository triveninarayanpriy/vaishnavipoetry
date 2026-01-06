'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminHomepagePage() {
  const [title, setTitle] = useState('The Tactile Verse');
  const [subtitle, setSubtitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchHomepage();
  }, []);

  async function fetchHomepage() {
    try {
      const res = await fetch('/api/homepage');
      const data = await res.json();
      setTitle(data.title || 'The Tactile Verse');
      setSubtitle(data.subtitle || '');
    } catch (error) {
      console.error('Failed to fetch homepage:', error);
    }
  }

  async function handleSave() {
    setLoading(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, subtitle })
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Homepage header updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to update homepage header');
      }
    } catch (error) {
      setMessage('Error saving changes');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/admin" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
            ← Back to Admin
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 border border-[#EBE8E1]">
          <h1 className="font-serif text-3xl font-bold text-slate-900 mb-6">Edit Homepage Header</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Main Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none"
                placeholder="The Tactile Verse"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subtitle / Description
              </label>
              <textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none"
                placeholder="Nature distilled into words..."
              />
            </div>

            {message && (
              <div className={`p-4 rounded-lg text-sm font-medium ${
                message.includes('successfully') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={fetchHomepage}
                disabled={loading}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-orange-50 rounded-lg border border-orange-200">
          <h2 className="font-serif text-lg font-bold text-slate-900 mb-3">Preview</h2>
          <div className="text-center space-y-3">
            <h3 className="font-serif text-3xl font-bold text-slate-900">{title}</h3>
            <p className="text-slate-700/80">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
