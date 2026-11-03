"use client";

// Flip Words — Aceternity UI, vía 21st.dev. Cada palabra entra letra por letra.

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FlipWords({
  words,
  duration = 2800,
  className,
  letterClassName,
}: {
  words: string[];
  duration?: number;
  className?: string;
  /** Va en cada letra: así un relleno con degradé (background-clip) sobrevive a la animación. */
  letterClassName?: string;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((n) => (n + 1) % words.length), duration);
    return () => clearTimeout(t);
  }, [i, duration, words.length, reduce]);

  const word = words[i];
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="sr-only">{words[0]}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          aria-hidden
          className="inline-block whitespace-nowrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -36, x: 30, filter: "blur(8px)", scale: 1.6 }}
          transition={{ type: "spring", stiffness: 110, damping: 14 }}
        >
          {word.split("").map((ch, k) => (
            <motion.span
              key={k}
              className={cn("inline-block", letterClassName)}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: k * 0.045, duration: 0.35 }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
