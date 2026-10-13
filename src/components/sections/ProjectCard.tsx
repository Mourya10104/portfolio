"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Project } from "@/types/portfolio";

const TILT_OK = "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)";
const MAX_TILT = 5;

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const ref = useRef<HTMLElement>(null);
  const num = String(index + 1).padStart(2, "0");

  // 3D tilt toward the pointer. Skipped for touch and reduced-motion users.
  useGSAP(
    () => {
      const card = ref.current;
      if (!card) return;
      const mm = gsap.matchMedia();
      mm.add(TILT_OK, () => {
        gsap.set(card, { transformPerspective: 1000 });
        const rotX = gsap.quickTo(card, "rotationX", { duration: 0.2, ease: "power2.out" });
        const rotY = gsap.quickTo(card, "rotationY", { duration: 0.2, ease: "power2.out" });
        const lift = gsap.quickTo(card, "y", { duration: 0.2, ease: "power2.out" });

        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          rotX(((e.clientY - rect.top - cy) / cy) * -MAX_TILT);
          rotY(((e.clientX - rect.left - cx) / cx) * MAX_TILT);
          lift(-4);
        };
        const onLeave = () => {
          gsap.to(card, { rotationX: 0, rotationY: 0, y: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        return () => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
          gsap.set(card, { clearProps: "transform" });
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <article
      ref={ref}
      data-cursor-hover
      aria-label={project.title}
      className="relative flex min-h-[480px] w-[clamp(300px,36vw,480px)] shrink-0 snap-start select-none flex-col justify-between rounded-[24px] border-2 border-[#2f3328] bg-[#171814] px-7 py-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_20px_50px_rgba(216,255,62,0.16)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-[140px] w-[140px] rounded-full bg-[radial-gradient(circle,rgba(216,255,62,0.15)_0%,transparent_70%)]"
      />
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-lg bg-accent px-2.5 py-1 font-mono text-[11.5px] font-bold tracking-[0.5px] text-black">
            {`${num} // ${project.category}`}
          </span>
          <span className="font-mono text-[11.5px] font-semibold text-muted-light">{project.period}</span>
        </div>
        <h3 className="mb-3 font-disp text-[clamp(22px,2.4vw,28px)] font-bold leading-[1.18] tracking-[-0.5px] text-white">
          {project.title}
        </h3>
        <p className="mb-[18px] text-[13.5px] leading-[1.55] text-[#b8bcb2]">{project.description}</p>
        <ul className="mb-2.5 flex flex-wrap gap-[7px]" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-[10px] border border-white/[0.12] bg-white/[0.07] px-2.5 py-1 font-mono text-[11.5px] font-semibold text-[#e4e7dc]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-white/10 pt-[18px]">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View repository for ${project.title} (opens in a new tab)`}
            className="z-10 inline-flex items-center gap-1.5 rounded-[30px] border-[1.5px] border-black bg-accent px-[18px] py-2 font-disp text-[13px] font-bold text-black shadow-[2px_2px_0_#000] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white hover:shadow-[4px_4px_0_var(--accent)]"
          >
            <span>VIEW REPOSITORY</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
        <span className="ml-auto font-mono text-xs text-muted-light">{project.kind}</span>
      </div>
    </article>
  );
}
