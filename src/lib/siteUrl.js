// Absolute origin for canonical URLs, the sitemap, robots.txt and OG images.
// Production builds use the live address; NEXT_PUBLIC_SITE_URL overrides it,
// and development uses localhost.
const PRODUCTION_URL = "https://krishkalsi.vercel.app";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000")
).replace(/\/$/, "");
