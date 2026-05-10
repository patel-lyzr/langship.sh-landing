"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function FlipWords({
  words,
  duration = 2400,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), duration);
    return () => clearInterval(id);
  }, [duration, words.length]);

  const word = words[index];

  return (
    <span className={cn("relative inline-block min-w-[8ch]", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(8px)", position: "absolute" }}
          transition={{ duration: 0.4 }}
          className="inline-block text-gradient-accent"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
