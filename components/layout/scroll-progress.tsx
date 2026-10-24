"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin cobalt scroll-progress bar under the header (§5.5). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-cobalt"
      style={{ scaleX }}
    />
  );
}
