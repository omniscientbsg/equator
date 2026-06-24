# Design Spec — "The Equator Reel": Cinematic Scroll System (Home)

**Date:** 2026-06-24
**Scope:** Home page (`/`) only. Phase 2 (other pages) is explicitly out of scope for this spec.
**Status:** Approved design, pending spec review.

---

## 1. Goal

Transform the Home page from a standard sectioned corporate layout into one continuous, immersive **scroll-driven cinematic story**. Content stays finite, but pinned acts and scroll-scrubbed motion make the page feel immersive and "endless." Keep the existing color theme and corporate/industrial vibe exactly — this is a motion/presentation layer, not a redesign of colors or content.

### Non-goals
- No color palette changes (existing `--equator-*` tokens stay).
- No copy/content rewrites.
- No literal infinite-loading or looping feed.
- No other pages (about, services, clients, projects, contact) — Phase 2, separate spec.

---

## 2. Concept — "The Equator Reel"

The Home page reads as one industrial story told in **acts**. Sections pin while layered content moves at different depths; key data scrubs with scroll position like a control-room readout; the services beat pivots into a horizontal track. Seamless color washes between acts remove hard section "ends," producing the immersive/endless feel the client asked for.

Three motifs drive it, applied per-act as needed:
- **M2 — Pinning + parallax depth**
- **M3 — Counter/data scrub** (industrial dashboard feel)
- **M4 — Horizontal pivot acts** (chapter feel)

The existing blueprint grid stays as an ambient layer (it may recede/parallax) but is not a required draw-on animation.

---

## 3. Architecture

### 3.1 Scroll engine (foundation — built first)

The engine is the backbone; every act depends on it.

- **Lenis smooth scroll.** `src/components/layout/SmoothScroll.tsx` is currently a no-op passthrough. Wire Lenis (already in deps) to provide inertia-based smooth scroll. Initialize in a client effect; clean up on unmount.
- **GSAP ScrollTrigger ↔ Lenis sync.** One scroll source of truth:
  - `lenis.on('scroll', ScrollTrigger.update)`
  - Drive `lenis.raf(time)` from the GSAP ticker; `gsap.ticker.lagSmoothing(0)`.
  - Register `ScrollTrigger` client-side only (guard for SSR — Next 16 App Router).
- **Reduced-motion guard.** If `prefers-reduced-motion: reduce`, skip Lenis pinning/scrub/horizontal entirely and fall back to plain CSS/opacity fade-ins. Required by brief §11.

### 3.2 Reusable scroll primitives

New directory `src/components/scroll/`. Each primitive has one clear job, a typed props interface, and can be understood/tested in isolation. These are written to be reused by Phase 2 later, but only Home consumes them now.

| Primitive | Purpose | Key props |
|-----------|---------|-----------|
| `PinnedAct` | Pins a section for a scroll distance while children animate | `pinDuration`, `id`, children, optional `onProgress` |
| `ParallaxLayer` | Moves a layer at a depth-relative speed within its scroll range | `speed`/`depth`, `axis` |
| `DataScrub` | Maps scroll progress → numeric value(s); renders via render-prop/children | `from`, `to`, `format` |
| `HorizontalActs` | Pins, converts vertical scroll into horizontal track movement, returns to vertical | `items`/children, `gap` |

Shared logic (ScrollTrigger creation, reduced-motion check, cleanup helpers) lives in `src/lib/animations.ts`. Lenis setup lives in `src/hooks/useLenis.ts`.

### 3.3 Home composition (acts)

Home is recomposed as ordered acts. Existing section components (`Hero`, `StatsBar`, `ServicesGrid`, `WhyEquator`, `ClientLogos`, `FeaturedProject`, `ContactCTA`) are refactored to consume the primitives. Content and colors are preserved.

| Act | Section(s) | Motif | Color (existing tokens) |
|-----|-----------|-------|--------------------------|
| 1 | Hero | M2 — pin; blueprint grid recedes; eyebrow/headline/subhead/CTA rise at staggered parallax rates | charcoal |
| 2 | StatsBar | M3 — values scrub 0→target tied to scroll; JetBrains-mono readouts tick like a control panel | navy |
| 3 | ServicesGrid | M4 — pin, scroll pivots horizontal across the 3 service cards as chapters, returns to vertical | silver |
| 4 | WhyEquator | M2 — pin; the 4 points reveal in layered depth | silver → light |
| 5 | ClientLogos → FeaturedProject → ContactCTA | M2 — parallax marquee + full-bleed parallax; **color wash** into the existing gradient finish | light → navy/blue |

**Color washes** between acts (e.g. charcoal→navy→silver) are driven by scroll progress so sections bleed into each other with no hard cut — this is what sells the "no ends / immersive" feel.

---

## 4. Data flow

1. `SmoothScroll` mounts Lenis → emits scroll position each frame.
2. GSAP ticker drives `lenis.raf`; `lenis.on('scroll')` calls `ScrollTrigger.update`.
3. Each act's `ScrollTrigger` (via a primitive) reads progress and drives:
   - pin state (`PinnedAct`),
   - transform/opacity of layers (`ParallaxLayer`),
   - interpolated numbers (`DataScrub`),
   - horizontal offset (`HorizontalActs`),
   - background color interpolation (color wash).
4. On unmount/route-change, all ScrollTriggers and the Lenis instance are killed/destroyed to prevent leaks.

---

## 5. Error handling & edge cases

- **Reduced motion:** full static fallback (fades only, no pin/scrub/horizontal, no Lenis hijack).
- **Mobile `<768px`:** pinning + horizontal pivot are janky on touch → disable horizontal pivot (service cards stack vertically), soften parallax magnitude, keep data scrub. Native scroll retained where Lenis feels wrong on touch (decide during impl).
- **SSR/hydration:** ScrollTrigger and Lenis are client-only; guard against `window` access during SSR.
- **Layout shift:** pins must reserve space (no CLS); verify against brief CLS < 0.1 target.
- **Route change:** Next App Router client nav must tear down and re-init engine cleanly.

---

## 6. Testing & verification

Scroll-driven motion is not meaningfully unit-testable. Verification is manual + measured:

- Run app (`/run`), scroll Home top→bottom: acts pin, scrub, pivot, and color-wash as specified.
- Toggle OS reduced-motion → confirm static fallback, no hijacked scroll.
- Mobile viewport → horizontal pivot disabled, cards stack, no jank.
- No console errors on route enter/leave (clean teardown).
- Lighthouse: Performance ≥ 90, CLS < 0.1 (brief §10).

---

## 7. Implementation constraints

- **`AGENTS.md`:** this Next.js (16.2.9) has breaking changes vs training data. Read relevant guides in `node_modules/next/dist/docs/` before writing engine/layout code; heed deprecation notices.
- Reuse existing deps: `lenis`, `gsap`, `framer-motion`, `react-countup` are already installed. Prefer GSAP ScrollTrigger for pin/scrub/horizontal; `react-countup` may be replaced by `DataScrub` for scroll-tied counting.
- No new heavy deps without justification.

---

## 8. Out of scope (Phase 2 — not this spec)

Applying the same primitives to `/about`, `/services` (+ sub-pages), `/clients`, `/projects`, `/contact`. The primitives are designed for reuse, but Phase 2 gets its own spec and plan.
