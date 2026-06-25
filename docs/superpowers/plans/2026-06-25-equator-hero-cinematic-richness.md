# Rich Hero City — Cinematic 3D Hero Enrichment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the austere wireframe-tower 3D hero into a living, lit, cinematic stylized-city scene with idle motion, cursor parallax, in-world floating text, and a chromeless hero — reusing the entire existing Phase-1 pipeline.

**Architecture:** Keep `ExperienceGate` / `Experience` (dynamic ssr:false canvas) / capability gate / 2D fallback / `scrollProgress` bridge unchanged. Replace scene content: new pure libs (`city`, `pointer`, extended `cameraPath`/`materials`) drive new components (`City`, `Atmosphere`, `HeroText3D`, rewritten `CameraRig`/`HeroScene`). Add shadows + bloom to the canvas. Add a tiny `chromeStore` so the hero hides the global navbar/footer, revealing them after the hero exits.

**Tech Stack:** Next 16.2.9, React 19, R3F v9 (`@react-three/fiber`), drei v10, three 0.180, `@react-three/postprocessing` (new, for bloom), GSAP/ScrollTrigger (existing scroll bridge), vitest (pure-lib TDD).

**Design note (deviation from spec, intentional):** In-world headline uses drei `<Html transform>` (real DOM positioned in 3D space) instead of drei `<Text>`. This gives DOM-based text (better a11y, no runtime troika font fetch) while still floating in the world. A visually-hidden `<h1>` also stays in `HeroOverlay` for semantics.

---

## File map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/three/city.ts` | create | Pure deterministic city layout generator + types |
| `src/lib/three/__tests__/city.test.ts` | create | Tests for `generateCity` |
| `src/lib/three/pointer.ts` | create | Pure `parallaxOffset` |
| `src/lib/three/__tests__/pointer.test.ts` | create | Tests for `parallaxOffset` |
| `src/lib/three/pointerStore.ts` | create | Module-level pointer `{x,y}` bridge |
| `src/lib/three/cameraPath.ts` | modify | Add easing + per-keyframe `roll`, new city-scale keyframes, `CameraFrame` type |
| `src/lib/three/__tests__/cameraPath.test.ts` | create/modify | Tests for roll + easing + clamp |
| `src/lib/three/materials.ts` | modify | Add `BUILDING`, `GROUND` constants |
| `src/lib/three/chromeStore.ts` | create | Tiny subscribe/get/set store for chrome visibility |
| `src/components/three/City.tsx` | create | Instanced base buildings + emissive accent towers + ground |
| `src/components/three/Atmosphere.tsx` | create | Drifting dust points + pulsing beacon light |
| `src/components/three/HeroText3D.tsx` | create | drei `Html transform` headline words in world space |
| `src/components/three/CameraRig.tsx` | modify | Compose scroll path + cursor parallax + idle bob + roll |
| `src/components/three/HeroScene.tsx` | modify | Compose City + Atmosphere + HeroText3D + lights/shadows + bloom |
| `src/components/three/Experience.tsx` | modify | Enable `shadows` on `<Canvas>` |
| `src/components/three/HeroOverlay.tsx` | modify | Drop big headline → sr-only h1 + one minimal floating CTA |
| `src/components/layout/ChromeFrame.tsx` | create | Client wrapper that fades navbar/footer per `chromeStore` |
| `src/app/layout.tsx` | modify | Wrap `Navbar`/`Footer` in `ChromeFrame` |
| `src/hooks/useScrollProgress.ts` | modify | Also drive `chromeStore` (hide while in hero) |

---

## Task 1: City layout generator (pure, TDD)

**Files:**
- Create: `src/lib/three/city.ts`
- Test: `src/lib/three/__tests__/city.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// src/lib/three/__tests__/city.test.ts
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
```

- [ ] **Step 2: Run test, verify it fails**

Run: `npm test -- city`
Expected: FAIL — cannot find module `@/lib/three/city`.

- [ ] **Step 3: Implement**

```ts
// src/lib/three/city.ts
export interface Building {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  accent: boolean;
}

export interface CityParams {
  seed: number;
  count: number;
  spread: number;
  minH: number;
  maxH: number;
}

/** Deterministic seeded PRNG (mulberry32). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Build a deterministic stylized-city layout from a seed. */
export function generateCity(p: CityParams): Building[] {
  const rnd = mulberry32(p.seed);
  const out: Building[] = [];
  for (let i = 0; i < p.count; i++) {
    const x = (rnd() - 0.5) * 2 * p.spread;
    const z = (rnd() - 0.5) * 2 * p.spread;
    const w = 1.5 + rnd() * 2.5;
    const d = 1.5 + rnd() * 2.5;
    const h = p.minH + rnd() * (p.maxH - p.minH);
    const accent = rnd() < 0.12;
    out.push({ x, z, w, d, h, accent });
  }
  return out;
}
```

- [ ] **Step 4: Run test, verify it passes**

Run: `npm test -- city`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/three/city.ts src/lib/three/__tests__/city.test.ts
git commit -m "feat: deterministic procedural city layout generator"
```

---

## Task 2: Pointer parallax (pure, TDD) + pointer store

**Files:**
- Create: `src/lib/three/pointer.ts`
- Create: `src/lib/three/pointerStore.ts`
- Test: `src/lib/three/__tests__/pointer.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// src/lib/three/__tests__/pointer.test.ts
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
```

- [ ] **Step 2: Run test, verify it fails**

Run: `npm test -- pointer`
Expected: FAIL — cannot find module `@/lib/three/pointer`.

- [ ] **Step 3: Implement both files**

```ts
// src/lib/three/pointer.ts
/** Map a normalized pointer position (-1..1) to a small camera offset. */
export function parallaxOffset(
  nx: number,
  ny: number,
  strength: number,
): [number, number] {
  const cx = Math.max(-1, Math.min(1, nx));
  const cy = Math.max(-1, Math.min(1, ny));
  return [cx * strength, cy * strength];
}
```

```ts
// src/lib/three/pointerStore.ts
/** Module-level normalized pointer (-1..1), written by CameraRig's
 *  pointermove listener, read in the R3F frame loop. */
export const pointer = { x: 0, y: 0 };
```

- [ ] **Step 4: Run test, verify it passes**

Run: `npm test -- pointer`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/three/pointer.ts src/lib/three/pointerStore.ts src/lib/three/__tests__/pointer.test.ts
git commit -m "feat: pointer parallax offset helper + pointer store"
```

---

## Task 3: Camera path easing + roll (TDD)

**Files:**
- Modify: `src/lib/three/cameraPath.ts`
- Create: `src/lib/three/__tests__/cameraPath.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// src/lib/three/__tests__/cameraPath.test.ts
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
    // segment 0->1 goes roll 0 -> 0.04, so a point inside it is > 0
    const f = cameraAt(0.16);
    expect(f.roll).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

Run: `npm test -- cameraPath`
Expected: FAIL — `roll` undefined on the returned object.

- [ ] **Step 3: Replace `cameraPath.ts` with the rolled, eased version**

```ts
// src/lib/three/cameraPath.ts
import { clamp, lerp } from "@/lib/scroll-math";

type Vec3 = [number, number, number];

interface Keyframe {
  position: Vec3;
  target: Vec3;
  roll: number;
}

export interface CameraFrame {
  position: Vec3;
  target: Vec3;
  roll: number;
}

/** Camera keyframes for the hero act, scaled to the city, ordered by progress 0..1. */
const KEYFRAMES: Keyframe[] = [
  { position: [0, 14, 34], target: [0, 6, 0], roll: 0 },
  { position: [14, 8, 14], target: [0, 5, -4], roll: 0.04 },
  { position: [-6, 5, 4], target: [0, 7, -16], roll: -0.03 },
  { position: [0, 4, -10], target: [0, 8, -30], roll: 0 },
];

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerpVec(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/** Interpolate camera position+target+roll along the eased keyframe path. */
export function cameraAt(progress: number): CameraFrame {
  const p = clamp(progress, 0, 1) * (KEYFRAMES.length - 1);
  const i = Math.floor(p);
  if (i >= KEYFRAMES.length - 1) {
    const k = KEYFRAMES[KEYFRAMES.length - 1];
    return { position: k.position, target: k.target, roll: k.roll };
  }
  const t = easeInOutCubic(p - i);
  const a = KEYFRAMES[i];
  const b = KEYFRAMES[i + 1];
  return {
    position: lerpVec(a.position, b.position, t),
    target: lerpVec(a.target, b.target, t),
    roll: lerp(a.roll, b.roll, t),
  };
}
```

- [ ] **Step 4: Run test, verify it passes**

Run: `npm test -- cameraPath`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/three/cameraPath.ts src/lib/three/__tests__/cameraPath.test.ts
git commit -m "feat: eased camera path with banking roll, city-scale keyframes"
```

---

## Task 4: Material constants for the city

**Files:**
- Modify: `src/lib/three/materials.ts`

- [ ] **Step 1: Append building/ground constants**

```ts
// append to src/lib/three/materials.ts (keep existing BRAND export)

/** Solid building + ground colors for the lit city (hex ints). */
export const BUILDING = {
  base: 0x232a44,
  baseAlt: 0x2c3354,
} as const;

export const GROUND = 0x12131f;
```

- [ ] **Step 2: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: clean (no errors).

- [ ] **Step 3: Commit**

```bash
git add src/lib/three/materials.ts
git commit -m "feat: add building and ground color constants"
```

---

## Task 5: City component (instanced buildings + accents + ground)

**Files:**
- Create: `src/components/three/City.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/three/City.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D, Color, MeshStandardMaterial } from "three";
import { generateCity } from "@/lib/three/city";
import { BRAND, BUILDING, GROUND } from "@/lib/three/materials";

const CITY = generateCity({ seed: 1337, count: 70, spread: 26, minH: 2, maxH: 16 });
const BASE = CITY.filter((b) => !b.accent);
const ACCENTS = CITY.filter((b) => b.accent);
const dummy = new Object3D();

/** A single emissive accent tower that twinkles over time. */
function AccentTower({ idx, x, z, w, d, h }: { idx: number; x: number; z: number; w: number; d: number; h: number }) {
  const mat = useRef<MeshStandardMaterial>(null!);
  useFrame(({ clock }) => {
    mat.current.emissiveIntensity = 0.6 + Math.sin(clock.elapsedTime * 1.5 + idx) * 0.4;
  });
  const color = idx % 2 ? BRAND.gold : BRAND.sky;
  return (
    <mesh position={[x, h / 2, z]} scale={[w, h, d]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={0.8} toneMapped={false} />
    </mesh>
  );
}

/** Procedural lit city: instanced base buildings + emissive accent towers + ground. */
export default function City() {
  const ref = useRef<InstancedMesh>(null!);

  useLayoutEffect(() => {
    const mesh = ref.current;
    const cA = new Color(BUILDING.base);
    const cB = new Color(BUILDING.baseAlt);
    BASE.forEach((b, i) => {
      dummy.position.set(b.x, b.h / 2, b.z);
      dummy.scale.set(b.w, b.h, b.d);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, i % 2 ? cA : cB);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color={GROUND} roughness={0.9} />
      </mesh>

      <instancedMesh ref={ref} args={[undefined, undefined, BASE.length]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.7} metalness={0.1} />
      </instancedMesh>

      {ACCENTS.map((b, i) => (
        <AccentTower key={i} idx={i} x={b.x} z={b.z} w={b.w} d={b.d} h={b.h} />
      ))}
    </group>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/three/City.tsx
git commit -m "feat: lit procedural city component (instanced + accent towers)"
```

---

## Task 6: Atmosphere component (dust + beacon)

**Files:**
- Create: `src/components/three/Atmosphere.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/three/Atmosphere.tsx
"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, BufferGeometry, Float32BufferAttribute, PointLight } from "three";
import { BRAND } from "@/lib/three/materials";

/** Ambient idle life: slow-drifting dust points + a pulsing gold beacon. */
export default function Atmosphere() {
  const pts = useRef<Points>(null!);
  const beacon = useRef<PointLight>(null!);

  const geo = useMemo(() => {
    const g = new BufferGeometry();
    const n = 300;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 1] = Math.random() * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    g.setAttribute("position", new Float32BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (pts.current) pts.current.rotation.y = clock.elapsedTime * 0.02;
    if (beacon.current) beacon.current.intensity = 40 + Math.sin(clock.elapsedTime * 2) * 20;
  });

  return (
    <group>
      <points ref={pts} geometry={geo}>
        <pointsMaterial size={0.08} color={BRAND.silver} transparent opacity={0.5} sizeAttenuation />
      </points>
      <pointLight ref={beacon} position={[0, 20, -10]} color={BRAND.gold} intensity={40} distance={120} />
    </group>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/three/Atmosphere.tsx
git commit -m "feat: atmosphere component with drifting dust and pulsing beacon"
```

---

## Task 7: In-world floating headline (drei Html transform)

**Files:**
- Create: `src/components/three/HeroText3D.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/three/HeroText3D.tsx
"use client";

import { Html } from "@react-three/drei";

const WORDS: { text: string; pos: [number, number, number]; cls: string }[] = [
  { text: "Every Space.", pos: [-9, 11, -2], cls: "text-white" },
  { text: "Every System.", pos: [7, 8, -10], cls: "text-equator-silver" },
  { text: "Every Day.", pos: [-4, 6, -20], cls: "text-equator-sky" },
];

/** Headline words placed in 3D space among the city, parallaxing with the camera. */
export default function HeroText3D() {
  return (
    <>
      {WORDS.map((w, i) => (
        <Html key={i} position={w.pos} transform distanceFactor={14} zIndexRange={[0, 0]}>
          <div
            className={`font-display text-6xl whitespace-nowrap select-none drop-shadow-2xl ${w.cls}`}
            style={{ pointerEvents: "none" }}
          >
            {w.text}
          </div>
        </Html>
      ))}
    </>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/three/HeroText3D.tsx
git commit -m "feat: in-world floating headline via drei Html transform"
```

---

## Task 8: CameraRig — parallax + idle bob + roll

**Files:**
- Modify: `src/components/three/CameraRig.tsx`

- [ ] **Step 1: Replace with the composed rig**

```tsx
// src/components/three/CameraRig.tsx
"use client";

import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { cameraAt } from "@/lib/three/cameraPath";
import { scrollProgress } from "@/lib/three/scrollStore";
import { pointer } from "@/lib/three/pointerStore";
import { parallaxOffset } from "@/lib/three/pointer";

const _pos = new Vector3();
const _target = new Vector3();

/** Drives the camera from scroll progress + cursor parallax + idle bob + roll. */
export default function CameraRig() {
  const camera = useThree((s) => s.camera);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const { position, target, roll } = cameraAt(scrollProgress.value);
    const [px, py] = parallaxOffset(pointer.x, pointer.y, 2.2);
    const bob = Math.sin(clock.elapsedTime * 0.6) * 0.25;
    _pos.set(position[0] + px, position[1] + py + bob, position[2]);
    camera.position.lerp(_pos, 0.06);
    _target.set(target[0], target[1], target[2]);
    camera.lookAt(_target);
    camera.rotation.z = roll;
  });

  return null;
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/three/CameraRig.tsx
git commit -m "feat: camera rig with cursor parallax, idle bob, and roll"
```

---

## Task 9: Bloom dependency + shadows on the canvas

**Files:**
- Modify: `src/components/three/Experience.tsx`
- Modify: `package.json` (via install)

- [ ] **Step 1: Install postprocessing**

Run: `npm install @react-three/postprocessing`
Expected: installs without peer-dependency errors against R3F v9 / three 0.180.

- [ ] **Step 2: Enable shadows on the canvas**

```tsx
// src/components/three/Experience.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import HeroScene from "./HeroScene";

/** Fixed full-screen R3F canvas behind page content. Dynamic-imported (ssr:false). */
export default function Experience() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 14, 34], fov: 50 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <HeroScene />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 3: Verify typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: clean tsc; build succeeds. If the build fails on `@react-three/postprocessing` version mismatch, install the version matching R3F v9 (`npm install @react-three/postprocessing@^3`) and re-run.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/components/three/Experience.tsx
git commit -m "feat: enable canvas shadows and add postprocessing dep"
```

---

## Task 10: HeroScene — compose the rich scene + bloom

**Files:**
- Modify: `src/components/three/HeroScene.tsx`

- [ ] **Step 1: Replace HeroScene**

```tsx
// src/components/three/HeroScene.tsx
"use client";

import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BRAND } from "@/lib/three/materials";
import City from "./City";
import Atmosphere from "./Atmosphere";
import HeroText3D from "./HeroText3D";
import HeroModel from "./HeroModel";
import CameraRig from "./CameraRig";
import Loader from "./Loader";

/** Phase 1.5 hero scene: lit procedural city + atmosphere + in-world text + bloom. */
export default function HeroScene() {
  return (
    <>
      <CameraRig />

      <color attach="background" args={[BRAND.charcoal]} />
      <fog attach="fog" args={[BRAND.charcoal, 20, 70]} />

      <ambientLight intensity={0.25} />
      <hemisphereLight args={[BRAND.sky, BRAND.charcoal, 0.4]} />
      <directionalLight
        position={[18, 30, 12]}
        intensity={1.3}
        color={BRAND.silver}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-far={120}
      />

      <City />
      <Atmosphere />
      <HeroText3D />

      <Suspense fallback={<Loader />}>
        <group position={[10, 0, -6]}>
          <HeroModel />
        </group>
        <Environment preset="city" />
      </Suspense>

      <EffectComposer>
        <Bloom mipmapBlur intensity={0.6} luminanceThreshold={0.6} luminanceSmoothing={0.2} />
      </EffectComposer>
    </>
  );
}
```

- [ ] **Step 2: Verify typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: clean tsc; build succeeds (12 routes).

- [ ] **Step 3: Commit**

```bash
git add src/components/three/HeroScene.tsx
git commit -m "feat: compose rich hero city scene with lighting and bloom"
```

---

## Task 11: Chromeless hero (store + frame + overlay + scroll hook)

**Files:**
- Create: `src/lib/three/chromeStore.ts`
- Create: `src/components/layout/ChromeFrame.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/hooks/useScrollProgress.ts`
- Modify: `src/components/three/HeroOverlay.tsx`

- [ ] **Step 1: Create the chrome store**

```ts
// src/lib/three/chromeStore.ts
/** Tiny external store: is the global chrome (navbar/footer) hidden?
 *  Set true while the 3D hero is on screen; consumed by ChromeFrame. */
let hidden = false;
const subs = new Set<() => void>();

export function setChromeHidden(v: boolean): void {
  if (v !== hidden) {
    hidden = v;
    subs.forEach((f) => f());
  }
}

export function subscribeChrome(cb: () => void): () => void {
  subs.add(cb);
  return () => subs.delete(cb);
}

export function getChromeHidden(): boolean {
  return hidden;
}
```

- [ ] **Step 2: Create ChromeFrame**

```tsx
// src/components/layout/ChromeFrame.tsx
"use client";

import { ReactNode, useSyncExternalStore } from "react";
import { subscribeChrome, getChromeHidden } from "@/lib/three/chromeStore";

/** Fades the global navbar/footer out while the 3D hero owns the screen. */
export default function ChromeFrame({ children }: { children: ReactNode }) {
  const hidden = useSyncExternalStore(subscribeChrome, getChromeHidden, () => false);
  return (
    <div className={`transition-opacity duration-500 ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Wrap navbar/footer in layout**

Modify `src/app/layout.tsx` — import `ChromeFrame` and wrap `<Navbar />` and `<Footer />`:

```tsx
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChromeFrame from "@/components/layout/ChromeFrame";
```

```tsx
        <SmoothScroll>
          <ChromeFrame>
            <Navbar />
          </ChromeFrame>
          <main className="flex-grow flex flex-col">{children}</main>
          <ChromeFrame>
            <Footer />
          </ChromeFrame>
        </SmoothScroll>
```

- [ ] **Step 4: Drive the store from the hero scroll hook**

Modify `src/hooks/useScrollProgress.ts` — import the setter and update `onUpdate` + cleanup:

```tsx
import { scrollProgress } from "@/lib/three/scrollStore";
import { setChromeHidden } from "@/lib/three/chromeStore";
```

```tsx
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.value = self.progress;
        setChromeHidden(self.progress < 0.92);
      },
    });

    return () => {
      st.kill();
      setChromeHidden(false);
    };
```

- [ ] **Step 5: Slim the hero overlay (sr-only h1 + one floating CTA)**

```tsx
// src/components/three/HeroOverlay.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Tall scroll region driving the camera. Headline now lives in 3D (HeroText3D);
 *  the DOM keeps an sr-only h1 for semantics plus one floating CTA. */
export default function HeroOverlay() {
  return (
    <section id="hero-act" className="relative h-[300vh]">
      <h1 className="sr-only">
        Every Space. Every System. Every Day. Equator integrated facility management.
      </h1>
      <div className="sticky top-0 h-screen flex items-end justify-center pb-12 pointer-events-none">
        <Link
          href="/contact"
          className="pointer-events-auto inline-flex items-center gap-2 bg-white/90 text-equator-navy px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-2xl backdrop-blur"
        >
          Request a Proposal <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Verify typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: clean tsc; build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/lib/three/chromeStore.ts src/components/layout/ChromeFrame.tsx src/app/layout.tsx src/hooks/useScrollProgress.ts src/components/three/HeroOverlay.tsx
git commit -m "feat: chromeless 3D hero (hide navbar/footer until hero exits)"
```

---

## Task 12: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Unit tests**

Run: `npm test`
Expected: all suites pass (existing 33 + new city/pointer/cameraPath tests).

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: success, 12 static routes.

- [ ] **Step 4: Clean dev start (avoid the build→dev 404 gotcha)**

Run: `rm -rf .next` then `npm run dev`
Expected: `/` returns 200.

- [ ] **Step 5: Manual browser checklist (capable desktop, >=1024px, reduce-motion OFF, hard refresh)**

Confirm:
- City renders solid + lit with shadows (not wireframe).
- Scene moves while idle (dust drift, beacon pulse, accent twinkle).
- Moving the mouse subtly shifts the camera (parallax).
- Scrolling flies the camera through the city.
- Headline words float in 3D among the buildings and parallax with depth.
- Hero is chromeless; navbar/footer fade in after scrolling past the hero.
- No console errors; perf smooth.

- [ ] **Step 6: Fallback check**

Narrow the window < 1024px (or enable reduce-motion) and hard refresh.
Expected: the existing 2D site renders with normal navbar + footer + SEO text.

---

## Self-review notes (addressed)

- **Spec coverage:** city (T1/T5), lighting+shadows+fog (T9/T10), bloom (T9/T10), idle life (T6 + accent twinkle T5), cursor parallax (T2/T8), cinematic eased/banking camera (T3/T8), chromeless hero (T11), in-world floating text (T7). All spec sections map to a task.
- **Type consistency:** `cameraAt` returns `CameraFrame {position,target,roll}` (T3), consumed in T8. `generateCity`/`Building`/`CityParams` (T1) consumed in T5. `setChromeHidden`/`subscribeChrome`/`getChromeHidden` (T11 store) consumed by ChromeFrame + useScrollProgress (T11).
- **No placeholders:** every code step is complete and runnable.
