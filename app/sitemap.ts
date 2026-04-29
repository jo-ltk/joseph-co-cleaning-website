import type { MetadataRoute } from "next";

import { getPortfolioIndex } from "@/lib/portfolio-queries";
import { siteUrl } from "@/lib/seo";

const publicRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.95, changeFrequency: "monthly" as const },
  { path: "/services/end-of-tenancy-cleaning", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/services/commercial-cleaning", priority: 0.88, changeFrequency: "monthly" as const },
  { path: "/services/deep-cleaning", priority: 0.86, changeFrequency: "monthly" as const },
  { path: "/services/domestic-cleaning", priority: 0.84, changeFrequency: "monthly" as const },
  { path: "/services/after-builders-cleaning", priority: 0.82, changeFrequency: "monthly" as const },
  { path: "/services/industrial-cleaning", priority: 0.76, changeFrequency: "monthly" as const },
  { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/gallery", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/areas-we-cover", priority: 0.82, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.88, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms-of-service", priority: 0.2, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const { items } = await getPortfolioIndex();

  const staticEntries = publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const portfolioEntries = items.map((portfolio) => ({
    url: `${siteUrl}/portfolio/${portfolio.slug}`,
    lastModified: new Date(portfolio.createdAt || portfolio.completionDate),
    changeFrequency: "monthly" as const,
    priority: portfolio.featured ? 0.82 : 0.72,
  }));

  return [...staticEntries, ...portfolioEntries];
}
