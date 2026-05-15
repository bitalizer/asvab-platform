'use client';

import { Icon, type IconName } from '@/components/primitives/icon';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MOBILE_NAV: Array<{ href: string; label: string; iconName: IconName }> = [
  { href: '/dashboard', label: 'Home', iconName: 'home' },
  { href: '/practice', label: 'Practice', iconName: 'target' },
  { href: '/mock-exam', label: 'Mock', iconName: 'timer' },
  { href: '/progress', label: 'Progress', iconName: 'chart' },
  { href: '/profile', label: 'Profile', iconName: 'user' },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-30 flex h-14 border-t border-line bg-surface lg:hidden"
    >
      {MOBILE_NAV.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium uppercase tracking-wider',
              active ? 'text-ink' : 'text-ink-3',
            )}
          >
            <Icon name={item.iconName} size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
