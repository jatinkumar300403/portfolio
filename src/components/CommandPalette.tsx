"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToId } from "./SmoothScroll";
import { profile } from "@/content/site";

type Cmd = {
  name: string;
  hint: string;
  run: () => string[] | void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setSel(0);
    setOutput([]);
  }, []);

  const commands: Cmd[] = [
    { name: "about", hint: "jump to dataset", run: () => void (scrollToId("dataset"), close()) },
    { name: "skills", hint: "jump to feature engineering", run: () => void (scrollToId("features"), close()) },
    { name: "projects", hint: "jump to training logs", run: () => void (scrollToId("training-logs"), close()) },
    { name: "research", hint: "jump to validation", run: () => void (scrollToId("validation"), close()) },
    { name: "contact", hint: "jump to deployment", run: () => void (scrollToId("deployment"), close()) },
    { name: "resume", hint: "open résumé pdf", run: () => void window.open(profile.resumePath, "_blank", "noopener") },
    { name: "github", hint: "open github profile", run: () => void window.open(profile.github, "_blank", "noopener") },
    { name: "linkedin", hint: "open linkedin profile", run: () => void window.open(profile.linkedin, "_blank", "noopener") },
    {
      name: "email",
      hint: "copy email address",
      run: () => {
        navigator.clipboard?.writeText(profile.email).catch(() => {});
        return [`copied → ${profile.email}`];
      },
    },
    {
      name: "whoami",
      hint: "identify the model",
      run: () => [
        "jatin — AI engineer & researcher",
        "M.Sc. CS @ LU Hannover · base: Greater Noida, IN",
        "training: complete ✓ · open to opportunities",
      ],
    },
    {
      name: "ls",
      hint: "list sections",
      run: () => [
        "dataset/        preprocessing/  features/",
        "training-logs/  tuning/         validation/",
        "deployment/     resume.pdf",
      ],
    },
    {
      name: "sudo hire-me",
      hint: "escalate privileges",
      run: () => {
        navigator.clipboard?.writeText(profile.email).catch(() => {});
        return [
          "[sudo] password for recruiter: ********",
          "access granted ✓",
          `secure channel open → ${profile.email} (copied to clipboard)`,
        ];
      },
    },
    {
      name: "status",
      hint: "query the model",
      run: () => [
        "model:       Jatin Kumar",
        "version:     2026.1",
        "training:    complete ✓",
        "deployment:  production ready — open to AI/ML & SWE roles",
      ],
    },
    {
      name: "predict",
      hint: "run inference",
      run: () => [
        "running inference...",
        "prediction → strong fit: AI Engineering",
        "prediction → strong fit: Machine Learning",
        "prediction → strong fit: Software Engineering",
        "confidence: high",
      ],
    },
    {
      name: "help",
      hint: "list commands",
      run: () => [
        "available commands:",
        "about · skills · projects · research · contact",
        "resume · github · linkedin · email · status · predict",
        "whoami · ls · sudo hire-me",
      ],
    },
  ];

  const filtered = q
    ? commands.filter((c) => c.name.includes(q.toLowerCase().trim()))
    : commands;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) {
      window.__lenis?.stop();
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      window.__lenis?.start();
    }
  }, [open]);

  const runCmd = (cmd: Cmd) => {
    const out = cmd.run();
    if (out) {
      setOutput([`$ ${cmd.name}`, ...out]);
      setQ("");
      setSel(0);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={close}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-label="Command palette"
            className="relative w-full max-w-lg overflow-hidden rounded-lg border border-line2 bg-panel shadow-2xl"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="font-mono text-sm text-brass">❯</span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                  setOutput([]);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSel((s) => Math.min(filtered.length - 1, s + 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSel((s) => Math.max(0, s - 1));
                  } else if (e.key === "Enter" && filtered[sel]) {
                    runCmd(filtered[sel]);
                  }
                }}
                placeholder="type a command… (try: predict)"
                className="w-full bg-transparent font-mono text-sm text-fg placeholder:text-faint focus:outline-none"
                aria-label="Command input"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">
                esc
              </kbd>
            </div>

            {output.length > 0 ? (
              <div className="px-4 py-3 font-mono text-[12px] leading-[1.9]">
                {output.map((line, i) => (
                  <div key={i} className={i === 0 ? "text-brass" : "text-fg2"}>
                    {line}
                  </div>
                ))}
              </div>
            ) : (
              <ul className="max-h-72 overflow-y-auto py-1.5">
                {filtered.length === 0 && (
                  <li className="px-4 py-3 font-mono text-xs text-faint">
                    command not found: {q}
                  </li>
                )}
                {filtered.map((c, i) => (
                  <li key={c.name}>
                    <button
                      onClick={() => runCmd(c)}
                      onMouseEnter={() => setSel(i)}
                      className={`flex w-full items-center justify-between px-4 py-2 font-mono text-[13px] transition-colors ${
                        i === sel ? "bg-elevated text-fg" : "text-fg2"
                      }`}
                    >
                      <span>
                        <span className="text-brass">›</span> {c.name}
                      </span>
                      <span className="text-[11px] text-faint">{c.hint}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-line px-4 py-2 font-mono text-[10px] text-faint">
              ↑↓ navigate · enter run · esc close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
