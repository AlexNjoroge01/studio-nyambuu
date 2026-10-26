import { Fragment } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { JsonLd } from "@/components/seo/json-ld";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { breadcrumbSchema, type BreadcrumbItem as Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";

/** Breadcrumbs + BreadcrumbList JSON-LD on every inner page (§3). */
export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <>
      <Breadcrumb className={cn(className)}>
        <BreadcrumbList className="label gap-1.5 tracking-[0.12em] text-cocoa">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <Fragment key={item.href}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="label tracking-[0.12em] text-ink">
                      {item.name}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href} className="transition-colors hover:text-cobalt">
                        {item.name}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbSeparator className="text-cocoa/60">
                    <ChevronRight className="size-3" />
                  </BreadcrumbSeparator>
                )}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
