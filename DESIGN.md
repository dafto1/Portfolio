# Design system: chanhdai.com

A design-system reference for https://chanhdai.com, written from the site's source (https://github.com/ncdai/chanhdai.com, `main`) and the live page. Values are copied from the code, not eyeballed. Where something is inferred rather than read directly, it is marked **(inferred)**.

Stack: Next.js 16, React 19, Tailwind CSS v4 (CSS-first config, no `tailwind.config`), shadcn/ui (style `base-nova`, base color `zinc`, Base UI primitives), `tw-animate-css`, `@tailwindcss/typography`, lucide icons, Motion.

---

## 1. Overview

A "pixel-perfect" developer portfolio that doubles as a shadcn component registry. The look is **monochrome, hairline, blueprint-like**:

- Almost everything is zinc grayscale. There is no brand accent color. Blue appears only for links and the "new" dot.
- The page is a single centered column (max 48rem) framed by 1px vertical lines, with 1px horizontal lines that run edge to edge across the whole viewport. It reads like a drafting sheet or ruled paper.
- Small engineering details are shown as decoration: dimension labels (`768`, `30°`, `Ø160`, `32`), diagonal-stripe dividers, handwritten margin notes with arrows.
- Restrained motion, tactile micro-interactions (press scale, click sounds, cursor-following mark), light and dark themes with equal care.
- Tone of voice: short, lowercase-friendly microcopy ("free to copy / yours to keep", "same deal, bigger pieces"). Headings are **sentence case**.

---

## 2. Color

All colors are CSS variables in OKLCH, mapped into Tailwind through `@theme inline`. Hex values below are the equivalent Tailwind v4 palette colors for reference.

### Semantic tokens

| Token | Light | Dark | Role |
|---|---|---|---|
| `--background` | `oklch(1 0 0)` white `#ffffff` | `oklch(0.141 0.005 285.823)` zinc-950 `#09090b` | Page background |
| `--foreground` | `oklch(0.141 0.005 285.823)` zinc-950 | `oklch(0.985 0 0)` zinc-50 `#fafafa` | Body text |
| `--primary` | zinc-950 | zinc-50 | Primary button fill |
| `--primary-foreground` | zinc-50 | zinc-950 | Text on primary |
| `--secondary` / `--muted` / `--accent` | `oklch(0.967 0.001 286.375)` zinc-100 `#f4f4f5` | `oklch(0.274 0.006 286.033)` zinc-800 `#27272a` | Subtle fills, hover fills |
| `--accent-muted` | `color-mix(in oklab, var(--accent) 50%, transparent)` | `color-mix(in oklab, var(--accent) 20%, transparent)` | List-row hover |
| `--accent-foreground` | `oklch(0.21 0.006 285.885)` zinc-900 | zinc-50 | |
| `--muted-foreground` | `oklch(0.552 0.016 285.938)` zinc-500 `#71717a` | `oklch(0.705 0.015 286.067)` zinc-400 `#a1a1aa` | Secondary text, captions |
| `--card` / `--popover` | white | `oklch(0.21 0.006 285.885)` zinc-900 `#18181b` | Raised surfaces |
| `--surface` | `oklch(0.985 0 0)` zinc-50 | zinc-900 | Code blocks, ad cards |
| `--border` / `--input` | `oklch(0.92 0.004 286.32)` zinc-200 `#e4e4e7` | border: zinc-800; input: `lab(100% 0 0 / 0.15)` | Borders |
| `--line` | `color-mix(in oklab, var(--border) 64%, var(--background))` | same formula (resolves against dark values) | **The signature hairline** (page frame, dividers) |
| `--ring` | `oklch(0.705 0.015 286.067)` zinc-400 | `oklch(0.552 0.016 285.938)` zinc-500 | Focus ring |
| `--link` | `oklch(0.488 0.243 264.376)` blue-700 `#1d4ed8` | `oklch(0.623 0.214 259.815)` blue-500 `#3b82f6` | Links (docs content) |
| `--info` | `oklch(0.623 0.214 259.815)` blue-500 | same | "New / updated" dot |
| `--success` | `oklch(0.723 0.219 149.579)` green-500 `#22c55e` | same | |
| `--destructive` | `oklch(0.577 0.245 27.325)` red-600 `#dc2626` | `oklch(0.505 0.213 27.518)` red-700 `#b91c1c` | |
| `--selection` / `--selection-foreground` | zinc-950 / zinc-50 | zinc-50 / zinc-950 | Text selection is a full inversion |
| `--dimension` | `color-mix(in oklab, oklch(70.5% 0.015 286.067) 60%, var(--background))` | `color-mix(in oklab, oklch(37% 0.013 285.805) 80%, var(--background))` | Blueprint dimension labels |
| `--dimension-foreground` | `oklch(70.5% 0.015 286.067)` | `oklch(37% 0.013 285.805)` | |
| `--code-number` | `oklch(0.24 0.01 0 / 0.3)` | `oklch(0.43 0 0)` | Code line numbers |
| `--code-highlight` | `oklch(0.49 0.18 257.61 / 0.06)` (cool blue wash) | `oklch(0.71 0.24 42.36 / 0.06)` (warm orange wash) | Highlighted code lines |

Browser chrome: `theme-color` is `#ffffff` (light) and `#09090b` (dark).

### Chart palette (grayscale ramp)

- Light: `chart-1..5` = `oklch(0.32 0 none)`, `0.41`, `0.54`, `0.71`, `0.89`
- Dark: `chart-1..5` = `oklch(1 0 none)`, `0.73`, `0.51`, `0.39`, `0.32`
- Chart tooltip, grid (`--line` formula), crosshair (zinc-400 light / `oklch(0.442 0.017 285.786)` dark) all follow the same neutral treatment.

### Rules

- Use opacity of the same token for variants (`border-muted-foreground/15`, `ring-foreground/10`, `bg-muted/50`) instead of introducing new colors.
- Dark mode is a class (`.dark` on `<html>`, via `next-themes`), declared as `@custom-variant dark (&:where(.dark, .dark *))`. Dark surfaces step up from zinc-950 page to zinc-900 cards.
- Games and canvas pieces that cannot parse `oklch()` use hex mirrors (`--dk-*`: `#ffffff/#09090b`, `#a1a1aa/#71717a`, `#3f3f46`).

---

## 3. Typography

| Role | Font | Source |
|---|---|---|
| Sans (UI + body + headings) | **Geist Sans** | `geist/font/sans` |
| Serif | Geist Serif | `geist/font/serif` |
| Mono (code, tags, metadata, labels) | **Paper Mono** (variable weight) | local `PaperMono[wght].woff2`, `display: swap` |
| Handwritten notes | Caveat 400 | Google Fonts |
| iPod component only | Chicago Kare | local, loaded on demand |

Mono feature settings: `"ss01", "zero"` (slashed zero). Body: `antialiased`, `text-rendering: optimizeLegibility`, `font-synthesis-weight: none`.

### Scale in use

| Use | Style |
|---|---|
| Profile name (h1) | `text-[2rem]/none font-medium tracking-tight` |
| Section title (`PanelTitle`) | `text-3xl font-medium tracking-tight text-balance` (30px), with a muted `text-sm` superscript count, e.g. `Components (47)` |
| Prose h2 / h3 | `text-xl` / `text-lg`, `font-medium tracking-tight text-pretty` (`md:text-balance`) |
| Panel description | `text-base text-balance text-muted-foreground`, `py-4` |
| Card title | `text-base/normal font-medium` (`text-sm` in small card) |
| Body / UI | `text-sm` (14px) is the dominant size; buttons are `text-sm font-medium` |
| Long-form description | 15px, line-height 1.6 (`.typeset-description`) |
| Timescale / meta | `0.875rem`, line-height 1.5 (`.typeset-timescale`) |
| Tags, tiny labels | `text-xs` in mono |
| Overview rows | `font-mono text-sm` |

### Long-form (`.typeset`, from shadcn/typeset)

Base `font-size 1em` (1.125em below 48rem), line-height 1.75, flow spacing `1.25em`. Headings weight 600: h1 `1.75em/1.3`, h2 `1.25em/1.4`, h3 `1.125em/1.45`, h4 `1em/1.5`; h5/h6 are muted, h6 uppercase with `0.08em` tracking. Inline code `0.85em`, background `--muted`. Blockquote has a 2px start border. Tables use tabular numerals and 1px row rules.

Prose in blog/docs (`prose-ncdai` on top of `@tailwindcss/typography`): headings medium weight, links `text-foreground` with a 30%-opacity underline that goes solid on hover (`link-underline`), inline code `rounded-md border bg-muted/50 px-1 py-px text-sm`, blockquote muted with a left line, list markers `text-xs`.

---

## 4. Layout and spacing

- **Content column:** `mx-auto md:max-w-3xl` (48rem / 768px). `<main>` has `px-2`. The header is `container`-wide only on "wide" layouts (docs).
- **Frame:** every section is bordered left and right with `border-x border-x-line`, so the column looks like a ruled sheet.
- **Header:** `sticky top-0 z-50`, height `--header-height = --spacing(15)` (3.75rem), `bg-background px-2 pt-1`. Inner bar: `border-x border-x-line pl-4 pr-2`, top and bottom full-bleed lines. Contents left to right: mark/logo, flex spacer, nav (Components, Blocks, Craft, Blog, Sponsors), vertical separator (`h-5`), command-palette trigger (`⌘K`), GitHub stars link, separator, theme toggle (ghost `icon-sm`, hotkey `D`).
- **Mobile:** bottom nav; a fixed bottom fade (`--fade-bottom-height: --spacing(24)`, gradient to background plus 1px backdrop blur) hides content under it. Hidden at `lg`.
- **Section rhythm (`Panel`):** `Panel` has full-bleed top and bottom lines; `PanelHeader` is `px-4` with a bottom line; `PanelContent` is `p-4`. Between sections sits a **stripe divider** of height `--separator-height = --spacing(8)` (2rem).
- **Grids:** component lists are 1 col, `sm:2`, `md:3`, with vertical 1px `border-line` column rules drawn on a background layer and row lines drawn with `screen-line-bottom`.
- **Anchors:** `[id]` has `scroll-mt-18`; panels use `scroll-mt-[calc(var(--header-height)+var(--separator-height))]`.
- **Spacing scale:** Tailwind default 4px base. Common values: `p-4` panels, `gap-2` and `gap-4` rows, `py-4` descriptions, `p-1` inside menus and code frames.
- **Breakpoints:** Tailwind defaults (`sm 40rem`, `md 48rem`, `lg 64rem`, `xl 80rem`). Extra: `min-[24rem]` for the avatar size, `pointer-fine` / `pointer-coarse` for input type.
- **Touch targets:** `extend-touch-target` adds `after:-inset-2` on coarse pointers.

### Signature layout utilities

| Utility | What it does |
|---|---|
| `screen-line-top` / `screen-line-bottom` | 1px `--line` rule at the top or bottom, `left: -100vw; width: 200vw; z-index: -1`, so it spans the full screen behind the column |
| `screen-dashed-line-*` | Same, dashed: `linear-gradient(to right, var(--line) 4px, transparent 2px)`, `6px 1px` repeat |
| `diagonal-stripes` | `repeating-linear-gradient(315deg, line 0 1px, transparent 0 50%)`, size `10px 10px`, line color at 56% |
| `stripe-divider` | `h-8` row filled with `diagonal-stripes` across 200vw |
| `dot-grid` | `radial-gradient(1px)` dots at 5% foreground, `8px 8px` |
| `step` | CSS counter badge: `size-6 rounded-lg bg-muted text-[0.8125rem]/6` |

---

## 5. Shape and depth

- **Radius scale:** the repo defines no `--radius` token; it relies on Tailwind v4 defaults (`md 0.375rem`, `lg 0.5rem`, `xl 0.75rem`, `2xl 1rem`). Usage: buttons and steps `rounded-lg`; inline code, icon tiles, tab indicator `rounded-md`; cards, popovers, code blocks `rounded-xl`; dialogs `rounded-2xl`; tags and avatar `rounded-full`; new-dot `rounded-sm`.
- **Depth is mostly rings, not shadows.** Cards: `shadow-xs ring-1 ring-foreground/10` (`dark:ring-border`). Menus: `shadow-md ring-1 ring-foreground/10` (`dark:ring-foreground/20`). Dialogs: `shadow-lg ring-1 ring-foreground/10`. Code frames: `inset-ring-1 inset-ring-border/64`. Avatar: `inset-ring-1 inset-ring-foreground` (`dark:inset-ring-foreground/20`).
- **Retina hairlines:** a custom `retina` variant switches some 1px borders to `0.5px` at 2x density.
- **Overlay:** `bg-black/20` (`dark:bg-black/40`).
- **Scrollbar:** 5px wide, transparent track, thumb `--border`, radius 5px (`scrollbar-width: thin` in Firefox).
- **`html`** uses `overscroll-y-none`.

---

## 6. Components

### Button (`cva`, Base UI)
Base: `rounded-lg border border-transparent text-sm font-medium transition-all`, `active:scale-[0.98]`, `focus-visible:border-ring ring-3 ring-ring/50`, disabled `opacity-50`, icons `size-4`.

| Variant | Style |
|---|---|
| default | `bg-primary text-primary-foreground hover:bg-primary/80` |
| outline | `border-border bg-background hover:bg-muted`; dark: `bg-input/30 border-input hover:bg-input/50` |
| secondary | `bg-secondary hover:bg-secondary/80` |
| ghost | `hover:bg-muted` (dark `hover:bg-muted/50`) |
| destructive | `bg-destructive/10 text-destructive hover:bg-destructive/20` (soft, not solid) |
| link | `text-primary underline-offset-3 hover:underline`, no press scale |

Sizes: `xs h-6`, `sm h-8`, `default h-9`, `lg h-10`; icon: `icon-xs size-6`, `icon-sm size-8`, `icon size-9`, `icon-lg size-10`. The "All components" CTA adds `shadow-[inset_0_0_1px] shadow-foreground/20`.

### Tag
`inline-flex rounded-full border bg-zinc-50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground`, dark `bg-zinc-900`; icons `size-3.5`.

### Icon tile
`size-6 rounded-md border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background` (`dark:ring-line`). The doubled border-plus-ring is called out in the source as a site-wide signature.

### List item (components, blocks, blog)
`flex items-center gap-2 p-4 pr-2`, hover `bg-accent-muted` with `transition-[background-color] ease-out`. A "new" or "updated" item shows a `size-1.5 rounded-sm bg-info` dot. Titles are `h3`, medium weight.

### Cards
`rounded-xl bg-card py-6 text-sm shadow-xs ring-1 ring-foreground/10`, `gap-6` (`gap-4 py-4` for size `sm`); header and content `px-6` (`px-4` small); description `text-sm text-muted-foreground`.

### Popover, dropdown, context menu
`rounded-xl bg-popover p-1 shadow-md ring-1 ring-foreground/10 duration-100`, enter: fade + `zoom-in-95` + `slide-in-from-*-2`; exit: fade + `zoom-out-95`.

### Dialog
`rounded-2xl bg-background p-6 shadow-lg ring-1`, `max-w-[calc(100%-2rem)]`, `sm:max-w-md`, `gap-6`, same 100ms fade/zoom as menus.

### Tabs
Active indicator is an absolutely positioned `rounded-md bg-white` (dark `bg-muted`) that animates `width` and `translate`, `duration-200 ease-in-out`.

### Code block
Figure: `rounded-xl bg-surface p-1 inset-ring-1 inset-ring-border/64`. `pre` has `py-4`, lines `pl-4`, mono `text-sm`. Optional title bar: `font-mono text-sm text-muted-foreground`, icons `size-4`. Syntax themes switch via `--shiki-light` / `--shiki-dark`. Line numbers are `w-16`, right-aligned, `text-code-number`. A right-edge fade overlay (`--fade-width 5rem`, `--fade-height 2.25rem`) hints at horizontal scroll. Install commands show pnpm / npm / yarn / bun tabs.

### Tooltip
Content includes a `Kbd` shortcut (for example `Toggle mode` + `D`). Hotkeys are first-class (`⌘K`, `D`).

### Profile header
Avatar is a circle `size-30` (`min-[24rem]:size-32`, `sm:size-40`) with an inset ring; two image variants swap with the theme (outline style in light, monochrome in dark). A verified badge follows the name. Taglines sit under it in a bordered row. A blueprint dimension label (`Ø160`) annotates the avatar from `lg` up.

### Metrics, testimonials, sponsors
Tabular numbers for stats; testimonials are quotes with avatar, name, role in a continuously scrolling marquee (kibo-ui); sponsors in a logo grid with tiers. GitHub contributions are a heatmap with a "Less / More" legend.

---

## 7. Motion

- **Timing:** menus and dialogs 100ms; list hover and small fades ~150-300ms; tab indicator 200ms `ease-in-out`; sidebar 200ms `linear`; one opacity transition uses 250ms with `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Press feedback:** buttons scale to `0.98` on `:active`.
- **Custom easing:** `--expo-out` is a 16-stop `linear()` approximation of an expo-out curve (`0 0%`, `0.1684 2.66%`, `0.3165 5.49%`, `0.446 8.52%` ... `1 100%`). Used for view-transition theme effects.
- **Keyframes:** `spin-ccw` (rotate `-360deg`, 6s linear, infinite), `spinner-opacity` (1 to 0.15, 1s linear, infinite).
- **Scroll-driven masks:** `scroll-fade-effect-y` and `-x` use `animation-timeline: scroll()` with registered `@property` lengths (64px mask, 2rem buffer), gated behind a `supports-timeline-scroll` variant.
- **Theme switch:** `next-themes` disables transitions during the change; the toggle icon forces its own transform transition.
- **Interactive flourishes:** the isometric logo mark follows the cursor and plays a click sound (`soundcn`); theme toggle also clicks.
- **Reduced motion:** handled case by case, not globally. Found in the footer spinner (`motion-reduce:animate-none`), the image-zoom modal (`motion-reduce:` transition-none), and the craft video (`prefers-reduced-motion` media query). Add the same guard to any new continuous animation, including the marquee **(inferred)**.

---

## 8. Iconography and imagery

- Icons: **lucide-react**, default `size-4` (`size-3` in `xs` controls, `size-3.5` in tags). The theme toggle is a custom "Dark Side" SVG at `size-3.5`.
- Brand mark, wordmark and signature are custom SVG components. Favicons are separate light and dark SVGs.
- Imagery: WebP, `rounded-xl` (`--image-radius: var(--radius-xl)`) on blog and block cards. Emoji render as Twemoji (`1em`, `vertical-align: -0.1em`).
- Company logos are small SVG/WebP marks beside the role.

---

## 9. Content patterns

- Section titles are one or two words, with a count in muted superscript: `Components (47)`, `Blocks (12)`, `Blog (14)`, `Projects (7)`, `Recognition (48)`. Each title is an anchor link with a copy-link button.
- Margin notes in the handwritten font with a hand-drawn arrow, only on wide screens with a fine pointer: "follows your cursor / click for a sound", "free to copy / yours to keep".
- Metadata is shown as label/value pairs (`Location`, `Employment Period 01.2026—`, `Duration 11m`) in mono, with tag chips for skills.
- Stack list uses numbered groups: `01 Language`, `02 Frontend`, and so on.
- Footer lists the build commit, date, registry count, typeface (Geist), stack versions, and agent-readable endpoints (`/llms.txt`, `/index.md`).

---

## 10. Accessibility and behavior

- Focus: `focus-visible` ring `ring-3 ring-ring/50` plus a ring-colored border; links get a 2px outline with 2px offset in `.typeset`.
- Forced colors: inline code gains a 1px border.
- `aria-invalid` styles are built into inputs and buttons.
- Large invisible touch targets on coarse pointers; keyboard shortcuts for theme (`D`) and search (`⌘K`).
- Decorative elements (dimension labels, margin notes, stripe dividers, fades) are `aria-hidden` or `pointer-events-none`.

---

## 11. Do and don't

**Do**
- Build with zinc tokens and opacity variants. Keep everything grayscale; let content carry the color.
- Draw structure with 1px `--line` rules and full-bleed lines, not boxes and shadows.
- Prefer `ring-1 ring-foreground/10` over heavy shadows. Use `shadow-xs` / `shadow-md` sparingly.
- Keep the column at `max-w-3xl` with `border-x border-x-line`.
- Use Geist for text and Paper Mono for anything that reads like data (tags, dates, labels, code).
- Give interactive elements a visible `:active` and `:focus-visible` state.
- Support light and dark for every new element, and write headings in sentence case.

**Don't**
- Introduce a brand accent color, gradients on surfaces, or large drop shadows.
- Use pure black text or borders darker than `--border`.
- Round everything the same: use the role-based radius scale above.
- Use emojis in code, comments, or commit messages (stated in the repo's agent guidelines).
- Rely on color alone for state.

---

## 12. Starter tokens (copy-paste)

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.141 0.005 285.823);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.967 0.001 286.375);
  --muted: oklch(0.967 0.001 286.375);
  --muted-foreground: oklch(0.552 0.016 285.938);
  --accent: oklch(0.967 0.001 286.375);
  --accent-muted: color-mix(in oklab, var(--accent) 50%, transparent);
  --card: oklch(1 0 0);
  --popover: oklch(1 0 0);
  --surface: oklch(0.985 0 0);
  --border: oklch(0.92 0.004 286.32);
  --line: color-mix(in oklab, var(--border) 64%, var(--background));
  --ring: oklch(0.705 0.015 286.067);
  --link: oklch(0.488 0.243 264.376);
  --info: oklch(0.623 0.214 259.815);
  --destructive: oklch(0.577 0.245 27.325);
  --selection: oklch(0.141 0.005 285.823);
  --selection-foreground: oklch(0.985 0 0);
  --header-height: calc(var(--spacing) * 15);
}

.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.141 0.005 285.823);
  --secondary: oklch(0.274 0.006 286.033);
  --muted: oklch(0.274 0.006 286.033);
  --muted-foreground: oklch(0.705 0.015 286.067);
  --accent: oklch(0.274 0.006 286.033);
  --accent-muted: color-mix(in oklab, var(--accent) 20%, transparent);
  --card: oklch(0.21 0.006 285.885);
  --popover: oklch(0.21 0.006 285.885);
  --surface: oklch(0.21 0.006 285.885);
  --border: oklch(0.274 0.006 286.033);
  --ring: oklch(0.552 0.016 285.938);
  --link: oklch(0.623 0.214 259.815);
  --destructive: oklch(0.505 0.213 27.518);
  --selection: oklch(0.985 0 0);
  --selection-foreground: oklch(0.141 0.005 285.823);
}

/* Full-bleed hairline behind the column */
.screen-line-top { position: relative; }
.screen-line-top::before {
  content: "";
  position: absolute; top: 0; left: -100vw; z-index: -1;
  width: 200vw; height: 1px; background: var(--line);
}
```

---

## Provenance and gaps

Read from source: `src/styles/globals.css`, `typeset.css`, `scroll-fade-effect.css`, `src/app/layout.tsx`, `src/lib/fonts.ts`, `src/config/site.ts`, `components.json`, `src/components/ui/{button,tag,card,icon-tile,typography}.tsx`, `site-header.tsx`, `theme-toggle.tsx`, the portfolio `panel.tsx`, `profile-header.tsx`, `components.tsx`, `src/app/(app)/page.tsx`, and the live page text.

Not verified:
- The page was not rendered in a browser, so computed sizes and hover states of individual homepage widgets (testimonial carousel, wallet, iPod, etc.) were not measured.
- No `--radius` variable exists in the repo, so radii come from Tailwind v4 defaults as noted in section 5.
- Reduced-motion handling was only spot-checked (three places found), not audited site-wide.
- Registry components under `src/registry/` each have their own bespoke styling and are not covered here.

The code is MIT-licensed, but the author's name and logo fall under a separate trademark policy (see `TRADEMARK.md`). Reuse the system, not the branding.
