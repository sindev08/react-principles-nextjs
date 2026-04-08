// =============================================================================
// Button.tsx — Annotated Component Anatomy Example
// =============================================================================
// This file is heavily commented to show the STRUCTURE every component follows.
// In a real codebase, you wouldn't comment this much — the pattern becomes muscle memory.
// =============================================================================

// ---------------------------------------------------------------------------
// 1. IMPORTS — ordered: React → external libs → internal (@/) → relative (./)
// ---------------------------------------------------------------------------
// React imports first — they're the foundation
import { type ButtonHTMLAttributes } from "react";

// Internal imports use the @/ alias (never relative paths across directories)
import { cn } from "@/shared/utils";

// ---------------------------------------------------------------------------
// 2. TYPES — props interface always comes first
// ---------------------------------------------------------------------------
// Use `interface` for component props — it reads as a clear contract
// Extend native HTML attributes so the component accepts all standard button props
// (onClick, disabled, aria-label, etc.) without redeclaring them
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
}

// Use `type` for unions — these are not "objects with fields", they're choices
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

// ---------------------------------------------------------------------------
// 3. CONSTANTS — static values that never change based on props
// ---------------------------------------------------------------------------
// Define variant styles as a Record<VariantType, string> — not using cva or
// class-variance-authority. This is simpler and just as type-safe.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700",
  outline:
    "border border-zinc-200 bg-transparent text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800",
  ghost:
    "bg-transparent text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800",
  danger:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

// ---------------------------------------------------------------------------
// 4. COMPONENT FUNCTION
// ---------------------------------------------------------------------------
// Named export — never use default exports. Named exports make refactoring
// and searching easier (you can grep for "Button" and find exactly where it's used)
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// 5. EXPORT — already done inline with `export function`
// ---------------------------------------------------------------------------
// Named exports make it clear what this module provides.
// Never use `export default` — it allows arbitrary import names which makes
// searching harder: `import Btn from './Button'` vs `import { Button } from './Button'`
