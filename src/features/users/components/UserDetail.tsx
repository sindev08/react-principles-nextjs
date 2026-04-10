"use client";

// =============================================================================
// UserDetail.tsx — Example of typed props + React Query for detail view
// =============================================================================
// Demonstrates:
// - interface for component props (id: number)
// - Consuming a typed hook (useUser) — return type inferred from useQuery
// - Proper null handling without non-null assertions (!.)
// =============================================================================

// ---------------------------------------------------------------------------
// 1. IMPORTS
// ---------------------------------------------------------------------------
import { useUser } from "../hooks/useUser";

// ---------------------------------------------------------------------------
// 2. TYPES
// ---------------------------------------------------------------------------
interface UserDetailProps {
  id: number;
}

// ---------------------------------------------------------------------------
// 3. COMPONENT FUNCTION
// ---------------------------------------------------------------------------
export function UserDetail({ id }: UserDetailProps) {
  // Return type is inferred from useQuery — explicit annotation not needed
  const { data: user, isLoading, isError } = useUser(id);

  if (isLoading) {
    return (
      <div className="h-32 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />
    );
  }

  if (isError || !user) {
    return <p className="text-sm text-red-500">Failed to load user.</p>;
  }

  return (
    <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {user.email}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Age {user.age}
          </p>
        </div>
      </div>
    </div>
  );
}
