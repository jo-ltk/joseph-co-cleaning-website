import mongoose, { Schema, type Model } from "mongoose";

import type { PortfolioAsset, PortfolioMetric } from "@/types/portfolio";

export type PortfolioDocument = {
  title: string;
  slug: string;
  description: string;
  coverImage: PortfolioAsset;
  galleryImages: PortfolioAsset[];
  serviceType: string;
  location: string;
  completionDate: Date;
  turnaroundTime: string;
  resultSummary: string;
  metrics: PortfolioMetric[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const PortfolioAssetSchema = new Schema<PortfolioAsset>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
    },
    alt: {
      type: String,
      required: true,
      trim: true,
    },
    kind: {
      type: String,
      enum: ["cover", "before", "after", "detail"],
      required: true,
      default: "detail",
    },
    width: Number,
    height: Number,
  },
  { _id: false },
);

const PortfolioMetricSchema = new Schema<PortfolioMetric>(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const PortfolioSchema = new Schema<PortfolioDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      type: PortfolioAssetSchema,
      required: true,
    },
    galleryImages: {
      type: [PortfolioAssetSchema],
      default: [],
    },
    serviceType: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    completionDate: {
      type: Date,
      required: true,
    },
    turnaroundTime: {
      type: String,
      required: true,
      trim: true,
    },
    resultSummary: {
      type: String,
      required: true,
      trim: true,
    },
    metrics: {
      type: [PortfolioMetricSchema],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Portfolio =
  (mongoose.models.Portfolio as Model<PortfolioDocument>) ||
  mongoose.model<PortfolioDocument>("Portfolio", PortfolioSchema);

export default Portfolio;
