import { createApiClient } from "./api-client";

/**
 * Pre-configured API client instance connected to DummyJSON.
 * Import this wherever you need to make API calls.
 *
 * @example
 * import { api } from "@/lib/api";
 * const users = await api.get<UsersResponse>(ENDPOINTS.users.list);
 */
export const api = createApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "https://dummyjson.com",
});
