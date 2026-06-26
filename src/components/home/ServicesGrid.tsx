"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Building2, Wrench, Sparkles, ArrowRight } from "lucide-react";

export default function ServicesGrid() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-card');
      gsap.fromTo(cards, 
        { y: 80, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Retail Turnkey Projects",
      icon: <Building2 size={36} className="text-equator-blue group-hover:text-white transition-colors duration-500" />,
      description: "Complete store execution from planning and civil work to fixtures, lighting, branding, and final handover.",
      bullets: [
        "Store Planning & Design",
        "Civil & Interior Execution",
        "Electrical Works",
        "Fixture Manufacturing",
      ],
      link: "/services/retail-turnkey",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
    },
    {
      title: "Technical Facility Services",
      icon: <Wrench size={36} className="text-equator-blue group-hover:text-white transition-colors duration-500" />,
      description: "Preventive maintenance, HVAC, electrical, plumbing, and breakdown assistance — keeping spaces running without interruption.",
      bullets: [
        "Electrical Maintenance",
        "HVAC Services",
        "Preventive Maintenance",
        "Civil Repair Works",
      ],
      link: "/services/technical",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80"
    },
    {
      title: "Housekeeping Solutions",
      icon: <Sparkles size={36} className="text-equator-blue group-hover:text-white transition-colors duration-500" />,
      description: "Trained teams, structured cleaning schedules, and quality checks for commercial, retail, data centre, and hospitality environments.",
      bullets: [
        "Retail & Commercial Cleaning",
        "Data Centre Cleaning",
        "Floor Care & Maintenance",
        "Deep Cleaning Services",
      ],
      link: "/services/housekeeping",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80"
    },
  ];

  return (
    <section ref={containerRef} className="py-32 bg-white text-equator-charcoal relative z-10">
      {/* Decorative Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-equator-sky/10 to-transparent rounded-full blur-[80px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-equator-silver/50 text-equator-navy text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-equator-navy/5">
            What We Do
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-equator-navy mb-6 leading-tight">
            Integrated Solutions. <span className="text-transparent bg-clip-text bg-gradient-to-r from-equator-navy to-equator-blue">Zero Gaps.</span>
          </h2>
          <p className="text-xl text-equator-charcoal/60 font-light">
            From concept to completion to continuous care — Equator owns every phase.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-white rounded-[2.5rem] p-10 border border-equator-silver shadow-lg shadow-equator-navy/5 transition-all duration-500 hover:shadow-2xl hover:shadow-equator-navy/20 relative overflow-hidden group flex flex-col cursor-pointer"
            >
              {/* Background Reveal on Hover */}
              <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-equator-navy/80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-equator-navy via-equator-navy/60 to-transparent" />
              </div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-equator-silver/40 group-hover:bg-white/10 backdrop-blur-md border border-transparent group-hover:border-white/20 flex items-center justify-center mb-8 transition-all duration-500 shadow-inner">
                  {service.icon}
                </div>
                
                <h3 className="font-display text-3xl text-equator-navy mb-4 group-hover:text-white transition-colors duration-500">
                  {service.title}
                </h3>
                
                <p className="text-equator-charcoal/60 text-base leading-relaxed mb-8 font-light group-hover:text-white/80 transition-colors duration-500">
                  {service.description}
                </p>
                
                <ul className="space-y-4 mb-10">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm text-equator-navy font-medium group-hover:text-white/90 transition-colors duration-500 delay-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-equator-sky shrink-0 group-hover:bg-white group-hover:scale-150 transition-all duration-500" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link 
                href={service.link}
                className="mt-auto relative z-10 inline-flex items-center gap-3 text-equator-blue font-bold tracking-wide group/link group-hover:text-white transition-colors duration-500"
              >
                Learn More 
                <span className="w-8 h-8 rounded-full bg-equator-silver/50 group-hover:bg-white/20 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-equator-navy transition-all duration-300 backdrop-blur-sm">
                  <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-0.5" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
