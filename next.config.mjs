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
    ];
  },
};

export default nextConfig;
