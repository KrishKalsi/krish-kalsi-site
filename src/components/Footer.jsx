import { footer } from "@/content/site";
import { hoverFade } from "@/lib/motion";
import cx from "@/lib/cx";

export default function Footer() {
  return (
    <footer className="mt-auto flex items-center justify-between px-4 pt-1 pb-4 text-[11px] uppercase text-dim sm:px-8 lg:px-16 lg:pt-3.5 lg:pb-[22px] lg:text-xs">
      <span>{footer.copyright}</span>
      <span className="hidden sm:inline">{footer.credit}</span>
      <a href="#top" className={cx("flex min-h-11 items-center", hoverFade)}>
        {footer.backToTop}
      </a>
    </footer>
  );
}
