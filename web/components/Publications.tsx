"use client";

import { motion } from "framer-motion";

const publications = [
    {
        title: "STAR Heuristic Method: A Novel Approach and Its Comparative Analysis with CI Algorithm to Solve CBAP in Healthcare",
        citations: 0,
        reads: 11,
        year: 2023,
        type: "BOOK CHAPTER",
        link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=uk52YeEAAAAJ&citation_for_view=uk52YeEAAAAJ:9yKSN-GCB0IC"
    },
    {
        title: "AI-Based Chatbot to Solve Modern-Day Enterprise Business Problems",
        citations: 9,
        reads: 3212,
        year: 2021,
        type: "PAPER",
        link: "https://www.researchgate.net/publication/354693715_AI-Based_Chatbot_to_Solve_Modern-Day_Enterprise_Business_Problems"
    },
    {
        title: "An Effective Garage Management System Web Application for Customer Service",
        citations: 2,
        reads: 15645,
        year: 2021,
        type: "PAPER",
        link: "https://www.researchgate.net/publication/356063729_An_Effective_Garage_Management_System_Web_Application_for_Customer_Service"
    }
];

export default function Publications() {
    return (
        <section className="py-20 bg-background text-foreground px-4 md:px-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-left max-w-7xl mx-auto uppercase tracking-wider">
                Selected <span className="text-purple-500">Publications</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {publications.map((pub, index) => (
                    <motion.a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="flex flex-col justify-between p-8 min-h-[300px] bg-card backdrop-blur-sm border border-border rounded-xl hover:bg-card/80 transition-colors group"
                    >
                        <div>
                            <div className={`w-fit px-3 py-1 rounded-full text-xs font-mono mb-6 ${pub.type === 'BOOK CHAPTER' ? 'bg-orange-500/20 text-orange-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                {pub.type}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:underline decoration-1 underline-offset-4">{pub.title}</h3>
                        </div>

                        <div className="flex justify-between items-end border-t border-border pt-6 mt-6">
                            <span className="text-muted font-mono text-sm">{pub.year}</span>
                            <div className="flex gap-4">
                                <span className="text-muted text-sm flex items-center gap-1.5" title="Citations">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                    {pub.citations}
                                </span>
                                <span className="text-muted text-sm flex items-center gap-1.5" title="Reads">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    {pub.reads}
                                </span>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
}
