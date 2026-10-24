"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Image unveils with clip-path plus a subtle scale 1.15 → 1 (§5.5).
 *
 * The `whileInView` observer must sit on the unclipped wrapper: an element
 * clipped to zero height by its own `clip-path` reports a zero-area
 * intersection, so observing the clipped layer means it never animates in.
 */
export function ImageReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("relative", className)}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-8%" }}
    >
      <motion.div
        className="overflow-hidden"
        variants={{
          hidden: { clipPath: "inset(0 0 100% 0)" },
          visible: {
            clipPath: "inset(0 0 0% 0)",
            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        <motion.div
          className="h-full w-full"
          variants={{
            hidden: { scale: 1.15 },
            visible: {
              scale: 1,
              transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
