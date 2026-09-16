"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Command, Menu, Moon, Sun, X } from "lucide-react";
import { scrollToId } from "./SmoothScroll";

const links = [
  { id: "dataset", term: "dataset", plain: "about me" },
  { id: "cleaning", term: "preprocessing", plain: "education" },
  { id: "features", term: "features", plain: "skills" },
  { id: "training-logs", term: "training", plain: "projects" },
  { id: "hyperparams", term: "tuning", plain: "experience" },
  { id: "validation", term: "validation", plain: "research" },
  { id: "deployment", term: "deploy", plain: "contact" },
];

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLight(document.documentElement.getAttribute("data-theme") === "light");
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      className="rounded border border-line2 p-2 text-fg2 transition-colors hover:border-brass hover:text-brass"
      aria-label={mounted && light ? "Switch to dark mode" : "Switch to light mode"}
    >
      {mounted && light ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const l of links) {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    }
    const hero = document.getElementById("hero");
    if (hero) io.observe(hero);
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-base/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-12 lg:px-20">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-sm text-fg"
          aria-label="Back to top"
        >
          <span className="text-brass">jatin</span>@model:~
          <span className="text-brass">$</span>{" "}
          <span
            className="blink-cursor"
            style={{ width: "0.5em", height: "1em" }}
            aria-hidden="true"
          />
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                aria-current={isActive ? "true" : undefined}
                className="group relative px-2.5 py-1 text-left"
                title={`${l.term} — ${l.plain}`}
              >
                <span
                  className={`block font-mono text-[11px] leading-tight transition-colors ${
                    isActive ? "text-brass" : "text-fg2 group-hover:text-fg"
                  }`}
                >
                  {isActive ? "▸ " : ""}
                  {l.term}
                </span>
                <span
                  className={`block font-mono text-[9px] leading-tight tracking-wide transition-colors ${
                    isActive ? "text-fg2" : "text-faint group-hover:text-fg2"
                  }`}
                >
                  {l.plain}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-x-1.5 -bottom-[13px] h-[2px] bg-brass"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-palette"))}
            className="hidden items-center gap-1.5 rounded border border-line2 px-2.5 py-1.5 font-mono text-[11px] text-fg2 transition-colors hover:border-data hover:text-data md:flex"
            aria-label="Open command palette"
            title="Command palette — jump anywhere, run commands"
          >
            <Command size={12} /> K
          </button>
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="rounded border border-line2 p-2 text-fg2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-line bg-base/95 px-6 py-4 backdrop-blur lg:hidden"
          aria-label="Sections"
        >
          <div className="grid grid-cols-2 gap-2">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="rounded border border-line px-3 py-2 text-left transition-colors hover:border-brass"
              >
                <span className="block font-mono text-xs text-fg2">▸ {l.term}</span>
                <span className="block font-mono text-[10px] text-faint">{l.plain}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
