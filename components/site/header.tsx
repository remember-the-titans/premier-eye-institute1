"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background,box-shadow,border-color] duration-300",
        scrolled
          ? "border-ink/[0.06] bg-white/80 shadow-soft backdrop-blur-xl"
          : "border-transparent bg-white/60 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "text-[14.5px] font-medium transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                pathname === item.href ? "text-accent" : "text-body-text"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-[14.5px] font-semibold text-ink transition-colors hover:text-accent xl:inline-flex"
          >
            <Phone className="size-4 text-accent" aria-hidden="true" />
            {site.phoneDisplay}
          </a>
          <Button
            asChild
            className="press hidden rounded-full bg-accent px-5 font-semibold text-white shadow-cta transition-[transform,translate,background-color,border-color] duration-200 hover:-translate-y-px hover:bg-accent-hover sm:inline-flex"
          >
            <Link href="/book">Book Appointment</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="size-11 rounded-full lg:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] overscroll-contain bg-white"
            >
              <SheetHeader>
                <SheetTitle className="font-heading text-left text-lg font-semibold">
                  Premier Eye Institute
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-3 text-[15.5px] font-medium transition-colors hover:bg-surface-alt",
                      pathname === item.href ? "text-accent" : "text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 p-4">
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 text-[15px] font-semibold text-ink"
                >
                  <Phone className="size-4 text-accent" aria-hidden="true" />
                  {site.phoneDisplay}
                </a>
                <Button
                  asChild
                  className="press min-h-11 rounded-full bg-accent font-semibold text-white shadow-cta transition-transform duration-150 hover:bg-accent-hover"
                >
                  <Link href="/book" onClick={() => setOpen(false)}>
                    Book Appointment
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
