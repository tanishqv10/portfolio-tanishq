"use client";

import { useState } from "react";
import { archiveProjects, featuredProjects } from "@/data/v2/projects";
import { useV2 } from "@/components/v2/layout/v2-context";
import { clsx } from "clsx";

export function ProjectsSection() {
  const { setActiveProjectFlow, debugMode } = useV2();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="v2-container border-t border-foreground/8 py-24">
      <h2 id="projects-title" className="v2-section-title">
        Projects
      </h2>
      <p className="mt-2 max-w-xl text-sm text-foreground/55">
        Deep write-ups for key projects, then a grid of the rest of the v1
        stack—same work as the classic site.
      </p>
      <div className="mt-12 space-y-8">
        {featuredProjects.map((p) => {
          const active = openId === p.id;
          return (
            <article
              key={p.id}
              className={clsx(
                "rounded-xl border p-6 transition sm:p-8",
                active
                  ? "border-foreground/25 bg-foreground/[0.03]"
                  : "border-foreground/10 bg-foreground/[0.015] hover:border-foreground/18"
              )}
              onMouseEnter={() => setActiveProjectFlow(p.flowId)}
              onMouseLeave={() => setActiveProjectFlow(null)}
            >
              <h3 className="text-lg font-medium tracking-tight sm:text-xl">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/65">{p.tagline}</p>
              <p className="mt-3 font-mono text-xs text-foreground/45">
                {p.stack}
              </p>
              <p className="mt-4 text-sm text-foreground/75">{p.impact}</p>
              {active && (
                <div className="mt-6 space-y-4 border-t border-foreground/10 pt-5">
                  <div>
                    <p className="v2-eyebrow">What I built</p>
                    <ul className="mt-2 list-inside list-disc text-sm text-foreground/70">
                      {p.whatBuilt.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="v2-eyebrow">Why it matters</p>
                    <p className="text-sm text-foreground/70">{p.whyMatters}</p>
                  </div>
                  {debugMode && (p.tradeoffs || p.failureModes || p.fixes) && (
                    <div className="grid gap-3 border border-foreground/10 bg-background/30 p-4 font-mono text-xs text-foreground/55 sm:grid-cols-2">
                      {p.tradeoffs && <p>Tradeoff: {p.tradeoffs}</p>}
                      {p.failureModes && <p>Failure: {p.failureModes}</p>}
                      {p.fixes && <p>Fix: {p.fixes}</p>}
                      {p.observability && <p>Obs: {p.observability}</p>}
                      {p.metrics && <p>Metrics: {p.metrics}</p>}
                    </div>
                  )}
                </div>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpenId(active ? null : p.id)}
                  className="v2-pill"
                  aria-expanded={active}
                >
                  {active ? "Close case study" : "View case study"}
                </button>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="v2-pill"
                  >
                    GitHub
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="v2-pill"
                  >
                    Live
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {debugMode && (
        <p className="mt-8 text-center font-mono text-[11px] text-foreground/35">
          Active project morphs the background flow graph to match architecture.
        </p>
      )}

      <div className="mt-20 border-t border-foreground/8 pt-16">
        <h3 className="v2-eyebrow">More from GitHub</h3>
        <p className="mt-2 max-w-xl text-sm text-foreground/55">
          The remaining GitHub work from the original carousel: CO-Defender, Stock
          Prediction, AutoFill, and Wheel Decide. MathAI, onlineMRS, and
          GarageMS are expanded in the case studies above.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {archiveProjects.map((p) => (
            <article
              key={p.id}
              className="flex flex-col rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5 transition hover:border-foreground/18"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-base font-medium tracking-tight text-foreground">
                  {p.title}
                </h4>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-foreground/40 transition hover:text-foreground/80"
                  aria-label={`${p.title} on GitHub`}
                >
                  <span aria-hidden className="font-mono text-lg leading-none">
                    ↗
                  </span>
                </a>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
                {p.description}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={clsx("h-2.5 w-2.5 shrink-0 rounded-full", languageDot(p.language))}
                  aria-hidden
                />
                <span className="font-mono text-xs text-foreground/45">
                  {p.language}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <a href={p.github} target="_blank" rel="noreferrer" className="v2-pill">
                  GitHub
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="v2-pill">
                    Live demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function languageDot(language: string) {
  const c: Record<string, string> = {
    Python: "bg-amber-400/90",
    "HTML, CSS, JavaScript": "bg-violet-400/90",
    "Jupyter Notebook": "bg-orange-500/90",
    Swift: "bg-red-500/90",
    "Java, JavaScript": "bg-amber-600/80",
  };
  return c[language] ?? "bg-foreground/35";
}
