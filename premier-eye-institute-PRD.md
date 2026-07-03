# Premier Eye Institute Website - Product Requirements Document (PRD)

**Version:** 0.3 (Draft)
**Last updated:** July 3, 2026
**Owner:** Ishaan
**Built with:** React (Next.js framework), in Claude Code
**Status:** Living document. Add to this as we go.

---

## 1. Overview

This is the plan for building a new website for Premier Eye Institute. It is an eye care (optometry) practice in Creedmoor, North Carolina. The current site runs on a template builder called iMatrix. The goal is to build a modern, fast, and highly animated site that helps patients book appointments and learn about the practice.

The site is built with React. The build happens in Claude Code. The site should look and feel premium. The star of the homepage is a glasses video that follows you as you scroll and plays its animation in step with your scrolling.

This document holds all the facts, goals, tools, and plans in one place. It will grow as we make decisions.

---

## 2. About the Business

Here is what we know about the practice today. This came from their current website and public listings.

| Item | Detail |
|------|--------|
| Business name | Premier Eye Institute, OD, PLLC |
| Type | Optometry practice (eye doctor) |
| Owner / lead doctor | Dr. Nisha P. Mehta, OD |
| Founded | 2014 |
| Track record | Over 5,000 eyes examined |
| Address | 2531 E Lyon Station Rd, Suite F, Creedmoor, NC 27522 |
| Phone | 919-734-2273 |
| Fax | 919-238-4321 |
| Current website | peicare.com |
| Patient portal | Crystal PM (crystalpm.com) |
| Facebook | facebook.com/PEIcareNC |
| Twitter / X | twitter.com/PEIcareNC |

### Office Hours

Note: some listings show slightly different hours. We should confirm these with the client.

| Day | Hours |
|-----|-------|
| Monday | 8:00 am - 5:00 pm |
| Tuesday | 8:00 am - 5:00 pm |
| Wednesday | 8:00 am - 5:00 pm |
| Thursday | 9:00 am - 6:00 pm |
| Friday | 8:00 am - 3:00 pm |
| Saturday | By appointment only |
| Sunday | Closed |

---

## 3. The Team

The site should have an "About" or "Meet the Team" section. Here is the current staff.

- **Dr. Nisha Mehta, OD** - Optometrist and owner. Trained at Pennsylvania College of Optometry (2006). Did a residency in eye disease at the Baltimore VA. Fellow of the American Academy of Optometry. Former clinical assistant professor at UNC Chapel Hill. Has an MBA from East Carolina University. Has done eye care mission work in Guatemala.
- **Crystal** - Runs daily operations of the practice.
- **Katie** - Optometric Technician. Does preliminary testing and contact lens training.
- **Maddie** - Optical Specialist. Helps with frame selection, orders, and repairs.
- **Amanda** - Front desk and scheduling.
- **Wendy** - Scheduling and patient questions.
- **Brianne** - Optical Specialist. Helps patients pick frames.

---

## 4. Services

These are the services the practice offers. Each one could be its own page or section.

- Eye and vision exams (full exams for the whole family)
- Contact lens exams and fittings
- Ortho-K contacts (special lenses worn at night to reshape the eye)
- Dry eye treatment
- LASIK eye surgery co-management (pre-surgery and post-surgery care)
- Computer vision care (help for eye strain from screens)
- Sports vision
- Glaucoma testing
- Prescription glasses and frame selection
- Prescription and non-prescription sunglasses

---

## 5. Payments and Insurance

- Accepts VSP (Vision Service Plan), including the VSP Premier Program.
- Accepts CareCredit (a healthcare credit card).
- We should add a full list of accepted insurance plans once we confirm with the client.

---

## 6. Goals of the New Website

The main jobs the website needs to do, in order of importance.

1. **Get patients to book an appointment.** This is the top goal. The "Book Appointment" button should be easy to find on every page. Animation must never get in the way of this.
2. **Make it easy to call or find the office.** Phone number, address, hours, and a map should be simple to reach.
3. **Build trust.** Show the doctor's background, the team, and patient reviews so new patients feel comfortable.
4. **Explain the services.** Help patients understand what the practice offers.
5. **Look modern and premium.** The site should feel high end and smooth. This is where the video and scroll animations come in.

---

## 7. Target Users

Who will use this site.

- **New patients** looking for an eye doctor near Creedmoor. They want to know services, location, and how to book.
- **Existing patients** who need to book a follow-up or reach the patient portal.
- **Parents** booking exams for their kids.
- **People with a specific need** like dry eye, contacts, or Ortho-K.

Most users will likely be on a phone. So the site must work great on mobile first. Animations must stay smooth on phones too.

---

## 8. Site Map (Pages)

A first draft of the pages. We can change this. The homepage can hold most of these as sections, with deeper pages later.

- **Home** - Scroll-following video hero, intro line, services, meet the doctor, reviews, stats, and contact.
- **About Us**
  - Meet the doctor (Dr. Mehta)
  - Meet the team
- **Services** - Overview page, with links to detail sections:
  - Eye and vision exams
  - Contact lens exams
  - Ortho-K contacts
  - Dry eye treatment
  - LASIK co-management
  - Computer vision
  - Sports vision
- **Eyewear** - Frame selection and sunglasses.
- **Reviews** - Patient testimonials.
- **Payments and Insurance**
- **Patient Resources** - Portal link, new patient forms, blog/newsletters.
- **Contact Us** - Address, map, hours, phone, contact form.
- **Book Appointment** - Main call to action, links to their booking system.

---

## 9. Key Features

Things the site should be able to do.

- **Appointment booking button** on every page (sticky or in the header).
- **Click-to-call phone number** so mobile users can tap and call.
- **Google Map** of the office location.
- **Patient portal link** (Crystal PM) so existing patients can log in.
- **Contact form** for questions.
- **Reviews / testimonials** section.
- **Meet the doctor** section with a photo and short bio.
- **Mobile-friendly design** that works on all screen sizes.
- **Fast loading** pages, even with the video and animations.
- **Basic SEO** so the practice shows up in local searches like "eye doctor Creedmoor NC."

---

## 10. Design Direction

The look and feel we are going for. Full details and tokens live in DESIGN.md.

- **Style:** Clean, warm, and premium. Medical but friendly, not cold.
- **Feel:** Smooth and alive. Motion should feel high end, not busy.
- **Colors:** A warm off-white background, a warm near-black for text, and one warm terracotta orange as the action color. This matches the design you made in Claude Design. The accent is a single variable, so we can switch it (for example to a medical blue) with one change. See DESIGN.md.
- **Fonts:** Newsreader (serif) for headings. Manrope (sans) for body.
- **Logo:** Need the real logo file. There is a placeholder for now.
- **Photos:** Use real photos of the office, staff, and Dr. Mehta where we can.
- **Tone of writing:** Friendly and simple. Easy for any patient to understand.

---

## 11. Animation and Motion Plan

This is a big part of the project. The site should be super animated, ultra smooth, and interactive. The star is the glasses video.

### 11.1 The scroll-following video (main change)

**Old idea:** the video sat at the very top and stayed there.
**New idea:** the video is woven into the homepage. It follows you as you scroll, and it plays the next part of its animation as you go. Scroll up and it plays in reverse.

How it works:

1. Near the top of the homepage there is a tall scroll area (about 300vh to 400vh of height).
2. Inside that area, the video sits in a "sticky" stage. Sticky means it stays on the screen while you scroll through the area. So the video follows you down the page.
3. The video does not play on its own. Its playback is tied to your scroll. Scroll down plays it forward. Scroll up rewinds it. This is called scrubbing.
4. The scroll area is split into scenes. Each scene lines up with a beat in the video (the glasses forming, the eye machine, and so on). As you scroll into the next scene, the video moves to that part and a short headline or feature fades in.
5. When you reach the end of the scroll area, the sticky releases. The video shrinks into the page or fades out, and the normal sections continue below.

Keep it smooth:

- Smooth the scrubbing. Ease the video time toward the target with a small lerp and requestAnimationFrame. This makes it buttery, not jumpy.
- Preload the video and prime it once so seeking is instant.
- The video is 640x640 and about 4 seconds. Keep it in a nice contained frame, not full screen, so it stays sharp. A centered rounded frame works well.

Reduced motion:

- If the user has reduced motion turned on, do not pin or scrub. Show the video once as a simple muted loop, or a still image, and reveal the text normally.

### 11.2 Scroll animations (scrolly sections)

As the user scrolls down the rest of the page, sections should come alive.

- Sections fade and slide in as they enter the screen.
- Some sections pin while content moves.
- Light parallax so background and foreground move at different speeds.
- A stats strip (years open, eyes examined, star rating) that counts up when it comes into view.

### 11.3 Interactivity

- The glasses can subtly tilt or react to the mouse.
- Hover effects on buttons, cards, and links with smooth micro-motion.
- Smooth scrolling across the whole site so it feels buttery.

### 11.4 Smoothness rules

- Target 60 frames per second. No jank or stutter.
- Animate only transform and opacity where you can. These run on the GPU and stay smooth.
- Lazy-load heavy things below the fold so the first screen loads fast.

### 11.5 Accessibility and balance

- Respect the prefers-reduced-motion setting.
- Keep text readable over the video with an overlay or gradient.
- Never let animation block or delay booking, calling, or reading the info.

---

## 12. Design Reference from Claude Design

You made a first design in Claude Design. It is saved as `design-reference.html`. Use it as the layout and structure guide. It shows the look and flow we want. Open it to see the real thing.

### Keep these strong parts

- The overall flow: header, hero with the video, short intro line, services, dark stats section, contact, footer.
- The video in a rounded frame with a soft shadow. It looks premium and keeps the small video sharp.
- The dark stats section with numbers that count up.
- The contact card with hours and address, plus a click to call button.
- The reveal on scroll effects and the reduced motion handling.
- Serif headings with a clean sans body.

### Improve these weaker parts

- Add a "Meet Dr. Mehta" section with a photo and short bio. This builds trust and is missing.
- Add a reviews or testimonials section. There are none right now.
- Add a Google map in the contact area.
- Add more services. The design shows only three. We offer more (exams, contacts, Ortho-K, dry eye, LASIK co-management, sports vision, glaucoma, eyewear and sunglasses).
- Replace the placeholder "P" circle with the real logo once we have it.
- Grow the nav to match the full site (About, Services, Eyewear, Reviews, Contact).
- Extend the video so it follows you across scenes, as described in Section 11.

### Notes

- The reference file is a Claude Design export. It uses a warm orange accent. Use DESIGN.md as the source of truth for color and fonts.
- In the reference, the video path is `assets/hero-glasses.mp4`. In the real build, put the video at `public/hero-glasses.mp4`.
- Do not copy the Claude Design runtime (`support.js` or the `x-dc` tags). Just use the file to see the layout and copy.

---

## 13. Tech Stack

The site is built with React. Here is the full stack.

- **Library:** React.
- **Framework:** Next.js (App Router). Next.js is React under the hood. It gives us routing and good SEO, which matters for local search. If we would rather use plain React with Vite, that is an easy switch, but Next.js is the default.
- **Language:** TypeScript.
- **Styling:** Tailwind CSS.
- **Components:** shadcn/ui (installed through the shadcn MCP).
- **Animation:** Framer Motion for most motion. Add GSAP with ScrollTrigger if we need frame-accurate scroll scrubbing for the video.
- **Smooth scroll:** Lenis.
- **Hosting:** Vercel is the easy choice with Next.js.
- **Booking system:** Link out to their current system, or embed a scheduler. Need to confirm what they use.

---

## 14. Build Environment: Claude Code

This site is built in Claude Code. Claude Code writes the code, runs the tools, and checks its own work in a real browser.

Two setup files live at the root of the project:

- `.mcp.json` - tells Claude Code which MCP servers to load. (Provided with this PRD.)
- The design skills get installed into `.claude/skills/` (see Section 16).

MCP means Model Context Protocol. It is a way to plug outside tools into Claude Code. A skill is a set of design rules Claude Code reads and follows.

---

## 15. MCP Servers

Three MCP servers power this build. They are all listed in `.mcp.json`.

### 15.1 shadcn MCP (component registry)

- **What it does:** Gives Claude Code direct access to the shadcn/ui component registry. It can search, preview, and install real components straight into the project.
- **Setup:** Run `npx shadcn@latest init` first, then `npx shadcn@latest mcp init`.
- **In the build:** "Use the shadcn MCP to add button, card, form, and navigation-menu."

### 15.2 Chrome DevTools MCP (live browser control and debugging)

- **What it does:** Lets Claude Code open a real Chrome browser, take screenshots, read the console, and record performance traces. This is how it confirms the animations are smooth and fixes any jank.
- **Setup:** `claude mcp add chrome-devtools -- npx chrome-devtools-mcp@latest`. Or install the plugin: `/plugin marketplace add ChromeDevTools/chrome-devtools-mcp`.
- **In the build:** "Open the site in Chrome, record a performance trace of the video scroll, and fix anything below 60fps." Also check mobile and desktop sizes.

### 15.3 Magic MCP (21st.dev) - AI UI component generation

- **What it does:** Type `/ui` and describe a component, and it generates a polished React and Tailwind version. Good for the hero, navbar, cards, and forms.
- **Setup:** Get a free API key at `21st.dev/magic/console`. Then `npx @21st-dev/cli@latest install claude --api-key YOUR_KEY`. Or paste the key into `.mcp.json`.
- **Note:** Do not commit your real API key to GitHub.

---

## 16. Design Skills

Two design skills keep the site from looking like generic AI output. Install both.

### 16.1 taste-skill (Leonxlnx)

- **What it does:** Gives Claude Code "good taste." It sets three dials: design variance, motion intensity, and visual density. It also ships an opinionated stack: Next.js, Tailwind, Framer Motion, and Radix.
- **Install:** `npx skills add Leonxlnx/taste-skill`.
- **In the build:** Aim for high variance, medium-high motion, and low-to-medium density. Vibe words: "premium, calm, trustworthy, warm eye care."

### 16.2 impeccable (anti-slop detector)

- **What it does:** A design skill plus a scanner that catches AI slop and accessibility problems. It has commands like `/polish` and `/audit`.
- **Install:** `npx impeccable install`, then run `/impeccable init` inside Claude Code.
- **Scan command:** `npx impeccable detect src/` (needs Node 24 or newer).
- **In the build:** After each page, run `/impeccable audit` and `/impeccable polish`, then `npx impeccable detect src/` before you call it done.

### 16.3 How the two work together

taste-skill sets the creative direction while building. impeccable checks the result and cleans up slop at the end.

---

## 17. Build Workflow in Claude Code

A suggested order of steps.

1. **Set up the project.** Create the React app with Next.js, TypeScript, and Tailwind. Run `npx shadcn@latest init`.
2. **Add the tools.** Drop in `.mcp.json`. Install the shadcn MCP, Chrome DevTools MCP, and Magic MCP. Add your 21st.dev key.
3. **Add the skills.** Run `npx skills add Leonxlnx/taste-skill` and `npx impeccable install`, then `/impeccable init`.
4. **Set the design direction.** Load DESIGN.md. Confirm the warm palette and fonts.
5. **Build the base.** Use the shadcn MCP for core components. Build the layout, navbar, and footer.
6. **Build the scroll-following video.** Put `hero-glasses.mp4` in `public/`. Build the sticky, scroll-scrubbed, multi-scene video from Section 11. Make it ultra smooth.
7. **Build the rest of the homepage.** Intro, services, meet the doctor, reviews, stats, contact.
8. **Add the other pages.** About, services detail, eyewear, contact.
9. **Wire up booking and contact.** Booking button, contact form, map, click-to-call.
10. **Check it in a real browser.** Use the Chrome DevTools MCP for performance traces, 60fps, mobile and desktop.
11. **Polish and clean.** Run `/impeccable audit` and `/impeccable polish`, then `npx impeccable detect src/`.
12. **Ship.** Deploy to Vercel.

---

## 18. Assets

What we have and what we still need.

- **Have:** `hero-glasses.mp4` (the black-framed glasses video). 640x640, about 4 seconds.
- **Have:** `design-reference.html` (the Claude Design layout to follow).
- **Need:** The practice logo file.
- **Need:** Real photos of the office, staff, and Dr. Mehta.
- **Consider:** A higher-resolution render of the video if we ever want it larger.

---

## 19. Open Questions

Things we still need to confirm or decide.

- Warm orange accent, or switch to a medical blue? (One variable to change.)
- Are the office hours correct? Listings disagree slightly.
- What insurance plans do they accept, in full?
- What booking system do they use now? Can we link or embed it?
- Do we get the logo and photo files?
- Is this a full rebuild, or keep some parts of the current site?
- Budget and timeline?
- Keep the blog and newsletters?

---

## 20. Change Log

| Date | Version | Change |
|------|---------|--------|
| July 3, 2026 | 0.1 | First draft created from research on the current site. |
| July 3, 2026 | 0.2 | Tailored to Claude Code. Added MCP servers, design skills, animation plan, tech stack, and build workflow. |
| July 3, 2026 | 0.3 | Set React as the stack. Rewrote the video to follow the user and scrub across scenes. Added a design reference section from the Claude Design file. Added meet-the-doctor and reviews. Moved to the warm palette. |
