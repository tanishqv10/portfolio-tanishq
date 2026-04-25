export type BeyondItem = {
  id: string;
  name: string;
  note: string;
  funHover: string;
};

export const beyondItems: BeyondItem[] = [
  {
    id: "cook",
    name: "Cooking",
    note: "Precision with ingredients, same as with interfaces.",
    funHover: "If it compiles in the pot, it ships.",
  },
  {
    id: "cricket",
    name: "Cricket",
    note: "Long matches, strong opinions, post-game debriefs.",
    funHover: "Still waiting for a VAR for LBW calls.",
  },
  {
    id: "badminton",
    name: "Badminton",
    note: "Reflexes and footwork over raw power—usually.",
    funHover: "O(n) court coverage, O(1) net drops.",
  },
  {
    id: "games",
    name: "PC gaming",
    note: "Benchmarking hardware the fun way.",
    funHover: "FPS is a metric, not a personality.",
  },
];
