'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type FontSize = 'small' | 'medium' | 'large';

const THEME_OPTIONS: { value: Theme; label: string; description: string }[] = [
  { value: 'light', label: 'Light', description: 'A clean, bright interface.' },
  { value: 'dark', label: 'Dark', description: 'Easier on the eyes at night.' },
  { value: 'system', label: 'System', description: 'Follows your OS setting.' },
];

const FONT_SIZE_OPTIONS: { value: FontSize; label: string }[] = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

export function AppearanceTab() {
  const [theme, setTheme] = useState<Theme>('system');
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Theme */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Theme</h2>
        <RadioGroup
          value={theme}
          onValueChange={(v) => setTheme(v as Theme)}
          className="mt-4 grid gap-3 sm:grid-cols-3"
        >
          {THEME_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              htmlFor={`theme-${opt.value}`}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-bg p-4 has-[[data-checked]]:border-brand has-[[data-checked]]:bg-brand/5"
            >
              <RadioGroupItem
                id={`theme-${opt.value}`}
                value={opt.value}
                className="mt-0.5 shrink-0"
              />
              <div>
                <div className="text-sm font-medium text-ink">{opt.label}</div>
                <div className="text-xs text-ink-2">{opt.description}</div>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Font size */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Font size</h2>
        <RadioGroup
          value={fontSize}
          onValueChange={(v) => setFontSize(v as FontSize)}
          className="mt-4 flex flex-wrap gap-3"
        >
          {FONT_SIZE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              htmlFor={`font-size-${opt.value}`}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-line bg-bg px-4 py-2.5 text-sm font-medium text-ink has-[[data-checked]]:border-brand has-[[data-checked]]:bg-brand/5"
            >
              <RadioGroupItem id={`font-size-${opt.value}`} value={opt.value} />
              {opt.label}
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Accessibility toggles */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Accessibility</h2>
        <div className="mt-4 flex flex-col divide-y divide-line">
          <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
            <div>
              <div className="text-sm font-medium text-ink">Dyslexia-friendly font</div>
              <div className="text-xs text-ink-2">Uses OpenDyslexic for improved readability.</div>
            </div>
            <Switch checked={dyslexiaFont} onCheckedChange={setDyslexiaFont} />
          </div>
          <div className="flex items-center justify-between gap-4 py-4 last:pb-0">
            <div>
              <div className="text-sm font-medium text-ink">High-contrast mode</div>
              <div className="text-xs text-ink-2">Increases color contrast throughout the app.</div>
            </div>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} />
          </div>
        </div>
      </div>
    </div>
  );
}
