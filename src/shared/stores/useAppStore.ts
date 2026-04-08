"use client";

import { create } from "zustand";

/**
 * App-wide UI state — theme and sidebar.
 * This is SHARED state (Zustand), not server state (React Query).
 * Multiple components need this (navbar, sidebar, layout).
 */

interface AppState {
  /** Current color theme */
  theme: "light" | "dark";
  /** Whether the sidebar is expanded */
  sidebarOpen: boolean;
  /** Toggle between light and dark theme */
  toggleTheme: () => void;
  /** Toggle sidebar open/closed */
  toggleSidebar: () => void;
  /** Set theme directly */
  setTheme: (theme: "light" | "dark") => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: "light",
  sidebarOpen: true,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),
  setTheme: (theme) => set({ theme }),
}));
