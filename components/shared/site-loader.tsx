"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SiteLoaderGalaxy } from "@/components/shared/site-loader-galaxy";

const MIN_VISIBLE_MS = 1600;
const ROUTE_VISIBLE_MS = 700;

function setLoaderActive(active: boolean) {
  document.documentElement.classList.toggle("site-loader-active", active);
  document.documentElement.style.backgroundColor = active ? "#000000" : "";
  document.body.style.backgroundColor = active ? "#000000" : "";
}

export function SiteLoader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    setLoaderActive(true);
    return () => setLoaderActive(false);
  }, []);

  useEffect(() => {
    if (visible) {
      setLoaderActive(true);
    } else {
      setLoaderActive(false);
    }
  }, [visible]);

  useEffect(() => {
    setVisible(true);
    setLoaderActive(true);
    const startedAt = Date.now();
    const minVisible = isFirstLoad.current ? MIN_VISIBLE_MS : ROUTE_VISIBLE_MS;

    const hideLoader = () => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, minVisible - elapsed);
      window.setTimeout(() => {
        setVisible(false);
        isFirstLoad.current = false;
      }, remaining);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader, { once: true });
      return () => window.removeEventListener("load", hideLoader);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="site-loader fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading page"
        >
          <SiteLoaderGalaxy />
          <div className="site-loader__scrim absolute inset-0" aria-hidden />
          <div className="site-loader__vignette absolute inset-0" aria-hidden />

          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.4,
              duration: prefersReducedMotion ? 0.2 : 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="site-loader__content relative flex flex-col items-center"
          >
            <div className="site-loader__sparkles" aria-hidden>
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="site-loader__sparkle" style={{ ["--i" as string]: i }} />
              ))}
            </div>

            <div className="site-loader__logo-wrap brand-logo-vertical">
              <Image
                src="/logo-v.png"
                alt="Focused Folks Solutions LLP"
                width={1024}
                height={1024}
                priority
                className="site-loader__logo h-40 w-auto object-contain sm:h-48 md:h-56"
              />
            </div>

            <div className="site-loader__shimmer mt-8 h-1.5 w-36 overflow-hidden rounded-full bg-white/10">
              <span className="site-loader__shimmer-bar block h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
