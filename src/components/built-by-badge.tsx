// Fixed "Built with ♥ by Khush Patel" badge, pinned to the bottom-right of the
// viewport on every page. Mounted once in the root layout.
//
// Styling notes:
//   - Uses globals.css tokens (--bg / --border / --muted-fg) so it reads
//     correctly in both light and dark, and on the manifesto's own dark page
//     (whose background is dark too).
//   - z-40 puts it above the nav (z-30) and the manifesto's grain layer
//     (z-0), but it's pointer-events-friendly only on the link itself.
//   - Hidden on very small screens so it doesn't crowd mobile layouts.
export function BuiltByBadge() {
  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-40 hidden sm:block">
      <div className="pointer-events-auto rounded-sm border border-border bg-bg/80 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-fg backdrop-blur">
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
    </div>
  );
}
