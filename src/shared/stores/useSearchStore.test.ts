import { beforeEach, describe, expect, it } from "vitest";

import { useSearchStore } from "./useSearchStore";

describe("useSearchStore", () => {
  beforeEach(() => {
    useSearchStore.setState({ open: false });
  });

  it("starts closed", () => {
    expect(useSearchStore.getState().open).toBe(false);
  });

  it("opens", () => {
    useSearchStore.getState().setOpen();
    expect(useSearchStore.getState().open).toBe(true);
  });

  it("closes", () => {
    useSearchStore.setState({ open: true });
    useSearchStore.getState().setClose();
    expect(useSearchStore.getState().open).toBe(false);
  });

  it("toggles", () => {
    useSearchStore.getState().toggle();
    expect(useSearchStore.getState().open).toBe(true);

    useSearchStore.getState().toggle();
    expect(useSearchStore.getState().open).toBe(false);
  });
});
