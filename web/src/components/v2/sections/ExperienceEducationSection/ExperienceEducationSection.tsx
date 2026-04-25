"use client";

import { experienceItems } from "@/data/v2/experience";
import { useV2 } from "@/components/v2/layout/v2-context";
import { clsx } from "clsx";

export function ExperienceEducationSection() {
  const { setExperienceHoverId, debugMode } = useV2();

  return (
    <div className="v2-container border-t border-foreground/8 py-24">
      <h2 id="experience-title" className="v2-section-title">
        Experience &amp; Education
      </h2>
      <p className="mt-2 text-sm text-foreground/55">
        What changed when I was in the room.
      </p>
      <ol className="v2-timeline mt-12">
        {experienceItems.map((e) => (
          <li
            key={e.id}
            className="v2-timeline-item"
            onMouseEnter={() => {
              if (e.id === "mercor" || e.id === "ema")
                setExperienceHoverId(e.id);
            }}
            onMouseLeave={() => setExperienceHoverId(null)}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <span
                  className={clsx(
                    "text-xs font-mono uppercase tracking-wider",
                    e.kind === "work"
                      ? "text-foreground/50"
                      : "text-foreground/35"
                  )}
                >
                  {e.kind}
                </span>
                <h3 className="text-base font-medium text-foreground sm:text-lg">
                  {e.role} · {e.company}
                </h3>
              </div>
              <span className="shrink-0 font-mono text-xs text-foreground/40">
                {e.dates}
                {e.location ? ` · ${e.location}` : ""}
              </span>
            </div>
            {e.bullets.length > 0 && (
              <ul className="mt-3 list-inside list-disc text-sm text-foreground/65">
                {e.bullets.map((b) => (
                  <li key={b} className="[text-wrap:balance] pl-0">
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {debugMode && e.debugLabels && (
              <p className="mt-2 font-mono text-[10px] text-foreground/35">
                {e.debugLabels.join(" · ")}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
