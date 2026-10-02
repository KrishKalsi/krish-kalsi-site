import { ogImage, ogSize, ogTokens as t, Label } from "@/lib/og";
import { projects } from "@/content/projects";
import { work } from "@/content/work";
import { profile } from "@/content/profile";
import { ogAlt } from "@/content/seo";

export const alt = ogAlt.project;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const project = projects[slug];
  const tile = work.find((w) => w.no === project.no);

  return ogImage({
    top: (
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, color: t.dim }}>
        <span>{profile.name}</span>
        <span>
          ({tile.no}) {tile.area}
        </span>
      </div>
    ),
    middle: (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {project.title.map((line) => (
          <div
            key={line}
            style={{
              fontSize: 156,
              fontWeight: 300,
              lineHeight: 0.86,
              letterSpacing: "-0.055em",
              color: t.strong,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    ),
    bottom: (
      <div style={{ display: "flex", gap: 56 }}>
        {project.meta.map(({ label, value }) => (
          <Label key={label} label={label} value={value} />
        ))}
      </div>
    ),
  });
}
