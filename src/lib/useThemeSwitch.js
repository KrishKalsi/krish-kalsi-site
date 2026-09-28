"use client";

import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

// Theme switch as a circle reveal (CLAUDE.md → Motion): the new theme spreads
// from the centre of the pressed control via the View Transitions API.
// Unsupported browsers and reduced motion get an instant switch.
export function useThemeSwitch() {
  const { setTheme } = useTheme();

  return (next, origin) => {
    const html = document.documentElement;
    if (html.dataset.theme === next) return;

    // Applied synchronously so the transition's "new" snapshot already has the
    // new colours and the updated aria-pressed state.
    const apply = () => {
      html.dataset.theme = next;
      html.style.colorScheme = next;
      flushSync(() => setTheme(next));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce || !origin) {
      apply();
      return;
    }

    const box = origin.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    html.classList.add("theme-reveal");
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      html.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 900,
          easing: "cubic-bezier(.7,0,.3,1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
    transition.finished.finally(() => html.classList.remove("theme-reveal"));
  };
}
