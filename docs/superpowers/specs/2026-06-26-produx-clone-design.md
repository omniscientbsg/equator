# produx.design Faithful Clone — Design Spec

**Date:** 2026-06-26
**Goal:** Make `forma-studio.html` a faithful, section-by-section replication of the produx.design homepage. Later, content gets swapped to Equator's. This spec covers the produx-faithful clone only.

## Approach (chosen: A — rebuild in place)

Keep the existing proven scroll/reveal/CSS engine in `forma-studio.html`. Replace the invented parts, add the missing sections, load real produx content. Output stays a single self-contained HTML file (HTML-first; ports to Next.js later).

## Source of truth

Live WebFetch of https://www.produx.design/ (captured 2026-06-26). Scraped assets live in `public/produx/www.produx.design/`.

## Section order (top → bottom)

1. **Nav** — links: Work, Studio, Journal, Contact. Brand: PRØDUX wordmark + tagline "Design that Speaks". CTA: "Let's talk".
2. **Hero** — giant PRØDUX wordmark (real produx SVG letter paths, currently in `src/components/produx/ProduxSequence.tsx`) that scales/shrinks toward the navbar on scroll. Headline: "You feel the brand before it speaks®". Body: "Produx builds brand identities for companies that care how things feel and how they are perceived over time." Link: "view all works" → /work.
   - Replaces the invented puzzle-solve animation.
3. **Trusted by** — eyebrow "Trusted by" + horizontal scrolling logo marquee. Names: Acquisition, Geviti, Google, Healwell, Nolana, Virgin, Aqua, Gather, RepAI, Fanmaker, Parker, Niamato. Pulled out of the scroll scene into its own standalone section.
4. **Featured projects** — vertical stacked large cards (not alternating grid). 5 projects in order: Payy Network, Gather AI, Jurni AI, Parker AI, Nolana AI. Each: discipline tags (creative direction, visual identity, motion, web design — per project), name, "View Project". Real images available in `public/produx/www.produx.design/images/FeaturedProject/`.
5. **CTA** — standalone centered "LET'S TALK" block → /contact.
6. **Services** — 4 numbered rows: Brand Strategy & Identity, Web Design & Development, Product UX/UI Design, Motion Design & Content.
7. **14-day band** — headline "In 14 days, we shape a complete brand identity that moves with confidence." + repeating message marquee: "Stand out and earn trust", "Brand identity in 14 days", "Launch faster & save capital".
8. **Testimonials** — heading "What our partners say about working with Produx" + "read all reviews". 6 cards with headshots (`public/produx/www.produx.design/images/ClientHeadshots/`): Jimmy Slage / Parker AI, Ty Zamkow / Nolana AI, Nathan Graville / Geviti, Delbert Ty / Gather AI, Arianna Armelli / Dorothy Tech, Fawaz Buqammaz / SOOR. Quotes kept short/paraphrased (will be replaced with Equator's anyway; avoids verbatim reproduction).
9. **Journal** — 5 article cards (`public/produx/www.produx.design/images/JournalImages/`): Strategy Matters (Branding), Alex Socoloff interview (Press), Creative Development (Branding), Digital Flow (Branding), Future Proof (Branding). "Read more" per card.
10. **Footer** — menu (Work, Studio, Journal, Lab, Contact); Headquarters: Barcelona, Spain / Wyoming, USA; newsletter "Receive occasional insights on brand identity and taste"; socials Twitter/X, LinkedIn, YouTube; legal Privacy policy, Support; copyright "© 2026 PRØDUX STUDIOS LLC."

## What changes in the file

- **Replace** the pinned puzzle scene → wordmark hero scene (reuse the pinned-scroll engine; swap the animated subject from puzzle tiles to the scaling PRØDUX wordmark).
- **Extract** Trusted-by from scene into standalone section #3.
- **Convert** `.project` alternating grid → vertical stacked cards.
- **Add** standalone CTA section #5.
- **Rebrand** all FORMA → PRØDUX; load real copy, names, and (where available) the scraped images.
- **Remove** the invented `manifesto` section (not on produx homepage) — or keep only if it maps to a real produx block. Default: remove.

## Out of scope

- Equator content swap (next phase).
- Next.js port (next phase).
- Inner pages (work, studio, journal, contact).
- Pixel-exact animation timing — user drives that polish interactively after sections land.

## Success criteria

- All 10 sections present, in produx order, in one self-contained `forma-studio.html`.
- Opens in a browser with no build step; scroll engine and reveals work.
- Content matches produx (names, copy, order); real scraped images used where present.
- No invented sections remain (puzzle, manifesto gone).

## Legal note

Layout/structure and short functional labels are replicated. Long testimonial prose is paraphrased, not reproduced verbatim. Final site will carry Equator's own content.
