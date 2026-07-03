import Link from "next/link";
import { Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-7 px-5 py-20 text-center sm:px-8 md:py-24">
        <Reveal>
          <p className="eyebrow eyebrow-centered mb-4 justify-center">
            Ready when you are
          </p>
          <h2 className="font-heading text-[clamp(30px,4.4vw,52px)] font-medium leading-[1.08] tracking-[-0.5px] text-white">
            Let&apos;s take a closer look at{" "}
            <em className="italic text-accent">your</em> eyes.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/book"
            className="press inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-8 text-[15.5px] font-semibold text-white shadow-cta transition-[transform,translate,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Book Appointment
          </Link>
          <a
            href={site.phoneHref}
            className="press inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 px-7 text-[15.5px] font-semibold text-white transition-[transform,translate,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-white/40"
          >
            <Phone className="size-4 text-accent" aria-hidden="true" />
            {site.phoneDisplay}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
