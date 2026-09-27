"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { theme as copy } from "@/content/site";
import cx from "@/lib/cx";

const noop = () => () => {};

// Active styling comes from the data-theme attribute via the `light:` variant,
// so the indicator is right on first paint. aria-pressed needs the JS theme,
// which is only known after hydration.
const styles = {
  dark: {
    button: "text-strong light:text-dim",
    dot: "bg-current light:bg-transparent",
  },
  light: {
    button: "text-dim light:text-strong",
    dot: "bg-transparent light:bg-current",
  },
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  return (
    <div role="group" aria-label={copy.label} className="flex gap-[18px]">
      {copy.options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={mounted ? theme === option.value : undefined}
          onClick={() => setTheme(option.value)}
          className={cx(
            "flex min-h-11 cursor-pointer items-center gap-[7px]",
            styles[option.value].button,
          )}
        >
          <span
            aria-hidden="true"
            className={cx(
              "size-[9px] rounded-full border border-current",
              styles[option.value].dot,
            )}
          />
          {option.label}
        </button>
      ))}
    </div>
  );
}
