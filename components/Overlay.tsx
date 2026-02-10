"use client";

import { useTransform, MotionValue, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

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
                <div style={{ opacity: op1, transform: `translateY(${y1.get()}px)` }} className="text-center absolute">
                    <h1 className="text-8xl font-bold tracking-tighter mb-4 text-white">
                        Tanishq Varshney
                    </h1>
                    <p className="text-2xl font-light text-gray-400">
                        Software Developer
                    </p>
                </div>

                {/* Section 2 - Centered (was Left) */}
                <div style={{ opacity: op2, transform: `translateY(${y2.get()}px)` }} className="max-w-xl absolute left-20">
                    <h2 className="text-6xl font-bold mb-6 text-white leading-tight">
                        I build digital <span className="text-blue-500">experiences.</span>
                    </h2>
                    <p className="text-xl text-gray-300">
                        Merging technical precision with artistic vision to create immersive web applications.
                    </p>
                </div>

                {/* Section 3 - Centered (was Right) */}
                <div style={{ opacity: op3, transform: `translateY(${y3.get()}px)` }} className="text-right max-w-xl absolute right-20">
                    <h2 className="text-6xl font-bold mb-6 text-white leading-tight">
                        Bridging <span className="text-purple-500">design</span> and <span className="text-purple-500">engineering.</span>
                    </h2>
                    <p className="text-xl text-gray-300">
                        From concept to deployment, every pixel is crafted with purpose.
                    </p>
                </div>
            </div>
        </div>
    );
}
