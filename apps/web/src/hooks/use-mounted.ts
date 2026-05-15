'use client';

import { useEffect, useState } from 'react';

/**
 * Returns `false` during SSR and the first client render, `true` after
 * hydration. Use to gate code that touches `window`, `document`, or other
 * browser-only globals without causing hydration mismatches.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
