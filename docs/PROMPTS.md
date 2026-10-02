# Build prompts — paste these into Claude Code one at a time

Open Claude Code in this folder (`~/Desktop/my-website`), either in the Claude desktop app's Code tab or in Terminal:

```
cd ~/Desktop/my-website
claude
```

Before each step: type `/model` and pick **Opus** for steps 1, 5 and 8; Sonnet is fine for the others. Press **Shift+Tab** to switch into **plan mode** when a step says so. Read the plan, then approve it.

After each step: open http://localhost:3000, look at it in both themes and at phone width (Chrome → View → Developer → Developer Tools → device toolbar), then tell Claude what to fix. When it looks right, say **"commit this"**.

---

## Step 1 — Set up the project (plan mode, Opus)

```
Read CLAUDE.md, docs/content.md and the four mockups in docs/design/. Then set up the project exactly as CLAUDE.md describes: Next.js App Router in JavaScript (no TypeScript), Tailwind, Geist via next/font, next-themes with dark as default, and motion. This folder already has CLAUDE.md and docs/, so run create-next-app in a temporary subfolder and move the result up to the root without overwriting CLAUDE.md or docs/. Copy docs/photos/* to public/images/ with the file names CLAUDE.md lists. Put the design tokens in globals.css for both themes and wire them into Tailwind. Initialise git and make the first commit. Start the dev server and tell me the URL. Show me your plan first.
```

## Step 2 — Menu bar, theme switch, footer

```
Build the shared layout: the sticky 44px menu bar (/KrishKalsi, Work, Research, About, CV, Contact on the left; Dark/Light toggle with circle indicators and "Mumbai, IST" on the right), the footer, a skip-to-content link and the page container with its padding. Also build a reusable Panel component and a CircleMarker component exactly as CLAUDE.md specifies. The theme must persist across reloads with no flash. Match docs/design/v3-home-desktop.html.
```

## Step 3 — Home page (plan mode)

```
Build the home page from docs/design/v3-home-desktop.html using content from docs/content.md: Cover panel (huge wordmark, "Data science student", the four-column label row, the KK© grey ramp that also toggles the theme, "Portfolio ’26"), About panel with the street photo, Work panel with the six items, Research panel with the harbour photo, Experience panel, Contact panel with the rooftop photo. Put all copy in src/content/ data files. Use the mobile mockup docs/design/v3-home-mobile.html for widths under 640px and 2-column grids between 640 and 1023px.
```

Then run:
```
/impeccable critique
```
Read the feedback, tell Claude which points to fix, then:
```
/impeccable audit
```

## Step 4 — About page

```
Build /about from docs/design/v3-about.html with content from docs/content.md, reusing Panel and CircleMarker. Add /cv as a redirect to /cv/krish-kalsi-cv.pdf (the PDF itself is still TODO — show a clear placeholder if it's missing).
```

## Step 5 — Project page with the interactive figure (plan mode, Opus)

```
Build /work/[slug] as a project template and create the conformal-prediction entry from docs/design/v3-project.html and docs/content.md. Port the Fig. 1 algorithm from the <script> in v3-project.html into a client component that draws the chart in plain SVG (no chart library): seeded data, k-NN model with k = 60, split conformal and CQR, α of 0.05/0.10/0.20, and the four readouts. Numbers must match the mockup for the same settings. Render the two formulas with KaTeX. Make the chart responsive and keyboard-accessible, and give it a text description for screen readers.
```

## Step 6 — Motion and polish

```
Add the motion from CLAUDE.md: panels fade in once on scroll, 300ms theme cross-fade, circle markers fill on hover. Everything must switch off under prefers-reduced-motion. Then check every page at 1440, 768 and 390px in both themes and fix anything that overflows, wraps badly or loses contrast.
```

## Step 6.5 — v5 update: formal Research, motion & character (plan mode, Opus)

```
We're upgrading the site to v5. Re-read CLAUDE.md (the Pages, Photos, Motion and Character sections changed) and docs/content.md (Research and Cover figure sections), and open docs/design/v5-home-desktop.html, v5-home-mobile.html and v5-motion.html. Then, as separate commits:
1. Research: remove the harbour photo (and delete public/images/harbour.jpg) and rebuild the Research panel as the full-width formal publication list with Abstract toggles, content from docs/content.md.
2. Work tiles: circle fills and a 1px underline draws on hover; add data-cursor="work".
3. CoverWalk: the random-walk figure behind the name with the Fig. 0 caption and Redraw button, new seed per visit, generated after mount.
4. CircleCursor: the ring cursor, fine-pointer devices only.
5. Motion: circle-reveal theme switch via View Transitions, page cross-fades, the Work-title → project-title morph, and the panel-title mask reveals.
Everything must respect prefers-reduced-motion and keep keyboard/screen-reader behaviour intact. Do not build the number scramble (option C). Show me your plan first, then check every change at 1440, 768 and 390px in both themes.
```

Then check in the browser: move the mouse around, hover Work items, switch Dark/Light, press Redraw, open an abstract, and click into the conformal prediction project and back.

## Step 7 — SEO and performance

```
Add per-page metadata, an Open Graph image generated with next/og in the cover style, sitemap.js, robots.js, Person JSON-LD on the home page and @vercel/analytics. Run a production build and a Lighthouse check, and get all four scores to 95 or above.
```

## Step 7.5 — Remove the random walk, add the loading screen (plan mode, Opus)

```
Two changes. Re-read the Character section of CLAUDE.md and the Cover and Loading screen sections of docs/content.md, and open docs/design/v5-loader.html (the loader mockup; its script has the exact timeline) plus the updated v5-home-desktop.html and v5-home-mobile.html. Then, as two separate commits:
1. Remove the random walk completely: CoverWalk.jsx, lib/walks.js, the Fig. 0 caption and Redraw button, and any CSS or helpers only they used. The cover goes back to the plain wordmark layout in the v5 mockup.
2. Add the loading screen exactly as CLAUDE.md specifies: counter 000→100, the centre ring that draws, fills and then opens the page with a circular reveal; first load of a session only; skippable by any click, key, wheel or touch; not shown under reduced motion; never delays the real content. Check there is no flash of the page before the overlay, and no flash of the overlay on later navigations or refreshes in the same session.
Show me your plan first. Afterwards run lint and build, check 1440, 768 and 390px in both themes, and re-run Lighthouse to confirm the scores did not drop.
```

Then test it: open the site in a new tab (loader plays), refresh (loader should not play), close the tab and open a new one (plays again), and click during the loader (it should skip).

## Step 8 — Final review (Opus)

```
/impeccable polish
```
then:
```
Review the whole project as a senior engineer doing a pre-launch check against CLAUDE.md. List anything not production-ready — including every remaining TODO — then fix what you can one item at a time.
```

## Step 9 — Go live

1. Fill in the TODOs yourself: GitHub and LinkedIn URLs in `src/content/`, and your CV PDF at `public/cv/krish-kalsi-cv.pdf`.
2. In Claude Code:
   ```
   Create a GitHub repository called krish-kalsi-site, push this project to it, and tell me the next steps to deploy it on Vercel.
   ```
3. On vercel.com: sign in with GitHub → **Add New → Project** → pick the repo → **Deploy**. Every future push redeploys automatically.
4. Optional: buy a domain (e.g. krishkalsi.com) and add it under the project's **Settings → Domains**.
5. Submit `https://<your-domain>/sitemap.xml` in Google Search Console.

## Adding a new project later

```
Add a new project to src/content/projects.js: [paste your notes]. Give it a project page using the same template as conformal-prediction and link its Work tile to it. Use only the numbers I gave you.
```
