import 'server-only';
import { getAuth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

/**
 * Reads the Better Auth session from the incoming request cookies.
 * Memoized per request — multiple callers within one render tree share one
 * Better Auth roundtrip.
 *
 * Returns `null` when no valid session cookie is present.
 */
export const getSession = cache(async () => {
  return getAuth().api.getSession({ headers: await headers() });
});

export type Session = NonNullable<Awaited<ReturnType<typeof getSession>>>;
export type SessionUser = Session['user'];

/**
 * Returns the session or redirects to /login. Use in protected layouts/pages
 * to combine the fetch + guard in one call.
 */
export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}
