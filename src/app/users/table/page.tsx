// =============================================================================
// app/users/table/page.tsx — Data Tables recipe demo
// =============================================================================
// Demonstrates TanStack Table v8 with real DummyJSON data:
// - Sortable columns (click header)
// - Global search filter (single input filters all columns)
// - Client-side pagination (prev/next controls)
//
// Compare with /users which uses a card-based layout (UserList).
// Same data source, different presentation — that's the power of
// separating data fetching (hooks) from rendering (components).
// =============================================================================

import { UserTable } from "@/features/users";
import { Navbar, PageLayout, Sidebar } from "@/shared/components";

const sidebarItems = [
  { label: "All Users", href: "/users" },
  { label: "Table View", href: "/users/table" },
  { label: "Create User", href: "/users/new" },
];

export default function UsersTablePage() {
  return (
    <PageLayout
      header={<Navbar />}
      sidebar={<Sidebar items={sidebarItems} />}
    >
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users Table</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Sortable, filterable, and paginated table powered by TanStack Table
            v8.
          </p>
        </div>
        <UserTable />
      </div>
    </PageLayout>
  );
}
