export interface Building {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  accent: boolean;
}

export interface CityParams {
  seed: number;
  count: number;
  spread: number;
  minH: number;
  maxH: number;
}

/** Deterministic seeded PRNG (mulberry32). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Build a deterministic stylized-city layout from a seed. */
export function generateCity(p: CityParams): Building[] {
  const rnd = mulberry32(p.seed);
  const out: Building[] = [];
  for (let i = 0; i < p.count; i++) {
    const x = (rnd() - 0.5) * 2 * p.spread;
    const z = (rnd() - 0.5) * 2 * p.spread;
    const w = 1.5 + rnd() * 2.5;
    const d = 1.5 + rnd() * 2.5;
    const h = p.minH + rnd() * (p.maxH - p.minH);
    const accent = rnd() < 0.12;
    out.push({ x, z, w, d, h, accent });
  }
  return out;
}
