import { businessContact, siteName, siteUrl, absoluteUrl } from "@/lib/seo";
import type { PortfolioRecord, ReviewRecord } from "@/types/portfolio";

type JsonLd = Record<string, unknown>;

const sameAs = [
  "https://www.facebook.com/people/JosephCo-Ltd/61572054301932/",
  "https://www.instagram.com/joseph_and_co.l.t.d",
];

export function jsonLdScript(schema: JsonLd | JsonLd[]) {
  return {
    __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
  };
}

// ─────────────────────────────────────────────
// Organization
// ─────────────────────────────────────────────

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    email: businessContact.email,
    telephone: businessContact.phone,
    // ✅ Added: logo helps Google Knowledge Panel and rich results
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/logo.png"),
      width: 200,
      height: 200,
    },
    sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: businessContact.phone,
        contactType: "customer service",
        areaServed: "GB",
        availableLanguage: "en-GB",
      },
    ],
  };
}

// ─────────────────────────────────────────────
// Local Business
// ─────────────────────────────────────────────

export function localBusinessSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "CleaningService"],
    "@id": `${siteUrl}/#localbusiness`,
    name: siteName,
    url: siteUrl,
    email: businessContact.email,
    telephone: businessContact.phone,
    priceRange: "££",
    image: absoluteUrl("/images/hero-wall.png"),
    // ✅ Added: logo reference
    logo: absoluteUrl("/images/logo.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: "32 Willow Man Road",
      addressLocality: "Bridgwater",
      addressRegion: "Somerset",
      postalCode: "TA6 4HW",
      addressCountry: "GB",
    },
    // ✅ Added: geo coordinates (update with exact lat/lng from Google Maps)
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.1279,
      longitude: -2.9928,
    },
    // ✅ Added: opening hours for Google Business Profile alignment
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
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "AdministrativeArea", name: "Somerset" },
      { "@type": "AdministrativeArea", name: "Devon" },
      { "@type": "AdministrativeArea", name: "Gloucestershire" },
      { "@type": "City", name: "Bristol" },
    ],
    serviceType: [
      "End of tenancy cleaning",
      "Deep cleaning",
      "Residential cleaning",
      "Commercial cleaning",
      "Office cleaning",
      "Carpet cleaning",
      "Appliance cleaning",
      "Garden cleaning",
      "After builders cleaning",
    ],
    sameAs,
  };
}

// ─────────────────────────────────────────────
// Website
// ─────────────────────────────────────────────

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/portfolio?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

// ─────────────────────────────────────────────
// Cleaning Service
// ─────────────────────────────────────────────

export function cleaningServiceSchema(path = "/services"): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#cleaning-service`,
    name: "Professional cleaning services",
    provider: {
      "@id": `${siteUrl}/#localbusiness`,
    },
    areaServed: "United Kingdom",
    serviceType:
      "Residential, commercial, office, deep and end of tenancy cleaning",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/contact"),
    },
  };
}

// ─────────────────────────────────────────────
// Breadcrumb
// ─────────────────────────────────────────────

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

// ─────────────────────────────────────────────
// Portfolio / Case Study
// ─────────────────────────────────────────────

export function portfolioCaseStudySchema(
  portfolio: PortfolioRecord,
  reviews: ReviewRecord[] = [],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(`/portfolio/${portfolio.slug}`)}#case-study`,
    headline: `${portfolio.title} ${portfolio.serviceType} case study`,
    description: portfolio.resultSummary,
    image: [absoluteUrl(portfolio.coverImage.url)],
    datePublished: portfolio.completionDate,
    // ✅ Fixed: was using createdAt — should be updatedAt for accurate freshness signal
    dateModified: (portfolio as any).updatedAt ?? portfolio.completionDate,
    author: {
      "@id": `${siteUrl}/#organization`,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    about: {
      "@type": "Service",
      name: portfolio.serviceType,
      areaServed: portfolio.location,
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.landlordName,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.comment,
      publisher: review.company,
    })),
  };
}

// ─────────────────────────────────────────────
// ✅ NEW: FAQ Schema
// Use on any page that has a FAQ section.
// Renders FAQ answers directly in Google search results.
//
// Usage (in your page.tsx):
//   <script
//     type="application/ld+json"
//     dangerouslySetInnerHTML={jsonLdScript(faqSchema([
//       { question: "Are you insured?", answer: "Yes, fully insured." },
//     ]))}
//   />
// ─────────────────────────────────────────────

export function faqSchema(
  faqs: Array<{ question: string; answer: string }>,
): JsonLd {
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

// ─────────────────────────────────────────────
// ✅ NEW: Aggregate Review / Star Rating Schema
// Use on homepage or services page.
// Renders ⭐ star ratings in Google search results — big CTR boost.
// Only use with real, verifiable reviews.
//
// Usage:
//   <script
//     type="application/ld+json"
//     dangerouslySetInnerHTML={jsonLdScript(aggregateRatingSchema({
//       ratingValue: 4.9,
//       reviewCount: 87,
//     }))}
//   />
// ─────────────────────────────────────────────

export function aggregateRatingSchema({
  ratingValue,
  reviewCount,
}: {
  ratingValue: number;
  reviewCount: number;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
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