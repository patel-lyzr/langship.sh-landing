"use client";

import { ArrowUpRight } from "lucide-react";

export function CTA() {
  return (
    <section id="cta" className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT: headline + button stack */}
          <div className="lg:col-span-7">
            <p className="label text-accent">Get the platform</p>
            <h2 className="font-display ink-gradient mt-6 text-balance text-5xl uppercase leading-[0.92] tracking-tight md:text-7xl">
              Bring your agent.<br />
              We'll handle the boring parts.
            </h2>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:khush@lyzr.ai"
                className="group inline-flex flex-1 items-center justify-between gap-6 border border-fg bg-fg px-5 py-4 font-mono text-xs uppercase tracking-[0.18em] text-bg transition-colors hover:bg-fg/90"
              >
                <span>Talk to a maintainer</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* RIGHT: support / install matrix */}
          <div className="lg:col-span-5">
            <ul className="border-y border-border-soft">
              <MatrixRow k="Helm chart" v="prod" />
              <MatrixRow k="Docker Compose" v="local dev" />
              <MatrixRow k="CLI" v="macOS · linux · windows" />
              <MatrixRow k="License" v="Apache 2.0" />
              <MatrixRow k="Support" v="github · discord · email" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function MatrixRow({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex items-baseline justify-between gap-6 border-b border-border-soft py-4 last:border-b-0">
      <span className="label">{k}</span>
      <span className="font-mono text-sm text-fg">{v}</span>
    </li>
  );
}
