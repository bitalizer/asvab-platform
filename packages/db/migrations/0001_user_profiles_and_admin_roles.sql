CREATE TYPE "public"."admin_role" AS ENUM('super_admin', 'content_manager', 'support', 'marketer', 'analyst');--> statement-breakpoint
CREATE TYPE "public"."branch" AS ENUM('army', 'navy', 'marines', 'air_force', 'coast_guard', 'space_force', 'undecided');--> statement-breakpoint
CREATE TYPE "public"."education_level" AS ENUM('in_high_school', 'high_school_grad', 'ged', 'some_college', 'college_grad');--> statement-breakpoint
CREATE TABLE "admin_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"role" "admin_role" NOT NULL,
	"granted_by" text,
	"granted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"user_id" text PRIMARY KEY NOT NULL,
	"branches" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"target_afqt" integer,
	"test_date" timestamp,
	"test_format" text,
	"weekly_hours_available" integer,
	"study_times" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"reminder_time" text,
	"education_level" "education_level",
	"last_math_class" text,
	"last_science_class" text,
	"section_confidence" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"onboarding_completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "admin_roles" ADD CONSTRAINT "admin_roles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admin_roles" ADD CONSTRAINT "admin_roles_granted_by_user_id_fk" FOREIGN KEY ("granted_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "admin_roles_user_role_unique" ON "admin_roles" USING btree ("user_id","role");--> statement-breakpoint
CREATE INDEX "admin_roles_user_id_idx" ON "admin_roles" USING btree ("user_id");