// Absolute origin for canonical URLs, the sitemap, robots.txt and OG images.
// Set NEXT_PUBLIC_SITE_URL once the domain is chosen; until then Vercel's
// production URL is used, and localhost in development.
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercel ? `https://${vercel}` : "http://localhost:3000")
).replace(/\/$/, "");
