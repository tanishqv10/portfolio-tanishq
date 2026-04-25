export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "AI Systems",
    title: "AI Systems",
    items: [
      "RAG",
      "LangChain",
      "LLM Evaluation",
      "Prompt Pipelines",
      "LangFuse",
      "Vector Search",
    ],
  },
  {
    id: "Backend",
    title: "Backend",
    items: [
      "Python",
      "FastAPI",
      "Node.js",
      "REST APIs",
      "Async Pipelines",
    ],
  },
  {
    id: "Frontend",
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    id: "Infrastructure",
    title: "Infrastructure",
    items: ["AWS", "Docker", "Redis", "Datadog", "CI/CD"],
  },
  {
    id: "Data",
    title: "Data",
    items: ["PostgreSQL", "MongoDB", "DynamoDB", "SQL"],
  },
];
