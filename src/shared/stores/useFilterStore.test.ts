import { beforeEach, describe, expect, it } from "vitest";

import { useFilterStore } from "./useFilterStore";

describe("useFilterStore", () => {
  beforeEach(() => {
    useFilterStore.getState().reset();
  });

  it("has empty initial state", () => {
    const state = useFilterStore.getState();
    expect(state.search).toBe("");
    expect(state.role).toBe("");
    expect(state.status).toBe("");
  });

  it("sets search", () => {
    useFilterStore.getState().setSearch("john");
    expect(useFilterStore.getState().search).toBe("john");
  });

  it("sets role", () => {
    useFilterStore.getState().setRole("admin");
    expect(useFilterStore.getState().role).toBe("admin");
  });

  it("sets status", () => {
    useFilterStore.getState().setStatus("active");
    expect(useFilterStore.getState().status).toBe("active");
  });

  it("resets all filters", () => {
    useFilterStore.getState().setSearch("john");
    useFilterStore.getState().setRole("admin");
    useFilterStore.getState().setStatus("active");

    useFilterStore.getState().reset();

    const state = useFilterStore.getState();
    expect(state.search).toBe("");
    expect(state.role).toBe("");
    expect(state.status).toBe("");
  });
});
