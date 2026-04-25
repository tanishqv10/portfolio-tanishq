"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getV2BannerDelayMs, isV2Pathname } from "@/lib/shared/routes";
import V2Banner from "@/components/shared/layout/V2Banner";
import V2PersistentEntry from "@/components/shared/layout/V2PersistentEntry";

/**
 * Renders the v2 promo on v1. “Try v2” only appears after the user dismisses the top banner (×);
 * it stays hidden on the first paint until then.
 */
export function V2BannerGate() {
  const pathname = usePathname();
  const [bannerOpen, setBannerOpen] = useState(false);
  const [tryV2Unlocked, setTryV2Unlocked] = useState(false);

  useEffect(() => {
    const delay = getV2BannerDelayMs();
    const t = window.setTimeout(() => {
      setBannerOpen(true);
    }, delay);
    return () => window.clearTimeout(t);
  }, []);

  if (isV2Pathname(pathname)) {
    return null;
  }

  const showTryV2 = tryV2Unlocked && !bannerOpen;

  return (
    <>
      <V2PersistentEntry visible={showTryV2} />
      <V2Banner
        open={bannerOpen}
        onDismiss={() => {
          setBannerOpen(false);
          setTryV2Unlocked(true);
        }}
      />
    </>
  );
}
