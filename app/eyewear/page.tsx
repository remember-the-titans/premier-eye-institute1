import type { Metadata } from "next";
import Link from "next/link";
import { Glasses, Sun, Wrench, Users } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Eyewear, Frames & Sunglasses",
  description:
    "Prescription glasses, frame styling, and prescription & non-prescription sunglasses at Premier Eye Institute in Creedmoor, NC. Personal fittings, adjustments, and repairs.",
};

const pillars = [
  {
    icon: Glasses,
    title: "Frames that fit your life",
    copy: "Our optical specialists, Maddie and Brianne, help you find frames that suit your face, your prescription, and your day-to-day — no upselling, just honest styling.",
  },
  {
    icon: Sun,
    title: "Sunglasses, with or without Rx",
    copy: "Real UV protection matters as much as style. We carry prescription and non-prescription sunglasses so your eyes stay protected outdoors.",
  },
  {
    icon: Wrench,
    title: "Adjustments & repairs",
    copy: "Frames loosen and life happens. Bring your glasses in for fittings, adjustments, and repairs — usually handled on the spot.",
  },
  {
    icon: Users,
    title: "VSP Premier Program",
    copy: "We accept VSP, including the VSP Premier Program, and we'll help you get the most from your vision benefits when choosing eyewear.",
  },
];

export default function EyewearPage() {
  return (
    <>
      <PageHero
        eyebrow="Eyewear"
        title={
          <>
            Glasses you&apos;ll{" "}
            <em className="italic text-accent">want</em> to wear.
          </>
        }
        lead="An exam tells us what your eyes need. The optical is where it becomes something you love wearing every day."
      />

      <section className="mx-auto max-w-[1000px] px-5 pb-24 sm:px-8">
        <ul className="grid gap-5 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 0.09}>
              <div className="flex h-full flex-col rounded-lg border border-ink/[0.08] bg-surface p-8 shadow-soft transition-shadow duration-300 hover:shadow-warm">
                <span className="mb-5 inline-flex size-[46px] items-center justify-center rounded-[13px] bg-accent-tint text-accent">
                  <p.icon className="size-6" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h2 className="font-heading text-[22px] font-semibold text-ink">
                  {p.title}
                </h2>
                <p className="mt-2 text-[14.5px] leading-[1.62] text-body-text">
                  {p.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-10 text-center">
          <p className="text-[15px] text-body-text">
            Not sure where to start?{" "}
            <Link
              href="/book"
              className="font-semibold text-accent underline-offset-4 hover:underline"
            >
              Book an exam
            </Link>{" "}
            and we&apos;ll walk the optical together afterward.
          </p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
