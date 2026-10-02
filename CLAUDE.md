# Krish Kalsi — personal website

Personal portfolio for Krish Kalsi, a third-year B.Tech Data Science student (NMIMS MPSTME, Mumbai) working on statistics, uncertainty quantification and quantitative finance. Audience: quant recruiters, professors, grad-school committees, ML recruiters.

The approved design is **v5** = v3 (monochrome panels) + a formal Research list, no harbour photo, and the motion & character layer below. Home-page mockups: `docs/design/v5-*.html` (these override `v3-home-*`); other pages still follow their v3 mockups. Reference mockups are in `docs/design/` (see "Design reference" below). Match them closely. All copy lives in `docs/content.md`.

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
| `/` | Cover (plain, no figure) → About → Work (6) → Research (3, formal list, no photo) → Experience (3) → Contact → footer | `docs/design/v5-home-desktop.html`, `v5-home-mobile.html` |
| `/work/[slug]` | Project page. Build `conformal-prediction` fully first; other slugs use the same template once Krish writes them. Until then, their Work tiles link to GitHub. | `v3-project.html` |
| `/about` | About hero with photo, Education, Coursework + Skills, Certifications + Beyond class, CV download | `v3-about.html` |
| `/cv` | Redirects to `/cv/krish-kalsi-cv.pdf` in `public/` | — |

Interactions:
- **Theme toggle** in the menu bar on every page, plus the grey ramp under "KK©" on the cover toggles too. Circle reveal (see Motion).
- **Project page Fig. 1** is interactive: method toggle (Split conformal / CQR) and α toggle (0.05 / 0.10 / 0.20) recompute the band, coverage, mean over 1,000 splits and mean width. The exact algorithm (seeded RNG, synthetic heteroscedastic data, k-NN model with k = 60) is in the `<script>` of `v3-project.html` — port it to a client component with SVG. Keep it seeded so numbers are reproducible. Compute once per (method, α) and memoise.

## Photos

Supplied in `docs/photos/`; copy them to `public/images/` during setup. They are already graded (black and white, lifted blacks, fine grain) — do not re-filter:
- `street.jpg` → About panel (home) — portrait, crop `object-position: 50% 30%`
- `rooftop.jpg` → Contact panel
- `laugh.jpg` → About page hero

Use `next/image` with proper `sizes`, meaningful `alt` text (in `docs/content.md`), and `priority` only on the first visible image.

(`harbour.jpg` is no longer used — v5 removed it. Delete `public/images/harbour.jpg`.) Three photos in total: street, rooftop, laugh.

## Motion (v5 — full spec in `docs/design/v5-motion.html`)

- Panels fade in (opacity 0→1, translateY 12px→0) once when they enter the viewport, 400ms ease-out. Panel titles additionally slide up from behind a mask line, 500ms, once.
- **Theme switch = circle reveal**: use the View Transitions API (`document.startViewTransition`) so the new theme spreads as a circle from the centre of the control that was pressed, 900ms, `cubic-bezier(.7,0,.3,1)`. Apply the theme change synchronously inside the transition (`flushSync` / set `data-theme` directly) so the snapshot is correct. Fallback where unsupported or under reduced motion: instant switch.
- **Page transitions**: cross-fade 250ms between routes; a Work tile's title morphs into the project page's large title (shared-element transition with a matching `view-transition-name`). Use Next.js's supported View Transitions integration for this version — check `node_modules/next/dist/docs/` first.
- **Work item hover**: circle marker fills (150ms) and a 1px line draws under the title left→right (350ms).
- **Research abstracts** open/close in place with a 300ms height + fade transition; buttons use `aria-expanded`.
- Nothing else loops, bounces, counts up or parallaxes. With reduced motion, everything appears instantly.

## Character (v5)

- **The random walk is removed (2 Oct 2026).** Delete `CoverWalk.jsx`, `lib/walks.js`, the "Fig. 0" caption and the Redraw button, and anything only they used. The cover is plain: wordmark, "Data science student", label row. No figure or animation on the cover.
- **A — Loading screen** (`Loader.jsx`, client component, mounted once in the root layout; mockup `docs/design/v5-loader.html`):
  - Full-viewport fixed overlay in `--bg`, above everything (including the circle cursor's z-index is fine either way). Contents: "KK©" top-left; "Portfolio ’26" top-right in `--dim`; counter `000 → 100` bottom-left in the wordmark style (weight 300, tracking −0.055em, `clamp(96px, 15vw, 212px)`, tabular numerals); bottom-right label "Loading:" (`--dim`) over "Krish Kalsi — Data science student" (`--strong`), 12px caps.
  - Centre of the screen: a 44px ring. Track 1px `--line`; progress arc 1.5px `--strong` drawn clockwise from 12 o'clock in step with the counter; a 3px dot in the middle.
  - Timeline: 0–1500ms counter and ring run 0→100 (ease-in-out cubic); 1500–1750ms the centre dot grows to fill the ring; 1850–2800ms the overlay is removed with a circular reveal from the screen centre (animate `clip-path`/mask so the real page shows through an expanding circle, `cubic-bezier(.7,0,.3,1)`); then unmount.
  - Rules: plays **only on the first page load of a browser session** (`sessionStorage`), on whichever page is the entry page. Any click, key press, wheel or touch **skips** straight to the reveal. **Not shown at all** under `prefers-reduced-motion`. The page renders and hydrates underneath — the loader must never delay content, LCP or SEO: server-render the page normally and make the loader a purely visual overlay; avoid a flash of the page before the overlay appears (render the overlay in the initial HTML, and remove it instantly with a tiny inline script when the session flag is already set or reduced motion is on).
  - Follows the current theme tokens. `aria-hidden="true"`; lock scroll while it is visible; move focus nowhere (the page keeps normal focus order). It is exempt from the "nothing counts up" rule.
- **B — Circle cursor** (`CircleCursor.jsx`, mounted once in the layout): 16px ring, 1px `#fff` border, `mix-blend-mode: difference`, follows the pointer with easing (lerp 0.22 per animation frame; transform only). Grows to 40px over `a, button`; 56px and filled over elements with `data-cursor="work"` (Work tiles). Enable **only** when `(hover: hover) and (pointer: fine)` matches; hide the native cursor only then. Keep the native text cursor in inputs. Under reduced motion: no easing (snaps). Never blocks clicks (`pointer-events: none`).
- **C — Number scramble: on standby. Do not build** unless Krish asks.

## Rules

- **Never invent facts, numbers, links or achievements.** Every number comes from `docs/content.md`. Anything still marked TODO in content.md (e.g. the CV PDF) stays as a clearly marked placeholder until Krish provides it.
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
