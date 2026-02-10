"use client";

import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";
import { CricketIcon, BadmintonIcon } from "./icons/CustomIcons";


const hobbies = [
    {
        name: "Cooking",
        icon: <ChefHat size={32} />,
        description: "Debugging recipes the same way I debug code."
    },
    {
        name: "Cricket",
        icon: <CricketIcon size={32} />,
        description: "Team sport, strong opinions, post-match analysis."
    },
    {
        name: "Badminton",
        icon: <BadmintonIcon size={32} />,
        description: "Precision beats power. Usually."
    },
    {
        name: "PC Gaming",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 12h4" /><path d="M8 10v4" /><circle cx="17" cy="12" r="1" /></svg>
        ),
        description: "Stress testing reflexes and hardware."
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
