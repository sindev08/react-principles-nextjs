"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { getQueryClient } from "@/lib/query-client";

/**
 * Client-side providers wrapper.
 * Wraps the app with all required context providers.
 *
 * WHY a separate file?
 * - layout.tsx is a Server Component by default in App Router
 * - Providers that use React context (like QueryClientProvider) need "use client"
 * - Extracting providers keeps layout.tsx as a Server Component
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
