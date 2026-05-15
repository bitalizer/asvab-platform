'use client';

import { StepWelcome } from '@/components/onboarding/step-1-welcome';
import { StepBranch } from '@/components/onboarding/step-2-branch';
import { StepTarget } from '@/components/onboarding/step-3-target';
import { StepTestDate } from '@/components/onboarding/step-4-test-date';
import { type HoursBucket, StepSchedule } from '@/components/onboarding/step-5-schedule';
import { StepBackground } from '@/components/onboarding/step-6-background';
import { StepDiagnostic } from '@/components/onboarding/step-7-diagnostic';
import { StepPlan } from '@/components/onboarding/step-8-plan';
import { WizardShell } from '@/components/onboarding/wizard-shell';
import { Icon } from '@/components/primitives/icon';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import type {
  Branch,
  DiagnosticChoice,
  EducationLevel,
  MathClass,
  StudyTime,
  TestFormat,
} from '@asvab/db';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const TOTAL_STEPS = 8;
const HOURS_TO_INTEGER: Record<HoursBucket, number> = { '1-3': 2, '4-7': 5, '8-15': 11, '15+': 20 };

type WizardState = {
  step: number;
  branches: Branch[];
  targetAfqt: number;
  testDate: string | null;
  notSure: boolean;
  testFormat: TestFormat;
  hours: HoursBucket;
  times: StudyTime[];
  education: EducationLevel | null;
  math: MathClass | null;
  diagnosticChoice: DiagnosticChoice | null;
  submitting: boolean;
};

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [state, setState] = useState<WizardState>({
    step: 0,
    branches: [],
    targetAfqt: 75,
    testDate: null,
    notSure: false,
    testFormat: 'cat',
    hours: '8-15',
    times: ['evening'],
    education: null,
    math: null,
    diagnosticChoice: null,
    submitting: false,
  });

  const name = session?.user?.name?.split(' ')[0] ?? 'Recruit';

  function daysUntilTest(): number | null {
    if (state.notSure || !state.testDate) return null;
    const target = new Date(state.testDate).getTime();
    if (Number.isNaN(target)) return null;
    return Math.max(0, Math.round((target - Date.now()) / (1000 * 60 * 60 * 24)));
  }

  function update<K extends keyof WizardState>(key: K, value: WizardState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function next() {
    setState((s) => ({ ...s, step: Math.min(TOTAL_STEPS - 1, s.step + 1) }));
  }

  function back() {
    setState((s) => ({ ...s, step: Math.max(0, s.step - 1) }));
  }

  async function submit() {
    setState((s) => ({ ...s, submitting: true }));
    const payload = {
      branches: state.branches,
      targetAfqt: state.targetAfqt,
      testDate: state.notSure ? null : state.testDate,
      testFormat: state.testFormat,
      weeklyHoursAvailable: HOURS_TO_INTEGER[state.hours],
      studyTimes: state.times,
      educationLevel: state.education,
      lastMathClass: state.math,
      diagnosticChoice: state.diagnosticChoice,
    };
    const res = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setState((s) => ({ ...s, submitting: false }));
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: { formErrors: ['Submit failed'] } }));
      toast.error(
        (err as { error?: { formErrors?: string[] } }).error?.formErrors?.[0] ??
          'Could not save. Try again.',
      );
      return;
    }
    router.push('/dashboard');
  }

  function handleSkip() {
    void submit();
  }

  function toggleBranch(id: Branch) {
    update(
      'branches',
      state.branches.includes(id)
        ? state.branches.filter((b) => b !== id)
        : [...state.branches, id],
    );
  }

  function toggleTime(t: StudyTime) {
    update(
      'times',
      state.times.includes(t) ? state.times.filter((x) => x !== t) : [...state.times, t],
    );
  }

  return (
    <WizardShell step={state.step} totalSteps={TOTAL_STEPS} onSkip={handleSkip}>
      {state.step === 0 && <StepWelcome onNext={next} />}
      {state.step === 1 && <StepBranch selected={state.branches} onToggle={toggleBranch} />}
      {state.step === 2 && (
        <StepTarget value={state.targetAfqt} onChange={(v) => update('targetAfqt', v)} />
      )}
      {state.step === 3 && (
        <StepTestDate
          testDate={state.testDate}
          testFormat={state.testFormat}
          notSure={state.notSure}
          onDateChange={(v) => update('testDate', v || null)}
          onFormatChange={(v) => update('testFormat', v)}
          onNotSureChange={(v) => update('notSure', v)}
        />
      )}
      {state.step === 4 && (
        <StepSchedule
          hours={state.hours}
          times={state.times}
          onHoursChange={(h) => update('hours', h)}
          onTimesToggle={toggleTime}
        />
      )}
      {state.step === 5 && (
        <StepBackground
          education={state.education}
          math={state.math}
          onEducation={(v) => update('education', v)}
          onMath={(v) => update('math', v)}
        />
      )}
      {state.step === 6 && (
        <StepDiagnostic
          onChoose={(c) => {
            update('diagnosticChoice', c);
            next();
          }}
        />
      )}
      {state.step === 7 && (
        <StepPlan
          name={name}
          daysUntilTest={daysUntilTest()}
          onFinish={() => void submit()}
          finishing={state.submitting}
        />
      )}
      {state.step > 0 && state.step < TOTAL_STEPS - 1 && state.step !== 6 && (
        <div className="mt-10 flex justify-between">
          <Button variant="ghost" onClick={back}>
            <Icon name="arrowLeft" size={14} /> Back
          </Button>
          <Button onClick={next}>
            Continue <Icon name="arrow" size={14} />
          </Button>
        </div>
      )}
    </WizardShell>
  );
}
