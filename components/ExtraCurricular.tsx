"use client";

import { motion } from "framer-motion";

const hobbies = [
    {
        name: "Cooking",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.92 12.08 19 20h-5l.77-9h.32" /><path d="M8.7 13.7 7 20h5l-.65-6.5h-.65" /><path d="M12 5V3" /><path d="M5 5V3" /><path d="M19 5V3" /><rect x="2" y="5" width="20" height="2" rx="1" /><path d="M22 7v10a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V7" /></svg>
        ),
        description: "Experimenting with new recipes and cuisines."
    },
    {
        name: "Cricket",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="8" /></svg>
        ),
        description: "Playing cricket with friends."
    },
    {
        name: "Badminton",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.5c-2.485 0-4.5-2.015-4.5-4.5V11a4.5 4.5 0 0 1 9 0v6c0 2.485-2.015 4.5-4.5 4.5z" /><line x1="12" y1="2" x2="12" y2="7" /><path d="m14 4-4 6" /><path d="m10 4 4 6" /></svg>
        ),
        description: "Enjoying competitive badminton matches."
    },
    {
        name: "PC Gaming",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 12h4" /><path d="M8 10v4" /><circle cx="17" cy="12" r="1" /></svg>
        ),
        description: "Strategy and FPS games on PC."
    }
];

export default function ExtraCurricular() {
    return (
        <section className="py-20 bg-background text-foreground px-4 md:px-10 border-t border-border">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center max-w-7xl mx-auto uppercase tracking-wider">
                Beyond <span className="text-[#f5b682]">Coding</span>
            </h2>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {hobbies.map((hobby, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-card border border-border p-8 rounded-xl text-center hover:bg-card/80 transition-colors"
                    >
                        <div className="w-16 h-16 mx-auto bg-[#f5b682]/20 rounded-full flex items-center justify-center text-[#f5b682] mb-6">
                            {hobby.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3">{hobby.name}</h3>
                        <p className="text-muted text-sm">{hobby.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
