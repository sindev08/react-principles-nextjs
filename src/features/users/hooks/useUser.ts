"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";
import { queryKeys } from "@/lib/query-keys";
import type { User } from "@/shared/types/user";

/**
 * Fetches a single user by ID from DummyJSON.
 * This is SERVER state (React Query), not shared state (Zustand).
 *
 * @example
 * const { data: user, isLoading } = useUser(1);
 */
export function useUser(id: number) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => api.get<User>(ENDPOINTS.users.detail(id)),
  });
}
