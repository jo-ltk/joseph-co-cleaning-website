import type { Metadata } from "next";

export const siteUrl = "https://josephcleaning.co.uk";
export const siteName = "Joseph & Co Cleaning Services Ltd";
export const defaultTitle =
  "Professional Cleaning Services UK | Joseph & Co Cleaning";
export const defaultDescription =
  "Joseph & Co Cleaning Services Ltd provides insured residential, commercial, office, deep, carpet, appliance, garden, property and end of tenancy cleaning across the UK, with fast quotes for landlords, tenants, estate agents, offices and homeowners.";

export const siteIcons: Metadata["icons"] = {
  icon: [{ url: "/logo.png", type: "image/png" }],
  shortcut: "/logo.png",
  apple: "/logo.png",
};

export const businessContact = {
  name: siteName,
  url: siteUrl,
  email: "josephandcocleaningservicesltd@gmail.com",
  phone: "+447787857305",
  displayPhone: "+44 7787 857305",
  address: "32 Willow Man Road, Bridgwater, TA6 4HW, United Kingdom",
};

export const seoKeywords = [
  "cleaning services UK",
  "professional cleaners UK",
  "end of tenancy cleaning UK",
  "landlord cleaning services",
  "estate agent cleaning",
  "commercial cleaning services UK",
  "office cleaning company",
  "deep cleaning services",
  "residential cleaning services",
  "carpet cleaning",
  "appliance cleaning",
  "garden cleaning",
  "after builders cleaning",
  "move out cleaning",
  "property handover cleaning",
  "property services UK",
  "property management support",
  "letting services",
];

export const serviceKeywords = {
  home: [
    "professional cleaning services UK",
    "residential and commercial cleaning",
    "insured cleaners",
    "same day cleaning quote",
  ],
  services: [
    "end of tenancy cleaning",
    "deep cleaning",
    "office cleaning",
    "commercial cleaning",
    "after builders cleaning",
    "domestic cleaning",
    "property services",
    "property management support",
  ],
  portfolio: [
    "cleaning case studies",
    "end of tenancy cleaning before and after",
    "landlord cleaning proof",
    "commercial cleaning case study",
  ],
  contact: [
    "cleaning quote UK",
    "book professional cleaner",
    "cleaning company near me",
    "urgent cleaning quote",
  ],
};

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = "/images/hero-wall.png",
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [...seoKeywords, ...keywords],
    icons: siteIcons,

    // ✅ Added: E-E-A-T signals for Google
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,

    // noindex pages get no canonical: it would send a contradictory signal.
    alternates: noIndex ? undefined : { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url,
      siteName,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteName} professional cleaning services`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
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
}

export function portfolioMetaDescription({
  title,
  serviceType,
  location,
  resultSummary,
}: {
  title: string;
  serviceType: string;
  location: string;
  resultSummary: string;
}) {
  const base = `${title}: ${serviceType} case study in ${location}. ${resultSummary}`;
  return base.length > 158 ? `${base.slice(0, 155).trim()}...` : base;
}
