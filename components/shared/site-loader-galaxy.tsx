"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { buildFooterStarLayers, type FooterStarLayer } from "@/lib/footer-stars";

function LoaderStarField({ layers }: { layers: FooterStarLayer[] }) {
  return (
    <div className="site-loader-stars absolute inset-0 overflow-hidden">
      {layers.map((layer) => (
        <div
          key={layer.id}
          className="site-loader-star-layer"
          style={
            {
              "--loader-star-duration": `${layer.duration}s`,
              width: layer.size,
              height: layer.size,
              boxShadow: layer.boxShadow,
            } as CSSProperties
          }
        >
          <div
            className="site-loader-star-layer__repeat"
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

function LoaderGalaxyWaves() {
  return (
    <div className="site-loader-waves pointer-events-none absolute inset-0 overflow-hidden">
      <div className="site-loader-wave-orb site-loader-wave-orb--1" />
      <div className="site-loader-wave-orb site-loader-wave-orb--2" />
      <div className="site-loader-wave-orb site-loader-wave-orb--3" />
    </div>
  );
}

export function SiteLoaderGalaxy() {
  const [starLayers, setStarLayers] = useState<FooterStarLayer[]>(() =>
    buildFooterStarLayers(2400, 2000, 42)
  );

  useEffect(() => {
    setStarLayers(buildFooterStarLayers(2400, 2000, Math.floor(Math.random() * 100000)));
  }, []);

  return (
    <div className="site-loader__galaxy pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="site-loader__galaxy-base absolute inset-0" />
      <div className="site-loader__galaxy-glow absolute inset-0" />
      <LoaderGalaxyWaves />
      <LoaderStarField layers={starLayers} />
    </div>
  );
}
