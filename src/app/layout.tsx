import type { Metadata, Viewport } from "next";
import { Covered_By_Your_Grace, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/data/portfolio";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
const coveredByYourGrace = Covered_By_Your_Grace({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-covered-by-your-grace",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    url: "/",
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f6f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fonts = [spaceGrotesk, inter, jetbrainsMono, coveredByYourGrace]
    .map((f) => f.variable)
    .join(" ");

  return (
    <html lang="en">
      <body className={`${fonts} font-body antialiased`}>{children}</body>
    </html>
  );
}
