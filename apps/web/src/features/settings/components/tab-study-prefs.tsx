'use client';

import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

type Difficulty = 'easy' | 'medium' | 'hard' | 'adaptive';

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
  { value: 'adaptive', label: 'Adaptive' },
];

export function StudyPrefsTab() {
  const [difficulty, setDifficulty] = useState<Difficulty>('adaptive');
  const [timerVisible, setTimerVisible] = useState(true);
  const [autoFlip, setAutoFlip] = useState(false);
  const [sounds, setSounds] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      {/* Daily goal */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Daily question goal</h2>
        <p className="mt-1 text-sm text-ink-2">Target number of questions to answer each day.</p>
        <div className="mt-4 flex items-center gap-3">
          <Input type="number" defaultValue={30} min={5} max={200} step={5} className="w-24" />
          <span className="text-sm text-ink-2">questions / day</span>
        </div>
      </div>

      {/* Default difficulty */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Default difficulty</h2>
        <p className="mt-1 text-sm text-ink-2">Starting difficulty for new practice sessions.</p>
        <RadioGroup
          value={difficulty}
          onValueChange={(v) => setDifficulty(v as Difficulty)}
          className="mt-4 flex flex-wrap gap-3"
        >
          {DIFFICULTY_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              htmlFor={`difficulty-${opt.value}`}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-line bg-bg px-4 py-2.5 text-sm font-medium text-ink has-[[data-checked]]:border-brand has-[[data-checked]]:bg-brand/5"
            >
              <RadioGroupItem id={`difficulty-${opt.value}`} value={opt.value} />
              {opt.label}
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Toggles */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Session options</h2>
        <div className="mt-4 flex flex-col divide-y divide-line">
          <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
            <div>
              <div className="text-sm font-medium text-ink">Timer visibility</div>
              <div className="text-xs text-ink-2">
                Show a countdown timer during timed sessions.
              </div>
            </div>
            <Switch checked={timerVisible} onCheckedChange={setTimerVisible} />
          </div>
          <div className="flex items-center justify-between gap-4 py-4">
            <div>
              <div className="text-sm font-medium text-ink">Auto-flip flashcards</div>
              <div className="text-xs text-ink-2">
                Automatically reveal the answer after a delay.
              </div>
            </div>
            <Switch checked={autoFlip} onCheckedChange={setAutoFlip} />
          </div>
          <div className="flex items-center justify-between gap-4 py-4 last:pb-0">
            <div>
              <div className="text-sm font-medium text-ink">Sound effects</div>
              <div className="text-xs text-ink-2">
                Play audio cues for correct and incorrect answers.
              </div>
            </div>
            <Switch checked={sounds} onCheckedChange={setSounds} />
          </div>
        </div>
      </div>
    </div>
  );
}
