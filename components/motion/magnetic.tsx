"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

/**
 * CTA follows the cursor by up to 12px on desktop only (§5.5).
 * Touch and reduced-motion users get the untouched button.
 */
export function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    const limit = 12;
    setPosition({
      x: Math.max(-limit, Math.min(limit, x * 0.25)),
      y: Math.max(-limit, Math.min(limit, y * 0.25)),
    });
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={() => setPosition({ x: 0, y: 0 })}
      animate={reduced ? undefined : position}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.35 }}
    >
      {children}
    </motion.div>
  );
}
