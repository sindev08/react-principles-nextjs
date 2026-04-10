"use client";

// =============================================================================
// UserList.tsx — Example of Server State consumption (React Query)
// =============================================================================
// This component demonstrates two key patterns:
//
// 1. SERVER STATE via React Query (useUsers hook):
//    - Data lives on the server, cached locally by React Query
//    - No Zustand store needed — that's the point!
//    - WHY: React Query already handles loading, caching, refetching.
//      Adding Zustand on top would be redundant duplication.
//
// 2. STATE TAXONOMY — knowing WHICH state tool to reach for:
//    - Server state (API data)  → React Query  ← this file
//    - Shared UI state          → Zustand       ← see shared/stores/
//    - Local ephemeral state    → useState      ← e.g., a toggle inside a component
// =============================================================================

// ---------------------------------------------------------------------------
// 1. IMPORTS
// ---------------------------------------------------------------------------
import { useUsers } from "../hooks/useUsers";
import { UserCard } from "./UserCard";

// ---------------------------------------------------------------------------
// 2. TYPES
// ---------------------------------------------------------------------------
interface UserListProps {
  /** How many users to show per page. Defaults to 10. */
  limit?: number;
}

// ---------------------------------------------------------------------------
// 3. COMPONENT FUNCTION
// ---------------------------------------------------------------------------
export function UserList({ limit = 10 }: UserListProps) {
  // useUsers encapsulates the query key, endpoint, and caching strategy.
  // This component has zero knowledge of the API — it just calls the hook.
  const { data, isLoading, isError } = useUsers({ limit, skip: 0 });

  // --- Loading state ---
  // React Query sets isLoading=true on the first fetch (no cached data yet)
  if (isLoading) {
    return (
      <div className="grid gap-3">
        {Array.from({ length: limit }).map((_, i) => (
          // Skeleton placeholders — same height as UserCard to avoid layout shift
          <div
            key={i}
            className="h-[72px] animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800"
          />
        ))}
      </div>
    );
  }

  // --- Error state ---
  if (isError) {
    return (
      <p className="text-sm text-red-500">
        Failed to load users. Check your network and try again.
      </p>
    );
  }

  // --- Empty state ---
  if (!data?.users.length) {
    return (
      <p className="text-sm text-zinc-500">No users found.</p>
    );
  }

  // --- Success state ---
  return (
    <div className="grid gap-3">
      {data.users.map((user) => (
        // key must be stable and unique — never use array index as key
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
