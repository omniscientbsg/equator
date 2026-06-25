"use client";

import { CanvasTexture, RepeatWrapping, SRGBColorSpace, Texture } from "three";

/** Procedural facade: dark building skin with a grid of lit/unlit windows.
 *  Used as both map and emissiveMap so windows glow. */
export function makeWindowTexture(): Texture {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  // facade base
  ctx.fillStyle = "#11162b";
  ctx.fillRect(0, 0, c.width, c.height);
  const cols = 6;
  const rows = 14;
  const mx = 6;
  const my = 6;
  const cw = (c.width - mx * (cols + 1)) / cols;
  const ch = (c.height - my * (rows + 1)) / rows;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const lit = Math.random();
      // warm gold, cool blue, or dark window
      if (lit < 0.18) ctx.fillStyle = "#f2c14e";
      else if (lit < 0.5) ctx.fillStyle = "#6fa8dc";
      else ctx.fillStyle = "#0b1020";
      const x = mx + col * (cw + mx);
      const y = my + r * (ch + my);
      ctx.fillRect(x, y, cw, ch);
    }
  }
  const tex = new CanvasTexture(c);
  tex.wrapS = tex.wrapT = RepeatWrapping;
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
