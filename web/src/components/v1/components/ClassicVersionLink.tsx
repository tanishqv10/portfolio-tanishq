import Link from "next/link";
import { getV1Href, isExternalHref } from "@/lib/shared/routes";

const linkClass =
  "font-medium text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-2 transition hover:decoration-[var(--accent)]";

/**
 * Minimal path back to the classic (v1) portfolio for v2 surfaces. Configure via
 * `NEXT_PUBLIC_V1_PORTFOLIO_URL` when v1 and v2 are on different hosts.
 */
export function ClassicVersionLink() {
  const href = getV1Href();
  if (isExternalHref(href)) {
    return (
      <p className="text-center text-sm text-muted sm:text-left">
        Prefer the classic version?{" "}
        <a href={href} className={linkClass} rel="noreferrer">
          Switch to v1
        </a>
      </p>
    );
  }
  return (
    <p className="text-center text-sm text-muted sm:text-left">
      Prefer the classic version?{" "}
      <Link href={href} className={linkClass}>
        Switch to v1
      </Link>
    </p>
  );
}
