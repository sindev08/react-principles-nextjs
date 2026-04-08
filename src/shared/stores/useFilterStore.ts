"use client";

import { create } from "zustand";

/**
 * Filter state for list views — search, role, status.
 * This is SHARED state (Zustand), not server state.
 * Used by filter components and list components together.
 */

interface FilterState {
  /** Text search query */
  search: string;
  /** Filter by user role */
  role: string;
  /** Filter by status */
  status: string;
  /** Update the search query */
  setSearch: (search: string) => void;
  /** Update the role filter */
  setRole: (role: string) => void;
  /** Update the status filter */
  setStatus: (status: string) => void;
  /** Reset all filters to defaults */
  reset: () => void;
}

const INITIAL_STATE = {
  search: "",
  role: "",
  status: "",
};

export const useFilterStore = create<FilterState>((set) => ({
  ...INITIAL_STATE,
  setSearch: (search) => set({ search }),
  setRole: (role) => set({ role }),
  setStatus: (status) => set({ status }),
  reset: () => set(INITIAL_STATE),
}));
