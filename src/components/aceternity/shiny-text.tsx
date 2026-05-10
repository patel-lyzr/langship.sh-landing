"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function AnimatedShinyText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center gap-2 bg-[length:200%_100%] bg-clip-text text-transparent",
        "bg-gradient-to-r from-muted-fg via-fg to-muted-fg",
        className,
      )}
      animate={{ backgroundPosition: ["200% center", "-200% center"] }}
      transition={{ duration: 8, ease: "linear", repeat: Infinity }}
    >
      {children}
    </motion.span>
  );
}
