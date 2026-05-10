"use client";

import { motion } from "framer-motion";

export function Showcase() {
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 lg:grid-cols-12">
        {/* LEFT: abstract composition (5 cols) */}
        <div className="relative min-h-[440px] overflow-hidden border-b border-border bg-bg-2 lg:col-span-5 lg:border-b-0 lg:border-r">
          <Composition />
          <p className="absolute bottom-6 right-6 label text-fg/70">
            fig. 01 — control plane
          </p>
        </div>

        {/* MIDDLE: numbered caption block (3 cols) */}
        <div className="border-b border-border p-8 lg:col-span-3 lg:border-b-0 lg:border-r lg:p-10">
          <p className="label text-accent">A walkthrough</p>
          <ol className="mt-6 space-y-5 text-sm leading-relaxed text-fg">
            <CaptionItem n="01" body="GitHub push lands on main." />
            <CaptionItem n="02" body="Build, scan, SAST run in parallel." />
            <CaptionItem n="03" body="Approval gate held for human review." />
            <CaptionItem n="04" body="Deploy to Vertex Agent Engine." />
            <CaptionItem n="05" body="SLO watcher armed for 5 minutes." />
          </ol>
        </div>

        {/* RIGHT: release-flow mini-widget (4 cols) */}
        <div className="p-8 lg:col-span-4 lg:p-10">
          <p className="label">Release flow</p>
          <ReleaseFlow />
        </div>
      </div>
    </section>
  );
}

function CaptionItem({ n, body }: { n: string; body: string }) {
  return (
    <li className="flex gap-4">
      <span className="font-mono text-[10px] tracking-[0.18em] text-accent">
        {n}
      </span>
      <span>{body}</span>
    </li>
  );
}

// Three env cards stacked vertically with arrow connectors. Each card shows
// the SHA currently deployed there, status (deployed / pending / blocked),
// and an arrow at the bottom that flows into the next env. The chip on the
// arrow describes what's happening at that gate (auto-promote / waiting on
// approval / etc).
type EnvStatus = "deployed" | "pending" | "blocked";
const ENVS: Array<{
  name: string;
  runtime: string;
  sha: string;
  version: string;
  status: EnvStatus;
  detail: string;
}> = [
  {
    name: "dev",
    runtime: "k8s · local",
    sha: "a71a73d",
    version: "v2.4.3",
    status: "deployed",
    detail: "deployed 4m ago · evals=passed",
  },
  {
    name: "staging",
    runtime: "bedrock-agentcore",
    sha: "a71a73d",
    version: "v2.4.3",
    status: "pending",
    detail: "1 / 2 approvals · waiting on @lyzr-leads",
  },
  {
    name: "prod",
    runtime: "vertex-agent-engine",
    sha: "608472f",
    version: "v2.4.1",
    status: "deployed",
    detail: "deployed 2d ago · slo=healthy",
  },
];

function ReleaseFlow() {
  return (
    <div className="mt-6 space-y-3">
      {ENVS.map((env, i) => (
        <div key={env.name}>
          <EnvCard {...env} />
          {i < ENVS.length - 1 && (
            <PromotionArrow
              chip={
                env.status === "pending"
                  ? "approval pending"
                  : "auto-promote"
              }
              accent={env.status === "pending"}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function EnvCard({
  name,
  runtime,
  sha,
  version,
  status,
  detail,
}: (typeof ENVS)[number]) {
  const accent = status === "pending";
  return (
    <div
      className={`border bg-bg-2 ${
        accent ? "border-accent/60" : "border-border"
      }`}
    >
      <div
        className={`flex items-center justify-between border-b px-4 py-2.5 ${
          accent ? "border-accent/40" : "border-border"
        }`}
      >
        <span
          className={`font-display text-lg uppercase leading-none tracking-tight ${
            accent ? "text-accent" : ""
          }`}
        >
          {name}
        </span>
        <StatusPill status={status} />
      </div>
      <div className="px-4 py-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-mono text-sm text-fg">{version}</span>
          <span className="font-mono text-[11px] text-muted-fg">{sha}</span>
        </div>
        <div className="mt-2 label normal-case tracking-wide">{runtime}</div>
        <div className="mt-2 text-xs text-muted-fg">{detail}</div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: EnvStatus }) {
  const map: Record<EnvStatus, { label: string; cls: string; dot: string }> = {
    deployed: {
      label: "deployed",
      cls: "border-border-soft text-fg/80",
      dot: "bg-fg/60",
    },
    pending: {
      label: "pending",
      cls: "border-accent/50 text-accent",
      dot: "bg-accent animate-pulse",
    },
    blocked: {
      label: "blocked",
      cls: "border-border-soft text-muted-fg",
      dot: "bg-muted-fg",
    },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] ${s.cls}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

// Vertical arrow connector with a label chip in the middle. Pure SVG line
// drawn with currentColor so it inherits the env theme.
function PromotionArrow({ chip, accent }: { chip: string; accent: boolean }) {
  return (
    <div className="relative my-1 flex items-center justify-center py-2">
      <span
        className={`absolute left-1/2 top-0 -translate-x-1/2 ${
          accent ? "text-accent" : "text-border-soft"
        }`}
      >
        <svg width="2" height="40" viewBox="0 0 2 40" fill="none">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="34"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray={accent ? "0" : "3 3"}
          />
          <path
            d="M 1 40 L -3 32 L 5 32 Z"
            fill="currentColor"
            transform="translate(0,-2)"
          />
        </svg>
      </span>
      <span
        className={`relative z-10 border bg-bg px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] ${
          accent
            ? "border-accent/50 text-accent"
            : "border-border-soft text-muted-fg"
        }`}
      >
        {chip}
      </span>
    </div>
  );
}

function Composition() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.0 }}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full text-fg"
    >
      <g stroke="currentColor" fill="none" strokeWidth="0.8" opacity="0.18">
        {[120, 180, 240, 300, 360, 420].map((r) => (
          <circle key={r} cx="160" cy="160" r={r} />
        ))}
      </g>

      <line
        x1="60"
        y1="320"
        x2="740"
        y2="320"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.3"
      />

      <g fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.85">
        {/* L */}
        <path d="M500,150 L500,470 L680,470 L680,440 L530,440 L530,150 Z" />
        {/* S */}
        <path d="M380,160 L240,160 L240,300 L360,300 L360,440 L220,440" />
      </g>

      <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55">
        {[
          { x: 80, y: 240, label: "BUILD" },
          { x: 120, y: 300, label: "SCAN" },
          { x: 60, y: 380, label: "DEPLOY" },
          { x: 140, y: 460, label: "OBSERVE" },
        ].map((n, i) => (
          <g key={i}>
            <rect x={n.x} y={n.y} width="80" height="22" />
            <text
              x={n.x + 40}
              y={n.y + 15}
              textAnchor="middle"
              fill="currentColor"
              fontFamily="var(--font-mono)"
              fontSize="9"
              letterSpacing="2"
            >
              {n.label}
            </text>
          </g>
        ))}
      </g>

      <g stroke="currentColor" strokeWidth="0.6" opacity="0.4">
        <path d="M180,300 C260,260 340,250 420,251" fill="none" />
        <path d="M220,330 C300,340 380,360 480,371" fill="none" />
      </g>

      <g stroke="currentColor" fill="none" strokeWidth="0.8" opacity="0.5">
        <circle cx="700" cy="540" r="18" />
        <line x1="700" y1="525" x2="700" y2="555" />
        <line x1="685" y1="540" x2="715" y2="540" />
      </g>
      <text
        x="675"
        y="544"
        textAnchor="end"
        fill="currentColor"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="2"
        opacity="0.6"
      >
        N. 01 — DEPLOY
      </text>
    </motion.svg>
  );
}
