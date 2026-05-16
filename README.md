# Portfolio

A design-engineering portfolio built on Next.js 16 with a focus on motion, texture, and small interactive details. Animated noise overlay, a satisfying spring-physics cursor trail, and a navigation pill that slides between sections with a squash-and-stretch — all running together at full frame rate.

```
Next.js 16 · React 19 · Tailwind v4 · TypeScript strict
```

---

## What's inside

**Pages**
- `/` — Home: hero, selected work, stack, about, experience, latest writing, contribution graph
- `/about` — Long-form bio with manifesto, tools, and now-listening
- `/articles` — Writing index
- `/projects/[slug]` — Per-project deep dives with table of contents

**Signature pieces**

| Component | What it does | Where |
| --- | --- | --- |
| Sliding-selection toolbar | Dark pill with icon buttons. A white highlight slides between the active route using `mix-blend-mode: difference` + Web Animations API keyframes (squash on the way out, stretch on the way in). | [`src/components/ui/toolbar.tsx`](src/components/ui/toolbar.tsx), [`src/components/nav-toolbar.tsx`](src/components/nav-toolbar.tsx) |
| Curly cursor trail | 40-point chain. Each point chases the previous with spring (0.4) + friction (0.5), drawn as a tapered quadratic-Bézier curve on a fixed canvas. Lissajous intro motion until you move the mouse. | [`src/components/cursor-trail.tsx`](src/components/cursor-trail.tsx) |
| Animated static noise | Inline `<feTurbulence>` SVG, repeated and jittered with a 10-keyframe `steps(1)` animation — the snappy "TV static" feel without an external asset. Multiply blend on light, screen on dark. | [`src/app/globals.css`](src/app/globals.css) — `.noise-bg` |
| View-transition theme toggle | Radial reveal from the click point when switching light/dark, via the View Transitions API. | [`src/components/nav-toolbar.tsx`](src/components/nav-toolbar.tsx) — `ThemeToolbarToggle` |

All of the above respect `prefers-reduced-motion` — animations pause, the cursor trail unmounts, and the native pointer comes back.

---

## Stack

- **Framework** — Next.js 16 (App Router), React 19, TypeScript (strict, no `any`)
- **Styling** — Tailwind CSS v4 with oklch design tokens, `cn()` from `clsx + tailwind-merge`
- **UI primitives** — shadcn/ui (Base UI + Radix)
- **Theming** — `next-themes` with class strategy
- **Fonts** — Funnel Sans (Google Fonts)
- **Deployment** — Vercel-ready

No client-side state library, no animation library — every effect here is hand-written DOM/canvas/CSS.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

### GitHub contribution graph

The footer renders a **live** GitHub contribution calendar (monochrome —
shades of black on light mode, shades of white on dark mode) from the
official GitHub GraphQL API. It needs a Personal Access Token:

1. Create one at **https://github.com/settings/tokens** — a classic token
   with **no scopes** is enough for public contribution data.
2. Copy `.env.example` → `.env.local` and paste the token:

   ```bash
   GITHUB_TOKEN=ghp_your_token_here
   ```

3. For production, add the token as an environment variable on your host:
   - **Vercel** → Project → Settings → Environment Variables
   - **Netlify** → Site configuration → Environment variables

   The code accepts **either** `GITHUB_TOKEN` *or* `GITGRAPH` as the
   variable name.

The account is set via `profile.githubUsername` in `src/lib/site-data.ts`.
Data is fetched server-side and cached for 12h (`unstable_cache`). If the
token is missing or the request fails, the footer **gracefully degrades** to
just the email link — the site never breaks.

Other scripts:

```bash
npm run build     # production build
npm run lint      # eslint
npm run typecheck # tsc --noEmit
npm run check     # lint + typecheck + build
```

---

## Project structure

```
src/
  app/
    page.tsx              # /
    about/page.tsx        # /about
    articles/page.tsx     # /articles
    projects/[slug]/      # /projects/<slug>
    globals.css           # design tokens, toolbar styles, noise, cursor:none rules
    layout.tsx            # root layout — mounts <CursorTrail /> + .noise-bg
  components/
    ui/toolbar.tsx        # sliding-selection toolbar primitive
    ui/button.tsx         # shadcn button
    nav-toolbar.tsx       # top-aligned nav + theme toggle
    cursor-trail.tsx      # canvas spring-physics trail
    hero-section.tsx
    selected-work-section.tsx
    stack-section.tsx
    about-section.tsx
    experience-section.tsx
    writing-section.tsx
    contribution-graph.tsx  # presentational GitHub calendar grid
    site-footer.tsx         # async — fetches + renders the contribution graph
    theme-provider.tsx
    icons.tsx             # all SVG icons inline as React components
  lib/
    site-data.ts          # profile, navLinks, projects, articles
    about-data.ts         # about-page content
    project-data.ts       # per-project content
    github.ts             # server-only cached GitHub GraphQL fetcher
    utils.ts              # cn()
  types/
    portfolio.ts          # shared interfaces
public/
  images/                 # photos, project covers, avatars
  seo/                    # favicons, OG images, webmanifest
.env.example              # GITHUB_TOKEN template (copy → .env.local)
```

---

## Notes on the details

**Active-route detection** — the toolbar reads `usePathname()` and matches by prefix, so `/projects/echo-ui` keeps the "Projects" pill lit. Keyboard navigation (Arrow / Home / End) moves focus, slides the pill, and routes via `router.push()`.

**Theme-aware canvas** — the cursor trail reads `getComputedStyle(document.documentElement).getPropertyValue("--foreground")` and re-reads it via a `MutationObserver` watching `<html>.class`, so switching themes instantly flips the trail color (black ↔ off-white) without a remount.

**Coordinate space** — the trail canvas is `position: fixed`, so trail points are stored in **viewport coordinates** (`clientX/clientY`), not document coordinates. This keeps the trail visible at any scroll position on long pages.

**Noise without dependencies** — the static-noise PNG from the original tutorial is replaced with an inline SVG `<feTurbulence>` filter encoded as a data URL. Zero network requests, ~270 bytes inline.

**Live contribution graph, token stays server-side** — `src/lib/github.ts` is marked `import "server-only"` and reads the token (`GITHUB_TOKEN` or `GITGRAPH`) only on the server. The async `SiteFooter` awaits it and passes the resolved grid (dates/counts/levels) as serializable props to the presentational `ContributionGraph`, so the token never reaches the client bundle. The GraphQL call is a POST (not auto-cached by Next's fetch), so it's wrapped in `unstable_cache` keyed by username with a 12h revalidate.

---

## Credits

Design-engineering ideas borrowed and rebuilt from:
- Toolbar sliding-selection — Ksenia Kondrashova's *Toolbars with Sliding Selection*
- Curly cursor trail — Ksenia Kondrashova's *[Coding an Interactive (and Damn Satisfying) Cursor](https://dev.to/uuuulala/coding-an-interactive-and-damn-satisfying-cursor-7-simple-steps-2kb-of-code-1c8b)*
- Animated noise — *CSS-Only Animated Static Noise Background*
- Layout & content scaffold — [echo-nextjs-template](https://echo-nextjs-template.vercel.app)

---

## License

MIT
