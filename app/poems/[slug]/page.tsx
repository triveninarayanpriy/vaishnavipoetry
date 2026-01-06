import { getAllPoems, getPoemBySlug } from '@/lib/poems';
import { notFound } from 'next/navigation';
import PoemContent from '@/app/poems/[slug]/PoemContent';
import { getPoemBySlugSupabase } from '@/lib/supabaseClient';

export async function generateStaticParams() {
  // Prefer filesystem slugs at build time; if none, leave empty for dynamic rendering
  const poems = getAllPoems();
  return poems.map((poem) => ({ slug: poem.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const poem = getPoemBySlug(params.slug);
  
  if (!poem) {
    return {
      title: 'Poem Not Found',
    };
  }

  return {
    title: `${poem.title} | Vaishnavi Poetry`,
    description: poem.excerpt || poem.content.substring(0, 155),
  };
}

export default async function PoemPage({ params }: { params: { slug: string } }) {
  // Try Supabase first
  const poemFromDb = await getPoemBySlugSupabase(params.slug);
  const poem = poemFromDb || getPoemBySlug(params.slug);

  if (!poem) {
    notFound();
  }

  return <PoemContent poem={poem} />;
}
