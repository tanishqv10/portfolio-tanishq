/**
 * Central config for v1 → v2 portfolio routing. Override via env for subdomain split deploys.
 *
 * - NEXT_PUBLIC_V2_PORTFOLIO_URL: v2 target (default `/v2` same app)
 * - NEXT_PUBLIC_V1_PORTFOLIO_URL: "classic" target for back link (default `/`)
 * - NEXT_PUBLIC_V2_BANNER_DELAY_MS: ms before banner appears (default 2500)
 */

const DEFAULT_BANNER_DELAY = 2500;

export const V2_BANNER_STORAGE = {
  /** Set when the user takes the CTA to v2 (optional funnel / analytics; does not hide the promo). */
  hasSeen: "hasSeenV2Banner",
} as const;

export function getV2Href(): string {
  return process.env.NEXT_PUBLIC_V2_PORTFOLIO_URL?.trim() || "/v2";
}

export function getV1Href(): string {
  return process.env.NEXT_PUBLIC_V1_PORTFOLIO_URL?.trim() || "/";
}

export function getV2BannerDelayMs(): number {
  const raw = process.env.NEXT_PUBLIC_V2_BANNER_DELAY_MS;
  if (!raw) return DEFAULT_BANNER_DELAY;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : DEFAULT_BANNER_DELAY;
}

export function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function isV2Pathname(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname === "/v2" || pathname.startsWith("/v2/");
}
