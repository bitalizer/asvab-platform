import { Icon } from '@/components/primitives/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { SessionUser } from '@/lib/session';
import type { ReactNode } from 'react';

type TopbarProps = {
  user: SessionUser;
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  eyebrow?: string;
};

export function Topbar({ user, title, subtitle, action, eyebrow }: TopbarProps) {
  const initial = user.name?.[0]?.toUpperCase() ?? user.email[0]?.toUpperCase() ?? '?';
  return (
    <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line px-6 py-5 lg:px-10 lg:py-7">
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-ink-3">
            {eyebrow}
          </div>
        )}
        {title && (
          <h1 className="font-display text-3xl lg:text-5xl leading-none tracking-tight text-ink">
            {title}
          </h1>
        )}
        {subtitle && (
          <div className="mt-3 max-w-xl text-base lg:text-lg text-ink-2 leading-relaxed">
            {subtitle}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {action}
        <Button variant="ghost" size="icon" aria-label="Search">
          <Icon name="search" size={15} />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Icon name="bell" size={15} />
          <span
            aria-hidden
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand"
          />
        </Button>
        <Avatar className="h-9 w-9 border border-line">
          <AvatarFallback className="bg-ink text-bg text-sm font-semibold">
            {initial}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
