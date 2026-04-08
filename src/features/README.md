# `src/features/`

Feature modules organized as vertical slices. Each feature owns its own components, hooks, stores, and types. Features expose a public API via `index.ts` barrel exports. A feature should never import from another feature — shared code goes in `src/shared/`. Add a new directory here for each distinct feature of the application.
