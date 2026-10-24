import Image from "next/image";

import {
  imageManifest,
  type ImageKey,
  type ManifestEntry,
} from "@/lib/image-manifest";
import { cn } from "@/lib/utils";

/**
 * The only way pages render content photography (Blueprint §10).
 * Resolves a manifest key, applies alt, blur, focal point and sizes.
 */
export interface SiteImageProps {
  name: ImageKey;
  alt?: string;
  /** Required whenever the image is rendered with `fill` or `aspect`. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Render with next/image `fill` inside the provided relative parent. */
  fill?: boolean;
  /** Convenience: renders a fill image inside an aspect-ratio frame. */
  aspect?: string;
  /** Override the manifest focal point. */
  focal?: string;
  quality?: number;
}

export function SiteImage({
  name,
  alt,
  sizes = "100vw",
  priority = false,
  className,
  imgClassName,
  fill = false,
  aspect,
  focal,
  quality,
}: SiteImageProps) {
  const image: ManifestEntry = imageManifest[name];
  const objectPosition = focal ?? image.focal;
  const imageAlt = alt ?? image.alt;

  if (aspect) {
    return (
      <div
        className={cn("relative w-full overflow-hidden", className)}
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={image.src}
          alt={imageAlt}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          priority={priority}
          quality={quality}
          className={cn("object-cover", imgClassName)}
          style={{ objectPosition }}
        />
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={image.src}
        alt={imageAlt}
        fill
        sizes={sizes}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        priority={priority}
        quality={quality}
        className={cn("object-cover", className, imgClassName)}
        style={{ objectPosition }}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={imageAlt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      priority={priority}
      quality={quality}
      className={cn("h-auto w-full", className, imgClassName)}
      style={{ objectPosition }}
    />
  );
}
