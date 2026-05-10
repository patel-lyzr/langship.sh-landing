"use client";

const ROWS = [
  ["Runs orchestrated", "10K+ / day", "across customer clusters"],
  ["P95 deploy latency", "< 90s", "build → registry → runtime"],
  ["Audit retention", "365 days", "default, configurable"],
];

export function StatsStrip() {
  return (
    <section className="border-b border-border bg-bg-2">
      <div className="mx-auto max-w-[1280px] px-6 py-10">
        <div className="grid grid-cols-1 divide-y divide-border-soft md:grid-cols-3 md:divide-x md:divide-y-0">
          {ROWS.map(([label, value, note], i) => (
            <div key={label} className={`flex items-baseline gap-4 ${i === 0 ? "pb-4 md:pb-0 md:pr-6" : i === ROWS.length - 1 ? "pt-4 md:pt-0 md:pl-6" : "py-4 md:py-0 md:px-6"}`}>
              <span className="label text-accent">0{i + 1}</span>
              <div>
                <div className="label text-muted-fg">{label}</div>
                <div className="font-display mt-1 text-2xl leading-none">
                  {value}
                </div>
                <div className="mt-1.5 text-xs text-muted-fg">{note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
