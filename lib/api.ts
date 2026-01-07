import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Poem {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  background?: string;
  category?: string;
  theme?: 'Light' | 'Dark' | 'Vintage';
  featuredImage?: string;
}

export interface About {
  title: string;
  writerPhoto: string;
  writerName: string;
  tagline: string;
  signature?: string;
  content: string;
}

export interface Homepage {
  heroTitle: string;
  heroSubtitle: string;
  featuredQuote: string;
  ctaText: string;
}

const poemsDirectory = path.join(process.cwd(), 'content/poems');
const aboutPath = path.join(process.cwd(), 'content/about.md');
const homepagePath = path.join(process.cwd(), 'content/homepage.md');

// ===== POEMS =====
export function getAllPoems(): Poem[] {
  if (!fs.existsSync(poemsDirectory)) {
    console.warn('Poems directory not found:', poemsDirectory);
    return [];
  }

  const fileNames = fs.readdirSync(poemsDirectory);
  const allPoems = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(poemsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || new Date().toISOString(),
        background: data.background,
        category: data.category,
        theme: data.theme,
        featuredImage: data.featuredImage,
        content: content.trim()
      };
    });

  return allPoems.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPoemBySlug(slug: string): Poem | null {
  const allPoems = getAllPoems();
  return allPoems.find(poem => poem.slug === slug) || null;
}

export function getPoemSlugs(): string[] {
  return getAllPoems().map(poem => poem.slug);
}

// ===== ABOUT PAGE =====
export function getAbout(): About {
  if (!fs.existsSync(aboutPath)) {
    return {
      title: 'About',
      writerPhoto: '/images/placeholder-photo.jpg',
      writerName: 'Vaishnavi',
      tagline: 'Poet & Observer',
      content: 'Welcome to my poetry portfolio.'
    };
  }

  const fileContents = fs.readFileSync(aboutPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title || 'About',
    writerPhoto: data.writerPhoto || '/images/placeholder-photo.jpg',
    writerName: data.writerName || 'Vaishnavi',
    tagline: data.tagline || 'Poet & Observer',
    signature: data.signature,
    content: content.trim()
  };
}

// ===== HOMEPAGE =====
export function getHomepage(): Homepage {
  if (!fs.existsSync(homepagePath)) {
    return {
      heroTitle: 'Vaishnavi',
      heroSubtitle: 'Where words meet the natural world.',
      featuredQuote: 'The river carries ancient songs\nOf mountain springs and rights and wrongs',
      ctaText: 'Explore the Collection'
    };
  }

  const fileContents = fs.readFileSync(homepagePath, 'utf8');
  const { data } = matter(fileContents);

  return {
    heroTitle: data.heroTitle || 'Vaishnavi',
    heroSubtitle: data.heroSubtitle || 'Where words meet the natural world.',
    featuredQuote: data.featuredQuote || 'The river carries ancient songs',
    ctaText: data.ctaText || 'Explore the Collection'
  };
}
