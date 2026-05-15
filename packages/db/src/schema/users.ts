import {
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

export const userProfiles = pgTable('user_profiles', {
  userId: text('user_id')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' }),
  branches: jsonb('branches').$type<string[]>().notNull().default([]),
  targetAfqt: integer('target_afqt'),
  testDate: timestamp('test_date'),
  testFormat: text('test_format'),
  weeklyHoursAvailable: integer('weekly_hours_available'),
  studyTimes: jsonb('study_times').$type<string[]>().notNull().default([]),
  reminderTime: text('reminder_time'),
  educationLevel: educationEnum('education_level'),
  lastMathClass: text('last_math_class'),
  lastScienceClass: text('last_science_class'),
  sectionConfidence: jsonb('section_confidence')
    .$type<Record<string, number>>()
    .notNull()
    .default({}),
  onboardingCompletedAt: timestamp('onboarding_completed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const adminRoles = pgTable(
  'admin_roles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    role: adminRoleEnum('role').notNull(),
    grantedBy: text('granted_by').references(() => user.id, { onDelete: 'set null' }),
    grantedAt: timestamp('granted_at').notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('admin_roles_user_role_unique').on(table.userId, table.role),
    index('admin_roles_user_id_idx').on(table.userId),
  ],
);
