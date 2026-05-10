"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";

export function Hero() {
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
        {/* LEFT: headline + actions, 8 cols */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="label">v0.1.0 · Apache 2.0 · Self-hosted</p>
            <span className="label text-fg/30" aria-hidden>
              ·
            </span>
            <p className="label">
              Maintained by{" "}
              <a
                href="https://lyzr.ai"
                target="_blank"
                rel="noreferrer"
                className="text-accent transition-colors hover:text-fg"
              >
                the Lyzr team ↗
              </a>
            </p>
          </div>

          {/* Positioning hook — italic serif eyebrow that frames langship.sh
              against an instantly-understood reference (Vercel) without
              putting that name in the H1. */}
          <p className="font-display mt-10 text-2xl italic leading-none tracking-tight text-accent md:text-3xl">
            Vercel for AI agents.
          </p>

          <h1 className="font-display ink-gradient mt-4 text-balance text-6xl uppercase leading-[0.9] tracking-tight md:text-[5.5rem] lg:text-[6rem]">
            Build and ship<br />
            <span className="text-accent">any</span> agent.
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-fg md:text-lg">
            <span className="text-fg">Any framework.</span>{" "}
            <span className="text-fg">Any runtime.</span> Build with LangChain,
            LlamaIndex, CrewAI, AutoGen, or your own SDK — then deploy, govern,
            and operate them on Kubernetes, Bedrock AgentCore, or Vertex AI
            Agent Engine. Self-hosted, end to end.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#cta"
              className="group inline-flex items-center justify-between gap-6 border border-fg bg-fg px-5 py-4 font-mono text-xs uppercase tracking-[0.18em] text-bg transition-colors hover:bg-fg/90"
            >
              <span>Deploy a sample agent</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#pipeline"
              className="group inline-flex items-center justify-between gap-6 border border-border px-5 py-4 font-mono text-xs uppercase tracking-[0.18em] text-fg transition-colors hover:bg-bg-2"
            >
              <span>Read the architecture</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-fg transition-colors group-hover:text-fg" />
            </a>
          </div>
        </motion.div>

        {/* RIGHT: install snippet + stat block, 4 cols */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-4 lg:pt-4"
        >
          <InstallSnippet />
          <StatBlock />
        </motion.div>
      </div>
    </section>
  );
}

function InstallSnippet() {
  const [copied, setCopied] = useState(false);
  const cmd = "curl -fsSL https://get.langship.sh | sh";

  async function copy() {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  }

  return (
    <div className="border border-border bg-bg-2">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="label">~/install.sh</span>
        <button
          onClick={copy}
          aria-label="Copy install command"
          className="label flex items-center gap-1.5 transition-colors hover:text-fg"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-fg">
        <span className="text-muted-fg"># 1. install</span>
        {"\n"}
        {cmd}
        {"\n"}
        {"\n"}
        <span className="text-muted-fg"># 2. point at your project</span>
        {"\n"}
        langship link <span className="text-accent">my-agent</span>
        {"\n"}
        {"\n"}
        <span className="text-muted-fg"># 3. ship</span>
        {"\n"}
        langship deploy <span className="text-accent">--env=prod</span>
      </pre>
    </div>
  );
}

function StatBlock() {
  const STATS = [
    ["3", "runtimes"],
    ["8", "node types"],
    ["GitOps", "native"],
  ];
  return (
    <div className="mt-6 grid grid-cols-3 border border-border">
      {STATS.map(([n, l], i) => (
        <div
          key={l}
          className={`px-4 py-5 text-center ${i < STATS.length - 1 ? "border-r border-border" : ""}`}
        >
          <div className="font-display text-3xl leading-none">{n}</div>
          <div className="mt-2 label">{l}</div>
        </div>
      ))}
    </div>
  );
}
