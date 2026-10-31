"use client";

import { Camera } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { allImages } from "@/lib/image-manifest";

/** Footer photo-credits dialog (Blueprint §6.3). */
export function PhotoCredits() {
  const credits = allImages.filter((image) => image.credit);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs text-cocoa underline decoration-border underline-offset-4 transition-colors hover:text-cobalt"
        >
          <Camera className="size-3.5" aria-hidden />
          Photo credits
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto bg-paper sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-3xl font-light">
            Photography credits
          </DialogTitle>
          <DialogDescription>
            Accessory and lifestyle photography is licensed from Unsplash. Each
            link opens the original photographer&apos;s page.
          </DialogDescription>
        </DialogHeader>
        <ul className="divide-y divide-border">
          {credits.map((image) => (
            <li key={image.key} className="py-3">
              <a
                href={image.credit?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4"
              >
                <span className="text-sm leading-snug text-ink group-hover:text-cobalt">
                  {image.alt}
                </span>
                <span className="label shrink-0 pt-0.5 text-cocoa">Unsplash ↗</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-cocoa">
          Studio clothing photography © Styled by Nyambura. All rights reserved.
        </p>
      </DialogContent>
    </Dialog>
  );
}
