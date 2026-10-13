import { certifications, education } from "@/data/portfolio";

const cardBox = "rounded-[24px] border-2 border-[#2d3026] bg-[#161713] p-6 min-[641px]:p-9";
const cardTitle =
  "mb-6 border-b border-line-dark pb-3 font-disp text-[26px] font-bold uppercase text-accent";
const itemTitle = "mb-1 font-disp text-[17px] font-bold text-white";
const itemMeta = "text-[13px] leading-[1.4] text-muted-light";

export default function Education() {
  return (
    <section
      id="education"
      aria-label="Certifications and education"
      className="relative z-[35] bg-bg-dark px-5 py-20 text-white min-[801px]:px-12 min-[801px]:py-[120px]"
    >
      <div className="mx-auto grid max-w-[1000px] grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-10">
        <article data-cursor-hover className={cardBox}>
          <h3 className={cardTitle}>Certifications</h3>
          <ul>
            {certifications.map((cert) => (
              <li key={cert.name} className="mb-5 last:mb-0">
                <div className={itemTitle}>{cert.name}</div>
                <div className={itemMeta}>{cert.detail}</div>
              </li>
            ))}
          </ul>
        </article>

        <article data-cursor-hover className={cardBox}>
          <h3 className={cardTitle}>Education</h3>
          <ul>
            {education.map((entry) => (
              <li key={entry.degree} className="mb-5 last:mb-0">
                <div className={itemTitle}>{entry.degree}</div>
                <div className={itemMeta}>
                  {entry.school} • <b>{entry.score}</b>
                </div>
                <div className={`${itemMeta} mt-0.5 font-mono !text-[11.5px]`}>{entry.period}</div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
