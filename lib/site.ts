import 'server-only';

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const homePath = path.join(process.cwd(), 'content/homepage.md');
const aboutPath = path.join(process.cwd(), 'content/about.md');

export interface HomeContent {
  welcomeTitle: string;
  welcomeText: string;
  ctaLabel: string;
  ctaSecondaryLabel?: string;
  featuredQuote?: string;
  body?: string;
}

export interface AboutContent {
  title: string;
  authorName?: string;
  authorPhoto?: string;
  body: string;
}

type Frontmatter = { [key: string]: any };

function readMarkdown(filePath: string): { data: Frontmatter; content: string } {
  if (!fs.existsSync(filePath)) return { data: {}, content: '' };
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  return { data: parsed.data as Frontmatter, content: parsed.content };
}

export function getHomeContent(): HomeContent {
  const { data, content } = readMarkdown(homePath);
  return {
    welcomeTitle: (data.welcomeTitle as string) || 'The Tactile Verse',
    welcomeText: (data.welcomeText as string) || 'A calm, premium space for tactile poetry, rendered statically from markdown.',
    ctaLabel: (data.ctaLabel as string) || 'Start Reading',
    ctaSecondaryLabel: data.ctaSecondaryLabel as string | undefined,
    featuredQuote: data.featuredQuote as string | undefined,
    body: content?.trim() || undefined,
  };
}

export function getAboutContent(): AboutContent {
  const { data, content } = readMarkdown(aboutPath);
  return {
    title: (data.title as string) || 'About',
    authorName: data.authorName as string | undefined,
    authorPhoto: data.authorPhoto as string | undefined,
    body: content?.trim() || '',
  };
}
