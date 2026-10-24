"use client";

import { useMemo, useState } from "react";

import { Lightbox, type LightboxItem } from "@/components/media/lightbox";
import { SiteImage } from "@/components/media/site-image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { allImages, type ImageKey } from "@/lib/image-manifest";
import { lookbookContent } from "@/content/lookbook";
import { cn } from "@/lib/utils";

const OCCASION_TAGS = new Set([
  "party",
  "occasion",
  "wedding-guest",
  "cocktail",
  "formal",
  "evening",
  "church",
  "graduation",
  "office",
  "date-night",
]);

export function LookbookGallery() {
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = useMemo(() => {
    return allImages.filter((image) => {
      if (filter === "all") return true;
      if (filter === "occasion") {
        return image.tags.some((tag) => OCCASION_TAGS.has(tag));
      }
      return image.category === filter;
    });
  }, [filter]);

  const lightboxItems = useMemo<LightboxItem[]>(
    () =>
      items.map((image) => ({
        key: image.key,
        caption: image.alt,
        tags: image.tags,
        href: "/contact?piece=" + image.key,
      })),
    [items]
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(value) => {
            if (value) {
              setFilter(value);
              setActiveIndex(null);
            }
          }}
          className="flex flex-wrap gap-1"
          aria-label="Filter the lookbook"
        >
          {lookbookContent.filters.map((item) => (
            <ToggleGroupItem
              key={item.value}
              value={item.value}
              className="label h-10 rounded-full px-4 text-ink data-[state=on]:bg-ink data-[state=on]:text-paper"
            >
              {item.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p className="label text-cocoa" aria-live="polite">
          {items.length} {items.length === 1 ? "image" : "images"}
        </p>
      </div>

      <div className="columns-2 gap-3 md:columns-3 md:gap-4">
        {items.map((image, index) => (
          <button
            key={image.key}
            type="button"
            data-cursor="view"
            onClick={() => setActiveIndex(index)}
            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden bg-cream text-left md:mb-4"
            aria-label={`Open image: ${image.alt}`}
          >
            <SiteImage
              name={image.key}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <span className="label text-paper">View look</span>
            </span>
          </button>
        ))}
      </div>

      {items.length === 0 && (
        <p className={cn("py-20 text-center font-heading text-3xl text-cocoa")}>
          Nothing here yet — try another filter.
        </p>
      )}

      <Lightbox
        items={lightboxItems}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}

export type { ImageKey };
