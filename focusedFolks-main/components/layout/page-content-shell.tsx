import type { ReactNode } from "react";

/** Plain content wrapper — no galaxy canvas (prevents nested scroll on long pages). */
export function PageContentShell({ children }: { children: ReactNode }) {
  return (
    <div className="page-content-root relative w-full max-w-full overflow-x-clip overflow-y-visible">
      {children}
    </div>
  );
}
