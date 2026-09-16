"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { Section, easeOut } from "../Section";
import { profile } from "@/content/site";

function FinalScene() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [cmd, setCmd] = useState("");
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (!inView) return;
    const full = "$ deploy model";
    const outLines = [
      "Deployment successful.",
      "Thank you for reviewing this model.",
    ];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCmd(full);
      setLines(outLines);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    full.split("").forEach((_, i) => {
      timers.push(setTimeout(() => setCmd(full.slice(0, i + 1)), 500 + i * 70));
    });
    outLines.forEach((l, i) => {
      timers.push(
        setTimeout(
          () => setLines((prev) => [...prev, l]),
          500 + full.length * 70 + 500 + i * 550
        )
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="mt-12 rounded-lg border border-line2 bg-panel p-6 font-mono text-[13px] leading-[2]"
    >
      <div className="text-faint">{"=".repeat(44)}</div>
      <div className="text-fg">
        Training complete · Final validation passed · Model exported
      </div>
      <div className="text-fg2">
        model: <span className="text-fg">{profile.name}</span> · version:{" "}
        <span className="text-fg">2026.1</span> · status:{" "}
        <span className="text-ok">production ready</span>
      </div>
      <div className="text-faint">{"=".repeat(44)}</div>
      <div className="mt-3 min-h-[1.5em] text-data">{cmd}</div>
      {lines.map((l, i) => (
        <motion.div
          key={l}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={i === 0 ? "text-brass" : "text-fg2"}
        >
          {l}
        </motion.div>
      ))}
      <span className="blink-cursor" aria-hidden="true" />
    </div>
  );
}

export default function Deployment() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(profile.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const endpoints = [
    { label: "github", href: profile.github, icon: Github },
    { label: "linkedin", href: profile.linkedin, icon: Linkedin },
    { label: "résumé", href: profile.resumePath, icon: FileText },
  ];

  return (
    <Section
      id="deployment"
      waypoint="deployment"
      stage="stage 07 · deployment"
      title="Deployment"
      subtitle="Deployed to production: M.Sc. Computer Science at Leibniz Universität Hannover. Endpoints are live."
      className="pb-10"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="rounded-lg border border-line2 bg-panel"
        >
          <div className="border-b border-line px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-faint">
            DEPLOYMENT STATUS
          </div>
          <div className="space-y-3 px-5 py-4 font-mono text-[12px]">
            <div className="flex justify-between">
              <span className="text-faint">status</span>
              <span className="inline-flex items-center gap-2 text-ok">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-ok" />
                production ready
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-faint">availability</span>
              <span className="text-right text-fg">
                open for AI/ML &amp; SWE opportunities
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-faint">deployed_region</span>
              <span className="text-fg">Hannover, DE · LU Hannover</span>
            </div>
            <div className="flex justify-between">
              <span className="text-faint">current_base</span>
              <span className="text-fg">Greater Noida, IN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-faint">languages</span>
              <span className="text-fg">EN · HI · DE (A2→B1)</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
        >
          <div className="font-mono text-[11px] tracking-[0.18em] text-faint">
            INFERENCE ENDPOINTS
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {endpoints.map((e) => (
              <a
                key={e.label}
                href={e.href}
                target={e.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-line2 bg-panel px-4 py-3 font-mono text-sm text-fg2 transition-all hover:-translate-y-0.5 hover:border-data hover:text-data"
              >
                <e.icon size={16} className="text-faint transition-colors group-hover:text-data" />
                {e.label}
              </a>
            ))}
            <button
              onClick={copyEmail}
              className="group flex items-center gap-3 rounded-lg border border-line2 bg-panel px-4 py-3 font-mono text-sm text-fg2 transition-all hover:-translate-y-0.5 hover:border-data hover:text-data"
            >
              <Mail size={16} className="text-faint transition-colors group-hover:text-data" />
              {copied ? "copied ✓" : "email"}
            </button>
          </div>
          <a
            href={`mailto:${profile.email}?subject=Deploying%20this%20model`}
            className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-brass bg-brass/10 px-5 py-3.5 font-mono text-sm text-brass transition-colors hover:bg-brass/20"
          >
            Deploy this model →
          </a>
        </motion.div>
      </div>

      <FinalScene />

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 font-mono text-[11px] text-faint">
        <span>© 2026 {profile.name} · built between Greater Noida and Hannover</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="transition-colors hover:text-brass"
        >
          ↑ retrain from epoch 1
        </button>
      </footer>
    </Section>
  );
}
