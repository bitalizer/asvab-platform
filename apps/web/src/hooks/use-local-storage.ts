'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Persists state in `window.localStorage` under `key`, JSON-encoded.
 *
 * On the server (no `window`), returns `initialValue` for SSR-safety. The
 * stored value is loaded after hydration, so the first client render matches
 * the server render and avoids hydration mismatches.
 *
 * @example
 *   const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (next: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initialValue);

  // Hydrate from storage after mount so the server-rendered HTML stays stable.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        setValue(JSON.parse(raw) as T);
      }
    } catch {
      // ignore read/parse errors — fall back to initialValue
    }
  }, [key]);

  const setStored = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // quota / disabled storage — silently noop
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, setStored];
}
