"use client";

import { create } from "zustand";

/**
 * Search dialog state — open/closed.
 * This is SHARED state (Zustand), not server state.
 * Used by the search button (opens) and the search dialog (reads).
 */

interface SearchState {
  /** Whether the search dialog is open */
  open: boolean;
  /** Open the search dialog */
  setOpen: () => void;
  /** Close the search dialog */
  setClose: () => void;
  /** Toggle the search dialog */
  toggle: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  open: false,
  setOpen: () => set({ open: true }),
  setClose: () => set({ open: false }),
  toggle: () => set((state) => ({ open: !state.open })),
}));
