import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { TestimonialCard } from "@/components/ui/testimonials-column";
import { testimonials, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Patient Reviews & Testimonials",
  description:
    "What patients say about Premier Eye Institute in Creedmoor, NC — reviews of eye exams, contact lens fittings, and eyewear from Dr. Nisha Mehta, OD.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title={
          <>
            What patients{" "}
            <em className="italic text-accent">actually say</em>.
          </>
        }
        lead="Here's a sample of what patients have told us — and where to leave your own review."
      />

      <section className="mx-auto max-w-[1000px] px-5 pb-24 sm:px-8">
        {/* Static grid — every review, all at once, nothing scrolling. */}
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="rounded-lg border border-ink/[0.07] bg-surface-alt p-8 text-center sm:p-10">
            <h2 className="font-heading text-2xl font-semibold text-ink">
              Been in to see us? Leave a review.
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[14.5px] leading-relaxed text-body-text">
              Reviews help other people find good care. A minute of your time
              means a lot to a small practice like ours.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3.5">
              <Button asChild variant="pill" size="pill-sm">
                <a href={site.facebook} target="_blank" rel="noopener noreferrer">
                  Review us on Facebook
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="pill-outline" size="pill-sm">
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Review us on Google
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
