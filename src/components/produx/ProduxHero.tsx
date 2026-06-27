import { ReactNode } from 'react';

export default function ProduxHero() {
  return (
    <div className="hero-section sticky top-0 left-0 z-[100] h-fit w-full -mb-[17.5vh] max-lg:mb-0">
      
      {/* Top Navbar */}
      <div className="text-[#f2f2f2] pointer-events-none z-50 mb-[10vh] w-screen px-[5.5vw] pt-[15vh] mix-blend-difference max-lg:mb-[4.75vh] max-lg:px-[4.10vw] max-lg:pt-[13.10vh] max-sm:mb-[5.2vh] max-sm:px-[5.97vw] max-sm:pt-[11.3vh]">
        <div className="flex items-end justify-between max-lg:flex-col max-lg:items-start max-lg:gap-[3.07vh] max-sm:gap-[4.8vh]">
          <h1 className="hero-main-heading font-display leading-[103%] tracking-[-0.03em] flex w-[48.6vw] flex-wrap max-lg:w-full max-lg:text-[10.25vw] max-sm:text-[14.93vw]">
            {["Every", "Space.", "Every", "System.", "Every", "Day.", "®"].map((word, i) => (
              <span key={i} className="relative inline-block overflow-hidden mr-3">
                <span className="heroSection-splitWord block translate-y-full opacity-0">{word}</span>
              </span>
            ))}
          </h1>
          <p className="hero-subtext font-mono text-[#a0a0a0] text-sm tracking-widest max-w-[30vw] uppercase leading-relaxed text-right max-lg:max-w-full max-lg:text-left">
            Equator delivers integrated facility management, turnkey execution, and housekeeping solutions for India's most demanding brands.
          </p>
        </div>
      </div>

    </div>
  );
}
