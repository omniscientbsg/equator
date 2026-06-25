import { describe, it, expect } from "vitest";
import { generateCity } from "@/lib/three/city";

const P = { seed: 1337, count: 70, spread: 26, minH: 2, maxH: 16 };

describe("generateCity", () => {
  it("returns exactly `count` buildings", () => {
    expect(generateCity(P)).toHaveLength(70);
  });

  it("is deterministic for the same seed", () => {
    expect(generateCity(P)).toEqual(generateCity(P));
  });

  it("differs for a different seed", () => {
    expect(generateCity(P)).not.toEqual(generateCity({ ...P, seed: 7 }));
  });

  it("keeps positions within +/- spread and heights within range", () => {
    for (const b of generateCity(P)) {
      expect(Math.abs(b.x)).toBeLessThanOrEqual(26);
      expect(Math.abs(b.z)).toBeLessThanOrEqual(26);
      expect(b.h).toBeGreaterThanOrEqual(2);
      expect(b.h).toBeLessThanOrEqual(16);
      expect(b.w).toBeGreaterThan(0);
      expect(b.d).toBeGreaterThan(0);
    }
  });
});
