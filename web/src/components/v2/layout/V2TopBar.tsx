"use client";

import { useState } from "react";
import { V2ClassicLink, V2ClassicPillLink } from "@/components/v2/layout/V2ClassicLink";

export function V2TopBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="pointer-events-none fixed top-4 left-4 z-40 sm:top-6 sm:left-6">
        <div className="pointer-events-auto">
          <V2ClassicPillLink />
        </div>
      </div>
    );
  }

  return (
    <header className="pointer-events-auto sticky top-0 z-30 border-b border-foreground/8 bg-background/75 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="v2-container flex min-h-12 flex-col gap-2 py-2.5 sm:min-h-14 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <p className="min-w-0 text-xs text-foreground/55 sm:text-sm">
          <span className="text-foreground/40">Viewing redesigned portfolio</span>
          <span className="mx-1.5 text-foreground/20" aria-hidden>
            ·
          </span>
          <V2ClassicLink />
        </p>
        <div className="flex shrink-0 items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground/45 transition hover:bg-foreground/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            aria-label="Hide portfolio switcher banner"
          >
            <span className="text-lg leading-none" aria-hidden>
              ×
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
