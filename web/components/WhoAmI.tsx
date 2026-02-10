"use client";

import { motion } from "framer-motion";

export default function WhoAmI() {
    return (
        <section className="py-24 bg-background text-foreground px-4 md:px-10 border-b border-border/50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 uppercase tracking-wider">
                    Who <span className="text-[var(--accent)]">Am I?</span>
                </h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed"
                >
                    <p>
                        I am a software engineer based in the California, United States with a background in computer science and a strong focus on building scalable, production-ready applications across the full stack. My work sits at the intersection of thoughtful design and solid engineering, where I enjoy turning complex ideas into reliable, real-world software.
                    </p>
                    <p>
                        With a strong interest in AI, system architecture, and full-stack development, I thrive on solving challenging problems and taking projects from concept to deployment. Outside of coding, I enjoy cooking and exploring new ideas beyond the screen.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
