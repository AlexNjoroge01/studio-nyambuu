"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

import { site, whatsappUrl } from "@/lib/site";

/** Floating WhatsApp pill, bottom-right on mobile; hidden on /contact (§5.6). */
export function WhatsAppFab() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <a
      href={whatsappUrl(`Hi ${site.brand.short}, I'd like to chat about styling.`)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-light text-paper shadow-xl transition-transform hover:-translate-y-0.5 md:hidden"
      aria-label="Chat with Nyambura on WhatsApp"
    >
      <MessageCircle className="size-4" aria-hidden />
      WhatsApp
    </a>
  );
}
