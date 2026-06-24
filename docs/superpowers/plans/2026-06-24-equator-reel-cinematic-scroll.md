# The Equator Reel — Cinematic Scroll System (Home) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Home page (`/`) into one continuous, scroll-driven cinematic story using Lenis smooth scroll + GSAP ScrollTrigger, keeping all existing colors and content unchanged.

**Architecture:** A scroll engine (Lenis ↔ GSAP ticker sync) feeds reusable scroll primitives (`PinnedAct`, `ParallaxLayer`, `DataScrub`, `HorizontalActs`, `ColorWash`). Existing Home section components are wrapped/lightly refactored to consume these primitives. Pure math (interpolation, number formatting, color mixing) is isolated into a unit-tested module; all visual/pin behavior is verified manually in the dev server. A `prefers-reduced-motion` guard disables all scroll hijacking and falls back to static rendering.

**Tech Stack:** Next.js 16.2.9 (App Router, React 19), TypeScript, Tailwind v4, `lenis` ^1.3, `gsap` ^3.15 (ScrollTrigger), Vitest (new, for pure-logic tests only).

**Spec:** `docs/superpowers/specs/2026-06-24-equator-reel-cinematic-scroll-design.md`

---

## Constraints (read before any code)

- **`AGENTS.md`:** This Next.js (16.2.9) has breaking changes vs training data. Before editing `layout.tsx` / `page.tsx` / any engine code, skim relevant guides in `node_modules/next/dist/docs/01-app/`. Standard `"use client"` + `useEffect` is confirmed valid (existing components use it).
- **Established pattern (follow exactly):** client components import ScrollTrigger as `import { ScrollTrigger } from "gsap/dist/ScrollTrigger";`, register inside effect with `gsap.registerPlugin(ScrollTrigger)`, scope with `gsap.context(() => {...}, ref)`, and clean up with `return () => ctx.revert();`. See `src/components/home/ServicesGrid.tsx` and `WhyEquator.tsx`.
- **Do not change** any `--equator-*` color, copy text, image URL, or routing. This is a motion layer only.
- **TDD scope:** Only `src/lib/scroll-math.ts` (pure functions) is unit-tested. GSAP/Lenis/pin behavior is not meaningfully unit-testable → verified via dev server + `tsc` + `next build` per the spec's verification section.

---

## File Structure

**New files:**
- `vitest.config.ts` — Vitest config (jsdom env for matchMedia).
- `src/lib/scroll-math.ts` — pure helpers: `clamp`, `lerp`, `interpolate`, `formatStatValue`, `mixHex`.
- `src/lib/scroll-math.test.ts` — Vitest unit tests for the above.
- `src/lib/motion.ts` — `prefersReducedMotion()`, `registerScrollTrigger()` (client-only).
- `src/hooks/useLenis.ts` — Lenis init + GSAP ticker sync + cleanup.
- `src/components/scroll/ParallaxLayer.tsx` — depth-relative scroll movement.
- `src/components/scroll/PinnedAct.tsx` — pins a section for a scroll distance.
- `src/components/scroll/DataScrub.tsx` — maps scroll progress → formatted number(s).
- `src/components/scroll/HorizontalActs.tsx` — pin + vertical→horizontal track.
- `src/components/scroll/ColorWash.tsx` — fixed background overlay whose tint shifts with scroll.

**Modified files:**
- `package.json` — add `vitest`, `jsdom`, `@vitejs/plugin-react` devDeps + `test` script.
- `src/components/layout/SmoothScroll.tsx` — wire `useLenis` (currently a no-op passthrough).
- `src/components/home/Hero.tsx` — add pin + parallax exit, keep entrance timeline.
- `src/components/home/StatsBar.tsx` — replace `react-countup` with `DataScrub` (scroll-tied).
- `src/components/home/ServicesGrid.tsx` — wrap the 3 cards in `HorizontalActs` (+ mobile stack fallback).
- `src/components/home/WhyEquator.tsx` — add parallax to the bento grid.
- `src/app/page.tsx` — wrap page in `ColorWash`; add parallax wrappers around ClientLogos/FeaturedProject/ContactCTA.

---

## Task 1: Vitest setup + pure scroll-math module (TDD)

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/lib/scroll-math.test.ts`
- Create: `src/lib/scroll-math.ts`

- [ ] **Step 1: Add test tooling to package.json**

Add to `devDependencies` and `scripts`, then install.

```bash
npm install -D vitest@^3 jsdom@^25 @vitejs/plugin-react@^4
npm pkg set scripts.test="vitest run"
npm pkg set scripts.test:watch="vitest"
```

Expected: `npm install` completes; `package.json` shows `test` and `test:watch` scripts.

- [ ] **Step 2: Create Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

- [ ] **Step 3: Write the failing tests**

Create `src/lib/scroll-math.test.ts`:

```ts
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
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `scroll-math.ts` has no such exports / module not found.

- [ ] **Step 5: Implement the module**

Create `src/lib/scroll-math.ts`:

```ts
/** Pure scroll math helpers. No DOM, no side effects — unit-tested. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/** Map a scroll progress (0..1, clamped) onto a numeric range. */
export function interpolate(progress: number, from: number, to: number): number {
  return lerp(from, to, clamp(progress, 0, 1));
}

/** Format a stat number for display (rounded, grouped with commas). */
export function formatStatValue(value: number, decimals = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function toHex(n: number): string {
  return Math.round(clamp(n, 0, 255)).toString(16).padStart(2, "0");
}

/** Mix two #rrggbb colors. t=0 → a, t=1 → b. */
export function mixHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const tt = clamp(t, 0, 1);
  return `#${toHex(lerp(ar, br, tt))}${toHex(lerp(ag, bg, tt))}${toHex(lerp(ab, bb, tt))}`;
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all 5 describe blocks green.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/scroll-math.ts src/lib/scroll-math.test.ts
git commit -m "feat: add vitest + pure scroll-math helpers"
```

---

## Task 2: Motion helpers (reduced-motion + ScrollTrigger registration)

**Files:**
- Create: `src/lib/motion.ts`
- Create: `src/lib/motion.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/motion.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test src/lib/motion.test.ts`
Expected: FAIL — module not found / `prefersReducedMotion` undefined.

- [ ] **Step 3: Implement the module**

Create `src/lib/motion.ts`:

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

/** True if the user asked the OS to reduce motion. SSR-safe (returns false). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let registered = false;

/** Register ScrollTrigger once, client-side only. Safe to call repeatedly. */
export function registerScrollTrigger(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test src/lib/motion.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/motion.ts src/lib/motion.test.ts
git commit -m "feat: add reduced-motion + ScrollTrigger registration helpers"
```

---

## Task 3: Lenis engine + wire SmoothScroll

**Files:**
- Create: `src/hooks/useLenis.ts`
- Modify: `src/components/layout/SmoothScroll.tsx`

- [ ] **Step 1: Create the useLenis hook**

Create `src/hooks/useLenis.ts`:

```ts
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, registerScrollTrigger } from "@/lib/motion";

/**
 * Initializes Lenis smooth scroll and binds it to the GSAP ticker so
 * ScrollTrigger and Lenis share a single scroll source of truth.
 * No-ops (native scroll) when the user prefers reduced motion.
 */
export function useLenis(): void {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    registerScrollTrigger();

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
```

- [ ] **Step 2: Wire it into SmoothScroll**

Replace the entire contents of `src/components/layout/SmoothScroll.tsx`:

```tsx
"use client";

import { ReactNode } from "react";
import { useLenis } from "@/hooks/useLenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Manual verify smooth scroll**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: Mouse-wheel scroll now has buttery inertia/easing (not native instant jumps). Page scrolls top→bottom with no console errors.
Then toggle OS "reduce motion" ON, reload: scroll reverts to native (no inertia), still no errors.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useLenis.ts src/components/layout/SmoothScroll.tsx
git commit -m "feat: wire Lenis smooth scroll into SmoothScroll"
```

---

## Task 4: ParallaxLayer primitive

**Files:**
- Create: `src/components/scroll/ParallaxLayer.tsx`

- [ ] **Step 1: Implement ParallaxLayer**

Create `src/components/scroll/ParallaxLayer.tsx`:

```tsx
"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, registerScrollTrigger } from "@/lib/motion";

interface ParallaxLayerProps {
  children: ReactNode;
  /** Vertical travel in % of the element height across its scroll range.
   *  Negative = moves up faster than scroll (foreground), positive = lags (background). */
  speed?: number;
  className?: string;
}

export default function ParallaxLayer({
  children,
  speed = -15,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerScrollTrigger();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { yPercent: -speed / 2 },
        {
          yPercent: speed / 2,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit** (verified in integration tasks 9–12)

```bash
git add src/components/scroll/ParallaxLayer.tsx
git commit -m "feat: add ParallaxLayer scroll primitive"
```

---

## Task 5: PinnedAct primitive

**Files:**
- Create: `src/components/scroll/PinnedAct.tsx`

- [ ] **Step 1: Implement PinnedAct**

Create `src/components/scroll/PinnedAct.tsx`:

```tsx
"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, registerScrollTrigger } from "@/lib/motion";

interface PinnedActProps {
  children: ReactNode;
  /** How far (in viewport heights) the section stays pinned while content animates. */
  pinDuration?: number;
  /** Called with scroll progress 0..1 while pinned (for driving child animations). */
  onProgress?: (progress: number) => void;
  className?: string;
  /** Disable pinning below this viewport width (px). Default 768 (mobile). */
  minWidth?: number;
}

export default function PinnedAct({
  children,
  pinDuration = 1,
  onProgress,
  className,
  minWidth = 768,
}: PinnedActProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.innerWidth < minWidth) return;
    registerScrollTrigger();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: `+=${pinDuration * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => onProgress?.(self.progress),
      });
    }, ref);

    return () => ctx.revert();
  }, [pinDuration, onProgress, minWidth]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/scroll/PinnedAct.tsx
git commit -m "feat: add PinnedAct scroll primitive"
```

---

## Task 6: DataScrub primitive

**Files:**
- Create: `src/components/scroll/DataScrub.tsx`

- [ ] **Step 1: Implement DataScrub**

Create `src/components/scroll/DataScrub.tsx`. Uses the unit-tested `interpolate` + `formatStatValue`.

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, registerScrollTrigger } from "@/lib/motion";
import { interpolate, formatStatValue } from "@/lib/scroll-math";

interface DataScrubProps {
  from?: number;
  to: number;
  decimals?: number;
  className?: string;
}

/**
 * Renders a number that counts from `from`→`to` tied to scroll position
 * (control-room readout feel). Falls back to the final value statically
 * when reduced motion is requested.
 */
export default function DataScrub({
  from = 0,
  to,
  decimals = 0,
  className,
}: DataScrubProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = formatStatValue(to, decimals);
      return;
    }

    registerScrollTrigger();
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "top 35%",
        scrub: true,
        onUpdate: (self) => {
          el.textContent = formatStatValue(
            interpolate(self.progress, from, to),
            decimals
          );
        },
      });
    });

    return () => ctx.revert();
  }, [from, to, decimals]);

  return (
    <span ref={ref} className={className}>
      {formatStatValue(from, decimals)}
    </span>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/scroll/DataScrub.tsx
git commit -m "feat: add DataScrub scroll-tied counter primitive"
```

---

## Task 7: HorizontalActs primitive

**Files:**
- Create: `src/components/scroll/HorizontalActs.tsx`

- [ ] **Step 1: Implement HorizontalActs**

Create `src/components/scroll/HorizontalActs.tsx`. On `<minWidth` it renders children in a normal vertical stack (mobile fallback).

```tsx
"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, registerScrollTrigger } from "@/lib/motion";

interface HorizontalActsProps {
  children: ReactNode;
  /** Below this width (px) acts stack vertically with no pin. Default 768. */
  minWidth?: number;
  className?: string;
}

/**
 * Pins a section and converts vertical scroll into horizontal movement of an
 * inner track, then releases back to vertical. Children are the horizontal
 * "acts" laid out in a flex row. Stacks vertically on mobile / reduced motion.
 */
export default function HorizontalActs({
  children,
  minWidth = 768,
  className,
}: HorizontalActsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const active =
      !prefersReducedMotion() && window.innerWidth >= minWidth;
    setEnabled(active);
    if (!active) return;

    registerScrollTrigger();
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${distance}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [minWidth]);

  return (
    <div ref={sectionRef} className={className}>
      <div
        ref={trackRef}
        className={
          enabled
            ? "flex flex-nowrap items-stretch"
            : "flex flex-col gap-8"
        }
      >
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/scroll/HorizontalActs.tsx
git commit -m "feat: add HorizontalActs pin+horizontal scroll primitive"
```

---

## Task 8: ColorWash background

**Files:**
- Create: `src/components/scroll/ColorWash.tsx`

- [ ] **Step 1: Implement ColorWash**

Create `src/components/scroll/ColorWash.tsx`. A fixed full-screen layer behind all content whose tint shifts through the brand colors as the page scrolls, giving seamless act-to-act continuity without touching section backgrounds.

```tsx
"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, registerScrollTrigger } from "@/lib/motion";
import { mixHex } from "@/lib/scroll-math";

/** Brand color stops the wash travels through, top→bottom of the page. */
const STOPS = ["#1A1A2E", "#1B2B5E", "#E8EDF5", "#1B2B5E", "#2547A1"];

function colorAt(progress: number): string {
  const p = Math.min(Math.max(progress, 0), 1) * (STOPS.length - 1);
  const i = Math.floor(p);
  if (i >= STOPS.length - 1) return STOPS[STOPS.length - 1];
  return mixHex(STOPS[i], STOPS[i + 1], p - i);
}

export default function ColorWash({ children }: { children: ReactNode }) {
  const washRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerScrollTrigger();

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (washRef.current) {
          washRef.current.style.backgroundColor = colorAt(self.progress);
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <>
      {/* Subtle fixed tint behind everything (content sits above, opaque). */}
      <div
        ref={washRef}
        aria-hidden
        className="fixed inset-0 -z-10 opacity-30 transition-none pointer-events-none"
        style={{ backgroundColor: STOPS[0] }}
      />
      {children}
    </>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/scroll/ColorWash.tsx
git commit -m "feat: add ColorWash scroll-driven background layer"
```

---

## Task 9: Integrate Hero (pin + parallax exit)

**Files:**
- Modify: `src/components/home/Hero.tsx`

Keep the existing entrance timeline. Add a scroll-out parallax: as the hero leaves, the background image drifts down and the content lifts/fades, giving depth. Guard with reduced-motion.

- [ ] **Step 1: Add ScrollTrigger import**

In `src/components/home/Hero.tsx`, update the imports at the top (after line 4 `import gsap from "gsap";`):

```tsx
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, registerScrollTrigger } from "@/lib/motion";
```

- [ ] **Step 2: Add the parallax exit inside the existing gsap.context**

In the existing `useEffect` → `gsap.context(() => { ... }, containerRef)`, after the CTA `tl.fromTo(...)` block (currently ending at line 69), add:

```tsx
      // Scroll-out parallax (depth on exit)
      if (!prefersReducedMotion()) {
        registerScrollTrigger();
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to([eyebrowRef.current, headlineRef.current, subheadRef.current, ctaRef.current], {
          yPercent: -30,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Manual verify**

Run: `npm run dev`, scroll down from the top.
Expected: Background image drifts down at a slower rate while headline/CTA rise and fade — clear parallax depth on hero exit. Entrance animation on load still plays. Reduced-motion ON → no parallax, static hero.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/Hero.tsx
git commit -m "feat: add hero pin+parallax exit on scroll"
```

---

## Task 10: Integrate StatsBar with DataScrub

**Files:**
- Modify: `src/components/home/StatsBar.tsx`

Replace the `react-countup` + `useInView` numeric reveal with scroll-tied `DataScrub`. The "PAN India" string stat stays as-is.

- [ ] **Step 1: Swap imports and remove CountUp/useInView**

Replace the top of `src/components/home/StatsBar.tsx` (lines 1–6) with:

```tsx
"use client";

import DataScrub from "@/components/scroll/DataScrub";
```

- [ ] **Step 2: Remove the useInView hook usage**

Delete the `const { ref, inView } = useInView({ ... });` block (old lines 8–11) and the `ref={ref}` on the grid wrapper (old line 28 → keep the `<div className="grid ...">` but drop `ref={ref}`).

- [ ] **Step 3: Render numeric stats via DataScrub**

Replace the stat-value `<div className="font-display ...">` block (old lines 31–46) with:

```tsx
              <div className="font-display text-5xl md:text-6xl text-white font-bold mb-4 flex items-center justify-center drop-shadow-md group-hover:scale-110 transition-transform duration-500 whitespace-nowrap font-mono">
                {stat.isString ? (
                  <span>
                    {stat.value}
                    <span className="text-equator-sky">{stat.suffix}</span>
                  </span>
                ) : (
                  <>
                    <DataScrub to={stat.value as number} />
                    <span className="text-equator-sky ml-1">{stat.suffix}</span>
                  </>
                )}
              </div>
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors (no remaining references to `inView`, `CountUp`, or `useInView`).

- [ ] **Step 5: Manual verify**

Run: `npm run dev`, scroll the stats into view slowly.
Expected: `1`, `500`, `15` scrub up/down as you scroll through (not a one-shot count); mono digits; "PAN India" static. Reduced-motion ON → numbers show final values statically.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/StatsBar.tsx
git commit -m "feat: drive stats with scroll-tied DataScrub readouts"
```

---

## Task 11: Integrate ServicesGrid with HorizontalActs

**Files:**
- Modify: `src/components/home/ServicesGrid.tsx`

Turn the 3 service cards into horizontal "chapters" that scroll sideways while pinned (desktop), stacking vertically on mobile/reduced-motion. Keep card markup and the heading.

- [ ] **Step 1: Update imports**

In `src/components/home/ServicesGrid.tsx`, replace the existing gsap/ScrollTrigger imports (old lines 3–6) with:

```tsx
import Link from "next/link";
import HorizontalActs from "@/components/scroll/HorizontalActs";
import { Building2, Wrench, Sparkles, ArrowRight } from "lucide-react";
```

- [ ] **Step 2: Remove the old entrance ScrollTrigger effect**

Delete the entire `useEffect(() => { gsap.registerPlugin(...) ... }, []);` block (old lines 13–35) and the `cardsRef` declaration (old line 11). The `sectionRef` and its remaining usage can stay or be removed; remove `sectionRef` since pinning now lives in `HorizontalActs`. Drop `ref={sectionRef}` from the `<section>`.

- [ ] **Step 3: Wrap the cards grid in HorizontalActs**

Replace the cards container `<div className="grid grid-cols-1 md:grid-cols-3 gap-8"> ... </div>` (old lines 98–148) with a `HorizontalActs` track. Each card becomes a fixed-width act on desktop:

```tsx
        <HorizontalActs className="-mx-6 md:mx-0">
          {services.map((service, index) => (
            <div
              key={index}
              className="md:w-[80vw] md:max-w-[480px] shrink-0 md:mr-8 bg-white rounded-[2.5rem] p-10 border border-equator-silver shadow-lg shadow-equator-navy/5 transition-all duration-500 hover:shadow-2xl hover:shadow-equator-navy/20 relative overflow-hidden group flex flex-col cursor-pointer"
            >
              {/* Background Reveal on Hover */}
              <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-equator-navy/80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-equator-navy via-equator-navy/60 to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-equator-silver/40 group-hover:bg-white/10 backdrop-blur-md border border-transparent group-hover:border-white/20 flex items-center justify-center mb-8 transition-all duration-500 shadow-inner">
                  {service.icon}
                </div>
                <h3 className="font-display text-3xl text-equator-navy mb-4 group-hover:text-white transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-equator-charcoal/60 text-base leading-relaxed mb-8 font-light group-hover:text-white/80 transition-colors duration-500">
                  {service.description}
                </p>
                <ul className="space-y-4 mb-10">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm text-equator-navy font-medium group-hover:text-white/90 transition-colors duration-500 delay-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-equator-sky shrink-0 group-hover:bg-white group-hover:scale-150 transition-all duration-500" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={service.link}
                className="mt-auto relative z-10 inline-flex items-center gap-3 text-equator-blue font-bold tracking-wide group/link group-hover:text-white transition-colors duration-500"
              >
                Learn More
                <span className="w-8 h-8 rounded-full bg-equator-silver/50 group-hover:bg-white/20 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-equator-navy transition-all duration-300 backdrop-blur-sm">
                  <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-0.5" />
                </span>
              </Link>
            </div>
          ))}
        </HorizontalActs>
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors (no remaining `gsap`, `ScrollTrigger`, `sectionRef`, or `cardsRef` references).

- [ ] **Step 5: Manual verify (desktop + mobile)**

Run: `npm run dev`.
Desktop (≥768px): scrolling through the Services section pins it and the 3 cards travel horizontally, then vertical scroll resumes. No layout overlap with neighbors.
Mobile (<768px, devtools responsive): cards stack vertically, no pin, normal scroll.
Reduced-motion ON: stacked, no pin.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/ServicesGrid.tsx
git commit -m "feat: services scroll horizontally as pinned chapters"
```

---

## Task 12: Parallax on WhyEquator + final page composition with ColorWash

**Files:**
- Modify: `src/components/home/WhyEquator.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add parallax to the WhyEquator bento grid**

In `src/components/home/WhyEquator.tsx`, add the import after line 6:

```tsx
import ParallaxLayer from "@/components/scroll/ParallaxLayer";
```

Wrap the right-column bento grid: replace the opening `<div className="grid grid-cols-2 grid-rows-2 gap-4 md:gap-6 w-full h-[500px] md:h-[700px]">` (old line 118) with:

```tsx
            <ParallaxLayer speed={-10} className="grid grid-cols-2 grid-rows-2 gap-4 md:gap-6 w-full h-[500px] md:h-[700px]">
```

…and change its matching closing `</div>` (old line 151, the one immediately before `</div>` of the right column) to `</ParallaxLayer>`.

- [ ] **Step 2: Compose the page with ColorWash + parallax on closing acts**

Replace the entire contents of `src/app/page.tsx`:

```tsx
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyEquator from "@/components/home/WhyEquator";
import ClientLogos from "@/components/home/ClientLogos";
import FeaturedProject from "@/components/home/FeaturedProject";
import ContactCTA from "@/components/home/ContactCTA";
import ColorWash from "@/components/scroll/ColorWash";
import ParallaxLayer from "@/components/scroll/ParallaxLayer";

export default function Home() {
  return (
    <ColorWash>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <WhyEquator />
      <ClientLogos />
      <ParallaxLayer speed={-8}>
        <FeaturedProject />
      </ParallaxLayer>
      <ContactCTA />
    </ColorWash>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Manual verify**

Run: `npm run dev`, scroll the full page top→bottom.
Expected: WhyEquator bento drifts with subtle parallax; FeaturedProject has depth; a subtle brand-color wash shifts behind content across the whole journey (charcoal→navy→silver→navy→blue) with no hard section seams. No console errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/WhyEquator.tsx src/app/page.tsx
git commit -m "feat: parallax acts + ColorWash continuity on Home"
```

---

## Task 13: Verification pass (reduced-motion, mobile, build, perf)

**Files:** none (verification only)

- [ ] **Step 1: Run unit tests**

Run: `npm test`
Expected: All `scroll-math` + `motion` tests PASS.

- [ ] **Step 2: Typecheck + production build**

Run: `npx tsc --noEmit && npm run build`
Expected: Build succeeds, no type errors, no SSR `window`/`document` errors (engine code is client-guarded).

- [ ] **Step 3: Reduced-motion audit**

In OS settings (or devtools: Rendering → Emulate `prefers-reduced-motion: reduce`), reload Home.
Expected: No Lenis hijack (native scroll), no pin, no horizontal pivot, no parallax; stats show final values; page fully readable/navigable.

- [ ] **Step 4: Mobile audit**

Devtools responsive ≤767px, reload Home.
Expected: Services cards stacked (no pin), softened motion, no horizontal overflow / CLS jumps. Scroll smooth, no jank.

- [ ] **Step 5: Lighthouse**

Run Lighthouse (Chrome devtools) on Home (desktop + mobile).
Expected: Performance ≥ 90, CLS < 0.1 (spec §6 / brief §10). If CLS fails, check that pinned sections reserve space (`pinSpacing: true` — already set).

- [ ] **Step 6: Final commit (if any tweaks made during audit)**

```bash
git add -A
git commit -m "chore: verification pass tweaks for reel scroll system"
```

---

## Self-Review (completed by plan author)

- **Spec coverage:** Engine (T3) ✓, reduced-motion guard (T2/T3 + every primitive) ✓, primitives PinnedAct/ParallaxLayer/DataScrub/HorizontalActs (T4–T7) ✓, ColorWash continuity (T8) ✓, Hero pin+parallax (T9) ✓, Stats data scrub (T10) ✓, Services horizontal pivot (T11) ✓, WhyEquator parallax + closing acts (T12) ✓, mobile/SSR/CLS/Lighthouse verification (T13) ✓. Colors/content unchanged — no task alters tokens or copy. Phase 2 excluded ✓.
- **Type consistency:** `interpolate`/`formatStatValue`/`mixHex`/`clamp`/`lerp` used in T6/T8 match T1 signatures. `prefersReducedMotion`/`registerScrollTrigger` used everywhere match T2. `HorizontalActs`/`PinnedAct`/`ParallaxLayer`/`DataScrub`/`ColorWash` prop names match their definitions.
- **Placeholder scan:** No TBD/TODO; all code blocks complete.
- **Note:** `PinnedAct` is defined (T5) for reuse but not consumed on Home (Hero uses a lighter inline parallax exit; horizontal pinning lives in `HorizontalActs`). Kept because the spec lists it as a core primitive and Phase 2 will use it. If strict YAGNI is preferred at execution, T5 may be skipped without affecting Home.
