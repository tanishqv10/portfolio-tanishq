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
                        I'm a passionate software developer with a knack for building immersive web experiences and robust backend systems.
                        My journey bridges the gap between creative design and engineering precision.
                    </p>
                    <p>
                        With a deep interest in AI, full-stack development, and system architecture, I thrive on solving complex problems
                        and turning ideas into deployed realities. When I'm not coding, you'll find me either cooking or playing.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
