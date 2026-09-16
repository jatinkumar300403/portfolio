"use client";

import Image from "next/image";
import type { Project } from "@/content/site";

function CommentLensMock() {
  const donut = [
    { pct: 62, color: "#2ea86b", label: "positive" },
    { pct: 25, color: "#9aa3b2", label: "neutral" },
    { pct: 13, color: "#d4504e", label: "negative" },
  ];
  let offset = 0;
  const circumference = 2 * Math.PI * 15.9155;

  return (
    <div
      className="h-full w-full bg-[#0f0f0f]"
      style={{ containerType: "inline-size" }}
    >
      <div
        className="flex items-center gap-[1.4cqw] border-b border-[#272727] px-[2.4cqw]"
        style={{ height: "8cqw" }}
      >
        <span
          className="grid place-items-center rounded-[0.6cqw] bg-[#ff0000]"
          style={{ width: "4.2cqw", height: "3cqw" }}
        >
          <span
            style={{
              width: 0,
              height: 0,
              borderTop: "0.7cqw solid transparent",
              borderBottom: "0.7cqw solid transparent",
              borderLeft: "1.1cqw solid #fff",
            }}
          />
        </span>
        <span className="text-white" style={{ fontSize: "2.4cqw", fontWeight: 500 }}>
          YouTube
        </span>
        <span
          className="ml-auto rounded-[0.8cqw] bg-[#1f6feb] px-[1.6cqw] py-[0.6cqw] text-white"
          style={{ fontSize: "1.9cqw" }}
        >
          ◉ CommentLens
        </span>
      </div>

      <div className="flex" style={{ height: "calc(100% - 8cqw)" }}>
        <div className="flex-1 p-[2.4cqw]">
          <div
            className="grid w-full place-items-center rounded-[1cqw] bg-[#1c1c1c]"
            style={{ height: "18cqw" }}
          >
            <span
              style={{
                width: 0,
                height: 0,
                borderTop: "2cqw solid transparent",
                borderBottom: "2cqw solid transparent",
                borderLeft: "3.2cqw solid #3f3f3f",
              }}
            />
          </div>
          <div
            className="mt-[1.8cqw] text-[#aaa]"
            style={{ fontSize: "1.9cqw", fontFamily: "var(--font-jetbrains), monospace" }}
          >
            1,284 comments · analysed in 2.1s
          </div>

          {[
            { badge: "POS", color: "#2ea86b", w: ["78%", "54%"] },
            { badge: "NEU", color: "#9aa3b2", w: ["64%", "40%"] },
            { badge: "NEG", color: "#d4504e", w: ["82%", "46%"] },
          ].map((c, i) => (
            <div key={i} className="mt-[2cqw] flex items-start gap-[1.4cqw]">
              <span
                className="shrink-0 rounded-full bg-[#333]"
                style={{ width: "3.4cqw", height: "3.4cqw" }}
              />
              <span className="flex-1">
                <span
                  className="block rounded-full bg-[#3a3a3a]"
                  style={{ height: "1.2cqw", width: c.w[0] }}
                />
                <span
                  className="mt-[0.8cqw] block rounded-full bg-[#2c2c2c]"
                  style={{ height: "1.2cqw", width: c.w[1] }}
                />
              </span>
              <span
                className="shrink-0 rounded-[0.5cqw] px-[1cqw] py-[0.3cqw] text-white"
                style={{
                  fontSize: "1.55cqw",
                  background: c.color,
                  fontFamily: "var(--font-jetbrains), monospace",
                }}
              >
                {c.badge}
              </span>
            </div>
          ))}
        </div>

        <div
          className="m-[2.2cqw] ml-0 shrink-0 rounded-[1.2cqw] bg-white p-[2cqw]"
          style={{ width: "38%" }}
        >
          <div
            className="flex items-center justify-between text-[#0f172a]"
            style={{ fontSize: "2cqw", fontWeight: 600 }}
          >
            CommentLens
            <span className="text-[#1f6feb]">◉</span>
          </div>

          <div className="mt-[1.6cqw] flex items-center gap-[2cqw]">
            <svg viewBox="0 0 36 36" style={{ width: "13cqw", height: "13cqw" }}>
              {donut.map((d) => {
                const dash = `${(d.pct / 100) * circumference} ${circumference}`;
                const rot = (offset / 100) * 360 - 90;
                offset += d.pct;
                return (
                  <circle
                    key={d.label}
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke={d.color}
                    strokeWidth="5"
                    strokeDasharray={dash}
                    transform={`rotate(${rot} 18 18)`}
                  />
                );
              })}
              <text
                x="18"
                y="20.5"
                textAnchor="middle"
                fill="#0f172a"
                style={{ font: "600 7px var(--font-jetbrains), monospace" }}
              >
                62%
              </text>
            </svg>
            <div className="flex-1">
              {donut.map((d) => (
                <div
                  key={d.label}
                  className="flex items-center gap-[0.9cqw] text-[#475569]"
                  style={{ fontSize: "1.7cqw", lineHeight: 1.9 }}
                >
                  <span
                    className="rounded-full"
                    style={{ width: "1.2cqw", height: "1.2cqw", background: d.color }}
                  />
                  {d.label}
                  <span className="ml-auto text-[#0f172a]">{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-[1.8cqw] text-[#94a3b8]"
            style={{ fontSize: "1.5cqw", fontFamily: "var(--font-jetbrains), monospace" }}
          >
            sentiment over time
          </div>
          <svg viewBox="0 0 100 24" style={{ width: "100%", height: "7cqw" }}>
            <polyline
              points="0,17 14,12 28,14 42,8 56,10 70,5 85,7 100,4"
              fill="none"
              stroke="#2ea86b"
              strokeWidth="1.6"
            />
            <polyline
              points="0,20 14,21 28,19 42,21 56,20 70,22 85,21 100,22"
              fill="none"
              stroke="#d4504e"
              strokeWidth="1.2"
              opacity="0.8"
            />
          </svg>

          <div className="mt-[1.4cqw] flex flex-wrap gap-[0.8cqw]">
            {[
              ["goated", 2.3],
              ["editing", 1.8],
              ["bhai", 2.1],
              ["thanks", 1.7],
              ["cringe", 1.5],
              ["🔥", 2],
            ].map(([w, s]) => (
              <span
                key={String(w)}
                className="rounded-[0.5cqw] px-[0.9cqw] text-[#334155]"
                style={{ fontSize: `${s}cqw`, background: "#eef2f7" }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CredCheckMock() {
  const models = [
    { name: "Decision Tree", score: 0.581 },
    { name: "Extra Trees", score: 0.648 },
    { name: "Random Forest", score: 0.667 },
    { name: "XGBoost", score: 0.695 },
  ];

  return (
    <div
      className="flex h-full w-full bg-white"
      style={{ containerType: "inline-size" }}
    >
      <div className="shrink-0 bg-[#f0f2f6] p-[2.2cqw]" style={{ width: "33%" }}>
        <div
          className="text-[#31333f]"
          style={{ fontSize: "2.1cqw", fontWeight: 600 }}
        >
          Applicant
        </div>
        {[
          ["Age", "35"],
          ["Job", "2 — skilled"],
          ["Housing", "own"],
          ["Saving acct", "little"],
          ["Checking", "moderate"],
          ["Credit amt", "3,500"],
          ["Duration", "24 mo"],
        ].map(([k, v]) => (
          <div key={k} className="mt-[1.5cqw]">
            <div className="text-[#5b6472]" style={{ fontSize: "1.5cqw" }}>
              {k}
            </div>
            <div
              className="mt-[0.4cqw] rounded-[0.6cqw] border border-[#d6dae2] bg-white px-[1cqw] py-[0.6cqw] text-[#31333f]"
              style={{ fontSize: "1.7cqw" }}
            >
              {v}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 p-[2.6cqw]">
        <div
          className="text-[#31333f]"
          style={{ fontSize: "3.4cqw", fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          CredCheck
        </div>
        <div className="text-[#6b7280]" style={{ fontSize: "1.8cqw" }}>
          German Credit · XGBoost classifier
        </div>

        <div
          className="mt-[2.2cqw] rounded-[0.8cqw] border-l-[0.9cqw] border-[#21a366] bg-[#eaf7f0] px-[2cqw] py-[1.6cqw]"
          style={{ borderRadius: 0 }}
        >
          <div
            className="text-[#14532d]"
            style={{ fontSize: "2.6cqw", fontWeight: 700 }}
          >
            GOOD CREDIT RISK
          </div>
          <div
            className="text-[#166534]"
            style={{ fontSize: "1.7cqw", fontFamily: "var(--font-jetbrains), monospace" }}
          >
            p(good) = 0.78 · decision threshold 0.50
          </div>
        </div>

        <div
          className="mt-[2.4cqw] text-[#6b7280]"
          style={{ fontSize: "1.6cqw", fontFamily: "var(--font-jetbrains), monospace" }}
        >
          model comparison — test accuracy
        </div>
        <div className="mt-[1.2cqw]">
          {models.map((m) => {
            const win = m.name === "XGBoost";
            return (
              <div key={m.name} className="mt-[1cqw] flex items-center gap-[1.2cqw]">
                <span
                  className="shrink-0 text-right text-[#4b5563]"
                  style={{ fontSize: "1.6cqw", width: "22%" }}
                >
                  {m.name}
                </span>
                <span
                  className="relative flex-1 overflow-hidden rounded-[0.3cqw] bg-[#eceff3]"
                  style={{ height: "2.2cqw" }}
                >
                  <span
                    className="absolute inset-y-0 left-0 rounded-[0.3cqw]"
                    style={{
                      width: `${(m.score / 0.75) * 100}%`,
                      background: win ? "#ff4b4b" : "#b9c0cc",
                    }}
                  />
                </span>
                <span
                  className="shrink-0 text-[#31333f]"
                  style={{
                    fontSize: "1.6cqw",
                    width: "10%",
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontWeight: win ? 700 : 400,
                  }}
                >
                  {m.score.toFixed(3)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ProjectPreview({ project }: { project: Project }) {
  const { preview, name } = project;
  const live = project.liveUrl;

  const body = preview.image ? (
    <Image
      src={preview.image}
      alt={`${name} screenshot`}
      fill
      className="object-cover object-top"
      sizes="(max-width: 1024px) 100vw, 640px"
    />
  ) : preview.kind === "commentlens" ? (
    <CommentLensMock />
  ) : (
    <CredCheckMock />
  );

  const frame = (
    <div className="overflow-hidden rounded-lg border border-line2 bg-panel transition-colors duration-300 group-hover:border-brass/70">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line2" />
        <span className="h-2 w-2 rounded-full bg-line2" />
        <span className="h-2 w-2 rounded-full bg-line2" />
        <span className="ml-2 truncate font-mono text-[10px] text-faint">
          {preview.chromeUrl}
        </span>
        <span className="ml-auto shrink-0 font-mono text-[9px] tracking-[0.15em] text-faint opacity-70">
          {live ? "LIVE ↗" : preview.image ? "SCREENSHOT" : "UI PREVIEW"}
        </span>
      </div>
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16 / 10" }}
        role="img"
        aria-label={`${name} interface preview`}
      >
        {body}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 45%, color-mix(in srgb, var(--accent-brass) 12%, transparent) 50%, transparent 55%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );

  if (!live) return <div className="group block">{frame}</div>;

  return (
    <a
      href={live.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block transition-transform duration-500 hover:-translate-y-1"
      aria-label={`${live.label} — ${name}`}
    >
      {frame}
    </a>
  );
}
