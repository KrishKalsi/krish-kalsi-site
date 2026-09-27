import { skipLink } from "@/content/site";

export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only text-[13px] focus:not-sr-only focus:fixed focus:top-0 focus:left-4 focus:z-30 focus:flex focus:min-h-11 focus:items-center focus:bg-strong focus:px-4 focus:text-bg"
    >
      {skipLink}
    </a>
  );
}
