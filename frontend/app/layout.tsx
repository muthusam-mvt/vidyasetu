import type { Metadata } from "next";
import { Cinzel_Decorative, Crimson_Pro, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const display = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
});

const body = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const deva = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600"],
  variable: "--font-deva",
});

export const metadata: Metadata = {
  title: "Bhāratīya Vidyā Setu — Bridge to Indian Knowledge Systems",
  description:
    "Technology for Indian languages, heritage preservation, digital museums, and public services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${deva.variable}`}>
      <body className="font-body min-h-screen">
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-brass/30 bg-walnut text-parchment/70 py-6 text-center text-sm">
          <p>Design inspired by manuscript tradition · Built for Indian heritage &amp; language tech</p>
        </footer>
      </body>
    </html>
  );
}
