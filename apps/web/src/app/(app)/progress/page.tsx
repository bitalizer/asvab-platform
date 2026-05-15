import { Sparkline } from '@/components/charts/sparkline';
import { PageHeader } from '@/components/shell/page-header';
import { PLACEHOLDER_SECTIONS, PLACEHOLDER_USER } from '@/lib/placeholder-data';

// Generate 14-point AFQT trend climbing from startAfqt to currentAfqt
function buildAfqtTrend(start: number, end: number, points = 14): number[] {
  return Array.from({ length: points }, (_, i) => {
    const t = i / (points - 1);
    // slight easing so it looks organic
    return Math.round(start + (end - start) * (t * t * (3 - 2 * t)));
  });
}

// Pre-build heatmap data so JSX keys are derived from content, not loop indices.
type HeatmapWeek = { weekKey: string; days: { cellKey: string; opacity: number; label: string }[] };
function buildHeatmap(weeks = 30): HeatmapWeek[] {
  return Array.from({ length: weeks }, (_, w) => ({
    weekKey: `hm-w${w}`,
    days: Array.from({ length: 7 }, (__, d) => {
      const cell = w * 7 + d;
      return {
        cellKey: `hm-c${cell}`,
        opacity: 0.1 + (((cell * 37) % 10) / 10) * 0.9,
        label: `Week ${w + 1}, day ${d + 1}`,
      };
    }),
  }));
}

export default function ProgressPage() {
  const { questionsTotal, studyMinutesWeek, currentAfqt, startAfqt } = PLACEHOLDER_USER;
  const afqtTrend = buildAfqtTrend(startAfqt, currentAfqt);
  const heatmap = buildHeatmap();

  const stats = [
    { label: 'Total questions', value: questionsTotal.toLocaleString() },
    {
      label: 'Study time',
      value: `${Math.round(studyMinutesWeek / 60)}h this week`,
    },
    { label: 'Mock exams taken', value: '3' },
    { label: 'Predicted AFQT', value: String(currentAfqt) },
  ];

  return (
    <>
      <PageHeader
        eyebrow="PROGRESS"
        title="Your trajectory"
        subtitle="Where you started, where you are, where you're going."
      />
      {/* 4-stat top row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-line bg-surface p-4 shadow-card"
          >
            <p className="text-xs text-ink-3">{stat.label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* AFQT trend + Section mastery */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {/* AFQT trend */}
        <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
          <h2 className="mb-1 font-display text-[15px] font-semibold text-ink">AFQT trend</h2>
          <p className="mb-4 text-xs text-ink-3">
            Last {afqtTrend.length} sessions — {startAfqt} → {currentAfqt}
          </p>
          <Sparkline points={afqtTrend} width={360} height={64} />
          <div className="mt-3 flex items-center justify-between text-xs text-ink-3">
            <span>Start: {startAfqt}</span>
            <span className="text-brand font-semibold">Now: {currentAfqt}</span>
          </div>
        </div>

        {/* Section mastery */}
        <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
          <h2 className="mb-4 font-display text-[15px] font-semibold text-ink">Section mastery</h2>
          <div className="flex flex-col gap-3">
            {PLACEHOLDER_SECTIONS.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <span className="w-8 shrink-0 font-mono text-xs text-ink-3">{s.short}</span>
                <div className="flex-1">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-soft">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${s.mastery * 100}%` }}
                    />
                  </div>
                </div>
                <span className="w-8 text-right font-mono text-xs text-ink-2">
                  {Math.round(s.mastery * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study consistency heatmap */}
      <div className="mt-6 rounded-lg border border-line bg-surface p-5 shadow-card">
        <h2 className="mb-4 font-display text-[15px] font-semibold text-ink">Study consistency</h2>
        <p className="mb-4 text-xs text-ink-3">Last 30 weeks · darker = more study</p>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {heatmap.map((week) => (
            <div key={week.weekKey} className="flex flex-col gap-1">
              {week.days.map((day) => (
                <div
                  key={day.cellKey}
                  className="h-3 w-3 rounded-sm bg-brand"
                  style={{ opacity: day.opacity }}
                  title={day.label}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-ink-3">
          <span>Less</span>
          {[0.1, 0.35, 0.6, 0.85, 1.0].map((o) => (
            <div key={o} className="h-3 w-3 rounded-sm bg-brand" style={{ opacity: o }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </>
  );
}
