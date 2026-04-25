"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useV2 } from "@/components/v2/layout/v2-context";
import {
  SKILL_GROUP_NODE_IDS,
  SYSTEM_NODES,
} from "@/lib/v2/systemGraph";
import { pathForMiddleNodeHint, startPathsForNode } from "@/lib/v2/systemMapLookup";
import { getSystemPath, type SystemPathId, undirectedKey } from "@/lib/v2/systemPaths";
import type { TraceState } from "@/lib/v2/systemMapTraceTypes";
import { SystemMapVisual } from "./SystemMapVisual";

function useMatchMedia(query: string) {
  return useSyncExternalStore(
    (on) => {
      if (typeof window === "undefined") return () => {};
      const m = window.matchMedia(query);
      m.addEventListener("change", on);
      return () => m.removeEventListener("change", on);
    },
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false),
    () => false
  );
}

const PATH_HINT =
  "This node belongs to a path. Find its starting point.";

export function ExploreMapOverlay() {
  const {
    exploreMapOpen,
    setExploreMapOpen,
    highlightedSkillGroup,
    debugMode,
    backgroundIsQuiet,
    showUnlockToast,
    completedPathIds,
    addCompletedPath,
    setMapEphemeral,
    clearMapEphemeral,
  } = useV2();

  const reduceMotion = useMatchMedia("(prefers-reduced-motion: reduce)");
  const mobileLayout = useMatchMedia("(max-width: 639px)");

  const [trace, setTrace] = useState<TraceState>({ kind: "idle" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);

  const doneSet = useMemo(
    () => new Set(completedPathIds),
    [completedPathIds]
  );

  useEffect(() => {
    if (!exploreMapOpen) {
      setTrace({ kind: "idle" });
      setHoveredId(null);
      setFocusId(null);
      clearMapEphemeral();
    }
  }, [exploreMapOpen, clearMapEphemeral]);

  useEffect(() => {
    if (!exploreMapOpen) return;
    const onWindowKeydown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setExploreMapOpen(false);
    };
    window.addEventListener("keydown", onWindowKeydown);
    return () => window.removeEventListener("keydown", onWindowKeydown);
  }, [exploreMapOpen, setExploreMapOpen]);

  useEffect(() => {
    if (!exploreMapOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [exploreMapOpen]);

  const skillSet = useMemo(() => {
    if (!highlightedSkillGroup) return new Set<string>();
    return new Set(SKILL_GROUP_NODE_IDS[highlightedSkillGroup] ?? []);
  }, [highlightedSkillGroup]);

  const activeLitSet =
    trace.kind === "tracing" ? new Set(trace.activeLit) : new Set<string>();

  const flashPathReset = useCallback(() => {
    setMapEphemeral({ kind: "reset", text: "Path reset" });
  }, [setMapEphemeral]);

  const onNodeAction = useCallback(
    (nodeId: string) => {
      const starts = startPathsForNode(nodeId, doneSet);

      if (trace.kind === "idle") {
        if (starts.length > 0) {
          setTrace({
            kind: "tracing",
            pathId: starts[0]!.id,
            nextIndex: 1,
            activeLit: [],
          });
          clearMapEphemeral();
          return;
        }
        const mid = pathForMiddleNodeHint(nodeId, doneSet);
        if (mid) {
          setTrace({
            kind: "middle_hint",
            pathId: mid.id,
            startNodeId: mid.nodeIds[0]!,
          });
          setMapEphemeral({ kind: "hint", text: PATH_HINT });
          return;
        }
        return;
      }

      if (trace.kind === "middle_hint") {
        if (starts.length > 0) {
          setTrace({
            kind: "tracing",
            pathId: starts[0]!.id,
            nextIndex: 1,
            activeLit: [],
          });
          clearMapEphemeral();
          return;
        }
        if (nodeId === trace.startNodeId) {
          setTrace({
            kind: "tracing",
            pathId: trace.pathId,
            nextIndex: 1,
            activeLit: [],
          });
          clearMapEphemeral();
          return;
        }
        const mid2 = pathForMiddleNodeHint(nodeId, doneSet);
        if (mid2) {
          setTrace({
            kind: "middle_hint",
            pathId: mid2.id,
            startNodeId: mid2.nodeIds[0]!,
          });
          setMapEphemeral({ kind: "hint", text: PATH_HINT });
          return;
        }
        setTrace({ kind: "idle" });
        clearMapEphemeral();
        return;
      }

      if (trace.kind === "tracing") {
        const p = getSystemPath(trace.pathId);
        if (!p) {
          setTrace({ kind: "idle" });
          return;
        }
        const { nextIndex, activeLit } = trace;
        const exp = p.nodeIds[nextIndex]!;
        const back = nextIndex > 0 ? p.nodeIds[nextIndex - 1]! : null;

        if (nodeId === exp) {
          const edge = undirectedKey(
            p.nodeIds[nextIndex - 1]!,
            p.nodeIds[nextIndex]!
          );
          const newLit = [...activeLit, edge];
          if (nextIndex === p.nodeIds.length - 1) {
            addCompletedPath(p.id);
            setTrace({ kind: "idle" });
            showUnlockToast(p);
            clearMapEphemeral();
            return;
          }
          setTrace({
            kind: "tracing",
            pathId: p.id,
            nextIndex: nextIndex + 1,
            activeLit: newLit,
          });
          clearMapEphemeral();
          return;
        }
        if (back !== null && nodeId === back) return;
        setTrace({ kind: "idle" });
        clearMapEphemeral();
        flashPathReset();
        return;
      }
    },
    [
      trace,
      doneSet,
      addCompletedPath,
      showUnlockToast,
      setMapEphemeral,
      clearMapEphemeral,
      flashPathReset,
    ]
  );

  const onKey = useCallback(
    (e: ReactKeyboardEvent, nodeId: string) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      onNodeAction(nodeId);
    },
    [onNodeAction]
  );

  if (!exploreMapOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[160] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-labelledby="v2-explore-map-title"
    >
      <button
        type="button"
        className="absolute inset-0 z-0 cursor-default bg-background/75 backdrop-blur-sm"
        aria-label="Close explore map"
        onClick={() => setExploreMapOpen(false)}
      />

      <div
        className="relative z-10 flex h-full min-h-0 w-full flex-1 flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 z-0 bg-background/25" aria-hidden />

        <div className="relative z-[1] min-h-0 flex-1 w-full">
          <SystemMapVisual
            variant="explore"
            completedPathIds={completedPathIds}
            activeLitKeySet={activeLitSet}
            trace={trace}
            hoveredId={hoveredId}
            focusId={focusId}
            reduceMotion={reduceMotion}
            mobileLayout={mobileLayout}
            skillSet={skillSet}
            debugMode={debugMode}
            backgroundIsQuiet={backgroundIsQuiet}
            className="h-full w-full"
          />
          <div className="absolute inset-0 z-10">
            {SYSTEM_NODES.map((n) => (
              <button
                key={n.id}
                type="button"
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--v2-map-accent)] h-12 w-12 min-h-[40px] min-w-[40px] touch-manipulation sm:h-9 sm:w-9"
                style={{
                  left: `${n.x * 100}%`,
                  top: `${n.y * 100}%`,
                }}
                aria-label={`Node ${n.label}. Click to trace.`}
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() =>
                  setHoveredId((h) => (h === n.id ? null : h))
                }
                onFocus={() => setFocusId(n.id)}
                onBlur={() => setFocusId((f) => (f === n.id ? null : f))}
                onClick={() => {
                  setHoveredId(n.id);
                  onNodeAction(n.id);
                }}
                onKeyDown={(e) => onKey(e, n.id)}
              />
            ))}
          </div>
        </div>

        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-3 px-4 pt-4 sm:px-6 sm:pt-5"
        >
          <div className="pointer-events-auto max-w-[min(100%,32rem)] rounded-md border border-foreground/12 bg-background/80 px-3 py-2 shadow-sm backdrop-blur-sm">
            <h2
              id="v2-explore-map-title"
              className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/55"
            >
              System map
            </h2>
            <p className="mt-0.5 text-sm text-foreground/75">
              Click nodes in order from each path’s start. Press Esc to exit.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExploreMapOpen(false)}
            className="pointer-events-auto shrink-0 rounded-md border border-foreground/15 bg-background/90 px-3 py-1.5 font-mono text-xs text-foreground/80 shadow-sm backdrop-blur-sm transition hover:bg-foreground/5"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
