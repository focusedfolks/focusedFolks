"use client";

/** Dark navy header backdrop — flowing gradient animation (distinct from footer stars). */
export function HeaderBackdrop() {
  return (
    <div className="header-backdrop-root pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="header-glass-base absolute inset-0" />
      <div className="header-gradient-flow absolute inset-0" />
      <div className="header-shimmer-band absolute inset-0" />
      <div className="header-chrome-scrim absolute inset-0" />
      <div className="header-bottom-shine absolute inset-x-0 bottom-0 z-[1] h-px" />
    </div>
  );
}
