# Equator 3D — Scroll-Driven Journey (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a scroll-driven 3D (WebGL/R3F) hero act on the Home page — a fixed canvas behind the HTML whose camera is driven by scroll — with a capability gate that falls back to the existing 2D site on mobile / no-WebGL / reduced-motion.

**Architecture:** A `"use client"` `ExperienceGate` checks capability post-hydration and either mounts a dynamically-imported (`ssr:false`) R3F `<Canvas>` fixed behind a tall scrolling hero region, or renders the existing 2D `ColorWash` home. Scroll position is mapped (pure fn) into a 0..1 progress written to a module store; `CameraRig` reads it each frame and interpolates the camera along a pure `cameraPath`. The procedural building/grid scene is the visible content; a `.glb` hero-model slot loads if present, else a procedural stand-in.

**Tech Stack:** Next 16.2.9 (App Router, React 19), TypeScript, `three`, `@react-three/fiber` v9, `@react-three/drei` v10, existing `gsap`/`lenis`, Vitest.

**Spec:** `docs/superpowers/specs/2026-06-24-equator-3d-scroll-journey-design.md`

---

## Constraints (read before any code)

- **`AGENTS.md`:** Next 16.2.9 has breaking changes vs training data. Before wiring `next/dynamic`, the canvas, or `next.config.ts`, skim `node_modules/next/dist/docs/01-app/` (client components, dynamic import). `ssr:false` dynamic import is only valid inside a `"use client"` component — `ExperienceGate` is that component.
- **Established repo patterns:** `"use client"` + hooks; pure logic isolated into `src/lib/**` and unit-tested with Vitest (see `src/lib/scroll-math.ts`, `src/lib/motion.ts`). Reuse `clamp` from `@/lib/scroll-math` and `prefersReducedMotion` from `@/lib/motion`.
- **Do not change** existing 2D components' content or colors. The 2D home (`ColorWash` + sections) is the fallback and must keep working.
- **TDD scope:** pure modules (`capability`, `cameraPath`, scroll mapping, geometry counts) get real Vitest tests first. R3F/canvas/visual behavior is verified manually (dev server) + `tsc`/`build`.
- **R3F v9 imports:** `Canvas`, `useFrame`, `useThree` from `@react-three/fiber`; `useGLTF`, `Html`, `useProgress`, `Environment` from `@react-three/drei`.

---

## File Structure

**New — pure libs (unit-tested):**
- `src/lib/three/capability.ts` — `canRender3D()` + helpers.
- `src/lib/three/cameraPath.ts` — `cameraAt(progress)` keyframe interpolation.
- `src/lib/three/scrollRange.ts` — `computeProgress(scrollY, start, end)` pure mapping.
- `src/lib/three/geometry.ts` — `buildingFloors(opts)` returns floor transform data.
- `src/lib/three/materials.ts` — brand color constants for the scene.
- `src/lib/three/scrollStore.ts` — module store `{ value: number }` for scroll progress.

**New — client/R3F:**
- `src/hooks/useScrollProgress.ts` — writes scroll→progress into the store via ScrollTrigger.
- `src/components/three/Loader.tsx` — drei progress loader.
- `src/components/three/HeroModel.tsx` — `.glb` slot with procedural fallback.
- `src/components/three/HeroScene.tsx` — procedural building + grid + lights + HeroModel.
- `src/components/three/CameraRig.tsx` — drives camera from store each frame.
- `src/components/three/Experience.tsx` — the `<Canvas>` (dynamic target).
- `src/components/three/HeroOverlay.tsx` — transparent HTML hero over the canvas.
- `src/components/three/ExperienceGate.tsx` — capability gate; 3D stack vs 2D fallback.

**Modified:**
- `package.json` — add three/r3f/drei.
- `src/app/page.tsx` — render `<ExperienceGate>`.

**Optional asset:**
- `public/models/hero-placeholder.glb` — swappable CC0 model (drop-in; not required to build).

---

## Task 1: Install 3D dependencies

**Files:** Modify `package.json`

- [ ] **Step 1: Install**

```bash
npm install three@^0.180 @react-three/fiber@^9 @react-three/drei@^10
```

Expected: installs without peer-dep errors against React 19. (`@types/three` already present.)

- [ ] **Step 2: Verify nothing broke**

Run: `npm test && npx tsc --noEmit && npm run build`
Expected: 16 tests pass, tsc clean, build succeeds (no new code yet — just deps).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: add three, react-three-fiber, drei"
```

---

## Task 2: Capability detection (pure, TDD)

**Files:** Create `src/lib/three/capability.ts`, `src/lib/three/capability.test.ts`

- [ ] **Step 1: Write failing tests**

`src/lib/three/capability.test.ts`:

```ts
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
```

- [ ] **Step 2: Run — verify fail**

Run: `npm test src/lib/three/capability.test.ts`
Expected: FAIL (module missing).

- [ ] **Step 3: Implement**

`src/lib/three/capability.ts`:

```ts
/** Pure capability checks for the 3D experience. SSR-safe. */

export const MIN_3D_WIDTH = 1024;

function hasWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}

function reducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True only on a capable, wide, motion-allowing, WebGL-enabled client. */
export function canRender3D(): boolean {
  if (typeof window === "undefined") return false;
  if (window.innerWidth < MIN_3D_WIDTH) return false;
  if (reducedMotion()) return false;
  return hasWebGL();
}
```

- [ ] **Step 4: Run — verify pass**

Run: `npm test src/lib/three/capability.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/three/capability.ts src/lib/three/capability.test.ts
git commit -m "feat: add 3D capability detection"
```

---

## Task 3: Camera path (pure, TDD)

**Files:** Create `src/lib/three/cameraPath.ts`, `src/lib/three/cameraPath.test.ts`

- [ ] **Step 1: Write failing tests**

`src/lib/three/cameraPath.test.ts`:

```ts
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
    // 3 keyframes → progress 0.5 is exactly the middle keyframe
    const c = cameraAt(0.5);
    expect(c.position[0]).toBeCloseTo(6);
  });
});
```

- [ ] **Step 2: Run — verify fail**

Run: `npm test src/lib/three/cameraPath.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement**

`src/lib/three/cameraPath.ts`:

```ts
import { clamp, lerp } from "@/lib/scroll-math";

type Vec3 = [number, number, number];
interface Keyframe {
  position: Vec3;
  target: Vec3;
}

/** Camera keyframes for the hero act, ordered by progress 0..1. */
const KEYFRAMES: Keyframe[] = [
  { position: [0, 8, 18], target: [0, 4, 0] },
  { position: [6, 5, 9], target: [0, 5, -2] },
  { position: [0, 3, 2], target: [0, 6, -8] },
];

function lerpVec(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/** Interpolate camera position+target along the keyframe path. */
export function cameraAt(progress: number): Keyframe {
  const p = clamp(progress, 0, 1) * (KEYFRAMES.length - 1);
  const i = Math.floor(p);
  if (i >= KEYFRAMES.length - 1) {
    return KEYFRAMES[KEYFRAMES.length - 1];
  }
  const t = p - i;
  return {
    position: lerpVec(KEYFRAMES[i].position, KEYFRAMES[i + 1].position, t),
    target: lerpVec(KEYFRAMES[i].target, KEYFRAMES[i + 1].target, t),
  };
}
```

- [ ] **Step 4: Run — verify pass**

Run: `npm test src/lib/three/cameraPath.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/three/cameraPath.ts src/lib/three/cameraPath.test.ts
git commit -m "feat: add camera path interpolation"
```

---

## Task 4: Scroll range mapping + store + hook

**Files:** Create `src/lib/three/scrollRange.ts`, `src/lib/three/scrollRange.test.ts`, `src/lib/three/scrollStore.ts`, `src/hooks/useScrollProgress.ts`

- [ ] **Step 1: Write failing test for the pure mapper**

`src/lib/three/scrollRange.test.ts`:

```ts
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
```

- [ ] **Step 2: Run — verify fail**

Run: `npm test src/lib/three/scrollRange.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement the mapper**

`src/lib/three/scrollRange.ts`:

```ts
import { clamp } from "@/lib/scroll-math";

/** Map a scroll position within [start,end] to 0..1. Degenerate range → 0. */
export function computeProgress(scrollY: number, start: number, end: number): number {
  if (end <= start) return 0;
  return clamp((scrollY - start) / (end - start), 0, 1);
}
```

- [ ] **Step 4: Run — verify pass**

Run: `npm test src/lib/three/scrollRange.test.ts`
Expected: PASS.

- [ ] **Step 5: Add the store (no test — trivial mutable holder)**

`src/lib/three/scrollStore.ts`:

```ts
/** Module-level holder for current hero-act scroll progress (0..1).
 *  Written by useScrollProgress, read in the R3F frame loop (CameraRig). */
export const scrollProgress = { value: 0 };
```

- [ ] **Step 6: Add the hook**

`src/hooks/useScrollProgress.ts`:

```ts
"use client";

import { useEffect } from "react";
import { registerScrollTrigger } from "@/lib/motion";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { scrollProgress } from "@/lib/three/scrollStore";

/**
 * Drives `scrollProgress.value` (0..1) from scroll position over the element
 * referenced by `triggerId`, across `distance` viewport-heights of scroll.
 */
export function useScrollProgress(triggerId: string): void {
  useEffect(() => {
    registerScrollTrigger();
    const el = document.getElementById(triggerId);
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.value = self.progress;
      },
    });

    return () => st.kill();
  }, [triggerId]);
}
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/three/scrollRange.ts src/lib/three/scrollRange.test.ts src/lib/three/scrollStore.ts src/hooks/useScrollProgress.ts
git commit -m "feat: add scroll-range mapping, progress store, and hook"
```

---

## Task 5: Brand materials + procedural geometry (pure parts TDD)

**Files:** Create `src/lib/three/materials.ts`, `src/lib/three/geometry.ts`, `src/lib/three/geometry.test.ts`

- [ ] **Step 1: Add brand color constants (no test — constants)**

`src/lib/three/materials.ts`:

```ts
/** Brand colors for the 3D scene (hex ints for three.js). */
export const BRAND = {
  charcoal: 0x1a1a2e,
  navy: 0x1b2b5e,
  blue: 0x2547a1,
  sky: 0x4a90d9,
  gold: 0xc9a84c,
  silver: 0xe8edf5,
} as const;
```

- [ ] **Step 2: Write failing test for geometry builder**

`src/lib/three/geometry.test.ts`:

```ts
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
```

- [ ] **Step 3: Run — verify fail**

Run: `npm test src/lib/three/geometry.test.ts`
Expected: FAIL.

- [ ] **Step 4: Implement**

`src/lib/three/geometry.ts`:

```ts
export interface FloorTransform {
  /** Vertical offset of this floor. */
  y: number;
  /** Uniform horizontal scale (taper) for this floor. */
  scale: number;
}

export interface BuildingOptions {
  count: number;
  floorHeight: number;
  /** Fraction of width lost per floor as it rises (0 = no taper). */
  taper: number;
}

/** Pure layout for a stacked, optionally-tapering procedural tower. */
export function buildingFloors(opts: BuildingOptions): FloorTransform[] {
  const floors: FloorTransform[] = [];
  for (let i = 0; i < opts.count; i++) {
    floors.push({
      y: i * opts.floorHeight,
      scale: 1 - opts.taper * i,
    });
  }
  return floors;
}
```

- [ ] **Step 5: Run — verify pass**

Run: `npm test src/lib/three/geometry.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/three/materials.ts src/lib/three/geometry.ts src/lib/three/geometry.test.ts
git commit -m "feat: add brand materials and procedural building layout"
```

---

## Task 6: Loader + HeroModel (glb slot with procedural fallback)

**Files:** Create `src/components/three/Loader.tsx`, `src/components/three/HeroModel.tsx`

- [ ] **Step 1: Loader**

`src/components/three/Loader.tsx`:

```tsx
"use client";

import { Html, useProgress } from "@react-three/drei";

/** Centered loading readout shown while scene assets load. */
export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="font-mono text-xs tracking-widest text-white/80">
        LOADING {Math.round(progress)}%
      </div>
    </Html>
  );
}
```

- [ ] **Step 2: HeroModel with safe fallback**

The model file is optional. `HeroModel` tries to load `/models/hero-placeholder.glb`; if it is absent or fails, an error boundary renders a procedural stand-in block so the scene always works.

`src/components/three/HeroModel.tsx`:

```tsx
"use client";

import { Component, ReactNode } from "react";
import { useGLTF } from "@react-three/drei";
import { BRAND } from "@/lib/three/materials";

const MODEL_URL = "/models/hero-placeholder.glb"; // SWAP POINT: drop a CC0 .glb here

function GltfModel() {
  // Draco-enabled load; throws (caught by boundary) if the file is missing.
  const { scene } = useGLTF(MODEL_URL, true);
  return <primitive object={scene} position={[0, 0, 0]} scale={1} />;
}

/** Procedural stand-in used when no .glb is present. */
function ProceduralModel() {
  return (
    <mesh position={[0, 1, 0]} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={BRAND.blue} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

class ModelBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Hybrid hero model slot: real .glb if present, else procedural stand-in. */
export default function HeroModel() {
  return (
    <ModelBoundary fallback={<ProceduralModel />}>
      <GltfModel />
    </ModelBoundary>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/three/Loader.tsx src/components/three/HeroModel.tsx
git commit -m "feat: add 3D loader and hero-model slot with procedural fallback"
```

---

## Task 7: HeroScene + CameraRig

**Files:** Create `src/components/three/HeroScene.tsx`, `src/components/three/CameraRig.tsx`

- [ ] **Step 1: CameraRig**

`src/components/three/CameraRig.tsx`:

```tsx
"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { cameraAt } from "@/lib/three/cameraPath";
import { scrollProgress } from "@/lib/three/scrollStore";

const _target = new Vector3();

/** Drives the camera along the keyframe path from scroll progress each frame. */
export default function CameraRig() {
  const camera = useThree((s) => s.camera);

  useFrame(() => {
    const { position, target } = cameraAt(scrollProgress.value);
    // Smooth toward target transform for a filmic feel.
    camera.position.lerp(new Vector3(position[0], position[1], position[2]), 0.1);
    _target.set(target[0], target[1], target[2]);
    camera.lookAt(_target);
  });

  return null;
}
```

- [ ] **Step 2: HeroScene**

`src/components/three/HeroScene.tsx`:

```tsx
"use client";

import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { BRAND } from "@/lib/three/materials";
import { buildingFloors } from "@/lib/three/geometry";
import HeroModel from "./HeroModel";
import CameraRig from "./CameraRig";
import Loader from "./Loader";

const FLOORS = buildingFloors({ count: 9, floorHeight: 1.4, taper: 0.06 });

/** Phase 1 hero scene: procedural wireframe tower + blueprint grid + lights. */
export default function HeroScene() {
  return (
    <>
      <CameraRig />

      <color attach="background" args={[BRAND.charcoal]} />
      <fog attach="fog" args={[BRAND.charcoal, 18, 42]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 12, 8]} intensity={1.1} color={BRAND.sky} />
      <pointLight position={[-6, 6, -4]} intensity={40} color={BRAND.gold} />

      {/* Blueprint grid plane */}
      <gridHelper args={[60, 60, BRAND.blue, BRAND.navy]} position={[0, 0, 0]} />

      {/* Procedural wireframe tower */}
      <group position={[0, 0, -2]}>
        {FLOORS.map((floor, i) => (
          <mesh key={i} position={[0, floor.y + 0.7, 0]} scale={[floor.scale, 1, floor.scale]}>
            <boxGeometry args={[4, 1.3, 4]} />
            <meshStandardMaterial
              color={BRAND.navy}
              wireframe
              emissive={BRAND.sky}
              emissiveIntensity={0.15}
            />
          </mesh>
        ))}
      </group>

      <Suspense fallback={<Loader />}>
        <group position={[5, 0, 1]}>
          <HeroModel />
        </group>
        <Environment preset="city" />
      </Suspense>
    </>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors. (R3F v9 provides JSX intrinsics for `mesh`, `group`, `gridHelper`, lights, `color`, `fog`, `boxGeometry`, `meshStandardMaterial`.)

- [ ] **Step 4: Commit**

```bash
git add src/components/three/CameraRig.tsx src/components/three/HeroScene.tsx
git commit -m "feat: add hero 3D scene and scroll-driven camera rig"
```

---

## Task 8: Experience (Canvas)

**Files:** Create `src/components/three/Experience.tsx`

- [ ] **Step 1: Implement the Canvas**

`src/components/three/Experience.tsx`:

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import HeroScene from "./HeroScene";

/** Fixed full-screen R3F canvas behind page content. Dynamic-imported (ssr:false). */
export default function Experience() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 8, 18], fov: 50 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <HeroScene />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/three/Experience.tsx
git commit -m "feat: add fixed R3F canvas experience"
```

---

## Task 9: HeroOverlay (HTML hero over canvas)

**Files:** Create `src/components/three/HeroOverlay.tsx`

Provides the tall scroll region (the hero act's scroll length) and the sticky HTML headline that sits over the 3D canvas. The element id `hero-act` is the ScrollTrigger anchor for `useScrollProgress`.

- [ ] **Step 1: Implement**

`src/components/three/HeroOverlay.tsx`:

```tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Tall scroll region + sticky transparent hero headline over the 3D canvas. */
export default function HeroOverlay() {
  return (
    <section id="hero-act" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <div className="mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-equator-gold animate-pulse" />
          <span className="text-xs md:text-sm font-bold text-white tracking-widest uppercase">
            ISO 9001 &amp; 45001 Certified · PAN India Operations
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-8 max-w-5xl leading-[1.1] tracking-tight">
          Every Space.
          <br />
          <span className="text-equator-silver">Every System.</span>
          <br />
          <span className="text-equator-sky">Every Day.</span>
        </h1>
        <p className="text-lg md:text-2xl text-white/80 max-w-3xl mb-12 font-light">
          Equator delivers integrated retail turnkey execution, technical facility
          management, and housekeeping solutions for India&apos;s most demanding brands.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 items-center pointer-events-auto">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-equator-navy px-10 py-5 rounded-full font-bold hover:scale-105 transition-transform shadow-2xl"
          >
            Request a Proposal <ArrowRight size={20} />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-2 border-white/50 text-white px-10 py-5 rounded-full font-bold hover:border-white transition-colors uppercase tracking-wide"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/three/HeroOverlay.tsx
git commit -m "feat: add HTML hero overlay scroll region"
```

---

## Task 10: ExperienceGate + page integration

**Files:** Create `src/components/three/ExperienceGate.tsx`; Modify `src/app/page.tsx`

`ExperienceGate` renders the 2D fallback on first paint (SSR + pre-capability), then upgrades to the 3D stack after a post-hydration capability check. The 3D stack = dynamic `Experience` (canvas) + `HeroOverlay` + the existing 2D sections below it.

- [ ] **Step 1: Implement the gate**

`src/components/three/ExperienceGate.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { canRender3D } from "@/lib/three/capability";
import { useScrollProgress } from "@/hooks/useScrollProgress";

import StatsBar from "@/components/home/StatsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyEquator from "@/components/home/WhyEquator";
import ClientLogos from "@/components/home/ClientLogos";
import FeaturedProject from "@/components/home/FeaturedProject";
import ContactCTA from "@/components/home/ContactCTA";
import HeroOverlay from "./HeroOverlay";

import Hero from "@/components/home/Hero";
import ColorWash from "@/components/scroll/ColorWash";
import ParallaxLayer from "@/components/scroll/ParallaxLayer";

const Experience = dynamic(() => import("./Experience"), { ssr: false });

/** 2D fallback = the existing scroll home. */
function TwoD() {
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

/** 3D experience = canvas behind, hero overlay, then existing 2D sections. */
function ThreeD() {
  useScrollProgress("hero-act");
  return (
    <>
      <Experience />
      <div className="relative">
        <HeroOverlay />
        <div className="relative bg-equator-charcoal">
          <StatsBar />
          <ServicesGrid />
          <WhyEquator />
          <ClientLogos />
          <FeaturedProject />
          <ContactCTA />
        </div>
      </div>
    </>
  );
}

/** Chooses 3D vs 2D after a post-hydration capability check. */
export default function ExperienceGate() {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    setUse3D(canRender3D());
  }, []);

  return use3D ? <ThreeD /> : <TwoD />;
}
```

- [ ] **Step 2: Wire the page**

Replace the contents of `src/app/page.tsx` with:

```tsx
import ExperienceGate from "@/components/three/ExperienceGate";

export default function Home() {
  return <ExperienceGate />;
}
```

- [ ] **Step 3: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: tsc clean; build succeeds. The canvas is `ssr:false` so prerender of `/` emits the 2D fallback markup (SEO content present). No `window`/`document` SSR errors.

- [ ] **Step 4: Manual verify (dev server)**

Run: `npm run dev`, open `http://localhost:3000` on a desktop viewport (≥1024px, reduced-motion OFF).
Expected: the 3D canvas renders behind a sticky hero headline; scrolling the hero region moves the camera through the procedural tower/grid; below it the existing 2D sections appear. Then emulate reduced-motion (DevTools → Rendering) or shrink viewport <1024px and reload → the 2D `ColorWash` home renders instead. No console errors; no WebGL context errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/three/ExperienceGate.tsx src/app/page.tsx
git commit -m "feat: gate 3D experience with 2D fallback on home"
```

---

## Task 11: Verification pass

**Files:** none (verification only)

- [ ] **Step 1: Unit tests**

Run: `npm test`
Expected: all pass (existing 16 + capability 5 + cameraPath 5 + scrollRange 4 + geometry 3).

- [ ] **Step 2: Typecheck + production build**

Run: `npx tsc --noEmit && npm run build`
Expected: clean; `/` prerenders (2D fallback markup in HTML).

- [ ] **Step 3: 3D path audit (desktop, capable)**

Dev server, wide viewport, motion on: scene renders, scroll drives camera smoothly, model slot shows (procedural stand-in if no `.glb`), hero overlay pins through the act, no leaks/errors on navigating away and back.

- [ ] **Step 4: Fallback audit**

Reduced-motion ON, or viewport <1024px, or a browser with WebGL disabled → the 2D home renders, fully usable. View source / disable JS → 2D content/text present (SEO).

- [ ] **Step 5: Perf sanity**

DevTools Performance/FPS while scrolling the 3D hero: target ~60fps on a typical laptop; DPR capped at 2. Note any heavy frames.

- [ ] **Step 6: Final commit (if tweaks made)**

```bash
git add -A
git commit -m "chore: verification tweaks for 3D hero phase 1"
```

---

## Optional Task A: Drop in a CC0 hero model

**Files:** `public/models/hero-placeholder.glb`

Only if a real model is wanted now (otherwise the procedural stand-in is used).

- [ ] **Step 1:** Obtain a CC0/permissive `.glb` (e.g. a low-poly building/warehouse from a CC0 source such as Poly Haven, Quaternius, or a Sketchfab CC0 model). Verify the license permits commercial use + redistribution.
- [ ] **Step 2:** Optimize: draco-compress (`gltf-transform optimize in.glb public/models/hero-placeholder.glb`) and keep under ~2MB.
- [ ] **Step 3:** Place at `public/models/hero-placeholder.glb`. `HeroModel` picks it up automatically (no code change).
- [ ] **Step 4:** Dev server → confirm the model loads in the scene; adjust the `group position` in `HeroScene.tsx` if scale/placement needs it.
- [ ] **Step 5:** Commit:

```bash
git add public/models/hero-placeholder.glb
git commit -m "feat: add CC0 hero placeholder model"
```

---

## Self-Review (completed by plan author)

- **Spec coverage:** layering/fixed canvas (T8/T10) ✓; dynamic `ssr:false` (T10) ✓; scroll→camera bridge reusing engine (T3/T4/T7) ✓; capability gate + 2D fallback (T2/T10) ✓; procedural base + hybrid model slot (T5/T6/T7) ✓; loader/Suspense (T6/T7) ✓; hero overlay (T9) ✓; perf (dpr cap T8, verification T11) ✓; unit tests for pure logic (T2–T5) ✓; deps (T1) ✓; CC0 model swap (Optional A) ✓. Phase 2 excluded ✓.
- **Type consistency:** `cameraAt` returns `{position,target}` used by `CameraRig` (T3↔T7); `scrollProgress.value` written in T4 hook, read in T7 rig; `canRender3D`/`MIN_3D_WIDTH` (T2) used in T10; `buildingFloors`→`{y,scale}` (T5) consumed in T7; `BRAND` keys (T5) used in T6/T7; `computeProgress` (T4) tested pure (the hook uses ScrollTrigger's own progress, consistent 0..1 semantics).
- **Placeholder scan:** no TBD/TODO; all code blocks complete. The `.glb` is intentionally optional with a working procedural fallback (not a placeholder gap).
- **Note:** `computeProgress` is unit-tested and available; the runtime hook uses ScrollTrigger's native `self.progress` (same 0..1). If preferred, the hook can be switched to `computeProgress` against measured offsets without interface change.
