import { Icon } from '@/components/primitives/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { SessionUser } from '@/lib/data';

type TopbarProps = {
  user: SessionUser;
};

/**
 * Persistent top-right cluster: search, notifications, avatar.
 *
 * Rendered once by `(app)/layout.tsx` so it does not re-mount on intra-route
 * navigation. Per-page title/subtitle/action live in `<PageHeader>`.
 */
export function Topbar({ user }: TopbarProps) {
  const initial = user.name?.[0]?.toUpperCase() ?? user.email[0]?.toUpperCase() ?? '?';
  return (
    <div className="flex items-center gap-2">
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
        <AvatarFallback className="bg-ink text-bg text-sm font-semibold">{initial}</AvatarFallback>
      </Avatar>
    </div>
  );
}
