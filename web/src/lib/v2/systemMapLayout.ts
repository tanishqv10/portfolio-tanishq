/** ViewBox and positioning shared by decorative + explore system map. */
export const MAP_VBW = 2000;
export const MAP_VBH = 1000;

export function posFor(n: { x: number; y: number }): { x: number; y: number } {
  return { x: n.x * MAP_VBW, y: n.y * MAP_VBH };
}
