"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink, Github } from "lucide-react";
import { Section, easeOut } from "../Section";
import { projects, type Project } from "@/content/site";
import ProjectPreview from "../ProjectPreview";
import SentimentDemo from "../demos/SentimentDemo";
import CreditDemo from "../demos/CreditDemo";

function Sparkline() {
  return (
    <svg viewBox="0 0 120 30" className="h-[22px] w-[84px]" aria-hidden="true">
      <polyline
        points="0,5 16,10 32,16 50,21 70,24 95,25.5 120,26"
        fill="none"
        stroke="var(--ok)"
        strokeWidth="1.5"
        opacity="0.85"
      />
    </svg>
  );
}

function DemoFor({ p }: { p: Project }) {
  if (p.demo === "sentiment") return <SentimentDemo />;
  if (p.demo === "credit") return <CreditDemo />;
  return null;
}

function FeaturedProject({ p, index }: { p: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const flip = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="relative"
    >
      <div className="mb-3 font-mono text-[11px] text-faint">
        <span className="text-brass">$</span> cat logs/{p.epoch}.json
      </div>

      <div className="grid items-center gap-4 lg:grid-cols-12 lg:gap-0">
        <div
          className={`lg:row-start-1 lg:col-span-7 ${
            flip ? "lg:col-start-6" : "lg:col-start-1"
          }`}
        >
          <ProjectPreview project={p} />
        </div>

        <div
          className={`relative z-10 lg:row-start-1 lg:col-span-6 ${
            flip ? "lg:col-start-1 lg:text-left" : "lg:col-start-7 lg:text-right"
          }`}
        >
          <div className="rounded-lg border border-line2 bg-panel/95 p-5 backdrop-blur-sm md:p-6">
            <div
              className={`flex flex-wrap items-center gap-3 ${
                flip ? "" : "lg:justify-end"
              }`}
            >
              <span className="font-mono text-xs text-brass">{p.epoch}</span>
              <Sparkline />
              <span className="whitespace-nowrap rounded-full border border-ok/50 px-2.5 py-0.5 font-mono text-[10px] text-ok">
                converged ✓
              </span>
            </div>

            <h3 className="mt-2 font-display text-3xl leading-tight text-fg md:text-4xl">
              {p.name}
            </h3>
            <p className="mt-1 font-mono text-[12px] text-data">{p.oneLiner}</p>
            <p className="mt-4 text-sm leading-relaxed text-fg2">{p.summary}</p>

            {p.metrics && (
              <div
                className={`mt-5 flex flex-wrap gap-2 ${flip ? "" : "lg:justify-end"}`}
              >
                {p.metrics.map((m) => (
                  <span
                    key={m.label}
                    className="rounded border border-line px-2.5 py-1 font-mono text-[11px]"
                  >
                    <span className="text-faint">{m.label} </span>
                    <span className="text-fg">{m.value}</span>
                  </span>
                ))}
              </div>
            )}

            <div
              className={`mt-5 flex flex-wrap items-center gap-3 ${
                flip ? "" : "lg:justify-end"
              }`}
            >
              {p.liveUrl && (
                <a
                  href={p.liveUrl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-data bg-data/10 px-3.5 py-1.5 font-mono text-[11px] text-data transition-colors hover:bg-data/20"
                >
                  <ExternalLink size={12} /> {p.liveUrl.label}
                </a>
              )}
              <button
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls={`log-${p.slug}`}
                className="inline-flex items-center gap-1.5 rounded border border-brass px-3.5 py-1.5 font-mono text-[11px] text-brass transition-colors hover:bg-brass/10"
              >
                {open ? "collapse log" : "expand full log"}
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
              </button>
              {p.links?.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] text-fg2 transition-colors hover:text-data"
                >
                  <Github size={13} /> {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`log-${p.slug}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-5 rounded-lg border border-line2 bg-panel p-5 md:p-6">
              <div>
                <div className="font-mono text-[10px] tracking-[0.18em] text-faint">
                  OBJECTIVE
                </div>
                <p className="mt-1.5 text-sm text-fg2">{p.objective}</p>
              </div>

              <div>
                <div className="font-mono text-[10px] tracking-[0.18em] text-faint">
                  APPROACH
                </div>
                <ul className="mt-1.5 space-y-1.5">
                  {p.approach.map((a) => (
                    <li key={a} className="text-sm leading-relaxed text-fg2">
                      <span className="text-brass">▸</span> {a}
                    </li>
                  ))}
                </ul>
              </div>

              {p.result && (
                <div>
                  <div className="font-mono text-[10px] tracking-[0.18em] text-faint">
                    RESULT
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg">{p.result}</p>
                </div>
              )}

              <div>
                <div className="font-mono text-[10px] tracking-[0.18em] text-faint">
                  STACK
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-fg2"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <DemoFor p={p} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function TrainingLogs() {
  return (
    <Section
      id="training-logs"
      waypoint="training-logs"
      stage="stage 04 · model training"
      title="Training logs"
      subtitle="Each project is an epoch — every run improved the overall model. Expand a log for the full case study and a live demo."
    >
      <div className="font-mono text-xs tracking-[0.18em] text-faint">
        CONVERGED EPOCHS · {projects.length}
      </div>
      <div className="mt-8 space-y-20 md:space-y-24">
        {projects.map((p, i) => (
          <FeaturedProject key={p.slug} p={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
