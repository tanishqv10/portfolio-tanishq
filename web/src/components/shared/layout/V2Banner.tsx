"use client";

import { useCallback, useId } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import {
  V2_BANNER_STORAGE,
  getV2Href,
  isExternalHref,
} from "@/lib/shared/routes";

const storageReady = () =>
  typeof window !== "undefined" && typeof localStorage !== "undefined";

function writeStored(key: string) {
  if (!storageReady()) return;
  try {
    localStorage.setItem(key, "1");
  } catch {
    // ignore private mode / quota
  }
}

type V2BannerProps = {
  open: boolean;
  onDismiss: () => void;
};

export default function V2Banner({ open, onDismiss }: V2BannerProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const regionId = useId();
  const v2Href = getV2Href();

  const goToV2 = useCallback(() => {
    writeStored(V2_BANNER_STORAGE.hasSeen);
    if (isExternalHref(v2Href)) {
      window.location.assign(v2Href);
      return;
    }
    router.push(v2Href);
  }, [router, v2Href]);

  const transition = reduceMotion
    ? { type: "tween" as const, duration: 0.2 }
    : { type: "spring" as const, stiffness: 380, damping: 34, mass: 0.5 };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="v2-banner"
          id={regionId}
          role="region"
          aria-label="Redesigned portfolio preview"
          className="pointer-events-auto fixed top-0 left-0 right-0 z-[100] min-h-11 border-b border-border/80 bg-card/95 py-2 shadow-md backdrop-blur-md supports-[backdrop-filter]:bg-card/85 sm:min-h-12 sm:max-h-14"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={transition}
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col items-stretch justify-center gap-2 px-3 sm:flex-row sm:items-center sm:gap-4 sm:px-4">
            <p className="min-w-0 flex-1 text-center text-sm leading-snug text-foreground sm:text-left">
              ✨ I am testing a redesigned portfolio experience. Want to try v2?
            </p>
            <div className="flex shrink-0 items-center justify-center gap-2 sm:justify-end sm:pl-2">
              <button
                type="button"
                onClick={goToV2}
                className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                Switch to v2
              </button>
              <button
                type="button"
                onClick={onDismiss}
                className="flex h-9 w-9 min-h-[2.5rem] min-w-[2.5rem] shrink-0 items-center justify-center rounded-md text-muted transition hover:bg-foreground/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                aria-label="Dismiss portfolio preview banner"
              >
                <span className="text-xl leading-none" aria-hidden>
                  ×
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
