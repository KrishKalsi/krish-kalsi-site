import Link from "next/link";
import Panel from "@/components/Panel";
import { projectLabels } from "@/content/projects";
import { profile } from "@/content/profile";

// Projects without their own page yet link to GitHub, as their Work tiles do.
export default function NextProjectPanel({ next }) {
  const linkProps = next.external
    ? { as: "a", href: profile.github, target: "_blank", rel: "noopener noreferrer" }
    : { as: Link, href: next.href };

  return (
    <Panel
      {...linkProps}
      className="min-h-[180px] text-strong transition-opacity duration-150 hover:opacity-70 motion-reduce:transition-none lg:min-h-[240px]"
    >
      <span className="text-xs text-dim uppercase">
        {projectLabels.next} — {next.no}
      </span>
      <span className="flex items-baseline justify-between gap-6 text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em]">
        <span>{next.title}</span>
        <span aria-hidden="true">→</span>
      </span>
      {next.external && <span className="sr-only">{projectLabels.opensGithub}</span>}
    </Panel>
  );
}
