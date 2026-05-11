# Echo Template — Behaviors

JavaScript execution against the live site was blocked by a Chrome extension conflict on this machine, so dynamic behavior was inferred from:
- HTML structure (`page.html`)
- Compiled CSS (`styles.pretty.css`) — Tailwind v4 + tw-animate-css utility classes are present in the bundle
- Accessibility tree (`read_page` output)

## Confirmed from CSS

### Theme switching
- `.dark` class toggle on `<html>` switches between light/dark token sets.
- A button "Toggle theme" exists in the header.
- Standard shadcn theme switching (likely `next-themes`).

### Page transitions
- `html.page-transition { scroll-behavior: auto }` — implies route transitions use a `.page-transition` class to suppress smooth scroll during nav.
- No `.lenis` or smooth-scroll library class markers detected — using native scroll.

### Reduced motion
- `@media (prefers-reduced-motion: reduce)` rule present — animations are conditioned on user preference.

### Animations available in bundle (`tw-animate-css`)
- Enter/exit transforms (`--tw-enter-*`, `--tw-exit-*`) — fade, slide, scale, rotate
- Standard transition tokens: `--default-transition-duration: .15s`, `--default-transition-timing-function: cubic-bezier(.4,0,.2,1)`

## Inferred behaviors

### Promo banner
- Has a close button — clicking should dismiss it.
- Implement with local `useState` (no persistence requested by user).

### Header
- Sticky to top, gains a subtle background/blur after scroll past hero. Cannot confirm threshold without JS; default to `sticky top-0 z-50` with a constant translucent backdrop-blur background — matches the visible style.

### Project cards & article cards
- Hover state: subtle scale or shadow change on image; underline on title. Standard portfolio hover.
- Implement with `group` + `group-hover:` Tailwind utilities.

### GitHub stars badge
- Displays "11.2k" — static value in the markup. No live fetch.

## NOT done (deferred)

- Live scroll-position threshold for header style change — using a static transparent backdrop-blur instead.
- Per-element hover/transition timings extracted from `getComputedStyle()` — using sensible Tailwind defaults (`transition-colors duration-200`).
- Reduced-motion specific rules — relying on `tw-animate-css` package's built-in handling.

These can be tightened up in Phase 5 (Visual QA) once the page is viewable side-by-side.
