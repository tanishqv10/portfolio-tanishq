"use client";

import { useEffect, useRef } from "react";

function isTextInputTarget(t: EventTarget | null) {
  if (!t || !(t instanceof Element)) return false;
  if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return true;
  if (t.getAttribute("contenteditable") === "true") return true;
  return false;
}

type Opts = {
  onDebug: () => void;
  onHire: () => void;
  enabled?: boolean;
};

/**
 * Listens for typing "debug" or "hire" in sequence. Ignores when focus is in inputs.
 */
export function useTypedSequence({ onDebug, onHire, enabled = true }: Opts) {
  const buffer = useRef("");

  useEffect(() => {
    if (!enabled) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTextInputTarget(e.target)) {
        buffer.current = "";
        return;
      }
      if (e.key.length > 1 && e.key !== "Backspace") {
        if (e.key === "Escape") {
          buffer.current = "";
        }
        return;
      }
      if (e.key === "Backspace") {
        buffer.current = buffer.current.slice(0, -1);
        return;
      }
      if (e.key.length === 1) {
        buffer.current = (buffer.current + e.key).slice(-8).toLowerCase();
        if (buffer.current.includes("debug")) {
          onDebug();
          buffer.current = "";
        } else if (buffer.current.includes("hire")) {
          onHire();
          buffer.current = "";
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDebug, onHire, enabled]);
}
