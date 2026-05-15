import { z } from 'zod';

// Keep these synced with @asvab/db's enum types. The arrays mirror the pgEnum
// values exactly so the schema fails on any drift between zod and Postgres.
const BRANCH_IDS = [
  'army',
  'navy',
  'marines',
  'air_force',
  'coast_guard',
  'space_force',
  'undecided',
] as const;

const TEST_FORMATS = ['cat', 'pp', 'picat'] as const;

const STUDY_TIMES = ['morning', 'afternoon', 'evening', 'late_night', 'weekends'] as const;

const EDUCATION_LEVELS = [
  'in_high_school',
  'high_school_grad',
  'ged',
  'some_college',
  'college_grad',
] as const;

const MATH_CLASSES = ['none', 'algebra_1', 'geometry', 'algebra_2', 'pre_calc', 'calc'] as const;

const DIAGNOSTIC_CHOICES = ['take', 'skip'] as const;

export const onboardingSchema = z.object({
  branches: z.array(z.enum(BRANCH_IDS)).min(1),
  targetAfqt: z.number().int().min(31).max(99),
  testDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (expected YYYY-MM-DD)')
    .nullable(),
  testFormat: z.enum(TEST_FORMATS),
  weeklyHoursAvailable: z.number().int().min(0).max(168),
  studyTimes: z.array(z.enum(STUDY_TIMES)),
  educationLevel: z.enum(EDUCATION_LEVELS).nullable(),
  lastMathClass: z.enum(MATH_CLASSES).nullable(),
  diagnosticChoice: z.enum(DIAGNOSTIC_CHOICES).nullable(),
});

export type OnboardingPayload = z.infer<typeof onboardingSchema>;
