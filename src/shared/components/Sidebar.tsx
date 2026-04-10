import Link from "next/link";

// =============================================================================
// Sidebar — Navigation sidebar for PageLayout's sidebar slot
// =============================================================================
// Accepts an items prop (named slot pattern in action).
// Server Component — no "use client" needed.
// =============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface SidebarItem {
  label: string;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function Sidebar({ items }: SidebarProps) {
  return (
    <nav className="flex flex-col gap-1 p-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
