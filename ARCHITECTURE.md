# Architecture

This document explains the folder structure and key architectural decisions in this starter template.

## Folder Structure

```
src/
├── app/                  # Next.js App Router — routing and layouts ONLY
│   ├── layout.tsx        # Root layout (fonts, providers, metadata)
│   ├── page.tsx          # Home page
│   ├── providers.tsx     # Client-side context providers (QueryClient, etc.)
│   └── globals.css       # Global styles and Tailwind imports
│
├── features/             # Feature modules (vertical slices)
│   └── users/            # Each feature owns its own components, hooks, stores
│       ├── components/   # UI specific to this feature
│       ├── hooks/        # Data fetching and logic hooks
│       ├── stores/       # Zustand stores scoped to this feature
│       └── index.ts      # Barrel export — public API of the feature
│
├── shared/               # Cross-feature shared code
│   ├── components/       # Reusable components (ErrorBoundary, LoadingState, etc.)
│   ├── hooks/            # Reusable hooks (useDebounce, useLocalStorage, etc.)
│   ├── stores/           # App-wide stores (theme, sidebar, etc.)
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Utility functions (cn, formatters, validators)
│
├── ui/                   # Design system primitives (Button, Card, Dialog, etc.)
│                         # Each file is a single, self-contained component
│
├── lib/                  # Infrastructure code
│   ├── api-client.ts     # Fetch-based API client factory
│   ├── api.ts            # Pre-configured API instance (DummyJSON)
│   ├── endpoints.ts      # Centralized endpoint definitions
│   ├── query-client.ts   # TanStack Query client factory
│   └── query-keys.ts     # Type-safe query key factory
│
└── test/                 # Test infrastructure
    └── setup.ts          # Vitest setup (Testing Library matchers)
```

## Decision Log

### Feature-Sliced Architecture

**Decision:** Organize code by feature, not by type.

**Why:** In a "group by type" structure (`components/`, `hooks/`, `services/`), related code is scattered across the tree. Feature slicing keeps everything related to a feature in one directory, making it easier to understand, modify, and delete features.

**Rule:** A feature should never import from another feature. If two features need shared code, it goes in `shared/`.

### App Router Pages Are Thin

**Decision:** `src/app/` only contains routing, layouts, and metadata. No business logic.

**Why:** Next.js couples routing to the filesystem. By keeping pages thin (just importing and composing feature components), we keep business logic decoupled from the router. This makes features testable and portable.

### API Client Factory Pattern

**Decision:** Use a `createApiClient()` factory instead of raw `fetch` calls.

**Why:** Centralizes headers, auth, error handling, and response parsing. Every API call goes through the same pipeline, making it easy to add logging, retry logic, or switch auth strategies without touching every call site.

### Query Key Factory

**Decision:** Use a hierarchical query key factory (`queryKeys.users.list(params)`).

**Why:** TanStack Query cache invalidation works by key matching. A factory ensures keys are consistent and hierarchical — invalidating `queryKeys.users.all` invalidates all user queries at once.

### Barrel Exports

**Decision:** Each module exposes a public API via `index.ts`.

**Why:** Controls what is importable from outside the module. Internal files can be refactored freely without breaking imports. Consumers import from `@/features/users`, not `@/features/users/hooks/useGetUsers`.

### cn() for Class Merging

**Decision:** All dynamic Tailwind classes go through `cn()` (clsx + tailwind-merge).

**Why:** Tailwind classes can conflict (e.g., `px-2` and `px-4`). `tailwind-merge` intelligently resolves conflicts. `clsx` handles conditional classes. `cn()` combines both into a single utility.
