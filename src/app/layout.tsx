import type { Metadata, Viewport } from "next";
import { Press_Start_2P, Inter } from "next/font/google";
import "./globals.css";
import { PortfolioModeProvider } from "@/context/PortfolioModeContext";
import { PixelPetProvider } from "@/context/PixelPetContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PixelHanifPet } from "@/components/pet/PixelHanifPet";
import { SITE_CONFIG } from "@/lib/constants";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B1020",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hanif-portfolio.vercel.app"),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "M. Hanif Al Faiz",
    "Informatics",
    "Telkom University Purwokerto",
    "AI Explorer",
    "Smart City",
    "Software Developer",
    "Pixel Portfolio",
    "WattWise AI",
    "Purwokerto Intelligence Layer",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hanif-portfolio.vercel.app",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.identity,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text)] selection:bg-[var(--color-primary)] selection:text-[#0B1020]">
        <PortfolioModeProvider>
          <PixelPetProvider>
            <Navbar />
            <div className="flex-1">{children}</div>
            <PixelHanifPet />
            <Footer />
          </PixelPetProvider>
        </PortfolioModeProvider>
      </body>
    </html>
  );
}
