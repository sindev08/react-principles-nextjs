import { api } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";
import type {
  CreateUserInput,
  UpdateUserInput,
  User,
  UsersResponse,
} from "@/shared/types/user";

/**
 * Service layer for user-related API calls.
 * Pure API communication — no React, no state, no hooks.
 *
 * Chain: service → hook → component
 * - Service handles HTTP calls and response typing
 * - Hooks wrap services with React Query for caching/loading/error
 * - Components consume hooks and render UI
 *
 * @see https://dummyjson.com/docs/users
 */
export const usersService = {
  /** Fetch paginated user list */
  getAll: (params?: { limit?: number; skip?: number }): Promise<UsersResponse> =>
    api.get<UsersResponse>(ENDPOINTS.users.list, { params }),

  /** Search users by query */
  search: (q: string): Promise<UsersResponse> =>
    api.get<UsersResponse>(ENDPOINTS.users.search, { params: { q } }),

  /** Fetch a single user by ID */
  getById: (id: number): Promise<User> =>
    api.get<User>(ENDPOINTS.users.detail(id)),

  /** Create a new user */
  create: (data: CreateUserInput): Promise<User> =>
    api.post<User>(ENDPOINTS.users.create, data),

  /** Update an existing user */
  update: (id: number, data: UpdateUserInput): Promise<User> =>
    api.put<User>(ENDPOINTS.users.update(id), data),

  /** Delete a user */
  delete: (id: number): Promise<User> =>
    api.delete<User>(ENDPOINTS.users.delete(id)),
};
