'use client';

import { useEffect, useState } from 'react';

/**
 * Returns `true` when the given CSS media query matches the viewport.
 *
 * SSR-safe: returns `false` on the server, then updates on mount so the
 * client picks up the real value. Use with Tailwind breakpoints by mirroring
 * the breakpoint definitions, e.g. `useMediaQuery('(min-width: 1024px)')`
 * for `lg`.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
