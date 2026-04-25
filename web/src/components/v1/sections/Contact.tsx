"use client";

import { motion } from "framer-motion";

export default function Contact() {
    return (
        <section className="py-24 bg-background text-foreground px-4 md:px-10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-wider">
                    Let&apos;s <span className="text-[#5eb7ff]">Collaborate</span>
                </h2>

                <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
                    Always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <motion.a
                        href="https://drive.google.com/uc?export=download&id=1aon3Z_paT7dyIQey-7QQnUXJJWBJ8fKK"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-foreground text-background rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download Resume
                    </motion.a>

                    <motion.a
                        href="mailto:tanishqv1001@gmail.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-transparent border-2 border-[#5eb7ff] text-[#5eb7ff] rounded-full font-bold text-lg hover:bg-[#5eb7ff]/10 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        Contact Me
                    </motion.a>

                    <motion.a
                        href="https://www.linkedin.com/in/tanishq-varshney-10/"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        style={{ backgroundColor: "#0A66C2", color: "white" }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
                            <line x1="7" y1="9" x2="7" y2="17" />
                            <line x1="7" y1="7" x2="7.01" y2="7" />
                            <line x1="11" y1="9" x2="11" y2="17" />
                            <path d="M11 13c0-2.5 4-2.5 4 0v4" />
                        </svg>
                        LinkedIn
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
