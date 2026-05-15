import { Icon } from '@/components/primitives/icon';
import { cn } from '@/lib/utils';
import type { DiagnosticChoice } from '@asvab/db';

type Props = {
  onChoose: (choice: DiagnosticChoice) => void;
};

export function StepDiagnostic({ onChoose }: Props) {
  return (
    <div className="text-center">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
        Step 07 · Calibration
      </div>
      <h2 className="font-display text-4xl tracking-tight text-ink">Quick diagnostic?</h2>
      <p className="mx-auto mt-3 max-w-md text-ink-2">
        30 minutes, 4 sections, ~50 questions. Calibrates everything. Strongly recommended — your
        plan is generic without it.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => onChoose('take')}
          className={cn(
            'rounded-md border-2 border-brand bg-surface p-6 text-left transition-colors hover:bg-brand-soft',
          )}
        >
          <Icon name="target" size={22} className="text-brand" />
          <div className="mt-4 font-display text-xl">Take it now</div>
          <div className="mt-2 text-sm text-ink-2">Recommended — accurate plan in 30 min.</div>
        </button>
        <button
          type="button"
          onClick={() => onChoose('skip')}
          className="rounded-md border border-line bg-surface p-6 text-left transition-colors hover:border-line-strong"
        >
          <Icon name="book" size={22} className="text-ink-3" />
          <div className="mt-4 font-display text-xl">Skip for now</div>
          <div className="mt-2 text-sm text-ink-2">Start with lessons. Take diagnostic later.</div>
        </button>
      </div>
    </div>
  );
}
