import { createClient } from '@supabase/supabase-js';

// These will be set up when Supabase is configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for future features
export interface Heart {
  id: string;
  poem_slug: string;
  user_id?: string;
  created_at: string;
}

export interface Comment {
  id: string;
  poem_slug: string;
  user_id?: string;
  username: string;
  content: string;
  created_at: string;
}

// Placeholder functions for Hearts feature
export async function getHearts(poemSlug: string): Promise<number> {
  // To be implemented with Supabase
  return 0;
}

export async function toggleHeart(poemSlug: string, userId?: string): Promise<void> {
  // To be implemented with Supabase
  console.log('Heart toggled for:', poemSlug);
}

// Placeholder functions for Comments feature
export async function getComments(poemSlug: string): Promise<Comment[]> {
  // To be implemented with Supabase
  return [];
}

export async function addComment(
  poemSlug: string, 
  username: string, 
  content: string,
  userId?: string
): Promise<void> {
  // To be implemented with Supabase
  console.log('Comment added for:', poemSlug);
}
