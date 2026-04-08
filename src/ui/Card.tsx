import { cn } from "@/shared/utils";

// =============================================================================
// Card — Compound Component Pattern
// =============================================================================
// Instead of one Card with 10 props (title, subtitle, footer, headerIcon...),
// we compose multiple small components. The parent controls the structure.
//
// Usage:
//   <Card>
//     <Card.Header>Title</Card.Header>
//     <Card.Body>Content</Card.Body>
//     <Card.Footer>Actions</Card.Footer>
//   </Card>
// =============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Sub-components — each handles one section of the card
// ---------------------------------------------------------------------------
function CardHeader({ children, className }: CardProps) {
  return (
    <div className={cn("border-b border-zinc-200 px-6 py-4 dark:border-zinc-700", className)}>
      {children}
    </div>
  );
}

function CardBody({ children, className }: CardProps) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

function CardFooter({ children, className }: CardProps) {
  return (
    <div className={cn("border-t border-zinc-200 px-6 py-4 dark:border-zinc-700", className)}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------
export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Attach sub-components to Card — enables Card.Header, Card.Body, Card.Footer
// ---------------------------------------------------------------------------
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
