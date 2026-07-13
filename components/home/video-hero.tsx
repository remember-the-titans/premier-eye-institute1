import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/base-path";
import { site } from "@/lib/site";

/* The homepage hero — reworked away from the scroll-scrubbed morph.

   The page now scrolls like any normal site. Instead of one instrument
   morphing into the next as you drag the scrollbar, the three instruments
   stand on their own and each drifts gently and independently (its own
   duration + delay, so they never move in sync), playing by themselves with
   no scroll input. Each one is a shortcut into the site.

   The art still floats frameless: `mix-blend-mode: multiply` dissolves each
   still's white studio backdrop into the page. That blend must live on the
   <img> itself and no ancestor may set transform / opacity / filter / z-index
   (any of those makes a stacking context that isolates the blend and brings
   the white square back) — so the float animation lives on the image element,
   and the surrounding <Link> is a plain flex container.

   All motion is `motion-safe`, so reduced-motion visitors get the same three
   instruments, just still. No canvas, no rAF, no scroll listeners — this is a
   plain, mostly-static section (great for SSR / no-JS / SEO). */

const ART_STYLE = {
  mixBlendMode: "multiply" as const,
  /* lift the studio backdrop past pure white so multiply dissolves it */
  filter: "brightness(1.07)",
};

type Instrument = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  copy: string;
  href: string;
  linkLabel: string;
  /* Independent float timing — distinct durations + delays keep the three
     from ever bobbing in unison. */
  dur: string;
  delay: string;
};

const INSTRUMENTS: Instrument[] = [
  {
    src: "/hero-fallback/glasses.webp",
    alt: "A pair of black-framed glasses with a warm orange accent line",
    eyebrow: "Eyewear",
    title: "Frames worth wearing",
    copy: "Browse the optical, then try frames on with your camera.",
    href: "/eyewear",
    linkLabel: "Try them on",
    dur: "6s",
    delay: "0s",
  },
  {
    src: "/hero-fallback/phoropter.webp",
    alt: "A phoropter, the lens-switching instrument used during your exam",
    eyebrow: "Eye exams",
    title: "Exams that take their time",
    copy: "See how a visit goes, step by step.",
    href: "/services/eye-exams",
    linkLabel: "See an eye exam",
    dur: "7.2s",
    delay: "0.8s",
  },
  {
    src: "/hero-fallback/autorefractor.webp",
    alt: "An auto-refractor imaging device with a softly glowing lens",
    eyebrow: "Services",
    title: "Everything your eyes need",
    copy: "Exams, contact lenses, and LASIK co-management.",
    href: "/services",
    linkLabel: "Browse services",
    dur: "6.6s",
    delay: "1.6s",
  },
];

/* Staggered entrance for the caption text (not the blended image). */
const ENTER_DELAY = ["220ms", "360ms", "500ms"];

export function VideoHero() {
  return (
    <section
      aria-label="Introduction"
      className="relative overflow-hidden px-5 pb-16 pt-32 text-center sm:px-8 sm:pb-24 sm:pt-36"
    >
      {/* Warm wash behind everything — the backdrop the multiply blend melts
          each instrument's white studio square into. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_0%,var(--hero-wash)_0%,#ffffff_62%)]"
      />

      <HeroCopy />
      <HeroCta className="mt-9" />

      <div className="mx-auto mt-16 grid max-w-5xl gap-x-6 gap-y-16 sm:mt-20 sm:grid-cols-3">
        {INSTRUMENTS.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="group/beat flex flex-col items-center"
          >
            {/* Float + blend both on the <img> itself (via ART_STYLE + the
                .hero-float class); the CSS vars set this instrument's own
                tempo. No transform on the <Link> wrapper, so the blend is
                never isolated. */}
            <Image
              src={withBasePath(item.src)}
              alt={item.alt}
              width={900}
              height={900}
              /* All three sit in the hero — load eagerly so none pops in. */
              priority
              className="hero-float aspect-square w-[min(64vw,260px)]"
              style={
                {
                  ...ART_STYLE,
                  "--bob-dur": item.dur,
                  "--bob-delay": item.delay,
                } as React.CSSProperties
              }
            />
            <p
              className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 fill-mode-both mt-2 text-[11px] font-semibold uppercase tracking-[2.6px] text-accent-hover duration-700"
              style={{ animationDelay: ENTER_DELAY[i] }}
            >
              {item.eyebrow}
            </p>
            <h2 className="font-heading mt-2 text-xl font-semibold text-ink transition-colors duration-200 group-hover/beat:text-accent">
              {item.title}
            </h2>
            <p className="mt-1.5 max-w-xs text-[14px] leading-relaxed text-body-text">
              {item.copy}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-tint px-4 py-1.5 text-[12.5px] font-semibold text-accent-hover">
              {item.linkLabel}
              <ArrowRight
                className="size-3.5 transition-transform duration-200 ease-[var(--ease-out-strong)] group-hover/beat:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function HeroCopy() {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center">
      <p className="eyebrow eyebrow-centered motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 fill-mode-both duration-700 [animation-delay:100ms]">
        {site.tagline}
      </p>
      <h1 className="font-heading motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-5 mt-4 text-[clamp(38px,5.6vw,72px)] font-medium leading-[1.02] tracking-[-0.5px] text-ink fill-mode-both duration-1000 [animation-delay:220ms]">
        Eye care that{" "}
        <em className="italic text-accent">isn&apos;t rushed</em>.
      </h1>
      <p className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 mt-4 max-w-[500px] text-[clamp(15px,1.5vw,17px)] leading-relaxed text-body-text fill-mode-both duration-1000 [animation-delay:340ms]">
        Thorough exams, honest advice, and glasses you&apos;ll actually like.
      </p>
    </div>
  );
}

function HeroCta({ className = "" }: { className?: string }) {
  return (
    <div
      className={`motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 flex flex-wrap items-center justify-center gap-3 fill-mode-both duration-1000 [animation-delay:480ms] ${className}`}
    >
      <Button asChild variant="pill" size="pill">
        <Link href="/book">Book an Appointment</Link>
      </Button>
      <Button asChild variant="pill-outline" size="pill">
        <a href={site.phoneHref}>{site.phoneDisplay}</a>
      </Button>
    </div>
  );
}
