// "Built with ♥ by Khush Patel" — a small square pill. Rendered inline at the
// bottom-right of the footer (see Footer), so it scrolls away with the page
// rather than floating fixed over it.
//
// Uses globals.css tokens (--bg / --border / --muted-fg) so it reads in both
// light and dark, and on the manifesto's own dark page.
export function BuiltByBadge() {
  return (
    <div className="inline-block rounded-sm border border-border bg-bg/80 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-fg backdrop-blur">
      Built with <span className="text-accent">&#9829;</span> by{" "}
      <a
        href="https://lyzr.ai"
        target="_blank"
        rel="noreferrer"
        className="text-fg transition-colors hover:text-accent"
      >
        Khush Patel
      </a>
    </div>
  );
}
