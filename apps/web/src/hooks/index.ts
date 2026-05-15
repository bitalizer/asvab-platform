/**
 * Globally-reusable client hooks.
 *
 * Feature-specific hooks live under `features/<name>/hooks/`. This barrel is
 * for hooks that aren't tied to a single domain — primitives like debouncing,
 * local storage, media queries.
 */
export { useCopyToClipboard } from './use-copy-to-clipboard';
export { useDebounce } from './use-debounce';
export { useLocalStorage } from './use-local-storage';
export { useMediaQuery } from './use-media-query';
export { useMounted } from './use-mounted';
