import { MobileBottomNav } from '@/components/shell/mobile-bottom-nav';
import { Sidebar } from '@/components/shell/sidebar';
import { Topbar } from '@/components/shell/topbar';
import { isOnboardingComplete, requireSession } from '@/lib/data';
import { redirect } from 'next/navigation';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  if (!(await isOnboardingComplete(session.user.id))) {
    redirect('/onboarding');
  }
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="flex flex-1 flex-col pb-14 lg:pb-0">
        <div className="flex items-center justify-end border-b border-line px-6 py-5 lg:px-10 lg:py-7">
          <Topbar user={session.user} />
        </div>
        <div className="flex-1 px-6 py-6 lg:px-10 lg:py-8">{children}</div>
      </main>
      <MobileBottomNav />
    </div>
  );
}
