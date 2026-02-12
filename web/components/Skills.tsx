"use client";

import { motion } from "framer-motion";

const skillCategories = [
    {
        title: "Languages",
        skills: ["Python", "TypeScript", "JavaScript", "C++", "Swift", "SQL"]
    },
    {
        title: "Backend & Distributed Systems",
        skills: ["Flask", "Node.js", "Django", "Docker", "Kubernetes", "Apache Kafka", "AWS Lambda", "AWS API Gateway"]
    },
    {
        title: "Databases & Storage",
        skills: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB", "Vector Databases"]
    },
    {
        title: "Frontend",
        skills: ["React", "Next.js", "Angular", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
        title: "AI & Machine Learning",
        skills: ["PyTorch", "Transformers", "LangChain", "RAG Systems", "Scikit-learn"]
    },
    {
        title: "DevOps & Observability",
        skills: ["Git", "GitHub", "CI/CD Protocols", "Datadog", "Postman", "Jira", "Power BI"]
    }
];

export default function Skills() {
    return (
        <section className="py-24 bg-background text-foreground px-4 md:px-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-left max-w-7xl mx-auto uppercase tracking-wider">
                Technical <span className="text-[#f76f6f]">Skills</span>
            </h2>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-bold text-foreground border-l-4 border-[#f76f6f] pl-4 mb-6">
                            {category.title}
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {category.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 bg-card border border-border rounded-full text-sm md:text-base text-muted hover:bg-card/80 hover:border-[#f76f6f]/50 hover:text-foreground transition-all cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
