import { Geist } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
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
      <body className="min-h-dvh bg-bg font-sans text-text antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
