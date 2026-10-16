# Krish Kalsi — personal website

**Live site:** https://krishkalsi.vercel.app
**Code:** https://github.com/KrishKalsi/krish-kalsi-site

My portfolio. I'm a third-year B.Tech Data Science student at NMIMS MPSTME, Mumbai, working on statistics, uncertainty quantification and quantitative finance. The site is meant for recruiters, professors and grad-school committees, so it says little and lets the work and the numbers do the talking.

## What's on it

| Route | Contents |
|---|---|
| `/` | Cover → About → Work (6 projects) → Research (3 working papers) → Experience → Contact |
| `/work/conformal-prediction` | Full project page for the conformal prediction lab, with an interactive figure |
| `/about` | Photo, education, coursework, skills, certifications and what I do outside class |

Contact is by email, GitHub and LinkedIn. There is no phone number or address anywhere on the site.

## Design

I designed it myself. It's monochrome and built from flat panels: a 1px border, no rounded corners, no shadows, no accent colour. Type is a single family (Geist) at very different sizes, and the empty space inside each panel is deliberate. The photos are my own, graded black and white.

The details reflect what I work on:

- **Loading screen:** on the first visit of a session, a log random walk (σ = 0.25, 140 steps, new seed each time) draws across the screen while a counter runs to 100. It then opens into the page as a circle centred on the tip of the path. Any click, key press or scroll skips it. It never appears with reduced motion turned on, and it doesn't delay the page, which is server-rendered underneath it.
- **Interactive Fig. 1** on the project page: switch between split conformal and CQR, and α = 0.05 / 0.10 / 0.20. The prediction band, coverage, mean coverage over 1,000 splits and mean width are recomputed in the browser from seeded synthetic data and a k-NN model. The chart is hand-written SVG, with no chart library.
- **Theme switch:** dark (default) and light. The new theme spreads as a circle from the button you pressed (View Transitions API). The grey ramp under "KK©" on the cover is also a toggle. Your choice is remembered.
- **Circle cursor** on desktop (`mix-blend-mode: difference`). It grows over links and Work tiles. On touch devices the normal cursor is used.
- **Small motion only:** panels fade in once, Research abstracts open in place, and a Work tile's title morphs into the project page title. All of it is turned off under `prefers-reduced-motion`.

## Built with

- [Next.js](https://nextjs.org) 16 (App Router), JavaScript, [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4, with colours as CSS-variable design tokens
- [next-themes](https://github.com/pacocoursey/next-themes) for the theme, [Motion](https://motion.dev) for fades, [KaTeX](https://katex.org) for the formulas on the project page
- `next/font` (Geist), `next/image`, `next/og` for the link-preview images
- Hosted on [Vercel](https://vercel.com) (free tier) with `@vercel/analytics`

The site also covers the basics: semantic HTML with one `h1` per page, a skip-to-content link, visible focus rings, `aria-pressed` / `aria-expanded` on toggles, per-page metadata, Open Graph images, `sitemap.xml`, `robots.txt` and Person JSON-LD. Layouts are responsive at desktop (≥ 1024px), tablet (640–1023px) and mobile (< 640px), with no sideways scrolling.

## Run it locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production build, the same one Vercel runs
```

## Project structure

| Path | What |
|---|---|
| `src/app/` | Routes (`/`, `/about`, `/work/[slug]`), the 404 page, sitemap, robots, icons and link-preview images |
| `src/components/` | Panels and shared pieces: menu bar, theme toggle, loader, circle cursor |
| `src/components/project/` | The project page, including the interactive conformal chart |
| `src/content/` | All site copy as plain JS data. Components never hard-code text |
| `src/lib/` | Conformal prediction maths, seeded RNG, loader and reveal scripts, metadata helpers |
| `docs/content.md` | The source text for everything on the site |
| `docs/design/` | My design mockups, used as the spec for layout and motion |
| `public/images/` | The three photos |

To change any wording, edit `docs/content.md` and then the matching file in `src/content/`.

## Credits

- Typeface: [Geist](https://vercel.com/font) by Vercel, SIL Open Font License.
- Libraries: Next.js, React, Tailwind CSS, next-themes, Motion and KaTeX, all under their own open-source licences.
- All photos are my own.
- No template was used. The design, copy and photos are my own.
- Built with help from Claude (Anthropic), an AI coding assistant. The ideas, design, content and personality are mine.
