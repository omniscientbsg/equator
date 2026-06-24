import { describe, it, expect, vi, afterEach } from "vitest";
import { canRender3D, MIN_3D_WIDTH } from "./capability";

afterEach(() => vi.unstubAllGlobals());

function stub(opts: { width: number; reduced: boolean; webgl: boolean }) {
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: opts.reduced,
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
  vi.stubGlobal("innerWidth", opts.width);
  vi.stubGlobal("document", {
    createElement: () => ({
      getContext: (type: string) =>
        opts.webgl && (type === "webgl2" || type === "webgl") ? {} : null,
    }),
  });
}

describe("canRender3D", () => {
  it("true when wide, motion ok, webgl present", () => {
    stub({ width: 1440, reduced: false, webgl: true });
    expect(canRender3D()).toBe(true);
  });
  it("false when reduced motion", () => {
    stub({ width: 1440, reduced: true, webgl: true });
    expect(canRender3D()).toBe(false);
  });
  it("false when viewport too narrow", () => {
    stub({ width: 800, reduced: false, webgl: true });
    expect(canRender3D()).toBe(false);
  });
  it("false when no webgl", () => {
    stub({ width: 1440, reduced: false, webgl: false });
    expect(canRender3D()).toBe(false);
  });
  it("MIN_3D_WIDTH is 1024", () => expect(MIN_3D_WIDTH).toBe(1024));
});
