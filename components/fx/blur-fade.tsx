"use client";

// Blur Fade — Magic UI (MIT), vía 21st.dev: @dillionverma/components/blur-fade
// Adaptado a framer-motion (el sitio no usa el paquete `motion`).

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

type BlurFadeProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  blur?: string;
  as?: "div" | "span" | "li" | "section";
};

export function BlurFade({
  children,
  className,
  duration = 0.55,
  delay = 0,
  offset = 10,
  direction = "up",
  inView = true,
  blur = "6px",
  as = "div",
}: BlurFadeProps) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });
  const show = !inView || seen;
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "right" || direction === "down" ? -1 : 1;
  // blur="0px" no toca `filter`: un filtro, aunque sea de 0px, rompe el
  // mix-blend-mode de las fotos con fondo blanco.
  const withBlur = blur !== "0px";
  const variants: Variants = {
    hidden: { [axis]: sign * offset, opacity: 0, ...(withBlur && { filter: `blur(${blur})` }) },
    visible: { [axis]: 0, opacity: 1, ...(withBlur && { filter: "blur(0px)" }) },
  };
  const Tag = motion[as];
  return (
    <Tag
      ref={ref}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay: 0.04 + delay, duration, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}
