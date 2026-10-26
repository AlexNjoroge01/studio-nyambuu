import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. Pure CSS transform loop, pauses on hover and
 * stops under prefers-reduced-motion (§5.5).
 */
export function Marquee({
  children,
  className,
  repeated = 2,
}: {
  children: ReactNode;
  className?: string;
  repeated?: number;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="marquee-track flex w-max">
        {Array.from({ length: repeated }).map((_, index) => (
          <div
            key={index}
            className="flex shrink-0 items-center"
            aria-hidden={index > 0}
            inert={index > 0}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
