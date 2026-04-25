"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useTheme } from "next-themes";
import { useV2 } from "@/components/v2/layout/v2-context";
import {
  SYSTEM_PATHS,
  type SystemPathId,
} from "@/lib/v2/systemPaths";
import { clsx } from "clsx";

const EXPLORE_KEYWORD = "explore";
const CHECKLIST_LS = "v2-explore-checklist";
const KEY_LEN = EXPLORE_KEYWORD.length;
const PATH_TOTAL = SYSTEM_PATHS.length;
/** Intro dialog opens automatically once on load if the user hasn’t opened Explore yet. */
const AUTO_INTRO_DELAY_MS = 3500;

/** Don’t run the e-x-p-l-o-r-e buffer while the user is editing a field (checkbox etc. is OK). */
const NON_TEXT_INPUT_TYPES = new Set([
  "button",
  "checkbox",
  "color",
  "file",
  "hidden",
  "image",
  "radio",
  "range",
  "reset",
  "submit",
]);

function isTextEntryTarget(t: EventTarget | null) {
  if (!t || !(t instanceof Element)) return false;
  if (t instanceof HTMLElement && t.isContentEditable) return true;
  if (t.closest?.("[contenteditable='true']")) return true;
  const el = t.closest("input,textarea,select");
  if (el instanceof HTMLTextAreaElement) return true;
  if (el instanceof HTMLSelectElement) return true;
  if (el instanceof HTMLInputElement) {
    const ty = el.type;
    if (NON_TEXT_INPUT_TYPES.has(ty)) return false;
    return true;
  }
  return false;
}

function readManualFromStorage(): Set<SystemPathId> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(CHECKLIST_LS);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return new Set();
    const valid = new Set(SYSTEM_PATHS.map((p) => p.id));
    return new Set(
      arr.filter((id): id is SystemPathId => typeof id === "string" && valid.has(id as SystemPathId))
    );
  } catch {
    return new Set();
  }
}

function writeManualToStorage(s: Set<SystemPathId>) {
  try {
    localStorage.setItem(CHECKLIST_LS, JSON.stringify([...s]));
  } catch {
    /* ignore quota */
  }
}

/**
 * EXPLORE side tab (inline start = left in LTR): opens the intro dialog.
 * A few seconds after load, the intro can open by itself; if the user already opened the intro (tab) or
 * the full map (typing “explore”), that auto-open is cancelled for the session.
 * Typing “explore” (no text field focused) opens the full-screen map — works with the intro open or closed.
 */
export function V2ExploreEntry() {
  const { exploreMapOpen, setExploreMapOpen, completedPathIds } = useV2();
  const { resolvedTheme } = useTheme();
  const [clientReady, setClientReady] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);
  const [panelIn, setPanelIn] = useState(false);
  const [manualChecked, setManualChecked] = useState<Set<SystemPathId>>(
    () => new Set()
  );
  const exploreBufferRef = useRef("");
  const autoIntroTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userPreemptedAutoIntroRef = useRef(false);
  const exploreMapOpenRef = useRef(exploreMapOpen);
  exploreMapOpenRef.current = exploreMapOpen;

  const titleId = useId();
  const descId = useId();
  const srTypeHintId = useId();

  const showTab = !introOpen && !exploreMapOpen;

  const cancelAutoIntro = useCallback(() => {
    userPreemptedAutoIntroRef.current = true;
    if (autoIntroTimeoutRef.current !== null) {
      clearTimeout(autoIntroTimeoutRef.current);
      autoIntroTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    autoIntroTimeoutRef.current = setTimeout(() => {
      autoIntroTimeoutRef.current = null;
      if (userPreemptedAutoIntroRef.current) return;
      if (exploreMapOpenRef.current) return;
      setIntroOpen(true);
    }, AUTO_INTRO_DELAY_MS);
    return () => {
      if (autoIntroTimeoutRef.current !== null) {
        clearTimeout(autoIntroTimeoutRef.current);
        autoIntroTimeoutRef.current = null;
      }
    };
  }, []);

  useLayoutEffect(() => {
    setClientReady(true);
  }, []);

  useEffect(() => {
    setManualChecked(readManualFromStorage());
  }, []);

  /** App is in dark mode → use light “day” tab; app is in light mode → use dark “night” tab */
  const useLightTabShell = clientReady && resolvedTheme === "dark";

  useEffect(() => {
    if (!introOpen) {
      setPanelIn(false);
      return;
    }
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPanelIn(true));
    });
    return () => cancelAnimationFrame(t);
  }, [introOpen]);

  useEffect(() => {
    if (!introOpen) {
      exploreBufferRef.current = "";
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [introOpen]);

  const goToMap = useCallback(() => {
    cancelAutoIntro();
    setIntroOpen(false);
    setExploreMapOpen(true);
  }, [cancelAutoIntro, setExploreMapOpen]);

  useEffect(() => {
    if (exploreMapOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && introOpen) {
        setIntroOpen(false);
        exploreBufferRef.current = "";
        return;
      }
      if (isTextEntryTarget(e.target)) return;
      if (e.repeat) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;
      exploreBufferRef.current = (
        exploreBufferRef.current + e.key
      ).slice(-KEY_LEN);
      if (exploreBufferRef.current.toLowerCase() === EXPLORE_KEYWORD) {
        exploreBufferRef.current = "";
        goToMap();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exploreMapOpen, introOpen, goToMap]);

  const doneSet = new Set(completedPathIds);

  const toggleManual = useCallback(
    (id: SystemPathId) => {
      if (completedPathIds.includes(id)) return;
      setManualChecked((prev) => {
        const n = new Set(prev);
        if (n.has(id)) n.delete(id);
        else n.add(id);
        writeManualToStorage(n);
        return n;
      });
    },
    [completedPathIds]
  );

  const checkedCount = SYSTEM_PATHS.filter(
    (p) => doneSet.has(p.id) || manualChecked.has(p.id)
  ).length;

  return (
    <>
      {showTab && (
        <button
          type="button"
          onClick={() => {
            cancelAutoIntro();
            setIntroOpen(true);
          }}
          className={clsx(
            "pointer-events-auto fixed start-0 top-1/2 z-[100] m-0 -translate-y-1/2 outline-none",
            "inline-flex items-center justify-center",
            /* writing-mode on the button breaks top-1/2 + translateY — keep the box in horizontal-tb. */
            /* Physical corners: flush to screen (left in LTR) = 0; inward (right) = rounded. */
            "shrink-0",
            "rounded-tl-none rounded-bl-none rounded-tr-lg rounded-br-lg",
            "border-y border-r border-l-0",
            "py-2.5 pl-0 pr-2.5 sm:py-3.5 sm:pr-3.5",
            "transition-[background-color,box-shadow,color,ring-color] duration-200",
            useLightTabShell
              ? [
                  "border-neutral-300 bg-white text-neutral-900 shadow-md shadow-black/10",
                  "hover:bg-neutral-100 hover:text-neutral-950",
                  "focus-visible:ring-2 focus-visible:ring-amber-500/90",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                ]
              : [
                  "border-neutral-800 bg-neutral-950 text-neutral-100 shadow-md shadow-black/30",
                  "hover:bg-neutral-900 hover:text-white",
                  "focus-visible:ring-2 focus-visible:ring-cyan-400/90",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
                ]
          )}
          style={
            {
              margin: 0,
              paddingInlineStart: "max(0px, env(safe-area-inset-left, 0px))",
            } satisfies CSSProperties
          }
          aria-label="Open explore intro"
        >
          <span
            className="select-none font-mono text-xs font-medium uppercase tracking-[0.3em] sm:text-sm"
            style={{ writingMode: "vertical-rl" } satisfies CSSProperties}
          >
            EXPLORE
          </span>
        </button>
      )}

      {introOpen && (
        <div
          className="pointer-events-auto fixed inset-0 z-[210] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={`${descId} ${srTypeHintId}`}
        >
          <button
            type="button"
            className="absolute inset-0 z-0 cursor-default bg-background/65 backdrop-blur-sm"
            aria-label="Close"
            onClick={() => setIntroOpen(false)}
          />
          <div
            className={clsx(
              "relative z-10 w-full max-w-md rounded-xl border border-foreground/12",
              "bg-background/95 p-5 shadow-2xl backdrop-blur-md sm:p-6",
              "transition duration-500 ease-out",
              "will-change-transform",
              panelIn
                ? "translate-x-0 scale-100 opacity-100"
                : "-translate-x-[min(92vw,24rem)] scale-[0.98] opacity-0"
            )}
          >
            <h2
              id={titleId}
              className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-foreground/55"
            >
              System paths
            </h2>
            <div id={descId} className="mt-2 space-y-2 text-sm leading-relaxed text-foreground/80">
              <p className="text-balance">
                Here’s a small game hidden in the background graph: <strong>10</strong>{" "}
                ordered paths are woven through the same map - each is a way I think about
                building software. Trace a path from its start, node by node, in order, and
                you’ll “unlock” it.
              </p>
              <p>
                When you’re ready, type the word{" "}
                <kbd className="rounded border border-foreground/20 bg-foreground/5 px-1.5 py-0.5 font-mono text-xs text-foreground/85">
                  explore
                </kbd>{" "}
                in order (there’s no text box - just type). That opens the interactive map.{" "}
                <span className="text-foreground/60">
                  Press <kbd className="rounded border border-foreground/15 bg-foreground/5 px-1 py-0.5 font-mono text-[0.7rem]">Esc</kbd>{" "}
                  to close this dialog.
                </span>
              </p>
            </div>
            <p id={srTypeHintId} className="sr-only">
              This dialog has no text field. Type the letters of the word explore in order
              to open the map. You can also press escape to close.
            </p>

            <p className="mt-3 text-xs text-foreground/50">
              Checklist: {checkedCount} of {PATH_TOTAL} paths marked or unlocked in the map
            </p>
            <ul
              className="mt-2 max-h-[min(30vh,220px)] space-y-1.5 overflow-y-auto rounded-md border border-foreground/8 bg-foreground/3 p-2.5"
              aria-label="Path checklist"
            >
              {SYSTEM_PATHS.map((p) => {
                const fromGame = doneSet.has(p.id);
                const checked = fromGame || manualChecked.has(p.id);
                const canToggle = !fromGame;
                return (
                  <li key={p.id}>
                    <label
                      className={clsx(
                        "flex items-start gap-2.5 text-left text-sm",
                        fromGame
                          ? "cursor-default text-foreground/80"
                          : "cursor-pointer text-foreground/80 hover:text-foreground/95"
                      )}
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer rounded border-foreground/30 text-[var(--accent)] focus:ring-2 focus:ring-(--accent)/50 disabled:cursor-not-allowed"
                        checked={checked}
                        disabled={fromGame}
                        onChange={() => toggleManual(p.id)}
                        title={
                          fromGame
                            ? "Unlocked in the system map; cannot be unchecked"
                            : "Mark whether you’ve found this path"
                        }
                        aria-label={`${p.unlockTitle}${fromGame ? ", completed in the map" : ""}`}
                      />
                      <span
                        className={clsx(
                          "min-w-0 flex-1",
                          fromGame && "text-foreground/65",
                          canToggle && checked && "font-medium"
                        )}
                      >
                        {p.unlockTitle}
                        {fromGame && (
                          <span className="ml-1.5 text-[0.65rem] font-mono text-foreground/40">
                            (in-map)
                          </span>
                        )}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIntroOpen(false)}
                className="rounded-md border border-foreground/15 bg-transparent px-3 py-1.5 font-mono text-xs text-foreground/70 transition hover:bg-foreground/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
