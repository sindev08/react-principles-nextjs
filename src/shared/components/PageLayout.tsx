import { cn } from "@/shared/utils";

// =============================================================================
// PageLayout — Named Slots Pattern
// =============================================================================
// Instead of children-only composition, this layout accepts named slots
// for multiple injection points: header, sidebar, and main content.
//
// WHY named slots?
// - `children` only gives you ONE injection point
// - Named props give you MULTIPLE, clearly labeled injection points
// - The layout controls structure, the parent controls content
//
// Usage:
//   <PageLayout
//     header={<Navbar />}
//     sidebar={<Sidebar items={menuItems} />}
//   >
//     <UserList />
//   </PageLayout>
// =============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface PageLayoutProps {
  /** Content rendered in the top header area */
  header?: React.ReactNode;
  /** Content rendered in the left sidebar */
  sidebar?: React.ReactNode;
  /** Main content area */
  children: React.ReactNode;
  /** Additional classes for the main content area */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function PageLayout({
  header,
  sidebar,
  children,
  className,
}: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header slot — renders nothing if not provided */}
      {header && (
        <header className="border-b border-zinc-200 dark:border-zinc-700">
          {header}
        </header>
      )}

      <div className="flex flex-1">
        {/* Sidebar slot — only renders when provided */}
        {sidebar && (
          <aside className="w-64 shrink-0 border-r border-zinc-200 dark:border-zinc-700">
            {sidebar}
          </aside>
        )}

        {/* Main content — always renders */}
        <main className={cn("flex-1 p-6", className)}>{children}</main>
      </div>
    </div>
  );
}
