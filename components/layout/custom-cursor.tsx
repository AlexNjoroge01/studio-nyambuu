"use client";

import { useEffect, useState } from "react";

/**
 * Desktop-only cursor: a small ink dot that grows into a "View" circle over
 * lookbook images marked with data-cursor="view" (§5.5).
 */
export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    function onMove(event: MouseEvent) {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest('[data-cursor="view"]')));
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[70] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color] duration-300 md:flex"
      style={{
        left: position.x,
        top: position.y,
        width: active ? 72 : 8,
        height: active ? 72 : 8,
        backgroundColor: active ? "var(--ink)" : "var(--ink)",
        opacity: visible ? 1 : 0,
      }}
    >
      {active && <span className="label text-paper">View</span>}
    </div>
  );
}
