import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "katex/dist/katex.min.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
const sans = GeistSans;

export const metadata: Metadata = {
  title: "ATLAS // Design Engineer",
  description: "The intersection of logic and light.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${mono.variable} ${sans.variable}`}
    >
      <body className="bg-background selection:bg-accent antialiased selection:text-black">
        <div className="noise-overlay" />
        <CustomCursor />

        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
