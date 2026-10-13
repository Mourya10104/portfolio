import { experience, experienceIntro } from "@/data/portfolio";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative z-[25] -mt-10 min-h-screen rounded-t-[44px] bg-bg-dark px-5 py-20 text-text-light min-[801px]:px-12 min-[801px]:py-[120px]"
    >
      <div className="mx-auto max-w-[900px]">
        <span className="mb-3.5 block font-mono text-[13px] font-bold tracking-[2px] text-accent">
          {experienceIntro.tag}
        </span>
        <h2
          id="experience-title"
          className="mb-[30px] font-disp text-[clamp(38px,6.2vw,76px)] font-bold uppercase leading-none tracking-[-0.02em]"
        >
          {experienceIntro.heading}
        </h2>
        <p className="mb-9 text-[clamp(16px,1.8vw,20px)] leading-[1.65] text-[#cfd2c8]">{experienceIntro.bio}</p>

        {experience.map((entry, i) => (
          <article
            key={entry.role}
            className={`rounded-[20px] border-2 border-line-dark bg-[#191b15] p-5 min-[641px]:p-[30px] ${i === 0 ? "mt-[30px]" : "mt-6"}`}
          >
            <header className="mb-4 flex flex-wrap items-baseline justify-between gap-2.5 border-b border-line-dark pb-3.5">
              <div>
                <h3 className="font-disp text-[22px] font-bold text-accent">{entry.role}</h3>
                <div className="text-[15px] font-semibold text-white">{entry.org}</div>
              </div>
              <div className="font-mono text-[12.5px] text-muted-light">{entry.date}</div>
            </header>
            <ul className="flex flex-col gap-2.5 text-[14.5px] leading-[1.6] text-[#cfd2c8]">
              {entry.bullets.map((b) => (
                <li key={b} className="before:mr-2 before:font-bold before:text-accent before:content-['▹']">
                  {b}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
