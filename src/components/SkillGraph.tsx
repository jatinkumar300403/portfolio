"use client";

import { useEffect, useRef, useState } from "react";
import { skillGraph, type SkillNode } from "@/content/site";
import { scrollToId } from "./SmoothScroll";

type SimNode = SkillNode & {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ph: number;
};

export default function SkillGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let hovered: SimNode | null = null;

    let colors = {
      brass: "#d9a441",
      data: "#5ec8d8",
      fg: "#edeef0",
      fg2: "#8b93a7",
      faint: "#5f6b82",
      line: "#232c3e",
    };
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const get = (v: string, fallback: string) =>
        cs.getPropertyValue(v).trim() || fallback;
      colors = {
        brass: get("--accent-brass", colors.brass),
        data: get("--accent-data", colors.data),
        fg: get("--text-primary", colors.fg),
        fg2: get("--text-secondary", colors.fg2),
        faint: get("--text-faint", colors.faint),
        line: get("--line-strong", colors.line),
      };
    };
    readColors();

    const nodes: SimNode[] = skillGraph.nodes.map((n, i) => ({
      ...n,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      ph: (i * Math.PI * 2) / skillGraph.nodes.length,
    }));
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const edges = skillGraph.edges
      .map(([a, b]) => [byId.get(a), byId.get(b)])
      .filter((e): e is [SimNode, SimNode] => !!e[0] && !!e[1]);
    const neighbors = new Map<string, Set<string>>();
    for (const [a, b] of edges) {
      if (!neighbors.has(a.id)) neighbors.set(a.id, new Set());
      if (!neighbors.has(b.id)) neighbors.set(b.id, new Set());
      neighbors.get(a.id)!.add(b.id);
      neighbors.get(b.id)!.add(a.id);
    }

    const scatter = () => {
      const hubs = nodes.filter((n) => n.kind === "hub");
      hubs.forEach((hub, i) => {
        const ang = (i / hubs.length) * Math.PI * 2 - Math.PI / 2;
        hub.x = w / 2 + Math.cos(ang) * w * 0.24;
        hub.y = h / 2 + Math.sin(ang) * h * 0.26;
      });
      for (const n of nodes) {
        if (n.kind === "hub") continue;
        const anchor =
          nodes.find(
            (m) => m.kind === "hub" && neighbors.get(n.id)?.has(m.id)
          ) ?? null;
        const cx = anchor ? anchor.x : w / 2;
        const cy = anchor ? anchor.y : h / 2;
        n.x = cx + (Math.random() - 0.5) * 140;
        n.y = cy + (Math.random() - 0.5) * 120;
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const first = w === 0;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (first) scatter();
      if (reduced) settleAndDraw();
    };

    const step = (t: number) => {
      // pairwise repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          const d2 = Math.max(120, dx * dx + dy * dy);
          const f = 2400 / d2;
          const d = Math.sqrt(d2);
          dx /= d;
          dy /= d;
          a.vx += dx * f;
          a.vy += dy * f;
          b.vx -= dx * f;
          b.vy -= dy * f;
        }
      }
      // springs
      for (const [a, b] of edges) {
        const rest = a.kind === "hub" || b.kind === "hub" ? 95 : 120;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.max(1, Math.sqrt(dx * dx + dy * dy));
        const f = (d - rest) * 0.004;
        a.vx += (dx / d) * f;
        a.vy += (dy / d) * f;
        b.vx -= (dx / d) * f;
        b.vy -= (dy / d) * f;
      }
      // centering, idle breathing, integration
      for (const n of nodes) {
        n.vx += (w / 2 - n.x) * 0.0016;
        n.vy += (h / 2 - n.y) * 0.0022;
        if (!reduced) {
          n.vx += Math.sin(t / 2400 + n.ph) * 0.012;
          n.vy += Math.cos(t / 2100 + n.ph) * 0.012;
        }
        n.vx *= 0.86;
        n.vy *= 0.86;
        n.x += Math.max(-4, Math.min(4, n.vx));
        n.y += Math.max(-4, Math.min(4, n.vy));
        const pad = 46;
        n.x = Math.max(pad, Math.min(w - pad, n.x));
        n.y = Math.max(pad + 6, Math.min(h - pad * 0.6, n.y));
      }
    };

    const nodeColor = (n: SimNode) =>
      n.kind === "hub" ? colors.brass : n.kind === "project" ? colors.data : colors.fg2;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const hSet = hovered
        ? new Set([hovered.id, ...(neighbors.get(hovered.id) ?? [])])
        : null;

      for (const [a, b] of edges) {
        const hot = hSet && hSet.has(a.id) && hSet.has(b.id);
        ctx.strokeStyle = hot ? colors.brass : colors.line;
        ctx.globalAlpha = hSet ? (hot ? 0.9 : 0.12) : 0.4;
        ctx.lineWidth = hot ? 1.4 : 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const n of nodes) {
        const dim = hSet && !hSet.has(n.id);
        ctx.globalAlpha = dim ? 0.22 : 1;
        const r = n.kind === "hub" ? 6 : n.kind === "project" ? 5 : 3.5;
        ctx.fillStyle = nodeColor(n);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        if (n.kind === "hub") {
          ctx.strokeStyle = colors.brass;
          ctx.globalAlpha = dim ? 0.15 : 0.45;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 11, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = dim ? 0.25 : 0.95;
        ctx.font =
          n.kind === "hub"
            ? "600 12px var(--font-jetbrains), monospace"
            : "11px var(--font-jetbrains), monospace";
        ctx.fillStyle = n.kind === "hub" ? colors.fg : dim ? colors.faint : colors.fg2;
        if (hovered?.id === n.id) ctx.fillStyle = colors.fg;
        ctx.fillText(n.label, n.x + r + 6, n.y + 4);
      }
      ctx.globalAlpha = 1;
    };

    const settleAndDraw = () => {
      for (let i = 0; i < 260; i++) step(i * 16);
      draw();
    };

    const loop = (t: number) => {
      step(t);
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const pick = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      let best: SimNode | null = null;
      let bestD = 30 * 30;
      for (const n of nodes) {
        const dx = n.x - x;
        const dy = n.y - y;
        const d = dx * dx + dy * dy;
        if (d < bestD) {
          bestD = d;
          best = n;
        }
      }
      return best;
    };

    const onMove = (e: PointerEvent) => {
      hovered = pick(e);
      canvas.style.cursor = hovered?.kind === "project" ? "pointer" : "default";
      setHoverLabel(
        hovered
          ? hovered.kind === "project"
            ? `${hovered.label} — click to open training logs`
            : hovered.label
          : null
      );
      if (reduced) draw();
    };
    const onLeave = () => {
      hovered = null;
      setHoverLabel(null);
      if (reduced) draw();
    };
    const onClick = (e: PointerEvent) => {
      const n = pick(e);
      if (n?.kind === "project") scrollToId("training-logs");
    };

    resize();
    if (reduced) settleAndDraw();

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.05 }
    );
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    const mo = new MutationObserver(() => {
      readColors();
      if (reduced) draw();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerup", onClick);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerup", onClick);
    };
  }, []);

  return (
    <div className="relative h-[460px] w-full overflow-hidden rounded-lg border border-line2 bg-panel/60 md:h-[540px]">
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute left-4 top-3 font-mono text-[11px] text-faint">
        feature_space.render() ·{" "}
        <span className="text-brass">hover</span> to trace dependencies
      </div>
      <div className="pointer-events-none absolute bottom-3 left-4 flex gap-4 font-mono text-[10px] text-faint">
        <span>
          <span className="text-brass">●</span> category
        </span>
        <span>
          <span className="text-fg2">●</span> skill
        </span>
        <span>
          <span className="text-data">●</span> trained artifact
        </span>
      </div>
      {hoverLabel && (
        <div className="pointer-events-none absolute bottom-3 right-4 font-mono text-[11px] text-data">
          ▸ {hoverLabel}
        </div>
      )}
    </div>
  );
}
