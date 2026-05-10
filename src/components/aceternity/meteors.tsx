"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function Meteors({ number = 20, className }: { number?: number; className?: string }) {
  const [styles, setStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    setStyles(
      Array.from({ length: number }).map(() => ({
        top: -20,
        left: `${Math.floor(Math.random() * 100)}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${2 + Math.random() * 6}s`,
      })),
    );
  }, [number]);

  return (
    <>
      {styles.map((style, i) => (
        <span
          key={i}
          className={cn(
            "pointer-events-none absolute h-0.5 w-0.5 rotate-[215deg] rounded-full bg-fg shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-px before:w-[60px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-fg before:to-transparent before:content-['']",
            "animate-[meteor_5s_linear_infinite]",
            className,
          )}
          style={style}
        />
      ))}
      <style>{`
        @keyframes meteor {
          0%   { transform: rotate(215deg) translateX(0); opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: rotate(215deg) translateX(-700px); opacity: 0; }
        }
      `}</style>
    </>
  );
}
