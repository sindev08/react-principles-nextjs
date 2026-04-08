"use client";

import { useEffect, useState } from "react";

/**
 * Debounces a value by the specified delay in milliseconds.
 * Returns the debounced value that only updates after the delay
 * has elapsed since the last change.
 *
 * Effect pattern: setTimeout with cleanup
 * - Effect creates a timer on every value/delay change
 * - Cleanup clears the previous timer before setting a new one
 * - This prevents the callback from firing during rapid updates
 *
 * @example
 * const [search, setSearch] = useState("");
 * const debouncedSearch = useDebounce(search, 300);
 * // debouncedSearch only updates 300ms after the user stops typing
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: clear the timer if value or delay changes before it fires
    // This is what makes it a "debounce" — rapid changes reset the timer
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Re-run when value or delay changes

  return debouncedValue;
}
