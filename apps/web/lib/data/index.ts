/**
 * Public surface of the data layer. Callers outside `lib/data/*` should only
 * import from this file — never from `@asvab/db` or `drizzle-orm` directly.
 */

export { getSession, requireSession, type Session, type SessionUser } from './session';
export {
  getProfile,
  isOnboardingComplete,
  upsertProfileFromOnboarding,
} from './profile';
export { deleteUser, getUserById } from './user';
