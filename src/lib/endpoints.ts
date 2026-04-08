/**
 * Centralized API endpoint definitions.
 * All paths are relative to the API base URL (DummyJSON).
 *
 * WHY centralize endpoints?
 * - Single source of truth — if an endpoint changes, update it in one place
 * - Type-safe dynamic segments via functions (e.g., detail(id))
 * - Easy to search for all usages of an endpoint
 *
 * @see https://dummyjson.com/docs
 */
export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    me: "/auth/me",
    refresh: "/auth/refresh",
  },
  users: {
    list: "/users",
    search: "/users/search",
    detail: (id: number) => `/users/${id}`,
    create: "/users/add",
    update: (id: number) => `/users/${id}`,
    delete: (id: number) => `/users/${id}`,
  },
} as const;
