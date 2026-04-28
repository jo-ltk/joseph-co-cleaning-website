export type PortfolioImageKind = "cover" | "before" | "after" | "detail";

export type PortfolioAsset = {
  url: string;
  publicId?: string;
  alt: string;
  kind: PortfolioImageKind;
  width?: number;
  height?: number;
};

export type PortfolioMetric = {
  label: string;
  value: string;
};

export type PortfolioRecord = {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: PortfolioAsset;
  galleryImages: PortfolioAsset[];
  serviceType: string;
  location: string;
  completionDate: string;
  turnaroundTime: string;
  resultSummary: string;
  metrics: PortfolioMetric[];
  featured: boolean;
  createdAt: string;
};

export type ReviewRecord = {
  id: string;
  portfolioId: string;
  landlordName: string;
  company: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
  portfolioTitle?: string;
  portfolioSlug?: string;
};

export type PortfolioMutationInput = {
  id?: string;
  title: string;
  description: string;
  serviceType: string;
  location: string;
  completionDate: string;
  turnaroundTime: string;
  resultSummary: string;
  metrics: PortfolioMetric[];
  featured: boolean;
  coverImage: PortfolioAsset | null;
  beforeImage: PortfolioAsset | null;
  afterImage: PortfolioAsset | null;
  detailGallery: PortfolioAsset[];
};

export type ReviewSubmissionInput = {
  portfolioId: string;
  landlordName: string;
  company: string;
  rating: number;
  comment: string;
};

export type PortfolioCollectionResult = {
  items: PortfolioRecord[];
  source: "database" | "sample";
};

export type AdminPortfolioSnapshot = {
  portfolios: PortfolioRecord[];
  reviews: ReviewRecord[];
  source: "database" | "sample";
  databaseReady: boolean;
  uploadReady: boolean;
};

export type ActionResult<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};
