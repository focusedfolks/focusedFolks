"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { buildCtaStarLayers, type FooterStarLayer } from "@/lib/footer-stars";

export function CtaStarField({ layers }: { layers: FooterStarLayer[] }) {
  return (
    <div className="cta-stars-wrap absolute inset-0 overflow-hidden">
      {layers.map((layer) => (
        <div
          key={layer.id}
          className="cta-star-layer"
          style={
            {
              "--cta-star-duration": `${layer.duration}s`,
              width: layer.size,
              height: layer.size,
              boxShadow: layer.boxShadow,
            } as CSSProperties
          }
        >
          <div
            className="cta-star-layer__repeat"
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

function CtaRotatingWaves() {
  return (
    <div className="cta-waves-wrap pointer-events-none absolute inset-0 overflow-hidden">
      <div className="cta-wave-orb cta-wave-orb--1" />
      <div className="cta-wave-orb cta-wave-orb--2" />
      <div className="cta-wave-orb cta-wave-orb--3" />
    </div>
  );
}

export function CtaBackdrop() {
  return (
    <div className="cta-backdrop-root pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="cta-glass-base absolute inset-0" />
      <div className="cta-radial-glow absolute inset-0" />
      <CtaRotatingWaves />
      <div className="cta-backdrop-scrim absolute inset-0" />
      <div className="cta-top-shine absolute inset-x-0 top-0 z-[1] h-px" />
    </div>
  );
}

export function CtaStarOverlay() {
  const [starLayers, setStarLayers] = useState<FooterStarLayer[]>(() =>
    buildCtaStarLayers(1400, 700, 42)
  );

  useEffect(() => {
    setStarLayers(buildCtaStarLayers(1400, 700, Math.floor(Math.random() * 100000)));
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[3] mix-blend-screen opacity-75"
      aria-hidden
    >
      <CtaStarField layers={starLayers} />
    </div>
  );
}
