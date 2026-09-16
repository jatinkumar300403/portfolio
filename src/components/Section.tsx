"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export function Section({
  id,
  stage,
  title,
  subtitle,
  waypoint,
  children,
  className,
}: {
  id: string;
  stage: string;
  title: string;
  subtitle?: string;
  waypoint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-waypoint-id={waypoint}
      className={`relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:px-12 md:py-28 lg:px-20 ${className ?? ""}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <div className="font-mono text-xs tracking-[0.2em] text-brass">
          <span className="select-none">{"//"}</span> {stage}
        </div>
        <h2 className="mt-3 font-display text-4xl text-fg md:text-5xl">{title}</h2>
        {subtitle && <p className="mt-4 max-w-xl text-fg2">{subtitle}</p>}
      </motion.div>
      <div className="mt-12">{children}</div>
    </section>
  );
}

export function LogFragment({ text }: { text: string }) {
  return (
    <motion.div
      className="mx-auto max-w-6xl px-6 py-1 font-mono text-xs text-faint md:px-12 lg:px-20"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 0.9, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: easeOut }}
      aria-hidden="true"
    >
      ▸ {text}
    </motion.div>
  );
}
