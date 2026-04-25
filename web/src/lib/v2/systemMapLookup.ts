import { SYSTEM_PATHS, type SystemPathId, type SystemPathDef } from "./systemPaths";

const PATH_ORDER: Map<SystemPathId, number> = new Map(
  SYSTEM_PATHS.map((p, i) => [p.id, i])
);

/** Paths (incomplete) that start at this node, in definition order. */
export function startPathsForNode(
  nodeId: string,
  completed: ReadonlySet<SystemPathId>
): SystemPathDef[] {
  return SYSTEM_PATHS.filter(
    (p) => !completed.has(p.id) && p.nodeIds[0] === nodeId
  );
}

/** Picks one path to highlight when a middle (non-start) node is hovered. */
export function pathForMiddleNodeHint(
  nodeId: string,
  completed: ReadonlySet<SystemPathId>
): SystemPathDef | null {
  const cands = SYSTEM_PATHS.filter(
    (p) =>
      !completed.has(p.id) &&
      p.nodeIds[0] !== nodeId &&
      p.nodeIds.includes(nodeId)
  );
  if (cands.length === 0) return null;
  let best: SystemPathDef = cands[0];
  let bestI = best.nodeIds.indexOf(nodeId);
  for (let k = 1; k < cands.length; k++) {
    const p = cands[k];
    const i = p.nodeIds.indexOf(nodeId);
    if (i < bestI) {
      best = p;
      bestI = i;
    } else if (i === bestI) {
      if (PATH_ORDER.get(p.id)! < PATH_ORDER.get(best.id)!) {
        best = p;
        bestI = i;
      }
    }
  }
  return best;
}
