"use client";

import { useThemeSwitch } from "@/lib/useThemeSwitch";
import { theme } from "@/content/site";
import cx from "@/lib/cx";

// The 10-swatch grey ramp under "KK©" on the cover — a second theme toggle.
// Colours are fixed regardless of theme; the last (darkest) swatch always
// carries the outline, exactly as in the mockup's static markup.
// Class names are spelled out (not built with string concatenation) so
// Tailwind's source scanner can find them.
const swatchClasses = [
  "bg-ramp-1",
  "bg-ramp-2",
  "bg-ramp-3",
  "bg-ramp-4",
  "bg-ramp-5",
  "bg-ramp-6",
  "bg-ramp-7",
  "bg-ramp-8",
  "bg-ramp-9",
  "bg-ramp-10",
];

export default function ThemeRamp({ className }) {
  const switchTheme = useThemeSwitch();

  return (
    <button
      type="button"
      aria-label={theme.rampLabel}
      title={theme.rampTitle}
      onClick={(e) =>
        switchTheme(
          document.documentElement.dataset.theme === "light" ? "dark" : "light",
          e.currentTarget,
        )
      }
      className={cx("relative flex h-[9px] items-center bg-none p-0 cursor-pointer", className)}
    >
      {/* Invisible hit-area expansion to a 44px touch target without affecting layout. */}
      <span aria-hidden="true" className="absolute" style={{ top: -17.5, bottom: -17.5, left: -8, right: -8 }} />
      {swatchClasses.map((swatch, i) => (
        <span
          key={swatch}
          aria-hidden="true"
          className={cx("h-[9px] w-[11px]", swatch, i === swatchClasses.length - 1 && "outline outline-line")}
        />
      ))}
    </button>
  );
}
