"use client";

import { motion } from "framer-motion";
import { Section, easeOut } from "../Section";
import { education } from "@/content/site";

export default function DataCleaning() {
  return (
    <Section
      id="cleaning"
      stage="stage 02 · preprocessing"
      title="Data cleaning"
      subtitle="Models need clean, structured data before they can learn. These preprocessing steps built the foundations."
    >
      <div className="space-y-4">
        {education.map((ed, i) => (
          <motion.div
            key={ed.school}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: easeOut }}
            className="group rounded-lg border border-line2 bg-panel p-5 transition-colors hover:border-brass/60"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="font-mono text-xs text-brass">
                {ed.op === "running" ? "⟳" : "✓"} op_{String(i + 1).padStart(2, "0")} ·{" "}
                {ed.op === "running" ? "running" : "applied"}
              </div>
              <div className="font-mono text-[11px] text-faint">{ed.period}</div>
            </div>
            <div className="mt-2 text-lg text-fg">{ed.school}</div>
            <div className="text-sm text-fg2">
              {ed.degree} · {ed.note}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {ed.features.map((f) => (
                <span
                  key={f}
                  className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-fg2 transition-colors group-hover:border-line2"
                >
                  {f}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
