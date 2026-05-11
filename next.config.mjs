/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // /interrupt — campaign URL for the Interrupt 2026 LinkedIn push.
      // Points at the "Dear LangChain" manifesto (/). Temporary (307) so we
      // can repoint it later without burning the redirect into caches; Next
      // forwards the ?utm_* query string through automatically, so marketing's
      // tracking params survive the hop.
      { source: "/interrupt", destination: "/", permanent: false },

      // Catch-all: anything that isn't a real route lands on the manifesto.
      // The negative lookahead excludes the pages we actually serve (/, /home,
      // /interrupt — which has its own rule above), Next internals (/_next/*),
      // and bare static files at the root (favicon.ico, robots.txt, *.png …)
      // so assets aren't swallowed. Without the regex this would also match /
      // and loop. 307 so it stays soft — easy to undo if we add routes later.
      {
        source:
          "/:path((?!home$|interrupt$|_next/|.*\\.[a-zA-Z0-9]+$).*)",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
