import { siteMetaData } from "@/contexts/metadata";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetaData.siteUrl),
  title: {
    default: siteMetaData.title,
    template: `%s | ${siteMetaData.title}`,
  },
  description: siteMetaData.description,
  openGraph: {
    type: "website",
    url: "./",
    title: siteMetaData.title,
    description: siteMetaData.description,
    siteName: siteMetaData.title,
    images: [siteMetaData.ogpImage],
  },
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${siteMetaData.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: siteMetaData.title,
    card: "summary_large_image",
    images: [siteMetaData.ogpImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
