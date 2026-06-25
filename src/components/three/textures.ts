"use client";

import { CanvasTexture, RepeatWrapping, SRGBColorSpace, Texture } from "three";

/** Procedural facade: sleek modern glass with metallic mullions and subtle office lights.
 *  Used as both map and emissiveMap. */
export function makeWindowTexture(): Texture {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  
  // Base glass color (dark, reflective)
  ctx.fillStyle = "#080c14";
  ctx.fillRect(0, 0, c.width, c.height);

  const floors = 24;
  const floorHeight = c.height / floors;
  const cols = 8;
  const colWidth = c.width / cols;

  // Horizontal floor slabs and vertical mullions
  ctx.fillStyle = "#111827"; 
  for (let i = 0; i < floors; i++) {
    ctx.fillRect(0, i * floorHeight, c.width, 3);
    for(let j = 0; j < cols; j++) {
       ctx.fillRect(j * colWidth, i * floorHeight, 2, floorHeight);
    }
  }

  // Modern interior office lights (cool white / warm white)
  for (let r = 0; r < floors; r++) {
    for (let col = 0; col < cols; col++) {
      if (Math.random() < 0.25) {
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(180, 220, 255, 0.4)" : "rgba(255, 235, 210, 0.3)";
        ctx.fillRect(col * colWidth + 2, r * floorHeight + 3, colWidth - 2, floorHeight - 3);
      }
    }
  }

  const tex = new CanvasTexture(c);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.repeat.set(1.5, 2); // Tile across buildings nicely
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

/** Procedural city ground: dark asphalt with a road grid + lane markings + noise. */
export function makeGroundTexture(): Texture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  // asphalt + subtle noise
  ctx.fillStyle = "#0c0e16";
  ctx.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 4000; i++) {
    const g = 12 + Math.floor(Math.random() * 18);
    ctx.fillStyle = `rgba(${g},${g},${g + 6},0.5)`;
    ctx.fillRect(Math.random() * c.width, Math.random() * c.height, 1, 1);
  }
  // road grid (brand navy)
  const cell = 128;
  ctx.strokeStyle = "#1b2b5e";
  ctx.lineWidth = 18;
  for (let p = 0; p <= c.width; p += cell) {
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, c.height);
    ctx.moveTo(0, p);
    ctx.lineTo(c.width, p);
    ctx.stroke();
  }
  // dashed lane markings (gold)
  ctx.strokeStyle = "rgba(201,168,76,0.5)";
  ctx.lineWidth = 2;
  ctx.setLineDash([14, 18]);
  for (let p = cell / 2; p <= c.width; p += cell) {
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, c.height);
    ctx.moveTo(0, p);
    ctx.lineTo(c.width, p);
    ctx.stroke();
  }
  const tex = new CanvasTexture(c);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.repeat.set(8, 8);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}
