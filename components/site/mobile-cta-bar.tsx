"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* Thumb-reach booking bar for phones: slides up once the visitor has
   scrolled past the hero, so it never competes with the hero CTAs. */
export function MobileCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-ink/[0.08] bg-white/90 p-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform duration-300 ease-[var(--ease-soft)] sm:hidden",
        show ? "translate-y-0" : "translate-y-full"
      )}
      aria-hidden={!show}
    >
      <a
        href={site.phoneHref}
        tabIndex={show ? 0 : -1}
        className="press inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white text-[14.5px] font-semibold text-ink transition-transform duration-150"
      >
        <Phone className="size-4 text-accent" aria-hidden="true" />
        Call
      </a>
      <Link
        href="/book"
        tabIndex={show ? 0 : -1}
        className="press inline-flex min-h-12 flex-[1.6] items-center justify-center rounded-full bg-accent text-[14.5px] font-semibold text-white shadow-cta transition-transform duration-150"
      >
        Book Appointment
      </Link>
    </div>
  );
}
