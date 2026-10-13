import { hero } from "@/data/portfolio";
import HeroDoodles from "./HeroDoodles";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-6 pb-20 pt-[120px] text-center"
    >
      <HeroDoodles />

      <div className="relative z-10 max-w-[1080px]">
        <div className="mb-[22px] inline-block rounded-md bg-black px-3.5 py-1.5 font-mono text-[13px] font-bold tracking-[1px] text-accent">
          {hero.badge}
        </div>
        <h1
          id="hero-title"
          className="mb-6 font-disp text-[clamp(44px,8.5vw,105px)] font-bold uppercase leading-[0.94] tracking-[-0.04em] text-black"
        >
          {hero.titleLines[0]}
          <br />
          {hero.titleLines[1]}
        </h1>
        <div>
          <span className="mb-[30px] inline-block -rotate-[1.5deg] font-hand text-[clamp(26px,3.5vw,36px)] text-muted">
            {hero.tagline}
          </span>
        </div>
        <p className="mx-auto mb-9 max-w-[680px] text-base leading-[1.6] text-muted">{hero.description}</p>
      </div>

      {/* Rotating stamp seal */}
      <div
        aria-hidden="true"
        className="absolute bottom-5 right-5 z-[15] h-[84px] w-[84px] min-[641px]:bottom-[30px] min-[641px]:right-[50px] min-[641px]:h-[110px] min-[641px]:w-[110px]"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow motion-reduce:animate-none">
          <path
            id="stamp-circle"
            fill="none"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
          <text fontFamily="var(--font-space-grotesk)" fontSize="9.5" fontWeight="700" fill="#000" letterSpacing="2.2">
            <textPath href="#stamp-circle">{hero.stampText}</textPath>
          </text>
        </svg>
      </div>
    </section>
  );
}
