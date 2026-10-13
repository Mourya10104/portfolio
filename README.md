# Penmetsa Mourya Varma — Portfolio

Next.js 14 (App Router) · TypeScript (strict) · Tailwind CSS · GSAP + ScrollTrigger · Lenis smooth scroll.
A rebuild of the original single-file `index.html` portfolio with the same design, now data-driven and maintainable.

## Setup

Requires Node 18.17+ (developed on Node 24).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script            | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                    |
| `npm run build`   | Production build (also type-checks and lints) |
| `npm start`       | Serve the production build                    |
| `npm run lint`    | ESLint                                        |

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your deployed URL (see [Deploy](#deploy-to-vercel)).

## Editing content

**All content lives in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts)**. Types are in `src/types/portfolio.ts`, so TypeScript tells you if a field is missing.

| To change…                  | Edit in `portfolio.ts`                                  |
| --------------------------- | ------------------------------------------------------- |
| Name, email, GitHub, SEO    | `site`                                                  |
| Nav links                   | `nav` (the phone menu adds Contact automatically)       |
| Hero text / marquee         | `hero`, `marqueeItems`                                  |
| Jobs and activities         | `experience`                                            |
| Skills                      | `skills`                                                |
| Certifications / education  | `certifications`, `education`                           |
| Footer / contact links      | `contact`                                               |

### Adding a project

Add one object to the `projects` array. Numbering (`01`, `02`, …), the slider pills and the progress bar update automatically.

```ts
{
  category: "GEN-AI",
  period: "JAN 2025 – APR 2025",
  title: "My New Project",
  description: "What it does and the measurable result.",
  tags: ["Next.js", "TypeScript"],
  kind: "FULL-STACK • AI",
  repoUrl: "https://github.com/you/my-new-project", // leave "" to hide the button
}
```

> **TODO:** every project currently has `repoUrl: ""` (the "View repository" button is hidden). Fill in the real URLs.

### Other things to set before launch

- `NEXT_PUBLIC_SITE_URL` — used for canonical URL, Open Graph, `sitemap.xml` and `robots.txt`.
- `public/og-image.png` — the 1200×630 social-share image. Replace it with any image of that size.
- `src/app/icon.svg` — the favicon.

## Design tokens

Defined once in `src/app/globals.css` (`:root`) and exposed to Tailwind in `tailwind.config.ts`
(`bg-bg`, `text-accent`, `border-line-dark`, `font-disp`, …). Do not hard-code these hex values in components.

| Token | Value | Token | Value |
| --- | --- | --- | --- |
| `--bg` | `#f5f6f0` | `--accent` | `#d8ff3e` |
| `--bg-dark` | `#0f0f0d` | `--cyan` | `#46e5ff` |
| `--text` | `#111210` | `--line` | `#dcdcd4` |
| `--text-light` | `#f5f6f0` | `--line-dark` | `#242620` |
| `--muted` | `#6c7066` | `--muted-light` | `#989c92` |

Fonts (loaded with `next/font`): Space Grotesk (`font-disp`), Inter (`font-body`), JetBrains Mono (`font-mono`), Covered By Your Grace (`font-hand`).

## Testing on your phone (same Wi-Fi)

1. Start the dev server (it listens on all network interfaces):
   ```bash
   npm run dev
   ```
2. Find your computer's local IP: run `ipconfig` and look for the **IPv4 Address** of your Wi-Fi adapter (e.g. `192.168.2.151`).
3. On the phone (same Wi-Fi), open `http://<that-ip>:3000`.
4. If it doesn't load, allow Node.js through Windows Defender Firewall for **Private** networks (Windows asks the first time), and make sure the Wi-Fi network is set to *Private*, not *Public*.

## Deploy to Vercel

1. Push this folder to a GitHub repository (the repo root should be the folder containing `package.json`).
2. Go to [vercel.com/new](https://vercel.com/new), import the repository. Vercel detects Next.js; no build settings are needed.
3. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://yourname.vercel.app` or your custom domain).
4. Click **Deploy**. Every push to `main` redeploys; other branches get preview URLs.

Or with the CLI: `npm i -g vercel && vercel --prod`.

## Project structure

See [`CLAUDE.md`](CLAUDE.md) for the full structure, conventions and animation notes.
