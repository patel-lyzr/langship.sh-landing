"use client";

import { motion } from "framer-motion";

// Per-env config table — three columns, same rows. Same agent code, same
// pipeline shape, distinct policies. The differences are exactly where
// langship.sh earns its keep.
const ROWS = [
  { label: "Runtime", values: ["k8s · local", "bedrock-agentcore", "vertex-agent-engine"] },
  { label: "Branch", values: ["main", "main", "release/*"] },
  { label: "Auto-promote", values: ["yes", "no", "no"] },
  { label: "Approval", values: ["—", "1 of eng-leads", "2 of platform-team"] },
  { label: "Eval gate", values: ["smoke (60s)", "regression (5m)", "full + cost (15m)"] },
  { label: "Budget cap", values: ["$5 / day", "$50 / day", "$2k / day"] },
  { label: "Audit retention", values: ["30d", "90d", "365d"] },
];

const ENVS = [
  { name: "dev", note: "fast feedback", accent: false },
  { name: "staging", note: "soak tests", accent: false },
  { name: "prod", note: "real traffic", accent: true },
];

export function Environments() {
  return (
    <section id="environments" className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="label text-accent">Environments</p>
            <h2 className="font-display ink-gradient mt-5 text-balance text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
              Same agent. <br /> Different gates per stop.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-fg md:text-base">
              Each environment owns its own pipeline, runtime, approval policy,
              and eval gate. Promotion between them is explicit, gated, and
              follows your branching strategy.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="label">Branching</p>
              <span className="font-mono text-xs text-fg/80">trunk-based</span>
              <span className="text-muted-fg">·</span>
              <span className="font-mono text-xs text-fg/80">env-branches</span>
              <span className="text-muted-fg">·</span>
              <span className="font-mono text-xs text-fg/80">release branches</span>
              <span className="text-muted-fg">·</span>
              <span className="font-mono text-xs text-fg/80">custom</span>
            </div>
          </div>

          {/* Per-env config matrix */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 border border-border">
              {/* Header row */}
              {ENVS.map((e, i) => (
                <div
                  key={e.name}
                  className={`flex items-baseline justify-between gap-2 px-4 py-4 ${
                    i < ENVS.length - 1 ? "border-r border-border" : ""
                  } ${e.accent ? "bg-accent/5" : "bg-bg-2"}`}
                >
                  <div>
                    <div
                      className={`font-display text-2xl uppercase leading-none tracking-tight ${
                        e.accent ? "text-accent" : ""
                      }`}
                    >
                      {e.name}
                    </div>
                    <div className="mt-2 label normal-case tracking-wide">
                      {e.note}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-muted-fg">
                    0{i + 1}
                  </span>
                </div>
              ))}

              {/* Body rows */}
              {ROWS.map((row, ri) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: ri * 0.03 }}
                  className="contents"
                >
                  {row.values.map((v, ci) => (
                    <div
                      key={ci}
                      className={`flex flex-col gap-1 border-t border-border-soft px-4 py-3 ${
                        ci < row.values.length - 1 ? "border-r border-border" : ""
                      } ${ENVS[ci]!.accent ? "bg-accent/[0.03]" : ""}`}
                    >
                      {ci === 0 && (
                        <span className="label">{row.label}</span>
                      )}
                      {ci !== 0 && (
                        <span className="label opacity-0 select-none" aria-hidden>
                          {row.label}
                        </span>
                      )}
                      <span
                        className={`font-mono text-xs ${
                          v === "—" ? "text-muted-fg" : "text-fg"
                        }`}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Promotion flow strip below the matrix */}
            <div className="mt-8 flex items-center gap-3">
              {ENVS.map((e, i) => (
                <div key={e.name} className="flex items-center gap-3">
                  <div
                    className={`flex items-center gap-2 border px-3 py-2 ${
                      e.accent
                        ? "border-accent/60 bg-accent/5"
                        : "border-border bg-bg-2"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        e.accent ? "bg-accent" : "bg-fg/60"
                      }`}
                    />
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                        e.accent ? "text-accent" : "text-fg"
                      }`}
                    >
                      {e.name}
                    </span>
                  </div>
                  {i < ENVS.length - 1 && (
                    <div className="flex flex-col items-center text-muted-fg">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                        {i === 0 ? "auto" : "approval"}
                      </span>
                      <svg width="40" height="8" viewBox="0 0 40 8" fill="none" className="mt-0.5">
                        <line x1="0" y1="4" x2="34" y2="4" stroke="currentColor" strokeWidth="1" strokeDasharray={i === 0 ? "0" : "3 3"} />
                        <path d="M 40 4 L 32 0 L 32 8 Z" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              <span className="ml-auto label">+ rollback follows the same path</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
