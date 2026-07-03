import type { Metadata } from "next";
import { ShieldCheck, CreditCard, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payments & Insurance",
  description:
    "Premier Eye Institute in Creedmoor, NC accepts VSP (including the VSP Premier Program) and CareCredit. Call (919) 734-2273 to verify your plan.",
};

export default function PaymentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Payments & insurance"
        title={
          <>
            Good care shouldn&apos;t be{" "}
            <em className="italic text-accent">confusing to pay for</em>.
          </>
        }
        lead="We'll help you understand your benefits before your visit, so there are no surprises after it."
      />

      <section className="mx-auto max-w-[900px] px-5 pb-24 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-lg border border-ink/[0.08] bg-surface p-8 shadow-soft">
              <span className="mb-5 inline-flex size-[46px] items-center justify-center rounded-[13px] bg-accent-tint text-accent">
                <ShieldCheck className="size-6" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h2 className="font-heading text-[22px] font-semibold text-ink">
                VSP — Vision Service Plan
              </h2>
              <p className="mt-2 text-[14.5px] leading-[1.62] text-body-text">
                We accept VSP, including the VSP Premier Program. Your plan
                can cover exams, lenses, and an eyewear allowance — we&apos;ll
                help you use every dollar of it.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.09}>
            <div className="flex h-full flex-col rounded-lg border border-ink/[0.08] bg-surface p-8 shadow-soft">
              <span className="mb-5 inline-flex size-[46px] items-center justify-center rounded-[13px] bg-accent-tint text-accent">
                <CreditCard className="size-6" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h2 className="font-heading text-[22px] font-semibold text-ink">
                CareCredit
              </h2>
              <p className="mt-2 text-[14.5px] leading-[1.62] text-body-text">
                We accept CareCredit, a healthcare credit card that lets you
                spread the cost of care and eyewear over time.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-8">
          <div className="flex flex-col items-center gap-4 rounded-lg bg-surface-alt p-8 text-center sm:p-10">
            <h2 className="font-heading text-2xl font-semibold text-ink">
              Not sure about your plan?
            </h2>
            <p className="max-w-md text-[14.5px] leading-relaxed text-body-text">
              Insurance networks change, and we accept more plans than we can
              list here. Call us with your insurance card handy and we&apos;ll
              verify your coverage in a couple of minutes.
            </p>
            <a
              href={site.phoneHref}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-accent px-8 text-[15px] font-semibold text-white shadow-cta transition-all duration-250 hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call {site.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
