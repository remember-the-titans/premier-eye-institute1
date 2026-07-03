import { Reveal } from "@/components/motion/reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-36 md:pb-20 md:pt-44">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_0%,var(--hero-wash)_0%,#ffffff_70%)]"
      />
      <div className="mx-auto max-w-[1000px] px-5 text-center sm:px-8">
        <Reveal y={18}>
          <p className="eyebrow eyebrow-centered mb-4 justify-center">
            {eyebrow}
          </p>
          <h1 className="font-heading text-[clamp(36px,5.5vw,66px)] font-medium leading-[1.05] tracking-[-0.5px] text-ink">
            {title}
          </h1>
          {lead && (
            <p className="mx-auto mt-5 max-w-[620px] text-[clamp(15px,1.5vw,18px)] leading-[1.6] text-body-text">
              {lead}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
