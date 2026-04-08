/**
 * Standard API error response.
 * Used by the API client to type error responses from DummyJSON.
 */
export interface ApiError {
  message: string;
  statusCode: number;
}

/**
 * DummyJSON paginated list response shape.
 * All list endpoints (users, products, etc.) return this structure.
 * See: https://dummyjson.com/docs
 */
export interface PaginatedResponse<T> {
  /** The array of items for the current page */
  users: T[];
  /** Total number of items across all pages */
  total: number;
  /** Number of items skipped (offset-based pagination) */
  skip: number;
  /** Number of items per page */
  limit: number;
}

/**
 * Common query parameters for DummyJSON list endpoints.
 * DummyJSON uses skip/limit instead of page/perPage.
 */
export interface QueryParams {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  q?: string;
}
