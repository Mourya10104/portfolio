# CLAUDE.md — project guide

Personal portfolio for Penmetsa Mourya Varma (Data Engineer & Full-Stack Developer).
Next.js 14 App Router · TypeScript strict · Tailwind CSS 3 · GSAP 3.12 + ScrollTrigger + `@gsap/react` · Lenis.
It is a faithful port of a single-file HTML original. **Do not redesign unless explicitly asked.**

## Commands

`npm run dev` · `npm run build` (type-check + lint + build) · `npm run lint`. Keep `tsc --noEmit` and ESLint clean.

## Structure

```
src/
  app/
    layout.tsx        next/font setup, metadata (OG/Twitter/canonical), JSON-LD
    page.tsx          composes the page; skip link, SmoothScroll, CustomCursor, Mascot, Topbar, <main>, Footer
    globals.css       design tokens (:root), base styles, Lenis + reduced-motion CSS
    icon.svg  robots.ts  sitemap.ts
  components/
    SmoothScroll.tsx  Lenis driven by gsap.ticker; publishes the instance via lib/lenis.ts
    CustomCursor.tsx  accent dot, fine-pointer devices only
    Mascot.tsx        scroll-scrubbed falling mascot
    Topbar.tsx        fixed header (mix-blend-mode: exclusion)   MobileMenu.tsx  <=800px overlay menu
    sections/         Hero(+HeroDoodles) Marquee Experience Projects(+ProjectCard) Skills Education Footer
  hooks/useProjectSlider.ts   all slider behaviour (wheel, drag, keys, pills, bar)
  lib/gsap.ts         registers plugins once; exports gsap, ScrollTrigger, useGSAP, MOTION_OK, FINE_POINTER
  lib/lenis.ts        tiny store so other components can stop/start/scroll Lenis
  data/portfolio.ts   ALL content (typed in types/portfolio.ts)
public/og-image.png   static share image (1200x630)
```

## Content

Never hard-code copy in components. Edit `src/data/portfolio.ts`. A project is one object in `projects`;
`repoUrl: ""` hides the repository button. Section ids: `hero`, `experience`, `work`, `skills`, `education`, `contact`
(nav hrefs must match).

## Design tokens (do not change colours without asking the owner)

`--bg #f5f6f0` · `--bg-dark #0f0f0d` · `--text #111210` · `--text-light #f5f6f0` · `--muted #6c7066` ·
`--muted-light #989c92` · `--accent #d8ff3e` · `--cyan #46e5ff` · `--line #dcdcd4` · `--line-dark #242620`.
Tailwind names: `bg-bg`, `bg-bg-dark`, `text-text`, `text-text-light`, `text-muted`, `text-muted-light`, `text-accent`,
`text-cyan`, `border-line`, `border-line-dark`. A few one-off card shades (`#171814`, `#191b15`, …) are intentional
arbitrary values carried over from the original.
Fonts via `next/font` CSS variables: `font-disp` (Space Grotesk, max weight 700), `font-body` (Inter),
`font-mono` (JetBrains Mono), `font-hand` (Covered By Your Grace).

## Conventions

- Match the original's look: Tailwind arbitrary values (`text-[clamp(44px,8.5vw,105px)]`) are fine to keep pixel parity.
- Server components by default; `"use client"` only where there are hooks/events/GSAP.
- Mobile breakpoints: phone menu / nav pill switch at 800px (`max-[800px]`, `min-[801px]`); card/padding tweaks at 640px.
- **No absolute paths** in code or config (the project folder will move).
- Accessibility is a requirement: landmarks, `aria-label`s that contain the visible text (WCAG label-in-name),
  `:focus-visible` outline, decorative SVG/mascot/cursor `aria-hidden`, external links announce "opens in a new tab".
- Commit in small steps, one section/feature per commit.

## Animation rules (learned the hard way)

- All GSAP code lives in `useGSAP` / `gsap.matchMedia` so it is reverted on unmount. Use `MOTION_OK` (no-preference)
  to gate motion and `FINE_POINTER` for hover-only effects. Reduced motion: no Lenis, no scrubbed/tilt animation, no CSS animation.
- **Inside a `useGSAP({ scope })`, string selectors (incl. ScrollTrigger `trigger: "#id"`) resolve only inside the scope.**
  Pass element references for anything outside it.
- Lenis is driven only by `gsap.ticker` (`autoRaf: false`). Stop/start it via `getLenis()`; scroll with `lenis.scrollTo`.
- **Slider (`useProjectSlider`)**: the track keeps native `scroll-snap` for touch, but all programmatic scrolling is one GSAP
  `glide()`. While gliding/dragging the track has `data-busy` / `data-dragging` (snap off). Never combine
  `scroll-behavior: smooth` or incremental `scrollLeft +=` with snap. Wheel is consumed (`preventDefault` + `stopPropagation`)
  only mid-track; at either end it falls through to Lenis so the page keeps scrolling. Arrows/pills/bar all go through
  `goTo()` so rapid input accumulates.
- **Card tilt (`ProjectCard`)**: the tilt is applied to an inner element; the outer `<article>` is never transformed so
  hit-testing and pointer maths stay stable. Tilt is skipped while a mouse button is held (drag).
- Do not put `transition: transform` on elements GSAP transforms.
- Topbar uses `mix-blend-mode: exclusion`. Automated contrast checkers (Lighthouse/axe) mis-flag its white pills at 1.05:1;
  real rendered contrast is ~17–19:1. Do not "fix" this by changing colours.

## Known gotchas

- `next/og` `ImageResponse` fails on Windows (font path bug in Next 14), so the OG image is a static PNG in `public/`.
- ScrollTrigger touches `<body style>` before hydration, hence `suppressHydrationWarning` on `<body>`.
- Large heredocs in the Bash tool can fail to parse; use the Write tool for big files.

## Verified baseline (production build)

Lighthouse mobile/desktop: Performance 94/99, Accessibility 96, Best Practices 100, SEO 100 (the accessibility gap is the
blend-mode false positive above). axe-core: no real violations. Layout checked at 375, 768, 1024, 1366, 1440 with no horizontal overflow.
