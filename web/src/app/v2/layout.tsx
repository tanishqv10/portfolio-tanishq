import type { ReactNode } from "react";
import "@/styles/v2/v2-globals.css";

export default function V2Layout({ children }: { children: ReactNode }) {
  return <div className="v2-root min-h-screen bg-background text-foreground">{children}</div>;
}
