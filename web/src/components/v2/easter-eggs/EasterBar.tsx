"use client";

import { useCallback, useEffect, useId } from "react";
import { useV2 } from "@/components/v2/layout/v2-context";
import { v2Contact } from "@/data/v2/contact";
import { useTypedSequence } from "@/hooks/v2/useTypedSequence";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function EasterBar() {
  const { debugMode, setDebugMode, recruiterOpen, setRecruiterOpen } =
    useV2();
  const dialogId = useId();

  const onDebug = useCallback(() => {
    setDebugMode(true);
  }, [setDebugMode]);
  const onHire = useCallback(() => {
    setRecruiterOpen(true);
  }, [setRecruiterOpen]);

  useTypedSequence({ onDebug, onHire, enabled: true });

  useEffect(() => {
    // One-time; harmless. Easter eggs: type "debug" or "hire" (not inside inputs).
    // eslint-disable-next-line no-console
    console.log("Curious engineer detected. Try typing 'debug'.");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (recruiterOpen) {
          setRecruiterOpen(false);
        } else if (debugMode) {
          setDebugMode(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [recruiterOpen, setRecruiterOpen, debugMode, setDebugMode]);

  return (
    <>
      {debugMode && (
        <div
          className="fixed right-3 top-20 z-[45] sm:right-5 sm:top-24"
          role="status"
        >
          <div className="flex items-center gap-2 rounded-full border border-foreground/15 bg-background/90 px-3 py-1.5 text-xs text-foreground/80 shadow-sm backdrop-blur">
            <span className="font-mono">Debug Mode: ON</span>
            <button
              type="button"
              onClick={() => setDebugMode(false)}
              className="rounded border border-foreground/20 px-2 py-0.5 font-mono text-[10px] hover:bg-foreground/5"
            >
              Exit
            </button>
          </div>
        </div>
      )}

      {recruiterOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-background/60 p-4 backdrop-blur-sm sm:items-center"
          onMouseDown={() => setRecruiterOpen(false)}
          role="presentation"
        >
          <div
            id={dialogId}
            role="dialog"
            aria-modal
            aria-labelledby={`${dialogId}-title`}
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl border border-foreground/12 bg-background p-6 shadow-xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h2
              id={`${dialogId}-title`}
              className="text-lg font-semibold text-foreground"
            >
              Recruiter mode
            </h2>
            <p className="mt-1 text-sm text-foreground/55">
              Fast path to what matters. Close with Esc or outside click.
            </p>
            <ol className="mt-4 space-y-2 text-sm text-foreground/75">
              <li>1. Impact: featured projects and production AI systems work</li>
              <li>2. AI systems: skills + architecture flows in the background</li>
              <li>3. Resume & contact: direct links below</li>
            </ol>
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                className="v2-btn-primary w-full"
                onClick={() => {
                  scrollToId("projects");
                  setRecruiterOpen(false);
                }}
              >
                View projects
              </button>
              <button
                type="button"
                className="v2-btn-ghost w-full"
                onClick={() => {
                  scrollToId("experience");
                  setRecruiterOpen(false);
                }}
              >
                View experience
              </button>
              <a
                href={`mailto:${v2Contact.email}`}
                className="v2-btn-ghost block w-full text-center"
                onClick={() => setRecruiterOpen(false)}
              >
                Contact
              </a>
            </div>
            <a
              href="https://drive.google.com/uc?export=download&id=1aon3Z_paT7dyIQey-7QQnUXJJWBJ8fKK"
              target="_blank"
              rel="noreferrer"
              className="mt-3 block w-full text-center text-sm text-foreground/60 underline underline-offset-2"
            >
              Download resume
            </a>
            <button
              type="button"
              onClick={() => setRecruiterOpen(false)}
              className="mt-4 w-full text-center text-xs text-foreground/40"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </>
  );
}
