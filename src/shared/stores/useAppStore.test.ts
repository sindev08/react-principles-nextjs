import { beforeEach, describe, expect, it } from "vitest";

import { useAppStore } from "./useAppStore";

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.setState({ theme: "light", sidebarOpen: true });
  });

  it("has correct initial state", () => {
    const state = useAppStore.getState();
    expect(state.theme).toBe("light");
    expect(state.sidebarOpen).toBe(true);
  });

  it("toggles theme", () => {
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe("dark");

    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe("light");
  });

  it("toggles sidebar", () => {
    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(false);

    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(true);
  });

  it("sets theme directly", () => {
    useAppStore.getState().setTheme("dark");
    expect(useAppStore.getState().theme).toBe("dark");
  });
});
