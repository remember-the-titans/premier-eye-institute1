import type { Metadata } from "next";
import { Star, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { testimonials, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Patient Reviews & Testimonials",
  description:
    "What patients say about Premier Eye Institute in Creedmoor, NC — reviews of eye exams, contact lens fittings, and dry eye care from Dr. Nisha Mehta, OD.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title={
          <>
            Our favorite feedback comes{" "}
            <em className="italic text-accent">from you</em>.
          </>
        }
        lead="We're proud of the trust our patients place in us. Here's a sample of what they share — and where to leave your own."
      />

      <section className="mx-auto max-w-[1000px] px-5 pb-24 sm:px-8">
        <ul className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 0.09}>
              <figure className="flex h-full flex-col rounded-lg border border-ink/[0.08] bg-surface p-7 shadow-soft">
                <div className="flex gap-1 text-accent" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="font-heading mt-4 flex-1 text-[19px] leading-[1.45] text-[#221d19]">
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

        <Reveal delay={0.15} className="mt-12">
          <div className="rounded-lg border border-ink/[0.07] bg-surface-alt p-8 text-center sm:p-10">
            <h2 className="font-heading text-2xl font-semibold text-ink">
              Been to see us? Share your experience.
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[14.5px] leading-relaxed text-body-text">
              Reviews help your neighbors find good care. A minute of your
              time means a lot to a small, independent practice.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3.5">
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 text-[14px] font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Review us on Facebook
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/10 bg-white px-6 text-[14px] font-semibold text-ink transition-colors hover:border-ink/25"
              >
                Review us on Google
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
