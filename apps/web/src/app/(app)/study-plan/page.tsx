import { Icon } from '@/components/primitives/icon';
import { AppShell } from '@/components/shell/app-shell';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/data';
import { PLACEHOLDER_TODAY_TASKS } from '@/lib/placeholder-data';
import { InertIntensitySlider, InertRestDayCheckboxes } from './_components/inert-controls';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Spread today's tasks across the week for display variety
function getTasksForDay(dayIndex: number) {
  // rotate tasks by day index so each column looks different
  return PLACEHOLDER_TODAY_TASKS.slice(0, 2 + (dayIndex % 2)).map((t, i) => ({
    ...t,
    id: t.id * 10 + dayIndex * 100 + i,
  }));
}

const typeColorMap: Record<string, string> = {
  practice: 'bg-brand-soft text-brand-deep',
  lesson: 'bg-info-soft text-ink-2',
  flash: 'bg-warning-soft text-warning-deep',
  drill: 'bg-danger-soft text-danger-deep',
};

export default async function StudyPlanPage() {
  const session = await getSession();
  if (!session) throw new Error('Session expected — (app)/layout guards this route');

  return (
    <AppShell
      user={session.user}
      eyebrow="STUDY PLAN"
      title="Your weekly schedule"
      subtitle="Adapt to your test date, hours, and weak sections."
    >
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main calendar area */}
        <div className="flex-1 min-w-0">
          {/* View toggle */}
          <div className="mb-4 flex gap-1">
            {['Day', 'Week', 'Month', 'List'].map((v) => (
              <Button
                key={v}
                variant="ghost"
                size="sm"
                className={
                  v === 'Week'
                    ? 'bg-bg-soft text-ink border-line border text-xs'
                    : 'text-xs text-ink-3'
                }
              >
                {v}
              </Button>
            ))}
          </div>

          {/* 7-column week grid */}
          <div className="grid grid-cols-7 gap-2 overflow-x-auto">
            {DAY_LABELS.map((day, dayIndex) => {
              const tasks = getTasksForDay(dayIndex);
              return (
                <div key={day} className="rounded-lg border border-line bg-surface p-2 shadow-card">
                  <p className="mb-2 text-center font-mono text-xs text-ink-3">{day}</p>
                  <div className="flex flex-col gap-1.5">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`rounded px-1.5 py-1 text-[10px] leading-tight ${typeColorMap[task.type] ?? 'bg-bg-soft text-ink-3'}`}
                      >
                        <span className="line-clamp-2">{task.chip}</span>
                        <span className="mt-0.5 block font-mono opacity-70">{task.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Plan settings sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h3 className="mb-4 font-display text-[15px] font-semibold text-ink">Plan settings</h3>

            {/* Intensity */}
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-ink">Intensity</p>
                <span className="font-mono text-xs text-ink-3">5 / 10</span>
              </div>
              <InertIntensitySlider value={5} />
              <div className="mt-1 flex justify-between text-[10px] text-ink-3">
                <span>Light</span>
                <span>Intense</span>
              </div>
            </div>

            {/* Rest days */}
            <div className="mb-5">
              <p className="mb-2 text-sm font-medium text-ink">Rest days</p>
              <InertRestDayCheckboxes restDays={[5, 6]} />
            </div>

            {/* Regenerate */}
            <Button className="w-full" size="sm">
              <Icon name="refresh" size={14} />
              Regenerate plan
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
