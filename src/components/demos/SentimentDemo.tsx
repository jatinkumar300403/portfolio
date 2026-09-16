"use client";

import { useMemo, useState } from "react";

const POS: Record<string, number> = {
  good: 1, great: 1.4, love: 1.6, loved: 1.5, amazing: 1.7, best: 1.5, awesome: 1.6,
  nice: 1, beautiful: 1.3, thanks: 1.2, thank: 1.2, helpful: 1.3, clean: 0.8,
  goated: 1.8, fire: 1.4, banger: 1.6, underrated: 1.1, respect: 1.2, perfect: 1.5,
  mast: 1.5, badhiya: 1.5, zabardast: 1.7, shaandar: 1.6, bhai: 0.4, op: 1.1,
  "🔥": 1.5, "❤️": 1.5, "😍": 1.5, "👏": 1.3, "💯": 1.4, "🙏": 1,
};

const NEG: Record<string, number> = {
  bad: 1.2, worst: 1.8, hate: 1.7, boring: 1.4, trash: 1.6, cringe: 1.5, waste: 1.5,
  poor: 1.2, awful: 1.7, useless: 1.5, disappointed: 1.4, clickbait: 1.5, scam: 1.8,
  bakwas: 1.7, bekar: 1.6, ghatiya: 1.8, faltu: 1.5, overrated: 1.2,
  "😡": 1.6, "👎": 1.5, "🤮": 1.7, "😴": 1.2,
};

const NEGATORS = new Set(["not", "no", "never", "nahi", "nahin", "dont", "doesnt", "isnt"]);

const PRESETS = [
  "bhai this editing is absolutely goated 🔥",
  "total bakwas, waste of 20 minutes",
  "the audio is fine but the pacing is not great",
  "ok so this actually explains it properly, thanks 🙏",
];

function tokenize(text: string): string[] {
  const emoji = text.match(/\p{Extended_Pictographic}/gu) ?? [];
  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  return [...words, ...emoji];
}

function classify(text: string) {
  const tokens = tokenize(text);
  let pos = 0;
  let neg = 0;
  const hits: { token: string; polarity: "pos" | "neg" | "neu"; flipped: boolean }[] = [];

  tokens.forEach((t, i) => {
    const prev = i > 0 ? tokens[i - 1] : "";
    const flipped = NEGATORS.has(prev);
    if (POS[t]) {
      const w = POS[t];
      if (flipped) neg += w * 0.9;
      else pos += w;
      hits.push({ token: t, polarity: flipped ? "neg" : "pos", flipped });
    } else if (NEG[t]) {
      const w = NEG[t];
      if (flipped) pos += w * 0.7;
      else neg += w;
      hits.push({ token: t, polarity: flipped ? "pos" : "neg", flipped });
    } else {
      hits.push({ token: t, polarity: "neu", flipped: false });
    }
  });

  const neutralMass = 1.15;
  const exps = [Math.exp(pos), Math.exp(neutralMass), Math.exp(neg)];
  const sum = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map((e) => (e / sum) * 100);
  const labels = ["positive", "neutral", "negative"] as const;
  const top = probs.indexOf(Math.max(...probs));

  return {
    hits,
    probs: labels.map((label, i) => ({ label, p: probs[i] })),
    verdict: labels[top],
  };
}

const COLORS: Record<string, string> = {
  positive: "var(--ok)",
  neutral: "var(--text-secondary)",
  negative: "#e06c6a",
};

export default function SentimentDemo() {
  const [text, setText] = useState(PRESETS[0]);
  const result = useMemo(() => classify(text), [text]);

  return (
    <div className="rounded-lg border border-line bg-base/50 p-4">
      <div className="mb-3 font-mono text-[10px] tracking-[0.18em] text-faint">
        LIVE DEMO · BROWSER-SIDE CLASSIFIER — the shipped model runs XLM-RoBERTa on Cloud Run
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, 120))}
        placeholder="type a YouTube comment…"
        className="w-full rounded border border-line2 bg-panel px-3 py-2 font-mono text-[13px] text-fg placeholder:text-faint focus:border-data focus:outline-none"
        aria-label="Comment to classify"
      />

      <div className="mt-2 flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => setText(p)}
            className="rounded border border-line px-2 py-1 font-mono text-[10px] text-fg2 transition-colors hover:border-data hover:text-data"
          >
            {p.length > 34 ? `${p.slice(0, 34)}…` : p}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {result.hits.map((h, i) => (
          <span
            key={`${h.token}-${i}`}
            className="rounded border bg-panel px-1.5 py-0.5 font-mono text-[11px]"
            style={{
              borderColor:
                h.polarity === "neu" ? "var(--line)" : COLORS[
                  h.polarity === "pos" ? "positive" : "negative"
                ],
              color:
                h.polarity === "neu"
                  ? "var(--text-secondary)"
                  : COLORS[h.polarity === "pos" ? "positive" : "negative"],
            }}
            title={h.flipped ? "polarity flipped by preceding negation" : undefined}
          >
            {h.token}
            {h.flipped && <span className="opacity-70"> ¬</span>}
          </span>
        ))}
      </div>

      <div className="mt-4 space-y-1.5">
        {result.probs.map((p) => (
          <div key={p.label} className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-16 shrink-0 text-right text-fg2">{p.label}</span>
            <div className="h-[9px] flex-1 overflow-hidden rounded-sm bg-line">
              <div
                className="h-full rounded-sm transition-all duration-500"
                style={{ width: `${Math.max(2, p.p)}%`, background: COLORS[p.label] }}
              />
            </div>
            <span className="w-12 text-faint">{p.p.toFixed(1)}%</span>
          </div>
        ))}
      </div>

      <div className="mt-3 font-mono text-[11px] text-faint">
        ▸ verdict:{" "}
        <span style={{ color: COLORS[result.verdict] }}>{result.verdict}</span> · handles
        emoji, Hinglish and negation — the failure modes that sank the TF-IDF baseline
      </div>
    </div>
  );
}
