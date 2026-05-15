import { getSession } from '@/lib/data';
import { redirect } from 'next/navigation';

export default async function RootPage() {
  const session = await getSession();
  if (!session) {
    // Plan 09 builds the marketing landing. Until then, route to /login.
    redirect('/login');
  }
  redirect('/dashboard');
}
