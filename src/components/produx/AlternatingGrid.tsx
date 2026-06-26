"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function AlternatingGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Apply subtle vertical parallax to the inner images
      gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((img) => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
      
      // Fade in the blocks
      gsap.utils.toArray<HTMLElement>(".project-block").forEach((block) => {
        gsap.fromTo(block, 
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const projects = [
    { num: "01", title: "Payy Network", type: "Fintech" },
    { num: "02", title: "Jurni AI", type: "AI SaaS" },
    { num: "03", title: "Nolana", type: "E-commerce" },
    { num: "04", title: "Vivid", type: "Web3" },
  ];

  return (
    <section ref={containerRef} className="w-full bg-black text-white py-32 px-6 md:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-24 md:mb-48 border-b border-white/20 pb-8">
          <h2 className="font-display text-5xl md:text-8xl">Selected Works</h2>
          <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-white/50">Case Studies</p>
        </div>

        {/* Alternating Parallax Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-0">
          {projects.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={i} className={`project-block flex flex-col mb-16 md:mb-0 ${!isEven ? 'md:mt-64' : ''}`}>
                {/* Image Container with hidden overflow for parallax */}
                <div className="w-full aspect-[4/5] bg-[#0a0a0a] overflow-hidden relative mb-6">
                  {/* The inner element that moves via GSAP parallax */}
                  <div className="parallax-image absolute top-[-15%] left-0 w-full h-[130%] bg-gradient-to-br from-slate-900 to-[#050505]" />
                  
                  {/* Project Number */}
                  <div className="absolute top-6 left-6 font-mono text-lg text-white/50">
                    {project.num}
                  </div>
                </div>

                {/* Details */}
                <div className="flex justify-between items-center px-2">
                  <h3 className="font-display text-3xl md:text-4xl">{project.title}</h3>
                  <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase text-white/60 border border-white/20 px-4 py-2 rounded-full">
                    {project.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
