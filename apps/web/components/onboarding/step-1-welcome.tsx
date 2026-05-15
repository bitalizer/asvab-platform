import { Mascot } from '@/components/brand/mascot';
import { Icon } from '@/components/primitives/icon';
import { Button } from '@/components/ui/button';

type Props = { onNext: () => void };

export function StepWelcome({ onNext }: Props) {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <Mascot size={120} />
      </div>
      <h1 className="mt-8 font-display text-5xl lg:text-6xl leading-none tracking-tight text-ink">
        Welcome aboard.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-lg text-ink-2">
        Let's build your custom study plan in about two minutes. By the end, you'll know exactly
        what to study tonight.
      </p>
      <Button size="lg" className="mt-10" onClick={onNext}>
        Let&apos;s begin <Icon name="arrow" size={14} />
      </Button>
    </div>
  );
}
