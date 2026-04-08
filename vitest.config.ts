import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    // Use jsdom to simulate a browser environment for component testing
    environment: "jsdom",

    // Global setup file — adds custom matchers like toBeInTheDocument()
    setupFiles: ["./src/test/setup.ts"],

    // Include test files matching these patterns
    include: ["src/**/*.test.{ts,tsx}"],

    // Enable global test APIs (describe, it, expect) without importing
    globals: true,
  },
  resolve: {
    alias: {
      // Mirror the @/ path alias from tsconfig so imports work in tests
      "@": resolve(__dirname, "./src"),
    },
  },
});
