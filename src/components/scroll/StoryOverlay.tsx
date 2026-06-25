"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function StoryOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We already registered ScrollTrigger in the main hook, but let's be safe.
    gsap.registerPlugin(ScrollTrigger);

    const blocks = gsap.utils.toArray(".story-block") as HTMLElement[];
    
    blocks.forEach((block) => {
      gsap.fromTo(
        block,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse", // Fades in and out smoothly
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 w-full pointer-events-none">
      {/* Spacer for the hero text / City View */}
      <div className="h-[150vh]" />

      <StoryBlock 
        title="Equator HQ"
        text="Welcome to the Digital Twin. We engineer seamless environments from the ground up."
      />
      
      <div className="h-[100vh]" />
      
      <StoryBlock 
        title="Gatekeeping & Security"
        text="The first line of defense. Our AI-augmented security ensures safety without friction at every access point."
      />

      <div className="h-[100vh]" />
      
      <StoryBlock 
        title="Reception Services"
        text="A flawless welcome. We blend hospitality with high-tech visitor management for a premium first impression."
      />

      <div className="h-[100vh]" />
      
      <StoryBlock 
        title="Elevator & Electrical"
        text="The nervous system of the building. We monitor and maintain critical infrastructure in real-time."
      />

      <div className="h-[100vh]" />
      
      <StoryBlock 
        title="Office & Housekeeping"
        text="Immaculate, optimized workspaces. Our predictive housekeeping ensures peak productivity for your teams."
      />

      <div className="h-[100vh]" />
      
      <StoryBlock 
        title="Ready to Scale?"
        text="Join the revolution in spatial management."
        isContact={true}
      />
      
      <div className="h-[50vh]" />
    </div>
  );
}

function StoryBlock({ title, text, isContact = false }: { title: string; text: string; isContact?: boolean }) {
  return (
    <div className="story-block w-full flex items-center justify-center pointer-events-none">
      <div className="max-w-4xl px-8 text-center">
        <h2 className="font-display text-5xl md:text-7xl text-white mb-6 tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          {title}
        </h2>
        <p className="text-xl md:text-3xl text-equator-silver leading-relaxed font-light drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          {text}
        </p>
        {isContact && (
          <div className="mt-12 pointer-events-auto">
            <a href="/contact" className="inline-block bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Request a Proposal
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
