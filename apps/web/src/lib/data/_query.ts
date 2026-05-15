import 'server-only';
import { cache } from 'react';

/**
 * Wraps a function with React's `cache()` for per-request memoization and adds
 * a stable name plus a dev-only duration log. Use for read-side data fetchers
 * in `lib/data/*`.
 *
 * Write-side functions stay un-cached: they should not be memoized.
 */
export function defineQuery<TArgs extends readonly unknown[], TResult>(
  name: string,
  fn: (...args: TArgs) => Promise<TResult>,
): (...args: TArgs) => Promise<TResult> {
  return cache(async (...args: TArgs): Promise<TResult> => {
    if (process.env.NODE_ENV !== 'development') {
      return fn(...args);
    }
    const start = performance.now();
    try {
      return await fn(...args);
    } finally {
      const ms = (performance.now() - start).toFixed(1);
      console.log(`[query] ${name} ${ms}ms`);
    }
  });
}
