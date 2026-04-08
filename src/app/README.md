# `src/app/`

Next.js App Router directory. Contains only routing, layouts, and page composition. Business logic lives in `src/features/`, not here. Pages should be thin — import feature components and render them. The `providers.tsx` file wraps the app with client-side context providers (TanStack Query, etc.).
