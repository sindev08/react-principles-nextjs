import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode — helps catch common bugs during development:
  // - Renders components twice to detect impure renders
  // - Re-runs effects to catch missing cleanup functions
  // - Warns about deprecated APIs
  // Only applies in development, no impact on production build
  reactStrictMode: true,
};

export default nextConfig;
