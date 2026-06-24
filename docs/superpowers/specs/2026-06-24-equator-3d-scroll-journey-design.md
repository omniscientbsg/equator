# Design Spec — "Equator 3D": Scroll-Driven Industrial Journey (Phase 1 vertical slice)

**Date:** 2026-06-24
**Scope:** Home page (`/`) — Phase 1 vertical slice only: the hero act as a 3D scene + the full 3D pipeline + capability gate + 2D fallback. Converting the remaining acts to 3D is Phase 2 (separate spec).
**Status:** Approved design, pending spec review.

---

## 1. Goal

Replace the static-feeling 2D home page with an **immersive, scroll-driven 3D experience** (WebGL via React Three Fiber) in the spirit of award-style 3D sites — adapted for a B2B facility-management company. A fixed full-screen 3D scene sits behind the page; scrolling drives the camera through an industrial world while HTML content scrolls over it. Phase 1 proves the entire pipeline on a single act (the hero) and ships a robust non-3D fallback.

### Non-goals (Phase 1)
- Not a free-roam drivable world (no physics/vehicle/avatar). The journey is scroll-guided.
- Not the whole homepage in 3D — only the hero act. Remaining acts stay 2D this phase.
- No bespoke/commissioned 3D assets. A swappable CC0 placeholder model is used.
- No color/copy changes to existing content.

### Success criteria
- On a capable desktop: scrolling the hero range moves a 3D camera through a procedural industrial scene with a loaded hero model; HTML headline pins then exits; 60fps target, no jank.
- On mobile / no-WebGL / reduced-motion / crawlers: the existing 2D scroll site renders instead, fully usable, with all SEO text in the DOM.
- The 3D canvas never runs on the server and never blocks SSR.

---

## 2. Decisions locked in brainstorming

- **Interaction model:** scroll-driven 3D journey (camera flies through 3D scenes as you scroll; content is linear and findable).
- **Assets:** hybrid — procedural base geometry built in code + a few swappable hero-model "slots" loading CC0 `.glb` placeholders now.
- **Scope/rollout:** vertical slice first (one act end-to-end), then roll out remaining acts in Phase 2.
- **Fallback:** the existing 2D scroll site (Lenis + ScrollTrigger + DataScrub + HorizontalActs + ColorWash) is the automatic fallback for non-3D contexts. Nothing from the prior build is discarded — the scroll engine becomes the camera driver, and the 2D acts become the fallback experience.

---

## 3. Architecture

### 3.1 Layering

```
<ExperienceGate>                      (client; decides 3D vs 2D)
  ├─ if capable:
  │    <Experience />  ──────────────  fixed full-screen <Canvas> (z-behind), dynamic ssr:false
  │    <HeroOverlay />  ─────────────  transparent HTML hero (headline/CTA) scrolling above canvas
  │    <RestOfPage2D />  ────────────  existing 2D sections below the hero act (unchanged this phase)
  └─ else:
       <TwoDExperience />  ───────────  existing <ColorWash> 2D home (current build) = fallback
```

- The `<Canvas>` is `position: fixed; inset: 0` behind content (`-z-10`), so it stays put while the HTML document scrolls over it. The **HTML owns the scroll height** (the document is as tall as its content), keeping native scroll, accessibility, and SEO intact.
- The canvas component is imported with `next/dynamic(() => import('./Experience'), { ssr: false })` and wrapped in `Suspense`. It never renders on the server.

### 3.2 Scroll → camera bridge (reuses existing engine)

- The existing Lenis instance (`useLenis`) + ScrollTrigger remain the scroll source of truth.
- A `useScrollProgress` hook exposes the current normalized scroll progress (0..1 across the hero act range) via a **mutable ref** (not React state — avoids per-frame re-renders).
- `CameraRig` (inside the R3F tree) reads that ref every frame in `useFrame` and interpolates the camera position + look-at target along a predefined path. Scene element animations (building assembly, grid reveal) are keyed off the same progress value.
- One scroll value drives both the HTML (native document scroll) and the 3D camera — a single timeline.

### 3.3 Capability gate

`lib/three/capability.ts` (pure, SSR-safe) exposes `canRender3D(): boolean`:
- WebGL available (test-create a context), AND
- not `prefers-reduced-motion: reduce`, AND
- viewport width ≥ `MIN_3D_WIDTH` (default 1024).

`ExperienceGate` is a client component that calls this on mount (after hydration, to avoid SSR/client mismatch — initial render is the 2D fallback, then it upgrades to 3D if capable). This guarantees crawlers and no-JS get the 2D content.

---

## 4. Phase 1 scene (hero act)

**Procedural base (built in code, no assets):**
- Extruded "floorplan" shapes that rise/assemble into a low-poly / wireframe tower as the act progresses.
- A blueprint grid plane in 3D space (brand navy lines on charcoal), subtle pulse.
- Brand lighting: charcoal/navy environment, blue (#2547A1) + gold (#C9A84C) edge/accent lights.

**Hybrid hero model slot:**
- `HeroModel` loads a swappable CC0 `.glb` (e.g. a warehouse/building from a CC0 source such as Quaternius/Poly Haven/Sketchfab-CC0), draco-compressed, placed at a key point in the scene. The file lives at `public/models/hero-placeholder.glb`. A clear comment marks it as the swap point for client-supplied assets.

**Camera motion:**
- As the hero scroll range progresses, the camera pushes through/around the structure (path defined as keyframed position + target points, interpolated by scroll progress).
- The HTML hero headline/CTA (overlay) pins, then translates/fades out on exit — reusing the existing hero overlay content/copy.

**Below the hero act:** the current 2D sections (StatsBar, ServicesGrid, WhyEquator, ClientLogos, FeaturedProject, ContactCTA) render as-is this phase, so the page is complete. Phase 2 converts them into 3D scenes.

---

## 5. Components & responsibilities

| File | Responsibility |
|------|----------------|
| `src/components/three/ExperienceGate.tsx` | Client. Runs capability check post-hydration; renders 3D stack or 2D fallback. |
| `src/components/three/Experience.tsx` | The dynamic `<Canvas>` (dpr cap, frameloop), scene graph root, `<Suspense>` + `<Loader>`. |
| `src/components/three/HeroScene.tsx` | Phase 1 scene: procedural building + grid + `<HeroModel>` + lights. |
| `src/components/three/CameraRig.tsx` | Reads scroll-progress ref; drives camera in `useFrame` along the path. |
| `src/components/three/HeroModel.tsx` | Loads placeholder `.glb` via drei `useGLTF` + draco; Suspense child. |
| `src/components/three/Loader.tsx` | drei `<Html>`/`useProgress` asset loading indicator. |
| `src/components/three/HeroOverlay.tsx` | Transparent HTML hero (headline/CTA) over the canvas. |
| `src/lib/three/geometry.ts` | Pure builders for procedural geometry (building floors, grid). |
| `src/lib/three/materials.ts` | Brand colors/materials constants for the scene. |
| `src/lib/three/capability.ts` | Pure WebGL/reduced-motion/viewport detection (`canRender3D`). |
| `src/lib/three/cameraPath.ts` | Pure: interpolate camera position+target from progress 0..1. |
| `src/hooks/useScrollProgress.ts` | Bridges Lenis/ScrollTrigger global scroll → progress ref for the hero range. |
| `public/models/hero-placeholder.glb` | Swappable CC0 hero model. |
| `src/app/page.tsx` | Renders `<ExperienceGate>`. |

Each unit has one clear job and a typed interface, understandable in isolation.

---

## 6. Data flow

1. `useLenis` drives Lenis raf; ScrollTrigger updates from Lenis (existing engine).
2. `useScrollProgress` maps document scroll position within the hero range → `progressRef.current` (0..1).
3. `CameraRig.useFrame` reads `progressRef.current`, calls `cameraPath(progress)` → sets `camera.position` + look-at.
4. Scene elements (building assembly, grid) read the same progress for their reveal animation.
5. HTML overlay scrolls naturally with the document (same scroll).
6. On unmount / context loss: dispose geometries/materials, kill ScrollTriggers, swap to 2D on context loss.

---

## 7. Performance, error handling, edge cases

- **DPR cap** `[1, 2]`; **frameloop**: continuous while in view (scroll-driven needs it), pause when canvas off-screen if feasible.
- **Assets:** draco-compressed `.glb`, LOD or low-poly placeholder; preload via drei; Suspense `<Loader>` shows progress.
- **Dispose** geometries/materials/textures on unmount; `useGLTF` cache cleared appropriately.
- **WebGL context loss:** listener on the canvas → fall back to 2D experience and surface nothing scary to the user.
- **SSR:** canvas is `ssr:false` + client-only capability check; initial paint is the 2D fallback, upgraded after hydration → no hydration mismatch, crawlers get 2D content.
- **Reduced motion / mobile / no-WebGL:** `canRender3D` returns false → 2D site.

---

## 8. Testing & verification

- **Unit-tested (vitest, already configured):** `capability.ts` (`canRender3D` branch logic with stubbed `matchMedia`/WebGL/innerWidth), `cameraPath.ts` (progress→position interpolation, clamping), `useScrollProgress` range mapping (pure mapping function extracted for testing).
- **Manual (dev server):** 3D scene renders, scroll moves camera, model loads, overlay pins/exits, fallback triggers on reduced-motion/narrow viewport, no console/context errors, perf acceptable.

---

## 9. Dependencies & constraints

- **Add:** `three`, `@react-three/fiber` (v9 — React 19 compatible), `@react-three/drei` (v10). Reuse existing `gsap`, `lenis`, vitest.
- **`AGENTS.md`:** Next.js 16.2.9 has breaking changes vs training data — check `node_modules/next/dist/docs/` (dynamic import / client components / `next.config.ts`) before wiring the canvas. R3F `<Canvas>` must live in a `"use client"` component loaded with `ssr:false`.
- **Model licensing:** placeholder `.glb` must be CC0/permissive; document its source in a comment + this spec. Swappable for client assets.
- **Reuse, don't discard:** the prior 2D scroll build (engine + acts) is the fallback and the camera driver. No removal of that work in Phase 1.

---

## 10. Out of scope (Phase 2 — separate spec)

Converting StatsBar / ServicesGrid / WhyEquator / ClientLogos / FeaturedProject / ContactCTA into 3D scenes within the same canvas journey; richer hero/world models; sound; advanced post-processing. Phase 2 gets its own spec + plan.
