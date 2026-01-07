import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const poemsDir = path.join(process.cwd(), 'content/poems');

export async function GET() {
  try {
    if (!fs.existsSync(poemsDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(poemsDir).filter(f => f.endsWith('.md'));
    const poems = files.map(filename => {
      const filePath = path.join(poemsDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      return {
        slug: filename.replace('.md', ''),
        title: data.title || '',
        date: data.date || new Date().toISOString(),
        category: data.category || 'Nature',
        excerpt: data.excerpt || '',
        theme: data.theme || 'Classic',
        featuredImage: data.featuredImage || '',
        content: content.trim(),
      };
    });

    // Sort by date, newest first
    poems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(poems);
  } catch (error) {
    console.error('Error reading poems:', error);
    return NextResponse.json({ error: 'Failed to read poems' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, date, category, excerpt, theme, featuredImage, content } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 });
    }

    const frontmatter = {
      title,
      date: date || new Date().toISOString(),
      category: category || 'Nature',
      excerpt: excerpt || '',
      theme: theme || 'Classic',
      featuredImage: featuredImage || '',
    };

    const fileContent = matter.stringify(content || '', frontmatter);

    // Ensure directory exists
    if (!fs.existsSync(poemsDir)) {
      fs.mkdirSync(poemsDir, { recursive: true });
    }

    const filePath = path.join(poemsDir, `${slug}.md`);
    fs.writeFileSync(filePath, fileContent, 'utf8');

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error creating poem:', error);
    return NextResponse.json({ error: 'Failed to create poem' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, date, category, excerpt, theme, featuredImage, content } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const filePath = path.join(poemsDir, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
    }

    const frontmatter = {
      title: title || '',
      date: date || new Date().toISOString(),
      category: category || 'Nature',
      excerpt: excerpt || '',
      theme: theme || 'Classic',
      featuredImage: featuredImage || '',
    };

    const fileContent = matter.stringify(content || '', frontmatter);
    fs.writeFileSync(filePath, fileContent, 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating poem:', error);
    return NextResponse.json({ error: 'Failed to update poem' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const filePath = path.join(poemsDir, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
    }

    fs.unlinkSync(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting poem:', error);
    return NextResponse.json({ error: 'Failed to delete poem' }, { status: 500 });
  }
}
