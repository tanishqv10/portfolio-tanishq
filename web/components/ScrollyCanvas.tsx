"use client";

import { useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ScrollyCanvas({
    numFrames = 65,
    scrollYProgress
}: {
    numFrames?: number;
    scrollYProgress: MotionValue<number>;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Internal ref removed in favor of passed prop logic

    const currentIndex = useRef(0);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        for (let i = 0; i < numFrames; i++) {
            const img = new Image();
            img.src = `/sequence/${i.toString().padStart(3, "0")}.png`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === numFrames) setIsLoaded(true);
            };
            imgs.push(img);
        }
        setImages(imgs);
    }, [numFrames]);

    // Render loop
    const render = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];

        // Cover logic
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
            drawHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                render(currentIndex.current);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Init

        return () => window.removeEventListener("resize", handleResize);
    }, [images, isLoaded]); // Re-run when images are ready

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded) render(0);
    }, [isLoaded]);

    // Sync scroll to frame
    useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
        if (!isLoaded) return;
        const frameIndex = Math.min(
            numFrames - 1,
            Math.floor(latest * numFrames)
        );

        if (frameIndex !== currentIndex.current) {
            currentIndex.current = frameIndex;
            requestAnimationFrame(() => render(frameIndex));
        }
    });

    return (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full object-cover" />
        </div>
    );
}
