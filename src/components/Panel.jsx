import Image from "next/image";
import cx from "@/lib/cx";

const frame = "border border-line bg-panel";

// Padding 28/36/32 (18/18/20 on mobile). Children are pinned to the top and
// bottom with the empty space between; give the panel a min-height to open it up.
const body =
  "flex flex-col justify-between gap-10 px-[18px] pt-[18px] pb-5 sm:px-9 sm:pt-7 sm:pb-8";

export default function Panel({ as: Tag = "section", className, children, ...rest }) {
  return (
    <Tag className={cx(frame, body, className)} {...rest}>
      {children}
    </Tag>
  );
}

// A panel split by a 1px rule: full-height photo on one side, content on the
// other. Below 640px the photo sits on top at `mobileHeight`.
export function PhotoPanel({
  as: Tag = "section",
  photo,
  side = "left",
  mediaWidth = "42%",
  mobileHeight = 440,
  objectPosition = "50% 50%",
  sizes = "(min-width: 640px) 45vw, 100vw",
  priority = false,
  className,
  children,
  ...rest
}) {
  const left = side === "left";

  return (
    <Tag
      className={cx(
        frame,
        "flex flex-col sm:grid",
        left
          ? "sm:grid-cols-[var(--media)_minmax(0,1fr)]"
          : "sm:grid-cols-[minmax(0,1fr)_var(--media)]",
        className,
      )}
      style={{ "--media": mediaWidth, "--media-h": `${mobileHeight}px` }}
      {...rest}
    >
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
          className="object-cover"
          style={{ objectPosition }}
          {...(priority && { loading: "eager", fetchPriority: "high" })}
        />
      </div>
      <div className={body}>{children}</div>
    </Tag>
  );
}
