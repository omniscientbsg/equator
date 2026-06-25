import { describe, it, expect } from "vitest";
import { parallaxOffset } from "@/lib/three/pointer";

describe("parallaxOffset", () => {
  it("is zero at center", () => {
    expect(parallaxOffset(0, 0, 2)).toEqual([0, 0]);
  });

  it("scales by strength", () => {
    expect(parallaxOffset(1, -1, 2)).toEqual([2, -2]);
  });

  it("clamps inputs beyond +/-1", () => {
    expect(parallaxOffset(5, -5, 3)).toEqual([3, -3]);
  });
});
