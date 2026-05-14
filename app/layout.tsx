import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import "../app/globals.css";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SmoothScroll from "@/components/SmoothScroll";
import MobileExperienceNotice from "@/components/MobileExperienceNotice";
import PremiumSupportAssistant from "@/components/PremiumSupportAssistant";
import { Toaster } from "sonner";
import { defaultDescription, defaultTitle, seoKeywords, siteName, siteUrl } from "@/lib/seo";
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
  applicationName: siteName,
  category: "Cleaning Services",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(globalSchemas)}
        />
        <SmoothScroll>
          <main className="relative w-full overflow-x-hidden">
            {children}
          </main>
          <WhatsAppFloat />
          <PremiumSupportAssistant />
          <MobileExperienceNotice />
          <Toaster position="bottom-right" richColors />
        </SmoothScroll>
      </body>
    </html>
  );
}
