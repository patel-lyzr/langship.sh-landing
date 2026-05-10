"use client";

import { cn } from "@/lib/cn";

export function Marquee({
  children,
  className,
  pauseOnHover = true,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
}) {
  return (
    <div className={cn("relative flex w-full overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center gap-12 [animation:marquee_30s_linear_infinite]",
          pauseOnHover && "hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {children}
        {children}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
