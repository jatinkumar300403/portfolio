"use client";

import { motion } from "framer-motion";
import { useBooted } from "./Experience";
import { scrollToId } from "./SmoothScroll";
import { profile } from "@/content/site";
import Starfield from "./Starfield";
import { easeOut } from "./Section";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

function CardRow({ k, v, accent }: { k: string; v: React.ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-2.5 last:border-b-0">
      <span className="font-mono text-[11px] text-faint">{k}</span>
      <span
        className={`text-right font-mono text-[12px] ${accent ? "text-data" : "text-fg"}`}
      >
        {v}
      </span>
    </div>
  );
}

export default function Hero() {
  const booted = useBooted();

  return (
    <section
      id="hero"
      data-waypoint-id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <Starfield />
      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:px-12 lg:px-20"
        variants={container}
        initial="hidden"
        animate={booted ? "show" : "hidden"}
      >
        <div>
          <motion.div variants={item} className="font-mono text-xs tracking-[0.2em] text-brass">
            28.47°N 77.51°E — GREATER NOIDA, IN · TRAINING RUN {profile.version}
          </motion.div>
          <motion.h1
            variants={item}
            className="mt-5 font-display text-5xl leading-[1.05] text-fg md:text-7xl"
          >
            {profile.name}
          </motion.h1>
          <motion.p variants={item} className="mt-4 font-mono text-sm text-data">
            Computer Science · AI/ML Research · AI Full-Stack Engineering
          </motion.p>
          <motion.p variants={item} className="mt-6 max-w-lg leading-relaxed text-fg2">
            {profile.tagline} Currently pursuing my M.Sc. in Computer Science at
            Leibniz Universität Hannover, Germany.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollToId("training-logs")}
              className="rounded border border-brass px-5 py-2.5 font-mono text-sm text-brass transition-colors hover:bg-brass/10"
            >
              View training logs
            </button>
            <a
              href={profile.resumePath}
              download
              className="rounded border border-line2 px-5 py-2.5 font-mono text-sm text-fg2 transition-colors hover:border-fg2 hover:text-fg"
            >
              Download résumé
            </a>
            <button
              onClick={() => scrollToId("deployment")}
              className="rounded border border-line2 px-5 py-2.5 font-mono text-sm text-fg2 transition-colors hover:border-data hover:text-data"
            >
              Deploy this model →
            </button>
          </motion.div>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.965 },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.7, ease: easeOut },
            },
          }}
          className="rounded-lg border border-line2 bg-panel/80 backdrop-blur"
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
              MODEL SUMMARY
            </span>
            <span className="font-mono text-[11px] text-brass">{profile.version}</span>
          </div>
          <CardRow k="model_name" v={profile.name} />
          <CardRow k="architecture" v="research + engineering" />
          <CardRow
            k="status"
            v={
              <span className="inline-flex items-center gap-2">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-ok" />
                production ready
              </span>
            }
            accent
          />
          <CardRow k="checkpoint" v="ICCS 2025 · Springer LNCS" />
          <CardRow k="deployment_target" v="AI/ML · Software Engineering" />
          <div className="px-4 py-3 font-mono text-[11px] text-faint">
            <span className="text-brass">$</span> inference begins below ↓
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] text-faint"
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden="true"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="inline-block"
        >
          scroll to begin training ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
