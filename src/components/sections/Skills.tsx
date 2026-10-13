import { skills, skillsIntro } from "@/data/portfolio";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative z-30 rounded-t-[44px] bg-bg px-5 py-20 text-text min-[801px]:px-12 min-[801px]:py-[120px]"
    >
      <div className="mb-[60px] text-center">
        <span className="inline-block -rotate-3 font-hand text-[32px] text-text">{skillsIntro.script}</span>
        <h2 id="skills-title" className="font-disp text-[clamp(32px,5.2vw,64px)] font-bold uppercase">
          {skillsIntro.heading}
        </h2>
      </div>

      <ul className="mx-auto flex max-w-[960px] flex-col">
        {skills.map((group, i) => (
          <li
            key={group.category}
            data-cursor-hover
            className="relative flex items-start justify-between gap-2 border-b-[2.5px] border-black px-5 py-6 transition-[padding-left,background] duration-300 hover:bg-accent/35 min-[721px]:items-center min-[721px]:hover:pl-7 max-[720px]:flex-col"
          >
            <h3 className="font-disp text-[clamp(22px,3.4vw,42px)] font-bold uppercase">
              {`${String(i + 1).padStart(2, "0")}. ${group.category}`}
            </h3>
            <p className="max-w-[360px] text-left font-mono text-[13px] leading-[1.4] text-muted min-[721px]:text-right">
              {group.skills}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
