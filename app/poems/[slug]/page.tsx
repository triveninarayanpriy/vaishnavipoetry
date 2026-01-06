import { getPoemBySlug, getPoemSlugs } from '@/lib/api';
import { notFound } from 'next/navigation';
import PoemContent from './PoemContent';

// Enable dynamic route segments for any poems added via CMS
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = getPoemSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);
  
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

export default async function PoemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);
  
  if (!poem) {
    notFound();
  }

  return <PoemContent poem={poem} />;
}
