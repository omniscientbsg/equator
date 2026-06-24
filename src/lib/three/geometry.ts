export interface FloorTransform {
  /** Vertical offset of this floor. */
  y: number;
  /** Uniform horizontal scale (taper) for this floor. */
  scale: number;
}

export interface BuildingOptions {
  count: number;
  floorHeight: number;
  /** Fraction of width lost per floor as it rises (0 = no taper). */
  taper: number;
}

/** Pure layout for a stacked, optionally-tapering procedural tower. */
export function buildingFloors(opts: BuildingOptions): FloorTransform[] {
  const floors: FloorTransform[] = [];
  for (let i = 0; i < opts.count; i++) {
    floors.push({
      y: i * opts.floorHeight,
      scale: 1 - opts.taper * i,
    });
  }
  return floors;
}
