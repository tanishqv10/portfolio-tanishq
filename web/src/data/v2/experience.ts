export type V2WorkItem = {
  id: string;
  company: string;
  role: string;
  dates: string;
  location?: string;
  bullets: string[];
  kind: "work" | "education";
  debugLabels?: string[];
};

export const experienceItems: V2WorkItem[] = [
  {
    id: "mercor",
    company: "Mercor",
    role: "Applied AI Engineer",
    dates: "Feb 2025 – Feb 2026",
    location: "Remote, USA",
    kind: "work",
    debugLabels: ["eval_pipeline", "trace_id", "batch_processing", "dashboard", "caching", "concurrency"],
    bullets: [
      "Eval pipelines at scale: batching, caching, concurrency hardening",
      "Docker integration tests for open-source LLM frameworks",
      "Airtable + Slack automations; Hex dashboards for review bottlenecks",
      "Trace IDs and structured logs for reproducible eval and regression triage",
      "Queued batch jobs with retries and backpressure under peak load",
    ],
  },
  {
    id: "ema",
    company: "Ema Health",
    role: "AI Engineer",
    dates: "Feb 2025 – May 2025",
    location: "Los Angeles, CA",
    kind: "work",
    debugLabels: ["RBAC", "auth_flow", "access_control", "permissions", "Cognito", "audit_log"],
    bullets: [
      "Cognito RBAC on Flask + Django, 3k+ users in prod",
      "MongoDB batching; faster p95 on permission paths",
      "Audit/admin flows; fewer access tickets",
    ],
  },
  {
    id: "usc",
    company: "University of Southern California",
    role: "M.S. Computer Science",
    dates: "Jan 2023 – Dec 2024",
    kind: "education",
    bullets: ["Graduate Fellow – USC Marshall School of Business"],
  },
  {
    id: "quantiphi",
    company: "Quantiphi Analytics",
    role: "Machine Learning Engineer",
    dates: "Aug 2022 – Dec 2022",
    location: "Mumbai, IN",
    kind: "work",
    bullets: [
      "Python inference and forecasting pipelines with monitoring and validation",
      "Classification and stability work with measurable accuracy gains",
      "Feature engineering, cross-validation, and error analysis before release",
    ],
  },
  {
    id: "jio",
    company: "Reliance Jio",
    role: "Software Engineer",
    dates: "Mar 2021 – Oct 2021",
    location: "Mumbai, IN",
    kind: "work",
    bullets: [
      "Spark/Scala antenna pipelines: −40% runtime, more reliable nationwide tuning",
      "Django APIs + dashboards for real-time control; +33% throughput",
      "Regression automation: −80% manual calibration",
    ],
  },
  {
    id: "applus_idiada",
    company: "Applus+ IDIADA",
    role: "Software Engineer Intern",
    dates: "Dec 2020 – Mar 2021",
    kind: "work",
    bullets: [
      "HR chatbot: Power Automate + QnA Maker, NLU for query routing",
      "Intent/entity tuning: −30% HR response time; Teams rollout",
      "Reusable chatbot template for internal automation",
    ],
  },
  {
    id: "mitwpu",
    company: "MIT World Peace University",
    role: "B.Tech Computer Science & Engineering",
    dates: "Jul 2018 – Jun 2022",
    kind: "education",
    bullets: [],
  },
];
