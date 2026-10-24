"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Headline reveals line-by-line from behind a mask, stagger 0.08s (§5.5).
 *
 * The `whileInView` observer sits on the *mask* (the element that is actually
 * visible), not on the translated line inside it — otherwise the line starts
 * fully clipped, never intersects the viewport and never animates in.
 */
export function SplitHeading({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <span className={cn("block", className)}>
      {lines.map((line, index) => (
        <motion.span
          key={index}
          className="block overflow-hidden"
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-8%" }}
          custom={index}
        >
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: "110%" },
              visible: (lineIndex: number) => ({
                y: 0,
                transition: {
                  duration: 0.95,
                  delay: delay + lineIndex * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                },
              }),
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}
