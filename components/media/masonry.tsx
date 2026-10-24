import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * CSS-column masonry. Children keep their intrinsic aspect ratio, so portrait
 * and landscape images interlock without JavaScript (§7.5).
 */
export function Masonry({
  children,
  className,
  columns = "columns-2 md:columns-3",
}: {
  children: ReactNode;
  className?: string;
  columns?: string;
}) {
  return (
    <div className={cn(columns, "gap-3 [column-fill:balance] md:gap-4", className)}>
      {children}
    </div>
  );
}
