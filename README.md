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
| `src/app/` | Routes: `/`, `/about`, `/work/[slug]`, plus the 404, sitemap, robots and link-preview images. |
| `src/components/` | Panels and shared pieces (menu bar, loader, circle cursor). |
| `src/lib/` | The Fig. 1 maths, the loader and reveal scripts, metadata helpers. |
| `docs/design/` | Mockups. They are the spec for layout and motion. |
| `public/images/` | The three photos. |

## Still to add

- Repository links for projects 01–06 and live-demo links for 03 and 06 (`src/content/work.js`, `src/content/projects.js`). Until then the tiles link to the GitHub profile.

## Deploying (Vercel)

- Turn on Analytics in the Vercel project settings.

## Credits

- Typeface: [Geist](https://vercel.com/font), SIL Open Font License.
- Built with [Next.js](https://nextjs.org), [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com), [next-themes](https://github.com/pacocoursey/next-themes), [Motion](https://motion.dev) and [KaTeX](https://katex.org).
- All photos are my own.
- Built with help from Claude, an AI coding assistant. The design, content and personality are mine.
