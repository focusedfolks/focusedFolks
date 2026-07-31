"use client";

import dynamic from "next/dynamic";
import { useEffect, type ReactNode } from "react";

const GalaxyScene = dynamic(
  () => import("@/components/layout/galaxy-scene").then((m) => m.GalaxyScene),
  { ssr: false }
);

export function GalaxyPageShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("galaxy-page-active");
    document.body.classList.add("galaxy-page-active");
    return () => {
      document.documentElement.classList.remove("galaxy-page-active");
      document.body.classList.remove("galaxy-page-active");
    };
  }, []);

  return (
    <div className="galaxy-page-root relative w-full max-w-[100vw] overflow-x-clip overflow-y-visible">
      <GalaxyScene />
      <div className="galaxy-perspective relative z-20 w-full max-w-full overflow-x-clip overflow-y-visible bg-transparent">
        {children}
      </div>
    </div>
  );
}
