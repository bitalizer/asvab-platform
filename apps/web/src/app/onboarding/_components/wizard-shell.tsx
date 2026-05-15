'use client';

import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

type WizardShellProps = {
  step: number;
  totalSteps: number;
  onSkip: () => void;
  children: ReactNode;
};

export function WizardShell({ step, totalSteps, onSkip, children }: WizardShellProps) {
  const pct = ((step + 1) / totalSteps) * 100;
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <header className="flex items-center justify-between border-b border-line px-6 py-4 lg:px-10">
        <Logo size="md" />
        <div className="text-sm font-medium text-ink-2">
          Step <span className="font-mono">{step + 1}</span> of {totalSteps}
        </div>
        <Button variant="ghost" size="sm" onClick={onSkip}>
          Skip for now
        </Button>
      </header>
      <div
        className="h-1 w-full bg-bg-soft"
        role="progressbar"
        tabIndex={-1}
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full bg-ink transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:py-16">
        <div
          key={step}
          className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
