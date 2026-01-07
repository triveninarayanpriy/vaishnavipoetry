import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

export default function AdminPage() {
  // Redirect to the static Decap CMS at /admin/index.html
  redirect('/admin/index.html');
}
