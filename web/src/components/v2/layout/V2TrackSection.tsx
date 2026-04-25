"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { V2SectionId } from "@/components/v2/layout/v2-context";
import { useV2 } from "@/components/v2/layout/v2-context";

export function V2TrackSection({
  id,
  "aria-label": ariaLabel,
  children,
}: {
  id: Exclude<V2SectionId, null>;
  "aria-label"?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { setActiveSection } = useV2();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.2) {
            setActiveSection(id);
          }
        }
      },
      { threshold: [0, 0.15, 0.3, 0.45] }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [id, setActiveSection]);

  return (
    <section
      id={id}
      ref={ref}
      className="v2-section"
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}
