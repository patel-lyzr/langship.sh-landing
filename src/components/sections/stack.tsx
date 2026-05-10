"use client";

const STACK = [
  ["Temporal", "Durable execution"],
  ["MongoDB", "Runs · audit · approvals"],
  ["PostgreSQL", "Temporal persistence"],
  ["S3-compatible", "Artifacts · trace blobs"],
  ["Vault / KMS", "Secrets at rest"],
  ["TypeScript / Express", "API · workers · CLI"],
];

export function Stack() {
  return (
    <section id="stack" className="border-b border-border bg-bg-2">
      <div className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <p className="label text-accent">Stack</p>
            <h2 className="font-display ink-gradient mt-5 text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
              A stack you already operate.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-fg md:text-base">
              No proxy of your LLM traffic. No cross-tenant credential storage.
              Your cloud, your audit log, your compliance story.
            </p>
          </div>

          <ul className="lg:col-span-7 lg:pt-3">
            {STACK.map((s, i) => (
              <li
                key={s[0]}
                className="grid grid-cols-12 items-baseline gap-4 border-b border-border-soft py-4 last:border-b-0 first:border-t first:border-t-border-soft"
              >
                <span className="font-mono col-span-2 text-xs tracking-[0.2em] text-accent md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display col-span-10 text-2xl uppercase leading-tight tracking-tight md:col-span-5">
                  {s[0]}
                </span>
                <span className="label col-span-12 normal-case tracking-wide md:col-span-6">
                  {s[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
