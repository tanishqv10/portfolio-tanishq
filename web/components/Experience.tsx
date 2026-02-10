"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ExperienceItem {
    id: string;
    type: "education" | "work";
    title: string;
    organization: string;
    date: string;
    location?: string;
    description: string[];
    logo?: string;
}

const experienceData: ExperienceItem[] = [
    // Work - Mercor (Feb 2025 - Present)
    {
        id: "work1",
        type: "work",
        title: "Applied AI Engineer",
        organization: "Mercor",
        date: "Feb 2025 - Present",
        location: "Remote, USA",
        description: [
            "Built and maintained backend services supporting large-scale evaluation workflows, reducing job processing time by 30% through caching improvements, smarter batching, and tightened concurrency controls",
            "Designed reproducible Docker environments for per-commit testing of open-source frameworks, raising test stability to over 90% across varied dependency sets",
            "Developed API-driven automation pipelines that integrated Airtable and Slack, cutting manual QA time by 40% and increasing reliability of distributed evaluation runs",
            "Used Hex for data analytics by running Python workflows and building dashboards that surfaced evaluation trends and reviewer bottlenecks, reducing daily manual calculations by 80%",
            "Added monitoring, validation layers, and fallback logic that reduced system failures and improved recovery behavior during peak load"
        ],
        logo: "/mercor.png"
    },
    // Work - Ema Health (Feb 2025 - May 2025)
    {
        id: "work2",
        type: "work",
        title: "AI Engineer",
        organization: "Ema Health",
        date: "Feb 2025 - May 2025",
        location: "Los Angeles, CA, USA",
        description: [
            "Implemented Role-Based Access Control using AWS Cognito and integrated it into Flask and Django backend services, handling authentication and permission logic for 3000+ active users in production",
            "Added batching to MongoDB permission updates and reduced redundant fetch calls, cutting p95 update latency by about 25% and improving RBAC dashboard responsiveness for admins",
            "Built and optimized admin endpoints for role editing, user management, audit logging, lowering access-related support tickets by 40%"
        ],
        logo: "/ema.png"
    },
    // Education - USC (Jan 2023 - Dec 2024)
    {
        id: "edu1",
        type: "education",
        title: "Master of Science, Computer Science",
        organization: "University of Southern California",
        date: "Jan 2023 - Dec 2024",
        description: ["Achievements: Graduate Fellow - USC Marshall School of Business"],
        logo: "/uscseal.png"
    },
    // Work - Quantiphi (Aug 2022 - Dec 2022)
    {
        id: "work3",
        type: "work",
        title: "Machine Learning Engineer",
        organization: "Quantiphi Analytics Pvt. Ltd.",
        date: "Aug 2022 - Dec 2022",
        location: "Mumbai, MH, IN",
        description: [
            "Built production inference pipelines for NLP and forecasting tasks using Python, concurrency, and SQL, adding monitoring, preprocessing, and validation layers, which ensured reliable real time predictions",
            "Improved classification accuracy by 15% through feature refinement and model tuning while stabilizing pipeline runtime"
        ],
        logo: "/quantiphi.png"
    },
    // Work - Reliance Jio (Mar 2021 - Oct 2021)
    {
        id: "work4",
        type: "work",
        title: "Software Engineer",
        organization: "Reliance Jio Pvt. Ltd.",
        date: "Mar 2021 - Oct 2021",
        location: "Mumbai, MH, IN",
        description: [
            "Optimized network-analysis pipelines in Spark and Scala, reducing execution time by 40% and increasing reliability of nationwide antenna-tuning workloads",
            "Built Django-based APIs and dashboards for real-time antenna control, improving operational throughput by 33%",
            "Automated antenna adjustment logic using regression models, reducing manual calibration effort by 80%"
        ],
        logo: "/reliance-jio-logo.png"
    },
    // Education - MIT WPU (Jul 2018 - Jun 2022)
    {
        id: "edu2",
        type: "education",
        title: "Bachelor of Technology, Computer Science & Engineering",
        organization: "MIT World Peace University",
        date: "Jul 2018 - Jun 2022",
        description: [],
        logo: "/mit.png"
    }
];

export default function Experience() {
    return (
        <section className="py-20 bg-background text-foreground px-4 md:px-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-20 text-left max-w-7xl mx-auto uppercase tracking-wider">
                Experience & <span className="text-muted">Education</span>
            </h2>

            <div className="relative max-w-7xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block"></div>

                {/* Render Items */}
                {experienceData.map((item, index) => {
                    const isEducation = item.type === "education";

                    return (
                        <TimelineItem key={item.id} item={item} isLeft={isEducation} />
                    );
                })}
            </div>
        </section>
    );
}

function TimelineItem({ item, isLeft }: { item: ExperienceItem, isLeft: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex flex-col md:flex-row items-stretch justify-between mb-12 relative group">
            {/* Dot */}
            <div className="hidden md:block absolute left-1/2 top-0 w-3 h-3 rounded-full bg-foreground -translate-x-1/2 mt-2 z-10 transition-transform duration-300 group-hover:scale-150 group-hover:bg-blue-400"></div>

            {/* Left Side */}
            <div className={`w-full md:w-[45%] md:text-right md:pr-10 ${isLeft ? "" : "pointer-events-none"}`}>
                {isLeft ? (
                    <Content item={item} onHover={setIsHovered} />
                ) : (
                    // Placeholder to maintain width
                    <div className="hidden md:block" />
                )}
            </div>

            {/* Right Side */}
            <div className={`w-full md:w-[45%] ${!isLeft ? "md:pl-10" : "pointer-events-none"}`}>
                {!isLeft ? (
                    <Content item={item} onHover={setIsHovered} />
                ) : (
                    // Placeholder to maintain width
                    <div className="hidden md:block" />
                )}
            </div>

            <AnimatePresence>
                {isHovered && item.description.length > 0 && (
                    <>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

function Content({ item, onHover }: { item: ExperienceItem, onHover: (v: boolean) => void }) {
    const [showModal, setShowModal] = useState(false);

    const handleMouseEnter = () => {
        setShowModal(true);
        onHover(true);
    };

    const handleMouseLeave = () => {
        setShowModal(false);
        onHover(false);
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-transparent group hover:cursor-pointer"
            >
                <div className="flex items-start gap-4">
                    {item.logo && (
                        <div className="w-16 h-16 shrink-0 bg-white rounded-full p-1 flex items-center justify-center overflow-hidden border border-border">
                            <img src={item.logo} alt={item.organization} className="w-full h-full object-contain" />
                        </div>
                    )}
                    <div>
                        <span className="text-muted font-mono text-sm block mb-1">{item.date}</span>
                        <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                        <h4 className="text-lg text-muted">{item.organization}</h4>
                        {item.location && <span className="text-xs text-muted uppercase tracking-widest">{item.location}</span>}
                    </div>
                </div>
            </motion.div>

            {/* Hover Modal */}
            <AnimatePresence>
                {showModal && item.description.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-[100] top-full mt-4 w-[300px] md:w-[400px] bg-card border border-border p-6 rounded-xl shadow-2xl shadow-black/80 left-0 md:left-auto md:right-0 md:origin-top-right backdrop-blur-xl"
                    >
                        <ul className="list-disc pl-4 space-y-2">
                            {item.description.map((point, idx) => (
                                <li key={idx} className="text-card-foreground text-sm leading-relaxed">
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
