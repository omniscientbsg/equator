"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { canRender3D } from "@/lib/three/capability";
import { useScrollProgress } from "@/hooks/useScrollProgress";

import HeroOverlay from "./HeroOverlay";
import StoryOverlay from "@/components/scroll/StoryOverlay";

import Hero from "@/components/home/Hero";
import ColorWash from "@/components/scroll/ColorWash";

const Experience = dynamic(() => import("./Experience"), { ssr: false });

/** 2D fallback = the existing scroll home. */
function TwoD() {
  return (
    <ColorWash>
      <Hero />
      <div className="h-screen flex items-center justify-center text-white p-8 text-center">
        <h2 className="text-4xl font-light">Equator Integrated Facility Management</h2>
      </div>
    </ColorWash>
  );
}

/** 3D experience = canvas behind, hero overlay, then existing 2D sections. */
function ThreeD() {
  // Track scroll across the ENTIRE page, not just the hero
  useScrollProgress("full-journey");
  return (
    <div id="full-journey">
      <Experience />
      <div className="relative">
        <HeroOverlay />
        <StoryOverlay />
      </div>
    </div>
  );
}

/** Chooses 3D vs 2D after a post-hydration capability check. */
export default function ExperienceGate() {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    setUse3D(canRender3D());
  }, []);

  return use3D ? <ThreeD /> : <TwoD />;
}
