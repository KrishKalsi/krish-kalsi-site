// Shared motion tokens (CLAUDE.md → Motion).

// Shared view-transition name that morphs a Work tile's title into its
// project page's h1. Both sides derive it from the project's href.
export const titleTransitionName = (href) => `title-${href.split("/").pop()}`;

// Links and panels that dim on hover.
export const hoverFade =
  "transition-opacity duration-150 hover:opacity-70 motion-reduce:transition-none";
