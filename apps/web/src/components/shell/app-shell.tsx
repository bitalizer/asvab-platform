import type { SessionUser } from '@/lib/data';
import type { ReactNode } from 'react';
import { MobileBottomNav } from './mobile-bottom-nav';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

type AppShellProps = {
  user: SessionUser;
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  eyebrow?: string;
  children: ReactNode;
};

export function AppShell({ user, title, subtitle, action, eyebrow, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="flex flex-1 flex-col pb-14 lg:pb-0">
        <Topbar user={user} title={title} subtitle={subtitle} action={action} eyebrow={eyebrow} />
        <div className="flex-1 px-6 py-6 lg:px-10 lg:py-8">{children}</div>
      </main>
      <MobileBottomNav />
    </div>
  );
}
