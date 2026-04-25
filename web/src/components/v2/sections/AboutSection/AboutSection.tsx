"use client";

import Image from "next/image";
import { useState } from "react";
import { introProfile } from "@/data/v2/intro";

function scrollToId(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
}

export function AboutSection() {
  const [portraitFailed, setPortraitFailed] = useState(false);
  const showPhoto =
    Boolean(introProfile.portraitSrc) && !portraitFailed;

  return (
    <div className="v2-container py-24 sm:py-32">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-10 lg:gap-14">
        <div className="min-w-0 flex-1">
          <p className="v2-eyebrow mb-3">About</p>
          <h2
            id="about-title"
            className="v2-hero-title max-w-3xl text-balance"
          >
            I build production AI systems.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            Software engineer building full stack systems, from backend
            infrastructure to intelligent AI workflows.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/65 sm:text-base">
            Focused on reliability, performance, and systems that hold up beyond
            the demo.
          </p>
          <p className="mt-6 font-mono text-xs text-foreground/45">
            Previously: Mercor · Ema Health · Quantiphi · USC
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollToId("projects")}
              className="v2-btn-primary"
            >
              View Work
            </button>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="v2-btn-ghost"
            >
              Contact Me
            </button>
          </div>
        </div>

        <div className="flex shrink-0 justify-center self-center">
          <div className="relative aspect-square w-40 sm:w-48">
            <div className="relative h-full w-full overflow-hidden rounded-full border border-foreground/6 bg-background/50 shadow-sm ring-1 ring-foreground/5">
              {showPhoto && introProfile.portraitSrc ? (
                <Image
                  src={introProfile.portraitSrc}
                  alt={introProfile.portraitAlt}
                  fill
                  className="object-cover [transform-origin:50%_40%]"
                  style={{
                    objectFit: "cover",
                    objectPosition: introProfile.portraitFocal,
                    transform: `scale(${introProfile.portraitZoom * 0.92})`,
                  }}
                  sizes="(max-width: 768px) 10rem, 12rem"
                  onError={() => setPortraitFailed(true)}
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  role="img"
                  aria-label={introProfile.portraitAlt}
                >
                  <span className="font-mono text-2xl font-medium tracking-tight text-foreground/30 sm:text-3xl">
                    {introProfile.monogram}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
