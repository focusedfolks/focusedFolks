"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { buildFooterStarLayers, type FooterStarLayer } from "@/lib/footer-stars";

function StarField({ layers }: { layers: FooterStarLayer[] }) {
  return (
    <div className="footer-stars-wrap absolute inset-0 overflow-hidden">
      {layers.map((layer) => (
        <div
          key={layer.id}
          className="footer-star-layer"
          style={
            {
              "--footer-star-duration": `${layer.duration}s`,
              width: layer.size,
              height: layer.size,
              boxShadow: layer.boxShadow,
            } as CSSProperties
          }
        >
          <div
            className="footer-star-layer__repeat"
            style={{
              width: layer.size,
              height: layer.size,
              boxShadow: layer.boxShadow,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function RotatingWaves() {
  return (
    <div className="footer-waves-wrap pointer-events-none absolute inset-0 overflow-hidden">
      <div className="footer-wave-orb footer-wave-orb--1" />
      <div className="footer-wave-orb footer-wave-orb--2" />
      <div className="footer-wave-orb footer-wave-orb--3" />
    </div>
  );
}

export function FooterBackdrop() {
  const [starLayers, setStarLayers] = useState<FooterStarLayer[]>(() =>
    buildFooterStarLayers(2400, 2000, 42)
  );

  useEffect(() => {
    setStarLayers(buildFooterStarLayers(2400, 2000, Math.floor(Math.random() * 100000)));
  }, []);

  return (
    <div className="footer-backdrop-root pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Dark glass base */}
      <div className="footer-glass-base absolute inset-0" />
      <div className="footer-radial-glow absolute inset-0" />

      {/* Layer 1 (back): rotating gradient waves */}
      <RotatingWaves />

      {/* Layer 2: drifting starfield */}
      <StarField layers={starLayers} />

      {/* Layer 3: readability scrim */}
      <div className="footer-backdrop-scrim absolute inset-0" />

      <div className="footer-top-shine absolute inset-x-0 top-0 z-[1] h-px" />
    </div>
  );
}
