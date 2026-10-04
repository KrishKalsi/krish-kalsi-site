import fs from "node:fs";
import path from "node:path";
import { redirect } from "next/navigation";
import Panel from "@/components/Panel";
import { profile } from "@/content/profile";
import { pageSeo } from "@/content/seo";
import { cvPlaceholder } from "@/content/site";
import { pageMetadata } from "@/lib/pageMetadata";

const CV_RELATIVE_PATH = "cv/krish-kalsi-cv.pdf";

const cvExists = () => fs.existsSync(path.join(process.cwd(), "public", CV_RELATIVE_PATH));

// Until the PDF exists this page is a placeholder, so keep it out of search results.
export function generateMetadata() {
  return {
    ...pageMetadata({ ...pageSeo.cv, path: "/cv", coverImage: true }),
    ...(!cvExists() && { robots: { index: false, follow: true } }),
  };
}

export default function CvPage() {
  if (cvExists()) {
    redirect(`/${CV_RELATIVE_PATH}`);
  }

  return (
    <Panel as="div" className="min-h-[320px]">
      <h1 className="text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-strong">
        {cvPlaceholder.title}
      </h1>
      <div>
        <p className="text-lg leading-[1.38] text-strong sm:text-[25px]">{cvPlaceholder.line}</p>
        <p className="mt-4 text-sm text-text sm:text-[15px]">
          {cvPlaceholder.contact}{" "}
          <a
            href={`mailto:${profile.email}`}
            className="text-strong underline decoration-1 underline-offset-4"
          >
            {profile.email}
          </a>
          .
        </p>
      </div>
    </Panel>
  );
}
