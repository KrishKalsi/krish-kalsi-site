"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { menu } from "@/content/site";
import { profile } from "@/content/profile";
import cx from "@/lib/cx";
import { hoverFade } from "@/lib/motion";

const linkBase = cx("flex min-h-11 items-center", hoverFade);

export default function MenuBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isCurrent = (item) =>
    item.section && (pathname === item.section || pathname.startsWith(`${item.section}/`));

  const close = () => setOpen(false);

  return (
    <header
      className="sticky top-0 z-20 border-b border-line bg-bg text-[13px]"
      onKeyDown={(e) => e.key === "Escape" && close()}
    >
      <div className="flex h-11 items-center justify-between px-4 sm:px-8 lg:px-16">
        <nav aria-label="Main" className="flex items-center gap-7">
          <Link
            href={menu.home.href}
            className={cx(linkBase, "font-medium text-strong")}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            {menu.home.label}
          </Link>
          <ul className="hidden items-center gap-7 sm:flex">
            {menu.links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item) ? "page" : undefined}
                  className={cx(linkBase, isCurrent(item) ? "text-strong" : "text-text")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          <span className="hidden text-dim lg:inline">{profile.menuLocation}</span>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex min-h-11 cursor-pointer items-center text-strong sm:hidden"
          >
            {open ? menu.close : menu.open}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label={menu.open} className="border-t border-line sm:hidden">
          <ul>
            {menu.links.map((item) => (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isCurrent(item) ? "page" : undefined}
                  className={cx(
                    linkBase,
                    "px-4 text-base",
                    isCurrent(item) ? "text-strong" : "text-text",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
