import { unstable_cache } from "next/cache";

import {
  INSTAGRAM_MEDIA_LIMIT,
  INSTAGRAM_REVALIDATE_SECONDS,
  isInstagramConfigured,
} from "@/lib/instagram-config";
import type {
  InstagramFetchStatus,
  InstagramMediaItem,
  InstagramMediaKind,
  InstagramMediaResult,
} from "@/types/instagram";

const GRAPH_API_VERSION = "v21.0";
const GRAPH_BASE = `https://graph.instagram.com/${GRAPH_API_VERSION}`;

type GraphMediaChild = {
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
};

type GraphMediaNode = {
  id: string;
  caption?: string;
  media_type?: string;
  media_product_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
  children?: { data?: GraphMediaChild[] };
};

type GraphMediaResponse = {
  data?: GraphMediaNode[];
  error?: { message?: string; type?: string; code?: number };
};

function isPlaceholderValue(value: string): boolean {
  const normalized = value.toLowerCase();
  return (
    normalized.includes("your_") ||
    normalized.includes("change-me") ||
    normalized.includes("xxxx")
  );
}

function getAccessToken(): string | null {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  if (!token || isPlaceholderValue(token)) {
    return null;
  }
  return token;
}

function truncateCaption(caption: string | undefined, maxLength = 96): string | null {
  if (!caption?.trim()) {
    return null;
  }

  const normalized = caption.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

function resolveMediaKind(node: GraphMediaNode, prefersVideo: boolean): InstagramMediaKind {
  if (node.media_type === "CAROUSEL_ALBUM") {
    return "carousel";
  }

  if (prefersVideo || node.media_type === "VIDEO" || node.media_product_type === "REELS") {
    return "video";
  }

  return "image";
}

function pickCarouselAsset(children: GraphMediaChild[] | undefined): GraphMediaChild | null {
  if (!children?.length) {
    return null;
  }

  const videoChild = children.find((child) => child.media_type === "VIDEO");
  return videoChild ?? children[0] ?? null;
}

function nodeToMediaItem(node: GraphMediaNode): InstagramMediaItem | null {
  const permalink = node.permalink?.trim();
  if (!permalink) {
    return null;
  }

  const carouselChild =
    node.media_type === "CAROUSEL_ALBUM" ? pickCarouselAsset(node.children?.data) : null;

  const mediaType = carouselChild?.media_type ?? node.media_type;
  const mediaProductType = node.media_product_type;
  const isVideo =
    mediaType === "VIDEO" ||
    mediaProductType === "REELS" ||
    carouselChild?.media_type === "VIDEO";

  const thumbnailUrl =
    (isVideo ? node.thumbnail_url ?? carouselChild?.thumbnail_url : null) ??
    carouselChild?.media_url ??
    carouselChild?.thumbnail_url ??
    node.media_url ??
    node.thumbnail_url;

  if (!thumbnailUrl) {
    return null;
  }

  return {
    id: node.id,
    permalink,
    thumbnailUrl,
    captionExcerpt: truncateCaption(node.caption),
    kind: resolveMediaKind(node, isVideo),
    isVideo,
    timestamp: node.timestamp ?? new Date(0).toISOString(),
  };
}

function sortMediaItems(items: InstagramMediaItem[]): InstagramMediaItem[] {
  return [...items].sort((a, b) => {
    if (a.isVideo !== b.isVideo) {
      return a.isVideo ? -1 : 1;
    }

    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
}

async function resolveInstagramUserId(token: string): Promise<string> {
  const configuredId = process.env.INSTAGRAM_USER_ID?.trim();
  if (configuredId && !isPlaceholderValue(configuredId)) {
    return configuredId;
  }

  const response = await fetch(
    `${GRAPH_BASE}/me?fields=id,username&access_token=${encodeURIComponent(token)}`,
    { next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS } },
  );

  if (!response.ok) {
    throw new Error(`Unable to resolve Instagram account (${response.status}).`);
  }

  const payload = (await response.json()) as { id?: string; error?: { message?: string } };
  if (!payload.id) {
    throw new Error(payload.error?.message ?? "Instagram account id is missing.");
  }

  return payload.id;
}

async function fetchInstagramMediaFromApi(): Promise<InstagramMediaResult> {
  const token = getAccessToken();
  if (!token) {
    return { status: "not_configured", items: [] };
  }

  try {
    const userId = await resolveInstagramUserId(token);
    const fields = [
      "id",
      "caption",
      "media_type",
      "media_product_type",
      "media_url",
      "thumbnail_url",
      "permalink",
      "timestamp",
      "children{media_type,media_url,thumbnail_url}",
    ].join(",");

    const url = new URL(`${GRAPH_BASE}/${userId}/media`);
    url.searchParams.set("fields", fields);
    url.searchParams.set("limit", String(INSTAGRAM_MEDIA_LIMIT));
    url.searchParams.set("access_token", token);

    const response = await fetch(url.toString(), {
      next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS },
    });

    const payload = (await response.json()) as GraphMediaResponse;

    if (!response.ok || payload.error) {
      return {
        status: "error",
        items: [],
        errorMessage:
          payload.error?.message ??
          `Instagram media request failed (${response.status}).`,
      };
    }

    const items = sortMediaItems(
      (payload.data ?? [])
        .map(nodeToMediaItem)
        .filter((item): item is InstagramMediaItem => Boolean(item)),
    );

    if (!items.length) {
      return { status: "empty", items: [] };
    }

    return { status: "success", items };
  } catch (error) {
    console.error("INSTAGRAM_MEDIA_ERROR", error);
    return {
      status: "error",
      items: [],
      errorMessage:
        error instanceof Error ? error.message : "Unable to load latest updates.",
    };
  }
}

const getCachedInstagramMedia = unstable_cache(
  fetchInstagramMediaFromApi,
  ["instagram-media"],
  {
    revalidate: INSTAGRAM_REVALIDATE_SECONDS,
    tags: ["instagram-media"],
  },
);

export async function getLatestInstagramMedia(): Promise<InstagramMediaResult> {
  if (!isInstagramConfigured()) {
    return { status: "not_configured", items: [] };
  }

  return getCachedInstagramMedia();
}

export function instagramStatusLabel(status: InstagramFetchStatus): string {
  switch (status) {
    case "empty":
    case "not_configured":
      return "New highlights will appear here soon.";
    case "error":
      return "We could not load the latest highlights right now. Please check back shortly.";
    default:
      return "";
  }
}
