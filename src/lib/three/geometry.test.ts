import { describe, it, expect } from "vitest";
import { buildingFloors } from "./geometry";

describe("buildingFloors", () => {
  it("produces one transform per floor", () => {
    const floors = buildingFloors({ count: 6, floorHeight: 1.5, taper: 0.1 });
    expect(floors).toHaveLength(6);
  });
  it("stacks floors upward by floorHeight", () => {
    const floors = buildingFloors({ count: 3, floorHeight: 2, taper: 0 });
    expect(floors[0].y).toBe(0);
    expect(floors[1].y).toBe(2);
    expect(floors[2].y).toBe(4);
  });
  it("tapers width as it rises", () => {
    const floors = buildingFloors({ count: 2, floorHeight: 1, taper: 0.2 });
    expect(floors[1].scale).toBeCloseTo(0.8);
  });
});
