import { ViewTransition } from "react";
import { Geist } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import SkipLink from "@/components/SkipLink";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";
import CircleCursor from "@/components/CircleCursor";
import { Analytics } from "@vercel/analytics/next";
import { seo } from "@/content/seo";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/siteUrl";
import { revealScript } from "@/lib/revealScript";
import { loaderScript } from "@/lib/loaderScript";
import Loader from "@/components/Loader";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: seo.titleTemplate },
  description: seo.description,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: profile.name,
    locale: seo.locale,
    title: seo.title,
    description: seo.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#e4e4e0" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body className="bg-bg font-sans text-text antialiased">
        <ThemeProvider>
          {/* First in the body so no page content can paint before it. */}
          <Loader />
          <div id="top" className="flex min-h-dvh flex-col">
            <SkipLink />
            <MenuBar />
            <main
              id="main"
              tabIndex={-1}
              className="flex flex-col gap-4 px-4 pt-4 outline-none sm:gap-10 sm:px-8 sm:pt-8 lg:px-16 lg:pt-12"
            >
              {/* Route changes cross-fade (250ms, globals.css). */}
              <ViewTransition>{children}</ViewTransition>
            </main>
            <Footer />
          </div>
          <CircleCursor />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
