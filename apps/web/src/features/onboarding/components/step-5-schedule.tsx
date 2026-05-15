import { cn } from '@/lib/utils';
import type { StudyTime } from '@asvab/db';

export type HoursBucket = '1-3' | '4-7' | '8-15' | '15+';

const HOURS: ReadonlyArray<{ v: HoursBucket; tag: string }> = [
  { v: '1-3', tag: 'Light' },
  { v: '4-7', tag: 'Casual' },
  { v: '8-15', tag: 'Recommended' },
  { v: '15+', tag: 'Intense' },
];

const TIMES: ReadonlyArray<{ v: StudyTime; label: string }> = [
  { v: 'morning', label: 'Morning' },
  { v: 'afternoon', label: 'Afternoon' },
  { v: 'evening', label: 'Evening' },
  { v: 'late_night', label: 'Late night' },
  { v: 'weekends', label: 'Weekends' },
];

type Props = {
  hours: HoursBucket;
  times: StudyTime[];
  onHoursChange: (h: HoursBucket) => void;
  onTimesToggle: (t: StudyTime) => void;
};

export function StepSchedule({ hours, times, onHoursChange, onTimesToggle }: Props) {
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
        Step 05 · Schedule
      </div>
      <h2 className="font-display text-4xl tracking-tight text-ink">
        How much time can you put in?
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-3">
        {HOURS.map((h) => (
          <button
            key={h.v}
            type="button"
            aria-pressed={hours === h.v}
            onClick={() => onHoursChange(h.v)}
            className={cn(
              'rounded-md p-5 text-left transition-colors bg-surface',
              hours === h.v ? 'border-2 border-ink' : 'border border-line hover:border-line-strong',
            )}
          >
            <div className="font-display text-2xl">{h.v} hrs/wk</div>
            <div className="mt-1 text-xs font-medium text-ink-3">{h.tag}</div>
          </button>
        ))}
      </div>
      <div className="mt-6">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
          When do you study best?
        </div>
        <div className="flex flex-wrap gap-2">
          {TIMES.map((t) => {
            const sel = times.includes(t.v);
            return (
              <button
                key={t.v}
                type="button"
                aria-pressed={sel}
                onClick={() => onTimesToggle(t.v)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-sm transition-colors',
                  sel
                    ? 'border-brand bg-brand-soft text-brand-deep'
                    : 'border-line bg-surface text-ink-2 hover:border-line-strong',
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
