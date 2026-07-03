import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { ContactSection } from "@/components/contact/contact-section";

export const metadata: Metadata = {
  title: "Contact Us — Creedmoor, NC Office",
  description:
    "Contact Premier Eye Institute at 2531 E Lyon Station Rd, Suite F, Creedmoor, NC 27522. Call (919) 734-2273, see office hours, get directions, or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Come say <em className="italic text-accent">hello</em>.
          </>
        }
        lead="We're at 2531 E Lyon Station Rd, Suite F in Creedmoor — easy parking, easy check-in, and a team that's glad to see you."
      />
      <ContactSection />
    </>
  );
}
