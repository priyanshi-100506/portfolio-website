import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/portfolio-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://priyanshishah.dev"),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScrollProvider />
        <div className="noise" aria-hidden="true" />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
