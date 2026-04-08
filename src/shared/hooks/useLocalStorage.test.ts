import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("returns initial value when localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default"),
    );
    expect(result.current[0]).toBe("default");
  });

  it("returns stored value from localStorage", () => {
    window.localStorage.setItem("test-key", JSON.stringify("stored"));
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default"),
    );
    expect(result.current[0]).toBe("stored");
  });

  it("updates localStorage when value is set", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default"),
    );

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
    expect(JSON.parse(window.localStorage.getItem("test-key") ?? "")).toBe(
      "updated",
    );
  });

  it("supports updater function like useState", () => {
    const { result } = renderHook(() =>
      useLocalStorage("counter", 0),
    );

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it("removes value from localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default"),
    );

    act(() => {
      result.current[1]("something");
    });
    expect(result.current[0]).toBe("something");

    act(() => {
      result.current[2](); // removeValue
    });
    expect(result.current[0]).toBe("default");
    expect(window.localStorage.getItem("test-key")).toBeNull();
  });

  it("works with complex objects", () => {
    const initial = { theme: "light", fontSize: 14 };
    const { result } = renderHook(() =>
      useLocalStorage("settings", initial),
    );

    act(() => {
      result.current[1]({ theme: "dark", fontSize: 16 });
    });

    expect(result.current[0]).toEqual({ theme: "dark", fontSize: 16 });
  });
});
