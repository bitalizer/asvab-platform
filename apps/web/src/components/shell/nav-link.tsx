'use client';

import { Icon, type IconName } from '@/components/primitives/icon';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  label: string;
  iconName: IconName;
};

export function NavLink({ href, label, iconName }: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
        active
          ? 'bg-surface font-semibold text-ink shadow-card'
          : 'text-ink-2 hover:bg-surface hover:text-ink',
      )}
    >
      <Icon name={iconName} size={18} />
      <span>{label}</span>
    </Link>
  );
}
