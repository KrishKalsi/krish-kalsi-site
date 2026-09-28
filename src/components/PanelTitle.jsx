"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import cx from "@/lib/cx";

// Panel title (72px desktop / 44px mobile) that slides up from behind a mask
// line once as it enters the viewport, 500ms. The text is always in the DOM,
// so screen readers and find-in-page are unaffected.
// As with panelFadeIn, the animation props are never removed after mount;
// reduced motion collapses them onto the final position instead.
export default function PanelTitle({ as: Tag = "h2", className, children }) {
  const animate = useReducedMotion() !== true;
  // Watch the mask, not the text: the text starts fully clipped by the mask,
  // so an observer on it would report 0% visible and never fire.
  const mask = useRef(null);
  const inView = useInView(mask, { once: true, amount: 0.5 });

  return (
    <Tag
      className={cx(
        "text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-strong",
        className,
      )}
    >
      {/* Padding keeps descenders (the p in Experience) inside the mask; the
          negative margin gives the space back so layout is unchanged. */}
      <span ref={mask} className="-mb-[0.18em] block overflow-hidden pb-[0.18em]">
        <motion.span
          className="block"
          initial={{ y: animate ? "110%" : "0%" }}
          animate={{ y: inView || !animate ? "0%" : "110%" }}
          transition={{ duration: animate ? 0.5 : 0, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  );
}
