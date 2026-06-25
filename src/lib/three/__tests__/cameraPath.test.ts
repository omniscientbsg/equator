import { describe, it, expect } from "vitest";
import { cameraAt } from "@/lib/three/cameraPath";

describe("cameraAt", () => {
  it("returns roll 0 at progress 0 (first keyframe)", () => {
    expect(cameraAt(0).roll).toBe(0);
  });

  it("clamps and returns the last keyframe at progress >= 1", () => {
    const end = cameraAt(1);
    const over = cameraAt(5);
    expect(over).toEqual(end);
  });

  it("produces a position and target of length 3", () => {
    const f = cameraAt(0.5);
    expect(f.position).toHaveLength(3);
    expect(f.target).toHaveLength(3);
    expect(typeof f.roll).toBe("number");
  });

  it("interpolates roll between keyframes (non-zero mid-segment)", () => {
    const f = cameraAt(0.16);
    expect(f.roll).toBeGreaterThan(0);
  });
});
