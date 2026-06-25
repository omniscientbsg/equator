# Design Spec — "Rich Hero City": Cinematic 3D Hero Enrichment (Phase 1.5)

**Date:** 2026-06-25
**Scope:** Home page (`/`) hero act only. Enrich the existing Phase-1 3D hero from an austere wireframe tower into a rich, alive, cinematic city scene. Reuses the entire Phase-1 pipeline (capability gate, 2D fallback, scroll→camera bridge, dynamic SSR-false canvas) unchanged.
**Status:** Approved design, pending user review of this written spec.

---

## 1. Problem

The Phase-1 3D hero renders and the scroll-driven camera works, but it does **not** feel like the Bruno-Simon-class immersive experience the client wants. Diagnosed root causes (user confirmed they DO see the 3D, so this is a feel problem, not a gate problem):

1. **Austere** — wireframe tower + bare grid reads as a corporate motion-graphic, not a world.
2. **Frozen** — nothing moves until you scroll; no ambient life.
3. **Unresponsive** — no cursor interaction.
4. **Thin** — a single tower, low density, no depth/atmosphere.
5. **Flat lighting** — no shadows, no atmosphere, no bloom.
6. **Chrome over cinema** — global navbar/footer sit over the hero, breaking immersion.
7. **Text on top, not in-world** — the headline is a flat HTML overlay pinned above the canvas instead of text living among the 3D elements.

## 2. Direction (locked in brainstorming)

- **Feel:** "Rich cinematic, not toy." Keep the brand-serious palette; make the 3D **alive, lit, dense, responsive**. Premium award-site immersion, not a playful game world.
- **World:** Stylized **city / campus** — a cluster of solid low-poly buildings the camera glides through. On-theme for facility management.
- **Scope:** Enrich the **hero act only** now as a proven pattern. Converting later sections into city "districts" is a future incremental pass (out of scope here).
- **Assets:** Procedural-first. Generate the city in code; keep the existing swappable `.glb` hero-model slot for one optional landmark. No required asset downloads.

### Non-goals (this phase)
- Not a drivable/free-roam world; the journey stays scroll-guided (+ subtle cursor parallax).
- Not converting StatsBar/Services/etc. into 3D (future pass).
- No playful toy materials, sound, or easter eggs.
- No color/copy changes to existing content.
- No required external 3D asset (procedural city; `.glb` slot stays optional).

### Success criteria
- On a capable desktop, the hero reads as a **living lit city**: solid buildings with shadows, depth fog, ambient motion when idle, cursor parallax, and headline text floating **in 3D space among the buildings**.
- The hero is **chromeless** (no navbar/footer over it); nav/footer appear for the rest of the page.
- Scrolling still flies the camera cinematically through the city via the existing scroll-progress bridge.
- 2D fallback (mobile / no-WebGL / reduced-motion / crawlers) is unchanged and still carries full SEO/nav/footer.
- 60fps target on a mid desktop GPU; no jank; graceful WebGL-context-loss fallback.

---

## 3. What changes vs. Phase 1

Pipeline is reused as-is. Only the scene content, camera feel, and hero chrome/text change.

| Area | Phase 1 (now) | Phase 1.5 (this spec) |
|------|---------------|------------------------|
| World | 1 wireframe tower + gridHelper | Procedural cluster of ~40–80 solid low-poly buildings on a ground plane via `InstancedMesh` |
| Materials | Wireframe | Solid brand-lit standard materials + emissive window specks + a few gold/sky accent towers |
| Lighting | Basic lights + env | Key directional + soft shadow map, low ambient, brand hemisphere, depth fog, subtle bloom on accents |
| Idle motion | None (frozen) | Drifting fog/cloud layer, gentle ambient camera bob, twinkling windows, slow beacon lights |
| Cursor | None | Subtle camera parallax toward pointer, layered on top of the scroll path |
| Camera | Linear lerp at one object | Eased cinematic path flying between/over buildings, slight bank/roll through turns |
| Hero chrome | Global navbar/footer over hero | **Chromeless** hero; nav/footer revealed after hero exits |
| Hero text | Flat HTML overlay pinned over canvas | **In-world 3D text** (drei `<Text>`) placed among buildings, parallaxing with camera; SR-only DOM copy for a11y/SEO |

---

## 4. Architecture (reuse + targeted additions)

Unchanged Phase-1 units: `ExperienceGate`, `Experience` (canvas, dynamic ssr:false), `Loader`, `HeroModel` (optional `.glb` slot), `capability.ts`, `useScrollProgress`, `scrollStore`, `scrollRange`, the 2D fallback stack.

### 4.1 New / changed units

| File | Change | Responsibility |
|------|--------|----------------|
| `src/lib/three/city.ts` | **new** (pure) | Deterministic city layout generator: returns an array of building instances `{position, size, type}` from a seed + params (count, spread, height range). Unit-tested. |
| `src/lib/three/materials.ts` | extend | Add solid building materials, emissive window/accent material constants. Keep existing `BRAND` colors. |
| `src/lib/three/cameraPath.ts` | extend | Add easing + a `roll`/up-vector term per keyframe; keep pure `cameraAt(progress)` signature, add banking output. Unit-tested. |
| `src/lib/three/pointer.ts` | **new** (pure) | `parallaxOffset(pointerX, pointerY, strength)` → small camera position offset. Unit-tested. |
| `src/components/three/City.tsx` | **new** | Renders the `InstancedMesh` city from `city.ts` layout; window emissive specks; ground plane; receives shadows. |
| `src/components/three/Atmosphere.tsx` | **new** | Fog config, drifting cloud/fog layer, beacon lights, twinkle driver (idle animation via `useFrame` + clock). |
| `src/components/three/HeroText3D.tsx` | **new** | drei `<Text>` words placed at world coords among the city; parallax/reveal keyed to scroll progress. Renders SR-only DOM copy of the headline for a11y/SEO. |
| `src/components/three/CameraRig.tsx` | change | Reads scroll progress (existing) + pointer; composes `cameraAt(progress)` with `parallaxOffset` + idle bob; applies bank/roll. |
| `src/components/three/HeroScene.tsx` | rewrite | Compose `<City>` + `<Atmosphere>` + `<HeroText3D>` + lights/shadows + optional `<HeroModel>` landmark. Replaces wireframe tower + gridHelper. |
| `src/components/three/Experience.tsx` | small change | Enable `shadows` on `<Canvas>`; add bloom post-processing (drei/`@react-three/postprocessing` if added) or a cheap emissive fake if we avoid the dep. |
| `src/components/three/HeroOverlay.tsx` | change | Drop the flat pinned headline (moves into `HeroText3D`). Keep the scroll-height spacer and ONE minimal floating HTML CTA button (`pointer-events-auto`) for accessibility/click reliability — kept HTML, not in-world, but small and corner-anchored, not a pinned hero block. |
| Hero chrome | change | Global `Navbar`/`Footer` stay in the DOM (a11y/SEO) but are visually hidden (opacity/translate, `aria-hidden` off) while the hero is on screen, then fade/slide in once `scrollProgress` shows the hero has exited. Toggle driven by the existing scroll progress value. 2D fallback keeps normal always-visible chrome. |

### 4.2 Dependency decision (bloom)
Bloom meaningfully sells the "lit" feel. Options:
- **Add `@react-three/postprocessing`** (R3F v9 compatible) for real bloom. Small, well-supported. **Recommended.**
- Avoid the dep and fake glow with large emissive sprites/additive planes. Cheaper but worse.

Recommend adding `@react-three/postprocessing`, gated so it never touches the 2D fallback or SSR. Confirm during planning that the version matches R3F v9 / three 0.180.

---

## 5. Data flow (additions to Phase 1)

1. Existing: Lenis → ScrollTrigger → `scrollProgress.value` (0..1 over hero range).
2. New: a pointer store (module-level mutable, like `scrollStore`) updated on `pointermove` (throttled), read in `useFrame` — no React re-renders.
3. `CameraRig.useFrame`: `base = cameraAt(progress)`; `final = base + parallaxOffset(pointer) + idleBob(clock)`; lerp camera toward `final`; apply bank/roll.
4. `City`/`Atmosphere`/`HeroText3D` read `progress` and/or `clock` for reveal + idle animation.
5. Chrome visibility derives from `progress` (hero exited → show nav/footer).

---

## 6. Accessibility, SEO, performance

- **A11y/SEO:** in-world 3D text is not in the DOM, so `HeroText3D` renders a visually-hidden DOM copy of the headline. The 2D fallback already carries all SEO content, nav, and footer, so crawlers/no-JS are unaffected.
- **Chromeless hero** only applies to the 3D path; the 2D fallback keeps standard navbar/footer.
- **Perf:** `InstancedMesh` for all buildings (one draw call class); DPR cap `[1,2]`; soft-shadow map sized modestly; bloom kept subtle; fog reduces overdraw; pause/idle frameloop only if feasible (scroll + idle animation need continuous loop). Dispose geometry/materials/instances on unmount. WebGL context loss → fall back to 2D.
- **Determinism:** city layout from a fixed seed so it's stable across renders/tests.

---

## 7. Testing & verification

- **Unit (vitest):** `city.ts` (count/bounds/determinism for a seed), `cameraPath.ts` (easing + bank output, clamping), `pointer.ts` (offset scaling/clamp). Pure functions only.
- **Manual (dev browser, capable desktop):** city renders lit with shadows; idle motion visible without scrolling; cursor moves camera subtly; scroll flies camera through city; headline text floats in-world and reveals with camera; hero is chromeless, nav/footer appear after hero; no console errors; perf acceptable.
- **Fallback check:** narrow viewport / reduced-motion → unchanged 2D site with nav + footer + SEO text.

---

## 8. Out of scope (future passes)

- Converting StatsBar / ServicesGrid / WhyEquator / ClientLogos / FeaturedProject / ContactCTA into 3D city "districts" (whole-page journey).
- Bespoke/commissioned building models; sound; easter eggs; drivable/free-roam world.
- These get their own spec + plan when the hero pattern is approved.
