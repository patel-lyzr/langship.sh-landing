"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-6xl auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title: string;
  description: string;
  header?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative row-span-1 flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_0_60px_-15px_hsl(var(--accent)/0.4)]",
        className,
      )}
    >
      <div className="relative h-full overflow-hidden rounded-xl">{header}</div>
      <div className="mt-4 transition-transform duration-300 group-hover:translate-y-[-2px]">
        <div className="flex items-center gap-2 text-fg">
          {icon}
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-fg">{description}</p>
      </div>
    </div>
  );
}
