"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedProject() {
  return (
    <section className="relative py-32 bg-equator-charcoal overflow-hidden flex items-center justify-center text-center">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-equator-navy/80 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-equator-charcoal via-transparent to-transparent z-10" />
        {/* Actual image */}
        <img 
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80" 
          alt="1 Million Sq. Ft. Executed"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-20 mx-auto px-6 max-w-7xl flex flex-col items-center">
        <div className="max-w-4xl flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-equator-blue/20 text-equator-sky border border-equator-sky/30 text-sm font-medium mb-6 backdrop-blur-md uppercase tracking-widest">
            Featured Milestone
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight">
            1 Million Sq. Ft. <span className="text-equator-sky">and Counting</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-10 font-light leading-relaxed max-w-3xl">
            From a single Crossword bookstore to rolling out Swiggy Instamart dark stores PAN India — Equator's execution network handles every format, every timeline, every standard.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-white text-equator-navy px-10 py-5 rounded-full font-bold hover:bg-equator-silver hover:scale-105 transition-all shadow-xl"
          >
            View Our Portfolio
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
