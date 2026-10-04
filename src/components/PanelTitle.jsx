import cx from "@/lib/cx";

// Panel title (72px desktop / 44px mobile) that slides up from behind a mask
// line once as it enters the viewport, 500ms (data-reveal="title", see
// revealScript.js). The text is always in the DOM and visible without JS, so
// screen readers and find-in-page are unaffected.
export default function PanelTitle({ as: Tag = "h2", className, children }) {
  return (
    <Tag
      className={cx(
        "text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-strong",
        className,
      )}
    >
      {/* The observer watches the mask, not the text: the text starts fully
          clipped by the mask, so it would never report as visible. Padding
          keeps descenders (the p in Experience) inside the mask; the negative
          margin gives the space back so layout is unchanged. */}
      <span
        data-reveal="title"
        // The reveal script adds data-revealed before React hydrates.
        suppressHydrationWarning
        className="-mb-[0.18em] block overflow-hidden pb-[0.18em]"
      >
        <span className="block">{children}</span>
      </span>
    </Tag>
  );
}
