"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function ProduxLogoSVGs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial reveal animation for the SVGs (they start translate-y-full)
      gsap.to(".NavbarSVGMorphCharacter", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      // 2. The scroll shrink effect (they scale down and move to the top left)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top", // Shrink over the first 100vh of scroll
          scrub: 1,
        }
      });

      // The container itself scales down and translates
      tl.to(".logo-svg-container", {
        scale: 0.15,
        xPercent: -42, // Move left
        yPercent: -45, // Move up
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-[200vh] w-full relative">
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* The Exact Produx Morphing SVG Logo extracted from their source code */}
        <div className="logo-svg-container flex items-center justify-center w-[80vw] max-w-[1200px] gap-[2%] mix-blend-difference z-50">
          
          {/* P */}
          <svg viewBox="0 0 165 201" fill="none" className="NavbarSVGMorphCharacter h-auto flex-[165] translate-y-full opacity-0">
            <path d="M24.0112 182.325V106.861L113.46 106.598C141.956 106.598 164.12 87.5996 164.12 55.4088C164.12 22.4264 138.526 8.44183 107.918 8.44183H0V182.325H24.0112ZM24.0112 91.5575V28.2313H106.335C125.597 28.2313 140.637 37.7302 140.637 59.8944C140.637 80.4754 125.069 91.5575 106.335 91.5575H24.0112Z" fill="#f2f2f2"></path>
          </svg>
          
          {/* R */}
          <svg viewBox="200 0 164 201" fill="none" className="NavbarSVGMorphCharacter h-auto flex-[164] translate-y-full opacity-0">
            <path d="M224.011 182.325V106.598H269.395L334.832 182.325H363.329L296.045 106.598H314.779C341.429 106.07 364.12 88.3912 364.12 55.6727C364.12 21.8987 338.262 8.44183 306.599 8.44183H200V182.325H224.011ZM224.011 91.5575V28.2313H306.335C325.597 28.2313 340.637 37.7302 340.637 59.8944C340.637 80.4754 325.069 91.5575 306.335 91.5575H224.011Z" fill="#f2f2f2"></path>
          </svg>
          
          {/* Ø */}
          <svg viewBox="390 0 230 210" fill="none" className="NavbarSVGMorphCharacter h-auto flex-[230] translate-y-full opacity-0">
            <path d="M609.547 9.98438L588.355 31.1758C607.5 47.3371 617.352 71.4855 612.588 100.047C603.862 152.36 550.778 190.619 491.937 190.619C472.517 190.619 455.017 186.412 440.609 178.922L418.927 200.604L408.943 190.62L428.358 171.204C407.095 155.104 395.944 130.193 400.799 101.088C409.265 50.3366 462.784 9.47559 522.68 9.47559C543.267 9.47563 561.762 14.3099 576.623 22.9395L599.563 0L609.547 9.98438ZM456.379 163.151C467.133 168.832 480.193 171.88 494.535 171.88C537.544 171.88 578.428 145.072 585.938 100.047C589.625 77.9406 583.88 60.0426 571.825 47.7061L456.379 163.151ZM520.523 28.7344C475.183 28.4741 434.79 58.665 427.626 101.608C423.814 124.465 430.799 142.804 444.552 155.01L560.657 38.9053C549.707 32.2927 535.944 28.7344 520.523 28.7344Z" fill="#f2f2f2"></path>
          </svg>
          
          {/* D */}
          <svg viewBox="651 0 167 201" fill="none" className="NavbarSVGMorphCharacter h-auto flex-[167] translate-y-full opacity-0">
            <path d="M651.774 182.325H723.543C782.912 182.325 818.533 143.274 818.533 91.2937C818.533 37.4664 785.287 8.9696 728.293 8.9696H651.774V182.325ZM678.423 26.3843H718.794C766.552 26.3843 792.938 46.1738 792.938 91.8214C792.938 137.733 764.178 164.91 715.628 164.91H678.423V26.3843Z" fill="#f2f2f2"></path>
          </svg>
          
          {/* U */}
          <svg viewBox="860 0 196 201" fill="none" className="NavbarSVGMorphCharacter h-auto flex-[196] translate-y-full opacity-0">
            <path d="M860.665 104.936C860.665 156.001 894.137 185.044 936.256 185.044C985.076 185.044 1014.42 160.469 1030.05 129.83V182.172H1056.52V8.23138H1030.05V97.2762C1030.05 112.277 1008.69 167.81 942.638 167.81C905.943 167.81 886.176 140.043 886.176 104.936V8.23138H860.665V104.936Z" fill="#f2f2f2"></path>
          </svg>
          
          {/* X */}
          <svg viewBox="1093 0 187 201" fill="none" className="NavbarSVGMorphCharacter h-auto flex-[187] translate-y-full opacity-0">
            <path d="M1095.65 182.222C1093.61 182.222 1092.59 180.855 1093.95 178.803L1173.16 92.9914V91.9658L1128.97 12.3077C1127.95 10.2564 1128.97 8.88885 1131.01 8.88885H1155.82C1157.18 8.88885 1158.2 9.23074 1158.88 10.9401L1191.52 72.4786H1192.54L1246.93 10.5983C1247.61 9.57264 1248.63 8.88885 1249.99 8.88885H1277.53C1279.57 8.88885 1280.93 10.2564 1279.23 12.3077L1206.14 91.9658V93.3333L1254.07 178.803C1255.09 180.855 1254.07 182.222 1252.03 182.222H1227.22C1225.86 182.222 1224.84 181.88 1224.16 180.513L1188.12 112.137H1187.1L1126.59 180.513C1125.57 181.538 1124.55 182.222 1123.19 182.222H1095.65Z" fill="#f2f2f2"></path>
          </svg>

        </div>
      </div>
    </div>
  );
}
