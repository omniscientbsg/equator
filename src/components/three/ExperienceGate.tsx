"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { canRender3D } from "@/lib/three/capability";
import { useScrollProgress } from "@/hooks/useScrollProgress";

import StatsBar from "@/components/home/StatsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyEquator from "@/components/home/WhyEquator";
import ClientLogos from "@/components/home/ClientLogos";
import FeaturedProject from "@/components/home/FeaturedProject";
import ContactCTA from "@/components/home/ContactCTA";
import HeroOverlay from "./HeroOverlay";

import Hero from "@/components/home/Hero";
import ColorWash from "@/components/scroll/ColorWash";
import ParallaxLayer from "@/components/scroll/ParallaxLayer";

const Experience = dynamic(() => import("./Experience"), { ssr: false });

/** 2D fallback = the existing scroll home. */
function TwoD() {
  return (
    <ColorWash>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <WhyEquator />
      <ClientLogos />
      <ParallaxLayer speed={-8}>
        <FeaturedProject />
      </ParallaxLayer>
      <ContactCTA />
    </ColorWash>
  );
}

/** 3D experience = canvas behind, hero overlay, then existing 2D sections. */
function ThreeD() {
  useScrollProgress("hero-act");
  return (
    <>
      <Experience />
      <div className="relative">
        <HeroOverlay />
        <div className="relative bg-equator-charcoal">
          <StatsBar />
          <ServicesGrid />
          <WhyEquator />
          <ClientLogos />
          <FeaturedProject />
          <ContactCTA />
        </div>
      </div>
    </>
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
