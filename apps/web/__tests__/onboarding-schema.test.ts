import { onboardingSchema } from '@/lib/onboarding';
import { describe, expect, it } from 'vitest';

describe('onboardingSchema', () => {
  const valid = {
    branches: ['army'],
    targetAfqt: 75,
    testDate: '2026-06-03',
    testFormat: 'cat',
    weeklyHoursAvailable: 11,
    studyTimes: ['evening'],
    educationLevel: 'high_school_grad',
    lastMathClass: 'algebra_2',
    diagnosticChoice: 'skip',
  };

  it('accepts a fully-filled payload', () => {
    const result = onboardingSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('accepts nullable optionals (Skip for now flow)', () => {
    const partial = {
      ...valid,
      testDate: null,
      educationLevel: null,
      lastMathClass: null,
      diagnosticChoice: null,
    };
    const result = onboardingSchema.safeParse(partial);
    expect(result.success).toBe(true);
  });

  it('rejects empty branches array', () => {
    const result = onboardingSchema.safeParse({ ...valid, branches: [] });
    expect(result.success).toBe(false);
  });

  it('rejects unknown branch id', () => {
    const result = onboardingSchema.safeParse({ ...valid, branches: ['cyber_corps'] });
    expect(result.success).toBe(false);
  });

  it('rejects multiple branches when one is invalid', () => {
    const result = onboardingSchema.safeParse({ ...valid, branches: ['army', 'cyber_corps'] });
    expect(result.success).toBe(false);
  });

  it('rejects targetAfqt below 31', () => {
    const result = onboardingSchema.safeParse({ ...valid, targetAfqt: 20 });
    expect(result.success).toBe(false);
  });

  it('rejects targetAfqt above 99', () => {
    const result = onboardingSchema.safeParse({ ...valid, targetAfqt: 105 });
    expect(result.success).toBe(false);
  });

  it('rejects non-integer targetAfqt', () => {
    const result = onboardingSchema.safeParse({ ...valid, targetAfqt: 75.5 });
    expect(result.success).toBe(false);
  });

  it('rejects invalid testFormat', () => {
    const result = onboardingSchema.safeParse({ ...valid, testFormat: 'oral' });
    expect(result.success).toBe(false);
  });

  it('rejects malformed testDate', () => {
    const result = onboardingSchema.safeParse({ ...valid, testDate: 'not-a-date' });
    expect(result.success).toBe(false);
  });

  it('rejects unknown studyTime', () => {
    const result = onboardingSchema.safeParse({ ...valid, studyTimes: ['morning', 'midnight'] });
    expect(result.success).toBe(false);
  });

  it('rejects negative weeklyHoursAvailable', () => {
    const result = onboardingSchema.safeParse({ ...valid, weeklyHoursAvailable: -1 });
    expect(result.success).toBe(false);
  });
});
