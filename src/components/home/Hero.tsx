"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, registerScrollTrigger } from "@/lib/motion";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Subtle Image Zoom
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true
      });

      // Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.3
      );

      // Headline Words
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { opacity: 0, y: 40, rotateX: -30 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.5
        );
      }

      // Subhead
      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        0.9
      );

      // CTA Buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        1.1
      );

      // Scroll-out parallax (depth on exit)
      if (!prefersReducedMotion()) {
        registerScrollTrigger();
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center bg-equator-navy overflow-hidden"
    >
      {/* Premium Image Background */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={imageRef}
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
          alt="Modern Commercial Space"
          className="w-full h-full object-cover origin-center"
        />
        <div className="absolute inset-0 bg-equator-navy/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-equator-navy via-equator-navy/40 to-transparent" />
        {/* Subtle grid texture overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 max-w-7xl flex-1 flex flex-col items-center justify-center text-center pt-24">
        
        <div ref={eyebrowRef} className="mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
          <span className="w-2.5 h-2.5 rounded-full bg-equator-gold animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
          <span className="text-xs md:text-sm font-bold text-white tracking-widest uppercase">
            ISO 9001 & 45001 Certified · PAN India Operations
          </span>
        </div>

        <h1 ref={headlineRef} className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-8 max-w-5xl leading-[1.1] tracking-tight [perspective:1000px]">
          <span className="word inline-block origin-bottom">Every</span>{" "}
          <span className="word inline-block origin-bottom">Space.</span>
          <br className="hidden sm:block" />
          <span className="word inline-block origin-bottom text-equator-silver">Every</span>{" "}
          <span className="word inline-block origin-bottom text-equator-silver">System.</span>
          <br className="hidden sm:block" />
          <span className="word inline-block origin-bottom">Every</span>{" "}
          <span className="word inline-block origin-bottom text-equator-sky">Day.</span>
        </h1>

        <p ref={subheadRef} className="text-lg md:text-2xl text-white/80 max-w-3xl mb-12 font-light leading-relaxed">
          Equator delivers integrated retail turnkey execution, technical facility management, and housekeeping solutions for India's most demanding brands.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 items-center pb-8">
          <Link 
            href="/contact"
            className="group relative inline-flex items-center justify-center bg-white text-equator-navy px-10 py-5 rounded-full font-bold overflow-hidden shadow-2xl transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-equator-sky translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500">
              Request a Proposal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link 
            href="/services"
            className="group relative inline-flex items-center justify-center border-2 border-white/50 text-white px-10 py-5 rounded-full font-bold overflow-hidden shadow-2xl transition-all hover:scale-105 hover:border-white"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 tracking-wide uppercase">
              Explore Our Services
            </span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator - Flow positioning */}
      <div className="relative z-20 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity pb-8">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white mb-1">Scroll</span>
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-3 bg-white rounded-full animate-bounce mt-1" />
        </div>
      </div>
    </section>
  );
}
