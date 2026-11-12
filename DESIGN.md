# Portfolio design guide

This document describes the implemented visual direction for Shreyas Nikam's portfolio. It is the source of truth for future interface changes.

## Product character

The site is a personal developer portfolio: quiet, editorial, and approachable. It should feel like a polished personal space rather than a component gallery or a dense dashboard.

- Content and readability come first.
- The visual system is mostly neutral, but intentional artwork and technology icons may retain their natural color.
- Motion is brief and optional; it should never obstruct reading or navigation.
- Use a compact serif display face for identity moments and Geist for all other reading and interface text.

## Layout

- Desktop content is centered and capped at `max-w-4xl`.
- The desktop content column may use fine vertical rules to create a subtle editorial frame.
- Mobile removes the vertical frame entirely. It uses full available width with `20px` side padding.
- The primary navigation is fixed at the top. Desktop shows inline links; mobile shows only the name, theme toggle, and menu button.
- A section is a readable group of content, not a card by default. Use generous vertical spacing (`44px` on small screens; `56px` or more on larger screens).
- Do not use elements wider than the viewport. Full-width rules must be sized with `100vw` and centered with `left: 50%` plus `translateX(-50%)`.

## Homepage hero

The homepage starts with a personal visual introduction:

1. A wide pixel-art landscape banner, sourced from `assets/1130469.png`.
2. A small availability badge in the bottom-right of the banner.
3. The established introduction beneath it: role/location, “Hi, I’m Shreyas Nikam.”, short bio, social links, and the profile photo aligned at the right on desktop.

The profile photo remains in full color. Do not introduce a duplicate overlapping name/profile card below the banner.

### Hero typography

- The site name in the navigation and the hero greeting use `Instrument Serif`.
- Hero greeting: `2.75rem` on mobile, `3.75rem` (`text-6xl`) from the `sm` breakpoint.
- Body text is Geist Sans with comfortable `1.75–2rem` line-height for longer introduction copy.
- Metadata uses Geist Mono at a small size with restrained letter spacing.

## Color and surfaces

### Tokens

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--background` | soft gray `#f3f4f6` | near-black `#100f0f` | page background |
| `--foreground` | `#111111` | `#ededed` | primary text |
| `--muted` | zinc-100 | zinc-800 | subtle fills |
| `--muted-foreground` | zinc-500 | zinc-400 | secondary text |
| `--border` | dark text at low opacity | white at low opacity | separators and controls |
| `--line` | dark text at very low opacity | white at very low opacity | page rules |

The default interface should remain neutral. The pixel-art banner is deliberately colorful and should not be desaturated. Brand/technology logos may keep their recognizable colors at small scale.

### Surfaces

- Standard content sits directly on the page background.
- Project cards and contribution panels can use a light glass surface and a fine border.
- Avoid large opaque containers around every section.
- Shadows should be soft and sparse. Borders and spacing should do most of the structural work.

## Sections and components

### Section headings

- Optional eyebrow: Geist Mono, 12px, muted, e.g. `// selected work`.
- Heading: Geist Sans, medium weight, `2rem` on mobile and 30px on larger screens.
- Use simple divider lines or low-contrast striped separators between major sections.

### Skill and technology tags

- Tags wrap naturally; they must never cause horizontal scrolling.
- Icons are small and may use their official colors.
- Keep labels readable and use rounded, lightly bordered controls.

### Experience

- Company and role form the primary reading order.
- Period and location sit to the right on desktop and below on mobile.
- Details are optionally expanded from a compact disclosure control.

### Projects

- Each project is a clearly clickable panel with title, description, technology tags, and external link.
- On small screens, all information stacks vertically.
- Descriptions should remain legible at 14–15px with a relaxed line height.

### GitHub contributions

- The calendar must fit within the content width on phones.
- Do not expose a horizontal scrollbar for the calendar or the page. Scale the SVG to its container instead.

## Responsive rules

The mobile layout is a first-class layout, not a compressed desktop page.

- Breakpoint for mobile navigation: `900px`.
- Content-column frame becomes visible from `640px` upward only.
- At `640px` and below, use `20px` horizontal page padding, no vertical column borders, smaller section dividers, and normal text wrapping.
- The banner is full-bleed inside the mobile page shell and `13rem` tall; it becomes `16rem` at `sm` and above.
- The availability label stays inside the banner, with small text and safe insets.
- Do not use fixed or minimum widths for content. In particular, avoid `min-width` values on charts, SVGs, card grids, and loading placeholders.
- Hide horizontal overflow only as a safeguard; fix overflow at its source.

## Accessibility and behavior

- Every interactive item has an accessible name and a visible keyboard focus state.
- External links use `target="_blank"` with `rel="noreferrer"`.
- Honor `prefers-reduced-motion`; the hero reveal is optional and should not change the final layout.
- Theme choice is stored in local storage and synchronized by toggling `.dark` on the document root.
- Decorative rules, background patterns, and the availability dot are not meaningful content and should be hidden from assistive technology where appropriate.

## Do and don't

**Do**

- Preserve the original personal introduction layout when extending the hero.
- Keep mobile widths, text wrapping, and touch targets under continuous review.
- Use the banner as the one prominent visual moment on the homepage.
- Prefer a clean hierarchy and whitespace over decorative framing.

**Don't**

- Turn the portfolio into a copied component-registry aesthetic.
- Add duplicate identity blocks, overlapping cards, or desktop-only decoration on mobile.
- Desaturate the profile photo or the chosen banner artwork.
- Introduce horizontal scrolling for navigation, tags, charts, or page content.
