'use client';

import { useCallback, useState } from 'react';

type State = { copied: boolean; error: Error | null };

/**
 * Returns `[copy, state]` where `copy(text)` writes to the clipboard and the
 * state tracks whether the most recent copy succeeded. `copied` resets to
 * `false` after `resetMs` (default 2000) so the UI can show a "Copied!"
 * confirmation that auto-dismisses.
 */
export function useCopyToClipboard(resetMs = 2000): [(text: string) => Promise<boolean>, State] {
  const [state, setState] = useState<State>({ copied: false, error: null });

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
        setState({ copied: true, error: null });
        if (resetMs > 0) {
          setTimeout(() => setState({ copied: false, error: null }), resetMs);
        }
        return true;
      } catch (e) {
        setState({ copied: false, error: e instanceof Error ? e : new Error('Copy failed') });
        return false;
      }
    },
    [resetMs],
  );

  return [copy, state];
}
