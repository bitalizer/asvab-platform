import { PageHeader } from '@/components/shell/page-header';
import { Button } from '@/components/ui/button';
import { PLACEHOLDER_MISTAKES, PLACEHOLDER_SECTIONS } from '@/lib/placeholder-data';

function truncate(str: string, max: number) {
  return str.length > max ? `${str.slice(0, max)}…` : str;
}

export default function MistakesPage() {
  return (
    <>
      <PageHeader
        eyebrow="MISTAKES"
        title="Review what tripped you up"
        subtitle="Auto-curated from your past sessions."
      />
      {/* Filter bar */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <select
          disabled
          className="h-8 rounded-md border border-line bg-surface px-3 text-sm text-ink-2 opacity-70"
        >
          <option>All sections</option>
        </select>
        <select
          disabled
          className="h-8 rounded-md border border-line bg-surface px-3 text-sm text-ink-2 opacity-70"
        >
          <option>All topics</option>
        </select>
        <select
          disabled
          className="h-8 rounded-md border border-line bg-surface px-3 text-sm text-ink-2 opacity-70"
        >
          <option>All time</option>
        </select>
      </div>

      {/* Mistake list */}
      <div className="rounded-lg border border-line bg-surface shadow-card">
        <div className="divide-y divide-line">
          {PLACEHOLDER_MISTAKES.map((mistake) => {
            const section = PLACEHOLDER_SECTIONS.find((s) => s.id === mistake.sectionId);
            return (
              <div key={mistake.id} className="flex items-start gap-4 px-5 py-4">
                {/* Section badge */}
                <div className="mt-0.5 shrink-0">
                  {section && (
                    <span
                      className="inline-block rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold"
                      style={{
                        background: `hsl(${section.hue} 60% 92%)`,
                        color: `hsl(${section.hue} 55% 40%)`,
                      }}
                    >
                      {section.short}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-ink-3 mb-0.5">{mistake.topic}</p>
                  <p className="text-sm font-medium text-ink">{truncate(mistake.question, 60)}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    <span>
                      <span className="text-ink-3">Your answer: </span>
                      <span className="line-through text-danger-deep">{mistake.yourAnswer}</span>
                    </span>
                    <span>
                      <span className="text-ink-3">Correct: </span>
                      <span className="text-success-deep font-medium">{mistake.correctAnswer}</span>
                    </span>
                  </div>
                </div>

                {/* Days ago */}
                <div className="shrink-0 text-xs text-ink-3 mt-0.5">
                  {mistake.daysAgo === 0
                    ? 'today'
                    : mistake.daysAgo === 1
                      ? '1d ago'
                      : `${mistake.daysAgo}d ago`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Retry all */}
      <div className="mt-5 flex justify-end">
        <Button variant="outline">Retry all</Button>
      </div>
    </>
  );
}
