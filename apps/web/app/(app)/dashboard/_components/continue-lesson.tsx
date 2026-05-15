import { Icon } from '@/components/primitives/icon';
import { Button } from '@/components/ui/button';

type Props = {
  section: string;
  title: string;
  progress: number;
  duration: string;
};

export function ContinueLesson({ section, title, progress, duration }: Props) {
  const pct = Math.round(progress * 100);
  return (
    <div className="flex items-center gap-5 rounded-lg border border-line bg-surface p-5">
      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-md border border-line bg-bg-soft">
        <Icon name="function" size={26} className="text-brand" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-3">
          {section}
        </div>
        <div className="mt-1 font-display text-lg tracking-tight">{title}</div>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-line-2">
            <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
          </div>
          <span className="font-mono text-[10px] text-ink-3">
            {pct}% · {duration} left
          </span>
        </div>
      </div>
      <Button size="sm">
        <Icon name="play" size={11} /> Resume
      </Button>
    </div>
  );
}
