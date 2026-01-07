import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const aboutPath = path.join(process.cwd(), 'content/about.md');

export async function GET() {
  try {
    if (!fs.existsSync(aboutPath)) {
      return NextResponse.json({
        title: 'About',
        writerName: 'Vaishnavi',
        tagline: 'Poet & Observer of Life',
        writerPhoto: '',
        location: 'New Delhi, India',
        bio: '',
        quote: '',
      });
    }

    const fileContent = fs.readFileSync(aboutPath, 'utf8');
    const { data, content } = matter(fileContent);

    return NextResponse.json({
      title: data.title || 'About',
      writerName: data.writerName || 'Vaishnavi',
      tagline: data.tagline || '',
      writerPhoto: data.writerPhoto || '',
      location: data.location || '',
      bio: content.trim(),
      quote: data.quote || '',
    });
  } catch (error) {
    console.error('Error reading about content:', error);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, writerName, tagline, writerPhoto, location, bio, quote } = body;

    const frontmatter = {
      title: title || 'About',
      writerName: writerName || 'Vaishnavi',
      tagline: tagline || '',
      writerPhoto: writerPhoto || '',
      location: location || '',
      quote: quote || '',
    };

    const content = matter.stringify(bio || '', frontmatter);

    // Ensure directory exists
    const dir = path.dirname(aboutPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(aboutPath, content, 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving about content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
