import mongoose, { Schema, type Model, type Types } from "mongoose";

export type ReviewDocument = {
  portfolioId: Types.ObjectId;
  landlordName: string;
  company: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const ReviewSchema = new Schema<ReviewDocument>(
  {
    portfolioId: {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
      index: true,
    },
    landlordName: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    approved: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

ReviewSchema.index({ portfolioId: 1, approved: 1, createdAt: -1 });

const Review =
  (mongoose.models.Review as Model<ReviewDocument>) ||
  mongoose.model<ReviewDocument>("Review", ReviewSchema);

export default Review;
