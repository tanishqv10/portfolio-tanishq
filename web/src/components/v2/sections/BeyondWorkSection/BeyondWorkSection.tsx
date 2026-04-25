"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { beyondItems } from "@/data/v2/beyond";
import { clsx } from "clsx";

const LEAVE_MS = 80;

export function BeyondWorkSection() {
  const [open, setOpen] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  }, []);

  const onCardOpen = useCallback(
    (id: string) => {
      clearLeaveTimer();
      setOpen(id);
    },
    [clearLeaveTimer]
  );

  const onCardCloseSoon = useCallback(() => {
    clearLeaveTimer();
    leaveTimer.current = setTimeout(() => setOpen(null), LEAVE_MS);
  }, [clearLeaveTimer]);

  useEffect(
    () => () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    },
    []
  );

  return (
    <div className="v2-container v2-beyond-surface border-t border-foreground/6 py-28">
      <h2 id="beyond-title" className="v2-section-title text-foreground/90">
        Beyond work
      </h2>
      <p className="mt-2 max-w-lg text-sm text-foreground/50">
        A calmer block — the graph behind this section stays faint on purpose.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {beyondItems.map((item) => {
          const show = open === item.id;
          return (
            <li key={item.id}>
              <article
                className="w-full cursor-default rounded-lg border border-foreground/8 bg-foreground/[0.02] px-4 py-4 text-left transition hover:border-foreground/15"
                tabIndex={0}
                role="group"
                aria-label={item.name}
                aria-expanded={show}
                onMouseEnter={() => onCardOpen(item.id)}
                onMouseLeave={onCardCloseSoon}
                onFocus={() => onCardOpen(item.id)}
                onBlur={(e) => {
                  if (e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    return;
                  }
                  onCardCloseSoon();
                }}
              >
                <span className="text-sm font-medium text-foreground/85">
                  {item.name}
                </span>
                <p
                  className={clsx(
                    "mt-1 text-sm text-foreground/50",
                    !show && "line-clamp-2"
                  )}
                >
                  {item.note}
                </p>
                {show && (
                  <p className="mt-2 border-t border-foreground/8 pt-2 font-mono text-xs text-foreground/45">
                    {item.funHover}
                  </p>
                )}
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
