import { NextResponse } from "next/server";

import { uploadPortfolioAsset } from "@/lib/cloudinary";
import type { PortfolioImageKind } from "@/types/portfolio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedKinds: PortfolioImageKind[] = ["cover", "before", "after", "detail"];

function getRequestedKind(value: FormDataEntryValue | null): PortfolioImageKind {
  if (typeof value !== "string") {
    return "detail";
  }

  return allowedKinds.includes(value as PortfolioImageKind)
    ? (value as PortfolioImageKind)
    : "detail";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const kind = getRequestedKind(formData.get("kind"));
    const files = formData
      .getAll("files")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (!files.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Select at least one image to upload.",
        },
        { status: 400 },
      );
    }

    const assets = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return uploadPortfolioAsset({
          buffer,
          filename: file.name,
          kind,
          folder: `joseph-co/portfolio/${kind}`,
        });
      }),
    );

    return NextResponse.json({
      success: true,
      assets,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Image upload failed. Please try again.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 },
    );
  }
}
