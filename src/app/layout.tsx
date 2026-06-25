import type { Metadata } from "next";
import { Inter, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChromeFrame from "@/components/layout/ChromeFrame";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
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
      className={`${inter.variable} ${dmSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll>
          <ChromeFrame>
            <Navbar />
          </ChromeFrame>
          <main className="flex-grow flex flex-col">{children}</main>
          <ChromeFrame>
            <Footer />
          </ChromeFrame>
        </SmoothScroll>
      </body>
    </html>
  );
}
