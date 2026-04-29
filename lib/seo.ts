import type { Metadata } from "next";

export const siteUrl = "https://josephcleaning.co.uk";
export const siteName = "Joseph & Co Cleaning Services Ltd";
export const defaultTitle =
  "Professional Cleaning Services UK | Joseph & Co Cleaning";
export const defaultDescription =
  "Joseph & Co Cleaning Services Ltd provides insured residential, commercial, office, deep, carpet, appliance, garden and end of tenancy cleaning across the UK, with fast quotes for landlords, tenants, estate agents, offices and homeowners.";

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

    // ✅ Added: E-E-A-T signals for Google
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,

    alternates: {
      canonical: url,
    },
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

// ─────────────────────────────────────────────
// ✅ NEW: JSON-LD Structured Data Schemas
// Usage: paste <script> tag in layout.tsx or page.tsx
// ─────────────────────────────────────────────

/**
 * LocalBusiness schema — add to root layout.tsx
 * Helps Google show your business in local search, maps, and rich results.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/images/logo.png"),
    image: absoluteUrl("/images/hero-wall.png"),
    telephone: businessContact.phone,
    email: businessContact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "32 Willow Man Road",
      addressLocality: "Bridgwater",
      addressRegion: "Somerset",
      postalCode: "TA6 4HW",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Update these with your exact coordinates
      latitude: 51.1279,
      longitude: -2.9928,
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    priceRange: "££",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      // ✅ Add your social media profile URLs here when you have them
      // "https://www.facebook.com/josephcleaning",
      // "https://www.instagram.com/josephcleaning",
    ],
  };
}

/**
 * Service schema — use on individual service pages
 * Helps Google understand what specific services you offer.
 *
 * @example
 * // In your /services/end-of-tenancy/page.tsx
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({
 *     name: "End of Tenancy Cleaning",
 *     description: "...",
 *     path: "/services/end-of-tenancy",
 *   })) }}
 * />
 */
export function serviceSchema({
  name,
  description,
  path,
  image,
}: {
  name: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    image: image ? absoluteUrl(image) : absoluteUrl("/images/hero-wall.png"),
    provider: {
      "@type": "LocalBusiness",
      name: siteName,
      url: siteUrl,
      telephone: businessContact.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "32 Willow Man Road",
        addressLocality: "Bridgwater",
        addressRegion: "Somerset",
        postalCode: "TA6 4HW",
        addressCountry: "GB",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    serviceType: name,
  };
}

/**
 * FAQ schema — use on pages that have a FAQ section
 * Helps Google show your FAQ answers directly in search results.
 *
 * @example
 * const faqs = [
 *   { question: "Do you provide end of tenancy cleaning?", answer: "Yes, we provide..." },
 * ];
 * <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
 */
export function faqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

/**
 * BreadcrumbList schema — use on all inner pages
 * Helps Google show breadcrumb trails in search results.
 *
 * @example
 * breadcrumbSchema([
 *   { name: "Home", path: "/" },
 *   { name: "Services", path: "/services" },
 *   { name: "End of Tenancy", path: "/services/end-of-tenancy" },
 * ])
 */
export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}

/**
 * Review/AggregateRating schema — use on homepage or services page
 * Helps Google show star ratings in search results (massive CTR boost).
 * Only use this if you have real reviews you can back up.
 *
 * @example
 * reviewSchema({ ratingValue: 4.9, reviewCount: 87 })
 */
export function reviewSchema({
  ratingValue,
  reviewCount,
}: {
  ratingValue: number;
  reviewCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toFixed(1),
      reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
  };
}