import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyEquator from "@/components/home/WhyEquator";
import ClientLogos from "@/components/home/ClientLogos";
import FeaturedProject from "@/components/home/FeaturedProject";
import ContactCTA from "@/components/home/ContactCTA";
import ColorWash from "@/components/scroll/ColorWash";
import ParallaxLayer from "@/components/scroll/ParallaxLayer";

/** Corporate home: scroll-continuous 2D sections (no 3D). */
export default function Home() {
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
