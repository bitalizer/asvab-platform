'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

/**
 * Inert (display-only) controls for the study plan page.
 * These are rendered as client components so Slider/Checkbox can mount,
 * but all interactive props are omitted — they simply show current state.
 */

export function InertIntensitySlider({ value }: { value: number }) {
  return <Slider value={[value]} min={1} max={10} aria-label="Intensity" disabled />;
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function InertRestDayCheckboxes({ restDays }: { restDays: number[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {DAY_LABELS.map((day, idx) => (
        <div key={day} className="flex cursor-default items-center gap-1.5 text-sm text-ink-2">
          <Checkbox
            id={`rest-day-${idx}`}
            checked={restDays.includes(idx)}
            readOnly
            aria-label={day}
          />
          <label htmlFor={`rest-day-${idx}`} className="cursor-default">
            {day}
          </label>
        </div>
      ))}
    </div>
  );
}
