import type { BreadcrumbItem } from "@/lib/schema";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { cn } from "@/lib/utils";

/** Breadcrumb strip used at the top of every inner page (§3). */
export function PageTop({
  crumbs,
  className,
}: {
  crumbs: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <div className={cn("container-page pt-8 md:pt-10", className)}>
      <Breadcrumbs items={crumbs} />
    </div>
  );
}
