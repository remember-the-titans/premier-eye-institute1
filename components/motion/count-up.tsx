"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function CountUp({
  value,
  suffix = "",
  decimals = 0,
  duration = 1600,
  className,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  const format = (v: number) =>
    decimals > 0
      ? v.toFixed(decimals)
      : Math.round(v).toLocaleString("en-US");

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = format(value) + suffix;
      return;
    }
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf: number;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = format(value * ease(t)) + suffix;
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className} aria-label={format(value) + suffix}>
      {format(0) + suffix}
    </span>
  );
}
