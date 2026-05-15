'use client';

import { Ring } from '@/components/charts/ring';
import { Icon } from '@/components/primitives/icon';
import { Button } from '@/components/ui/button';
import type { PlaceholderTask } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type Props = { initialTasks: PlaceholderTask[] };

export function TodayPlan({ initialTasks }: Props) {
  const [tasks, setTasks] = useState(initialTasks);
  const doneCount = tasks.filter((t) => t.done).length;
  const totalMin = tasks.reduce((s, t) => s + (Number.parseInt(t.time, 10) || 0), 0);

  function toggle(id: number) {
    setTasks((cur) => cur.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="font-display text-xl tracking-tight">Today's Plan</div>
          <div className="mt-1 text-sm text-ink-2">
            {doneCount} of {tasks.length} done · ~{totalMin} min total
          </div>
        </div>
        <Ring value={doneCount} max={tasks.length} size={56} stroke={5}>
          <div className="font-display font-mono text-sm">
            {Math.round((doneCount / Math.max(tasks.length, 1)) * 100)}%
          </div>
        </Ring>
      </div>
      <div className="flex flex-col gap-1.5">
        {tasks.map((t, i) => (
          <div
            key={t.id}
            className={cn(
              'flex items-center gap-3 rounded-md p-3 transition-colors',
              t.done && 'opacity-60',
              t.focus && !t.done && 'border border-brand bg-brand-soft',
              !t.focus && !t.done && 'border border-transparent',
            )}
          >
            <span className="w-6 font-mono text-xs text-ink-3">
              {String(i + 1).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => toggle(t.id)}
              aria-pressed={t.done}
              aria-label={`Mark ${t.title} ${t.done ? 'incomplete' : 'complete'}`}
              className={cn(
                'grid h-[18px] w-[18px] shrink-0 place-items-center rounded-sm border-2 transition-colors',
                t.done ? 'border-brand bg-brand' : 'border-line-strong',
              )}
            >
              {t.done && <Icon name="check" size={11} color="white" strokeWidth={3} />}
            </button>
            <Icon
              name={t.iconKey}
              size={15}
              className={t.focus && !t.done ? 'text-brand' : 'text-ink-3'}
            />
            <div className="min-w-0 flex-1">
              <div className={cn('text-sm font-medium', t.done && 'text-ink-3 line-through')}>
                {t.title}
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-ink-3">
                <span>{t.chip}</span>
                <span aria-hidden>·</span>
                <span>{t.time}</span>
                {t.focus && !t.done && (
                  <>
                    <span aria-hidden>·</span>
                    <span className="text-brand">FOCUS</span>
                  </>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                /* no-op until session page exists */
              }}
            >
              {t.done ? 'Review' : t.focus ? 'Begin' : 'Start'} <Icon name="arrow" size={12} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
