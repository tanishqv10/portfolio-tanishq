import type { ProjectFlowId } from "@/lib/v2/systemGraph";

export type V2FeaturedProject = {
  id: string;
  title: string;
  tagline: string;
  stack: string;
  impact: string;
  /** Drives the background system-map highlight; `null` when no flow matches. */
  flowId: ProjectFlowId;
  whatBuilt: string[];
  whyMatters: string;
  tradeoffs?: string;
  failureModes?: string;
  fixes?: string;
  observability?: string;
  metrics?: string;
  caseStudyUrl?: string;
  github?: string;
  live?: string;
};

export const featuredProjects: V2FeaturedProject[] = [
  {
    id: "mathai",
    title: "MathAI",
    tagline: "Production-style AI math system with RAG, symbolic solving, and observability.",
    stack: "FastAPI, SymPy, RAG, LangChain, Redis, LangFuse",
    impact: "End-to-end AI system design: async solve path, grounded explanations, and traces—not a thin chatbot.",
    flowId: "mathai",
    whatBuilt: [
      "Async solving pipeline with clear failure and fallback behavior",
      "Retrieval-grounded explanation layer",
      "Traces, metrics, and eval hooks via LangFuse",
    ],
    whyMatters:
      "Demonstrates how I think about production AI: reliability, explainability, and observability in one system.",
    tradeoffs: "Larger surface area to test (symbolic + generative) vs. simpler one-shot solvers",
    failureModes: "Nondeterministic model output; latency spikes on cold retrieval",
    fixes: "Structured validation steps; caching hot SymPy results; backpressure on workers",
    observability: "Trace IDs on each solve, latency histograms, eval slices in LangFuse",
    metrics: "p95 solve time, error rates by problem class, human-review queue depth",
    github: "https://github.com/tanishqv10/MathAI",
  },
  {
    id: "onlinemrs",
    title: "onlineMRS",
    tagline: "Online marriage registration: web app for forms, status, and admin workflows.",
    stack: "HTML, CSS, JavaScript",
    flowId: null,
    impact:
      "End-to-end front-end and UX for a real-world public-facing registration flow.",
    whatBuilt: [
      "Form-driven user flows and validation in the browser",
      "Client-side structure and layout for a multi-step registration experience",
    ],
    whyMatters:
      "Shows how I build clear, legible UIs in vanilla web stacks for civic-style workflows.",
    github: "https://github.com/tanishqv10/onlineMRS",
  },
  {
    id: "garagems",
    title: "GarageMS",
    tagline: "iOS app for car servicing: appointments, service history, and a focused mobile UX.",
    stack: "Swift, UIKit / SwiftUI-style patterns, iOS",
    flowId: null,
    impact:
      "A native, touch-first product surface for something people use in the real world—vehicle maintenance.",
    whatBuilt: [
      "iOS app structure and screens for a servicing workflow",
      "Mobile layout and interaction patterns for quick in-hand use",
    ],
    whyMatters:
      "Demonstrates product thinking in Swift and the constraints of a small-screen, native app.",
    github: "https://github.com/tanishqv10/GarageMS",
  },
];

/**
 * Remaining v1-style repos (not featured as case studies above). Descriptions
 * match the classic `Projects.tsx` copy.
 */
export type V2ArchiveProject = {
  id: string;
  title: string;
  description: string;
  language: string;
  github: string;
  live?: string;
};

export const archiveProjects: V2ArchiveProject[] = [
  {
    id: "co_defender",
    title: "CO-Defender",
    description:
      "PATROL is a full-stack Android application with a Node.js/Express backend that provides real-time COVID-19 statistics, global news updates, and location-based healthcare services like finding nearby hospitals and pharmacies.",
    language: "Java, JavaScript",
    github: "https://github.com/tanishqv10/PATROL",
  },
  {
    id: "stock_prediction",
    title: "Stock Prediction",
    description: "Stock market prediction model using machine learning.",
    language: "Jupyter Notebook",
    github: "https://github.com/tanishqv10/Stock_Prediction",
  },
  {
    id: "autofill_spreadsheet",
    title: "AutoFill Spreadsheet",
    description: "Automated spreadsheet filling tool.",
    language: "Python",
    github: "https://github.com/tanishqv10/autofill-spreadsheet",
  },
  {
    id: "wheel_decide",
    title: "Wheel Decide",
    description:
      "A lightweight decision wheel web app that helps users make quick, randomized choices through an interactive interface.",
    language: "HTML, CSS, JavaScript",
    github: "https://github.com/tanishqv10/wheel-decide",
    live: "https://tanishqv10.github.io/wheel-decide/",
  },
];
