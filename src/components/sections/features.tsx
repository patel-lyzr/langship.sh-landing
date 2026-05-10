"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    n: "01",
    title: "Pipelines as graphs",
    body: "Drag-drop nodes — trigger, build, scan, SAST, approval, deploy, promote. YAML in git is the source of truth.",
  },
  {
    n: "02",
    title: "Any runtime, one DSL",
    body: "Kubernetes, Bedrock AgentCore, Vertex AI Agent Engine. Same definition, same governance.",
  },
  {
    n: "03",
    title: "Governance is a node",
    body: "Policy checks, budget gates, human approval, PII scans — first-class steps on the canvas, not middleware.",
  },
  {
    n: "04",
    title: "Operate, don't just deploy",
    body: "Live log streams, OTel traces, replay/debug, SLO-driven rollback. The platform watches the agent in production.",
  },
  {
    n: "05",
    title: "Self-hosted, end-to-end",
    body: "Customer's cloud credentials and audit logs never leave your network. No proxy of LLM traffic.",
  },
  {
    n: "06",
    title: "Framework-agnostic",
    body: "LangChain, LangGraph, LlamaIndex, CrewAI, AutoGen, raw SDK agents. Works with what you have.",
  },
];

export function Features() {
  return (
    <section id="platform" className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <p className="label text-accent">Platform</p>
            <h2 className="font-display ink-gradient mt-5 text-4xl uppercase leading-[0.95] tracking-tight md:text-5xl">
              Six things that make langship.sh boring on purpose.
            </h2>
          </div>

          {/* Numbered list — feels different from the 3×2 card grid we had */}
          <ol className="lg:col-span-8 lg:pt-3">
            {FEATURES.map((f, i) => (
              <motion.li
                key={f.n}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-12 gap-4 border-t border-border-soft py-6 last:border-b first:border-t-border"
              >
                <span className="col-span-2 font-mono text-xs tracking-[0.2em] text-accent md:col-span-1">
                  {f.n}
                </span>
                <h3 className="font-display col-span-10 text-2xl uppercase leading-tight tracking-tight md:col-span-4">
                  {f.title}
                </h3>
                <p className="col-span-12 text-sm leading-relaxed text-muted-fg md:col-span-7">
                  {f.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
