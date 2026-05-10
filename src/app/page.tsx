import { TopNav } from "@/components/top-nav";
import { Hero } from "@/components/sections/hero";
import { Showcase } from "@/components/sections/showcase";
import { Environments } from "@/components/sections/environments";
import { Features } from "@/components/sections/features";
import { Workflow } from "@/components/sections/workflow";
import { Runtimes } from "@/components/sections/runtimes";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <TopNav />
      <main className="relative">
        <Hero />
        <Showcase />
        <Environments />
        <Features />
        <Workflow />
        <Runtimes />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
