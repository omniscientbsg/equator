"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;
      
      // Calculate how far to scroll horizontally
      const scrollWidth = container.scrollWidth - window.innerWidth;
      
      // Pin the section and animate the container horizontally
      gsap.to(container, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1, // Smooth scrubbing
          pin: true,
          anticipatePin: 1,
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const cards = [
    { title: "Smart Grids", subtitle: "Energy Optimization" },
    { title: "Predictive AI", subtitle: "Maintenance" },
    { title: "Zero Carbon", subtitle: "Sustainability" },
    { title: "Biometric Gates", subtitle: "Security" },
  ];

  return (
    <section ref={sectionRef} className="h-screen w-full bg-[#020617] text-white overflow-hidden flex flex-col justify-center">
      <div className="px-6 md:px-16 mb-12 shrink-0">
        <h2 className="text-4xl md:text-6xl font-display font-light">Our Capabilities</h2>
      </div>
      
      {/* The container that slides horizontally */}
      <div ref={containerRef} className="flex gap-8 px-6 md:px-16 w-max items-center h-[60vh]">
        {cards.map((card, i) => (
          <div key={i} className="w-[85vw] md:w-[45vw] h-full bg-slate-800 rounded-2xl p-10 flex flex-col justify-end relative overflow-hidden group">
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
            
            {/* Hover subtle glow effect */}
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-700 z-0" />
            
            <div className="relative z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-blue-400 font-mono text-sm tracking-[0.2em] uppercase mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                {card.subtitle}
              </p>
              <h3 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">
                {card.title}
              </h3>
            </div>
          </div>
        ))}
        {/* Empty space at the end to allow scrolling past the last card smoothly */}
        <div className="w-[10vw]" />
      </div>
    </section>
  );
}
