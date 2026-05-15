import { Icon } from '@/components/primitives/icon';
import type { IconName } from '@/components/primitives/icon';
import { PageHeader } from '@/components/shell/page-header';
import { Button } from '@/components/ui/button';
import { PLACEHOLDER_NOTIFICATIONS } from '@/lib/placeholder-data';
import type { PlaceholderNotification } from '@/lib/placeholder-data';

const TYPE_ICON: Record<PlaceholderNotification['type'], IconName> = {
  reminder: 'bell',
  badge: 'trophy',
  plan: 'refresh',
  announcement: 'sparkles',
  streak: 'flame',
};

const FILTER_PILLS = ['All', 'Reminders', 'Achievements', 'Plan updates', 'Announcements'];

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="NOTIFICATIONS"
        title="Recent activity"
        subtitle="Reminders, plan changes, and announcements."
      />
      {/* Filter pills */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {FILTER_PILLS.map((pill) => (
          <Button key={pill} variant="ghost" size="sm" className="rounded-pill text-xs">
            {pill}
          </Button>
        ))}
      </div>

      {/* Notification list */}
      <div className="rounded-lg border border-line bg-surface shadow-card">
        {/* List header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="text-xs font-medium text-ink-3">
            {PLACEHOLDER_NOTIFICATIONS.length} notifications
          </p>
          <Button variant="ghost" size="sm" className="text-xs">
            Mark all read
          </Button>
        </div>

        {/* Rows */}
        <div className="divide-y divide-line">
          {PLACEHOLDER_NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-4 px-5 py-4 ${!n.read ? 'bg-brand-soft/10' : ''}`}
            >
              {/* Type icon */}
              <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  !n.read ? 'bg-brand-soft text-brand' : 'bg-bg-soft text-ink-3'
                }`}
              >
                <Icon name={TYPE_ICON[n.type]} size={16} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <p className="text-sm font-semibold text-ink">{n.title}</p>
                  {!n.read && (
                    <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  )}
                </div>
                <p className="mt-0.5 text-sm text-ink-3">{n.body}</p>
              </div>

              {/* Time */}
              <div className="shrink-0 text-xs text-ink-3">
                {n.daysAgo === 0 ? 'today' : n.daysAgo === 1 ? '1d ago' : `${n.daysAgo}d ago`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
