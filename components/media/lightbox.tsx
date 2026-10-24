"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { SiteImage } from "@/components/media/site-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { ImageKey } from "@/lib/image-manifest";

export interface LightboxItem {
  key: ImageKey;
  caption: string;
  tags: readonly string[];
  href: string;
  enquiryLabel?: string;
}

function LightboxBody({
  item,
  index,
  total,
  onPrev,
  onNext,
}: {
  item: LightboxItem;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_280px] md:gap-8">
      <div className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-ink/5">
        <SiteImage
          name={item.key}
          sizes="(min-width: 768px) 65vw, 100vw"
          className="max-h-[70vh] w-full"
          imgClassName="max-h-[70vh] w-full object-contain"
        />
      </div>

      <div className="flex flex-col justify-between gap-6 pr-2">
        <div className="space-y-4">
          <p className="label text-cocoa">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <DialogTitle asChild>
            <h2 className="font-heading text-3xl leading-[1.05] font-light text-ink md:text-4xl">
              {item.caption}
            </h2>
          </DialogTitle>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="label font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Button asChild variant="ink" size="lg" className="w-full">
            <a href={item.href}>{item.enquiryLabel ?? "Enquire about this look"}</a>
          </Button>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <Button variant="ghost" size="icon" onClick={onPrev} aria-label="Previous image">
              <ChevronLeft />
            </Button>
            <span className="label text-cocoa">Use arrow keys</span>
            <Button variant="ghost" size="icon" onClick={onNext} aria-label="Next image">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const open = index !== null;
  const item = index !== null ? items[index] : null;

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft" && index !== null) {
        onNavigate((index - 1 + items.length) % items.length);
      }
      if (event.key === "ArrowRight" && index !== null) {
        onNavigate((index + 1) % items.length);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, index, items.length, onNavigate]);

  if (!item || index === null) return null;

  const body = (
    <LightboxBody
      item={item}
      index={index}
      total={items.length}
      onPrev={() => onNavigate((index - 1 + items.length) % items.length)}
      onNext={() => onNavigate((index + 1) % items.length)}
    />
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
        <DialogContent
          showCloseButton
          className="max-h-[92vh] w-[calc(100vw-4rem)] max-w-5xl overflow-y-auto bg-paper p-6 md:p-8"
        >
          {body}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={(next) => !next && onClose()}>
      <DrawerContent className="max-h-[92vh] bg-paper pb-6">
        <div className="flex items-center justify-between px-5 pt-2 pb-4">
          <DrawerTitle className="label text-cocoa">The lookbook</DrawerTitle>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X />
          </Button>
        </div>
        <div className="overflow-y-auto px-5">{body}</div>
      </DrawerContent>
    </Drawer>
  );
}
