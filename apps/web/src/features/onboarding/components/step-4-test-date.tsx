import { Icon } from '@/components/primitives/icon';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { TestFormat } from '@asvab/db';

const FORMATS: ReadonlyArray<{ v: TestFormat; short: string; label: string }> = [
  { v: 'cat', short: 'CAT', label: 'Computer Adaptive' },
  { v: 'pp', short: 'P&P', label: 'Paper & Pencil' },
  { v: 'picat', short: 'PiCAT', label: 'At home' },
];

type Props = {
  testDate: string | null;
  testFormat: TestFormat;
  notSure: boolean;
  onDateChange: (v: string) => void;
  onFormatChange: (v: TestFormat) => void;
  onNotSureChange: (v: boolean) => void;
};

function weeksUntil(iso: string | null): number | null {
  if (!iso) return null;
  const target = new Date(iso).getTime();
  if (Number.isNaN(target)) return null;
  const diff = target - Date.now();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24 * 7)));
}

export function StepTestDate({
  testDate,
  testFormat,
  notSure,
  onDateChange,
  onFormatChange,
  onNotSureChange,
}: Props) {
  const weeks = notSure ? null : weeksUntil(testDate);
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
        Step 04 · Test date
      </div>
      <h2 className="font-display text-4xl tracking-tight text-ink">When&apos;s your test?</h2>
      <p className="mt-3 text-ink-2">We&apos;ll pace your plan to peak right before.</p>
      <div className="mt-8 rounded-lg border border-line bg-surface p-6">
        <Input
          type="date"
          disabled={notSure}
          value={testDate ?? ''}
          onChange={(e) => onDateChange(e.target.value)}
          className="h-12 text-base"
        />
        <div className="mt-3 flex items-center gap-2">
          <Checkbox
            id="notsure"
            checked={notSure}
            onCheckedChange={(checked) => onNotSureChange(checked)}
          />
          <Label htmlFor="notsure" className="text-sm text-ink-2">
            Not sure yet
          </Label>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.v}
              type="button"
              aria-pressed={testFormat === f.v}
              onClick={() => onFormatChange(f.v)}
              className={cn(
                'rounded-md bg-surface p-3 text-left transition-colors',
                testFormat === f.v
                  ? 'border-2 border-ink'
                  : 'border border-line hover:border-line-strong',
              )}
            >
              <div className="text-sm font-semibold">{f.short}</div>
              <div className="mt-0.5 text-xs text-ink-3">{f.label}</div>
            </button>
          ))}
        </div>
        <hr className="my-4 border-line" />
        <div className="flex items-center gap-3">
          <Icon name="calendar" size={18} className="text-ink-3" />
          <div>
            {weeks !== null ? (
              <>
                <div className="font-semibold text-ink">
                  You have ~{weeks} {weeks === 1 ? 'week' : 'weeks'}.
                </div>
                <div className="text-sm text-ink-2">
                  We recommend 8 hours/week to safely hit your target.
                </div>
              </>
            ) : (
              <div className="text-sm text-ink-2">
                Test date TBD — you can set it later in Settings.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
