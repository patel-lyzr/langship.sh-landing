# langship.sh — landing site

Marketing site for [Langship](https://langship.sh) — the framework-agnostic
deployment, governance, and operations layer for agent applications.

Built with **Next.js 15** (App Router) + **Tailwind CSS** + **TypeScript**.

## Pages

| Route        | What it is                                                              |
| ------------ | ----------------------------------------------------------------------- |
| `/`          | "Dear LangChain" manifesto — the open-letter landing page               |
| `/home`      | Product page — platform, environments, pipeline, runtimes               |
| `/interrupt` | Campaign URL (Interrupt 2026 LinkedIn push) → redirects to `/`           |
| `/*`         | Anything else → redirects to `/` (see [Redirects](#redirects))          |

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3200
```

| Script           | Does                              |
| ---------------- | --------------------------------- |
| `pnpm dev`       | dev server on port 3200           |
| `pnpm build`     | production build                  |
| `pnpm start`     | serve the production build (3200) |
| `pnpm typecheck` | `tsc --noEmit`                    |

## Layout

```
src/
  app/              # routes (App Router)
    page.tsx        # /        — manifesto
    home/page.tsx   # /home    — product page
    layout.tsx      # root layout, fonts, metadata
    globals.css
  components/
    top-nav.tsx     # shared nav (manifesto + product page)
    footer.tsx
    theme-provider.tsx
    sections/       # product-page sections (hero, features, …)
    aceternity/     # animated UI primitives
  lib/cn.ts         # clsx + tailwind-merge helper
next.config.mjs     # redirects live here
```

Path alias: `@/*` → `src/*`.

## Redirects

All redirects are defined in [`next.config.mjs`](./next.config.mjs) as 307
(temporary) so they stay easy to repoint:

- `/interrupt` → `/` — campaign landing for the Interrupt 2026 push. Next
  forwards the `?utm_*` query string through automatically, so marketing's
  tracking params survive the hop.
- catch-all → `/` — any path that isn't a real route lands on the manifesto.
  The negative-lookahead in the source pattern excludes `/home`, `/interrupt`,
  Next internals (`/_next/*`), and root-level static files (`favicon.ico`,
  `robots.txt`, `*.png`, …) so assets aren't swallowed, and requires a
  non-empty path so `/` itself doesn't loop.

When adding a real route, add its segment to the catch-all's negative lookahead
or it'll be unreachable.

## Deploy

Static-friendly Next.js app — deploy anywhere that runs Next 15. Serve from the
apex domain (`langship.sh`); make sure `www.langship.sh` 301s to the apex at the
DNS/hosting layer so campaign links don't land on a different host than the
canonical site.
