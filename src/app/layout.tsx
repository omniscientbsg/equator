import type { Metadata } from "next";
import { Inter, Inter_Tight, DM_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Display grotesk — closest free match to produx's proprietary "AtAero".
// Exposed via --font-dm-serif so globals.css's --font-display keeps resolving.
const interTight = Inter_Tight({
  variable: "--font-dm-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// Mono — produx uses "DM Mono".
const dmMono = DM_Mono({
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Equator Property Managers | Retail Turnkey & Facility Management India",
  description: "ISO 9001 & 45001 certified. Retail store execution, technical facility services, and housekeeping solutions. PAN India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-black text-white selection:bg-white/20">
        <main className="flex-grow flex flex-col">{children}</main>
      </body>
    </html>
  );
}
