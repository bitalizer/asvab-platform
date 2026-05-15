import 'server-only';
import { getEnv } from '@/lib/env';
import { type Database, getDb } from '@asvab/db';
import { cache } from 'react';

/**
 * Returns the request-scoped Drizzle instance.
 *
 * `cache()` memoizes the result across the React render tree for the current
 * request, so repeated callers within `lib/data/*` share one connection pool
 * handle. The underlying `getDb` already caches by connection string on
 * `globalThis`, but wrapping with `cache()` makes the call cheap to repeat in
 * hot paths.
 *
 * This module is the only place outside `@asvab/db` that calls `getDb`.
 */
export const db = cache((): Database => getDb(getEnv().DATABASE_URL));
