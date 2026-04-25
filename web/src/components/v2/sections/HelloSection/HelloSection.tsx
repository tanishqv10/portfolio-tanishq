"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { introProfile } from "@/data/v2/intro";

/* Everyday forms, native spelling. Thai: สวัสดี; Korean polite 안녕하세요; Japanese こんにちは. */
const GREETINGS = [
  "Hello",
  "Hola",
  "Bonjour",
  "Ciao",
  "Olá",
  "Hallo",
  "Guten Tag",
  "Merhaba",
  "नमस्ते",
  "你好",
  "こんにちは",
  "안녕하세요",
  "مرحبا",
  "שלום",
  "Привет",
  "สวัสดี",
] as const;
const TYPE_MS = 110;
const DELETE_MS = 65;
const HOLD_MS = 1_800;
const BETWEEN_MS = 450;

export function HelloSection() {
  const [display, setDisplay] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [roti, setRoti] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const cancelled = useRef(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(GREETINGS[0]!);
      return;
    }
    cancelled.current = false;
    const clearT = () => {
      if (timeoutRef.current != null) {
        globalThis.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const afterDelete = (wordIndex: number) => {
      if (cancelled.current) return;
      const next = (wordIndex + 1) % GREETINGS.length;
      timeoutRef.current = window.setTimeout(() => runType(next), BETWEEN_MS);
    };

    const runDelete = (word: string) => {
      if (cancelled.current) return;
      let c = word.length;
      const step = () => {
        if (cancelled.current) return;
        c -= 1;
        setDisplay(word.slice(0, c));
        if (c > 0) {
          timeoutRef.current = window.setTimeout(step, DELETE_MS);
        } else {
          const wordIndex = GREETINGS.indexOf(word as (typeof GREETINGS)[number]);
          afterDelete(wordIndex >= 0 ? wordIndex : 0);
        }
      };
      step();
    };

    const runType = (wordIndex: number) => {
      if (cancelled.current) return;
      const word = GREETINGS[wordIndex % GREETINGS.length]!;
      let c = 0;
      const step = () => {
        if (cancelled.current) return;
        c += 1;
        setDisplay(word.slice(0, c));
        if (c < word.length) {
          timeoutRef.current = window.setTimeout(step, TYPE_MS);
        } else {
          timeoutRef.current = window.setTimeout(
            () => runDelete(word),
            HOLD_MS
          );
        }
      };
      step();
    };

    runType(0);
    return () => {
      cancelled.current = true;
      clearT();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!reducedMotion) return;
    const id = window.setInterval(() => {
      setRoti((i) => (i + 1) % GREETINGS.length);
    }, 3_200);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const greeting = reducedMotion ? GREETINGS[roti]! : display;
  const showCaret = !reducedMotion;

  return (
    <div className="v2-container flex min-h-[min(88svh,56rem)] flex-col justify-center py-20 sm:py-24">
      <h1
        className="min-h-[1.15em] max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        aria-live="polite"
      >
        <span>{greeting}</span>
        {showCaret && (
          <span
            className="ml-0.5 inline-block w-[0.05em] animate-pulse align-baseline text-[var(--v2-map-accent,currentColor)]"
            aria-hidden
          >
            |
          </span>
        )}
      </h1>
      <p className="mt-4 max-w-3xl text-2xl font-medium tracking-tight text-foreground/88 sm:mt-5 sm:text-3xl md:text-4xl">
        {"I'm Tanishq"}
      </p>
      <p className="mt-3 font-mono text-sm tracking-wide text-foreground/50 sm:mt-4">
        {introProfile.location}
      </p>
    </div>
  );
}
