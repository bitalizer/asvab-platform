import { Mascot } from '@/components/brand/mascot';
import { Icon } from '@/components/primitives/icon';
import { Button } from '@/components/ui/button';

type Props = {
  name: string;
  daysUntilTest: number | null;
  onFinish: () => void;
  finishing: boolean;
};

const WEEK_TASKS = [
  { day: 'Mon', task: 'MK practice', detail: '20 Q' },
  { day: 'Tue', task: 'WK flashcards', detail: '30 cards' },
  { day: 'Wed', task: 'AR practice', detail: '25 Q' },
  { day: 'Thu', task: 'Mistake review', detail: '15 Q' },
  { day: 'Fri', task: 'MK lesson', detail: 'Lesson' },
  { day: 'Sat', task: 'Full AFQT mock', detail: '1.5 hr' },
  { day: 'Sun', task: 'Rest', detail: '—' },
];

export function StepPlan({ name, daysUntilTest, onFinish, finishing }: Props) {
  const readyDate =
    daysUntilTest !== null
      ? new Date(Date.now() + (daysUntilTest - 6) * 24 * 60 * 60 * 1000).toLocaleDateString(
          'en-US',
          {
            month: 'short',
            day: 'numeric',
          },
        )
      : 'TBD';
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <Mascot size={100} />
      </div>
      <h2 className="mt-6 font-display text-5xl leading-none tracking-tight text-ink">
        Your plan is ready.
      </h2>
      <p className="mt-4 text-lg text-ink-2">
        Here&apos;s what the next {daysUntilTest ?? '—'} days look like, {name}.
      </p>
      <div className="mt-8 rounded-lg border border-line bg-surface p-7 text-left">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3">
              Daily commitment
            </div>
            <div className="mt-1 font-display text-2xl">~45 min</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3">
              Predicted ready
            </div>
            <div className="mt-1 font-display text-2xl">{readyDate}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3">
              Focus sections
            </div>
            <div className="mt-1 font-display font-mono text-2xl">MK · EI</div>
          </div>
        </div>
        <hr className="my-5 border-line" />
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
          Week 1 preview
        </div>
        <div className="space-y-1.5">
          {WEEK_TASKS.map((t) => (
            <div
              key={t.day}
              className="flex items-center gap-3 border-b border-line py-2 last:border-0"
            >
              <div className="w-12 text-sm font-semibold text-ink-3">{t.day}</div>
              <div className="flex-1">
                <span className="rounded-full border border-line bg-bg-soft px-2.5 py-0.5 text-xs">
                  {t.task}
                </span>
              </div>
              <div className="font-mono text-xs text-ink-3">{t.detail}</div>
            </div>
          ))}
        </div>
      </div>
      <Button size="lg" className="mt-10" onClick={onFinish} disabled={finishing}>
        {finishing ? 'Saving…' : 'Start Day 1'} <Icon name="arrow" size={14} />
      </Button>
    </div>
  );
}
