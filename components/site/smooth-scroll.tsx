"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* The live Lenis instance, for features that need programmatic smooth
   scrolling (e.g. the service story's progress rail). Null under reduced
   motion or before mount — callers must fall back to native scrolling. */
let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      anchors: { offset: -84 },
    });
    lenisInstance = lenis;

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
