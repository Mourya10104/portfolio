"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Decorative floating SVG doodles with scroll parallax driven by each element's data-speed. */
export default function HeroDoodles() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<SVGElement>(".floating-doodle").forEach((doodle) => {
          const speed = parseFloat(doodle.getAttribute("data-speed") ?? "") || 1;
          gsap.to(doodle, {
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            y: -110 * speed,
            rotation: 15 * speed,
            ease: "none",
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 z-[1] h-auto w-full opacity-[0.85]"
      viewBox="0 0 1200 800"
      fill="none"
      stroke="#000"
      strokeWidth="2.5"
    >
      <path
        className="floating-doodle"
        data-speed="1.2"
        d="M120 180 Q140 150 170 160 Q200 140 230 170 Q250 190 230 210 L130 210 Z"
        fill="#fff"
      />
      <path
        className="floating-doodle"
        data-speed="0.8"
        d="M920 120 Q940 90 970 100 Q1000 80 1030 110 Q1050 130 1030 150 L930 150 Z"
        fill="#fff"
      />
      {/* Database cylinder */}
      <g className="floating-doodle" data-speed="1.5" transform="translate(130, 470)">
        <ellipse cx="40" cy="20" rx="30" ry="12" fill="#fff" />
        <path d="M10 20 v30 c0 6.6 13.4 12 30 12 s30 -5.4 30 -12 v-30" fill="#fff" />
        <path d="M10 35 c0 6.6 13.4 12 30 12 s30 -5.4 30 -12" />
      </g>
      {/* Sparkle */}
      <path
        className="floating-doodle fill-accent"
        data-speed="2.0"
        d="M1020 460 L1030 430 L1040 460 L1070 470 L1040 480 L1030 510 L1020 480 L990 470 Z"
      />
    </svg>
  );
}
