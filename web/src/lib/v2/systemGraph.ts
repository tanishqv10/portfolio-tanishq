/**
 * System map: shared node pool, mesh edges, viewBox 2000×1000. Coords 0–1.
 * Visual edges = path edges + a few non-path links (decorative mesh only).
 */

import {
  SYSTEM_PATHS,
  allPathEdgeKeys,
  getSystemPath,
  getPathEdgeKeys,
  type SystemPathId,
  undirectedKey,
} from "./systemPaths";

export type { SystemPathId } from "./systemPaths";
export { getSystemPath, getPathEdgeKeys, allPathEdgeKeys, undirectedKey } from "./systemPaths";

export type ProjectFlowId = "mathai" | "llm_eval" | "rbac" | null;

export type SystemNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  groupIds?: string[];
};

function edgesFromPaths(): { from: string; to: string }[] {
  const e: { from: string; to: string }[] = [];
  for (const p of SYSTEM_PATHS) {
    for (let i = 0; i < p.nodeIds.length - 1; i++) {
      e.push({ from: p.nodeIds[i], to: p.nodeIds[i + 1] });
    }
  }
  return e;
}

/** Cross-links: topology only, not part of any named trace path. */
const EXTRA: { from: string; to: string }[] = [
  { from: "output", to: "feedback_loop" },
  { from: "retrieval", to: "retriever" },
  { from: "dashboard", to: "analysis" },
  { from: "generator", to: "model_call" },
  { from: "latency", to: "response" },
  { from: "access", to: "response" },
  { from: "ingestion", to: "input" },
  { from: "safe_output", to: "output" },
  { from: "notification", to: "user_action" },
  { from: "retry", to: "job_queue" },
  { from: "scoring", to: "metrics" },
  { from: "insight", to: "evaluator" },
  { from: "request", to: "client" },
  { from: "reranker", to: "retrieval" },
  { from: "storage", to: "processing" },
  { from: "indexing", to: "ingestion" },
  { from: "logs", to: "trace_id" },
];

function dedupeUndirected(
  list: { from: string; to: string }[]
): { from: string; to: string }[] {
  const s = new Set<string>();
  const out: { from: string; to: string }[] = [];
  for (const e of list) {
    const k = undirectedKey(e.from, e.to);
    if (s.has(k)) continue;
    s.add(k);
    out.push(e);
  }
  return out;
}

/**
 * Placed for wide separation: avoid tight clusters, cross-links read as
 * infrastructure, not a single obvious route.
 */
export const SYSTEM_NODES: SystemNode[] = [
  { id: "user_action", label: "user_action", x: 0.9, y: 0.18, groupIds: [] },
  { id: "logs", label: "logs", x: 0.52, y: 0.38, groupIds: ["infra", "data"] },
  { id: "analysis", label: "analysis", x: 0.72, y: 0.14, groupIds: [] },
  { id: "insight", label: "insight", x: 0.12, y: 0.22, groupIds: [] },
  { id: "iteration", label: "iteration", x: 0.06, y: 0.08, groupIds: [] },
  { id: "input", label: "input", x: 0.04, y: 0.48, groupIds: ["ai", "reliability"] },
  { id: "retriever", label: "retriever", x: 0.2, y: 0.78, groupIds: ["ai", "data"] },
  { id: "reranker", label: "reranker", x: 0.34, y: 0.58, groupIds: ["ai", "data"] },
  { id: "generator", label: "generator", x: 0.18, y: 0.3, groupIds: ["ai"] },
  { id: "output", label: "output", x: 0.42, y: 0.82, groupIds: ["ai", "reliability"] },
  { id: "prompt", label: "prompt", x: 0.86, y: 0.42, groupIds: ["ai"] },
  { id: "model_call", label: "model_call", x: 0.94, y: 0.56, groupIds: ["ai"] },
  { id: "evaluator", label: "evaluator", x: 0.6, y: 0.48, groupIds: ["ai"] },
  { id: "scoring", label: "scoring", x: 0.46, y: 0.12, groupIds: ["ai"] },
  { id: "feedback_loop", label: "feedback", x: 0.3, y: 0.18, groupIds: ["ai"] },
  { id: "request", label: "request", x: 0.7, y: 0.72, groupIds: ["backend", "infra", "data"] },
  { id: "trace_id", label: "trace_id", x: 0.58, y: 0.6, groupIds: ["infra", "data"] },
  { id: "metrics", label: "metrics", x: 0.82, y: 0.3, groupIds: ["infra"] },
  { id: "dashboard", label: "dashboard", x: 0.9, y: 0.08, groupIds: ["ai", "infra"] },
  { id: "batching", label: "batching", x: 0.4, y: 0.68, groupIds: ["backend", "data"] },
  { id: "caching", label: "caching", x: 0.12, y: 0.68, groupIds: ["backend", "data"] },
  { id: "concurrency", label: "concurrency", x: 0.26, y: 0.4, groupIds: ["backend"] },
  { id: "latency", label: "latency", x: 0.04, y: 0.88, groupIds: ["backend", "infra"] },
  { id: "client", label: "client", x: 0.28, y: 0.88, groupIds: ["backend", "frontend"] },
  { id: "api", label: "API", x: 0.5, y: 0.84, groupIds: ["backend"] },
  { id: "validation", label: "validation", x: 0.1, y: 0.4, groupIds: ["backend", "reliability", "data"] },
  { id: "business_logic", label: "logic", x: 0.64, y: 0.88, groupIds: ["backend"] },
  { id: "response", label: "response", x: 0.38, y: 0.95, groupIds: ["backend"] },
  { id: "auth", label: "auth", x: 0.78, y: 0.22, groupIds: [] },
  { id: "role_check", label: "role", x: 0.5, y: 0.25, groupIds: [] },
  { id: "permission", label: "perm", x: 0.66, y: 0.2, groupIds: [] },
  { id: "access", label: "access", x: 0.22, y: 0.5, groupIds: [] },
  { id: "job_queue", label: "queue", x: 0.96, y: 0.7, groupIds: ["backend", "data"] },
  { id: "worker", label: "worker", x: 0.5, y: 0.05, groupIds: ["backend"] },
  { id: "execution", label: "run", x: 0.84, y: 0.5, groupIds: ["backend"] },
  { id: "result_store", label: "store", x: 0.7, y: 0.05, groupIds: ["data"] },
  { id: "notification", label: "notify", x: 0.06, y: 0.6, groupIds: ["backend"] },
  { id: "fallback", label: "fallback", x: 0.3, y: 0.5, groupIds: ["backend", "ai"] },
  { id: "retry", label: "retry", x: 0.2, y: 0.6, groupIds: ["reliability", "backend"] },
  { id: "safe_output", label: "safe", x: 0.5, y: 0.4, groupIds: ["ai", "reliability"] },
  { id: "ingestion", label: "ingest", x: 0.14, y: 0.1, groupIds: ["data"] },
  { id: "processing", label: "process", x: 0.34, y: 0.92, groupIds: ["data"] },
  { id: "storage", label: "storage", x: 0.06, y: 0.3, groupIds: ["data"] },
  { id: "indexing", label: "index", x: 0.22, y: 0.12, groupIds: ["data"] },
  { id: "retrieval", label: "retrieval", x: 0.4, y: 0.3, groupIds: ["data", "ai"] },
];

const NODE_ID_SET = new Set(SYSTEM_NODES.map((n) => n.id));
for (const p of SYSTEM_PATHS) {
  for (const id of p.nodeIds) {
    if (!NODE_ID_SET.has(id)) {
      throw new Error(`systemGraph: path ${p.id} references unknown node "${id}"`);
    }
  }
}

export const SYSTEM_EDGES: { from: string; to: string }[] = dedupeUndirected([
  ...edgesFromPaths(),
  ...EXTRA,
]);

export const HERO_NODE_LABELS = [
  "retriever",
  "generator",
  "request",
  "evaluator",
  "latency",
  "fallback",
  "retrieval",
] as const;

export const SKILL_GROUP_NODE_IDS: Record<string, string[]> = {
  "AI Systems": [
    "retriever",
    "reranker",
    "generator",
    "output",
    "prompt",
    "model_call",
    "evaluator",
    "scoring",
    "feedback_loop",
    "input",
  ],
  Backend: [
    "client",
    "api",
    "validation",
    "business_logic",
    "response",
    "request",
    "job_queue",
    "worker",
    "execution",
    "notification",
    "batching",
    "caching",
    "concurrency",
    "latency",
  ],
  Frontend: ["client", "user_action", "dashboard"],
  Infrastructure: [
    "trace_id",
    "logs",
    "metrics",
    "dashboard",
    "latency",
  ],
  Data: [
    "ingestion",
    "processing",
    "storage",
    "indexing",
    "retrieval",
    "retriever",
    "reranker",
  ],
};

/** True if (from, to) lies on a named system path in order. */
export function isSystemPathEdge(from: string, to: string): boolean {
  return allPathEdgeKeys().has(undirectedKey(from, to));
}

export function isEdgeInPathId(
  from: string,
  to: string,
  pathId: SystemPathId
): boolean {
  const def = getSystemPath(pathId);
  if (!def) return false;
  return getPathEdgeKeys(def).has(undirectedKey(from, to));
}
