import type { ProjectDetail } from "@/types/portfolio";

export const projectDetails: Record<string, ProjectDetail> = {
  "echo-ui": {
    slug: "echo-ui",
    title: "Echo UI v3",
    tagline:
      "A component library and design system for indie developers who need ship-ready primitives without the framework lock-in.",
    cover: "/images/projects/echo-ui/cover.webp",
    demoUrl: "https://echo-ui.example.com",
    version: "v3.0.0",
    platform: "Web — React 19",
    roles: ["Design", "Engineering"],
    client: "Personal project",
    services: ["Design Systems", "Component Engineering", "Documentation"],
    deliverables: ["React component library", "Token system", "Docs site"],
    year: "2025",
    metrics: [
      { value: "40+", label: "Production primitives" },
      { value: "0kb", label: "Runtime styling" },
      { value: "v3", label: "Major releases shipped" },
    ],
    pullQuote: {
      quote:
        "Behavior should be portable and testable; styling should be opt-in and easy to override for any consumer.",
      attribution: "Echo UI design principles",
    },
    overviewSummary:
      "Echo UI started as a few utilities I kept rewriting across side projects and grew into a full design system used in production by a handful of small teams.",
    team: "Solo",
    overviewDetail:
      "v3 was a ground-up rewrite focused on three things: tokens that compose cleanly with Tailwind v4, headless behavior built on Base UI, and zero-runtime styling. Every primitive ships with full keyboard navigation, focus management, and a documented set of states so consumers don't have to reverse-engineer them.",
    goals: [
      {
        title: "Tokens, not classes",
        body: "Treat color, spacing, and radius as semantic tokens that compose, instead of memorizing a 200-class utility soup.",
      },
      {
        title: "Headless first, styled second",
        body: "Behavior should be portable and testable; styling should be opt-in and easy to override for any consumer.",
      },
      {
        title: "No magic at runtime",
        body: "All variants resolve at build time. The runtime footprint is just React and a CSS file.",
      },
    ],
    sections: [
      {
        id: "primitives",
        title: "Primitives",
        items: [
          {
            title: "Button & ButtonGroup",
            body: "Six size variants, six visual variants, full focus-visible support, and inline icon slots that auto-pad correctly.",
          },
          {
            title: "Dialog & Popover",
            body: "Built on Base UI with focus traps, scroll locking, and exit animations that respect prefers-reduced-motion.",
          },
          {
            title: "Form controls",
            body: "Inputs, selects, checkboxes, and radio groups that share the same border, focus, and error states by default.",
          },
        ],
      },
      {
        id: "tokens",
        title: "Design tokens",
        items: [
          {
            title: "Semantic color layer",
            body: "Background, foreground, primary, muted, accent, destructive, success — each with a paired foreground token for guaranteed contrast.",
          },
          {
            title: "Dark mode as a class",
            body: "No theme provider required. Toggle a class on the root and every token flips. Works with SSR without layout shift.",
          },
        ],
      },
      {
        id: "docs",
        title: "Documentation",
        items: [
          {
            title: "Live MDX playgrounds",
            body: "Every component has an editable example next to the API table. Edits compile instantly via Sandpack.",
          },
          {
            title: "Recipe library",
            body: "Composite patterns — command menus, multi-step forms, segmented tab bars — documented as full source snippets.",
          },
        ],
      },
    ],
    conclusion:
      "v3 is stable and the most-used release to date. v4 will likely lean further into RSC-friendly patterns and trim the client bundle.",
  },

  justos: {
    slug: "justos",
    title: "JustOS",
    tagline:
      "A keyboard-first productivity surface for creators — task list, calendar, and notes living in one window with one input.",
    cover: "/images/projects/justos/cover.svg",
    demoUrl: "https://justos.example.com",
    version: "v0.9 beta",
    platform: "Desktop — macOS & Windows",
    roles: ["Design", "Engineering"],
    client: "Self-initiated",
    services: ["Product Design", "Desktop Engineering"],
    deliverables: ["macOS & Windows app", "Global command bar"],
    year: "2025",
    metrics: [
      { value: "1", label: "Window, one input" },
      { value: "0", label: "Notification nags" },
      { value: "2", label: "Calendar providers" },
    ],
    pullQuote: {
      quote: "The app's job is to disappear once the work starts.",
      attribution: "JustOS product principle",
    },
    overviewSummary:
      "JustOS is an attempt to undo the mode-switching tax of running separate apps for calendar, tasks, and notes.",
    team: "Solo",
    overviewDetail:
      "Every productivity app I tried split my attention. Calendar in one tab, tasks in another, scratch notes in a third. JustOS folds those into a single Electron surface with one global command bar — every action, from scheduling a meeting to filing a note, starts with the same keystroke.",
    goals: [
      {
        title: "One input, every action",
        body: "Anything I want to do should start by typing. No mouse-hunting for the right button.",
      },
      {
        title: "Keyboard-native, not keyboard-tolerant",
        body: "Shortcuts are the primary interface; the mouse is a fallback, not the default.",
      },
      {
        title: "Calm by default",
        body: "No notification dots, no streaks, no nudges. The app's job is to disappear once the work starts.",
      },
    ],
    sections: [
      {
        id: "command-bar",
        title: "Command bar",
        items: [
          {
            title: "Task creation",
            body: "Natural-language parsing pulls dates, tags, and projects out of a single line — 'review pitch deck friday 2pm #work' becomes a scheduled task in one keystroke.",
          },
          {
            title: "Event creation",
            body: "Same parser, different output — typing a colon switches the command bar from task mode to calendar mode without a click.",
          },
          {
            title: "Recurring patterns",
            body: "Plain-English recurrence ('every other tuesday', 'last friday of the month') expands into ICS-compatible rules.",
          },
        ],
      },
      {
        id: "sidebar",
        title: "Sidebar",
        items: [
          {
            title: "Task view",
            body: "Grouped by project, sortable by due date or priority. Drag to reschedule, type to filter, hit space to mark done.",
          },
          {
            title: "Agenda view",
            body: "Today, this week, and the next two weeks rendered as a single scrollable column with tasks pinned to their date.",
          },
        ],
      },
      {
        id: "settings",
        title: "Settings",
        items: [
          {
            title: "Calendar accounts",
            body: "Connect Google and iCloud calendars; each shows in a customizable color and can be toggled on or off independently.",
          },
          {
            title: "Tag management",
            body: "Tags are scoped per workspace, support emoji aliases, and can be merged or split without losing history.",
          },
        ],
      },
    ],
    conclusion:
      "JustOS is in private beta. The roadmap is short: better calendar sync, a mobile companion for quick capture, and richer scripting via a built-in JS sandbox.",
  },

  "happy-stats": {
    slug: "happy-stats",
    title: "Happy Stats",
    tagline:
      "Lightweight, cookie-free analytics that fits in a single script tag — for indie sites that just need to know what's working.",
    cover: "/images/projects/happy-stats/cover.webp",
    demoUrl: "https://happystats.example.com",
    version: "v1.4.0",
    platform: "Web SaaS",
    roles: ["Design", "Engineering"],
    client: "Indie SaaS",
    services: ["Product Design", "Full-stack Engineering"],
    deliverables: ["Analytics dashboard", "<1kb tracking script"],
    year: "2024",
    metrics: [
      { value: "<1kb", label: "Tracking script" },
      { value: "0", label: "Cookies set" },
      { value: "2 yrs", label: "Live & profitable" },
    ],
    pullQuote: {
      quote:
        "Open the dashboard and the answer should be visible without scrolling or clicking.",
      attribution: "Happy Stats design goal",
    },
    overviewSummary:
      "An analytics product for people who don't care about funnels, cohorts, or session replay — they just want to know if today is up or down.",
    team: "Solo",
    overviewDetail:
      "Most analytics dashboards bury the answer to 'how did we do this week' under fifteen widgets. Happy Stats inverts that: the dashboard is one chart, one table, and a daily summary. Everything else is hidden behind explicit drills, and nothing requires cookie consent because the script is fingerprint-free.",
    goals: [
      {
        title: "One screen, one answer",
        body: "Open the dashboard and the answer should be visible without scrolling or clicking.",
      },
      {
        title: "No cookies, ever",
        body: "Visitor counting uses a daily-rotated hash of IP + user-agent. No persistent identifier means no banner.",
      },
      {
        title: "Sub-1kb script",
        body: "The tracking script is a single function compressed under 1kb. Loads asynchronously, no blocking.",
      },
    ],
    sections: [
      {
        id: "dashboard",
        title: "Dashboard",
        items: [
          {
            title: "The one chart",
            body: "Pageviews and unique visitors over a configurable range, with a small comparison line for the same range one period back.",
          },
          {
            title: "Top sources",
            body: "Referrers, search engines, and direct, ranked and clickable to filter the chart in place.",
          },
          {
            title: "Top pages",
            body: "Path-grouped pageviews with bounce rate and average time on page — the only secondary metrics on the screen.",
          },
        ],
      },
      {
        id: "tracking",
        title: "Tracking",
        items: [
          {
            title: "Single-tag install",
            body: "Drop one script tag in your head. SPA navigations are detected automatically; no manual route hooks.",
          },
          {
            title: "Custom events",
            body: "An optional `hs('event', name, props)` call for tracking signups, button clicks, or anything else you care about.",
          },
        ],
      },
      {
        id: "privacy",
        title: "Privacy",
        items: [
          {
            title: "EU data residency",
            body: "All events are processed and stored in eu-west; no data leaves the region.",
          },
          {
            title: "Public dashboards",
            body: "Optional read-only public links if you want to show transparency without inviting anyone to the admin.",
          },
        ],
      },
    ],
    conclusion:
      "Happy Stats has been live for two years and runs profitably on a single VPS. Next up: a self-hostable build for users who want to keep everything in their own infrastructure.",
  },

  "cactus-plant": {
    slug: "cactus-plant",
    title: "Cactus Plant",
    tagline:
      "A realtime collaboration framework — the missing layer between a websocket and a CRDT, with batteries included for product engineers.",
    cover: "/images/projects/cactus-plant/cover.webp",
    demoUrl: "https://cactusplant.example.com",
    version: "v2.1.0",
    platform: "Server (Node) + Client (TS)",
    roles: ["Architecture", "Engineering"],
    client: "Open source",
    services: ["Architecture", "Systems Engineering"],
    deliverables: ["Realtime framework", "Typed client + server", "React hooks"],
    year: "2024",
    metrics: [
      { value: "3+", label: "Production apps" },
      { value: "16ms", label: "Cursor throttle" },
      { value: "100%", label: "Typed end-to-end" },
    ],
    pullQuote: {
      quote:
        "Edits made offline merge cleanly when the client reconnects; conflicts surface as a typed result, not a thrown exception.",
      attribution: "Cactus Plant offline model",
    },
    overviewSummary:
      "Cactus Plant exists because every realtime feature I've shipped reinvented the same primitives — presence, document sync, conflict resolution, optimistic UI.",
    team: "Solo with occasional contributors",
    overviewDetail:
      "The library wraps Yjs with an opinionated server, a typed client, and a small set of React hooks. It handles authentication, room sharding, presence broadcasting, and offline reconciliation, so the consuming app can focus on what the document actually contains.",
    goals: [
      {
        title: "Typed end-to-end",
        body: "Document schemas are defined once in TypeScript and validated on both the client and the server.",
      },
      {
        title: "Sane offline behavior",
        body: "Edits made offline merge cleanly when the client reconnects; conflicts surface as a typed result, not a thrown exception.",
      },
      {
        title: "Boring infrastructure",
        body: "Runs on any Node host, persists to Postgres, scales horizontally with consistent hashing on room IDs.",
      },
    ],
    sections: [
      {
        id: "client",
        title: "Client",
        items: [
          {
            title: "useDocument",
            body: "A React hook that returns a typed, mutable document and a presence object. Mutations are local-first and replicated automatically.",
          },
          {
            title: "useCursors",
            body: "Multi-cursor rendering with name labels, throttled to 16ms by default and pluggable for custom render layers.",
          },
          {
            title: "Offline queue",
            body: "Outbound edits buffer to IndexedDB when the socket drops and flush on reconnect with deterministic ordering.",
          },
        ],
      },
      {
        id: "server",
        title: "Server",
        items: [
          {
            title: "Room sharding",
            body: "Rooms are sharded by consistent hash across worker processes; cross-shard subscriptions are handled by a thin proxy layer.",
          },
          {
            title: "Persistence adapter",
            body: "Pluggable storage — Postgres ships first-party, with adapters for SQLite, S3-compatible blob storage, and Redis-backed snapshots.",
          },
        ],
      },
      {
        id: "tooling",
        title: "Tooling",
        items: [
          {
            title: "Time-travel inspector",
            body: "A devtools panel that scrubs through the document timeline and shows which client authored each operation.",
          },
          {
            title: "Load harness",
            body: "A CLI that spins up N synthetic clients to verify a deployment can handle a target concurrency level before shipping.",
          },
        ],
      },
    ],
    conclusion:
      "Cactus Plant powers the realtime layer of three production apps I know of and likely a few others I don't. The next release focuses on richer schema migration tooling and a lighter client bundle.",
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails[slug];
}
