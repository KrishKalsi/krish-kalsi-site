import Link from "next/link";
import Panel from "@/components/Panel";
import { notFound } from "@/content/site";
import { hoverFade } from "@/lib/motion";
import cx from "@/lib/cx";

export const metadata = { title: notFound.title };

export default function NotFound() {
  return (
    <Panel as="div" className="min-h-[320px] lg:min-h-[520px]">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-[clamp(72px,9.2vw+36px,168px)] leading-[0.86] font-light tracking-[-0.055em] text-strong">
          {notFound.code}
        </h1>
        <span className="text-xs text-dim uppercase">{notFound.title}</span>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-lg leading-[1.38] text-strong sm:text-[25px]">{notFound.line}</p>
        <Link
          href="/"
          className={cx(
            "inline-flex min-h-11 items-center self-start border border-strong px-[18px] text-xs text-strong uppercase no-underline sm:self-auto",
            hoverFade,
          )}
        >
          {notFound.back}
        </Link>
      </div>
    </Panel>
  );
}
