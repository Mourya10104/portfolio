"use client";

import { useRef, useState, useEffect } from "react";
import { FINE_POINTER, gsap, useGSAP } from "@/lib/gsap";

const HOVER_SELECTOR = "a, button, [role='slider'], [data-cursor-hover]";

/** Accent dot that follows the pointer and grows over interactive elements. Mouse/trackpad only. */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!enabled || !el) return;

      gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.1, ease: "power2.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.1, ease: "power2.out" });
      let shown = false;

      const onMove = (e: MouseEvent) => {
        if (!shown) {
          shown = true;
          gsap.set(el, { x: e.clientX, y: e.clientY, opacity: 1 });
        }
        xTo(e.clientX);
        yTo(e.clientY);
      };
      const onOver = (e: MouseEvent) => {
        const hovering = e.target instanceof Element && e.target.closest(HOVER_SELECTOR) !== null;
        gsap.to(el, {
          scale: hovering ? 2.4 : 1,
          opacity: hovering ? 0.6 : 1,
          duration: 0.15,
          overwrite: "auto",
        });
      };

      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseover", onOver);
      return () => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
      };
    },
    { dependencies: [enabled], revertOnUpdate: true },
  );

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-[18px] w-[18px] rounded-full bg-accent mix-blend-difference"
    />
  );
}
