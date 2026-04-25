/**
 * Ten traceable system paths for the v2 background map. Order matters for
 * disambiguation when multiple paths share a start or middle node.
 */

export type SystemPathId =
  | "rag_pipeline"
  | "llm_evaluation"
  | "observability"
  | "performance"
  | "backend_lifecycle"
  | "rbac"
  | "async_jobs"
  | "reliability"
  | "data_pipeline"
  | "product_loop";

export type SystemPathDef = {
  id: SystemPathId;
  /** Shown in unlock toast */
  unlockTitle: string;
  /** Body copy in toast */
  unlockBody: string;
  nodeIds: string[];
  /** Optional: “View related → …” */
  relatedCtaLabel?: string;
  /** In-page or external; default fragment scroll on v2 */
  relatedCtaHref?: string;
};

export const SYSTEM_PATHS: SystemPathDef[] = [
  {
    id: "rag_pipeline",
    unlockTitle: "Retrieval System Design",
    unlockBody:
      "Shows how I think about grounded AI systems: retrieve relevant context, rank it carefully, generate with evidence, and return reliable output.",
    nodeIds: [
      "input",
      "retriever",
      "reranker",
      "generator",
      "output",
    ],
    relatedCtaLabel: "Projects",
    relatedCtaHref: "/v2#projects",
  },
  {
    id: "llm_evaluation",
    unlockTitle: "LLM Evaluation Mindset",
    unlockBody:
      "Shows how I measure AI behavior instead of trusting model output blindly.",
    nodeIds: [
      "prompt",
      "model_call",
      "evaluator",
      "scoring",
      "feedback_loop",
    ],
    relatedCtaLabel: "Experience & projects",
    relatedCtaHref: "/v2#experience",
  },
  {
    id: "observability",
    unlockTitle: "Production Observability",
    unlockBody:
      "Shows how I debug real systems using traces, logs, metrics, and dashboards.",
    nodeIds: ["request", "trace_id", "logs", "metrics", "dashboard"],
    relatedCtaLabel: "Experience",
    relatedCtaHref: "/v2#experience",
  },
  {
    id: "performance",
    unlockTitle: "Performance Tuning",
    unlockBody:
      "Shows how I improve throughput and reduce latency through batching, caching, and concurrency control.",
    nodeIds: [
      "request",
      "batching",
      "caching",
      "concurrency",
      "latency",
    ],
    relatedCtaLabel: "Experience",
    relatedCtaHref: "/v2#experience",
  },
  {
    id: "backend_lifecycle",
    unlockTitle: "Backend Engineering",
    unlockBody:
      "Shows how I structure clean backend flows with validation, business logic, and reliable responses.",
    nodeIds: [
      "client",
      "api",
      "validation",
      "business_logic",
      "response",
    ],
    relatedCtaLabel: "Projects",
    relatedCtaHref: "/v2#projects",
  },
  {
    id: "rbac",
    unlockTitle: "Secure Access Design",
    unlockBody:
      "Shows how I approach authentication, authorization, permissions, and role based access control.",
    nodeIds: [
      "user_action",
      "auth",
      "role_check",
      "permission",
      "access",
    ],
    relatedCtaLabel: "Experience",
    relatedCtaHref: "/v2#experience",
  },
  {
    id: "async_jobs",
    unlockTitle: "Async Workflow Design",
    unlockBody:
      "Shows how I design background workflows that can scale, retry, and report results reliably.",
    nodeIds: [
      "job_queue",
      "worker",
      "execution",
      "result_store",
      "notification",
    ],
    relatedCtaLabel: "Experience",
    relatedCtaHref: "/v2#experience",
  },
  {
    id: "reliability",
    unlockTitle: "Reliability Engineering",
    unlockBody:
      "Shows how I design systems to handle bad inputs, failures, retries, and safe outputs.",
    nodeIds: [
      "input",
      "validation",
      "fallback",
      "retry",
      "safe_output",
    ],
    relatedCtaLabel: "Projects",
    relatedCtaHref: "/v2#projects",
  },
  {
    id: "data_pipeline",
    unlockTitle: "Data Pipeline Thinking",
    unlockBody:
      "Shows how I move data from raw input to retrieval ready knowledge.",
    nodeIds: [
      "ingestion",
      "processing",
      "storage",
      "indexing",
      "retrieval",
    ],
    relatedCtaLabel: "Technical skills",
    relatedCtaHref: "/v2#skills",
  },
  {
    id: "product_loop",
    unlockTitle: "Product Engineering",
    unlockBody:
      "Shows how I use user behavior, logs, and analysis to improve systems over time.",
    nodeIds: [
      "user_action",
      "logs",
      "analysis",
      "insight",
      "iteration",
    ],
    relatedCtaLabel: "About & experience",
    relatedCtaHref: "/v2#about",
  },
];

const BY_ID: Map<SystemPathId, SystemPathDef> = new Map(
  SYSTEM_PATHS.map((p) => [p.id, p])
);

export function getSystemPath(id: SystemPathId): SystemPathDef | undefined {
  return BY_ID.get(id);
}

/** Canonical undirected id for a graph edge (used for lit / completed state). */
export function undirectedKey(a: string, b: string): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

export function getPathEdgeKeys(def: SystemPathDef): Set<string> {
  const s = new Set<string>();
  for (let i = 0; i < def.nodeIds.length - 1; i++) {
    s.add(undirectedKey(def.nodeIds[i], def.nodeIds[i + 1]));
  }
  return s;
}

const ALL_PATH_EDGE_KEYS: Set<string> = (() => {
  const s = new Set<string>();
  for (const p of SYSTEM_PATHS) {
    for (const k of getPathEdgeKeys(p)) s.add(k);
  }
  return s;
})();

export function allPathEdgeKeys(): Set<string> {
  return ALL_PATH_EDGE_KEYS;
}
