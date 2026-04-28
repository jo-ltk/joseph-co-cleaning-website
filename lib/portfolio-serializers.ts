import type { PortfolioRecord, ReviewRecord } from "@/types/portfolio";

export function serializePortfolio(document: any): PortfolioRecord {
  return {
    id: String(document._id),
    title: document.title,
    slug: document.slug,
    description: document.description,
    coverImage: {
      url: document.coverImage.url,
      publicId: document.coverImage.publicId ?? undefined,
      alt: document.coverImage.alt,
      kind: document.coverImage.kind,
      width: document.coverImage.width ?? undefined,
      height: document.coverImage.height ?? undefined,
    },
    galleryImages: Array.isArray(document.galleryImages)
      ? document.galleryImages.map((asset: any) => ({
          url: asset.url,
          publicId: asset.publicId ?? undefined,
          alt: asset.alt,
          kind: asset.kind,
          width: asset.width ?? undefined,
          height: asset.height ?? undefined,
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
