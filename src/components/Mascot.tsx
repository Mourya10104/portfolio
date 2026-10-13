"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Stick figure that "falls" and spins as the page is scrolled. */
export default function Mascot() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
        y: "82vh",
        rotation: 360,
        ease: "none",
      });
    });
    return () => mm.revert();
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed right-[4vw] top-[14vh] z-[90] h-[90px] w-[70px] origin-center"
    >
      <svg
        viewBox="0 0 100 120"
        fill="none"
        stroke="#000"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="50" cy="25" r="16" fill="#fff" />
        <circle cx="45" cy="22" r="2.5" fill="#000" />
        <circle cx="55" cy="22" r="2.5" fill="#000" />
        <path d="M44 30 Q50 36 56 30" stroke="#000" fill="none" />
        <path d="M50 41 L50 75" />
        <path d="M50 48 L22 36 L15 18" />
        <path d="M50 48 L78 60 L90 48" />
        <path d="M50 75 L30 95 L18 112" />
        <path d="M50 75 L70 92 L88 84" />
      </svg>
    </div>
  );
}
