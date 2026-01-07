import type { Metadata } from "next";
import { Playfair_Display, Merriweather, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { getChromeSettings } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Tactile Verse | Poems by Vaishnavi",
  description: "A compact, tactile reading room for poems shaped by nature, memory, and slow observation.",
  keywords: ["poetry", "nature", "verse", "tactile", "literature"],
  authors: [{ name: "Vaishnavi" }],
  creator: "Vaishnavi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vaishnavipoetry.me",
    siteName: "The Tactile Verse",
    title: "The Tactile Verse | Poems by Vaishnavi",
    description: "A compact, tactile reading room for poems shaped by nature, memory, and slow observation.",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://vaishnavipoetry.me",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chrome = getChromeSettings();

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${merriweather.variable} ${inter.variable} antialiased bg-paper text-ink`}
      >
        <div className="paper-grid" aria-hidden />
        <Navigation logoText={chrome.logoText} navItems={chrome.nav} />
        <PageTransition>
          <main className="pt-10 pb-16">{children}</main>
        </PageTransition>
        <Footer footerText={chrome.footerText} footerCopyright={chrome.footerCopyright} />
      </body>
    </html>
  );
}
