"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { waypoints } from "@/content/site";

type Point = { y: number; label: string };

export default function TrajectoryLine() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 24 });
  const [geom, setGeom] = useState<{ total: number; vh: number; points: Point[] }>({
    total: 1,
    vh: 1,
    points: [],
  });
  const [drawn, setDrawn] = useState(0);

  useEffect(() => {
    const measure = () => {
      const total = document.documentElement.scrollHeight;
      const vh = window.innerHeight;
      const points = waypoints
        .map((w) => {
          const el = document.querySelector<HTMLElement>(
            `[data-waypoint-id="${w.id}"]`
          );
          if (!el) return null;
          return {
            y: el.getBoundingClientRect().top + window.scrollY + 140,
            label: w.label,
          };
        })
        .filter((p): p is Point => p !== null);
      setGeom({ total, vh, points });
    };
    measure();
    const t = setTimeout(measure, 600);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, []);

  const lineH = useTransform(
    smooth,
    (p) => p * (geom.total - geom.vh) + geom.vh * 0.55
  );
  useMotionValueEvent(lineH, "change", (v) => setDrawn(v));

  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-5 z-30 hidden w-px md:block lg:left-9"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-line" />
      <motion.div
        className="absolute left-0 top-0 w-px bg-brass"
        style={{ height: lineH }}
      />
      {geom.points.map((pt) => (
        <div key={pt.label} className="absolute -left-[5px]" style={{ top: pt.y }}>
          <div
            className={`h-[11px] w-[11px] rounded-full border-2 border-brass transition-colors duration-500 ${
              drawn >= pt.y ? "bg-brass" : "bg-base"
            }`}
          />
          <div
            className={`absolute left-[3px] top-5 font-mono text-[10px] tracking-[0.22em] transition-colors duration-500 ${
              drawn >= pt.y ? "text-brass" : "text-faint"
            }`}
            style={{ writingMode: "vertical-rl" }}
          >
            {pt.label}
          </div>
        </div>
      ))}
    </div>
  );
}
