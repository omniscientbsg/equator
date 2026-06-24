import { describe, it, expect } from "vitest";
import { cameraAt } from "./cameraPath";

describe("cameraAt", () => {
  it("returns first keyframe at progress 0", () => {
    const c = cameraAt(0);
    expect(c.position).toEqual([0, 8, 18]);
    expect(c.target).toEqual([0, 4, 0]);
  });
  it("returns last keyframe at progress 1", () => {
    const c = cameraAt(1);
    expect(c.position).toEqual([0, 3, 2]);
    expect(c.target).toEqual([0, 6, -8]);
  });
  it("clamps progress above 1", () => {
    expect(cameraAt(2)).toEqual(cameraAt(1));
  });
  it("clamps progress below 0", () => {
    expect(cameraAt(-1)).toEqual(cameraAt(0));
  });
  it("interpolates midway between two keyframes", () => {
    const c = cameraAt(0.5);
    expect(c.position[0]).toBeCloseTo(6);
  });
});
