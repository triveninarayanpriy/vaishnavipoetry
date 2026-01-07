import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const homePath = path.join(process.cwd(), 'content/homepage.md');

export async function GET() {
  try {
    if (!fs.existsSync(homePath)) {
      return NextResponse.json({
        heroTitle: 'The Tactile Verse',
        heroSubtitle: 'Nature distilled into words. An unbleached, minimalist collection of tactile poetry.',
        featuredQuote: '',
        ctaText: 'Explore the Collection',
        authorByline: 'By Vaishnavi',
      });
    }

    const fileContent = fs.readFileSync(homePath, 'utf8');
    const { data } = matter(fileContent);

    return NextResponse.json({
      heroTitle: data.heroTitle || 'The Tactile Verse',
      heroSubtitle: data.heroSubtitle || '',
      featuredQuote: data.featuredQuote || '',
      ctaText: data.ctaText || 'Explore the Collection',
      authorByline: data.authorByline || 'By Vaishnavi',
    });
  } catch (error) {
    console.error('Error reading homepage content:', error);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { heroTitle, heroSubtitle, featuredQuote, ctaText, authorByline } = body;

    const frontmatter = {
      heroTitle: heroTitle || 'The Tactile Verse',
      heroSubtitle: heroSubtitle || '',
      featuredQuote: featuredQuote || '',
      ctaText: ctaText || 'Explore the Collection',
      authorByline: authorByline || 'By Vaishnavi',
    };

    const content = matter.stringify('', frontmatter);

    // Ensure directory exists
    const dir = path.dirname(homePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(homePath, content, 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving homepage content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
