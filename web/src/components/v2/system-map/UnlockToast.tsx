"use client";

import { useV2 } from "@/components/v2/layout/v2-context";
import { clsx } from "clsx";

/**
 * Bottom-right panel: path unlock (priority) or ephemeral hint/reset from explore map.
 * z-200 so it stays above the explore overlay (z-160).
 */
export function UnlockToast() {
  const { unlockToast, mapEphemeral, setExploreMapOpen } = useV2();
  if (unlockToast) {
    const def = unlockToast;
    return (
      <div
        className={clsx(
          "v2-unlock-toast pointer-events-auto",
          "fixed z-[200] w-[min(calc(100vw-1.5rem),22rem)] max-w-full rounded-lg px-4 py-3.5 text-left font-sans text-[13px] leading-snug sm:px-4 sm:py-4"
        )}
        style={{
          right: "max(0.75rem, env(safe-area-inset-right, 0px))",
          bottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
          left: "auto",
          top: "auto",
        }}
        role="status"
        aria-live="polite"
      >
        <p className="v2-eyebrow text-[0.65rem] text-foreground/55">Unlocked</p>
        <p className="mt-1.5 text-base font-semibold tracking-tight text-foreground sm:text-[1.05rem]">
          {def.unlockTitle}
        </p>
        <p className="mt-2 text-[13px] text-foreground/90">{def.unlockBody}</p>
        {def.relatedCtaLabel && def.relatedCtaHref && (
          <p className="mt-3.5 text-[0.75rem] text-foreground/65">
            <a
              href={def.relatedCtaHref}
              className="font-mono text-foreground/80 underline decoration-foreground/30 underline-offset-2 transition hover:text-foreground hover:decoration-foreground/50"
              onClick={() => setExploreMapOpen(false)}
            >
              {def.relatedCtaLabel}
            </a>
          </p>
        )}
      </div>
    );
  }
  if (mapEphemeral) {
    return (
      <div
        className={clsx(
          "v2-unlock-toast pointer-events-none",
          "fixed z-[200] w-[min(calc(100vw-1.5rem),22rem)] max-w-full rounded-lg px-4 py-3.5 text-left font-sans text-[13px] leading-snug sm:px-4 sm:py-4"
        )}
        style={{
          right: "max(0.75rem, env(safe-area-inset-right, 0px))",
          bottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
          left: "auto",
          top: "auto",
        }}
        role="status"
        aria-live="polite"
      >
        <p className="v2-eyebrow text-[0.65rem] text-foreground/50">
          {mapEphemeral.kind === "hint" ? "Path" : "Notice"}
        </p>
        <p className="mt-1.5 text-[13px] text-foreground/88">{mapEphemeral.text}</p>
      </div>
    );
  }
  return null;
}
