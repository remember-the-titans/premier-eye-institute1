# Services Scroll-Story — Handoff Package

Everything Claude Code needs to build a cartoon, scroll-driven walkthrough for each of the
three Premier Eye Institute services. Clicking a service on `/services` opens a dedicated
page where flat vector cartoon scenes cross-fade and drift as you scroll, with a caption
and an expected-time pill for each step of the visit.

## What's decided

- **Look:** flat vector cartoon, brand palette (orange `#E7592A`, cream, warm ink, white).
- **Motion:** scroll-driven vector scenes (no video) — zero buffering, buttery smooth.
- **Entry:** a dedicated page per service, e.g. `/services/eye-exams`.
- **Times:** every duration is an editable **⏱ PLACEHOLDER** to confirm with the clinic.

## Files in this folder

1. **02-MASTER-PROMPT.md** — paste the fenced block into Claude Code. This is the build.
2. **services-journeys.ts** — the data (scenes, captions, durations, art paths). Copy to
   `lib/services-journeys.ts`.
3. **03-ASSET-MANIFEST.md** — a bash script that downloads all 17 generated cartoon scenes
   (SVG + WebP) into `public/services-art/`. Run it before building.
4. **01-SCROLLY-SCRIPTS.md** — the full storyboard/scripts (scene-by-scene visuals,
   captions, and timings). Reference for humans; also where to regenerate a scene if needed.

## Order of operations

1. Confirm the ⏱ PLACEHOLDER times with the clinic and edit `services-journeys.ts`.
2. In Claude Code: run the asset download script (from `03-ASSET-MANIFEST.md`).
3. In Claude Code: paste the master prompt and let it build + verify.

## The 17 cartoon scenes (already generated)

- **Eye & Vision Exams (5):** welcome, pre-testing, the exam, dilation, review.
- **Contact Lens Exams & Fittings (7):** lifestyle chat, measuring, lens types, trial
  lenses, fit check, training, order & follow-up.
- **LASIK Co-Management (5):** candidacy, measurements, meet the surgeon, surgery day,
  follow-up care.

All were generated with Higgsfield (Recraft V4.1 vector) in one consistent style and your
exact brand colors. They live on Higgsfield's CDN; the manifest script pulls them local.
