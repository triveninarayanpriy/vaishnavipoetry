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

// Server-side function (use in Server Components)
export { getAllPoems, getPoemBySlug } from './poems.server';

// Client-side fetch helper for Edge Runtime compatibility
export async function fetchPoems(): Promise<Poem[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/poems`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!response.ok) throw new Error('Failed to fetch poems');
    return await response.json();
  } catch (error) {
    console.error('Error fetching poems:', error);
    return [];
  }
}

export async function fetchPoemBySlug(slug: string): Promise<Poem | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ''}/api/poems?slug=${slug}`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) throw new Error('Failed to fetch poem');
    return await response.json();
  } catch (error) {
    console.error('Error fetching poem:', error);
    return null;
  }
}

// For backwards compatibility in Server Components only
import { getAllPoems } from './poems.server';
export const poems = getAllPoems();
