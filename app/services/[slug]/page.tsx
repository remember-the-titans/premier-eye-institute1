import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { ServiceScrollStory } from "@/components/services/service-scroll-story";
import { getJourney, journeys } from "@/lib/services-journeys";

/* Static export: every slug must be prebuilt; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) return {};
  return {
    title: `${journey.title} — What to Expect`,
    description: `${journey.tagline} Walk through every step of ${journey.title.toLowerCase()} at Premier Eye Institute in Creedmoor, NC — and how long each part takes.`,
  };
}

export default async function ServiceStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) notFound();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            {journey.title.replace(/ ([^ ]+)$/, "")}{" "}
            <em className="italic text-accent">
              {journey.title.split(" ").at(-1)}
            </em>
          </>
        }
        lead={`${journey.tagline} Scroll to walk through your visit, step by step.`}
      />
      <ServiceScrollStory journey={journey} />
      <CtaBand />
    </>
  );
}
