import type { PortfolioRecord, ReviewRecord } from "@/types/portfolio";

export function serializePortfolio(document: any): PortfolioRecord {
  return {
    id: String(document._id),
    title: document.title,
    slug: document.slug,
    description: document.description,
    coverImage: {
      url: document.coverImage.url,
      publicId: document.coverImage.publicId || null,
      alt: document.coverImage.alt || "",
      kind: document.coverImage.kind || "cover",
      width: typeof document.coverImage.width === "number" ? document.coverImage.width : null,
      height: typeof document.coverImage.height === "number" ? document.coverImage.height : null,
    },
    galleryImages: Array.isArray(document.galleryImages)
      ? document.galleryImages.map((asset: any) => ({
          url: asset.url,
          publicId: asset.publicId || null,
          alt: asset.alt || "",
          kind: asset.kind || "detail",
          width: typeof asset.width === "number" ? asset.width : null,
          height: typeof asset.height === "number" ? asset.height : null,
        }))
      : [],
    serviceType: document.serviceType,
    location: document.location,
    completionDate: new Date(document.completionDate).toISOString(),
    turnaroundTime: document.turnaroundTime,
    resultSummary: document.resultSummary,
    metrics: Array.isArray(document.metrics)
      ? document.metrics.map((metric: any) => ({
          label: metric.label,
          value: metric.value,
        }))
      : [],
    featured: Boolean(document.featured),
    createdAt: new Date(document.createdAt).toISOString(),
    // New detailed case study fields
    propertyType: document.propertyType || "",
    propertySize: document.propertySize || "",
    clientIssue: document.clientIssue || "",
    challenge: document.challenge || "",
    teamSize: document.teamSize || "",
    tasksCompleted: Array.isArray(document.tasksCompleted) ? document.tasksCompleted : [],
    handoverNotes: document.handoverNotes || "",
    trustBadges: Array.isArray(document.trustBadges) ? document.trustBadges : [],
    resultBadge: document.resultBadge || "",
  };
}

export function serializeReview(document: any): ReviewRecord {
  const populatedPortfolio =
    document.portfolioId && typeof document.portfolioId === "object" && "title" in document.portfolioId
      ? document.portfolioId
      : null;

  return {
    id: String(document._id),
    portfolioId: String(populatedPortfolio?._id ?? document.portfolioId),
    landlordName: document.landlordName,
    company: document.company,
    rating: Number(document.rating),
    comment: document.comment,
    approved: Boolean(document.approved),
    createdAt: new Date(document.createdAt).toISOString(),
    portfolioTitle: populatedPortfolio?.title,
    portfolioSlug: populatedPortfolio?.slug,
  };
}
