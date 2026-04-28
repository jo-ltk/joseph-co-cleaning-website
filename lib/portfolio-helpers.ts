import type { PortfolioAsset, PortfolioRecord } from "@/types/portfolio";

export function createSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function isPlaceholderValue(value: string | undefined) {
  if (!value) {
    return true;
  }

  return /dummy|changeme|example/i.test(value);
}

export function getPortfolioBeforeImage(portfolio: Pick<PortfolioRecord, "galleryImages">) {
  return portfolio.galleryImages.find((asset) => asset.kind === "before") ?? null;
}

export function getPortfolioAfterImage(portfolio: Pick<PortfolioRecord, "galleryImages">) {
  return portfolio.galleryImages.find((asset) => asset.kind === "after") ?? null;
}

export function getPortfolioDetailImages(portfolio: Pick<PortfolioRecord, "galleryImages">) {
  return portfolio.galleryImages.filter((asset) => asset.kind === "detail");
}

export function getPortfolioStoryImages(portfolio: Pick<PortfolioRecord, "coverImage" | "galleryImages">) {
  const storyImages = [
    portfolio.coverImage,
    ...portfolio.galleryImages.filter((asset) => asset.kind !== "cover"),
  ];

  const seen = new Set<string>();

  return storyImages.filter((asset) => {
    if (seen.has(asset.url)) {
      return false;
    }

    seen.add(asset.url);
    return true;
  });
}

export function collectAssetPublicIds(assets: Array<PortfolioAsset | null | undefined>) {
  return assets
    .map((asset) => asset?.publicId?.trim())
    .filter((publicId): publicId is string => Boolean(publicId));
}
