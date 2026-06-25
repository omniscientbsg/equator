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
