// =============================================================================
// app/users/[id]/page.tsx — Typed Next.js page props example
// =============================================================================
// Demonstrates:
// - interface for Next.js page props (params + searchParams)
// - params and searchParams are Promises in Next.js 15+
// - Async Server Component that delegates rendering to a Client Component
// =============================================================================

import { UserDetail } from "@/features/users";

// ✅ Type the page props — params and searchParams are Promises in Next.js 15+
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function UserPage({ params }: PageProps) {
  // Await params before accessing — required in Next.js 15+
  const { id } = await params;

  // URL params are always strings — convert to number before passing to the hook
  return <UserDetail id={Number(id)} />;
}
