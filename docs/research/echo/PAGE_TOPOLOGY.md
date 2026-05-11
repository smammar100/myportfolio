# Echo Template — Page Topology

Source: `https://echo-nextjs-template.vercel.app/` (single-page portfolio template, App Router).

Page width: 1440px viewport tested; content appears centered with bounded `max-width` (likely `max-w-md`/`max-w-2xl`-class column based on the narrow, single-column portfolio aesthetic).

## Visible sections, top to bottom

| # | Section | Component name | Interaction model | Notes |
|---|---|---|---|---|
| 0 | Promo banner (dismissible) | `PromoBanner` | click-to-dismiss | "Purchase this theme on shadcnblocks.com" + Get Template + X close |
| 1 | Sticky nav / header | `SiteHeader` | static + theme-toggle click | Home / Projects / Profile / Articles + theme toggle + X (Twitter) + GitHub stars badge "11.2k" |
| 2 | Hero | `HeroSection` | static | John's avatar + "Hi, I'm John" + tagline + email button |
| 3 | Selected work | `SelectedWorkSection` | static (card hover) | 4 project cards, "View all →" link |
| 4 | My stack | `StackSection` | static | 8 tech logo tiles in a row/grid |
| 5 | About | `AboutSection` | static | 3 paragraphs of bio + 3 polaroid-style images with emoji captions |
| 6 | Experience | `ExperienceSection` | static | 4 job entries with company/role/dates + "Skills" sub-list (11 items) |
| 7 | Latest writing | `WritingSection` | static (card hover) | 3 article preview cards, "Read all →" link |
| 8 | Footer | `SiteFooter` | static | Just `hi@john.me` link |

## Layout pattern

- Single-column, narrow content area, centered on viewport.
- Sections separated by generous vertical spacing.
- Each section starts with a small label/heading and contains a list/grid of items.
- The vibe is intentionally minimal/text-forward — typical "indie maker portfolio".

## Z-index / overlays

- Banner (top): probably `position: relative` at the top of the flow OR `position: sticky top-0` until dismissed. Treating as `position: relative` for first pass.
- Header: likely sticky-top after scroll (not confirmed without JS) — treating as `sticky top-0 z-50` is the safe default for portfolio templates of this style.

## Content references (real strings from the site)

### Hero
- Heading: "Hi, I'm John"
- Tagline: "Full-stack developer who loves building things from idea to launch."
- Email: `hi@john.me`

### Selected work cards
1. **Echo UI v3** — Component library & design system — `/projects/echo-ui` — `/images/projects/echo-ui/cover.webp`
2. **JustOS** — Productivity OS for Creators — `/projects/justos` — `/images/projects/justos/cover.svg`
3. **Happy Stats** — Lightweight analytics dashboard — `/projects/happy-stats` — `/images/projects/happy-stats/cover.webp`
4. **Cactus Plant** — Realtime collaboration framework — `/projects/cactus-plant` — `/images/projects/cactus-plant/cover.webp`

### About paragraphs (real text from page)
- "I started coding out of curiosity — building small browser games and landing pages — and over time grew into…" (truncated in a11y tree)
- "My stack includes TypeScript, React, Next.js, Node, and PostgreSQL, but I love exploring new technologi…"
- "Outside of coding, I enjoy writing, contributing to open source, and teaching others what I've learn…"

### About images
- `/images/about/coding.webp` — alt "Person coding on laptop" — emoji 👨‍💻
- `/images/about/bridge.webp` — alt "Golden Gate Bridge" — emoji 🏔️
- `/images/about/dog.webp` — alt "French Bulldog"

### Experience
- Cactus Plant — Full-stack developer — 2024 - Present — https://cactusplant.com
- Happy Stats — Full-stack developer — 2023 - 2024 — https://happystats.io
- JustOS — Frontend developer — 2021 - 2023 — https://justos.dev
- Freelance — Frontend developer — 2019 - 2021 — https://upwork.com

### Skills (Experience section)
- React / Next.js
- TypeScript / JavaScript (ES6+)
- State management (Zustand, Redux, Context)
- Responsive design & accessibility
- Motion & interaction (Framer Motion, GSAP)
- API integration & data fetching
- Node.js / Express / Fastify
- RESTful & GraphQL API design
- PostgreSQL / Prisma ORM
- Authentication & authorization
- WebSockets & real-time systems

### Latest writing
1. **Scaling a side project to 10k users** — Nov 4, 2025 — `/articles/scaling-side-project`
   > "What started as a weekend idea slowly turned into a product used by thousands. Here's what I learned…"
2. **Why I still love writing vanilla JavaScript** — Nov 1, 2025 — `/articles/vanilla-javascript`
   > "Even with frameworks evolving every month, I keep coming back to plain JavaScript. There's something…"
3. **Thinking in components** — Oct 25, 2025 — `/articles/thinking-in-components`
   > "Building modern interfaces isn't about pages anymore — it's about systems. Thinking in components ch…"

## Assets downloaded to `public/`

```
public/images/home/avatar.webp
public/images/projects/echo-ui/cover.webp
public/images/projects/justos/cover.svg
public/images/projects/happy-stats/cover.webp
public/images/projects/cactus-plant/cover.webp
public/images/about/coding.webp
public/images/about/bridge.webp
public/images/about/dog.webp
public/seo/favicon.ico
public/seo/favicon.svg
public/seo/favicon-96x96.png
public/seo/apple-touch-icon.png
```

## Stack section — 8 icons

The accessibility tree shows 8 listitems with no labels — these are icon-only tech logos. Inferred from About text ("TypeScript, React, Next.js, Node, and PostgreSQL"). The 20 inline SVGs in the rendered HTML include:
- Logo (nav)
- Theme toggle icons (sun, moon)
- X (Twitter) social icon
- GitHub star icon
- 8 stack icons (TS, React, Next.js, Tailwind, Node, Postgres, Prisma, GraphQL — best guess)
- Arrows on "View all" / "Read all" links

We rebuild these as simple-icons SVGs (or lucide where applicable). Not pixel-identical to the originals, but visually equivalent.
