"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import cx from "@/lib/cx";
import { panelFadeIn } from "@/lib/motion";

const frame = "border border-line bg-panel";

// Padding 28/36/32 (18/18/20 on mobile). Children are pinned to the top and
// bottom with the empty space between; give the panel a min-height to open it up.
const body =
  "flex flex-col justify-between gap-10 px-[18px] pt-[18px] pb-5 sm:px-9 sm:pt-7 sm:pb-8";

// `as` is one of these four tags across the whole site. Each is a plain
// module-scope reference — the react-hooks/static-components rule forbids a
// JSX tag whose identifier is computed in the render body (even a lookup),
// so which one renders is chosen by branching, never by assigning a variable.
const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionA = motion.a;
const MotionLink = motion.create(Link);

export default function Panel({ as = "section", className, children, ...rest }) {
  const reduce = useReducedMotion();
  const props = { className: cx(frame, body, className), ...panelFadeIn(reduce), ...rest };

  if (as === Link) return <MotionLink {...props}>{children}</MotionLink>;
  if (as === "a") return <MotionA {...props}>{children}</MotionA>;
  if (as === "div") return <MotionDiv {...props}>{children}</MotionDiv>;
  return <MotionSection {...props}>{children}</MotionSection>;
}

// A panel split by a 1px rule: full-height photo on one side, content on the
// other. Below 640px the photo sits on top at `mobileHeight`.
export function PhotoPanel({
  as = "section",
  photo,
  side = "left",
  mediaWidth = "42%",
  mobileHeight = 440,
  objectPositionClass = "object-center",
  sizes = "(min-width: 640px) 45vw, 100vw",
  priority = false,
  overlay,
  className,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const left = side === "left";

  const props = {
    className: cx(
      frame,
      "flex flex-col sm:grid",
      left
        ? "sm:grid-cols-[var(--media)_minmax(0,1fr)]"
        : "sm:grid-cols-[minmax(0,1fr)_var(--media)]",
      className,
    ),
    style: { "--media": mediaWidth, "--media-h": `${mobileHeight}px` },
    ...panelFadeIn(reduce),
    ...rest,
  };

  const content = (
    <>
      <div
        className={cx(
          "relative h-(--media-h) border-b border-line sm:h-auto sm:border-b-0",
          left ? "sm:border-r" : "sm:order-last sm:border-l",
        )}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className={cx("object-cover", objectPositionClass)}
          {...(priority && { loading: "eager", fetchPriority: "high" })}
        />
        {overlay}
      </div>
      <div className={body}>{children}</div>
    </>
  );

  if (as === Link) return <MotionLink {...props}>{content}</MotionLink>;
  if (as === "a") return <MotionA {...props}>{content}</MotionA>;
  if (as === "div") return <MotionDiv {...props}>{content}</MotionDiv>;
  return <MotionSection {...props}>{content}</MotionSection>;
}
