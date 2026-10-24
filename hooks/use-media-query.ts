"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Match a media query with SSR-safe defaults.
 *
 * Uses `useSyncExternalStore` so the first client read is the real value
 * instead of a post-mount `setState` cascade, and so every component sharing a
 * query subscribes to the same browser event.
 */
export function useMediaQuery(query: string, defaultValue = false) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    useCallback(() => defaultValue, [defaultValue])
  );
}
