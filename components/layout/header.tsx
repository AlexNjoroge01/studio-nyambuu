"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle } from "lucide-react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteImage } from "@/components/media/site-image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { mainNav, site, whatsappUrl } from "@/lib/site";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-paper/92 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-[clamp(20px,6vw,96px)] md:h-20">
        <Link
          href="/"
          className="font-heading text-[1.35rem] leading-none font-light tracking-tight text-ink italic md:text-2xl"
          aria-label={`${site.brand.name} — home`}
        >
          {site.brand.wordmark}
        </Link>

        <div className="hidden flex-1 justify-center lg:flex">
          <NavigationMenu viewport>
            <NavigationMenuList className="gap-0.5">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="label bg-transparent px-3 py-2 tracking-[0.16em] text-ink hover:bg-transparent data-popup-open:bg-transparent">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[min(760px,80vw)] grid-cols-2 gap-2 p-2 lg:grid-cols-4">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/services/${service.slug}`}
                            className="group block rounded-xl p-2 transition-colors hover:bg-cream"
                          >
                            <SiteImage
                              name={service.heroImage}
                              aspect="4/5"
                              sizes="180px"
                              className="mb-3"
                            />
                            <p className="label mb-1 text-cocoa">{service.badge}</p>
                            <p className="font-heading text-xl leading-tight font-light text-ink">
                              {service.name}
                            </p>
                            <p className="mt-1 text-xs leading-snug text-cocoa">
                              {service.tagline}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-1 flex items-center justify-between border-t border-border px-4 py-3">
                    <Link
                      href="/services"
                      className="label text-cocoa transition-colors hover:text-cobalt"
                    >
                      All services
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="label text-cocoa transition-colors hover:text-cobalt"
                    >
                      How it works
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {mainNav
                .filter((item) => item.href !== "/services")
                .map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "label bg-transparent px-3 py-2 tracking-[0.16em] text-ink hover:bg-transparent focus:bg-transparent"
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Chat on WhatsApp</TooltipContent>
          </Tooltip>

          <Button asChild variant="ink" size="lg" className="hidden md:inline-flex">
            <Link href="/contact">Book a Session</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-none border-l-0 bg-paper p-0 sm:max-w-none">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <MobileNav onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
