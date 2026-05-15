import { sql } from 'drizzle-orm';
import {
  check,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { user } from './auth';

export const branchEnum = pgEnum('branch', [
  'army',
  'navy',
  'marines',
  'air_force',
  'coast_guard',
  'space_force',
  'undecided',
]);

export const educationEnum = pgEnum('education_level', [
  'in_high_school',
  'high_school_grad',
  'ged',
  'some_college',
  'college_grad',
]);

export const adminRoleEnum = pgEnum('admin_role', [
  'super_admin',
  'content_manager',
  'support',
  'marketer',
  'analyst',
]);

export const testFormatEnum = pgEnum('test_format', ['cat', 'pp', 'picat']);

export const studyTimeEnum = pgEnum('study_time', [
  'morning',
  'afternoon',
  'evening',
  'late_night',
  'weekends',
]);

export const mathClassEnum = pgEnum('math_class', [
  'none',
  'algebra_1',
  'geometry',
  'algebra_2',
  'pre_calc',
  'calc',
]);

export const diagnosticChoiceEnum = pgEnum('diagnostic_choice', ['take', 'skip']);

/**
 * Section ids for the 9 ASVAB subtests. Used to type sectionConfidence keys.
 * Source: see prototype/shared.jsx SECTIONS — keep in sync.
 */
export type SectionId =
  | 'ar' // Arithmetic Reasoning
  | 'wk' // Word Knowledge
  | 'pc' // Paragraph Comprehension
  | 'mk' // Math Knowledge
  | 'gs' // General Science
  | 'ei' // Electronics Information
  | 'as' // Auto & Shop
  | 'mc' // Mechanical Comprehension
  | 'ao'; // Assembling Objects

export type Branch = (typeof branchEnum.enumValues)[number];
export type EducationLevel = (typeof educationEnum.enumValues)[number];
export type AdminRoleName = (typeof adminRoleEnum.enumValues)[number];
export type TestFormat = (typeof testFormatEnum.enumValues)[number];
export type StudyTime = (typeof studyTimeEnum.enumValues)[number];
export type MathClass = (typeof mathClassEnum.enumValues)[number];
export type DiagnosticChoice = (typeof diagnosticChoiceEnum.enumValues)[number];

export const userProfiles = pgTable(
  'user_profiles',
  {
    userId: text('user_id')
      .primaryKey()
      .references(() => user.id, { onDelete: 'cascade' }),
    branches: jsonb('branches').$type<Branch[]>().notNull().default([]),
    targetAfqt: integer('target_afqt'),
    testDate: timestamp('test_date', { withTimezone: true }),
    testFormat: testFormatEnum('test_format'),
    weeklyHoursAvailable: integer('weekly_hours_available'),
    studyTimes: jsonb('study_times').$type<StudyTime[]>().notNull().default([]),
    reminderTime: text('reminder_time'),
    educationLevel: educationEnum('education_level'),
    lastMathClass: mathClassEnum('last_math_class'),
    lastScienceClass: text('last_science_class'),
    sectionConfidence: jsonb('section_confidence')
      .$type<Partial<Record<SectionId, number>>>()
      .notNull()
      .default({}),
    diagnosticChoice: diagnosticChoiceEnum('diagnostic_choice'),
    onboardingCompletedAt: timestamp('onboarding_completed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    check(
      'target_afqt_range',
      sql`${table.targetAfqt} IS NULL OR (${table.targetAfqt} >= 31 AND ${table.targetAfqt} <= 99)`,
    ),
    check(
      'weekly_hours_nonneg',
      sql`${table.weeklyHoursAvailable} IS NULL OR ${table.weeklyHoursAvailable} >= 0`,
    ),
  ],
);

export const adminRoles = pgTable(
  'admin_roles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    role: adminRoleEnum('role').notNull(),
    grantedBy: text('granted_by').references(() => user.id, { onDelete: 'set null' }),
    grantedAt: timestamp('granted_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('admin_roles_user_role_unique').on(table.userId, table.role),
    index('admin_roles_user_id_idx').on(table.userId),
  ],
);

export type UserProfile = typeof userProfiles.$inferSelect;
export type NewUserProfile = typeof userProfiles.$inferInsert;
export type AdminRole = typeof adminRoles.$inferSelect;
