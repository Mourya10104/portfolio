import { nav, site } from "@/data/portfolio";
import MobileMenu from "./MobileMenu";

/** Fixed top navigation (blends with whatever section is underneath). */
export default function Topbar() {
  return (
    <header className="fixed left-0 top-0 z-[100] flex w-full items-center justify-between px-5 py-[18px] text-white mix-blend-exclusion min-[801px]:px-12 min-[801px]:py-[22px]">
      <a
        href="#hero"
        aria-label={`${site.logo} — back to top`}
        className="rounded-[10px] border-[2.5px] border-white bg-black/15 px-2.5 py-1 font-disp text-[20px] font-bold tracking-[-1px] backdrop-blur-[8px]"
      >
        {site.logo}
      </a>

      <nav
        aria-label="Primary"
        className="flex items-center gap-7 rounded-[40px] border border-white/25 bg-white/10 px-6 py-2 text-[13px] font-semibold max-[800px]:hidden"
      >
        {nav.map((item) => (
          <a key={item.href} href={item.href} className="transition-colors duration-200 hover:text-accent">
            {item.label}
          </a>
        ))}
      </nav>

      <a
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-[40px] bg-white px-5 py-[9px] font-disp text-[13px] font-bold text-black transition duration-200 hover:scale-105 hover:bg-accent max-[800px]:hidden"
      >
        GITHUB ↗<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <MobileMenu />
    </header>
  );
}
