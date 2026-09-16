"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

export default function TrainingWidget() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.4,
  });
  const [s, setS] = useState({ epoch: 1, loss: 8.42, acc: 12, p: 0 });
  const [min, setMin] = useState(false);

  useMotionValueEvent(smooth, "change", (v) => {
    const p = Math.min(1, Math.max(0, v));
    setS({
      epoch: Math.max(1, Math.round(p * 100)),
      loss: Math.max(0.01, 8.42 * Math.exp(-6.73 * p)),
      acc: 12 + 86.4 * p,
      p,
    });
  });

  const complete = s.p > 0.985;

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[65] h-[3px] w-full origin-left bg-brass md:hidden"
        style={{ scaleX: smooth }}
        aria-hidden="true"
      />

      <div className="fixed bottom-5 right-5 z-40 hidden md:block" aria-live="off">
        {min ? (
          <button
            onClick={() => setMin(false)}
            className="rounded-full border border-line2 bg-panel/90 px-4 py-2 font-mono text-[11px] text-fg2 backdrop-blur transition-colors hover:border-brass"
            aria-label="Expand training status"
          >
            epoch {s.epoch}/100{" "}
            <span className={complete ? "text-ok" : "text-brass"}>
              {complete ? "✓" : "▴"}
            </span>
          </button>
        ) : (
          <div
            className={`w-60 rounded-lg border bg-panel/90 backdrop-blur transition-colors duration-700 ${
              complete ? "border-brass" : "border-line2"
            }`}
          >
            <div className="flex items-center justify-between border-b border-line px-3.5 py-2">
              <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                TRAINING STATUS
              </span>
              <button
                onClick={() => setMin(true)}
                className="font-mono text-[11px] text-faint transition-colors hover:text-fg2"
                aria-label="Minimize training status"
              >
                —
              </button>
            </div>
            <div className="space-y-1.5 px-3.5 py-3 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-faint">epoch</span>
                <span className="text-fg">{s.epoch} / 100</span>
              </div>
              <div className="h-[5px] overflow-hidden rounded-sm bg-line">
                <div
                  className={`h-full rounded-sm transition-[width] duration-200 ${
                    complete ? "bg-ok" : "bg-brass"
                  }`}
                  style={{ width: `${s.epoch}%` }}
                />
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-faint">loss</span>
                <span className={s.loss < 0.1 ? "text-data" : "text-fg"}>
                  {s.loss.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-faint">val_accuracy</span>
                <span className="text-fg">{s.acc.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-faint">checkpoint</span>
                {complete ? (
                  <span className="text-ok">training complete ✓</span>
                ) : (
                  <span className="text-fg2">auto-saved</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
