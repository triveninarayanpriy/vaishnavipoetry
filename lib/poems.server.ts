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

const poemsDirectory = path.join(process.cwd(), 'content/poems');

export function getAllPoems(): Poem[] {
  // Check if directory exists
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
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        background: data.background,
        category: data.category,
        theme: data.theme,
        featuredImage: data.featuredImage,
        content: content.trim()
      };
    });

  // Sort by date, newest first
  return allPoems.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}

export function getPoemBySlug(slug: string): Poem | undefined {
  const allPoems = getAllPoems();
  return allPoems.find(poem => poem.slug === slug);
}
