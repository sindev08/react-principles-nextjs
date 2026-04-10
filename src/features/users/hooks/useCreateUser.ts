"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";
import { usersService } from "@/lib/services/users";
import type { CreateUserInput } from "@/shared/types/user";

/**
 * Creates a new user via DummyJSON.
 *
 * WHY a feature hook for mutations?
 * - Encapsulates the mutation logic, endpoint, and cache invalidation
 * - After a successful create, automatically refetches all user lists
 * - Components just call mutate(data) — no API knowledge needed
 *
 * @example
 * const { mutate, isPending } = useCreateUser();
 * mutate({ firstName: "John", lastName: "Doe", email: "john@example.com", age: 30 });
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserInput) => usersService.create(data),
    onSuccess: () => {
      // Invalidate all user list queries so they refetch with the new user
      void queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });
}
