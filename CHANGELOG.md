# Changelog

All notable changes to this portfolio are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project loosely adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- **Elevation system** from [fluidfunctionalism/elevated](https://www.fluidfunctionalism.com/r/elevated.json) — 8-level surface + shadow ladder via CSS custom properties, with automatic light/dark adaptation.
  - `src/lib/surface-context.tsx` — `useSurface()` hook + `SurfaceProvider` React context for tracking substrate level across nested components.
  - `src/lib/surface-classes.ts` — Static lookup maps (`SURFACE_BG`, `SURFACE_SHADOW`, `surfaceClasses()`) required because Tailwind v4 cannot scan template-literal class names.
  - `src/lib/elevated.tsx` — `<Elevated offset={N}>` component that reads the current substrate, applies the correct `bg-surface-N shadow-surface-N` classes, and re-provides the new level to descendants.
  - `globals.css` — `--surface-1..8` and `--shadow-1..8` token definitions for both light (`#FAFAFA → #FFFFFF`, multi-layer drop shadow at 6% black) and dark (`#171717 → #484848`, inset top-highlight + ring + layered drop).

### Changed
- All card surfaces migrated from `bg-card border border-border` (flat) to `bg-surface-2 shadow-surface-2` (elevated). Affected: Latest writing list, Articles page list, About manifesto card, Project overview box, goal cards, tag pills, and secondary demo button.
- Project page TOC popover now inverts against the page background — black card with white text on light pages, white card with black text on dark pages. Achieved by swapping `bg-card / text-card-foreground` (matches page) for `bg-primary / text-primary-foreground` (inverted in the design tokens). Internal hover/active overlays, borders, and muted text use `primary-foreground/X` so they adapt automatically.

### Fixed
- Project page TOC was previously hardcoded to `bg-neutral-900` + `text-white` and stayed dark in light mode. It now responds to theme changes.

## [0.1.0] — 2026-05-11

First public iteration of the portfolio — layout cloned from the Echo template, then layered with custom motion and texture.

### Added
- `/articles` route — "Articles & notes" headline + chronological card list (four posts, newest first).
- Fourth article entry — "The cost of over-engineering" (Oct 20, 2025) — to match the reference design 1:1.
- **Sliding-selection toolbar primitive** at [`src/components/ui/toolbar.tsx`](src/components/ui/toolbar.tsx) — generic horizontal/vertical pill with a white highlight that slides between active items using `mix-blend-mode: difference` and Web Animations API keyframes (squash-and-stretch curve). Full keyboard support: Arrow / Home / End move focus, slide the pill, and route via `next/navigation`.
- **NavToolbar** at [`src/components/nav-toolbar.tsx`](src/components/nav-toolbar.tsx) — site-wide top navigation wired to `usePathname()` with prefix matching (so `/projects/<slug>` keeps "Projects" lit). Aligned to the left edge of the content column; theme toggle sits on the right edge of the same row.
- **Curly cursor trail** at [`src/components/cursor-trail.tsx`](src/components/cursor-trail.tsx) — fixed canvas with a 40-point spring-physics chain (spring 0.4, friction 0.5), drawn as a tapered quadratic-Bézier curve. Lissajous intro motion runs until the first mouse move. Stroke color reads `--foreground` and re-reads on theme change via a `MutationObserver` on `<html>.class`.
- **Animated static noise overlay** at [`src/app/globals.css`](src/app/globals.css) — `.noise-bg` rule using an inline `<feTurbulence>` SVG data URL (no external image dependency). 10-keyframe `steps(1)` jitter for the snappy "TV static" feel. `mix-blend-mode: multiply` on light, `screen` on dark.
- **View-transition theme toggle** — radial reveal from the click point when switching light/dark, via the View Transitions API.
- `FolderIcon` and `FileTextIcon` to [`src/components/icons.tsx`](src/components/icons.tsx) for the nav.
- New project README documenting signature components, stack, and implementation notes.

### Changed
- Site-wide navigation replaced from `SidebarNav` (left-fixed icon column) to `NavToolbar` (horizontal pill at the top of the content column). The toolbar is the only nav across `/`, `/about`, `/articles`, and `/projects/<slug>`.
- Toolbar scale bumped from 1× to 1.25× (font-size `1rem` → `1.25rem`). Internal dimensions switched from `rem` to `em` so the highlight and JS-driven position calculations scale together.
- Page top padding rebalanced to clear the now-top-aligned toolbar (no more `lg:pl-40` for the removed vertical nav).
- Cursor trail coordinates switched from `pageX/pageY` (document-relative) to `clientX/clientY` (viewport-relative) so the trail draws correctly at any scroll position. The source demo locked body scroll with `overflow: hidden`, which we removed.

### Removed
- `src/components/sidebar-nav.tsx` — replaced by the toolbar nav.
- `src/components/site-header.tsx` — was unused; removed to avoid drift.

### Accessibility
- All animated effects (cursor trail, noise jitter, native-cursor hide) respect `prefers-reduced-motion: reduce` — animations pause, the trail unmounts, and the OS cursor returns.
- Toolbar items use `role="toolbar"`, `aria-pressed` on the active item, and keyboard navigation matching ARIA APG guidance.

### Verified
- `npm run typecheck` and `npm run lint` pass clean.
- Manual smoke test in the preview browser: all four routes render with the toolbar highlight on the correct item, the pill slides smoothly between routes, the cursor trail draws above/below the fold on long pages, the noise overlay is visible in both light and dark modes, and dark-mode toggle triggers the radial reveal transition.

[Unreleased]: ./
[0.1.0]: ./
