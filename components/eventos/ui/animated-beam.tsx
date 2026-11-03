"use client";

// Animated Beam — Magic UI (MIT), vía 21st.dev. Un haz de luz que recorre la
// curva entre dos elementos; la curva se recalcula si cambia el tamaño.

import { useEffect, useId, useState, type RefObject } from "react";
import { motion } from "framer-motion";

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3.2,
  delay = 0,
  pathColor = "#ffffff",
  pathOpacity = 0.22,
  pathWidth = 2,
  from = "#ffffff",
  to = "#ffd0c9",
}: {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathOpacity?: number;
  pathWidth?: number;
  from?: string;
  to?: string;
}) {
  const id = useId();
  const [d, setD] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const actualizar = () => {
      const c = containerRef.current;
      const a = fromRef.current;
      const b = toRef.current;
      if (!c || !a || !b) return;
      const rc = c.getBoundingClientRect();
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      setSize({ w: rc.width, h: rc.height });
      const sx = ra.left - rc.left + ra.width / 2;
      const sy = ra.top - rc.top + ra.height / 2;
      const ex = rb.left - rc.left + rb.width / 2;
      const ey = rb.top - rc.top + rb.height / 2;
      setD(`M ${sx},${sy} Q ${(sx + ex) / 2},${(sy + ey) / 2 - curvature} ${ex},${ey}`);
    };
    actualizar();
    const ro = new ResizeObserver(actualizar);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);

  const x1 = reverse ? ["90%", "-10%"] : ["10%", "110%"];
  const x2 = reverse ? ["100%", "0%"] : ["0%", "100%"];

  return (
    <svg
      aria-hidden
      fill="none"
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
      className="pointer-events-none absolute left-0 top-0"
    >
      <path d={d} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      <path d={d} stroke={`url(#${id})`} strokeWidth={pathWidth + 0.5} strokeLinecap="round" />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{ x1, x2, y1: ["0%", "0%"], y2: ["0%", "0%"] }}
          transition={{ delay, duration, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 0.4 }}
        >
          <stop stopColor={from} stopOpacity="0" />
          <stop stopColor={from} />
          <stop offset="32.5%" stopColor={to} />
          <stop offset="100%" stopColor={to} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
