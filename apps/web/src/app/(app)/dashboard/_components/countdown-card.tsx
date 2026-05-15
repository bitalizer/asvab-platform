type Props = {
  daysAway: number;
  testDate: string;
  format: string;
};

export function CountdownCard({ daysAway, testDate, format }: Props) {
  const count = Math.max(1, daysAway);
  const todayIdx = Math.floor(count / 2);
  return (
    <div className="rounded-lg bg-ink p-6 text-bg">
      <div className="flex items-end gap-3">
        <div className="font-display font-mono text-7xl leading-none tracking-tight">
          {daysAway}
        </div>
        <div className="pb-2">
          <div className="font-display text-sm tracking-tight">days</div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-bg/50">
            until test
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm text-bg/70">{testDate}</div>
      <div className="mt-1 text-xs text-bg/50">{format}</div>
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-bg/50">
          <span>Study calendar</span>
          <span aria-hidden>● studied ○ planned</span>
        </div>
        <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}>
          {Array.from({ length: count }, (_, i) => {
            const past = i < todayIdx;
            const today = i === todayIdx;
            const rest = !past && i % 7 === 6;
            const bg = today ? 'bg-bg' : past ? 'bg-bg/50' : rest ? 'bg-bg/10' : 'bg-bg/20';
            // biome-ignore lint/suspicious/noArrayIndexKey: static calendar display — order never changes
            return <div key={i} aria-hidden className={`aspect-square rounded-sm ${bg}`} />;
          })}
        </div>
      </div>
    </div>
  );
}
