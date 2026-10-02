import { seo, ogAlt } from "@/content/seo";
import { ogSize } from "@/lib/og";
import { profile } from "@/content/profile";

// Child metadata replaces the layout's openGraph/twitter objects rather than
// merging them, so each page passes its full set through here. That also drops
// the inherited cover image, so pages without their own opengraph-image file
// pass `coverImage` to reuse it.
const cover = { url: "/opengraph-image", ...ogSize, alt: ogAlt.home };

export function pageMetadata({ title, description, path, coverImage = false }) {
  const full = seo.titleTemplate.replace("%s", title);
  const images = coverImage ? { images: [cover] } : {};
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: profile.name,
      locale: seo.locale,
      title: full,
      description,
      url: path,
      ...images,
    },
    twitter: { card: "summary_large_image", title: full, description, ...images },
  };
}
