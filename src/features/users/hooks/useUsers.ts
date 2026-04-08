"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";
import { queryKeys } from "@/lib/query-keys";
import type { UsersResponse } from "@/shared/types/user";

/**
 * Fetches the list of users from DummyJSON.
 *
 * WHY a feature hook instead of calling api.get directly in the component?
 * - Encapsulates the query key, endpoint, and response type in one place
 * - Components just call useUsers() and get typed data back
 * - If the endpoint or caching strategy changes, only this file changes
 *
 * @example
 * const { data, isLoading, error } = useUsers({ limit: 10, skip: 0 });
 */
export function useUsers(params?: { limit?: number; skip?: number }) {
  return useQuery({
    queryKey: queryKeys.users.list(params ?? {}),
    queryFn: () =>
      api.get<UsersResponse>(ENDPOINTS.users.list, {
        params: {
          limit: params?.limit,
          skip: params?.skip,
        },
      }),
  });
}
