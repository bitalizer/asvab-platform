/**
 * Onboarding feature public API.
 *
 * The schema is exported here too, but server-side consumers (the API route,
 * unit tests) should import it from `@/features/onboarding/schema` to avoid
 * pulling the React components into a non-JSX context.
 */
export { WizardShell } from './components/wizard-shell';
export { StepWelcome } from './components/step-1-welcome';
export { StepBranch } from './components/step-2-branch';
export { StepTarget } from './components/step-3-target';
export { StepTestDate } from './components/step-4-test-date';
export { type HoursBucket, StepSchedule } from './components/step-5-schedule';
export { StepBackground } from './components/step-6-background';
export { StepDiagnostic } from './components/step-7-diagnostic';
export { StepPlan } from './components/step-8-plan';
export { BRANCHES } from './branch-options';
export { type OnboardingPayload, onboardingSchema } from './schema';
