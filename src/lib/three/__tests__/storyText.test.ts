import { describe, it, expect } from "vitest";
import { beatOpacity } from "@/lib/three/storyText";

describe("beatOpacity", () => {
  it("is 0 outside the [start,end] window", () => {
    expect(beatOpacity(0.0, 0.3, 0.6, 0.1)).toBe(0);
    expect(beatOpacity(0.9, 0.3, 0.6, 0.1)).toBe(0);
  });

  it("is 1 in the held middle of the window", () => {
    expect(beatOpacity(0.45, 0.3, 0.6, 0.1)).toBe(1);
  });

  it("ramps up across the fade-in region", () => {
    expect(beatOpacity(0.35, 0.3, 0.6, 0.1)).toBeCloseTo(0.5, 5);
  });

  it("ramps down across the fade-out region", () => {
    expect(beatOpacity(0.55, 0.3, 0.6, 0.1)).toBeCloseTo(0.5, 5);
  });

  it("clamps to [0,1]", () => {
    const v = beatOpacity(0.3, 0.3, 0.6, 0.1);
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThanOrEqual(1);
  });
});
