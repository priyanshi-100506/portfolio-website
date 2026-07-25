"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

export function SmoothScrollProvider() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      return undefined;
    }

    const lenis = new Lenis({
      anchors: {
        offset: -72
      },
      autoRaf: true,
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      wheelMultiplier: 0.9
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
