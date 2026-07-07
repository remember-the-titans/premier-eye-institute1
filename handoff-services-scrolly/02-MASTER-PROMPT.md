# Master Prompt for Claude Code — Services Scroll-Story Feature

Copy everything inside the fenced block below into Claude Code, run from the repo root of
`premier-eye-institute`. The three companion files referenced (`01-SCROLLY-SCRIPTS.md`,
`services-journeys.ts`, `03-ASSET-MANIFEST.md`) live in `handoff-services-scrolly/` at the
repo root.

---

```
You are working in the premier-eye-institute Next.js repo. Read CONTEXT.md and AGENTS.md
first — this is Next.js 16 with breaking changes, Tailwind v4, TypeScript, Framer Motion,
and a global Lenis smooth-scroll. Match every existing convention. Before using any
unfamiliar Next 16 API, read the relevant guide in node_modules/next/dist/docs/.

## GOAL

Build a "service scroll-story" feature. On /services, clicking a service opens a dedicated
page (e.g. /services/eye-exams) that plays a cartoon, scroll-driven walkthrough of that
service: as the visitor scrolls, flat vector cartoon scenes cross-fade and drift while
short captions and an expected-time pill fade in for each step of the visit. It must feel
buttery smooth, never buffer, and be easy to read. The look and motion are already decided:
flat vector cartoon SVGs (in the brand palette) animated purely by scroll — no video.

## INPUTS ALREADY PREPARED (in handoff-services-scrolly/)

1. services-journeys.ts — the data (scenes, captions, ⏱ PLACEHOLDER durations, art paths).
   Copy it to lib/services-journeys.ts.
2. 03-ASSET-MANIFEST.md — contains a bash script that downloads all 17 cartoon SVG+WebP
   scenes into public/services-art/<service>/. Run that script first so the art exists.
3. 01-SCROLLY-SCRIPTS.md — the human-readable storyboard, for reference only.

## STEP 0 — ASSETS

Run the download script in 03-ASSET-MANIFEST.md from the repo root. Confirm every file in
lib/services-journeys.ts's `art`/`artFallback` paths now exists under public/services-art/.
Optionally run `npx svgo -f public/services-art -r` to shrink the SVGs. Note: raw asset
srcs in this repo must go through withBasePath() from lib/base-path.ts (GitHub Pages base
path) — do that wherever you reference these files.

## STEP 1 — DATA

Copy services-journeys.ts to lib/services-journeys.ts. Do not invent or change any duration
string — they are deliberate ⏱ PLACEHOLDER values the client will confirm. Keep slugs in
sync with lib/site.ts `services` (eye-exams, contact-lenses, lasik).

## STEP 2 — ROUTING (dynamic, static-exported)

Create app/services/[slug]/page.tsx as a Server Component:
- export async function generateStaticParams() returning the 3 slugs from `journeys`.
- export const dynamicParams = false;  (this repo uses output: "export" — every param must
  be prebuilt).
- export async function generateMetadata({ params }) with a per-service <title>/description.
- The page reads the slug, looks up getJourney(slug); if missing, call notFound().
- It renders a small intro hero (reuse PageHero or match its styling: eyebrow "Services",
  the service title, the journey.tagline as the lead) then the client scroll-story
  component <ServiceScrollStory journey={journey} />, then the shared <CtaBand />.
- Keep /services (the listing) as-is structurally, but update the cards (next step).

## STEP 3 — LINK THE LISTING TO THE STORIES

On the /services listing page and the homepage Services teaser (components/home/services.tsx),
change each service card's link so it goes to /services/[slug] (the new story page) instead
of the /services#slug anchor. Add a subtle affordance to each card that signals motion —
e.g. a small "Watch the visit" / "See how it works" label with an arrow that appears on
hover/focus, using the existing pill/label styling. Do not restyle the cards otherwise.

## STEP 4 — THE SCROLL-STORY COMPONENT (the core)

Create components/services/service-scroll-story.tsx as a Client Component ("use client").
This is scene-based scroll animation (discrete illustrations that cross-fade), NOT a video
scrubber. Model it on the proven pattern in components/home/video-hero.tsx (persistent
requestAnimationFrame loop + refs + lerp + hold zones), but simpler because scenes are
whole images, not frames.

Structure:
- A tall "runway" wrapper whose height = (scenes.length + ~0.6) * 100vh (tune for reading
  pace; the client likes GENEROUS scroll per beat — err longer, see CONTEXT.md).
- Inside, a position: sticky; top: 0; height: 100vh "stage" that stays pinned while the
  runway scrolls past it.
- The stage holds:
  (a) The art layer: all scene <img> elements absolutely stacked; only the active and the
      next scene are non-transparent (opacity driven by scroll). Use the SVG via
      withBasePath(scene.art) with the .webp as a graceful fallback (<img onError> swap, or
      <picture>). width/height set from the 4:3 art (e.g. 1024x768) to avoid layout shift.
  (b) The caption card: headline + body + a "time pill" (small rounded pill, accent-tint
      background, accent text, a clock icon from lucide-react, showing scene.duration).
  (c) A progress rail: one small dot/segment per scene down the side (or a thin top bar),
      the active one filled with accent — so people can see how far through the visit they
      are, and it doubles as a mini table of contents.

Scroll → state mapping:
- Compute a single scroll progress p in [0,1] across the runway (element top relative to
  viewport / scrollable distance). Derive a floating "scenePos" = p * (scenes.length).
- activeIndex = clamp(round-ish of scenePos). Cross-fade: for the boundary between scene i
  and i+1, fade i out and i+1 in over a short window, with a HOLD zone in the middle of
  each scene where it sits at full opacity and the caption is fully readable (mirror the
  hero's CAPTION_FADE / hold-zone idea so text never sits over a mid-transition frame).
- Apply a small parallax drift + scale to the active art based on its local progress, using
  scene.drift (left/right/center/up) — transform: translate3d + scale only. Keep it subtle
  (e.g. ≤ 24px drift, ≤ 1.04 scale). Optional mouse parallax (±10px), mouse-only, lerped.
- Caption opacity follows the same hold zone (fade in at scene start, hold, fade out before
  the next). Keep the caption in the lower third, over generous negative space.

Performance / "no buffering, no jank" rules (REQUIRED):
- Preload: on mount, create Image() objects (or rely on the fact SVGs are tiny) and
  img.decode() every scene before enabling the scroll effect, behind a thin loader veil
  (match the hero's "Loading…" + hairline accent bar). SVGs are only a few KB each, so this
  is near-instant, but still gate the reveal on decode so the first paint is clean.
- One persistent requestAnimationFrame loop. Read scroll position from Lenis if convenient,
  or a passive scroll listener writing to a ref; do the visual work in the rAF loop, never
  in the scroll handler. Lerp the animated values toward targets for smoothness
  (e.g. current += (target - current) * 0.12).
- Only mutate style/opacity/transform via refs in the rAF loop. Do NOT setState per frame.
  (This repo runs React 19 compiler lint rules — react-hooks/immutability,
  react-hooks/refs, react-hooks/set-state-in-effect. Build mutable animation values in
  useRef, mutate through ref.current, and add narrowly-scoped eslint-disable comments only
  where genuinely needed, as done in components/eyewear/.)
- Composite-only animation: animate opacity and transform exclusively. Add
  will-change: opacity, transform to the animated layers. No animating width/height/top/left,
  no box-shadow transitions during scroll, no filters that re-raster each frame.
- Respect Lenis: the stage should let Lenis drive the page scroll normally (do NOT add
  data-lenis-prevent here — that's only for widgets that need their own wheel handling; the
  story wants the page to keep scrolling).
- Cap devicePixelRatio work; images are vector so this is cheap. Avoid re-decoding on
  resize.

Reduced motion (REQUIRED): if window.matchMedia('(prefers-reduced-motion: reduce)')
matches, render a plain, non-pinned vertical layout — each scene's static art followed by
its caption and time pill, in normal document flow, no sticky, no rAF, no cross-fade. This
mirrors how video-hero handles reduced motion. Also render this static version as the SSR
/ no-JS fallback so content is always present for SEO and slow devices.

Accessibility:
- Each scene img needs a meaningful alt describing the scene (derive from headline + body).
- Captions are real text in the DOM (not baked into art), so they're selectable and
  screen-reader friendly.
- The progress rail items should be buttons/links that jump (smooth-scroll via Lenis) to
  that scene's portion of the runway, with aria-labels; keyboard focusable.
- Ensure the "time pill" text meets contrast (use accent-hover #C9481E for the small text
  per the repo's AA note in CONTEXT.md).
- End the runway with a closing card: journey.totalTime summary + a primary pill Button
  linking to journey.cta.href ("Book…"), plus the phone option matching /services.

## STEP 5 — STYLING

Use the existing tokens only (globals.css): --accent #E7592A, --accent-hover, --accent-tint,
--ink, --text-body, radii, --shadow-warm, --ease-soft / --ease-out-strong, .press on CTAs,
Newsreader for headings / Manrope for body. No new colors, no bounce easing, no cards-in-
cards. All CTAs go through the shadcn Button variants (pill / pill-outline). Mobile-first:
most visitors are on phones — verify the pinned stage, caption, and time pill are legible
and well-sized on a ~375px viewport, and that the 4:3 art is centered with no overflow.

## STEP 6 — VERIFY (do all of these)

- npm run build passes (all routes static, including the 3 new /services/[slug] pages).
- npx eslint app components lib is clean (mind the React 19 rules above).
- Preview and scroll each of the 3 story pages: scenes cross-fade smoothly, captions and
  time pills are readable, nothing janks or pops, the progress rail tracks correctly, and
  the closing CTA works.
- Toggle prefers-reduced-motion and confirm the static fallback renders all scenes+captions.
- Throttle to a slow connection in devtools and confirm no buffering/flash (SVGs should be
  cached and decoded before the effect enables).
- Confirm /services and the homepage teaser now deep-link into the story pages.
- Take screenshots on desktop and a ~375px mobile viewport for a couple of scenes and
  confirm layout.
- Do NOT alter any ⏱ PLACEHOLDER duration text.

## OUT OF SCOPE / LEAVE ALONE
- Don't touch the /eyewear fitting room, the homepage video-hero, or lib/site.ts business
  facts. Don't change the deploy scripts. Don't commit .mcp.json.
```

---

## Why this approach meets the "smooth, no buffering" bar

- **Vector SVG scenes** are a few KB each and decode instantly, so there is nothing to
  buffer — unlike video, which was already removed from the hero for stuttering
  (see CONTEXT.md). The whole set is smaller than a single short video clip.
- **Scene cross-fades over a pinned stage** animate only `opacity` and `transform`, which
  the browser composites on the GPU. That is the smoothest class of web animation.
- **One rAF loop + lerp + refs** (the pattern already proven in `video-hero.tsx`) avoids
  per-frame React renders and layout thrash, which is what usually causes scroll jank.
- **Decode-before-reveal + Lenis** gives the same silky scroll the rest of the site has.
- **Reduced-motion + SSR static fallback** means the content is always readable, even with
  no JS or motion sensitivity.

## If you later want richer in-scene motion

Keep this scene-based system and add subtle per-element life to individual SVGs (e.g. a
gentle float on the eye-drop, a blink) with CSS keyframes scoped inside the SVG, or a light
Framer Motion layer — still opacity/transform only. Avoid converting to video; it would
reintroduce the buffering the client explicitly wants to avoid.
