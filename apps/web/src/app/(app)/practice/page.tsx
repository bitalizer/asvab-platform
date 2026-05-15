import { Icon } from '@/components/primitives/icon';
import { Pill } from '@/components/primitives/pill';
import { AppShell } from '@/components/shell/app-shell';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/data';
import { PLACEHOLDER_SECTIONS } from '@/lib/placeholder-data';

const SPECIAL_MODES = [
  {
    title: 'AFQT-only Practice',
    description: 'Focus on AR, WK, PC, and MK — the four sections that determine your AFQT score.',
  },
  {
    title: 'Mixed Practice',
    description: 'Random questions drawn from all 9 sections. Great for general readiness.',
  },
  {
    title: 'Weakness Drill',
    description: 'Auto-targets your lowest-mastery sections to close the gaps fast.',
  },
  {
    title: 'Speed Drill',
    description: 'Back-to-back questions with a tight per-question timer. Builds pace.',
  },
  {
    title: 'Timed Mock',
    description: 'Full section under real exam time limits. Treat it like the real thing.',
  },
];

export default async function PracticePage() {
  const session = await getSession();
  if (!session) throw new Error('Session expected — (app)/layout guards this route');

  return (
    <AppShell
      user={session.user}
      eyebrow="PRACTICE"
      title="Practice by section"
      subtitle="Drill specific sections or run a mixed set."
    >
      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLACEHOLDER_SECTIONS.map((section) => (
          <div
            key={section.id}
            className="rounded-lg border border-line bg-surface p-4 shadow-card"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-md"
                  style={{ background: `hsl(${section.hue} 60% 92%)` }}
                >
                  <Icon name={section.iconKey} size={18} color={`hsl(${section.hue} 55% 45%)`} />
                </div>
                <div>
                  <p className="font-display text-[15px] font-semibold text-ink">{section.name}</p>
                  <p className="text-xs text-ink-3">{section.short}</p>
                </div>
              </div>
              {section.afqt && (
                <Pill variant="brand" className="shrink-0 text-[10px]">
                  AFQT
                </Pill>
              )}
            </div>

            {/* Mastery progress bar */}
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-ink-3">Mastery</span>
              <span className="font-mono text-xs text-ink-2">
                {Math.round(section.mastery * 100)}%
              </span>
            </div>
            <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-bg-soft">
              <div
                className="h-full rounded-full bg-brand transition-all"
                style={{ width: `${section.mastery * 100}%` }}
              />
            </div>

            {/* Quick-launch buttons */}
            <div className="flex gap-1.5">
              {['10Q', '25Q', '50Q', 'Custom'].map((label) => (
                <Button key={label} variant="ghost" size="sm" className="flex-1 text-xs">
                  {label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Special modes */}
      <div className="mt-10">
        <h2 className="mb-4 font-display text-lg font-semibold text-ink">Special modes</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIAL_MODES.map((mode) => (
            <button
              key={mode.title}
              type="button"
              className="rounded-lg border border-line bg-surface p-4 text-left shadow-card transition-shadow hover:shadow-hover-lift"
            >
              <p className="font-display text-[15px] font-semibold text-ink">{mode.title}</p>
              <p className="mt-1 text-sm text-ink-3">{mode.description}</p>
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
