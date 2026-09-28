import fs from "node:fs";
import path from "node:path";
import { redirect } from "next/navigation";
import Panel from "@/components/Panel";
import { profile } from "@/content/profile";

const CV_RELATIVE_PATH = "cv/krish-kalsi-cv.pdf";

export const metadata = {
  title: "CV — Krish Kalsi",
  description: "Curriculum vitae of Krish Kalsi.",
};

export default function CvPage() {
  const cvExists = fs.existsSync(path.join(process.cwd(), "public", CV_RELATIVE_PATH));

  if (cvExists) {
    redirect(`/${CV_RELATIVE_PATH}`);
  }

  return (
    <Panel as="div" className="min-h-[320px]">
      <h1 className="text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-strong">
        CV
      </h1>
      <div>
        <p className="text-lg leading-[1.38] text-strong sm:text-[25px]">
          The CV isn’t uploaded yet.
        </p>
        <p className="mt-4 text-sm text-text sm:text-[15px]">
          Reach out directly at{" "}
          <a href={`mailto:${profile.email}`} className="text-strong no-underline">
            {profile.email}
          </a>
          .
        </p>
      </div>
    </Panel>
  );
}
