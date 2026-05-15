// Schema tables are added per-domain in this folder; this file re-exports them.
// Better Auth tables are auto-generated into ./auth.ts via the better-auth CLI.
// Domain tables (user_profiles, questions, lessons, etc.) added later.

export * from './auth';
