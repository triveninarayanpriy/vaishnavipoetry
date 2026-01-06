import { createClient } from '@supabase/supabase-js';
import type { Poem } from './poems';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function getPoemBySlugSupabase(slug: string): Promise<Poem | null> {
  const supabase = getClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('poems')
    .select('slug,title,content,excerpt,date,background,category,theme,featuredImage')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Supabase getPoemBySlug error:', error.message);
    return null;
  }
  return (data as Poem) || null;
}

export async function getAllPoemSlugsSupabase(): Promise<string[]> {
  const supabase = getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('poems')
    .select('slug');

  if (error) {
    console.error('Supabase getAllPoemSlugs error:', error.message);
    return [];
  }
  return (data || []).map((row: { slug: string }) => row.slug);
}
