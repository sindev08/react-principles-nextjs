"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tracks whether a CSS media query matches the current viewport.
 * Uses useSyncExternalStore to subscribe to the browser's matchMedia API.
 *
 * WHY useSyncExternalStore instead of useState + useEffect?
 * - Avoids the "setState in effect" anti-pattern
 * - Properly handles concurrent rendering (React 18+)
 * - The matchMedia API is an external store — useSyncExternalStore is designed for this
 *
 * SSR-safe: returns false on the server via getServerSnapshot.
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
 */
export function useMediaQuery(query: string): boolean {
  // Subscribe to media query changes — returns an unsubscribe function
  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", callback);
      return () => {
        mediaQueryList.removeEventListener("change", callback);
      };
    },
    [query],
  );

  // Read the current value from the external store
  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  // Server-side snapshot — always false to avoid hydration mismatch
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
