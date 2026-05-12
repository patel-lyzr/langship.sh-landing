import { ArrowUpRight } from "lucide-react";
import { GITHUB_REPO_URL } from "@/lib/links";

// Two-row footer:
//   row 1 — wordmark + inline link row (unchanged from before)
//   row 2 — fine-print strip with version, maintainer credit, license, ©
//
// The maintainer credit links out to lyzr.ai with an arrow glyph so it reads
// the same shape as the spec the user pasted.
export function Footer() {
  return (
    <footer className="border-t border-border-soft">
      <div className="mx-auto max-w-[1280px] px-6 py-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="font-display text-2xl tracking-tight leading-none">
            langship<span className="text-accent">.sh</span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-fg">
            <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">GitHub</a>
            <a href="mailto:khush@lyzr.ai" className="transition-colors hover:text-fg">Contact</a>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 border-t border-border-soft pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-fg md:flex-row md:items-center md:justify-between">
          <span>langship.sh v0.1.0</span>

          <span className="flex items-center gap-1.5">
            Maintained by
            <a
              href="https://lyzr.ai"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-0.5 text-fg transition-colors hover:text-accent"
            >
              the Lyzr team
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </span>

          <span>Apache 2.0 · © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
