import { getAllPoems } from '@/lib/poems';
import PoemsPageContent from '../../components/PoemsPageContent';

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function PoemsPage() {
  const poems = getAllPoems();
  
  return <PoemsPageContent poems={poems} />;
}
