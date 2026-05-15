import { Pill } from '@/components/primitives/pill';
import { AppShell } from '@/components/shell/app-shell';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/data';
import { PLACEHOLDER_LESSONS, PLACEHOLDER_SECTIONS } from '@/lib/placeholder-data';
import type { PlaceholderLesson } from '@/lib/placeholder-data';

const SECTION_FILTERS = ['All', 'MK', 'WK', 'PC', 'AR', 'GS', 'EI', 'AS', 'MC', 'AO'];

function statusPillVariant(status: PlaceholderLesson['status']) {
  if (status === 'completed') return 'success' as const;
  if (status === 'in_progress') return 'brand' as const;
  return 'default' as const;
}

function statusLabel(status: PlaceholderLesson['status']) {
  if (status === 'completed') return 'Completed';
  if (status === 'in_progress') return 'In progress';
  return 'Not started';
}

function LessonCard({ lesson }: { lesson: PlaceholderLesson }) {
  const section = PLACEHOLDER_SECTIONS.find((s) => s.id === lesson.sectionId);

  return (
    <div className="flex flex-col rounded-lg border border-line bg-surface p-4 shadow-card">
      <div className="mb-2 flex items-center gap-2">
        {section && (
          <span
            className="rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold"
            style={{
              background: `hsl(${section.hue} 60% 92%)`,
              color: `hsl(${section.hue} 55% 40%)`,
            }}
          >
            {section.short}
          </span>
        )}
        <Pill variant={statusPillVariant(lesson.status)} className="text-[10px]">
          {statusLabel(lesson.status)}
        </Pill>
      </div>
      <h3 className="font-display text-[15px] font-semibold text-ink">{lesson.title}</h3>
      <p className="mt-1 font-mono text-xs text-ink-3">{lesson.duration}</p>
      {lesson.progress > 0 && lesson.progress < 1 && (
        <div className="mt-3">
          <div className="h-1 w-full overflow-hidden rounded-full bg-bg-soft">
            <div
              className="h-full rounded-full bg-brand"
              style={{ width: `${lesson.progress * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default async function LearnPage() {
  const session = await getSession();
  if (!session) throw new Error('Session expected — (app)/layout guards this route');

  const recommended = PLACEHOLDER_LESSONS.filter((l) => l.sectionId === 'mk');

  return (
    <AppShell
      user={session.user}
      eyebrow="LESSONS"
      title="Pick something to learn"
      subtitle="Browse by section or pick up where you left off."
    >
      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {SECTION_FILTERS.map((f) => (
          <Button key={f} variant="ghost" size="sm" className="rounded-pill text-xs">
            {f}
          </Button>
        ))}
      </div>

      {/* Recommended */}
      <section className="mb-8">
        <h3 className="mb-3 font-display text-[15px] font-semibold text-ink">
          Recommended for you
          <span className="ml-2 text-xs font-normal text-ink-3">
            · Math Knowledge (your weakest section)
          </span>
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>

      {/* All lessons */}
      <section>
        <h3 className="mb-3 font-display text-[15px] font-semibold text-ink">All lessons</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_LESSONS.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
