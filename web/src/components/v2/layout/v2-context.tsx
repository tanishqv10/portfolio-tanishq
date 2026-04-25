"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { SystemPathDef, SystemPathId } from "@/lib/v2/systemPaths";
import type { ProjectFlowId } from "@/lib/v2/systemGraph";

export type V2SectionId =
  | "intro"
  | "about"
  | "skills"
  | "publications"
  | "projects"
  | "experience"
  | "beyond"
  | "contact"
  | null;

type V2Ctx = {
  activeSection: V2SectionId;
  setActiveSection: (s: V2SectionId) => void;
  debugMode: boolean;
  setDebugMode: (v: boolean) => void;
  toggleDebug: () => void;
  recruiterOpen: boolean;
  setRecruiterOpen: (v: boolean) => void;
  highlightedSkillGroup: string | null;
  setHighlightedSkillGroup: (g: string | null) => void;
  activeProjectFlow: ProjectFlowId;
  setActiveProjectFlow: (f: ProjectFlowId) => void;
  experienceHoverId: string | null;
  setExperienceHoverId: (id: string | null) => void;
  backgroundIsQuiet: boolean;
  /** Path-complete “Unlocked” card — same bottom panel as path hints (z-200) */
  unlockToast: SystemPathDef | null;
  showUnlockToast: (def: SystemPathDef) => void;
  /** Explore overlay: full-screen interactive map (decorative when false) */
  exploreMapOpen: boolean;
  setExploreMapOpen: (open: boolean) => void;
  /** Completed paths (edges stay softly lit on decorative map) */
  completedPathIds: SystemPathId[];
  addCompletedPath: (id: SystemPathId) => void;
  /** Hints / path reset while exploring — same region as unlock toast */
  mapEphemeral: { kind: "hint" | "reset"; text: string } | null;
  setMapEphemeral: (m: { kind: "hint" | "reset"; text: string } | null) => void;
  clearMapEphemeral: () => void;
};

const Ctx = createContext<V2Ctx | null>(null);

export function V2Provider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<V2SectionId>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [highlightedSkillGroup, setHighlightedSkillGroup] = useState<string | null>(null);
  const [activeProjectFlow, setActiveProjectFlow] = useState<ProjectFlowId>(null);
  const [experienceHoverId, setExperienceHoverId] = useState<string | null>(null);
  const [unlockToast, setUnlockToast] = useState<SystemPathDef | null>(null);
  const unlockToastFired = useRef<Set<string>>(new Set());
  const [exploreMapOpen, setExploreMapOpen] = useState(false);
  const [completedPathIds, setCompletedPathIds] = useState<SystemPathId[]>([]);
  const [mapEphemeral, setMapEphemeralState] = useState<{
    kind: "hint" | "reset";
    text: string;
  } | null>(null);

  const addCompletedPath = useCallback((id: SystemPathId) => {
    setCompletedPathIds((a) => (a.includes(id) ? a : [...a, id]));
  }, []);

  const setMapEphemeral = useCallback(
    (m: { kind: "hint" | "reset"; text: string } | null) => {
      setMapEphemeralState(m);
    },
    []
  );

  const clearMapEphemeral = useCallback(() => {
    setMapEphemeralState(null);
  }, []);

  useEffect(() => {
    if (!mapEphemeral || mapEphemeral.kind !== "reset") return;
    const t = window.setTimeout(() => setMapEphemeralState(null), 2400);
    return () => clearTimeout(t);
  }, [mapEphemeral]);

  const showUnlockToast = useCallback((def: SystemPathDef) => {
    if (unlockToastFired.current.has(def.id)) return;
    unlockToastFired.current.add(def.id);
    setUnlockToast(def);
  }, []);

  const LEARN_TOAST_MS = 12_000;
  useEffect(() => {
    if (!unlockToast) return;
    const t = window.setTimeout(() => setUnlockToast(null), LEARN_TOAST_MS);
    return () => clearTimeout(t);
  }, [unlockToast]);

  const backgroundIsQuiet = activeSection === "beyond";

  const toggleDebug = useCallback(() => {
    setDebugMode((d) => !d);
  }, []);

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      debugMode,
      setDebugMode,
      toggleDebug,
      recruiterOpen,
      setRecruiterOpen,
      highlightedSkillGroup,
      setHighlightedSkillGroup,
      activeProjectFlow,
      setActiveProjectFlow,
      experienceHoverId,
      setExperienceHoverId,
      backgroundIsQuiet,
      unlockToast,
      showUnlockToast,
      exploreMapOpen,
      setExploreMapOpen,
      completedPathIds,
      addCompletedPath,
      mapEphemeral,
      setMapEphemeral,
      clearMapEphemeral,
    }),
    [
      activeSection,
      debugMode,
      recruiterOpen,
      highlightedSkillGroup,
      activeProjectFlow,
      experienceHoverId,
      backgroundIsQuiet,
      unlockToast,
      showUnlockToast,
      exploreMapOpen,
      completedPathIds,
      mapEphemeral,
      addCompletedPath,
      setMapEphemeral,
      clearMapEphemeral,
      toggleDebug,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useV2() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useV2 must be used within V2Provider");
  return c;
}
