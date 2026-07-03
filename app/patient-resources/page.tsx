import type { Metadata } from "next";
import { ExternalLink, FileText, MonitorSmartphone, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Patient Resources & Portal",
  description:
    "Patient resources for Premier Eye Institute in Creedmoor, NC — access the Crystal PM patient portal, new patient information, and contact options.",
};

const resources = [
  {
    icon: MonitorSmartphone,
    title: "Patient portal",
    copy: "Existing patients can log in to the Crystal PM portal to manage their information.",
    action: { label: "Open the portal", href: site.portalUrl, external: true },
  },
  {
    icon: FileText,
    title: "New patient forms",
    copy: "Save time at check-in. Call us before your first visit and we'll make sure your paperwork is ready to go.",
    action: { label: `Call ${site.phoneDisplay}`, href: site.phoneHref },
  },
  {
    icon: Phone,
    title: "Questions between visits",
    copy: "Wendy and Amanda are happy to help with scheduling, prescriptions, and general questions during office hours.",
    action: { label: "Contact us", href: "/contact" },
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient resources"
        title={
          <>
            Everything you need,{" "}
            <em className="italic text-accent">before and after</em> your
            visit.
          </>
        }
      />

      <section className="mx-auto max-w-[1000px] px-5 pb-24 sm:px-8">
        <ul className="grid gap-5 md:grid-cols-3">
          {resources.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.09}>
              <div className="flex h-full flex-col rounded-lg border border-ink/[0.08] bg-surface p-8 shadow-soft">
                <span className="mb-5 inline-flex size-[46px] items-center justify-center rounded-[13px] bg-accent-tint text-accent">
                  <r.icon className="size-6" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h2 className="font-heading text-[21px] font-semibold text-ink">
                  {r.title}
                </h2>
                <p className="mt-2 flex-1 text-[14.5px] leading-[1.62] text-body-text">
                  {r.copy}
                </p>
                <a
                  href={r.action.href}
                  {...("external" in r.action && r.action.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent underline-offset-4 hover:underline"
                >
                  {r.action.label}
                  {"external" in r.action && r.action.external && (
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  )}
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
