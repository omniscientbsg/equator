"use client";

import { useEffect, useRef } from "react";

export default function BlueprintGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(74, 144, 217, 0.05)"; // equator-sky with low opacity
      ctx.lineWidth = 1;

      const gridSize = 40;
      offset = (offset + 0.2) % gridSize;

      ctx.beginPath();
      
      // Isometric transformation
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 4);
      ctx.scale(1, 0.5);
      ctx.rotate((45 * Math.PI) / 180);

      const size = Math.max(canvas.width, canvas.height) * 2;
      const steps = Math.floor(size / gridSize);

      for (let i = -steps; i <= steps; i++) {
        // Vertical lines
        ctx.moveTo(i * gridSize + offset, -size);
        ctx.lineTo(i * gridSize + offset, size);
        
        // Horizontal lines
        ctx.moveTo(-size, i * gridSize + offset);
        ctx.lineTo(size, i * gridSize + offset);
      }

      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-50"
    />
  );
}
