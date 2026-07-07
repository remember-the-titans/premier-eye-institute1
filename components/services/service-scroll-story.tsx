"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { Clock, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { getLenis } from "@/components/site/smooth-scroll";
import { withBasePath } from "@/lib/base-path";
import { site } from "@/lib/site";
import type { JourneyScene, ServiceJourney } from "@/lib/services-journeys";

/* A scroll-scrubbed storybook: a tall runway with a sticky stage where
   flat-vector scenes cross-fade and drift as the visitor scrolls, each
   with a caption and an expected-time pill. Scene-based cousin of the
   homepage video-hero — same hold-zone thinking (captions only sit over
   settled art), but whole illustrations instead of canvas frames, driven
   by one GSAP ScrollTrigger timeline instead of a hand-rolled rAF lerp.

   The scrub value plays the role of the hero's frame LERP: the timeline
   glides toward the scroll position instead of snapping to it. Lenis
   animates native window scroll, so ScrollTrigger picks it up without
   extra wiring — and the stage must NOT get data-lenis-prevent (the page
   should keep scrolling normally through the story). */

/* Scroll budget per scene, in vh. The client likes a generous runway —
   err longer so every caption gets a long readable plateau. */
const VH_PER_SCENE = 130;
/* Extra runway after the last scene so its caption settles before the
   stage unpins into the closing card. */
const VH_TAIL = 70;

/* Half-width of the cross-fade between neighboring scenes, in scene
   units. Scene i fades out / scene i+1 fades in across
   [boundary - FADE, boundary + FADE]; everything between the fades is a
   hold where the art sits fully opaque under its caption. */
const FADE = 0.18;

/* Caption window inside each scene, in local scene units. Fully readable
   from CAP_IN_END to CAP_OUT_START — roughly half the scene's scroll
   budget at full opacity. */
const CAP_IN_START = 0.2;
const CAP_IN_END = 0.36;
const CAP_OUT_START = 0.8;
const CAP_OUT_END = 0.94;

/* Panel drift across a scene's window — subtle, composite-only. */
const DRIFT_PX = 24;
const DRIFT_SCALE = 1.04;

/* The art is 2432×1792 (≈4:3). Cap the panel by viewport width AND
   height so stage + caption always fit a 100dvh screen. */
const ART_W = 2432;
const ART_H = 1792;

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(callback: () => void) {
  const mql = window.matchMedia(MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getMotionPreference() {
  return window.matchMedia(MOTION_QUERY).matches;
}

function getServerMotionPreference(): boolean | null {
  return null;
}

/* Drift keyframes per scene.drift: where the panel enters from and exits
   to as its scroll window plays. */
function driftFrames(drift: JourneyScene["drift"]) {
  switch (drift) {
    case "left":
      return { fx: DRIFT_PX, fy: 0, tx: -DRIFT_PX, ty: 0 };
    case "right":
      return { fx: -DRIFT_PX, fy: 0, tx: DRIFT_PX, ty: 0 };
    case "up":
      return { fx: 0, fy: 18, tx: 0, ty: -18 };
    default:
      return { fx: 0, fy: 10, tx: 0, ty: -10 };
  }
}

/* If the crisp SVG ever fails, swap in the WebP raster once. */
function swapToFallback(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  const fallback = img.dataset.fallback;
  if (fallback && img.src !== fallback) img.src = fallback;
}

function sceneAlt(scene: JourneyScene) {
  return `Illustrated scene — ${scene.headline}`;
}

export function ServiceScrollStory({ journey }: { journey: ServiceJourney }) {
  const runwayRef = useRef<HTMLElement>(null);
  const artWrapRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const artEls = useRef<HTMLImageElement[]>([]);
  const ghostEls = useRef<HTMLSpanElement[]>([]);
  const capEls = useRef<HTMLDivElement[]>([]);
  const railEls = useRef<HTMLButtonElement[]>([]);
  const dotEls = useRef<HTMLButtonElement[]>([]);
  const reduced = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference
  );

  const scenes = journey.scenes;
  const sceneCount = scenes.length;

  useEffect(() => {
    if (reduced !== false) return;
    const runway = runwayRef.current;
    const artWrap = artWrapRef.current;
    if (!runway || !artWrap) return;

    gsap.registerPlugin(ScrollTrigger);
    let disposed = false;

    /* ---- Preload: decode every scene before lifting the veil. The SVGs
       are a few KB each so this is near-instant, but gating on decode()
       keeps the first scrub paint clean (mirrors the hero's loader). */
    const arts = artEls.current.slice(0, sceneCount);
    let settledCount = 0;
    const settle = () => {
      if (disposed) return;
      settledCount++;
      const bar = barRef.current;
      if (bar) bar.style.transform = `scaleX(${settledCount / arts.length})`;
      if (settledCount === arts.length && loaderRef.current) {
        loaderRef.current.style.opacity = "0";
      }
    };
    for (const img of arts) {
      img.decode().then(settle, () => {
        // decode() can reject even when the fetch succeeded; fall back to
        // load state / events (the onError swap handles a dead SVG).
        if (img.complete) settle();
        else {
          img.addEventListener("load", settle, { once: true });
          img.addEventListener("error", settle, { once: true });
        }
      });
    }

    /* ---- The scrubbed timeline: 1 timeline-second per scene, mapped by
       ScrollTrigger onto the whole runway. */
    let lastActive = -1;
    const paintRail = (idx: number) => {
      if (idx === lastActive) return;
      lastActive = idx;
      for (const store of [railEls.current, dotEls.current]) {
        store.forEach((el, i) => {
          if (el) el.setAttribute("data-active", String(i === idx));
        });
      }
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: runway,
          start: "top top",
          end: "bottom bottom",
          /* Seconds of glide toward the scroll target — the GSAP
             equivalent of the hero's frame lerp. */
          scrub: 0.85,
          onUpdate: (st) => {
            const idx = Math.min(
              sceneCount - 1,
              Math.max(0, Math.floor(st.progress * sceneCount))
            );
            paintRail(idx);
          },
        },
      });

      scenes.forEach((scene, i) => {
        const art = artEls.current[i];
        const ghost = ghostEls.current[i];
        const cap = capEls.current[i];
        if (!art || !cap) return;
        const fadeTargets = ghost ? [art, ghost] : [art];

        /* Cross-fade at the scene boundaries; scene 0 starts visible and
           the last scene stays up until the stage unpins. */
        if (i === 0) {
          gsap.set(fadeTargets, { autoAlpha: 1 });
        } else {
          tl.fromTo(
            fadeTargets,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: FADE * 2 },
            i - FADE
          );
        }
        if (i < sceneCount - 1) {
          tl.to(fadeTargets, { autoAlpha: 0, duration: FADE * 2 }, i + 1 - FADE);
        }

        /* The panel drifts and settles across its whole visible window. */
        const { fx, fy, tx, ty } = driftFrames(scene.drift);
        const from = i === 0 ? 0 : i - FADE;
        const to = i === sceneCount - 1 ? sceneCount : i + 1 + FADE;
        tl.fromTo(
          art,
          { x: fx, y: fy, scale: DRIFT_SCALE },
          { x: tx, y: ty, scale: 1, duration: to - from },
          from
        );
        if (ghost) {
          tl.fromTo(
            ghost,
            { y: 26 },
            { y: -26, duration: to - from },
            from
          );
        }

        /* Caption: fade up in, long full-opacity plateau over the hold,
           fade out before the next cross-fade begins. */
        tl.fromTo(
          cap,
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: CAP_IN_END - CAP_IN_START },
          i + CAP_IN_START
        );
        if (i < sceneCount - 1) {
          tl.to(
            cap,
            { autoAlpha: 0, y: -14, duration: CAP_OUT_END - CAP_OUT_START },
            i + CAP_OUT_START
          );
        }
      });
    }, runway);

    /* ---- Mouse-only parallax on the art stack (±10px, lerped). The
       wrapper is free to carry a transform — the panels are opaque
       cards, so there's no blend-isolation concern here. */
    const parX = gsap.quickTo(artWrap, "x", { duration: 0.6, ease: "power3" });
    const parY = gsap.quickTo(artWrap, "y", { duration: 0.6, ease: "power3" });
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      parX((e.clientX / window.innerWidth - 0.5) * 20);
      parY((e.clientY / window.innerHeight - 0.5) * 14);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      disposed = true;
      window.removeEventListener("pointermove", onPointer);
      ctx.revert();
    };
  }, [reduced, scenes, sceneCount]);

  const registerArt = (i: number) => (el: HTMLImageElement | null) => {
    if (el) artEls.current[i] = el;
  };
  const registerGhost = (i: number) => (el: HTMLSpanElement | null) => {
    if (el) ghostEls.current[i] = el;
  };
  const registerCap = (i: number) => (el: HTMLDivElement | null) => {
    if (el) capEls.current[i] = el;
  };
  const registerRail = (i: number) => (el: HTMLButtonElement | null) => {
    if (el) railEls.current[i] = el;
  };
  const registerDot = (i: number) => (el: HTMLButtonElement | null) => {
    if (el) dotEls.current[i] = el;
  };

  /* Progress-rail jump: land in the middle of scene i's hold zone. */
  const scrollToScene = (i: number) => {
    const runway = runwayRef.current;
    if (!runway) return;
    const top = runway.getBoundingClientRect().top + window.scrollY;
    const dist = runway.offsetHeight - window.innerHeight;
    const y = top + ((i + 0.55) / sceneCount) * dist;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  /* Reduced motion / SSR / no-JS: every scene in normal flow — static
     art, caption, and time pill. No pinning, no timeline. */
  if (reduced !== false) {
    return (
      <>
        <section
          aria-label={`${journey.title}: your visit, step by step`}
          className="mx-auto max-w-[820px] px-5 pb-8 sm:px-8"
        >
          <ol className="space-y-16 md:space-y-20">
            {scenes.map((scene, i) => (
              <li key={scene.id} className="flex flex-col items-center text-center">
                {/* eslint-disable-next-line @next/next/no-img-element -- static-export SVG art with a raster onError fallback; next/image adds nothing for vectors */}
                <img
                  src={withBasePath(scene.art)}
                  data-fallback={withBasePath(scene.artFallback)}
                  onError={swapToFallback}
                  alt={sceneAlt(scene)}
                  width={ART_W}
                  height={ART_H}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full max-w-[640px] rounded-lg border border-ink/[0.08] shadow-warm"
                />
                <div className="mt-7 max-w-[560px]">
                  <SceneCaption scene={scene} index={i} total={sceneCount} />
                </div>
              </li>
            ))}
          </ol>
        </section>
        <ClosingCard journey={journey} />
      </>
    );
  }

  return (
    <>
      <section
        ref={runwayRef}
        aria-label={`${journey.title}: your visit, step by step`}
        className="relative"
        style={{ height: `${sceneCount * VH_PER_SCENE + VH_TAIL}vh` }}
      >
        <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 pb-6 pt-24 sm:px-8">
          {/* Soft warm wash behind the stage, matching the page heroes. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_35%,var(--hero-wash)_0%,#ffffff_72%)]"
          />

          {/* Mobile step dots: the active one stretches into a pill. */}
          <div className="mb-5 flex items-center gap-2 lg:hidden" role="group" aria-label="Steps in this visit">
            {scenes.map((scene, i) => (
              <button
                key={scene.id}
                type="button"
                ref={registerDot(i)}
                data-active={i === 0}
                onClick={() => scrollToScene(i)}
                aria-label={`Go to step ${i + 1}: ${scene.headline}`}
                className="h-2.5 w-2.5 rounded-full bg-ink/15 transition-all duration-300 ease-[var(--ease-soft)] data-[active=true]:w-7 data-[active=true]:bg-accent"
              />
            ))}
          </div>

          {/* Desktop progress rail: numbered mini table of contents. */}
          <nav
            aria-label="Steps in this visit"
            className="absolute left-[clamp(16px,3vw,44px)] top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex"
          >
            {scenes.map((scene, i) => (
              <button
                key={scene.id}
                type="button"
                ref={registerRail(i)}
                data-active={i === 0}
                onClick={() => scrollToScene(i)}
                aria-label={`Go to step ${i + 1}: ${scene.headline}`}
                title={scene.headline}
                className="flex size-8 items-center justify-center rounded-full border border-ink/15 bg-white/80 text-[11px] font-semibold text-soft transition-colors duration-200 hover:border-accent hover:text-accent data-[active=true]:border-accent data-[active=true]:bg-accent data-[active=true]:text-white"
              >
                {i + 1}
              </button>
            ))}
          </nav>

          {/* The art stack: every panel absolutely stacked; the timeline
              cross-fades and drifts them. The wrapper carries the mouse
              parallax. */}
          <div
            ref={artWrapRef}
            className="relative aspect-[2432/1792] w-[min(92vw,700px,63vh)] will-change-transform"
          >
            {scenes.map((scene, i) => (
              <span key={scene.id} className="contents">
                {/* Oversized ghost step number peeking from behind the panel. */}
                <span
                  ref={registerGhost(i)}
                  aria-hidden="true"
                  style={{ opacity: 0, visibility: "hidden" }}
                  className="font-heading absolute -left-16 -top-16 z-0 hidden select-none text-[clamp(90px,10vw,150px)] italic leading-none text-accent/[0.13] will-change-transform lg:block"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element -- static-export SVG art with a raster onError fallback; next/image adds nothing for vectors */}
                <img
                  ref={registerArt(i)}
                  src={withBasePath(scene.art)}
                  data-fallback={withBasePath(scene.artFallback)}
                  onError={swapToFallback}
                  alt={sceneAlt(scene)}
                  width={ART_W}
                  height={ART_H}
                  loading="eager"
                  decoding="async"
                  style={{ opacity: 0, visibility: "hidden" }}
                  className="absolute inset-0 z-10 h-full w-full rounded-lg border border-ink/[0.08] shadow-warm-lg will-change-[opacity,transform]"
                />
              </span>
            ))}

            {/* Preload veil: fades out once every scene has decoded. */}
            <div
              ref={loaderRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 transition-opacity duration-500"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#b3a99f]">
                Loading…
              </span>
              <span className="h-[2px] w-[140px] overflow-hidden rounded-full bg-[#eadfd6]">
                <span
                  ref={barRef}
                  className="block h-full w-full origin-left scale-x-0 rounded-full bg-accent"
                />
              </span>
            </div>
          </div>

          {/* Caption stage: one block per scene, cross-faded in the lower
              third over generous negative space. */}
          <div className="relative mt-6 h-[230px] w-full max-w-[560px] sm:h-[200px] sm:mt-8">
            {scenes.map((scene, i) => (
              <div
                key={scene.id}
                ref={registerCap(i)}
                style={{ opacity: 0, visibility: "hidden" }}
                className="absolute inset-x-0 top-0 flex flex-col items-center text-center will-change-[opacity,transform]"
              >
                <SceneCaption scene={scene} index={i} total={sceneCount} />
              </div>
            ))}
          </div>
        </div>

        {/* Screen-reader narrative: the full story without the scrub. */}
        <div className="sr-only">
          {scenes.map((scene, i) => (
            <p key={scene.id}>
              Step {i + 1}: {scene.headline}. {scene.body} Expected time:{" "}
              {scene.duration}.
            </p>
          ))}
        </div>
      </section>

      <ClosingCard journey={journey} />
    </>
  );
}

function SceneCaption({
  scene,
  index,
  total,
}: {
  scene: JourneyScene;
  index: number;
  total: number;
}) {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[2.6px] text-accent-hover">
        Step {index + 1} of {total}
      </p>
      <h2 className="font-heading mt-2 text-[clamp(24px,3vw,34px)] font-medium leading-tight tracking-[-0.4px] text-ink">
        {scene.headline}
      </h2>
      <p className="mt-2 max-w-[520px] text-[14.5px] leading-relaxed text-body-text">
        {scene.body}
      </p>
      <span className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-accent-tint px-3.5 py-1.5 text-[12.5px] font-semibold text-accent-hover">
        <Clock className="size-3.5" aria-hidden="true" />
        {scene.duration}
      </span>
    </>
  );
}

/* Total-time summary + booking CTA, shared by both story layouts. */
function ClosingCard({ journey }: { journey: ServiceJourney }) {
  return (
    <section className="mx-auto max-w-[760px] px-5 pb-24 pt-10 text-center sm:px-8 md:pb-32">
      <p className="eyebrow eyebrow-centered mb-4 justify-center">
        The whole visit
      </p>
      <h2 className="font-heading text-[clamp(26px,3.6vw,42px)] font-medium leading-[1.15] tracking-[-0.4px] text-ink">
        <em className="italic text-accent">{journey.totalTime}</em>
      </h2>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
        <Button asChild variant="pill" size="pill">
          <Link href={journey.cta.href}>{journey.cta.label}</Link>
        </Button>
        <Button asChild variant="pill-outline" size="pill">
          <a href={site.phoneHref}>
            <Phone className="size-4 text-accent" aria-hidden="true" />
            {site.phoneDisplay}
          </a>
        </Button>
      </div>
    </section>
  );
}
