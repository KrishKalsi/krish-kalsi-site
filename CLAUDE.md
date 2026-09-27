# Krish Kalsi — personal website

Personal portfolio for Krish Kalsi, a third-year B.Tech Data Science student (NMIMS MPSTME, Mumbai) working on statistics, uncertainty quantification and quantitative finance. Audience: quant recruiters, professors, grad-school committees, ML recruiters.

The approved design is **v3 — Monochrome panels**. Reference mockups are in `docs/design/` (see "Design reference" below). Match them closely. All copy lives in `docs/content.md`.

## Stack (do not change without asking)

- **Next.js (App Router), JavaScript only — no TypeScript.** Use `.js` / `.jsx` files. No `tsconfig.json`.
- **Tailwind CSS** for styling, with design tokens as CSS variables (below).
- **Fonts:** Geist via `next/font/google` (weights 300, 400, 500, 600). No other typeface.
- **Theme:** `next-themes`, attribute `data-theme`, default **dark**, remembers the visitor's choice, no flash on load.
- **Motion:** `motion` (Framer Motion) for small fades only. Respect `prefers-reduced-motion`.
- **Content:** plain JS data files in `src/content/` (projects, research, experience, profile). Pages read from these; never hard-code copy inside components.
- **Hosting:** Vercel. Analytics: `@vercel/analytics`.
- Package manager: npm.

## Design tokens

Define once in `globals.css` and use everywhere through Tailwind (`bg-bg`, `text-strong`, `border-line`, …). Never use any other colour.

| Token | Dark (default) | Light |
|---|---|---|
| `--bg` | `#0A0A0A` | `#E4E4E0` |
| `--panel` | `#111111` | `#F1F1EE` |
| `--line` | `#383836` | `#B8B8B3` |
| `--grid` (chart gridlines) | `#1C1C1B` | `#E2E2DE` |
| `--dim` (labels) | `#8A8A86` | `#6A6A66` |
| `--text` (body) | `#B9B9B5` | `#3A3A37` |
| `--strong` (headings, values) | `#E9E9E5` | `#0F0F0E` |

Theme-switch grey ramp (fixed, not themed): `#F2F2F0 #D6D6D3 #BBBBB8 #A0A09D #858582 #6B6B68 #52524F #3B3B39 #262625 #141413`.

### Type scale (desktop → mobile)

| Role | Desktop | Mobile | Weight / tracking |
|---|---|---|---|
| Wordmark (cover name) | 212px, line-height 0.84 | 104px on two lines | 300, −0.055em |
| Page title (project/about hero) | 168px | 72px | 300, −0.055em |
| Panel title | 72px | 44px | 300, −0.045em |
| Statement | 25px / 1.38 | 18px | 400, −0.01em |
| List item title | 20px, UPPERCASE | 17px | 400 |
| Body / detail | 15–17px | 14–16px | 400 |
| Label | 12px, UPPERCASE, "Mail:" style with colon | 11px | 400, colour `--dim` |
| Menu bar | 13px | 13px | 400; name 500 |

Use `clamp()` so large type scales smoothly between breakpoints.

### Layout

- Page padding 64px desktop, 16px mobile. Panels stacked with a 40px gap (16px mobile).
- **Panel** = 1px `--line` border, `--panel` background, padding 28px 36px 32px, **no border radius, no shadow**. Content is pinned to the top (title) and bottom (details) of each panel with lots of empty space between.
- Photo panels split the panel: image on one side, separated by a 1px `--line` rule, full panel height, `object-fit: cover`.
- **Menu bar**: 44px, sticky at the top, 1px bottom rule. Left: `/KrishKalsi` then Work · Research · About · CV · Contact. Right: Dark / Light toggle (circle indicator, filled = active) and "Mumbai, IST".
- **Circle marker**: 15px circle, 1px border, before every list item. Filled on hover and for the current or featured item.
- Breakpoints: desktop ≥ 1024px, tablet 640–1023px (2-column grids), mobile < 640px (single column, photo on top of its panel, as in `Mobile` mockup).

## Pages

| Route | Contents | Mockup |
|---|---|---|
| `/` | Cover → About → Work (6) → Research (3) → Experience (3) → Contact → footer | `docs/design/v3-home-desktop.html`, `v3-home-mobile.html` |
| `/work/[slug]` | Project page. Build `conformal-prediction` fully first; other slugs use the same template once Krish writes them. Until then, their Work tiles link to GitHub. | `v3-project.html` |
| `/about` | About hero with photo, Education, Coursework + Skills, Certifications + Beyond class, CV download | `v3-about.html` |
| `/cv` | Redirects to `/cv/krish-kalsi-cv.pdf` in `public/` | — |

Interactions:
- **Theme toggle** in the menu bar on every page, plus the grey ramp under "KK©" on the cover toggles too. Cross-fade colours over 300ms.
- **Project page Fig. 1** is interactive: method toggle (Split conformal / CQR) and α toggle (0.05 / 0.10 / 0.20) recompute the band, coverage, mean over 1,000 splits and mean width. The exact algorithm (seeded RNG, synthetic heteroscedastic data, k-NN model with k = 60) is in the `<script>` of `v3-project.html` — port it to a client component with SVG. Keep it seeded so numbers are reproducible. Compute once per (method, α) and memoise.

## Photos

Supplied in `docs/photos/`; copy them to `public/images/` during setup. They are already graded (black and white, lifted blacks, fine grain) — do not re-filter:
- `street.jpg` → About panel (home) — portrait, crop `object-position: 50% 30%`
- `harbour.jpg` → Research panel — caption "By the water — Mumbai"
- `rooftop.jpg` → Contact panel
- `laugh.jpg` → About page hero

Use `next/image` with proper `sizes`, meaningful `alt` text (in `docs/content.md`), and `priority` only on the first visible image.

## Motion

- Panels fade in (opacity 0→1, translateY 12px→0) once when they enter the viewport, 400ms ease-out.
- Theme change cross-fades colours in 300ms.
- Circle markers fill on hover (150ms).
- Nothing loops, bounces, counts up or parallaxes. With reduced motion, everything appears instantly.

## Rules

- **Never invent facts, numbers, links or achievements.** Every number comes from `docs/content.md`. Missing things (GitHub URL, LinkedIn URL, CV PDF) stay as clearly marked `TODO` placeholders until Krish provides them.
- Keep text short. The design works because it says little. Don't add sections, taglines, testimonials, skill bars, badges, icons, emoji, gradients, glassmorphism, rounded cards or stock imagery.
- Greyscale only. No accent colour.
- Accessibility: semantic HTML, one `h1` per page, real `<button>`/`<a>`, visible focus ring (1px `--strong` outline, offset 3px), touch targets ≥ 44px, text contrast ≥ 4.5:1, `aria-pressed` on theme buttons, skip-to-content link.
- SEO: per-page `metadata`, Open Graph image (generated with `next/og` in the cover style), `sitemap.js`, `robots.js`, Person JSON-LD on `/`.
- Performance: Lighthouse ≥ 95 on all four categories. Images via `next/image`; no heavy libraries for the chart (hand-written SVG).
- Before finishing any task: run `npm run lint` and `npm run build`, and check the page at 1440px, 768px and 390px widths in both themes.
- Commit after each working step with a clear message.

## Design reference

`docs/design/*.html` are exported mockups from the design canvas. They use a templating syntax (`{{t.bg}}`, `<sc-for>`, `<sc-if>`, a `DCLogic` class) that will not run on its own — read them as a precise spec for layout, spacing, sizes and copy, and read the `renderVals()` / helper methods for theme tokens and the chart algorithm. Do not copy the templating syntax into the site. Where a mockup's wording differs from `docs/content.md`, **content.md wins**.

## Impeccable

The Impeccable design plugin is installed. Use `/impeccable critique` and `/impeccable audit` after each page is built, and `/impeccable polish` at the end. When its advice conflicts with this file, this file wins — ask Krish before deviating.
