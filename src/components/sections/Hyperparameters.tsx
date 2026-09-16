"use client";

import { motion } from "framer-motion";
import { Section, easeOut } from "../Section";
import { experience } from "@/content/site";

export default function Hyperparameters() {
  return (
    <Section
      id="hyperparams"
      stage="stage 05 · hyperparameter optimization"
      title="Hyperparameter optimization"
      subtitle="Internships, research, and freelance work — each one tuned how this model learns. Values are metaphorical; the work is not."
    >
      <div className="space-y-4">
        {experience.map((e, i) => (
          <motion.div
            key={e.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: easeOut }}
            className="rounded-lg border border-line2 bg-panel p-5 transition-colors hover:border-brass/60"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-mono text-xs text-brass">{e.step}</span>
              <span className="font-mono text-[11px] text-faint">{e.period}</span>
            </div>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-lg text-fg">{e.title}</span>
              <span className="text-sm text-fg2">{e.org}</span>
            </div>
            <div className="mt-2 font-mono text-[11px] text-data">
              {e.hyperparam.name}: {e.hyperparam.note}
            </div>
            <ul className="mt-3 space-y-1.5">
              {e.points.map((pt) => (
                <li key={pt} className="text-sm leading-relaxed text-fg2">
                  <span className="text-brass">▸</span> {pt}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
