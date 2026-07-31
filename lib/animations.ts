export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

/** Primary scroll-into-view reveal — used site-wide on sections and cards */
export const scrollReveal = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/** Softer reveal for large panels (GalaxyStack / glass cards) */
export const scrollRevealSoft = {
  hidden: { opacity: 0, y: 16, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/** Staggered child reveal for grids and lists */
export const scrollRevealItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const defaultTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

/** Shared viewport config — triggers when element enters view (positive margin = earlier reveal) */
export const scrollRevealViewport = {
  once: true,
  amount: 0.1,
  margin: "0px 0px 8% 0px",
} as const;

/** Home page sections — reveal as soon as content approaches the viewport */
export const homeScrollViewport = {
  once: true,
  amount: 0.06,
  margin: "0px 0px 12% 0px",
} as const;

/** Services page — earlier, smoother reveal (less missed content on scroll) */
export const servicesScrollViewport = {
  once: true,
  amount: 0.12,
  margin: "0px 0px 2% 0px",
} as const;

export function scrollRevealTransition(stagger = 0, duration = 0.48) {
  return {
    duration,
    delay: stagger * 0.025,
    ease: [0.22, 1, 0.36, 1] as const,
  };
}
