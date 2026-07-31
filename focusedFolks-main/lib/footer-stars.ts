function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Layer 1 — light blue bubbles (blue-300 / blue-400) */
const BLUE_LIGHT: [number, number, number][] = [
  [147, 197, 253],
  [96, 165, 250],
  [125, 211, 252],
  [147, 197, 253],
];

/** Layer 2 — mid blue (blue-500 / blue-600) */
const BLUE_MID: [number, number, number][] = [
  [59, 130, 246],
  [59, 130, 246],
  [37, 99, 235],
  [96, 165, 250],
];

/** Layer 3 — deeper blue (blue-600 / blue-700 / blue-800) */
const BLUE_DEEP: [number, number, number][] = [
  [37, 99, 235],
  [29, 78, 216],
  [30, 64, 175],
  [59, 130, 246],
];

function pickStarColor(rng: () => number, palette: [number, number, number][]): string {
  const [r, g, b] = palette[Math.floor(rng() * palette.length)]!;
  const alpha = 0.48 + rng() * 0.42;
  return `${r},${g},${b},${alpha.toFixed(2)}`;
}

export type FooterStarLayer = {
  id: string;
  size: number;
  boxShadow: string;
  duration: number;
};

export function buildFooterStarLayers(
  width = 2400,
  height = 2000,
  seedBase = 42
): FooterStarLayer[] {
  return buildStarLayers(width, height, seedBase, [
    { id: "footer-stars-1", count: 1900, size: 2, duration: 50, seedOffset: 0, palette: BLUE_LIGHT },
    { id: "footer-stars-2", count: 700, size: 4, duration: 100, seedOffset: 99, palette: BLUE_MID },
    { id: "footer-stars-3", count: 350, size: 6, duration: 150, seedOffset: 201, palette: BLUE_DEEP },
  ]);
}

export function buildCtaStarLayers(
  width = 1400,
  height = 700,
  seedBase = 42
): FooterStarLayer[] {
  return buildStarLayers(width, height, seedBase, [
    { id: "cta-stars-1", count: 420, size: 2, duration: 35, seedOffset: 0, palette: BLUE_LIGHT },
    { id: "cta-stars-2", count: 160, size: 3, duration: 55, seedOffset: 99, palette: BLUE_MID },
    { id: "cta-stars-3", count: 80, size: 4, duration: 80, seedOffset: 201, palette: BLUE_DEEP },
  ]);
}

type StarLayerConfig = {
  id: string;
  count: number;
  size: number;
  duration: number;
  seedOffset: number;
  palette: [number, number, number][];
};

function buildStarLayers(
  width: number,
  height: number,
  seedBase: number,
  layers: StarLayerConfig[]
): FooterStarLayer[] {
  return layers.map((layer) => {
    const rng = mulberry32(seedBase + layer.seedOffset);
    const shadows = Array.from({ length: layer.count }, () => {
      const x = Math.floor(rng() * width);
      const y = Math.floor(rng() * height);
      const rgba = pickStarColor(rng, layer.palette);
      return `${x}px ${y}px rgba(${rgba})`;
    }).join(", ");

    return {
      id: layer.id,
      size: layer.size,
      boxShadow: shadows,
      duration: layer.duration,
    };
  });
}
