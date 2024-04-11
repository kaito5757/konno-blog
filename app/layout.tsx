import { siteMetaData } from "@/contexts/meta-data";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../css/globals.css";
import SectionContainer from "@/components/common/SectionContainer";
import { Header } from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ThemeProviders from "@/components/header/ThemeProviders";

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
    <html
      lang="ja"
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between font-sans">
              <Header />
              <main className="mb-auto">{children}</main>
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  );
}
