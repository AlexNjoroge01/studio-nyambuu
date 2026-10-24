"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { SiteImage } from "@/components/media/site-image";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  accessoryFilters,
  collectionTabs,
  tabItems,
  type CollectionCategory,
  type CollectionItem,
} from "@/content/collection";
import { cn } from "@/lib/utils";

function CollectionTile({ item }: { item: CollectionItem }) {
  return (
    <HoverCard openDelay={80} closeDelay={80}>
      <HoverCardTrigger asChild>
        <a
          href={`/contact?piece=${item.id}`}
          className="group relative block overflow-hidden bg-cream"
        >
          <SiteImage
            name={item.image}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className={cn(
              "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
              item.image.includes("flat-lay") ? "aspect-[4/3]" : "aspect-[4/5]"
            )}
            imgClassName="h-full w-full object-cover"
          />
          <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
          <span className="absolute right-3 bottom-3 flex size-10 items-center justify-center rounded-full bg-paper/90 text-ink opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </a>
      </HoverCardTrigger>

      <HoverCardContent className="w-80 border-border bg-paper p-5">
        <p className="label mb-2 text-cocoa">{item.category}</p>
        <h3 className="font-heading text-2xl leading-tight font-light text-ink">
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-cocoa">{item.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="label font-normal">
              {tag}
            </Badge>
          ))}
        </div>
        <a
          href={`/contact?piece=${item.id}`}
          className="mt-4 inline-flex items-center gap-1 text-sm text-cobalt underline underline-offset-4"
        >
          Enquire about this piece <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      </HoverCardContent>
    </HoverCard>
  );
}

function TileGrid({ items }: { items: CollectionItem[] }) {
  if (items.length === 0) {
    return (
      <p className="py-20 text-center font-heading text-3xl text-cocoa">
        Nothing in this edit yet — ask us what is available.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <CollectionTile key={item.id} item={item} />
      ))}
    </div>
  );
}

export function CollectionGallery() {
  const [subFilter, setSubFilter] = useState<string>("All");

  const accessories = useMemo(() => {
    const items = tabItems("accessories");
    if (subFilter === "All") return items;
    return items.filter((item) => item.subcategory === subFilter);
  }, [subFilter]);

  return (
    <Tabs defaultValue="clothing" className="w-full">
      <div className="mb-8 flex flex-col gap-5 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
        <TabsList className="h-auto gap-1 bg-transparent p-0">
          {collectionTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="label rounded-full px-4 py-3 text-cocoa data-[state=active]:bg-ink data-[state=active]:text-paper"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <p className="label text-cocoa">A lookbook, not a shop · Enquire for details</p>
      </div>

      <TabsContent value="clothing">
        <TileGrid items={tabItems("clothing")} />
      </TabsContent>

      <TabsContent value="shoes">
        <TileGrid items={tabItems("shoes")} />
      </TabsContent>

      <TabsContent value="accessories">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {["All", ...accessoryFilters].map((filter) => (
            <Tooltip key={filter}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setSubFilter(filter)}
                  className={cn(
                    "label h-9 rounded-full border px-4 transition-colors",
                    subFilter === filter
                      ? "border-ink bg-ink text-paper"
                      : "border-border text-cocoa hover:border-ink hover:text-ink"
                  )}
                >
                  {filter}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {filter === "All" ? "Every accessory" : `Filter ${filter.toLowerCase()}`}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <TileGrid items={accessories} />
      </TabsContent>
    </Tabs>
  );
}

export type { CollectionCategory };
