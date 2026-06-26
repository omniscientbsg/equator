"use client";

import { useLayoutEffect, useState, useEffect } from "react";

export default function ProduxPuzzle() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const COLS = 7;
  const ROWS = 4;
  const tiles = [];
  const ord = Array.from({ length: COLS * ROWS }, (_, i) => i);
  
  // Scramble ord for random stagger (only run on client to avoid hydration mismatch)
  if (mounted) {
    for (let i = ord.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ord[i], ord[j]] = [ord[j], ord[i]];
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      const orderValue = mounted ? ord.indexOf(i) / (ord.length - 1) : 0;
      
      // Calculate start positions
      const ang = mounted ? Math.random() * Math.PI * 2 : 0;
      const dist = mounted ? 1.2 + Math.random() * 1.5 : 0;
      const sx = mounted ? Math.cos(ang) * (typeof window !== 'undefined' ? window.innerWidth : 1000) * 0.25 * dist : 0;
      const sy = mounted ? Math.sin(ang) * (typeof window !== 'undefined' ? window.innerHeight : 1000) * 0.15 * dist : 0;
      const sz = mounted ? -(1000 + Math.random() * 5000) : 0;

      tiles.push(
        <div
          key={i}
          className="tile puzzle-tile"
          data-ord={orderValue}
          data-sx={sx}
          data-sy={sy}
          data-sz={sz}
          style={{
            left: `${(c * 100) / COLS}%`,
            top: `${(r * 100) / ROWS}%`,
            width: `${100 / COLS}%`,
            height: `${100 / ROWS}%`,
            backgroundSize: `calc(100% * ${COLS}) calc(100% * ${ROWS})`,
            backgroundPosition: `${c === 0 ? 0 : (-c * 100)}% ${r === 0 ? 0 : (-r * 100)}%`,
            opacity: mounted ? Math.max(0, 1 + sz / 3500) : 0, // start with depth opacity
            transform: mounted ? `translate3d(${sx}px, ${sy}px, ${sz}px)` : 'none',
            filter: mounted ? `blur(${2 + Math.min(1, (-sz) / 1200) * 20}px)` : 'none'
          }}
        />
      );
    }
  }

  return (
    <div className="puzzle-frame relative w-[69.4vw] max-w-[1200px] aspect-[1.784/1] [transform-style:preserve-3d] will-change-transform" id="puzzleWrap">
      <div 
        className="puzzle-grid absolute inset-0 pointer-events-none rounded-[4px] mix-blend-overlay" 
        id="puzzleGrid" 
        style={{ 
          backgroundSize: `${100/COLS}% ${100/ROWS}%`,
          backgroundImage: `linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)`
        }}
      ></div>
      <div id="puzzle" className="absolute inset-0 [transform-style:preserve-3d]">
        {tiles}
      </div>
    </div>
  );
}
