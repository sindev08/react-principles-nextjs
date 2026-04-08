# `src/ui/`

Design system primitives — Button, Card, Dialog, Input, etc. Each file is a single, self-contained component. Variants are defined as `Record<VariantType, string>` constants (not cva). All dynamic class merging uses `cn()` from `@/shared/utils`. These components are generic and have no business logic or API awareness.
