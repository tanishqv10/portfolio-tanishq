"use client";

import { useTransform, MotionValue, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import HeroTextType from "./HeroTextType";
import Shuffle from "./Shuffle";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {

    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const [op1, setOp1] = useState(1);
    const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    useMotionValueEvent(opacity1, "change", (latest) => setOp1(latest));

    const y2 = useTransform(scrollYProgress, [0.25, 0.5], [50, 0]);
    const [op2, setOp2] = useState(0);
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
    useMotionValueEvent(opacity2, "change", (latest) => setOp2(latest));

    const y3 = useTransform(scrollYProgress, [0.6, 0.85], [50, 0]);
    const [op3, setOp3] = useState(0);
    const opacity3 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
    useMotionValueEvent(opacity3, "change", (latest) => setOp3(latest));

    return (
        <div className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
            {/* Section 1 - Centered */}
            <div className="sticky top-0 h-screen flex items-center justify-center">
                <div style={{ opacity: op1, transform: `translateY(${y1.get()}px)` }} className="absolute">
                    <HeroTextType
                        line1="Tanishq Varshney"
                        line2="Software Developer"
                        typingSpeed={75}
                        pauseDuration={1500}
                        deletingSpeed={50}
                        cursorCharacter="_"
                    />
                </div>

                {/* Section 2 - Centered (was Left) */}
                <div style={{ opacity: op2, transform: `translateY(${y2.get()}px)` }} className="max-w-xl absolute left-20 pointer-events-auto">
                    <h2 className="text-6xl font-bold mb-6 text-white leading-tight font-kerning-none">
                        <Shuffle
                            text="I build intelligent "
                            tag="span"
                            shuffleDirection="right"
                            duration={0.35}
                            animationMode="evenodd"
                            shuffleTimes={1}
                            ease="power3.out"
                            stagger={0.03}
                            triggerOnHover
                            respectReducedMotion
                            active={op2 > 0.5}
                            className="inline-block"
                        />
                        <Shuffle
                            text="systems."
                            tag="span"
                            shuffleDirection="right"
                            duration={0.35}
                            animationMode="evenodd"
                            shuffleTimes={1}
                            ease="power3.out"
                            stagger={0.03}
                            triggerOnHover
                            respectReducedMotion
                            active={op2 > 0.5}
                            className="text-blue-500 inline-block"
                        />
                    </h2>
                    <p className="text-xl text-gray-300">
                        Designing scalable software, AI-driven platforms, and production-ready web applications from idea to deployment.
                    </p>
                </div>

                {/* Section 3 - Centered (was Right) */}
                <div style={{ opacity: op3, transform: `translateY(${y3.get()}px)` }} className="text-right max-w-xl absolute right-20 pointer-events-auto">
                    <h2 className="text-6xl font-bold mb-6 text-white leading-tight font-kerning-none">
                        <Shuffle
                            text="Bridging"
                            tag="span"
                            shuffleDirection="right"
                            duration={0.35}
                            animationMode="evenodd"
                            shuffleTimes={1}
                            ease="power3.out"
                            stagger={0.03}
                            triggerOnHover
                            respectReducedMotion
                            active={op3 > 0.5}
                            className="inline-block"
                        />
                        {" "}
                        <Shuffle
                            text="product"
                            tag="span"
                            shuffleDirection="right"
                            duration={0.35}
                            animationMode="evenodd"
                            shuffleTimes={1}
                            ease="power3.out"
                            stagger={0.03}
                            triggerOnHover
                            respectReducedMotion
                            active={op3 > 0.5}
                            className="text-purple-500 inline-block"
                        />
                        {" "}
                        <Shuffle
                            text="and"
                            tag="span"
                            shuffleDirection="right"
                            duration={0.35}
                            animationMode="evenodd"
                            shuffleTimes={1}
                            ease="power3.out"
                            stagger={0.03}
                            triggerOnHover
                            respectReducedMotion
                            active={op3 > 0.5}
                            className="inline-block"
                        />
                        {" "}
                        <Shuffle
                            text="engineering."
                            tag="span"
                            shuffleDirection="right"
                            duration={0.35}
                            animationMode="evenodd"
                            shuffleTimes={1}
                            ease="power3.out"
                            stagger={0.03}
                            triggerOnHover
                            respectReducedMotion
                            active={op3 > 0.5}
                            className="text-purple-500 inline-block"
                        />
                    </h2>
                    <p className="text-xl text-gray-300">
                        From architecture to production, turning complex ideas into reliable software.
                    </p>
                </div>
            </div>
        </div>
    );
}
