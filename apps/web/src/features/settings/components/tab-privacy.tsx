'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export function PrivacyTab() {
  const [leaderboard, setLeaderboard] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Privacy toggles */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Privacy settings</h2>
        <div className="mt-4 flex flex-col divide-y divide-line">
          <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
            <div>
              <div className="text-sm font-medium text-ink">Show on leaderboard</div>
              <div className="text-xs text-ink-2">
                Your username and score appear in public rankings.
              </div>
            </div>
            <Switch checked={leaderboard} onCheckedChange={setLeaderboard} />
          </div>
          <div className="flex items-center justify-between gap-4 py-4 last:pb-0">
            <div>
              <div className="text-sm font-medium text-ink">Marketing emails</div>
              <div className="text-xs text-ink-2">
                Receive tips, product updates, and special offers.
              </div>
            </div>
            <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
          </div>
        </div>
      </div>

      {/* Data actions */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Your data</h2>
        <p className="mt-1 text-sm text-ink-2">
          Download a copy of all your data or wipe your history.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="outline">Export my data</Button>
          <Button
            variant="outline"
            className="border-destructive/60 text-destructive hover:bg-destructive/5 hover:text-destructive"
          >
            Delete all data
          </Button>
        </div>
      </div>
    </div>
  );
}
