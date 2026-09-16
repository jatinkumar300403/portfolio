"use client";

import { useMemo, useState } from "react";

type Form = {
  age: number;
  duration: number;
  amount: number;
  job: number;
  housing: string;
  saving: string;
  checking: string;
};

const HOUSING = ["own", "rent", "free"];
const SAVING = ["little", "moderate", "quite rich", "rich"];
const CHECKING = ["little", "moderate", "rich"];

const W = {
  housing: { own: 0.55, rent: -0.3, free: -0.45 } as Record<string, number>,
  saving: { little: -0.4, moderate: 0.15, "quite rich": 0.6, rich: 0.85 } as Record<string, number>,
  checking: { little: -0.55, moderate: 0.2, rich: 0.75 } as Record<string, number>,
};

function score(f: Form) {
  const contributions = [
    { label: "housing", v: W.housing[f.housing] },
    { label: "checking acct", v: W.checking[f.checking] },
    { label: "saving acct", v: W.saving[f.saving] },
    { label: "duration", v: -((f.duration - 20) / 24) },
    { label: "credit amount", v: -((f.amount - 3000) / 6000) },
    { label: "age", v: (f.age - 33) / 40 },
    { label: "job band", v: (f.job - 1.5) / 4 },
  ];
  const z = 0.35 + contributions.reduce((s, c) => s + c.v, 0);
  const p = 1 / (1 + Math.exp(-z * 1.35));
  return { p, contributions: contributions.sort((a, b) => Math.abs(b.v) - Math.abs(a.v)) };
}

function Row({
  label,
  children,
  value,
}: {
  label: string;
  children: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 font-mono text-[11px] text-faint">{label}</span>
      <div className="flex-1">{children}</div>
      <span className="w-20 shrink-0 text-right font-mono text-[11px] text-fg">{value}</span>
    </div>
  );
}

function Pills({
  options,
  value,
  onChange,
  name,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label={name}>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          aria-pressed={value === o}
          className={`rounded border px-2 py-0.5 font-mono text-[10px] transition-colors ${
            value === o
              ? "border-brass text-brass"
              : "border-line text-fg2 hover:border-line2"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function CreditDemo() {
  const [f, setF] = useState<Form>({
    age: 35,
    duration: 24,
    amount: 3500,
    job: 2,
    housing: "own",
    saving: "little",
    checking: "moderate",
  });

  const { p, contributions } = useMemo(() => score(f), [f]);
  const good = p >= 0.5;
  const pct = p * 100;

  return (
    <div className="rounded-lg border border-line bg-base/50 p-4">
      <div className="mb-3 font-mono text-[10px] tracking-[0.18em] text-faint">
        LIVE DEMO · ILLUSTRATIVE SCORER — same eight inputs as the Streamlit app, simplified
        weights (not the trained XGBoost coefficients)
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2.5">
          <Row label="age" value={`${f.age} yrs`}>
            <input
              type="range"
              min={19}
              max={75}
              step={1}
              value={f.age}
              onChange={(e) => setF({ ...f, age: +e.target.value })}
              className="w-full accent-[var(--accent-brass)]"
              aria-label="Age"
            />
          </Row>
          <Row label="duration" value={`${f.duration} mo`}>
            <input
              type="range"
              min={4}
              max={72}
              step={1}
              value={f.duration}
              onChange={(e) => setF({ ...f, duration: +e.target.value })}
              className="w-full accent-[var(--accent-brass)]"
              aria-label="Duration in months"
            />
          </Row>
          <Row label="credit amt" value={`€${f.amount.toLocaleString()}`}>
            <input
              type="range"
              min={250}
              max={18000}
              step={250}
              value={f.amount}
              onChange={(e) => setF({ ...f, amount: +e.target.value })}
              className="w-full accent-[var(--accent-brass)]"
              aria-label="Credit amount"
            />
          </Row>
          <Row label="job band" value={`${f.job}`}>
            <input
              type="range"
              min={0}
              max={3}
              step={1}
              value={f.job}
              onChange={(e) => setF({ ...f, job: +e.target.value })}
              className="w-full accent-[var(--accent-brass)]"
              aria-label="Job band"
            />
          </Row>
        </div>

        <div className="space-y-2.5">
          <div>
            <div className="mb-1 font-mono text-[11px] text-faint">housing</div>
            <Pills
              name="housing"
              options={HOUSING}
              value={f.housing}
              onChange={(v) => setF({ ...f, housing: v })}
            />
          </div>
          <div>
            <div className="mb-1 font-mono text-[11px] text-faint">saving account</div>
            <Pills
              name="saving account"
              options={SAVING}
              value={f.saving}
              onChange={(v) => setF({ ...f, saving: v })}
            />
          </div>
          <div>
            <div className="mb-1 font-mono text-[11px] text-faint">checking account</div>
            <Pills
              name="checking account"
              options={CHECKING}
              value={f.checking}
              onChange={(v) => setF({ ...f, checking: v })}
            />
          </div>
        </div>
      </div>

      <div
        className="mt-4 rounded border-l-2 bg-panel px-4 py-3"
        style={{
          borderRadius: 0,
          borderColor: good ? "var(--ok)" : "#e06c6a",
        }}
      >
        <div
          className="font-mono text-sm"
          style={{ color: good ? "var(--ok)" : "#e06c6a" }}
        >
          {good ? "GOOD CREDIT RISK" : "BAD CREDIT RISK"}
        </div>
        <div className="mt-1 flex items-center gap-3">
          <div className="h-[6px] flex-1 overflow-hidden rounded-sm bg-line">
            <div
              className="h-full rounded-sm transition-all duration-300"
              style={{
                width: `${pct}%`,
                background: good ? "var(--ok)" : "#e06c6a",
              }}
            />
          </div>
          <span className="font-mono text-[11px] text-fg">p(good) = {p.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-3">
        <div className="font-mono text-[10px] tracking-[0.18em] text-faint">
          TOP CONTRIBUTING FEATURES
        </div>
        <div className="mt-1.5 space-y-1">
          {contributions.slice(0, 4).map((c) => (
            <div key={c.label} className="flex items-center gap-2 font-mono text-[11px]">
              <span className="w-24 shrink-0 text-right text-fg2">{c.label}</span>
              <div className="relative h-[8px] flex-1 bg-line">
                <span className="absolute inset-y-0 left-1/2 w-px bg-line2" />
                <span
                  className="absolute inset-y-0"
                  style={{
                    background: c.v >= 0 ? "var(--ok)" : "#e06c6a",
                    left: c.v >= 0 ? "50%" : `${50 - Math.min(48, Math.abs(c.v) * 40)}%`,
                    width: `${Math.min(48, Math.abs(c.v) * 40)}%`,
                  }}
                />
              </div>
              <span className="w-12 text-faint">{c.v >= 0 ? "+" : ""}{c.v.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
