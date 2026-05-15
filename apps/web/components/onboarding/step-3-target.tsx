import { Slider } from '@/components/ui/slider';

type Props = {
  value: number;
  onChange: (n: number) => void;
};

function jobsAt(target: number): string {
  if (target >= 90) return '17C Cyber, 35F Intel, 35Q Crypto';
  if (target >= 70) return '11B Infantry, 35F Intel, 25B IT, 68W Medic';
  return '11B Infantry, 92Y Supply, 12B Engineer';
}

export function StepTarget({ value, onChange }: Props) {
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
        Step 03 · Target
      </div>
      <h2 className="font-display text-4xl tracking-tight text-ink">
        What&apos;s your target AFQT?
      </h2>
      <p className="mt-3 text-ink-2">Higher = more job options. Drag to set.</p>
      <div className="mt-8 rounded-lg border border-line bg-surface p-8 text-center">
        <div className="font-display font-mono text-7xl leading-none tracking-tight text-ink">
          {value}
        </div>
        <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-3">
          Your goal
        </div>
        <div className="mx-auto mt-8 max-w-md">
          <Slider
            min={31}
            max={99}
            step={1}
            value={[value]}
            onValueChange={(v) => {
              // base-ui Slider passes readonly number[] when value is number[]
              const first = (v as readonly number[])[0];
              if (typeof first === 'number') onChange(first);
            }}
          />
        </div>
        <div className="mx-auto mt-2 flex max-w-md justify-between text-xs font-mono text-ink-3">
          <span>31 min</span>
          <span>50</span>
          <span>75</span>
          <span>99</span>
        </div>
        <hr className="my-6 border-line" />
        <div className="text-left">
          <div className="font-semibold text-ink">
            At {value}, you&apos;ll qualify for ~{Math.round(value * 2.4)} Army jobs
          </div>
          <div className="mt-1 text-sm text-ink-2">Including: {jobsAt(value)}</div>
        </div>
      </div>
    </div>
  );
}
