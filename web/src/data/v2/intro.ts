export const introProfile: {
  location: string;
  /** Headshot: file in `public/v2/`. Shown in About. Set `null` for monogram only. */
  portraitSrc: string | null;
  portraitAlt: string;
  monogram: string;
  /** Visual zoom; `1.15` = 15% scale-up (tighter head crop). Tweak 1.05–1.25. */
  portraitZoom: number;
  /** Focal point for `object-position` (headshots often `50% 15%`–`50% 30%`). */
  portraitFocal: string;
} = {
  location: "Bay Area, CA",
  portraitSrc: "/v2/intro-portrait.jpeg",
  portraitAlt: "Tanishq Varshney",
  monogram: "TV",
  portraitZoom: 1.23,
  portraitFocal: "50% 22%",
};
