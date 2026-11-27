import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import "../app/globals.css";
import MotionProvider from "@/components/motion/MotionProvider";
import PresentationRouteExtras from "@/components/PresentationRouteExtras";
import GoogleTagManager, { GoogleTagManagerNoScript } from "@/components/analytics/GoogleTagManager";
import ConversionLinkTracker from "@/components/analytics/ConversionLinkTracker";
// import PremiumSupportAssistant from "@/components/PremiumSupportAssistant";
import { Toaster } from "sonner";
import { defaultDescription, defaultTitle, seoKeywords, siteIcons, siteName, siteUrl } from "@/lib/seo";
import {
  jsonLdScript,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: seoKeywords,
  icons: siteIcons,
  applicationName: siteName,
  category: "Cleaning Services",
  // NOTE: no root-level canonical / openGraph.url. A root canonical is inherited by
  // every page that does not set its own, which would point them all at the homepage.
  // Each route sets its own canonical via buildMetadata().
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSchemas = [organizationSchema(), localBusinessSchema(), websiteSchema()];

  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <GoogleTagManagerNoScript />
        <GoogleTagManager />
        <ConversionLinkTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(globalSchemas)}
        />
        <MotionProvider>
          <main className="relative w-full overflow-x-hidden">
            {children}
          </main>
          <PresentationRouteExtras />
          {/* <PremiumSupportAssistant /> */}
          <Toaster position="bottom-right" richColors />
        </MotionProvider>
      </body>
    </html>
  );
}
