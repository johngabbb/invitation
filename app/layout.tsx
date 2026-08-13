import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

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
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {/* No site-wide nav — she moves through the story with the button on
            each page. The menu is rendered by /letter alone, once she's
            reached the end and everything is fair game. */}
        <main>{children}</main>
      </body>
    </html>
  );
}
