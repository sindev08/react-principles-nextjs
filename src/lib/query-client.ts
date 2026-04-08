"use client";

import { QueryClient } from "@tanstack/react-query";

/**
 * Creates a QueryClient with sensible defaults for DummyJSON.
 *
 * WHY a factory function instead of a singleton?
 * - In Next.js App Router, a singleton would be shared across all users on the server
 * - Each request should get its own QueryClient to prevent data leaking between users
 * - On the client, React state ensures a single instance per app lifecycle
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Keep data fresh for 60 seconds before refetching in the background
        staleTime: 60 * 1000,
        // Retry failed requests once (not 3 times — DummyJSON is rate-limited)
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/**
 * Returns a QueryClient instance.
 * On the server, always creates a new one (isolation).
 * On the client, reuses a single instance (performance).
 */
export function getQueryClient() {
  // Server: always make a new query client
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  // Browser: reuse the same client across renders
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}
