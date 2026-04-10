import Link from "next/link";

// =============================================================================
// Navbar — Simple navigation header for PageLayout's header slot
// =============================================================================
// This is a Server Component (no "use client") — it can be passed into
// PageLayout's header slot from a Server Component page, demonstrating
// clean server/client composition boundaries.
// =============================================================================

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3">
      <Link href="/" className="text-lg font-semibold">
        React Principles
      </Link>
      <div className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
        <Link href="/users" className="hover:text-zinc-900 dark:hover:text-zinc-50">
          Users
        </Link>
      </div>
    </nav>
  );
}
