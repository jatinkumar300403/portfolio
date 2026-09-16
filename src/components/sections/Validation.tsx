"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Section, easeOut } from "../Section";
import { research, validationChecks, achievements } from "@/content/site";

export default function Validation() {
  const [copied, setCopied] = useState(false);

  const copyBibtex = () => {
    navigator.clipboard?.writeText(research.bibtex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Section
      id="validation"
      stage="stage 06 · validation"
      title="Validation"
      subtitle="Every trained model must be evaluated. Peer review is the strongest signal in the suite."
    >
      <div className="grid gap-4">
        {validationChecks.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: easeOut }}
            className="rounded-lg border border-line2 bg-panel p-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-faint">{c.name}</span>
              <span className="font-mono text-xs text-ok">{c.verdict} ✓</span>
            </div>
            <p className="mt-2 text-sm text-fg2">{c.detail}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
        className="mt-8 rounded-lg border border-brass/40 bg-panel"
      >
        <div className="border-b border-line px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-brass">
          PRIMARY EVALUATION · PEER-REVIEWED PUBLICATION
        </div>
        <div className="p-5 md:p-6">
          <h3 className="font-display text-2xl leading-snug text-fg md:text-3xl">
            {research.title}
          </h3>
          <div className="mt-2 font-mono text-xs text-data">{research.venue}</div>
          <p className="mt-4 max-w-2xl leading-relaxed text-fg2">{research.plain}</p>
          <div className="mt-5 grid max-w-md grid-cols-3 gap-3">
            {research.metrics.map((m) => (
              <div key={m.label} className="rounded border border-line px-3 py-2">
                <div className="font-mono text-[10px] text-faint">{m.label}</div>
                <div className="mt-0.5 font-mono text-sm text-fg">{m.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={copyBibtex}
              className="inline-flex items-center gap-2 rounded border border-line2 px-4 py-2 font-mono text-xs text-fg2 transition-colors hover:border-brass hover:text-brass"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "copied ✓" : "copy BibTeX"}
            </button>
            {research.paperUrl && (
              <a
                href={research.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-line2 px-4 py-2 font-mono text-xs text-fg2 transition-colors hover:border-data hover:text-data"
              >
                read paper <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      <div className="mt-8 grid gap-4">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: easeOut }}
            className="rounded-lg border border-line2 bg-panel px-5 py-4"
          >
            <div className="font-mono text-[10px] tracking-[0.18em] text-faint">
              AUX METRIC
            </div>
            <div className="mt-1 text-fg">{a.title}</div>
            <div className="text-sm text-fg2">{a.detail}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
