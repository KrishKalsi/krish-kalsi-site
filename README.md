# Krish Kalsi — personal website

Portfolio site built with Next.js (App Router, JavaScript), Tailwind CSS and next-themes.
The design rules are in `CLAUDE.md`; all site copy is in `docs/content.md`.

## Run it

```
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production build, as Vercel runs it
```

## Where things live

| Path | What |
|---|---|
| `docs/content.md` | Every word on the site. Edit here first, then mirror it in `src/content/`. |
| `src/content/` | The same copy as JS data. Pages read from these files. |
| `src/app/` | Routes: `/`, `/about`, `/cv`, `/work/[slug]`, plus the 404, sitemap, robots and link-preview images. |
| `src/components/` | Panels and shared pieces (menu bar, loader, circle cursor). |
| `src/lib/` | The Fig. 1 maths, the loader and reveal scripts, metadata helpers. |
| `docs/design/` | Mockups. They are the spec for layout and motion. |
| `public/images/` | The three photos. |

## Still to add

- CV PDF at `public/cv/krish-kalsi-cv.pdf`. Until it exists, `/cv` shows a placeholder and is hidden from search engines.
- Repository links for projects 01–06 and live-demo links for 03 and 06 (`src/content/work.js`, `src/content/projects.js`). Until then the tiles link to the GitHub profile.

## Deploying (Vercel)

- Turn on Analytics in the Vercel project settings.
- Once there is a domain, set `NEXT_PUBLIC_SITE_URL=https://your-domain` in the project's environment variables. It is used for canonical URLs, the sitemap, `robots.txt` and link-preview images. Without it the site uses its `*.vercel.app` address.
