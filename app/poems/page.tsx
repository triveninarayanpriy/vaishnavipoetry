import { getAllPoems } from '@/lib/api';
import PoemsPageContent from './PoemsPageContent';

export const metadata = {
  title: 'Poetry Collection | Vaishnavi Poetry',
  description: 'Explore a curated collection of poems celebrating nature, memory, and the human condition.',
};

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function PoemsPage() {
  const poems = getAllPoems();
  
  return <PoemsPageContent poems={poems} />;
}
