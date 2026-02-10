"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const projects = [
    {
        name: "MathAI",
        description: "An AI powered math solver built in Python, RAG, LLMs, with a FastAPI backend and modern web interfaces.",
        language: "Python",
        url: "https://github.com/tanishqv10/MathAI"
    },
    {
        name: "onlineMRS",
        description: "Online Marriage Registration System built with JavaScript.",
        language: "HTML, CSS, JavaScript",
        url: "https://github.com/tanishqv10/onlineMRS"
    },
    {
        name: "GarageMS",
        description: "An iOS application for your car servicing.",
        language: "Swift",
        url: "https://github.com/tanishqv10/GarageMS"
    },
    {
        name: "Stock Prediction",
        description: "Stock market prediction model using machine learning.",
        language: "Jupyter Notebook",
        url: "https://github.com/tanishqv10/Stock_Prediction"
    },
    {
        name: "AutoFill Spreadsheet",
        description: "Automated spreadsheet filling tool.",
        language: "Python",
        url: "https://github.com/tanishqv10/autofill-spreadsheet"
    },
    {
        name: "Wheel Decide",
        description: "A lightweight decision wheel web app that helps users make quick, randomized choices through an interactive interface.",
        language: "HTML, CSS, JavaScript",
        url: "https://github.com/tanishqv10/wheel-decide",
        live: "https://tanishqv10.github.io/wheel-decide/"
    }
];

export default function Projects() {
    const carouselRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-24 bg-background text-foreground overflow-hidden">
            <div className="px-4 md:px-10 max-w-7xl mx-auto mb-12 flex justify-between items-end">
                <h2 className="text-4xl md:text-5xl font-bold text-left uppercase tracking-wider">
                    Recent <span className="text-blue-500">Projects</span>
                </h2>
                <div className="hidden md:flex gap-4">
                    <div className="text-sm text-muted font-mono">SCROLL FOR MORE -&gt;</div>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full max-w-7xl mx-auto">
                {/* Fade Gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

                <div
                    className="flex gap-6 overflow-x-auto pb-12 pt-10 px-4 md:px-10 no-scrollbar snap-x snap-mandatory"
                    ref={carouselRef}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="min-w-[300px] md:min-w-[400px] bg-card border border-border p-8 rounded-2xl hover:border-blue-500/50 transition-colors snap-center flex flex-col justify-between group cursor-pointer relative"
                            whileHover={{ y: -5 }}
                            onClick={() => window.open(project.url, '_blank')}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{project.name}</h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted group-hover:text-foreground transition-colors"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                </div>
                                <p className="text-muted leading-relaxed mb-6 h-[50px] overflow-hidden text-ellipsis">{project.description}</p>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`}></span>
                                    <span className="text-sm font-mono text-muted">{project.language}</span>
                                </div>

                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-sm font-bold text-green-400 hover:text-green-300 transition-colors z-20"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        LIVE DEMO
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Padding at the end */}
                    <div className="min-w-[20px]"></div>
                </div>
            </div>
        </section>
    );
}

function getLanguageColor(lang: string) {
    const colors: Record<string, string> = {
        "Python": "bg-yellow-400",
        "HTML, CSS, JavaScript": "bg-purple-300",
        "TypeScript": "bg-blue-500",
        "C++": "bg-blue-700",
        "Jupyter Notebook": "bg-orange-500",
        "Swift": "bg-red-500"
    };
    return colors[lang] || "bg-gray-500";
}
