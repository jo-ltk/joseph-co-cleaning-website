export type InstagramMediaKind = "image" | "video" | "carousel";

export type InstagramMediaItem = {
  id: string;
  permalink: string;
  thumbnailUrl: string;
  captionExcerpt: string | null;
  kind: InstagramMediaKind;
  isVideo: boolean;
  timestamp: string;
};

export type InstagramFetchStatus = "success" | "empty" | "error" | "not_configured";

export type InstagramMediaResult = {
  status: InstagramFetchStatus;
  items: InstagramMediaItem[];
  errorMessage?: string;
};
