import { isOnboardingComplete, requireSession } from '@/lib/data';
import { redirect } from 'next/navigation';

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  if (await isOnboardingComplete(session.user.id)) {
    redirect('/dashboard');
  }
  return <>{children}</>;
}
