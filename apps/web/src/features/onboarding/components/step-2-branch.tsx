import { Icon } from '@/components/primitives/icon';
import { cn } from '@/lib/utils';
import type { Branch } from '@asvab/db';
import { BRANCHES } from '../branch-options';

type Props = {
  selected: Branch[];
  onToggle: (id: Branch) => void;
};

export function StepBranch({ selected, onToggle }: Props) {
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
        Step 02 · Service branch
      </div>
      <h2 className="font-display text-4xl tracking-tight text-ink">
        Which branch are you targeting?
      </h2>
      <p className="mt-3 text-ink-2">Multi-select if you&apos;re still deciding.</p>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
        {BRANCHES.map((b) => {
          const sel = selected.includes(b.id);
          return (
            <button
              key={b.id}
              type="button"
              aria-pressed={sel}
              onClick={() => onToggle(b.id)}
              className={cn(
                'relative rounded-md border bg-surface p-4 text-left transition-colors',
                sel ? 'border-ink border-2' : 'border-line hover:border-line-strong',
              )}
            >
              <div className="h-1 w-6 rounded-sm" style={{ background: b.color }} />
              <div className="mt-3 font-display text-xl text-ink">{b.name}</div>
              <div className="mt-1 text-xs text-ink-3">
                Min AFQT <span className="font-mono font-semibold text-ink-2">{b.min}</span>
              </div>
              {sel && <Icon name="check" size={16} className="absolute right-3 top-3 text-brand" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
