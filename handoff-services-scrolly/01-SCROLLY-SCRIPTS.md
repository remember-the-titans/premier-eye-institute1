# Services Scroll-Story Scripts

Cartoon scroll-scrubbed animations for the three Premier Eye Institute services. One
dedicated page per service. As the visitor scrolls, a Lottie cartoon animation scrubs
forward and short captions fade in over it, walking them through the visit step by step
and showing roughly how long each part takes.

> **About the times:** every duration below is an **editable placeholder** based on
> typical optometry visits. They are NOT confirmed clinic facts yet. Find every
> `⏱ PLACEHOLDER` marker, confirm the real number with Dr. Mehta's office, then update
> the single source of truth (`lib/services-journeys.ts`). Do not ship real-looking
> times until they are confirmed.

---

## How the scroll story works (same pattern for all 3 pages)

1. The visitor clicks a service card on `/services`.
2. They land on a dedicated page, for example `/services/eye-exams`.
3. A short intro hero sits at the top. Below it, the page becomes a tall "scroll runway".
4. A single cartoon animation is pinned to the screen. As the visitor scrolls, the
   animation scrubs forward frame by frame, in sync with the scroll position. It never
   auto-plays and never buffers, because it is a lightweight vector animation, not a video.
5. Each scene has a caption block. The caption fades in, holds while the visitor reads,
   then fades out as the next scene scrubs in.
6. A small "time pill" shows the expected duration for that step, so people always know
   how long that part takes.
7. At the end, a total-time summary and a "Book this service" button.

Design language to match the existing site: warm white background, orange accent
`#E7592A`, soft rounded shapes, friendly flat cartoon style, calm easing. No bounce, no
purple gradients, no harsh edges. Respect `prefers-reduced-motion` (show static frames
plus captions instead of scrubbing).

---

## Service 1 — Eye & Vision Exams

**Route:** `/services/eye-exams`
**Story tagline:** "Your comprehensive eye exam, start to finish."
**Total visit placeholder:** ⏱ PLACEHOLDER — about 45 to 60 minutes

### Scene E1 — Warm welcome
- **Time pill:** ⏱ PLACEHOLDER — about 5 min
- **What the cartoon shows:** A friendly patient walks through the front door of a warm,
  sunlit clinic. A smiling front-desk person (Amanda) waves and hands over a clipboard.
  Soft orange accent details on the reception desk and signage.
- **Caption headline:** "Check in, no rush"
- **Caption body:** "You'll be greeted by name and asked a few quick questions about your
  history and what brought you in today."

### Scene E2 — Pre-testing with the technician
- **Time pill:** ⏱ PLACEHOLDER — about 10 min
- **What the cartoon shows:** The technician (Katie) guides the patient to a compact
  imaging machine. A gentle puff-of-air icon and a soft camera-flash icon appear as cute
  animated beats. A little "eye scan" ring sweeps across a cartoon eye.
- **Caption headline:** "A few quick measurements"
- **Caption body:** "Painless pre-testing captures baseline images and readings of your
  eyes, so the doctor starts your exam already prepared."

### Scene E3 — The exam with Dr. Mehta
- **Time pill:** ⏱ PLACEHOLDER — about 20 to 25 min
- **What the cartoon shows:** The patient sits behind a cartoon phoropter (the "which is
  better, 1 or 2?" device). Lenses flip with a satisfying click animation. Dr. Mehta,
  warm and attentive, points to an eye chart where a blurry row snaps into crisp focus.
- **Caption headline:** "The main event"
- **Caption body:** "Dr. Mehta checks your vision and the health of your eyes, then walks
  you through anything she finds in plain English. She never rushes the exam."

### Scene E4 — Dilation, if needed
- **Time pill:** ⏱ PLACEHOLDER — about 15 to 20 min wait
- **What the cartoon shows:** A single friendly eye-drop falls into a cartoon eye. The
  pupil gently widens. A small hourglass or clock spins softly while the patient relaxes
  in a comfy chair, maybe flipping through frames in the optical.
- **Caption headline:** "Sometimes we dilate"
- **Caption body:** "If we need a wider view of the back of your eye, we'll use drops.
  They take a little time to work, so you'll relax for a bit while they do."

### Scene E5 — Review and next steps
- **Time pill:** ⏱ PLACEHOLDER — about 5 to 10 min
- **What the cartoon shows:** Dr. Mehta and the patient look at a simple, friendly summary
  card together. A prescription slip slides out with a soft orange checkmark. The patient
  smiles, ready to head to the optical or book a follow-up.
- **Caption headline:** "Clear answers before you leave"
- **Caption body:** "We go over your results, your prescription, and anything to keep an
  eye on. You leave knowing exactly where your eyes stand."

### Closing card
- **Total:** ⏱ PLACEHOLDER — about 45 to 60 minutes, start to finish.
- **CTA:** "Book your eye exam" → `/book`

---

## Service 2 — Contact Lens Exams & Fittings

**Route:** `/services/contact-lenses`
**Story tagline:** "Finding the contact lens that fits your life."
**Total visit placeholder:** ⏱ PLACEHOLDER — about 45 to 75 minutes (often paired with an eye exam)

### Scene C1 — Let's talk lifestyle
- **Time pill:** ⏱ PLACEHOLDER — about 5 to 10 min
- **What the cartoon shows:** The patient and Dr. Mehta chat over a friendly table.
  Little floating icons pop up around them: a runner, a laptop, a moon (for sleep), a
  calendar. Each represents a lifestyle factor that shapes the lens choice.
- **Caption headline:** "It starts with your day"
- **Caption body:** "Screens, sports, allergies, how often you'd wear them — we talk
  through your routine first, because that decides which lenses actually suit you."

### Scene C2 — Measuring your eyes
- **Time pill:** ⏱ PLACEHOLDER — about 10 min
- **What the cartoon shows:** A cartoon eye is gently measured. A soft curved-line overlay
  traces the cornea's shape; a shimmering "tear film" layer sparkles across the eye. Clean,
  precise, but cute.
- **Caption headline:** "Measured to fit"
- **Caption body:** "We measure the curve of your eye and check your tear film, so your
  lenses sit comfortably and stay comfortable all day."

### Scene C3 — Meet the lens types
- **Time pill:** ⏱ PLACEHOLDER — about 5 min
- **What the cartoon shows:** A friendly line-up of cartoon lens characters slides in:
  daily soft, extended-wear, disposable, rigid gas-permeable. Each has a tiny label and a
  personality. A spotlight lands on the best match with an orange glow.
- **Caption headline:** "So many options"
- **Caption body:** "Daily, extended-wear, disposable, gas-permeable — modern lenses come
  in many types. We'll explain the trade-offs and narrow it to the right one."

### Scene C4 — Trial lenses go in
- **Time pill:** ⏱ PLACEHOLDER — about 15 to 20 min settling time
- **What the cartoon shows:** A trial lens gently floats onto a cartoon eye and settles
  with a soft ripple. A calm clock ticks while the patient blinks and looks around the
  room, letting the lenses settle.
- **Caption headline:** "Try before you decide"
- **Caption body:** "We place trial lenses on your eyes and give them a few minutes to
  settle, so we can see exactly how they feel and fit on you."

### Scene C5 — Fit check
- **Time pill:** ⏱ PLACEHOLDER — about 5 to 10 min
- **What the cartoon shows:** Dr. Mehta looks through a cartoon slit-lamp; a magnified
  view shows the lens sitting perfectly centered, with a little green "good fit" checkmark.
- **Caption headline:** "Checking the fit"
- **Caption body:** "We look at how the lens moves and centers on your eye, and fine-tune
  the choice until it's right."

### Scene C6 — Learn to handle them (first-timers)
- **Time pill:** ⏱ PLACEHOLDER — about 15 to 20 min
- **What the cartoon shows:** A warm little tutorial: cartoon hands demonstrate inserting
  and removing a lens over a mirror, with gentle step arrows. A reassuring thumbs-up at
  the end.
- **Caption headline:** "New to contacts? We'll teach you"
- **Caption body:** "If it's your first time, we'll walk you through putting lenses in,
  taking them out, and caring for them, until you feel confident."

### Scene C7 — Order and follow up
- **Time pill:** ⏱ PLACEHOLDER — about 5 min
- **What the cartoon shows:** A tidy lens box slides across with an orange checkmark, and a
  small calendar pins a follow-up date. Patient waves goodbye.
- **Caption headline:** "Ordered and set"
- **Caption body:** "We finalize your prescription, help you order, and set a follow-up to
  make sure everything's still comfortable."

### Closing card
- **Total:** ⏱ PLACEHOLDER — about 45 to 75 minutes, often paired with your eye exam.
- **CTA:** "Book a contact lens fitting" → `/book`

---

## Service 3 — LASIK Co-Management

**Route:** `/services/lasik`
**Story tagline:** "LASIK, guided from first question to final follow-up."
**Total journey placeholder:** ⏱ PLACEHOLDER — spans several weeks, most visits are short

> This is a longer journey across multiple visits, not one appointment. The "time pills"
> here describe each visit or phase, and the closing card frames the overall timeline.

### Scene L1 — Is LASIK right for you?
- **Time pill:** ⏱ PLACEHOLDER — first visit, about 30 to 45 min
- **What the cartoon shows:** The patient sits with Dr. Mehta, a friendly thought-bubble
  showing glasses and contacts fading out and clear eyes fading in. A gentle checklist card
  appears with orange checkmarks.
- **Caption headline:** "Start with a real conversation"
- **Caption body:** "LASIK can correct nearsightedness, farsightedness, and astigmatism.
  First we check whether you're a good candidate, honestly and without pressure."

### Scene L2 — Pre-surgery measurements
- **Time pill:** ⏱ PLACEHOLDER — about 30 min
- **What the cartoon shows:** A cartoon eye gets a colorful topography "map" laid over it,
  like a tiny contour map. Measurements float up as neat little readouts.
- **Caption headline:** "Precise measurements"
- **Caption body:** "We map your eyes in detail and prepare everything your surgeon needs,
  so your procedure is planned around your exact eyes."

### Scene L3 — Meet your surgeon
- **Time pill:** ⏱ PLACEHOLDER — scheduled with a trusted partner surgeon
- **What the cartoon shows:** A friendly handoff: Dr. Mehta introduces the patient to a
  cartoon surgeon partner. A little map pin shows the surgical center, with a dotted line
  back to Creedmoor.
- **Caption headline:** "Matched with a trusted surgeon"
- **Caption body:** "We work alongside experienced LASIK surgeons and coordinate your
  procedure, so you're in the right hands on surgery day."

### Scene L4 — Surgery day
- **Time pill:** ⏱ PLACEHOLDER — the procedure itself is about 15 min
- **What the cartoon shows:** A calm, reassuring scene: patient reclines under a soft
  cartoon laser device with a gentle glow. A quick, smooth animated sweep, then a relieved
  smile. Nothing scary, all soft shapes and warm light.
- **Caption headline:** "The procedure is quick"
- **Caption body:** "The LASIK procedure itself is fast and done at the surgical center.
  You'll rest, then head home the same day."

### Scene L5 — Follow-up care, close to home
- **Time pill:** ⏱ PLACEHOLDER — follow-ups over the days and weeks after
- **What the cartoon shows:** Back in the warm Creedmoor office. A soft calendar flips
  through a few follow-up checkmarks. The patient reads a distant sign clearly with a happy
  expression; glasses drop into a little "retired" box.
- **Caption headline:** "We handle your recovery"
- **Caption body:** "Your follow-up visits happen right here with us. We track your healing
  and make sure your vision settles in beautifully."

### Closing card
- **Total:** ⏱ PLACEHOLDER — the full journey spans several weeks; most of your visits are
  short, and your care stays local.
- **CTA:** "Ask us about LASIK" → `/book` (plus a phone option, matching the services page)

---

## Caption-writing rules (so all three read consistently)

- Headlines: 2 to 5 words, warm and plain.
- Body: one or two short sentences, everyday words, no jargon. Explain any needed term.
- Never overstate a medical claim. Keep it patient-friendly and honest.
- Every scene has exactly one time pill. Times are placeholders until confirmed.
- Match the site voice: calm, unhurried, "explained in plain English."
