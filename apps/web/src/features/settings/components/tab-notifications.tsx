'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

type ToggleRow = {
  id: string;
  label: string;
  description: string;
  defaultChecked: boolean;
};

const TOGGLE_ROWS: ToggleRow[] = [
  {
    id: 'daily-reminder',
    label: 'Daily reminder',
    description: 'Get a nudge to complete your daily study session.',
    defaultChecked: true,
  },
  {
    id: 'streak-warning',
    label: 'Streak warning',
    description: "We'll warn you before your streak is about to break.",
    defaultChecked: true,
  },
  {
    id: 'new-badge',
    label: 'New badge',
    description: 'Celebrate when you earn a new achievement badge.',
    defaultChecked: true,
  },
  {
    id: 'plan-adjustment',
    label: 'Plan adjustment',
    description: 'Notify when your study plan is updated by the AI.',
    defaultChecked: false,
  },
  {
    id: 'mock-exam-scheduled',
    label: 'Mock exam scheduled',
    description: "Reminder the day before a mock exam you've scheduled.",
    defaultChecked: true,
  },
  {
    id: 'weekly-report',
    label: 'Weekly report',
    description: 'A weekly summary of your progress and stats.',
    defaultChecked: true,
  },
  {
    id: 'new-lesson',
    label: 'New lesson available',
    description: 'Alert when a new lesson is added to your subject areas.',
    defaultChecked: false,
  },
];

export function NotificationsTab() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(TOGGLE_ROWS.map((r) => [r.id, r.defaultChecked])),
  );
  const [quietFrom, setQuietFrom] = useState('22:00');
  const [quietTo, setQuietTo] = useState('07:00');

  return (
    <div className="flex flex-col gap-6">
      {/* Toggle rows */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Notification preferences</h2>
        <p className="mt-1 text-sm text-ink-2">
          Choose which notifications you&apos;d like to receive.
        </p>
        <div className="mt-4 flex flex-col divide-y divide-line">
          {TOGGLE_ROWS.map((row) => (
            <div
              key={row.id}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium text-ink">{row.label}</div>
                <div className="text-xs text-ink-2">{row.description}</div>
              </div>
              <Switch
                checked={toggles[row.id]}
                onCheckedChange={(checked) =>
                  setToggles((prev) => ({ ...prev, [row.id]: checked }))
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quiet hours */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Quiet hours</h2>
        <p className="mt-1 text-sm text-ink-2">No notifications will be sent during this window.</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="quiet-from" className="text-xs font-medium text-ink-2">
              From
            </label>
            <Input
              id="quiet-from"
              type="time"
              className="w-32"
              value={quietFrom}
              onChange={(e) => setQuietFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="quiet-to" className="text-xs font-medium text-ink-2">
              To
            </label>
            <Input
              id="quiet-to"
              type="time"
              className="w-32"
              value={quietTo}
              onChange={(e) => setQuietTo(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <Button>Save preferences</Button>
      </div>
    </div>
  );
}
