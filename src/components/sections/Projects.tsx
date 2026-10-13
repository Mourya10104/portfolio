"use client";

import ProjectCard from "./ProjectCard";
import { projects, projectsIntro } from "@/data/portfolio";
import { useProjectSlider } from "@/hooks/useProjectSlider";

const navBtn =
  "flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-[#363c2c] bg-[#191b15] font-[Arial,sans-serif] text-[20px] font-extrabold text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-200 hover:scale-[1.12] hover:border-accent hover:bg-accent hover:text-black active:scale-95";

export default function Projects() {
  const { wrapperRef, trackRef, fillRef, active, goTo, prev, next, onScrub, onBarKeyDown } = useProjectSlider(
    projects.length,
  );

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative z-[25] w-full overflow-hidden border-t border-line-dark bg-bg-dark pb-[100px] pt-[90px]"
    >
      <div className="mx-auto flex max-w-[1300px] flex-wrap items-end justify-between gap-5 px-5 pb-5 min-[801px]:px-12">
        <div>
          <span className="mb-3.5 block font-mono text-[13px] font-bold tracking-[2px] text-accent">
            {projectsIntro.tag}
          </span>
          <h2 id="work-title" className="font-disp text-[clamp(36px,5.5vw,72px)] font-bold text-accent">
            {projectsIntro.heading}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 rounded-[30px] border border-[#2b2e25] bg-[#141512] px-2 py-[5px]">
            {projects.map((project, i) => (
              <button
                key={project.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}: ${project.title}`}
                aria-current={active === i ? "true" : undefined}
                className={`rounded-[20px] px-3.5 py-1.5 font-mono text-[13px] font-bold transition-all duration-200 hover:bg-accent hover:text-black hover:shadow-[0_0_10px_rgba(216,255,62,0.4)] ${
                  active === i
                    ? "bg-accent text-black shadow-[0_0_10px_rgba(216,255,62,0.4)]"
                    : "bg-transparent text-muted-light"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
          <button type="button" onClick={prev} aria-label="Previous project" title="Previous Project" className={navBtn}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={next} aria-label="Next project" title="Next Project" className={navBtn}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="mx-auto mb-6 flex max-w-[1300px] items-center gap-4 px-5 min-[801px]:px-12">
        <div
          role="slider"
          tabIndex={0}
          aria-label="Project progress"
          aria-valuemin={1}
          aria-valuemax={projects.length}
          aria-valuenow={active + 1}
          aria-valuetext={`Project ${active + 1} of ${projects.length}`}
          title="Click anywhere to scrub"
          onClick={onScrub}
          onKeyDown={onBarKeyDown}
          className="h-1.5 flex-1 cursor-pointer overflow-hidden rounded-md bg-white/10"
        >
          <div
            ref={fillRef}
            className="h-full w-1/4 rounded-md bg-accent shadow-[0_0_14px_var(--accent)] transition-[width] duration-200 ease-out"
          />
        </div>
        <div
          aria-hidden="true"
          className="flex items-center gap-2 font-mono text-[11.5px] font-semibold text-muted-light max-[640px]:hidden"
        >
          <span>← SCROLL / DRAG / BUTTONS →</span>
        </div>
      </div>

      <div
        ref={wrapperRef}
        data-lenis-prevent
        role="region"
        aria-label="Selected projects"
        className="relative w-full cursor-grab snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth pb-9 pt-2.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] data-[dragging=true]:cursor-grabbing data-[dragging=true]:snap-none data-[dragging=true]:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        <ul ref={trackRef} className="flex w-max gap-8 px-5 py-2.5 min-[801px]:px-12">
          {projects.map((project, i) => (
            <li key={project.title} className="contents">
              <ProjectCard project={project} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
