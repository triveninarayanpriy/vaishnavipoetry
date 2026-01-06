import { getAllPoems, getPoemBySlug } from '@/lib/poems';
import { notFound } from 'next/navigation';
import PoemContent from './PoemContent';

export async function generateStaticParams() {
  const poems = getAllPoems();
  return poems.map((poem) => ({
    slug: poem.slug,
  }));
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
  const poem = getPoemBySlug(params.slug);
  
  if (!poem) {
    notFound();
  }

  return <PoemContent poem={poem} />;
}
