import { ViewTransition } from "react";
import { Geist } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import SkipLink from "@/components/SkipLink";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";
import CircleCursor from "@/components/CircleCursor";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Krish Kalsi — Data science, statistics & quant finance",
  description:
    "Personal site of Krish Kalsi, a data science student in Mumbai working on uncertainty quantification, statistical modelling and quantitative finance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="bg-bg font-sans text-text antialiased">
        <ThemeProvider>
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
      </body>
    </html>
  );
}
