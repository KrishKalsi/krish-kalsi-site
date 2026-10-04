"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

// Keeps <meta name="theme-color"> (the mobile browser's address bar) on the
// current --bg. The site's theme is the visitor's choice, not the OS colour
// scheme, so a media-query theme-color would be wrong for half of them.
function ThemeColor() {
  const { theme } = useTheme();
  useEffect(() => {
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", bg);
  }, [theme]);
  return null;
}

export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      themes={["dark", "light"]}
      enableSystem={false}
    >
      <ThemeColor />
      {children}
    </NextThemesProvider>
  );
}
