import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Swaps in a real photograph of Nyambura when one exists at
 * /public/images/owner.jpg; otherwise renders a quiet branded placeholder.
 * TODO(client): add the real photo — see README handoff.
 */
export function OwnerPhoto({ className }: { className?: string }) {
  const ownerPath = join(process.cwd(), "public", "images", "owner.jpg");
  const hasOwnerPhoto = existsSync(ownerPath);

  return (
    <div
      className={cn(
        "arch-frame relative w-full overflow-hidden bg-cream",
        className
      )}
    >
      {hasOwnerPhoto ? (
        <Image
          src="/images/owner.jpg"
          alt="Nyambura Mbugua, personal stylist and founder, in the studio"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "50% 25%" }}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-cream px-6 text-center">
          <span className="font-heading text-6xl font-light italic text-cocoa/60">
            NM
          </span>
          <span className="label text-cocoa/70">The studio</span>
          <p className="max-w-[22ch] font-heading text-xl leading-tight text-cocoa">
            A portrait of Nyambura will live here.
          </p>
        </div>
      )}
    </div>
  );
}
