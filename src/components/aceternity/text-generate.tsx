"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

export function TextGenerate({
  words,
  className,
}: {
  words: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const tokens = words.split(" ");

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {tokens.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ delay: i * 0.06, duration: 0.5 }}
          className="inline-block"
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}
