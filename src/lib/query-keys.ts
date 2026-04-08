/**
 * Query key factory for TanStack Query.
 *
 * WHY use a factory?
 * - Prevents typos in query keys (type-safe)
 * - Makes cache invalidation predictable:
 *   queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
 *   → invalidates ALL user-related queries
 * - Hierarchical structure: all > lists > list(params) > details > detail(id)
 *
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
 */
export const queryKeys = {
  users: {
    /** Matches ALL user queries — use for broad invalidation */
    all: ["users"] as const,
    /** Matches all user list queries */
    lists: () => [...queryKeys.users.all, "list"] as const,
    /** Matches a specific user list query with given params */
    list: (params: Record<string, unknown>) =>
      [...queryKeys.users.lists(), params] as const,
    /** Matches all user detail queries */
    details: () => [...queryKeys.users.all, "detail"] as const,
    /** Matches a specific user detail query */
    detail: (id: number) => [...queryKeys.users.details(), id] as const,
  },
};
