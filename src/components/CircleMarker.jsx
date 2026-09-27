import cx from "@/lib/cx";

// 15px circle before every list item. Filled when `filled` (current or
// featured item); otherwise fills on hover/focus of the nearest `group` parent.
export default function CircleMarker({ filled = false, className }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "inline-block size-[15px] shrink-0 rounded-full border transition-colors duration-150 motion-reduce:transition-none",
        filled
          ? "border-strong bg-strong"
          : "border-text bg-transparent group-hover:border-strong group-hover:bg-strong group-focus-visible:border-strong group-focus-visible:bg-strong",
        className,
      )}
    />
  );
}
