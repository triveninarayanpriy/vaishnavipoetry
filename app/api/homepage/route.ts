import { getHomepage } from '@/lib/api';

export async function GET() {
  const homepage = getHomepage();
  return Response.json(homepage);
}
