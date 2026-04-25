"use client";

import {
  SKILL_GROUP_NODE_IDS,
  SYSTEM_EDGES,
  SYSTEM_NODES,
} from "@/lib/v2/systemGraph";
import { MAP_VBH, MAP_VBW, posFor } from "@/lib/v2/systemMapLayout";
import type { TraceState } from "@/lib/v2/systemMapTraceTypes";
import {
  getPathEdgeKeys,
  getSystemPath,
  type SystemPathId,
  undirectedKey,
} from "@/lib/v2/systemPaths";
import { clsx } from "clsx";

const NODE_R = 7.5;
const STROKE_REST = 0.04 * 1.2;
const STROKE_ACTIVE = Math.min(1, 0.86 * 1.2);
const STROKE_DONE = 0.42 * 1.2;
const FILL_REST = 0.26;
const FILL_HOVER = 0.8;
/** Decorative (background) hover — stronger than in-explore hint hover */
const FILL_HOVER_DECORATIVE = 0.95;
const FILL_ACTIVE = 0.72;
const DECOR_HIT_R = 22;

const NODE_BY_ID = new Map(SYSTEM_NODES.map((n) => [n.id, n]));

function isEdgeInCompletedPaths(
  k: string,
  completedPathIds: readonly SystemPathId[]
): boolean {
  for (const id of completedPathIds) {
    const p = getSystemPath(id);
    if (p && getPathEdgeKeys(p).has(k)) return true;
  }
  return false;
}

export type SystemMapVisualProps = {
  variant: "decorative" | "explore";
  completedPathIds: readonly SystemPathId[];
  activeLitKeySet: Set<string>;
  trace: TraceState;
  hoveredId: string | null;
  focusId: string | null;
  reduceMotion: boolean;
  mobileLayout: boolean;
  skillSet: Set<string>;
  debugMode: boolean;
  backgroundIsQuiet: boolean;
  /** Gutter hovers in decorative mode (pointer-events on hit circle only) */
  onDecorativeNodeEnter?: (id: string) => void;
  onDecorativeNodeLeave?: (id: string) => void;
  className?: string;
};

export function SystemMapVisual({
  variant,
  completedPathIds,
  activeLitKeySet,
  trace,
  hoveredId,
  focusId,
  reduceMotion,
  mobileLayout,
  skillSet,
  debugMode,
  backgroundIsQuiet,
  onDecorativeNodeEnter,
  onDecorativeNodeLeave,
  className,
}: SystemMapVisualProps) {
  const lineTransition = {
    transition: "opacity 0.5s ease, stroke-width 0.35s ease",
  };

  const nextHintId = ((): string | null => {
    if (variant === "decorative") return null;
    if (trace.kind === "idle") return null;
    if (trace.kind === "middle_hint") return trace.startNodeId;
    const p = getSystemPath(trace.pathId);
    if (!p || p.nodeIds.length <= 1) return null;
    if (trace.nextIndex >= p.nodeIds.length) return null;
    return p.nodeIds[trace.nextIndex]!;
  })();

  return (
    <svg
      className={clsx("h-full w-full pointer-events-none select-none", className)}
      viewBox={`0 0 ${MAP_VBW} ${MAP_VBH}`}
      preserveAspectRatio="xMidYMid meet"
      role="presentation"
      aria-hidden
    >
      {SYSTEM_EDGES.map((e) => {
        const a = NODE_BY_ID.get(e.from);
        const b = NODE_BY_ID.get(e.to);
        if (!a || !b) return null;
        const p1 = posFor(a);
        const p2 = posFor(b);
        const ek = `${e.from}:${e.to}`;
        const u = undirectedKey(e.from, e.to);
        const active = activeLitKeySet.has(u);
        const done = isEdgeInCompletedPaths(u, completedPathIds);
        let opacity = STROKE_REST;
        if (active) opacity = STROKE_ACTIVE;
        else if (done) opacity = STROKE_DONE;
        const w = active ? 1.1 : 0.5;
        const decorativeEdgeMult =
          variant === "decorative" ? (done ? 0.9 : 0.64) : 1;
        return (
          <line
            key={ek}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            style={lineTransition}
            stroke="var(--v2-map-accent, currentColor)"
            strokeWidth={w}
            opacity={
              opacity * (backgroundIsQuiet ? 0.85 : 1) * decorativeEdgeMult
            }
          />
        );
      })}

      {SYSTEM_NODES.map((n) => {
        const p = posFor(n);
        const id = n.id;
        /** In decorative mode the map is behind content: only show skill shading in explore. */
        const skillOn = skillSet.size > 0 && variant !== "decorative";
        const skillHi = skillSet.has(id) && skillOn;
        const isDecorativeHover =
          variant === "decorative" && hoveredId === id;
        const isHover = variant === "explore" && hoveredId === id;
        const isFocus = variant === "explore" && focusId === id;
        const isNext = nextHintId === id;
        const isStartPulse =
          variant === "explore" &&
          trace.kind === "middle_hint" &&
          id === trace.startNodeId;
        let isBack = false;
        let isAct = false;
        if (variant === "explore" && trace.kind === "tracing") {
          const path = getSystemPath(trace.pathId);
          if (path) {
            isBack =
              trace.nextIndex > 0 &&
              path.nodeIds[trace.nextIndex - 1] === id;
            isAct =
              trace.nextIndex < path.nodeIds.length &&
              path.nodeIds[trace.nextIndex] === id;
          }
        }

        const fillW =
          isDecorativeHover
            ? FILL_HOVER_DECORATIVE
            : (isHover || isFocus) && !isNext
              ? FILL_HOVER
              : isNext || (isAct && (isHover || isFocus))
                ? FILL_ACTIVE
                : isBack
                  ? FILL_REST * 1.1
                  : FILL_REST;
        const fill = Math.min(
          0.98,
          (() => {
            if (isDecorativeHover) {
              return (FILL_HOVER_DECORATIVE + (debugMode ? 0.04 : 0)) * 1.12;
            }
            if (variant === "decorative") {
              return (fillW + (debugMode ? 0.04 : 0)) * 0.88;
            }
            return (
              (skillOn
                ? (skillHi ? 0.45 : 0.12)
                : fillW + (debugMode ? 0.04 : 0)) * 1.2
            );
          })()
        );

        return (
          <g key={id} transform={`translate(${p.x},${p.y})`}>
            {variant === "explore" && (isNext || isStartPulse) && !reduceMotion && (
              <circle
                className={clsx(
                  (isStartPulse || isNext) && "v2-map-hint-pulse"
                )}
                r={18 * 0.9}
                fill="none"
                stroke="var(--v2-map-accent)"
                strokeWidth={0.55}
                style={
                  mobileLayout ? { animationDuration: "2.6s" } : undefined
                }
              />
            )}
            {variant === "explore" &&
              (isNext || isStartPulse) &&
              reduceMotion && (
                <circle
                  r={18 * 0.88}
                  fill="none"
                  stroke="var(--v2-map-accent)"
                  strokeWidth={0.5}
                  strokeOpacity={0.4}
                />
              )}
            <circle
              r={NODE_R + (isNext ? 0.4 : 0) + (skillOn && skillHi ? 1.2 : 0) + (isDecorativeHover ? 0.5 : 0)}
              style={{
                pointerEvents: "none",
                transition:
                  "fill-opacity 0.2s ease, stroke-opacity 0.2s ease, stroke-width 0.2s ease",
              }}
              fill="var(--v2-graph-node, currentColor)"
              fillOpacity={
                fill *
                (backgroundIsQuiet ? 0.9 : 1) *
                0.95 *
                (variant === "decorative" && !isDecorativeHover ? 0.75 : 1)
              }
              stroke="var(--v2-map-accent, var(--v2-graph-stroke, currentColor))"
              strokeWidth={isDecorativeHover ? 0.65 : 0.4}
              strokeOpacity={
                isDecorativeHover ? 0.55 : variant === "decorative" ? 0.2 : 0.3
              }
            />
            <text
              y={20}
              textAnchor="middle"
              className="pointer-events-none font-mono text-[11.5px] sm:text-[13px]"
              style={{
                opacity: (() => {
                  if (variant === "decorative" && isDecorativeHover) return 0.85;
                  if (variant === "explore" && (isHover || isFocus)) return 0.8;
                  return 0.18;
                })(),
                transition: "opacity 0.2s ease",
              }}
              fill="currentColor"
              fillOpacity={0.7}
            >
              {n.label}
            </text>
            {variant === "decorative" &&
              onDecorativeNodeEnter &&
              onDecorativeNodeLeave && (
                <circle
                  r={DECOR_HIT_R}
                  fill="transparent"
                  className="pointer-events-auto cursor-default"
                  onMouseEnter={() => onDecorativeNodeEnter(id)}
                  onMouseLeave={() => onDecorativeNodeLeave(id)}
                />
              )}
          </g>
        );
      })}
    </svg>
  );
}
