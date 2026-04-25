import type { Metadata } from "next";
import { V2PortfolioApp } from "@/components/v2/layout/V2PortfolioApp";

export const metadata: Metadata = {
  title: "Tanishq Varshney | Software Developer (v2)",
  description:
    "Production AI systems, RAG, evaluation, and full-stack quality — v2 portfolio.",
};

export default function V2Page() {
  return <V2PortfolioApp />;
}
