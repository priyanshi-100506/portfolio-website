"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tickerItems } from "@/lib/portfolio-data";

export function AnimatedTicker() {
  const reduceMotion = useReducedMotion();
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="overflow-hidden border-y border-line bg-white/[0.03] py-4" aria-label="Areas of expertise">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, index) => (
          <span className="flex items-center gap-8 text-sm font-semibold uppercase tracking-[0.22em] text-mist" key={`${item}-${index}`}>
            {item}
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brass" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
