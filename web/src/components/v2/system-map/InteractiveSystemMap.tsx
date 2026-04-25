"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { useV2 } from "@/components/v2/layout/v2-context";
import { SKILL_GROUP_NODE_IDS } from "@/lib/v2/systemGraph";
import { SystemMapVisual } from "@/components/v2/system-map/SystemMapVisual";
import { clsx } from "clsx";

function InteractiveSystemMapInner() {
  const {
    debugMode,
    highlightedSkillGroup,
    experienceHoverId,
    backgroundIsQuiet,
    completedPathIds,
  } = useV2();

  const [scrimPos, setScrimPos] = useState(() =>
    typeof window === "undefined"
      ? { x: 0, y: 0 }
      : { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 }
  );
  const [decorativeHoveredId, setDecorativeHoveredId] = useState<string | null>(
    null
  );
  const onDecorativeNodeEnter = useCallback((id: string) => {
    setDecorativeHoveredId(id);
  }, []);
  const onDecorativeNodeLeave = useCallback((id: string) => {
    setDecorativeHoveredId((h) => (h === id ? null : h));
  }, []);

  useEffect(() => {
    const m = (e: MouseEvent) => {
      setScrimPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", m, { passive: true });
    return () => window.removeEventListener("mousemove", m);
  }, []);

  const skillSet = useMemo(() => {
    if (!highlightedSkillGroup) return new Set<string>();
    return new Set(SKILL_GROUP_NODE_IDS[highlightedSkillGroup] ?? []);
  }, [highlightedSkillGroup]);

  const scrimBase =
    "color-mix(in oklch, var(--background) 22%, transparent)";
  const scrimEdge =
    "color-mix(in oklch, var(--background) 32%, transparent)";
  const cursorHole = `radial-gradient(ellipse 220px 200px at ${scrimPos.x}px ${scrimPos.y}px, transparent 0%, transparent 20%, ${scrimBase} 55%, ${scrimEdge} 100%)`;
  const scrimStyle: CSSProperties = {
    background: cursorHole,
  };

  return (
    <div
      className="v2-system-map pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0">
        <SystemMapVisual
          variant="decorative"
          completedPathIds={completedPathIds}
          activeLitKeySet={new Set()}
          trace={{ kind: "idle" }}
          hoveredId={decorativeHoveredId}
          focusId={null}
          reduceMotion={false}
          mobileLayout={false}
          skillSet={skillSet}
          debugMode={debugMode}
          backgroundIsQuiet={backgroundIsQuiet}
          onDecorativeNodeEnter={onDecorativeNodeEnter}
          onDecorativeNodeLeave={onDecorativeNodeLeave}
          className="h-full w-full"
        />
      </div>

      <div
        className="absolute inset-0 z-[3] mix-blend-normal pointer-events-none"
        style={scrimStyle}
        aria-hidden
      />

      <ExperienceLabelsOverlay
        companyId={experienceHoverId}
        debug={debugMode}
        quiet={backgroundIsQuiet}
      />
    </div>
  );
}

export function InteractiveSystemMap() {
  return <InteractiveSystemMapInner />;
}

function ExperienceLabelsOverlay({
  companyId,
  debug,
  quiet,
}: {
  companyId: string | null;
  debug: boolean;
  quiet: boolean;
}) {
  const labels =
    companyId === "mercor"
      ? ["eval_pipeline", "trace_id", "batch", "dashboard"]
      : companyId === "ema"
        ? ["RBAC", "auth_flow", "permissions", "Cognito"]
        : null;
  if (!labels) return null;
  const o = debug ? "opacity-80" : "opacity-30";
  return (
    <div
      className={clsx(
        "pointer-events-none fixed bottom-20 left-4 z-[7] flex max-w-sm flex-wrap gap-1.5",
        o,
        quiet && "opacity-20"
      )}
    >
      {labels.map((l) => (
        <span
          key={l}
          className="font-mono text-[10px] uppercase tracking-wider text-foreground/60"
        >
          {l}
        </span>
      ))}
    </div>
  );
}
