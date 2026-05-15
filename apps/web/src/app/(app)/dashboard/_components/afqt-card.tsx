import { Ring } from '@/components/charts/ring';
import { Sparkline } from '@/components/charts/sparkline';

type Props = {
  currentAfqt: number;
  targetAfqt: number;
  startAfqt: number;
};

export function AfqtCard({ currentAfqt, targetAfqt, startAfqt }: Props) {
  const delta = currentAfqt - startAfqt;
  const remaining = Math.max(0, targetAfqt - currentAfqt);
  const trend = [
    startAfqt,
    startAfqt + 4,
    startAfqt + 8,
    startAfqt + 11,
    startAfqt + 14,
    startAfqt + 17,
    currentAfqt,
  ];
  return (
    <div className="rounded-lg border border-line bg-surface p-6 lg:p-8">
      <div className="flex flex-wrap items-center gap-8 lg:gap-12">
        <Ring value={currentAfqt} max={99} size={160} stroke={12}>
          <div>
            <div className="font-display font-mono text-5xl leading-none tracking-tight text-ink">
              {currentAfqt}
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-ink-3">
              predicted AFQT
            </div>
          </div>
        </Ring>
        <div className="min-w-[200px] flex-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-3">
            Last 7 days
          </div>
          <Sparkline points={trend} width={220} height={48} color="var(--brand)" />
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div>
              <span className="text-ink-3">Target </span>
              <span className="font-mono font-semibold">{targetAfqt}</span>
            </div>
            <div>
              <span className="text-ink-3">Gain </span>
              <span className="font-mono font-semibold text-success-deep">+{delta}</span>
            </div>
            <div>
              <span className="text-ink-3">To go </span>
              <span className="font-mono font-semibold">{remaining}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
