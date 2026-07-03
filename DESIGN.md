# Premier Eye Institute - Design System (DESIGN.md)

**Version:** 0.2
**Last updated:** July 3, 2026
**Pairs with:** premier-eye-institute-PRD.md and design-reference.html
**Note:** This matches the warm look from the Claude Design file. The accent is one variable. To switch to a cooler medical blue, change one color. See Section 2.

This file holds the design rules for the site. Colors, fonts, spacing, and motion. Claude Code, taste-skill, and impeccable can all read this.

---

## 1. Design direction

The vibe in three words: premium, warm, trustworthy.

- **Feel:** high end and smooth, like a good product site. Not busy.
- **Audience:** patients of all ages near Creedmoor, NC. Many on phones.
- **taste-skill dials:** high design variance, medium-high motion, low-to-medium density. So it looks artistic and animated but stays airy and easy to read.
- **Anti-references:** do not look like a generic template. No Inter everywhere. No purple-to-blue gradients. No cards stuffed inside cards.

---

## 2. Colors

One warm accent does the work. It is used for buttons, links, and highlights. Text and background pairs should meet WCAG AA contrast. Check with impeccable and the Chrome DevTools MCP.

### Brand

| Token | Hex | Use |
|-------|-----|-----|
| ink | `#1B1714` | Main text, dark sections, footer |
| accent | `#E7592A` | Buttons, links, highlights. The action color. |
| accent-hover | `#C9481E` | Hover state for the accent |
| accent-tint | `#FCEBE1` | Soft accent background for icon chips |

### Neutrals (warm)

| Token | Hex | Use |
|-------|-----|-----|
| bg | `#FFFFFF` | Main page background |
| surface | `#FFFFFF` | Cards and raised areas |
| surface-alt | `#FBF6F1` | Warm off-white section background |
| hero-wash | `#FDF4EE` | Soft wash behind the hero |
| border | `#ECE6DF` | Thin lines and dividers |
| text-body | `#6F665F` | Body text |
| muted | `#A79E96` | Small labels and hints |

### On dark sections

- Background: `ink` (`#1B1714`)
- Text: `#FFFFFF`
- Muted text on dark: `#B8AFA8`
- Accent still uses `accent` (`#E7592A`)

### Semantic

| Token | Hex | Use |
|-------|-----|-----|
| success | `#2E7D5B` | Success messages |
| error | `#C4453B` | Errors and form warnings |

### Switching to blue (optional)

If you want a cooler, more clinical look, change `accent` to `#175E96`, `accent-hover` to `#124B78`, and `accent-tint` to `#E6F0F8`. Everything else can stay the same.

---

## 3. Typography

Two fonts. Both are free on Google Fonts and load with Next.js `next/font`.

- **Headings:** Newsreader (serif). Calm, warm, and editorial. Italics look great for one accent word.
- **Body:** Manrope (sans). Clean and easy to read.
- **Fallbacks:** Newsreader to Georgia, serif. Manrope to system-ui, sans-serif.

### Type scale (desktop)

| Name | Size | Line height | Font |
|------|------|-------------|------|
| display | clamp(42px, 7vw, 88px) | 1.02 | Newsreader 500 |
| h1 | clamp(34px, 5vw, 62px) | 1.05 | Newsreader 500 |
| h2 | clamp(28px, 4vw, 46px) | 1.1 | Newsreader 500 |
| h3 | 23px | 1.25 | Newsreader 600 |
| body-lg | 18px | 1.6 | Manrope |
| body | 16px | 1.6 | Manrope |
| small | 14px | 1.5 | Manrope |
| eyebrow | 12px | 1.4 | Manrope 600, letter-spacing 2.6px, uppercase |

### Weights

- Newsreader: 400, 500, 600 (plus 400 italic)
- Manrope: 400 (body), 500, 600, 700

---

## 4. Spacing

- Base unit: 4px. This is the Tailwind default, so use the normal scale (`p-4`, `gap-8`, and so on).
- Be generous. Premium sites use lots of whitespace.
- Section padding: about 90px to 150px top and bottom on desktop. About 56px to 72px on mobile.
- Max content width: about 1100px to 1200px, centered.

---

## 5. Radius (rounded corners)

The look is soft and rounded.

| Token | Size | Use |
|-------|------|-----|
| sm | 12px | Small inputs, tags |
| md | 16px | Inputs, icon chips |
| lg | 24px | Cards |
| xl | 34px | The video frame and large feature blocks |
| pill | 999px | Buttons |

---

## 6. Shadows

Soft and warm, not harsh. Warm shadows fit the palette.

| Token | Value |
|-------|-------|
| sm | `0 1px 2px rgba(27, 23, 20, 0.06)` |
| md | `0 20px 50px -30px rgba(120, 60, 30, 0.35)` |
| lg | `0 40px 90px -30px rgba(120, 60, 30, 0.40)` |
| cta | `0 14px 30px -10px rgba(231, 89, 42, 0.6)` |

---

## 7. Motion

This is an animated site, so motion has its own tokens. See the animation plan in the PRD (Section 11).

| Token | Value | Use |
|-------|-------|-----|
| dur-fast | 150ms | Hovers, small state changes |
| dur-base | 250ms | Most transitions |
| dur-slow | 450ms | Section reveals |
| dur-hero | 850ms | Hero and big scroll moments |
| ease-soft | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Default smooth ease for entrances |
| ease-inout | `cubic-bezier(0.65, 0, 0.35, 1)` | Loops and back-and-forth motion |

Rules:

- Animate only transform and opacity where you can. These stay smooth.
- Entrances: fade up about 22px to 30px, over `dur-slow` with `ease-soft`.
- Scrub smoothing: lerp the video time toward the target at about 0.16 per frame.
- Always respect prefers-reduced-motion. If it is on, turn off scrubbing, pinning, and parallax. Show a calm still version.

---

## 8. Components

Quick rules for the main parts.

### Buttons

- **Primary and CTA:** solid `accent` background, white text, `pill` radius, `cta` shadow. This is the "Book Appointment" button and most actions.
- **Secondary:** white background, `ink` text, thin `border`, `pill` radius. Good for a phone or "call us" button.
- **Ghost:** text only, no border.
- All buttons: smooth hover over `dur-base`. Lift 1px to 2px on hover. Clear focus ring in `accent` for accessibility.

### Cards

- `surface` white background, `lg` radius, thin `border`, `md` shadow.
- Lift slightly on hover (small translate up plus stronger shadow).
- Icon chip on top: `md` radius, `accent-tint` background, `accent` icon.

### Sections

- Alternate `bg`, `surface-alt`, and one dark `ink` section (the stats) so the page has rhythm.
- Generous top and bottom padding.
- Use asymmetric layouts to match the high variance dial.

### Links and eyebrows

- Links: `accent` color, underline on hover.
- Eyebrow labels: small uppercase Manrope in `accent`, with short lines on each side.

### Forms

- Inputs: `surface` background, `border` line, `md` radius.
- Clear focus ring in `accent`.
- Show errors in `error` with a short message.

---

## 9. Code snippets

Ready to paste into the Next.js project.

### 9.1 Fonts (app/fonts.ts)

```ts
import { Newsreader, Manrope } from "next/font/google";

export const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-heading",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
```

Then add both variables to the `<body>` className in `app/layout.tsx`:

```tsx
<body className={`${newsreader.variable} ${manrope.variable}`}>
```

### 9.2 CSS variables (app/globals.css)

```css
:root {
  /* colors */
  --ink: #1B1714;
  --accent: #E7592A;
  --accent-hover: #C9481E;
  --accent-tint: #FCEBE1;
  --bg: #FFFFFF;
  --surface: #FFFFFF;
  --surface-alt: #FBF6F1;
  --hero-wash: #FDF4EE;
  --border: #ECE6DF;
  --text-body: #6F665F;
  --muted: #A79E96;
  --success: #2E7D5B;
  --error: #C4453B;

  /* fonts */
  --font-heading: "Newsreader", Georgia, serif;
  --font-body: "Manrope", system-ui, sans-serif;

  /* radius */
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 34px;

  /* shadows */
  --shadow-sm: 0 1px 2px rgba(27, 23, 20, 0.06);
  --shadow-md: 0 20px 50px -30px rgba(120, 60, 30, 0.35);
  --shadow-lg: 0 40px 90px -30px rgba(120, 60, 30, 0.40);
  --shadow-cta: 0 14px 30px -10px rgba(231, 89, 42, 0.6);

  /* motion */
  --dur-fast: 150ms;
  --dur-base: 250ms;
  --dur-slow: 450ms;
  --dur-hero: 850ms;
  --ease-soft: cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-inout: cubic-bezier(0.65, 0, 0.35, 1);
}
```

### 9.3 Tailwind theme (tailwind.config.ts)

For Tailwind v3, extend the theme so the tokens work as classes like `bg-accent` and `text-ink`.

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-tint": "var(--accent-tint)",
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        "hero-wash": "var(--hero-wash)",
        border: "var(--border)",
        "text-body": "var(--text-body)",
        muted: "var(--muted)",
        success: "var(--success)",
        error: "var(--error)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        cta: "var(--shadow-cta)",
      },
    },
  },
  plugins: [],
};

export default config;
```

If the project uses Tailwind v4, put the same tokens inside an `@theme` block in `globals.css` instead.

---

## 10. Change log

| Date | Version | Change |
|------|---------|--------|
| July 3, 2026 | 0.1 | First design system. Blue and gold with Fraunces and Hanken Grotesk. |
| July 3, 2026 | 0.2 | Switched to the warm look from the Claude Design file. Terracotta accent, Newsreader and Manrope fonts, warmer radius and shadows. Blue is now an optional swap. |
