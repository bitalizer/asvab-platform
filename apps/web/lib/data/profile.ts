import 'server-only';
import { type NewUserProfile, type UserProfile, userProfiles } from '@asvab/db';
import { eq } from 'drizzle-orm';
import { db } from './_db';
import { defineQuery } from './_query';

/**
 * Looks up a user's profile row. Returns `null` if no row exists yet (i.e.,
 * the user signed up but hasn't started onboarding).
 *
 * Memoized per request via `defineQuery`.
 */
export const getProfile = defineQuery(
  'getProfile',
  async (userId: string): Promise<UserProfile | null> => {
    const [row] = await db()
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId))
      .limit(1);
    return row ?? null;
  },
);

/**
 * Returns true if the user has completed onboarding (the wizard reached step 8
 * and submitted, OR they used "Skip for now").
 */
export async function isOnboardingComplete(userId: string): Promise<boolean> {
  const profile = await getProfile(userId);
  return profile?.onboardingCompletedAt != null;
}

/**
 * Onboarding submit handler. Inserts a profile row if missing or updates the
 * existing one, then marks onboarding complete with the current timestamp.
 *
 * The shape of `input` mirrors the wizard's persisted fields. Callers are
 * responsible for validating the input (zod) before passing it in.
 */
export async function upsertProfileFromOnboarding(
  userId: string,
  input: Omit<NewUserProfile, 'userId' | 'onboardingCompletedAt' | 'createdAt' | 'updatedAt'>,
): Promise<void> {
  const now = new Date();
  await db()
    .insert(userProfiles)
    .values({ userId, ...input, onboardingCompletedAt: now })
    .onConflictDoUpdate({
      target: userProfiles.userId,
      set: { ...input, onboardingCompletedAt: now },
    });
}
