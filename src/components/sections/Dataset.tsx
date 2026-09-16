"use client";

import { motion } from "framer-motion";
import { Section, easeOut } from "../Section";
import { profile } from "@/content/site";

function SampleCard({
  id,
  rows,
  delay,
}: {
  id: string;
  rows: [string, string][];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: easeOut }}
      className="rounded-lg border border-line2 bg-panel transition-colors hover:border-brass/60"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-[11px] tracking-[0.18em] text-faint">{id}</span>
        <span className="font-mono text-[11px] text-ok">verified ✓</span>
      </div>
      <div className="px-4 py-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-4 py-1 font-mono text-[12px]">
            <span className="w-24 shrink-0 text-faint">{k}</span>
            <span className="text-fg">{v}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Dataset() {
  return (
    <Section
      id="dataset"
      stage="stage 01 · dataset"
      title="Dataset"
      subtitle="Every intelligent system begins with data. These are the raw samples this model was trained on."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <SampleCard
            id="sample_001 · identity"
            delay={0}
            rows={[
              ["name", profile.name],
              ["domain", "Computer Science"],
              ["origin", "VIT Vellore · CGPA 8.64"],
              ["current", "M.Sc. CS · LU Hannover"],
              ["location", "Greater Noida, IN"],
              ["objective", "AI / ML Engineering"],
            ]}
          />
          <SampleCard
            id="sample_002 · interests"
            delay={0.12}
            rows={[
              ["research", "NLP · Continual Learning · LLMs"],
              ["building", "0→1 products"],
              ["learning", "German · A2 → B1"],
              ["orbit", "astrophysics writing"],
            ]}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
          className="space-y-5 leading-relaxed text-fg2"
        >
          {profile.about.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <p className="font-mono text-xs text-faint">
            ▸ label_quality: high · source: first-hand experience
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
