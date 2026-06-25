# Hero City v2 — Visual Depth + Storytelling Text Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Make the 3D hero city read as a designed, lit cityscape (not bare cubes) and turn the headline into scroll-driven storytelling — one beat at a time appearing in clear space and exiting.

**Architecture:** Same pipeline (gate, fallback, scroll bridge, canvas). Enrich `City.tsx` with windowed/varied buildings + a detailed procedural landmark + a textured city ground (procedural CanvasTextures). Rewrite `HeroText3D.tsx` for sequential scroll-tied reveal driven by a new pure `beatOpacity` helper. Light camera/lighting tuning.

**Tech Stack:** R3F v9, drei v10, three 0.180, @react-three/postprocessing, TS, vitest (for the one pure helper).

**Asset note:** No external `.glb` download (no reliable CC0 direct source). Landmark is procedural; the existing `HeroModel` `.glb` slot stays available for a user-supplied model later.

---

## File map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/three/storyText.ts` | create | Pure `beatOpacity(progress, start, end, fade)` → 0..1 |
| `src/lib/three/__tests__/storyText.test.ts` | create | Tests for `beatOpacity` |
| `src/components/three/textures.ts` | create | Client helpers: `makeWindowTexture()`, `makeGroundTexture()` (CanvasTexture) |
| `src/components/three/City.tsx` | rewrite | Windowed building kinds + setbacks + rooftop detail + procedural landmark + textured ground |
| `src/components/three/HeroText3D.tsx` | rewrite | Sequential scroll-driven reveal in clear sky space |
| `src/components/three/HeroScene.tsx` | modify | Light/exposure tuning to showcase depth (small) |
| `src/lib/three/cameraPath.ts` | modify | Retune keyframes so beats land in clear space (small) |

---

## Task 1: `beatOpacity` pure helper (TDD)

**Files:** Create `src/lib/three/storyText.ts`, Test `src/lib/three/__tests__/storyText.test.ts`

- [ ] **Step 1: Failing test**

```ts
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
    // start 0.3, fade 0.1 -> half-faded at 0.35
    expect(beatOpacity(0.35, 0.3, 0.6, 0.1)).toBeCloseTo(0.5, 5);
  });

  it("ramps down across the fade-out region", () => {
    // end 0.6, fade 0.1 -> half-faded at 0.55
    expect(beatOpacity(0.55, 0.3, 0.6, 0.1)).toBeCloseTo(0.5, 5);
  });

  it("clamps to [0,1]", () => {
    const v = beatOpacity(0.3, 0.3, 0.6, 0.1);
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThanOrEqual(1);
  });
});
```

- [ ] **Step 2:** `npm test -- storyText` → FAIL (module not found).

- [ ] **Step 3: Implement** `src/lib/three/storyText.ts`:

```ts
/** Opacity 0..1 for a story beat active across [start,end] of scroll progress,
 *  fading in over the first `fade` and out over the last `fade` of that window. */
export function beatOpacity(
  progress: number,
  start: number,
  end: number,
  fade: number,
): number {
  if (progress <= start || progress >= end) return 0;
  const inT = (progress - start) / fade;
  const outT = (end - progress) / fade;
  const v = Math.min(inT, outT, 1);
  return Math.max(0, Math.min(1, v));
}
```

- [ ] **Step 4:** `npm test -- storyText` → PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/three/storyText.ts src/lib/three/__tests__/storyText.test.ts
git commit -m "feat: beatOpacity helper for scroll-driven story text"
```

---

## Task 2: Procedural textures (window + ground)

**Files:** Create `src/components/three/textures.ts`

These run only client-side (inside the R3F canvas). No unit tests (canvas not in jsdom); verified by the build + manual render.

- [ ] **Step 1: Implement** `src/components/three/textures.ts`:

```ts
"use client";

import { CanvasTexture, RepeatWrapping, SRGBColorSpace, Texture } from "three";

/** Procedural facade: dark building skin with a grid of lit/unlit windows.
 *  Used as both map and emissiveMap so windows glow. */
export function makeWindowTexture(): Texture {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  // facade base
  ctx.fillStyle = "#11162b";
  ctx.fillRect(0, 0, c.width, c.height);
  const cols = 6;
  const rows = 14;
  const mx = 6;
  const my = 6;
  const cw = (c.width - mx * (cols + 1)) / cols;
  const ch = (c.height - my * (rows + 1)) / rows;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const lit = Math.random();
      // warm gold, cool blue, or dark window
      if (lit < 0.18) ctx.fillStyle = "#f2c14e";
      else if (lit < 0.5) ctx.fillStyle = "#6fa8dc";
      else ctx.fillStyle = "#0b1020";
      const x = mx + col * (cw + mx);
      const y = my + r * (ch + my);
      ctx.fillRect(x, y, cw, ch);
    }
  }
  const tex = new CanvasTexture(c);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

/** Procedural city ground: dark asphalt with a road grid + lane markings + noise. */
export function makeGroundTexture(): Texture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  // asphalt + subtle noise
  ctx.fillStyle = "#0c0e16";
  ctx.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 4000; i++) {
    const g = 12 + Math.floor(Math.random() * 18);
    ctx.fillStyle = `rgba(${g},${g},${g + 6},0.5)`;
    ctx.fillRect(Math.random() * c.width, Math.random() * c.height, 1, 1);
  }
  // road grid
  const cell = 128;
  ctx.strokeStyle = "#1b2ب5e".replace("ب", "2"); // navy lines
  ctx.lineWidth = 18;
  for (let p = 0; p <= c.width; p += cell) {
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, c.height);
    ctx.moveTo(0, p);
    ctx.lineTo(c.width, p);
    ctx.stroke();
  }
  // dashed lane markings
  ctx.strokeStyle = "rgba(201,168,76,0.5)";
  ctx.lineWidth = 2;
  ctx.setLineDash([14, 18]);
  for (let p = cell / 2; p <= c.width; p += cell) {
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, c.height);
    ctx.moveTo(0, p);
    ctx.lineTo(c.width, p);
    ctx.stroke();
  }
  const tex = new CanvasTexture(c);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.repeat.set(8, 8);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}
```

NOTE to implementer: the `"#1b2ب5e"` hack above is a typo guard — replace that whole line with a clean literal: `ctx.strokeStyle = "#1b2b5e";`. Do not ship the unicode placeholder.

- [ ] **Step 2:** `npx tsc --noEmit` → clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/three/textures.ts
git commit -m "feat: procedural window + city-ground textures"
```

---

## Task 3: Rewrite City with windows, variety, landmark, textured ground

**Files:** Rewrite `src/components/three/City.tsx`

- [ ] **Step 1: Implement** — replace entire file:

```tsx
"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D, Color, MeshStandardMaterial, Texture } from "three";
import { generateCity } from "@/lib/three/city";
import { BRAND, BUILDING, GROUND } from "@/lib/three/materials";
import { makeWindowTexture, makeGroundTexture } from "./textures";

const CITY = generateCity({ seed: 1337, count: 80, spread: 30, minH: 2, maxH: 18 });
const BASE = CITY.filter((b) => !b.accent);
const ACCENTS = CITY.filter((b) => b.accent);
const dummy = new Object3D();

/** Emissive accent tower that twinkles. */
function AccentTower({ idx, x, z, w, d, h, tex }: { idx: number; x: number; z: number; w: number; d: number; h: number; tex: Texture }) {
  const mat = useRef<MeshStandardMaterial>(null!);
  useFrame(({ clock }) => {
    mat.current.emissiveIntensity = 0.7 + Math.sin(clock.elapsedTime * 1.5 + idx) * 0.4;
  });
  const color = idx % 2 ? BRAND.gold : BRAND.sky;
  return (
    <mesh position={[x, h / 2, z]} scale={[w, h, d]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={0.9} toneMapped={false} />
    </mesh>
  );
}

/** Detailed procedural landmark: tiered tower + crown + spire, with lit windows. */
function Landmark({ tex }: { tex: Texture }) {
  return (
    <group position={[0, 0, -6]}>
      <mesh position={[0, 11, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 22, 6]} />
        <meshStandardMaterial color={BUILDING.base} map={tex} emissiveMap={tex} emissive={"#ffffff"} emissiveIntensity={0.9} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 25, 0]} castShadow>
        <boxGeometry args={[4, 8, 4]} />
        <meshStandardMaterial color={BUILDING.baseAlt} map={tex} emissiveMap={tex} emissive={"#ffffff"} emissiveIntensity={0.9} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 31, 0]} castShadow>
        <boxGeometry args={[2.2, 5, 2.2]} />
        <meshStandardMaterial color={BRAND.silver} roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 35.5, 0]}>
        <cylinderGeometry args={[0.08, 0.25, 4, 8]} />
        <meshStandardMaterial color={BRAND.gold} emissive={BRAND.gold} emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Procedural lit city: windowed instanced buildings + rooftops + landmark + textured ground. */
export default function City() {
  const ref = useRef<InstancedMesh>(null!);
  const roofRef = useRef<InstancedMesh>(null!);
  const windowTex = useMemo(() => makeWindowTexture(), []);
  const groundTex = useMemo(() => makeGroundTexture(), []);

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

    // rooftop detail box on the taller half of the buildings
    const roof = roofRef.current;
    BASE.forEach((b, i) => {
      const tall = b.h > 9;
      dummy.position.set(b.x, tall ? b.h + 0.6 : -100, b.z);
      dummy.scale.set(tall ? 0.5 : 0.0001, tall ? 1.4 : 0.0001, tall ? 0.5 : 0.0001);
      dummy.updateMatrix();
      roof.setMatrixAt(i, dummy.matrix);
    });
    roof.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color={GROUND} map={groundTex} roughness={0.85} metalness={0.1} />
      </mesh>

      <instancedMesh ref={ref} args={[undefined, undefined, BASE.length]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial map={windowTex} emissiveMap={windowTex} emissive={"#ffffff"} emissiveIntensity={0.8} roughness={0.6} metalness={0.15} />
      </instancedMesh>

      <instancedMesh ref={roofRef} args={[undefined, undefined, BASE.length]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={BUILDING.baseAlt} roughness={0.7} />
      </instancedMesh>

      <Landmark tex={windowTex} />

      {ACCENTS.map((b, i) => (
        <AccentTower key={i} idx={i} x={b.x} z={b.z} w={b.w} d={b.d} h={b.h} tex={windowTex} />
      ))}
    </group>
  );
}
```

NOTE: `AccentTower` receives `tex` prop for signature stability but may not use it — if tsc flags the unused prop, drop the prop from `AccentTower` and its call site (do NOT pass an unused prop just to satisfy the diff). Keep it only if used.

- [ ] **Step 2:** `npx tsc --noEmit` → clean. Then `npm run build` → succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/three/City.tsx
git commit -m "feat: windowed varied buildings, rooftops, landmark, textured ground"
```

---

## Task 4: Sequential storytelling text

**Files:** Rewrite `src/components/three/HeroText3D.tsx`

- [ ] **Step 1: Implement** — replace entire file:

```tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Group } from "three";
import { scrollProgress } from "@/lib/three/scrollStore";
import { beatOpacity } from "@/lib/three/storyText";

/** Headline beats revealed one at a time in clear sky space as the camera flies.
 *  pos placed high/open so they don't overlap the skyline. */
const BEATS: { text: string; pos: [number, number, number]; cls: string; start: number; end: number }[] = [
  { text: "Every Space.", pos: [0, 16, -4], cls: "text-white", start: 0.02, end: 0.36 },
  { text: "Every System.", pos: [0, 14, -14], cls: "text-equator-silver", start: 0.34, end: 0.68 },
  { text: "Every Day.", pos: [0, 12, -26], cls: "text-equator-sky", start: 0.66, end: 0.98 },
];

const FADE = 0.08;

function Beat({ text, pos, cls, start, end }: (typeof BEATS)[number]) {
  const g = useRef<Group>(null!);
  const el = useRef<HTMLDivElement>(null!);
  useFrame(() => {
    const o = beatOpacity(scrollProgress.value, start, end, FADE);
    if (el.current) {
      el.current.style.opacity = String(o);
      el.current.style.transform = `translateY(${(1 - o) * 18}px)`;
    }
    if (g.current) g.current.visible = o > 0.001;
  });
  return (
    <group ref={g} position={pos}>
      <Html transform distanceFactor={16} zIndexRange={[0, 0]} pointerEvents="none">
        <div
          ref={el}
          aria-hidden="true"
          className={`font-display text-7xl whitespace-nowrap select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] ${cls}`}
          style={{ pointerEvents: "none", opacity: 0, transition: "opacity 0.1s linear" }}
        >
          {text}
        </div>
      </Html>
    </group>
  );
}

export default function HeroText3D() {
  return (
    <>
      {BEATS.map((b, i) => (
        <Beat key={i} {...b} />
      ))}
    </>
  );
}
```

NOTE: if the drei `<Html>` `pointerEvents` prop type errors, remove that prop (the inner div already sets `pointerEvents: "none"`). Keep `transform` and `distanceFactor`.

- [ ] **Step 2:** `npx tsc --noEmit` → clean. `npm run build` → succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/three/HeroText3D.tsx
git commit -m "feat: sequential scroll-driven story text in clear space"
```

---

## Task 5: Showcase tuning (lighting + camera)

**Files:** Modify `src/components/three/HeroScene.tsx`, `src/lib/three/cameraPath.ts`

- [ ] **Step 1:** In `HeroScene.tsx`, raise the fill so windows/depth read. Change the `ambientLight` intensity from `0.25` to `0.35`, and the `Bloom` `intensity` from `0.6` to `0.8` and `luminanceThreshold` from `0.6` to `0.5` (windows glow). Keep everything else.

- [ ] **Step 2:** In `cameraPath.ts`, widen the path so the camera surveys the skyline (beats sit above it). Replace the `KEYFRAMES` array with:

```ts
const KEYFRAMES: Keyframe[] = [
  { position: [0, 20, 46], target: [0, 12, 0], roll: 0 },
  { position: [20, 13, 20], target: [0, 10, -8], roll: 0.04 },
  { position: [-10, 9, 6], target: [0, 11, -20], roll: -0.03 },
  { position: [0, 8, -8], target: [0, 12, -34], roll: 0 },
];
```

- [ ] **Step 3:** `npx tsc --noEmit` → clean. `npm run build` → succeeds. Re-run `npm test` (the cameraPath tests assert roll behavior, not exact positions, so they still pass — confirm).

- [ ] **Step 4: Commit**

```bash
git add src/components/three/HeroScene.tsx src/lib/three/cameraPath.ts
git commit -m "feat: tune lighting, bloom, and camera path to showcase the city"
```

---

## Task 6: Verification

- [ ] `npm test` → all pass (incl. new storyText, existing cameraPath).
- [ ] `npx tsc --noEmit` → clean.
- [ ] `npm run build` → 10 routes.
- [ ] `rm -rf .next` (avoid build→dev 404), then manual browser pass: buildings show lit windows + variety + rooftops + a tall landmark; ground shows street texture; each headline beat fades in alone in open space and exits on scroll (no overlap); no console errors.

---

## Self-review notes
- Decisions covered: windowed/varied buildings (T3), landmark (T3), textured ground (T2/T3), sequential text in clear space (T1/T4), showcase tuning (T5). Model = procedural landmark (no reliable CC0 source); `.glb` slot remains for user.
- Type consistency: `beatOpacity(progress,start,end,fade)` (T1) used in T4. `makeWindowTexture`/`makeGroundTexture` (T2) used in T3.
