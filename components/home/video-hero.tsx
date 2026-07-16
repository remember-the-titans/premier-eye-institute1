"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/base-path";
import { site } from "@/lib/site";

/* The homepage hero — normal-scroll, one instrument per section.

   The old version pinned for 700vh and scrubbed a morph frame-by-frame off
   the scrollbar. This version scrolls like any normal page: the three
   instruments stack vertically (1 → 2 → 3), and each plays its OWN short
   clip once, the moment it scrolls into view (IntersectionObserver + a
   time-based rAF) — scrolling only *triggers* the clip, it never drives the
   frames.

     · Eyewear   — the glasses, gently rotating (CSS).
     · Eye exams — the phoropter assembling (frames 0 → 61), on view.
     · Services  — the auto-refractor's shatter-and-reform (61 → 121), on view.

   The art stays frameless: mix-blend-mode: multiply melts each frame's white
   studio backdrop into the page. That blend + any transform must live on the
   drawing element itself (canvas / <img>); no ancestor may set transform,
   perspective, filter, opacity or z-index, or it makes a stacking context
   that isolates the blend and brings the white square back — so every wrapper
   here is plain. Reduced motion: no clips, no spin — each instrument shows its
   settled end pose, still. */

const FRAME_COUNT = 122;

const framePath = (i: number) =>
  withBasePath(`/hero-frames/frame_${String(i + 1).padStart(4, "0")}.webp`);

const ART_STYLE = {
  mixBlendMode: "multiply" as const,
  filter: "brightness(1.07)",
};

/* Plays frames `from`→`to` once whenever it scrolls into view (replays on
   re-entry, never mid-play). Draws the settled end frame as its resting
   state; under reduced motion it only ever shows that end frame. */
function FrameClip({
  from,
  to,
  durationMs = 2000,
  ariaLabel,
}: {
  from: number;
  to: number;
  durationMs?: number;
  ariaLabel: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Phones load every other frame; the end pose is always loaded exactly.
    const step = window.matchMedia("(max-width: 767px)").matches ? 2 : 1;

    const wanted: number[] = [];
    for (let i = from; i <= to; i += step) wanted.push(i);
    if (!wanted.includes(to)) wanted.push(to);

    const images = new Map<number, HTMLImageElement>();
    let disposed = false;
    let raf = 0;
    let animating = false;
    let endReady = false;
    let inView = false;
    let loadedCount = 0;

    const sizeCanvas = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    const nearest = (idx: number) => {
      if (images.has(idx)) return images.get(idx)!;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (images.has(idx - d)) return images.get(idx - d)!;
        if (images.has(idx + d)) return images.get(idx + d)!;
      }
      return null;
    };

    const draw = (idx: number) => {
      const img = nearest(idx);
      if (!img) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const play = () => {
      if (disposed || reduced || animating) return;
      animating = true;
      const start = performance.now();
      const tick = (now: number) => {
        if (disposed) return;
        const t = Math.min(1, (now - start) / durationMs);
        // ease-out so it settles softly onto the end pose
        const e = 1 - Math.pow(1 - t, 3);
        draw(Math.round(from + (to - from) * e));
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          animating = false;
        }
      };
      raf = requestAnimationFrame(tick);
    };

    /* Only play once BOTH conditions hold — in view and every frame decoded —
       so a fast scroll that reaches the clip before its frames are ready
       still gets the full animation (it fires the moment loading finishes),
       never a static end-pose. Replays on each re-entry. */
    const maybePlay = () => {
      if (inView && loadedCount === wanted.length) play();
    };

    for (const i of wanted) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = framePath(i);
      const done = () => {
        if (disposed) return;
        images.set(i, img);
        loadedCount++;
        if (i === to) {
          endReady = true;
          sizeCanvas();
          draw(to); // resting pose as soon as it's available
        }
        maybePlay();
      };
      img.decode().then(done, () => {
        if (img.complete && img.naturalWidth > 0) done();
        else img.addEventListener("load", done, { once: true });
      });
    }

    sizeCanvas();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          inView = e.isIntersecting;
          if (inView) maybePlay();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(canvas);

    const onResize = () => {
      sizeCanvas();
      if (endReady && !animating) draw(to);
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [from, to, durationMs]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={ariaLabel}
      className="absolute inset-0 h-full w-full"
      style={ART_STYLE}
    />
  );
}

type Beat = {
  eyebrow: string;
  title: string;
  copy: string;
  href: string;
  linkLabel: string;
};

function Caption({ beat }: { beat: Beat }) {
  return (
    <>
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[2.6px] text-accent-hover">
        {beat.eyebrow}
      </p>
      <h2 className="font-heading mt-2 text-2xl font-semibold text-ink transition-colors duration-200 group-hover/beat:text-accent">
        {beat.title}
      </h2>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-body-text">
        {beat.copy}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-tint px-4 py-1.5 text-[12.5px] font-semibold text-accent-hover">
        {beat.linkLabel}
        <ArrowRight
          className="size-3.5 transition-transform duration-200 ease-[var(--ease-out-strong)] group-hover/beat:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </>
  );
}

const STAGE = "relative aspect-square w-[min(80vw,360px)]";

export function VideoHero() {
  return (
    <section
      aria-label="Introduction"
      className="relative overflow-hidden px-5 pt-32 pb-24 text-center sm:px-8 sm:pt-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,var(--hero-wash)_0%,#ffffff_55%)]"
      />

      <HeroCopy />
      <HeroCta className="mt-9" />

      <div className="mx-auto mt-20 flex max-w-2xl flex-col items-center gap-28 sm:gap-36">
        {/* 1 · Eyewear — the glasses, gently rotating. */}
        <Link
          href="/eyewear"
          className="group/beat flex flex-col items-center"
        >
          <Image
            src={withBasePath("/hero-fallback/glasses.webp")}
            alt="A pair of black-framed glasses with a warm orange accent line"
            width={900}
            height={900}
            priority
            className="hero-spin w-[min(80vw,360px)]"
            style={ART_STYLE}
          />
          <Caption
            beat={{
              eyebrow: "01 · Eyewear",
              title: "Frames worth wearing",
              copy: "Browse the optical and find frames worth wearing.",
              href: "/eyewear",
              linkLabel: "Browse eyewear",
            }}
          />
        </Link>

        {/* 2 · Eye exams — the phoropter assembles when you reach it. */}
        <Link
          href="/services/eye-exams"
          className="group/beat flex flex-col items-center"
        >
          <div className={STAGE}>
            <FrameClip
              from={0}
              to={61}
              ariaLabel="A phoropter, the lens-switching instrument used during your exam, assembling into view"
            />
          </div>
          <Caption
            beat={{
              eyebrow: "02 · Eye exams",
              title: "Exams that take their time",
              copy: "See how a visit goes, step by step.",
              href: "/services/eye-exams",
              linkLabel: "See an eye exam",
            }}
          />
        </Link>

        {/* 3 · Services — the auto-refractor's shatter-and-reform, on view. */}
        <Link href="/services" className="group/beat flex flex-col items-center">
          <div className={STAGE}>
            <FrameClip
              from={61}
              to={121}
              durationMs={2400}
              ariaLabel="An auto-refractor imaging device forming from suspended parts"
            />
          </div>
          <Caption
            beat={{
              eyebrow: "03 · Services",
              title: "Everything your eyes need",
              copy: "Exams, contact lenses, and LASIK co-management.",
              href: "/services",
              linkLabel: "Browse services",
            }}
          />
        </Link>
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
        Eyecare{" "}
        <em className="italic text-accent">personalized for you</em>.
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
