"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; a: number; ph: number; d: number };

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let raf = 0;
    let color = "#EDEEF0";

    const readColor = () => {
      color =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--text-primary")
          .trim() || "#EDEEF0";
    };
    readColor();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round((w * h) / 9000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.1,
        a: 0.15 + Math.random() * 0.55,
        ph: Math.random() * Math.PI * 2,
        d: 0.3 + Math.random() * 0.7,
      }));
      if (reduced) draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (const s of stars) {
        const tw = reduced ? 1 : 0.65 + 0.35 * Math.sin(t / 900 + s.ph);
        ctx.globalAlpha = s.a * tw;
        ctx.beginPath();
        ctx.arc(s.x + mouseX * 14 * s.d, s.y + mouseY * 10 * s.d, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };

    resize();
    if (!reduced) {
      raf = requestAnimationFrame(loop);
      window.addEventListener("mousemove", onMove);
    }
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    const mo = new MutationObserver(() => {
      readColor();
      if (reduced) draw(0);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 opacity-70" aria-hidden="true" />;
}
