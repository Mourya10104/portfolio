"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/** Media query: user has not asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
/** Media query: a precise hovering pointer exists (mouse/trackpad, not touch). */
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
