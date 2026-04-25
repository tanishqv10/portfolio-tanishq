"use client";

import { skillGroups } from "@/data/v2/skills";
import { useV2 } from "@/components/v2/layout/v2-context";

export function SkillsSection() {
  const { setHighlightedSkillGroup, debugMode } = useV2();

  return (
    <div className="v2-container border-t border-foreground/8 py-24">
      <h2 id="skills-title" className="v2-section-title">
        Technical Skills
      </h2>
      <p className="mt-2 max-w-xl text-sm text-foreground/55">
        Framed as system components, not a random tag list.
        {debugMode && (
          <span className="ml-2 font-mono text-[11px] text-foreground/40">
            implementation paths wire to the graph.
          </span>
        )}
      </p>
      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {skillGroups.map((g) => (
          <div
            key={g.id}
            onMouseEnter={() => setHighlightedSkillGroup(g.id)}
            onMouseLeave={() => setHighlightedSkillGroup(null)}
            onFocus={() => setHighlightedSkillGroup(g.id)}
            onBlur={() => setHighlightedSkillGroup(null)}
            className="group rounded-lg border border-foreground/10 bg-foreground/[0.02] p-6 transition hover:border-foreground/18"
            tabIndex={0}
            role="group"
            aria-label={g.title}
          >
            <h3 className="text-sm font-medium tracking-tight text-foreground">
              {g.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s}>
                  <span className="inline-block rounded-md border border-foreground/10 bg-background/50 px-2.5 py-1 text-xs text-foreground/80">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
            {debugMode && (
              <p className="mt-3 font-mono text-[10px] leading-relaxed text-foreground/35">
                {g.id === "AI Systems" &&
                  "RAG: chunk + embed, eval: offline + online slices, LangFuse hooks."}
                {g.id === "Backend" &&
                  "Async workers, backpressure, idempotent job handlers, typed APIs."}
                {g.id === "Frontend" &&
                  "RSC + client islands, a11y first, static where possible."}
                {g.id === "Infrastructure" &&
                  "IaC patterns, canaries, SLOs, log/trace correlation."}
                {g.id === "Data" &&
                  "Schema design, index strategy, read replicas vs. single-node tradeoffs."}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
