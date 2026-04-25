import type { SystemPathId } from "@/lib/v2/systemPaths";

export type TraceState =
  | { kind: "idle" }
  | { kind: "middle_hint"; pathId: SystemPathId; startNodeId: string }
  | {
      kind: "tracing";
      pathId: SystemPathId;
      nextIndex: number;
      activeLit: string[];
    };
