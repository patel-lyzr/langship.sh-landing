"use client";

import Link from "next/link";
import { Github, Sun, Moon, ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Top nav, full width. Wordmark on one line, nav links inline (no bordered
// cells like before), GitHub + theme + a "Get the platform" button on the
// right. Sticky so it follows scroll.
export function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl tracking-tight leading-none"
        >
          langship<span className="text-accent">.sh</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <NavLink href="#platform" label="Platform" />
          <NavLink href="#environments" label="Envs" />
          <NavLink href="#pipeline" label="Pipeline" />
          <NavLink href="#runtimes" label="Runtimes" />
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-fg transition-colors hover:text-fg"
          >
            <Github className="h-4 w-4" />
          </a>
          <ThemeToggle />
          <a
            href="#cta"
            className="group hidden items-center gap-2 border border-fg bg-fg px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bg transition-colors hover:bg-fg/90 sm:inline-flex"
          >
            Get the platform
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-fg transition-colors hover:text-fg"
    >
      {label}
    </a>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex h-7 w-7 items-center justify-center border border-border text-fg transition-colors hover:bg-bg-2"
    >
      {mounted && (isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />)}
    </button>
  );
}
