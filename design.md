# Design — Suthang Sukrueangkun Portfolio

A locked design system for this app. Every page redesign reads this file before emitting code. Extend this system when the product grows; do not regenerate it per page.

## Genre

Modern-minimal with a soft, approachable body and austere edge-aligned chrome. The interface is designed for HR and recruiters who need to understand Suthang’s focus, scan the complete body of work, and make contact quickly.

## Macrostructure family

- Marketing pages: **Portfolio Grid**, with an H2 Split Diptych introduction, a standalone live-activity strip, a structured toolkit, and the complete image-led project index from `main`.
- App pages: not currently applicable; use **Workbench** if an interactive project area is added.
- Profile content: **Split Studio**, pairing concise explanation with structured proof or chronology in the original `main` rhythm.
- Project case studies: **Long Document**, using recruiter-readable overview copy, real project imagery where available, and a concise technology summary without invented usage metrics.

## Theme

Custom theme: “warm paper, airy edges, sky-blue signal.” Axes: **light / geometric-sans / cool**.

- `--color-paper` `oklch(98.4% 0.004 80)`
- `--color-paper-2` `oklch(96% 0.006 80)`
- `--color-ink` `oklch(22% 0.018 240)`
- `--color-ink-2` `oklch(36% 0.017 240)`
- `--color-rule` `oklch(84% 0.006 80)`
- `--color-accent` `oklch(62% 0.160 235)`
- `--color-focus` `oklch(60% 0.200 235)`
- Dark mode keeps the cool-neutral family and shifts paper to `oklch(16% 0.004 260)`.

## Typography

- Display: Geist, weight 700, roman.
- Body: Geist, weight 400.
- Mono outlier: Geist Mono for the shared wordmark only.
- Display tracking: `-0.035em`.
- Type scale anchor: `--text-display: clamp(2.75rem, 7vw, 5.25rem)`.

## Spacing

The portable 4-point named scale lives in `tokens.css`. Pages use `var(--space-*)` and `var(--page-gutter)`, never arbitrary layout spacing.

## Motion

- Easings: `--ease-out`, `--ease-in`, and `--ease-in-out` from `tokens.css`.
- Reveal pattern: one portrait settle using an 8 px vertical transform and subtle scale.
- Hover pattern: a single image-scale response on linked project images.
- Live-data pattern: one count-up after GitHub totals load; reduced motion renders the final value immediately.
- Reduced motion: opacity-only, no longer than 150 ms.

## Microinteractions stance

- Silent success; no celebratory feedback.
- Focus appears instantly with a 2 px ring.
- Interactive targets are at least 44 px on touch surfaces.
- Hover behavior always has a keyboard-focus equivalent.

## CTA voice

- Primary CTA: soft outlined pill with a specific verb, used for email contact.
- Secondary CTA: typographic link with an arrow, used for GitHub and project sources.

## Per-page allowances

- Marketing pages may use the supplied portrait and project photography.
- App pages must not add decorative enrichment.
- Content pages use typography and structured facts; no invented imagery.

## What pages MUST share

- The Suthang wordmark, N9 Edge-Aligned Minimal navigation, and Ft2 Inline footer.
- The sky-blue accent at no more than 5% of a viewport.
- Geist + Geist Mono, CTA shape, focus treatment, and section-heading rhythm.
- Light and dark modes share the sky-blue signal hue and the same semantic token roles.

## What pages MAY differ on

- The home page may prioritize the full project index and imagery; the About page may prioritize text.
- Project case studies may use a narrower reading measure and project-specific imagery where verified assets are available.
- Grid proportions may vary within the declared page family.
- Only the home portrait receives an entrance animation.

## Exports

### tokens.css

The canonical file is `tokens.css` at the project root.

```css
:root {
  --color-paper: oklch(98.4% 0.004 80);
  --color-paper-2: oklch(96% 0.006 80);
  --color-ink: oklch(22% 0.018 240);
  --color-ink-2: oklch(36% 0.017 240);
  --color-rule: oklch(84% 0.006 80);
  --color-accent: oklch(62% 0.160 235);
  --color-accent-ink: oklch(20% 0.020 240);
  --color-focus: oklch(60% 0.200 235);
  --font-display: var(--font-geist), ui-sans-serif, sans-serif;
  --font-body: var(--font-geist), ui-sans-serif, sans-serif;
  --font-outlier: var(--font-geist-mono), ui-monospace, monospace;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-short: 220ms;
  --radius-card: 1.25rem;
  --radius-pill: 999px;
}
```

### Tailwind v4 `@theme`

```css
@theme {
  --color-paper: oklch(98.4% 0.004 80);
  --color-paper-2: oklch(96% 0.006 80);
  --color-ink: oklch(22% 0.018 240);
  --color-accent: oklch(62% 0.160 235);
  --font-display: var(--font-geist), ui-sans-serif, sans-serif;
  --font-body: var(--font-geist), ui-sans-serif, sans-serif;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --radius-card: 1.25rem;
  --radius-pill: 999px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### DTCG `tokens.json`

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "paper": { "$value": "oklch(98.4% 0.004 80)", "$type": "color" },
    "ink": { "$value": "oklch(22% 0.018 240)", "$type": "color" },
    "accent": { "$value": "oklch(62% 0.160 235)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Geist, ui-sans-serif, sans-serif", "$type": "fontFamily" },
    "body": { "$value": "Geist, ui-sans-serif, sans-serif", "$type": "fontFamily" },
    "outlier": { "$value": "Geist Mono, ui-monospace, monospace", "$type": "fontFamily" }
  },
  "space": {
    "md": { "$value": "1.5rem", "$type": "dimension" }
  },
  "duration": {
    "short": { "$value": "220ms", "$type": "duration" }
  }
}
```

### shadcn/ui CSS variables

```css
:root {
  --background: 98.4% 0.004 80;
  --foreground: 22% 0.018 240;
  --card: 96% 0.006 80;
  --card-foreground: 22% 0.018 240;
  --primary: 62% 0.160 235;
  --primary-foreground: 20% 0.020 240;
  --secondary: 92.5% 0.008 80;
  --secondary-foreground: 36% 0.017 240;
  --muted: 84% 0.006 80;
  --muted-foreground: 48% 0.015 240;
  --border: 84% 0.006 80;
  --input: 84% 0.006 80;
  --ring: 60% 0.200 235;
  --radius: 1.25rem;
}
```
