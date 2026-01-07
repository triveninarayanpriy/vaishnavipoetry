'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Poem {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  theme: string;
  featuredImage: string;
  content: string;
}

export default function PoemsEditorPage() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [editForm, setEditForm] = useState<Poem>({
    slug: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Nature',
    excerpt: '',
    theme: 'Classic',
    featuredImage: '',
    content: '',
  });

  const categories = ['Nature', 'Love', 'Life', 'Philosophy', 'Seasons', 'Memory', 'Other'];
  const themes = ['Classic', 'Vintage', 'Modern', 'Ethereal', 'Earthy'];

  useEffect(() => {
    fetchPoems();
  }, []);

  const fetchPoems = async () => {
    try {
      const res = await fetch('/api/admin/poems');
      if (res.ok) {
        const data = await res.json();
        setPoems(data);
      }
    } catch (error) {
      console.error('Failed to fetch poems:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (poem: Poem) => {
    setEditForm(poem);
    setSelectedPoem(poem);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditForm({
      slug: '',
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Nature',
      excerpt: '',
      theme: 'Classic',
      featuredImage: '',
      content: '',
    });
    setSelectedPoem(null);
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    // Generate slug from title if creating new
    let slug = editForm.slug;
    if (isCreating && !slug) {
      slug = editForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    try {
      const res = await fetch('/api/admin/poems', {
        method: isCreating ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, slug }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: isCreating ? 'Poem created successfully!' : 'Poem updated successfully!' });
        await fetchPoems();
        if (isCreating) {
          setIsEditing(false);
          setIsCreating(false);
        }
      } else {
        setMessage({ type: 'error', text: 'Failed to save poem. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this poem?')) return;

    try {
      const res = await fetch(`/api/admin/poems?slug=${slug}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Poem deleted successfully!' });
        await fetchPoems();
        if (selectedPoem?.slug === slug) {
          setIsEditing(false);
          setSelectedPoem(null);
        }
      } else {
        setMessage({ type: 'error', text: 'Failed to delete poem.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while deleting.' });
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                  Manage Poems
                </h1>
                <p className="text-sm text-slate-600">
                  Create, edit, and organize your poetry collection
                </p>
              </div>
            </div>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Poem
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poems List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h2 className="font-semibold text-slate-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Your Poems ({poems.length})
                </h2>
              </div>
              <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                {poems.map((poem) => (
                  <div
                    key={poem.slug}
                    className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                      selectedPoem?.slug === poem.slug ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                    }`}
                    onClick={() => handleEdit(poem)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">{poem.title}</h3>
                        <p className="text-sm text-slate-500 mt-1">{poem.category}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {new Date(poem.date).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(poem.slug);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                {poems.length === 0 && (
                  <div className="p-8 text-center text-slate-500">
                    <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p>No poems yet</p>
                    <p className="text-sm mt-1">Create your first poem to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Editor Panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-slate-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {isCreating ? 'Create New Poem' : 'Edit Poem'}
                    </h2>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setIsCreating(false);
                          setSelectedPoem(null);
                        }}
                        className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                      >
                        {saving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Saving...
                          </>
                        ) : (
                          'Save Poem'
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-lg"
                        placeholder="Enter poem title"
                      />
                    </div>

                    {/* Meta Info Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          value={editForm.date?.split('T')[0] || ''}
                          onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Category
                        </label>
                        <select
                          value={editForm.category}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Theme
                        </label>
                        <select
                          value={editForm.theme}
                          onChange={(e) => setEditForm({ ...editForm, theme: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        >
                          {themes.map((theme) => (
                            <option key={theme} value={theme}>{theme}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Excerpt
                      </label>
                      <textarea
                        value={editForm.excerpt}
                        onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="A brief preview of the poem..."
                      />
                    </div>

                    {/* Featured Image */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Featured Image URL
                      </label>
                      <input
                        type="text"
                        value={editForm.featuredImage}
                        onChange={(e) => setEditForm({ ...editForm, featuredImage: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="/images/poems/my-poem.jpg"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Poem Content *
                      </label>
                      <textarea
                        value={editForm.content}
                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                        rows={15}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors font-serif"
                        placeholder="Write your poem here..."
                      />
                      <p className="mt-1 text-sm text-slate-500">Use line breaks to format stanzas</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-slate-200 p-12 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Select a poem to edit
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Choose a poem from the list or create a new one to get started
                  </p>
                  <button
                    onClick={handleCreate}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create New Poem
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
