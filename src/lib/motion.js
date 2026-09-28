// Shared motion tokens (CLAUDE.md → Motion).

// Shared view-transition name that morphs a Work tile's title into its
// project page's h1. Both sides derive it from the project's href.
export const titleTransitionName = (href) => `title-${href.split("/").pop()}`;

// Links and panels that dim on hover.
export const hoverFade =
  "transition-opacity duration-150 hover:opacity-70 motion-reduce:transition-none";

// Panels fade in once as they enter the viewport: opacity 0→1, translateY
// 12px→0, 400ms ease-out. Pass `reduce` from useReducedMotion() (true, false,
// or null before it resolves) to collapse `initial` onto the visible target
// and drop the duration to 0, so content appears instantly.
//
// `whileInView` is never removed once mounted — motion doesn't re-run
// `initial` on a later render, so stripping the whole config once `reduce`
// resolves to true would leave a not-yet-visible panel stuck at its (already
// applied) hidden `initial` state with nothing left to animate it back.
export function panelFadeIn(reduce) {
  const animate = reduce !== true;
  return {
    initial: animate ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: animate ? 0.4 : 0, ease: "easeOut" },
  };
}
