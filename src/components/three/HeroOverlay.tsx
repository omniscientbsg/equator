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
