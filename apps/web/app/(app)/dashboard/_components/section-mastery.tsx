import { Sparkline } from '@/components/charts/sparkline';
import { Icon } from '@/components/primitives/icon';
import type { PlaceholderSection } from '@/lib/placeholder-data';

type Props = { sections: PlaceholderSection[] };

function tier(pct: number): { name: string; color: string } {
  if (pct >= 80) return { name: 'Mastered', color: 'var(--success-deep)' };
  if (pct >= 65) return { name: 'Proficient', color: 'var(--brand)' };
  if (pct >= 50) return { name: 'Developing', color: 'var(--warning-deep)' };
  return { name: 'Beginner', color: 'var(--danger-deep)' };
}

export function SectionMastery({ sections }: Props) {
  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="font-display text-xl tracking-tight">Section mastery</div>
          <div className="mt-1 text-sm text-ink-2">9 subtests · AFQT-critical highlighted</div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s, i) => {
          const pct = Math.round(s.mastery * 100);
          const t = tier(pct);
          const spark = [pct - 12, pct - 8, pct - 9, pct - 5, pct - 3, pct - 2, pct].map((v) =>
            Math.max(0, v),
          );
          return (
            <div
              key={s.id}
              className={`rounded-md border p-4 transition-shadow hover:shadow-card ${s.afqt ? 'border-ink bg-surface' : 'border-line bg-bg-soft'}`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-ink-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon name={s.iconKey} size={14} className="text-ink-3" />
                  <span className="font-mono text-xs font-semibold">{s.short}</span>
                </div>
                {s.afqt && (
                  <span className="rounded-sm bg-ink px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-bg">
                    AFQT
                  </span>
                )}
              </div>
              <div className="text-sm font-semibold leading-tight">{s.name}</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-ink-3">
                {t.name}
              </div>
              <div className="mt-3 flex items-end gap-2">
                <div
                  className="font-display font-mono text-3xl leading-none tracking-tight"
                  style={{ color: t.color }}
                >
                  {pct}
                  <span className="text-sm text-ink-3">%</span>
                </div>
                <div className="flex-1">
                  <Sparkline points={spark} width={80} height={24} color={t.color} fill={false} />
                </div>
              </div>
              <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-line-2">
                <div className="h-full" style={{ width: `${pct}%`, background: t.color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
