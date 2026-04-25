"use client";

import { useState } from "react";
import { publications } from "@/data/v2/publications";

export function PublicationsSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="v2-container border-t border-foreground/8 py-24">
      <h2 id="publications-title" className="v2-section-title">
        Research Publications
      </h2>
      <p className="mt-2 max-w-xl text-sm text-foreground/55">
        Credible, without a dense wall of text.
      </p>
      <ul className="mt-12 space-y-0 divide-y divide-foreground/10">
        {publications.map((p) => {
          const open = openId === p.id;
          return (
            <li key={p.id} className="py-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 max-w-3xl">
                  <h3 className="text-base font-medium leading-snug text-foreground sm:text-lg">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/55">{p.summary}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-foreground/40">
                  {p.year}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-foreground/70 underline decoration-foreground/25 underline-offset-4 transition hover:text-foreground"
                  >
                    Source
                  </a>
                )}
                <button
                  type="button"
                  className="text-sm text-foreground/60 underline decoration-foreground/20 underline-offset-4 hover:text-foreground/90"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : p.id)}
                >
                  {open ? "Hide" : "Problem · Method · Outcome"}
                </button>
              </div>
              {open && (
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-md border border-foreground/10 bg-foreground/[0.02] p-3">
                    <p className="font-mono text-[10px] uppercase text-foreground/40">
                      Problem
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/70">
                      {p.problem}
                    </p>
                  </div>
                  <div className="rounded-md border border-foreground/10 bg-foreground/[0.02] p-3">
                    <p className="font-mono text-[10px] uppercase text-foreground/40">
                      Method
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/70">
                      {p.method}
                    </p>
                  </div>
                  <div className="rounded-md border border-foreground/10 bg-foreground/[0.02] p-3">
                    <p className="font-mono text-[10px] uppercase text-foreground/40">
                      Outcome
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/70">
                      {p.outcome}
                    </p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
