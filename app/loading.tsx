import { Skeleton } from "@/components/ui/skeleton";

/** Branded loading state (§13) — no layout shift, no white flash. */
export default function Loading() {
  return (
    <div className="container-page pt-12 pb-24 md:pt-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="space-y-5 lg:col-span-6">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-20 w-full max-w-xl md:h-28" />
          <Skeleton className="h-20 w-full max-w-md md:h-24" />
          <Skeleton className="h-4 w-full max-w-lg" />
          <Skeleton className="h-12 w-48 rounded-full" />
        </div>
        <Skeleton className="aspect-[4/3] w-full lg:col-span-6" />
      </div>
    </div>
  );
}
