"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Type-safe localStorage hook with SSR safety and cross-tab sync.
 * Falls back to the initial value when localStorage is unavailable
 * (e.g., during server-side rendering or in private browsing mode).
 *
 * Effect pattern: storage event listener with cleanup
 * - Effect subscribes to the "storage" event for cross-tab synchronization
 * - Cleanup removes the listener to prevent memory leaks
 * - SSR-safe: guards all window/localStorage access
 *
 * @example
 * const [theme, setTheme, removeTheme] = useLocalStorage("theme", "light");
 * setTheme("dark");       // saves to localStorage and updates state
 * setTheme(prev => ...);  // supports updater function like useState
 * removeTheme();          // removes from localStorage, resets to initial value
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Read the current value from localStorage, falling back to initialValue
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Setter that mirrors useState's API — accepts a value or updater function
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          // Dispatch a storage event so other tabs/hooks using the same key stay in sync
          window.dispatchEvent(
            new StorageEvent("storage", {
              key,
              newValue: JSON.stringify(valueToStore),
            }),
          );
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  // Remove the value from localStorage and reset to initial
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);

      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
        window.dispatchEvent(
          new StorageEvent("storage", { key, newValue: null }),
        );
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Sync state when another tab changes the same localStorage key
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.storageArea === window.localStorage) {
        try {
          const newValue =
            event.newValue !== null
              ? (JSON.parse(event.newValue) as T)
              : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.warn(
            `Error parsing storage event for key "${key}":`,
            error,
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup: stop listening when component unmounts or key changes
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
