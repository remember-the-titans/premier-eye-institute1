# Cartoon Scene Asset Manifest

17 flat vector cartoon scenes were generated with Higgsfield (Recraft V4.1, vector mode),
all in the Premier Eye Institute brand palette (orange `#E7592A`, cream, warm ink, white),
4:3, 2K. Each has a crisp **SVG** (preferred for web — infinitely scalable, tiny, zero
buffering) and a **WebP** raster fallback.

The links below are on Higgsfield's CDN. The sandbox that generated them can't download
them, but **Claude Code running on your machine can.** Run the script in the next section
from the repo root; it saves every file into `public/services-art/<service>/` with the
exact filenames the data file (`lib/services-journeys.ts`) expects.

> If a link ever expires before you run the script, re-open the generations in Higgsfield
> and re-copy the URLs, or regenerate from the prompts in `01-SCROLLY-SCRIPTS.md`.

## Download script (run from repo root)

```bash
#!/usr/bin/env bash
set -euo pipefail
BASE="https://d8j0ntlcm91z4.cloudfront.net/user_3Dit3YSBw9htqWUZOEoEViwzsHK"

mkdir -p public/services-art/eye-exams public/services-art/contact-lenses public/services-art/lasik

# fetch <svg-file> <webp-file> <dest-without-extension>
fetch () {
  curl -fsSL "$BASE/$1" -o "$3.svg"
  curl -fsSL "$BASE/$2" -o "$3.webp"
  echo "saved $3.{svg,webp}"
}

# --- Eye & Vision Exams ---
fetch "hf_20260707_030959_9d730bb0-20f0-4109-bca4-be890efa3b76.svg"      "hf_20260707_030959_9d730bb0-20f0-4109-bca4-be890efa3b76_min.webp"      public/services-art/eye-exams/e1-welcome
fetch "hf_20260707_031002_83960523-4d40-464e-9a93-2227baae6d95.svg"      "hf_20260707_031002_83960523-4d40-464e-9a93-2227baae6d95_min.webp"      public/services-art/eye-exams/e2-pretest
fetch "hf_20260707_030641_66f4b831-c768-4dba-8720-76c35b626a4e.svg"      "hf_20260707_030641_66f4b831-c768-4dba-8720-76c35b626a4e_min.webp"      public/services-art/eye-exams/e3-exam
fetch "hf_20260707_031005_0b6aa02f-289d-45f2-a18c-479b146cac13.svg"      "hf_20260707_031005_0b6aa02f-289d-45f2-a18c-479b146cac13_min.webp"      public/services-art/eye-exams/e4-dilation
fetch "hf_20260707_031008_ca52161f-1e20-4945-86f5-c5fe76b720c3.svg"      "hf_20260707_031008_ca52161f-1e20-4945-86f5-c5fe76b720c3_min.webp"      public/services-art/eye-exams/e5-review

# --- Contact Lens Exams & Fittings ---
fetch "hf_20260707_030645_24549016-62e4-4e11-ae6c-963e5640d614.svg"      "hf_20260707_030645_24549016-62e4-4e11-ae6c-963e5640d614_min.webp"      public/services-art/contact-lenses/c1-lifestyle
fetch "hf_20260707_031012_d4e564d8-5ee1-467d-add8-07a82ff69528.svg"      "hf_20260707_031012_d4e564d8-5ee1-467d-add8-07a82ff69528_min.webp"      public/services-art/contact-lenses/c2-measure
fetch "hf_20260707_031016_89c7a186-ce4d-4a24-879e-bf9dc103e2b0.svg"      "hf_20260707_031016_89c7a186-ce4d-4a24-879e-bf9dc103e2b0_min.webp"      public/services-art/contact-lenses/c3-types
fetch "hf_20260707_031018_ab532d04-6d5c-4ed5-8b94-694627346c99.svg"      "hf_20260707_031018_ab532d04-6d5c-4ed5-8b94-694627346c99_min.webp"      public/services-art/contact-lenses/c4-trial
fetch "hf_20260707_031021_28fdd205-154c-4dd3-b354-81a0bac05946.svg"      "hf_20260707_031021_28fdd205-154c-4dd3-b354-81a0bac05946_min.webp"      public/services-art/contact-lenses/c5-fit
fetch "hf_20260707_031024_8eee1ffd-0529-4c60-82f9-ca171eefab92.svg"      "hf_20260707_031024_8eee1ffd-0529-4c60-82f9-ca171eefab92_min.webp"      public/services-art/contact-lenses/c6-training
fetch "hf_20260707_031028_27e6d125-60d4-4d14-85b6-6c57e8aa6567.svg"      "hf_20260707_031028_27e6d125-60d4-4d14-85b6-6c57e8aa6567_min.webp"      public/services-art/contact-lenses/c7-order

# --- LASIK Co-Management ---
fetch "hf_20260707_031030_b867721a-cbec-423a-826e-4839c001bde6.svg"      "hf_20260707_031030_b867721a-cbec-423a-826e-4839c001bde6_min.webp"      public/services-art/lasik/l1-candidacy
fetch "hf_20260707_031033_0386df8d-1b8a-4a17-a35c-206e1dcff127.svg"      "hf_20260707_031033_0386df8d-1b8a-4a17-a35c-206e1dcff127_min.webp"      public/services-art/lasik/l2-measurements
fetch "hf_20260707_031037_ee5af19a-b629-4578-b04f-7121bb9d8dd7.svg"      "hf_20260707_031037_ee5af19a-b629-4578-b04f-7121bb9d8dd7_min.webp"      public/services-art/lasik/l3-surgeon
fetch "hf_20260707_031039_c6be12ec-8a8a-47af-b093-6fb55389bc7b.svg"      "hf_20260707_031039_c6be12ec-8a8a-47af-b093-6fb55389bc7b_min.webp"      public/services-art/lasik/l4-surgery
fetch "hf_20260707_030648_03186441-b877-4e87-acfe-1220f90867ef.svg"      "hf_20260707_030648_03186441-b877-4e87-acfe-1220f90867ef_min.webp"      public/services-art/lasik/l5-followup

echo "All 17 scenes saved to public/services-art/"
```

## Scene index (for reference)

| Service | Scene id | Higgsfield job id |
|---|---|---|
| Eye Exams | e1-welcome | 9d730bb0-20f0-4109-bca4-be890efa3b76 |
| Eye Exams | e2-pretest | 83960523-4d40-464e-9a93-2227baae6d95 |
| Eye Exams | e3-exam | 66f4b831-c768-4dba-8720-76c35b626a4e |
| Eye Exams | e4-dilation | 0b6aa02f-289d-45f2-a18c-479b146cac13 |
| Eye Exams | e5-review | ca52161f-1e20-4945-86f5-c5fe76b720c3 |
| Contacts | c1-lifestyle | 24549016-62e4-4e11-ae6c-963e5640d614 |
| Contacts | c2-measure | d4e564d8-5ee1-467d-add8-07a82ff69528 |
| Contacts | c3-types | 89c7a186-ce4d-4a24-879e-bf9dc103e2b0 |
| Contacts | c4-trial | ab532d04-6d5c-4ed5-8b94-694627346c99 |
| Contacts | c5-fit | 28fdd205-154c-4dd3-b354-81a0bac05946 |
| Contacts | c6-training | 8eee1ffd-0529-4c60-82f9-ca171eefab92 |
| Contacts | c7-order | 27e6d125-60d4-4d14-85b6-6c57e8aa6567 |
| LASIK | l1-candidacy | b867721a-cbec-423a-826e-4839c001bde6 |
| LASIK | l2-measurements | 0386df8d-1b8a-4a17-a35c-206e1dcff127 |
| LASIK | l3-surgeon | ee5af19a-b629-4578-b04f-7121bb9d8dd7 |
| LASIK | l4-surgery | c6be12ec-8a8a-47af-b093-6fb55389bc7b |
| LASIK | l5-followup | 03186441-b877-4e87-acfe-1220f90867ef |

## Notes on the art

- **SVG is the primary asset.** It stays razor-sharp at any size and is a few KB, so the
  scroll stage never waits on a download. The WebP is only a fallback for the rare case an
  SVG fails to load.
- All scenes share one visual language (same friendly characters, palette, flat style), so
  they read as one connected story per service.
- If any single scene feels off, regenerate just that one with its prompt in
  `01-SCROLLY-SCRIPTS.md` plus the shared style preamble, and drop the new file in place.
- Optional polish: run the SVGs through `svgo` to shrink them further before committing.
