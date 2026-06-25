"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ShieldCheck, HardHat, Award, MapPin } from "lucide-react";
import ParallaxLayer from "@/components/scroll/ParallaxLayer";

export default function WhyEquator() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {


      // Fade up content
      const items = gsap.utils.toArray('.edge-item');
      items.forEach((item: any, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const edges = [
    {
      num: "01",
      title: "Structured Execution",
      desc: "We run structured coordination across vendors, timelines, and on-site operations. No surprises. No delays.",
      icon: <HardHat size={28} className="text-white" />,
    },
    {
      num: "02",
      title: "ISO-Certified Quality",
      desc: "ISO 9001 for quality management and ISO 45001 for occupational health & safety — certified assurance at every touchpoint.",
      icon: <Award size={28} className="text-white" />,
    },
    {
      num: "03",
      title: "Experienced Teams",
      desc: "Seasoned project managers, technical specialists, and trained housekeeping staff — all under one accountable roof.",
      icon: <ShieldCheck size={28} className="text-white" />,
    },
    {
      num: "04",
      title: "PAN India Reach",
      desc: "Deployable across India's metro and tier-2 markets. Single vendor. Consistent standards. Anywhere.",
      icon: <MapPin size={28} className="text-white" />,
    },
  ];

  return (
    <section ref={sectionRef} className="bg-equator-silver/20 relative overflow-hidden">
      {/* Decorative Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row relative">
          
          {/* Left Column (Scrolling Content) */}
          <div ref={leftColRef} className="w-full md:w-1/2 py-24 md:py-32 md:pr-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-equator-navy text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-equator-silver">
              Why Choose Us
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-equator-navy mb-20 leading-tight">
              The Equator <span className="text-transparent bg-clip-text bg-gradient-to-r from-equator-navy to-equator-blue">Edge.</span>
            </h2>

            <div className="space-y-16">
              {edges.map((edge, index) => (
                <div key={index} className="edge-item flex gap-8 group">
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-equator-navy flex items-center justify-center shadow-lg group-hover:bg-equator-blue transition-colors duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                      <div className="relative z-10 group-hover:scale-110 transition-transform duration-500">
                        {edge.icon}
                      </div>
                    </div>
                    {index !== edges.length - 1 && (
                      <div className="w-px h-full bg-gradient-to-b from-equator-navy/20 to-transparent my-4" />
                    )}
                  </div>
                  <div className="pt-2">
                    <div className="font-mono text-sm font-bold text-equator-sky mb-2 tracking-widest">
                      {edge.num}
                    </div>
                    <h3 className="text-2xl font-display text-equator-navy mb-4 group-hover:text-equator-blue transition-colors duration-500">
                      {edge.title}
                    </h3>
                    <p className="text-equator-charcoal/60 leading-relaxed font-light text-lg">
                      {edge.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Bento Cards) */}
          <div className="w-full md:w-1/2 py-12 md:py-32 md:pl-12 flex items-center justify-center">
            <ParallaxLayer speed={-10} className="grid grid-cols-2 grid-rows-2 gap-4 md:gap-6 w-full h-[500px] md:h-[700px]">
              <div className="rounded-[2rem] overflow-hidden group shadow-xl relative bg-equator-navy">
                <div className="absolute inset-0 bg-equator-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80" 
                  alt="Quality Execution" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="rounded-[2rem] overflow-hidden group shadow-xl relative bg-equator-navy">
                <div className="absolute inset-0 bg-equator-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80" 
                  alt="Technical Expertise" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="rounded-[2rem] overflow-hidden group shadow-xl relative bg-equator-navy">
                <div className="absolute inset-0 bg-equator-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80" 
                  alt="Facility Management" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="rounded-[2rem] overflow-hidden group shadow-xl relative bg-equator-navy">
                <div className="absolute inset-0 bg-equator-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80" 
                  alt="Housekeeping" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </ParallaxLayer>
          </div>

        </div>
      </div>
    </section>
  );
}
