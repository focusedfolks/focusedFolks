"use client";

import type { ReactNode } from "react";
import { GalaxyPageShell } from "@/components/layout/galaxy-page-shell";

export function GalaxyPageGate({ children }: { children: ReactNode }) {
  return <GalaxyPageShell>{children}</GalaxyPageShell>;
}
