"use client";

import { motion } from "framer-motion";

const NODES = [
  { id: "Trigger", note: "github" },
  { id: "Build", note: "buildkit" },
  { id: "Scan", note: "trivy" },
  { id: "SAST", note: "semgrep" },
  { id: "Approval", note: "human", accent: true },
  { id: "Deploy", note: "vertex", accent: true },
  { id: "Promote", note: "→ prod" },
];

export function Workflow() {
  return (
    <section id="workflow" className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label text-accent">CI/CD as a graph</p>
            <h2 className="font-display ink-gradient mt-5 text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
              Drag, drop, ship. <br /> YAML is the source of truth.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-fg">
            Visual canvas in the UI, declarative file in git. PR review, audit
            trail, rollback via <code className="font-mono">git revert</code>.
          </p>
        </div>

        {/* Horizontal pipeline strip */}
        <div className="relative mt-14 overflow-x-auto">
          <div className="flex min-w-max items-center gap-3">
            {NODES.map((n, i) => (
              <div key={n.id} className="flex items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex min-w-[140px] flex-col gap-1 border px-4 py-3 ${
                    n.accent
                      ? "border-accent/60 bg-accent/5"
                      : "border-border bg-bg-2"
                  }`}
                >
                  <span
                    className={`font-display text-lg uppercase leading-tight tracking-tight ${
                      n.accent ? "text-accent" : ""
                    }`}
                  >
                    {n.id}
                  </span>
                  <span className="label">{n.note}</span>
                </motion.div>
                {i < NODES.length - 1 && (
                  <span className="select-none text-muted-fg" aria-hidden>
                    ─
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* YAML below, full width */}
        <div className="mt-12 border border-border bg-bg-2">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="label">.langship/workflows/prod.yaml</span>
            <span className="label">read-only</span>
          </div>
          <pre className="overflow-x-auto px-5 py-5 font-mono text-[12px] leading-relaxed text-fg/90">
            <span className="text-muted-fg">{`# committed to git, edited via UI or your editor`}</span>{"\n"}
            <span className="text-fg">name</span>: ship-prod{"\n"}
            <span className="text-fg">trigger</span>: <span className="text-accent">{"{ kind: github, branch: main }"}</span>{"\n"}
            <span className="text-fg">nodes</span>:{"\n"}
            {"  - { type: build,    engine: buildkit }"}{"\n"}
            {"  - { type: scan,     engine: trivy, fail-on: [HIGH, CRITICAL] }"}{"\n"}
            {"  - { type: sast,     engine: semgrep }"}{"\n"}
            {"  - { type: approval, approvers: [eng-leads] }"}{"\n"}
            {"  - { type: deploy,   runtime: vertex-agent-engine }"}{"\n"}
            {"  - { type: promote,  to: [staging, prod] }"}{"\n"}
          </pre>
        </div>
      </div>
    </section>
  );
}
