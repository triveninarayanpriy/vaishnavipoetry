import 'server-only';

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import YAML from 'yaml';

const homePath = path.join(process.cwd(), 'content/homepage.md');
const aboutPath = path.join(process.cwd(), 'content/about.md');
const chromePath = path.join(process.cwd(), 'content/header-footer.yml');

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

export interface ChromeSettings {
  siteName: string;
  logoText: string;
  nav: { label: string; href: string; enabled?: boolean }[];
  footerText: string;
  footerCopyright: string;
}

type Frontmatter = { [key: string]: any };

function readMarkdown(filePath: string): { data: Frontmatter; content: string } {
  if (!fs.existsSync(filePath)) return { data: {}, content: '' };
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  return { data: parsed.data as Frontmatter, content: parsed.content };
}

function readYaml(filePath: string): Frontmatter {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, 'utf8');
  return YAML.parse(raw) as Frontmatter;
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

export function getChromeSettings(): ChromeSettings {
  const data = readYaml(chromePath);
  const nav = Array.isArray(data.nav) ? data.nav : [];
  return {
    siteName: (data.siteName as string) || 'The Tactile Verse',
    logoText: (data.logoText as string) || 'Tactile Verse',
    nav,
    footerText: (data.footerText as string) || 'Stillness beneath every line.',
    footerCopyright: (data.footerCopyright as string) || '© 2026 The Tactile Verse',
  };
}
