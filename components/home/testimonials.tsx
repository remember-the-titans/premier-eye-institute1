import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 md:py-36">
      <Reveal className="mb-12 text-center">
        <p className="eyebrow eyebrow-centered mb-3.5 justify-center">
          From our patients
        </p>
        <h2 className="font-heading text-[clamp(30px,4.4vw,52px)] font-medium leading-[1.05] tracking-[-0.5px] text-ink">
          Word travels around <em className="italic text-accent">Creedmoor</em>.
        </h2>
      </Reveal>

      <ul className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal
            as="li"
            key={t.name}
            delay={i * 0.09}
            className={i === 1 ? "md:-translate-y-4" : ""}
          >
            <figure className="flex h-full flex-col rounded-lg border border-ink/[0.08] bg-surface p-7 shadow-soft">
              <div
                className="flex gap-1 text-accent"
                role="img"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="font-heading mt-4 flex-1 text-[19px] font-normal leading-[1.45] text-[#221d19]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-ink/[0.07] pt-4">
                <p className="text-[14.5px] font-bold text-ink">{t.name}</p>
                <p className="text-[12.5px] font-medium uppercase tracking-[1.5px] text-soft">
                  {t.detail}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.15} className="mt-10 text-center">
        <Link
          href="/reviews"
          className="inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-[14.5px] font-semibold text-ink transition-colors hover:text-accent"
        >
          Read more reviews
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Reveal>
    </section>
  );
}
