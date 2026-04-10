// =============================================================================
// UserCard.tsx — Example of Component Anatomy + Compound Component consumption
// =============================================================================
// This component demonstrates two things at once:
// 1. The standard component anatomy: imports → types → constants → function → export
// 2. How to CONSUME a compound component (Card) from the ui/ layer
//
// Notice how UserCard doesn't know anything about Card's internals —
// it just composes Card.Header, Card.Body, Card.Footer like named slots.
// =============================================================================

// ---------------------------------------------------------------------------
// 1. IMPORTS — ordered: React → external libs → internal (@/) → relative (./)
// ---------------------------------------------------------------------------
// No React import needed — Next.js uses the new JSX transform (React 17+)
import type { User } from "@/shared/types/user";
import { Card } from "@/ui/Card";

// ---------------------------------------------------------------------------
// 2. TYPES
// ---------------------------------------------------------------------------
interface UserCardProps {
  user: User;
  className?: string;
}

// ---------------------------------------------------------------------------
// 3. COMPONENT FUNCTION
// ---------------------------------------------------------------------------
// Named export — never use default exports (see Button.tsx for the full WHY)
export function UserCard({ user, className }: UserCardProps) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    // Card from ui/ is a compound component — it owns structure, we own content
    <Card className={className}>
      <Card.Body>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.image}
            alt={fullName}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-zinc-900 dark:text-zinc-50">
              {fullName}
            </p>
            <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
              {user.email}
            </p>
          </div>
          <span className="shrink-0 text-xs text-zinc-400">
            Age {user.age}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}
