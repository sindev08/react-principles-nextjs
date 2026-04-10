# `src/features/users/`

The **users** feature demonstrates a full vertical slice: fetching, displaying, and creating users via the [DummyJSON API](https://dummyjson.com/docs/users).

## Structure

```
users/
├── components/     # UI specific to this feature (UserCard, UserList)
├── hooks/          # Data fetching hooks (useUsers, useUser, useCreateUser)
├── stores/         # Zustand stores scoped to this feature (empty — see note)
└── index.ts        # Public API — only import from here, never from internals
```

## Note on `stores/`

The `stores/` directory is intentionally empty. All user data is **server state** managed by React Query — there is nothing to store in Zustand. Creating a Zustand store here would be redundant. Add a store only when you have shared UI state that React Query cannot cover (e.g., a selected user ID shared across multiple components on the same page).
