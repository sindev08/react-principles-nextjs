"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";
import { usersService } from "@/lib/services/users";

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
    queryFn: () => usersService.getAll(params),
  });
}
