import Link from "next/link";
import { getV1Href, isExternalHref } from "@/lib/shared/routes";

const inlineClass =
  "font-medium text-foreground/80 underline decoration-foreground/25 underline-offset-4 transition hover:text-foreground";

const pillClass =
  "inline-flex items-center justify-center rounded-full border border-border/80 bg-card/80 px-3 py-1.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition hover:bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

/** Inline v2-only back link to the classic (v1) experience (e.g. top bar). */
export function V2ClassicLink() {
  const href = getV1Href();
  if (isExternalHref(href)) {
    return (
      <a href={href} className={inlineClass} rel="noreferrer">
        Switch to classic
      </a>
    );
  }
  return (
    <Link href={href} className={inlineClass}>
      Switch to classic
    </Link>
  );
}

/** Same as V2ClassicLink, chip style (matches v1 “Try v2” control). */
export function V2ClassicPillLink() {
  const href = getV1Href();
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={pillClass}
        rel="noreferrer"
        aria-label="Switch to classic portfolio"
      >
        Switch to classic
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={pillClass}
      aria-label="Switch to classic portfolio"
    >
      Switch to classic
    </Link>
  );
}
