import { cn } from '@/lib/utils';
import type { EducationLevel, MathClass } from '@asvab/db';

const EDU_OPTIONS: ReadonlyArray<{ v: EducationLevel; l: string }> = [
  { v: 'in_high_school', l: 'Currently in HS' },
  { v: 'high_school_grad', l: 'HS grad' },
  { v: 'ged', l: 'GED' },
  { v: 'some_college', l: 'Some college' },
  { v: 'college_grad', l: 'College grad' },
];

const MATH_OPTIONS: ReadonlyArray<{ v: MathClass; l: string }> = [
  { v: 'none', l: 'None recently' },
  { v: 'algebra_1', l: 'Algebra 1' },
  { v: 'geometry', l: 'Geometry' },
  { v: 'algebra_2', l: 'Algebra 2' },
  { v: 'pre_calc', l: 'Pre-calc' },
  { v: 'calc', l: 'Calc' },
];

type Props = {
  education: EducationLevel | null;
  math: MathClass | null;
  onEducation: (v: EducationLevel) => void;
  onMath: (v: MathClass) => void;
};

function Chip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-sm transition-colors',
        active
          ? 'border-brand bg-brand-soft text-brand-deep'
          : 'border-line bg-surface text-ink-2 hover:border-line-strong',
      )}
    >
      {label}
    </button>
  );
}

export function StepBackground({ education, math, onEducation, onMath }: Props) {
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
        Step 06 · Background
      </div>
      <h2 className="font-display text-4xl tracking-tight text-ink">A bit about you.</h2>
      <p className="mt-3 text-ink-2">Helps us pitch lessons at the right level.</p>
      <div className="mt-8 grid gap-4">
        <div className="rounded-md border border-line bg-surface p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
            Education level
          </div>
          <div className="flex flex-wrap gap-2">
            {EDU_OPTIONS.map((o) => (
              <Chip
                key={o.v}
                active={education === o.v}
                label={o.l}
                onClick={() => onEducation(o.v)}
              />
            ))}
          </div>
        </div>
        <div className="rounded-md border border-line bg-surface p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
            Last math class
          </div>
          <div className="flex flex-wrap gap-2">
            {MATH_OPTIONS.map((o) => (
              <Chip key={o.v} active={math === o.v} label={o.l} onClick={() => onMath(o.v)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
