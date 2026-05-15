import 'server-only';
import { type User, user } from '@asvab/db';
import { eq } from 'drizzle-orm';
import { db } from './_db';
import { defineQuery } from './_query';

/**
 * Reads a Better Auth user row by id. Returns `null` when the row is gone
 * (e.g., the user was deleted concurrently).
 *
 * Memoized per request.
 */
export const getUserById = defineQuery(
  'getUserById',
  async (userId: string): Promise<User | null> => {
    const [row] = await db().select().from(user).where(eq(user.id, userId)).limit(1);
    return row ?? null;
  },
);

/**
 * Deletes a user. `ON DELETE CASCADE` on `user_profiles`, `admin_roles`, and
 * the Better Auth tables (`session`, `account`, `verification`) cleans up the
 * rest.
 *
 * Caller is responsible for revoking the session cookie afterwards.
 */
export async function deleteUser(userId: string): Promise<void> {
  await db().delete(user).where(eq(user.id, userId));
}
