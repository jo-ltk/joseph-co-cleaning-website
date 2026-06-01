/** Public profile used only server-side for Graph API and permalinks — never surfaced in UI copy. */
export const INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/joseph_and_co_l.t.d";

export const INSTAGRAM_MEDIA_LIMIT = 12;

/** Cache window: balances freshness with API rate limits. */
export const INSTAGRAM_REVALIDATE_SECONDS = 3600;

export function isInstagramConfigured(): boolean {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  return Boolean(token && token.length > 10);
}
