# Premier Eye Institute — Website

Marketing site for Premier Eye Institute, an independent optometry practice in
Creedmoor, NC. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4,
shadcn/ui, Framer Motion, and Lenis.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build & checks

```bash
npm run build                 # production build (all routes are static)
npx eslint app components lib # lint
npx impeccable detect app components  # design anti-pattern scanner
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel        # first deploy (accept defaults; framework auto-detected)
vercel --prod # production deploy
```

Or push the repo to GitHub and import it at vercel.com/new — zero config needed.

## Project notes

- **Design tokens** live in `app/globals.css` and follow `DESIGN.md`. The accent
  is one variable set (`--accent`, `--accent-hover`, `--accent-tint`) — switch
  to the medical blue from DESIGN.md §2 by changing those three values.
- **Business facts** (address, hours, services, team) live in `lib/site.ts` —
  edit once, updates everywhere.
- **The scroll-scrubbed hero** is `components/home/video-hero.tsx`. The video at
  `public/hero-glasses.mp4` is scrubbed by scroll with a lerp inside one rAF
  loop; scene beats are the `SCENES` array. Reduced-motion users get a calm
  muted loop instead.

## Before launch

- Replace the placeholder testimonials in `lib/site.ts` with real Google or
  Facebook reviews (the current quotes are illustrative).
- Wire the contact form (`components/contact/contact-form.tsx`) to a backend
  (Formspree, Resend, or practice email) — it currently simulates the send.
- Swap the "P" logo placeholder and "photo coming soon" blocks for the real
  logo and photography.
- Add a real 21st.dev API key to `.mcp.json` if you want Magic MCP generation
  in future Claude Code sessions (do not commit the key).
- Confirm office hours and the full insurance list with the practice.
