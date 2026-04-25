export type V2Publication = {
  id: string;
  title: string;
  summary: string;
  year: number;
  link?: string;
  problem: string;
  method: string;
  outcome: string;
};

export const publications: V2Publication[] = [
  {
    id: "pub1",
    title:
      "STAR Heuristic Method: A Novel Approach and Its Comparative Analysis with CI Algorithm to Solve CBAP in Healthcare",
    summary: "Comparative study of heuristics for capacity-based assignment in health systems.",
    year: 2023,
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=uk52YeEAAAAJ&citation_for_view=uk52YeEAAAAJ:9yKSN-GCB0IC",
    problem: "Allocating resources under hard constraints in healthcare operations.",
    method: "STAR heuristic vs. competitive algorithms; structured benchmarking.",
    outcome: "Framed a reproducible way to reason about heuristic quality on CBAP instances.",
  },
  {
    id: "pub2",
    title: "AI-Based Chatbot to Solve Modern-Day Enterprise Business Problems",
    summary: "Enterprise chatbot patterns for support and workflow automation.",
    year: 2021,
    link: "https://www.researchgate.net/publication/354693715_AI-Based_Chatbot_to_Solve_Modern-Day_Enterprise_Business_Problems",
    problem: "Scaling conversational support without linear headcount growth.",
    method: "NLP stack + integration patterns with line-of-business systems.",
    outcome: "Demonstrated end-to-end chatbot design for real enterprise constraints.",
  },
  {
    id: "pub3",
    title:
      "An Effective Garage Management System Web Application for Customer Service",
    summary: "Web system for service workflows and customer coordination.",
    year: 2021,
    link: "https://www.researchgate.net/publication/356063729_An_Effective_Garage_Management_System_Web_Application_for_Customer_Service",
    problem: "Fragmented customer service in garage operations.",
    method: "Full-stack web app with service scheduling and comms layer.",
    outcome: "More traceable, centralized operations for a service-heavy use case.",
  },
];
