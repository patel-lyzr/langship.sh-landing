"use client";

const RUNTIMES = [
  {
    n: "01",
    name: "Kubernetes",
    desc: "Self-hosted, any cloud. Helm chart for prod, Compose for local dev.",
    tag: "OSS · Self-hosted",
  },
  {
    n: "02",
    name: "AWS Bedrock AgentCore",
    desc: "Managed agent runtime on AWS. Same pipeline, same governance.",
    tag: "Managed · AWS",
  },
  {
    n: "03",
    name: "GCP Vertex AI Agent Engine",
    desc: "Managed agent runtime on Google Cloud. Same governance applies.",
    tag: "Managed · GCP",
  },
];

const FRAMEWORKS = [
  "LangChain",
  "LangGraph",
  "LlamaIndex",
  "CrewAI",
  "AutoGen",
  "Pydantic AI",
  "DSPy",
  "Haystack",
  "Raw SDK",
];

export function Runtimes() {
  return (
    <section id="runtimes" className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label text-accent">Runtime-agnostic</p>
            <h2 className="font-display ink-gradient mt-5 text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
              One agent. Any runtime.
            </h2>
          </div>
        </div>

        {/* Stacked rows — big number left, name in the middle, tag pill right.
            Different from the 3-column card layout used in the Hermes-style. */}
        <div className="mt-14 border-t border-border-soft">
          {RUNTIMES.map((r) => (
            <div
              key={r.name}
              className="grid grid-cols-12 items-baseline gap-4 border-b border-border-soft py-7 md:py-9"
            >
              <span className="font-display col-span-2 text-3xl text-accent leading-none md:col-span-1 md:text-4xl">
                {r.n}
              </span>
              <h3 className="font-display col-span-10 text-3xl uppercase leading-tight tracking-tight md:col-span-5 md:text-4xl">
                {r.name}
              </h3>
              <p className="col-span-12 text-sm leading-relaxed text-muted-fg md:col-span-4">
                {r.desc}
              </p>
              <span className="col-span-12 justify-self-start border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/80 md:col-span-2 md:justify-self-end">
                {r.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="label">Works with</p>
          {FRAMEWORKS.map((f, i) => (
            <span key={f} className="font-mono text-xs text-fg/80">
              {f}
              {i < FRAMEWORKS.length - 1 && <span className="ml-6 text-muted-fg">·</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
