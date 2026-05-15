CREATE TYPE "public"."diagnostic_choice" AS ENUM('take', 'skip');--> statement-breakpoint
CREATE TYPE "public"."math_class" AS ENUM('none', 'algebra_1', 'geometry', 'algebra_2', 'pre_calc', 'calc');--> statement-breakpoint
CREATE TYPE "public"."study_time" AS ENUM('morning', 'afternoon', 'evening', 'late_night', 'weekends');--> statement-breakpoint
CREATE TYPE "public"."test_format" AS ENUM('cat', 'pp', 'picat');--> statement-breakpoint
ALTER TABLE "admin_roles" ALTER COLUMN "granted_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "admin_roles" ALTER COLUMN "granted_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "test_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "test_format" SET DATA TYPE "public"."test_format" USING "test_format"::"public"."test_format";--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "last_math_class" SET DATA TYPE "public"."math_class" USING "last_math_class"::"public"."math_class";--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "onboarding_completed_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_profiles" ADD COLUMN "diagnostic_choice" "diagnostic_choice";--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "target_afqt_range" CHECK ("user_profiles"."target_afqt" IS NULL OR ("user_profiles"."target_afqt" >= 31 AND "user_profiles"."target_afqt" <= 99));--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "weekly_hours_nonneg" CHECK ("user_profiles"."weekly_hours_available" IS NULL OR "user_profiles"."weekly_hours_available" >= 0);