import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vaishnavi Poetry | A Collection of Nature & Wonder",
  description: "Explore poetry celebrating nature, memory, and the human condition through thoughtful verse and observation.",
  keywords: ["poetry", "nature poetry", "original poetry", "literature", "creative writing"],
  authors: [{ name: "Vaishnavi" }],
  creator: "Vaishnavi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vaishnavipoetry.me",
    siteName: "Vaishnavi Poetry",
    title: "Vaishnavi Poetry | A Collection of Nature & Wonder",
    description: "Explore poetry celebrating nature, memory, and the human condition.",
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
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <Navigation />
        <PageTransition>
          <main className="pt-16">
            {children}
          </main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
