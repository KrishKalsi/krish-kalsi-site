// Shared motion tokens (CLAUDE.md → Motion).

// Links/panels that dim on hover (150ms) still need to cross-fade their
// theme-driven colours at the site-wide 300ms speed (globals.css). A class
// that sets `transition-property` replaces, rather than merges with, the
// page-wide rule, so both speeds are combined in one declaration here.
export const hoverFade =
  "[transition:opacity_150ms_ease,color_300ms_ease,background-color_300ms_ease,border-color_300ms_ease] hover:opacity-70 motion-reduce:transition-none";

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
