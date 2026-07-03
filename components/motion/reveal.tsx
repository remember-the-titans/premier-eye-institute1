"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/* --ease-out-strong from globals.css: crisper entrance, same calm mood. */
const EASE_OUT_STRONG = [0.23, 1, 0.32, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "p" | "h2" | "h3" | "figure";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT_STRONG }}
    >
      {children}
    </Tag>
  );
}
