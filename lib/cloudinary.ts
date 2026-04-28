import { v2 as cloudinary } from "cloudinary";

import { isPlaceholderValue } from "@/lib/portfolio-helpers";
import type { PortfolioAsset, PortfolioImageKind } from "@/types/portfolio";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

let configured = false;

function ensureCloudinaryConfig() {
  if (
    !CLOUDINARY_CLOUD_NAME ||
    !CLOUDINARY_API_KEY ||
    !CLOUDINARY_API_SECRET ||
    isPlaceholderValue(CLOUDINARY_CLOUD_NAME) ||
    isPlaceholderValue(CLOUDINARY_API_KEY) ||
    isPlaceholderValue(CLOUDINARY_API_SECRET)
  ) {
    throw new Error("Cloudinary credentials are not configured.");
  }

  if (configured) {
    return cloudinary;
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });

  configured = true;

  return cloudinary;
}

function createAssetAlt(filename: string) {
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createPublicId(filename: string) {
  const cleanName = filename
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  
  return `${cleanName}-${Date.now()}`;
}

export function isCloudinaryConfigured() {
  return Boolean(
    CLOUDINARY_CLOUD_NAME &&
      CLOUDINARY_API_KEY &&
      CLOUDINARY_API_SECRET &&
      !isPlaceholderValue(CLOUDINARY_CLOUD_NAME) &&
      !isPlaceholderValue(CLOUDINARY_API_KEY) &&
      !isPlaceholderValue(CLOUDINARY_API_SECRET),
  );
}

export async function uploadPortfolioAsset({
  buffer,
  filename,
  folder = "joseph-co/portfolio",
  kind = "detail",
  alt,
}: {
  buffer: Buffer;
  filename: string;
  folder?: string;
  kind?: PortfolioImageKind;
  alt?: string;
}): Promise<PortfolioAsset> {
  const client = ensureCloudinaryConfig();

  return new Promise((resolve, reject) => {
    const upload = client.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        public_id: createPublicId(filename),
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload did not return a result."));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          alt: alt ?? createAssetAlt(filename),
          kind,
          width: result.width,
          height: result.height,
        });
      },
    );

    upload.end(buffer);
  });
}

export async function deleteCloudinaryAssets(publicIds: string[]) {
  if (!publicIds.length || !isCloudinaryConfigured()) {
    return;
  }

  try {
    const client = ensureCloudinaryConfig();
    await client.api.delete_resources(publicIds);
  } catch (error) {
    // Log error but don't throw to prevent breaking DB transactions
    console.error("CLOUDINARY_DELETE_ERROR", error);
  }
}
