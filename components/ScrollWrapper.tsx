"use client";

import { useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

export default function ScrollWrapper() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} style={{ position: 'relative', height: '500vh' }} className="relative h-[500vh]">
            <ScrollyCanvas scrollYProgress={scrollYProgress} />
            <Overlay scrollYProgress={scrollYProgress} />
        </div>
    );
}
