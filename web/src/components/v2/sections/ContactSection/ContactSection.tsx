"use client";

import { v2Contact } from "@/data/v2/contact";

export function ContactSection() {
  return (
    <div className="v2-container border-t border-foreground/8 py-24 pb-32" id="contact">
      <h2 id="contact-title" className="v2-section-title">
        Contact
      </h2>
      <p className="mt-3 text-sm text-foreground/50">Open to roles such as:</p>
      <ul className="mt-2 font-mono text-xs text-foreground/45 sm:text-sm">
        {v2Contact.openTo.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-foreground/60">
        If this profile seems interesting and you’re excited to chat, type{" "}
        <kbd className="rounded border border-foreground/20 bg-foreground/5 px-1.5 py-0.5 font-mono text-[0.8em] text-foreground/85">
          HIRE
        </kbd>{" "}
        anywhere on the page. That keyboard
        shortcut opens a short recruiter-friendly view.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <a
          href={v2Contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="v2-btn-ghost"
        >
          LinkedIn
        </a>
        <a
          href={v2Contact.github}
          target="_blank"
          rel="noreferrer"
          className="v2-btn-ghost"
        >
          GitHub
        </a>
        <a
          href={v2Contact.resume}
          target="_blank"
          rel="noreferrer"
          className="v2-btn-ghost"
        >
          Resume
        </a>
      </div>
    </div>
  );
}
