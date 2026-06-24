import { describe, it, expect } from "vitest";
import { computeProgress } from "./scrollRange";

describe("computeProgress", () => {
  it("0 at or before start", () => {
    expect(computeProgress(0, 0, 1000)).toBe(0);
    expect(computeProgress(-50, 0, 1000)).toBe(0);
  });
  it("1 at or after end", () => {
    expect(computeProgress(1000, 0, 1000)).toBe(1);
    expect(computeProgress(2000, 0, 1000)).toBe(1);
  });
  it("0.5 at midpoint", () => {
    expect(computeProgress(500, 0, 1000)).toBe(0.5);
  });
  it("0 when range is degenerate", () => {
    expect(computeProgress(500, 1000, 1000)).toBe(0);
  });
});
