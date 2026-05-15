import { Icon } from '@/components/primitives/icon';
import type { PlaceholderBadge } from '@/lib/placeholder-data';

type Props = { badges: PlaceholderBadge[]; totalCount: number };

export function RecentBadges({ badges, totalCount }: Props) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-display text-base tracking-tight">Recent achievements</div>
        <span className="text-xs text-ink-2">All {totalCount} →</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {badges.map((b) => (
          <div key={b.name} className="rounded-md border border-line bg-bg-soft p-2.5 text-center">
            <Icon name={b.iconKey} size={20} className="mx-auto text-brand" />
            <div className="mt-2 text-[11px] font-semibold">{b.name}</div>
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-3">
              {b.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
