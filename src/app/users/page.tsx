// =============================================================================
// app/users/page.tsx — Server/Client composition example
// =============================================================================
// This page demonstrates the Component Composition recipe:
//
// 1. Server Component (this page) composes both Server and Client components
// 2. Navbar and Sidebar are Server Components — passed as named slots
// 3. UserList is a Client Component — passed as children
// 4. PageLayout controls structure, this page controls content
//
// The server/client boundary is clean: no "use client" on this page.
// =============================================================================

import { UserList } from "@/features/users";
import { Navbar, PageLayout, Sidebar } from "@/shared/components";

const sidebarItems = [
  { label: "All Users", href: "/users" },
  { label: "Create User", href: "/users/new" },
];

export default function UsersPage() {
  return (
    <PageLayout
      header={<Navbar />}
      sidebar={<Sidebar items={sidebarItems} />}
    >
      {/* Client Component as children — clean server/client boundary */}
      <UserList />
    </PageLayout>
  );
}
