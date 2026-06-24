import { describe, it, expect, vi, afterEach } from "vitest";
import { prefersReducedMotion } from "./motion";

afterEach(() => vi.unstubAllGlobals());

function stubMatchMedia(matches: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

describe("prefersReducedMotion", () => {
  it("returns true when the media query matches", () => {
    stubMatchMedia(true);
    expect(prefersReducedMotion()).toBe(true);
  });
  it("returns false when it does not match", () => {
    stubMatchMedia(false);
    expect(prefersReducedMotion()).toBe(false);
  });
});
