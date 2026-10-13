import type Lenis from "lenis";

// Lets components (e.g. the mobile menu) pause or drive the single Lenis instance owned by SmoothScroll.
let current: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  current = instance;
};

export const getLenis = () => current;
