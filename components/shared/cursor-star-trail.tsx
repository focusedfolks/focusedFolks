"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Sparkle = {
  id: number;
  x: number;
  y: number;
  angle: number;
};

export function CursorStarTrail() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const targetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const sparkleId = useRef(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setEnabled(finePointer.matches && !prefersReducedMotion);
    apply();
    finePointer.addEventListener("change", apply);
    return () => finePointer.removeEventListener("change", apply);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("site-custom-cursor");

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    const onClick = (e: MouseEvent) => {
      const burst: Sparkle[] = Array.from({ length: 10 }, (_, i) => ({
        id: sparkleId.current++,
        x: e.clientX,
        y: e.clientY,
        angle: (360 / 10) * i + Math.random() * 18,
      }));
      setSparkles((prev) => [...prev, ...burst].slice(-40));
    };

    const tick = () => {
      setPos((current) => {
        const dx = targetRef.current.x - current.x;
        const dy = targetRef.current.y - current.y;
        return {
          x: current.x + dx * 0.22,
          y: current.y + dy * 0.22,
        };
      });
      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick);

    return () => {
      document.documentElement.classList.remove("site-custom-cursor");
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
    };
  }, [enabled]);

  useEffect(() => {
    if (sparkles.length === 0) return;
    const timer = window.setTimeout(() => {
      setSparkles((prev) => prev.slice(Math.max(0, prev.length - 10)));
    }, 520);
    return () => window.clearTimeout(timer);
  }, [sparkles]);

  if (!enabled) return null;

  return (
    <>
      <div
        aria-hidden
        className="site-cursor-star pointer-events-none fixed left-0 top-0 z-[120]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="site-cursor-star__lens">
          <svg viewBox="0 0 24 24" className="site-cursor-star__icon" aria-hidden>
            <path
              d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7L12 16.8 6.4 19.5l2.1-6.7L3 8.8h6.8L12 2z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          aria-hidden
          className="site-cursor-sparkle pointer-events-none fixed z-[119]"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            ["--sparkle-angle" as string]: `${sparkle.angle}deg`,
          }}
        />
      ))}
    </>
  );
}
