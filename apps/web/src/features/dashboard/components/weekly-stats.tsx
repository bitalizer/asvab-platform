import { Sparkline } from '@/components/charts/sparkline';

type Stat = { label: string; value: string; delta?: string; sub?: string };

type Props = { stats: Stat[]; afqtTrend: number[] };

function Metric({ label, value, delta, sub }: Stat) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-3">{label}</div>
      <div className="mt-1 flex items-end gap-2">
        <div className="font-display font-mono text-2xl leading-none tracking-tight">{value}</div>
        {delta && (
          <div className="text-[10px] font-semibold uppercase tracking-wider text-success-deep">
            {delta}
          </div>
        )}
      </div>
      {sub && (
        <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-3">
          {sub}
        </div>
      )}
    </div>
  );
}

export function WeeklyStats({ stats, afqtTrend }: Props) {
  const first = afqtTrend[0] ?? 0;
  const last = afqtTrend.at(-1) ?? 0;
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
        {stats.map((s) => (
          <Metric key={s.label} {...s} />
        ))}
      </div>
      <div className="mt-5 border-t border-line pt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-3">
            AFQT · Last 7 days
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-brand">
            {first} → {last}
          </span>
        </div>
        <Sparkline points={afqtTrend} width={260} height={36} color="var(--brand)" />
      </div>
    </div>
  );
}
