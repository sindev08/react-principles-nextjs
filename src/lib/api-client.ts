import type { ApiError } from "@/shared/types/api";

/**
 * Configuration for the API client.
 * Pass this to createApiClient() to create a configured instance.
 */
export interface ApiClientConfig {
  /** Base URL for all requests (e.g., "https://dummyjson.com") */
  baseUrl: string;
  /** Headers to include in every request */
  defaultHeaders?: Record<string, string>;
  /** Global error handler — called on every failed request */
  onError?: (error: ApiError) => void;
  /** Function that returns the auth token (if any) for Bearer auth */
  getAuthToken?: () => string | null;
}

/**
 * Options for individual requests, extending the standard RequestInit.
 * Use `params` for query string parameters and `body` for JSON payloads.
 */
export interface RequestOptions extends Omit<RequestInit, "body"> {
  /** Query string parameters — undefined values are filtered out */
  params?: Record<string, string | number | boolean | undefined>;
  /** Request body — will be JSON.stringify'd automatically */
  body?: unknown;
}

/**
 * Builds a full URL with query parameters.
 * Filters out undefined values so you can pass optional params safely.
 */
function buildUrl(
  base: string,
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
): string {
  const url = new URL(path, base);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

/**
 * Creates a type-safe API client with built-in error handling,
 * authentication, and response parsing.
 *
 * @example
 * const api = createApiClient({ baseUrl: "https://dummyjson.com" });
 * const users = await api.get<UsersResponse>("/users");
 */
export function createApiClient(config: ApiClientConfig) {
  const { baseUrl, defaultHeaders = {}, onError, getAuthToken } = config;

  async function request<T>(
    method: string,
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const { params, body, headers: requestHeaders, ...fetchOptions } = options;

    const url = buildUrl(baseUrl, path, params);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...defaultHeaders,
      ...(requestHeaders as Record<string, string> | undefined),
    };

    // Attach Bearer token if an auth token getter is configured
    const token = getAuthToken?.();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...fetchOptions,
    });

    if (!response.ok) {
      const errorBody: ApiError = await response.json().catch(() => ({
        message: response.statusText || "An unknown error occurred",
        statusCode: response.status,
      }));

      const apiError: ApiError = {
        message: errorBody.message || response.statusText,
        statusCode: response.status,
      };

      onError?.(apiError);
      throw apiError;
    }

    const data: T = (await response.json()) as T;
    return data;
  }

  return {
    get<T>(path: string, options?: RequestOptions): Promise<T> {
      return request<T>("GET", path, options);
    },

    post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
      return request<T>("POST", path, { ...options, body });
    },

    put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
      return request<T>("PUT", path, { ...options, body });
    },

    patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
      return request<T>("PATCH", path, { ...options, body });
    },

    delete<T>(path: string, options?: RequestOptions): Promise<T> {
      return request<T>("DELETE", path, options);
    },
  };
}

/** The type of an API client instance — useful for dependency injection */
export type ApiClient = ReturnType<typeof createApiClient>;
