"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type BootLine = { at: number; text: string; accent?: boolean };

const SCRIPT: BootLine[] = [
  { at: 0, text: "$ python train_model.py", accent: true },
  { at: 350, text: "Initializing environment... ok" },
  { at: 650, text: "Loading dataset... 22y of samples" },
  { at: 950, text: "Cleaning data... ok" },
  { at: 1200, text: "Extracting features... ok" },
  { at: 1450, text: "Training model..." },
];

const EPOCH_START = 1500;
const EPOCH_DURATION = 1400;
const OUTRO: BootLine[] = [
  { at: 3050, text: "Model converged." },
  { at: 3300, text: "Exporting checkpoint... saved", accent: true },
  { at: 3550, text: "Model ready.", accent: true },
];
const DONE_AT = 4000;

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<BootLine[]>([]);
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(8.42);
  const lossHistory = useRef<number[]>([]);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem("booted", "1");
    } catch {}
    onDone();
  };

  useEffect(() => {
    // Skip entirely on repeat visits or reduced motion
    let skip = false;
    try {
      skip = sessionStorage.getItem("booted") === "1";
    } catch {}
    if (skip || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    [...SCRIPT, ...OUTRO].forEach((line) => {
      timers.push(
        setTimeout(() => setVisibleLines((v) => [...v, line]), line.at)
      );
    });

    let raf = 0;
    const startEpochs = setTimeout(() => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / EPOCH_DURATION);
        const e = Math.max(1, Math.round(t * 100));
        const l = 8.42 * Math.pow(0.03 / 8.42, t);
        setEpoch(e);
        setLoss(l);
        lossHistory.current.push(l);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, EPOCH_START);
    timers.push(startEpochs);

    timers.push(setTimeout(finish, DONE_AT));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const barLen = 22;
  const filled = Math.round((epoch / 100) * barLen);
  const history = lossHistory.current;
  const points = history
    .filter((_, i) => i % 2 === 0)
    .map((l, i, arr) => {
      const x = (i / Math.max(1, arr.length - 1)) * 120;
      const y = 4 + (l / 8.42) * 22;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-base px-4"
      exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
      aria-label="Boot sequence — press Enter to skip"
    >
      <motion.div
        className="w-full max-w-xl rounded-lg border border-line2 bg-panel shadow-2xl"
        initial={{ opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -34, scale: 0.97, transition: { duration: 0.5 } }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line2" />
          <span className="h-2.5 w-2.5 rounded-full bg-line2" />
          <span className="h-2.5 w-2.5 rounded-full bg-line2" />
          <span className="ml-3 font-mono text-[11px] text-faint">
            train_model.py — jatin@portfolio
          </span>
        </div>
        <div className="min-h-[300px] p-5 font-mono text-[13px] leading-[1.9]">
          {visibleLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              className={line.accent ? "text-data" : "text-fg2"}
            >
              {line.text}
            </motion.div>
          ))}
          {epoch > 0 && (
            <div className="text-fg">
              <div>
                Epoch {epoch}/100{"  "}
                <span className="text-faint">
                  [{"█".repeat(filled)}
                  {"░".repeat(barLen - filled)}]
                </span>
              </div>
              <div>
                Loss:{" "}
                <span className={loss < 0.1 ? "text-data" : "text-brass"}>
                  {loss.toFixed(2)}
                </span>
                {history.length > 4 && (
                  <svg
                    viewBox="0 0 120 30"
                    className="ml-3 inline-block h-[26px] w-[110px] align-middle opacity-80"
                    aria-hidden="true"
                  >
                    <polyline
                      points={points}
                      fill="none"
                      stroke="var(--accent-data)"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
              </div>
            </div>
          )}
          <span className="blink-cursor" aria-hidden="true" />
        </div>
      </motion.div>
      <button
        onClick={finish}
        className="absolute bottom-6 right-6 font-mono text-xs text-faint transition-colors hover:text-fg2"
      >
        skip [enter] ⏎
      </button>
    </motion.div>
  );
}
