import { describe, it, expect } from "vitest";
import { clamp, lerp, interpolate, formatStatValue, mixHex } from "./scroll-math";

describe("clamp", () => {
  it("clamps below min", () => expect(clamp(-1, 0, 10)).toBe(0));
  it("clamps above max", () => expect(clamp(99, 0, 10)).toBe(10));
  it("passes through in range", () => expect(clamp(5, 0, 10)).toBe(5));
});

describe("lerp", () => {
  it("returns start at t=0", () => expect(lerp(0, 100, 0)).toBe(0));
  it("returns end at t=1", () => expect(lerp(0, 100, 1)).toBe(100));
  it("returns midpoint at t=0.5", () => expect(lerp(0, 100, 0.5)).toBe(50));
});

describe("interpolate", () => {
  it("maps progress 0 to from", () => expect(interpolate(0, 0, 500)).toBe(0));
  it("maps progress 1 to to", () => expect(interpolate(1, 0, 500)).toBe(500));
  it("clamps out-of-range progress", () => expect(interpolate(2, 0, 500)).toBe(500));
});

describe("formatStatValue", () => {
  it("adds thousands separators", () =>
    expect(formatStatValue(1000000)).toBe("1,000,000"));
  it("rounds to integer by default", () =>
    expect(formatStatValue(499.7)).toBe("500"));
});

describe("mixHex", () => {
  it("returns start color at t=0", () =>
    expect(mixHex("#000000", "#ffffff", 0)).toBe("#000000"));
  it("returns end color at t=1", () =>
    expect(mixHex("#000000", "#ffffff", 1)).toBe("#ffffff"));
  it("returns mid grey at t=0.5", () =>
    expect(mixHex("#000000", "#ffffff", 0.5)).toBe("#808080"));
});
