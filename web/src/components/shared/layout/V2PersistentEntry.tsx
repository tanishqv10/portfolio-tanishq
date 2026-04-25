"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { getV2Href, isExternalHref } from "@/lib/shared/routes";

type V2PersistentEntryProps = {
  /** Gated in parent: usually after the user has dismissed the top bar with ×, and the bar is closed. */
  visible: boolean;
};

export default function V2PersistentEntry({ visible }: V2PersistentEntryProps) {
  const router = useRouter();

  const goToV2 = useCallback(() => {
    const href = getV2Href();
    if (isExternalHref(href)) {
      window.location.assign(href);
      return;
    }
    router.push(href);
  }, [router]);

  if (!visible) {
    return null;
  }

  return (
    <div className="pointer-events-auto fixed top-4 left-4 z-[90] sm:top-6 sm:left-6">
      <button
        type="button"
        onClick={goToV2}
        className="rounded-full border border-border/80 bg-card/80 px-3 py-1.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition hover:bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        aria-label="Open redesigned portfolio (v2)"
      >
        Try v2
      </button>
    </div>
  );
}
