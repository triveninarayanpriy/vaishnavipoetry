import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

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

function getAllPoems(): Poem[] {
  if (!fs.existsSync(poemsDirectory)) {
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

  return allPoems.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    const allPoems = getAllPoems();

    if (slug) {
      const poem = allPoems.find(p => p.slug === slug);
      if (!poem) {
        return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
      }
      return NextResponse.json(poem);
    }

    return NextResponse.json(allPoems);
  } catch (error) {
    console.error('Error loading poems:', error);
    return NextResponse.json(
      { error: 'Failed to load poems' },
      { status: 500 }
    );
  }
}
