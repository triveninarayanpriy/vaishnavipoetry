import { getAbout } from '@/lib/api';

export async function GET() {
  const about = getAbout();
  return Response.json(about);
}
