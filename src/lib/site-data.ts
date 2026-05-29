import type {
  Project,
  ExperienceEntry,
  Article,
  AboutPhoto,
} from "@/types/portfolio";

export const profile = {
  name: "John",
  greeting: "Hi, I'm John",
  tagline:
    "Design engineer. I close the gap between the design file and the deployed product.",
  email: "hi@john.me",
  avatar: "/images/home/avatar.webp",
  githubUsername: "smammar100",
  socials: {
    twitter: "https://x.com",
    github: "https://github.com/smammar100",
  },
  githubStars: "11.2k",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Profile", href: "/about" },
  { label: "Articles", href: "/articles" },
];

export const projects: Project[] = [
  {
    slug: "mahaana",
    title: "Mahaana",
    description: "Pakistan's first SECP-licensed wealthtech site — rebuilt solo in six weeks.",
    cover: "/images/projects/mahaana/Cover.png",
    href: "/projects/mahaana",
  },
  {
    slug: "echo-ui",
    title: "Echo UI v3",
    description: "40+ headless React primitives. Zero runtime styling. Full keyboard nav and docs.",
    cover: "/images/projects/echo-ui/cover.webp",
    href: "/projects/echo-ui",
  },
  {
    slug: "justos",
    title: "JustOS",
    description: "One window, one input — tasks, calendar, and notes without the context switch.",
    cover: "/images/projects/justos/cover.svg",
    href: "/projects/justos",
  },
  {
    slug: "happy-stats",
    title: "Happy Stats",
    description: "Cookie-free analytics in under 1kb. The answer's visible before you scroll.",
    cover: "/images/projects/happy-stats/cover.webp",
    href: "/projects/happy-stats",
  },
  {
    slug: "cactus-plant",
    title: "Cactus Plant",
    description: "The layer between a websocket and a CRDT — presence, sync, and offline in one package.",
    cover: "/images/projects/cactus-plant/cover.webp",
    href: "/projects/cactus-plant",
  },
];

export const aboutParagraphs = [
  "I'm a design engineer — I design the thing and build it, usually in the same sprint. My work sits at the intersection of brand identity, product UI, and front-end code. The gap between a design file and a deployed product is where the most interesting problems live, and where I spend most of my time.",
  "My stack is TypeScript, React, Next.js, and Node — but the stack is the how, not the why. I care about the 20% of craft that templates can't reach: motion timing, type rhythm, the small interactions that make a product feel like it means what it says. The code is just the material.",
  "I've built analytics products, design systems, collaboration frameworks, and fintech marketing sites — usually solo or in small teams. I believe the most valuable thing a designer brings to an AI-assisted build is the word no. That's the part no tool can do for you.",
];

export const aboutPhotos: AboutPhoto[] = [
  {
    src: "/images/about/coding.webp",
    alt: "Person coding on laptop",
    emoji: "👨‍💻",
  },
  {
    src: "/images/about/bridge.webp",
    alt: "Golden Gate Bridge",
    emoji: "🏔️",
  },
  {
    src: "/images/about/dog.webp",
    alt: "French Bulldog",
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "Cactus Plant",
    role: "Full-stack developer",
    start: "2024",
    end: "Present",
    href: "https://cactusplant.com",
  },
  {
    company: "Happy Stats",
    role: "Full-stack developer",
    start: "2023",
    end: "2024",
    href: "https://happystats.io",
  },
  {
    company: "JustOS",
    role: "Frontend developer",
    start: "2021",
    end: "2023",
    href: "https://justos.dev",
  },
  {
    company: "Freelance",
    role: "Frontend developer",
    start: "2019",
    end: "2021",
    href: "https://upwork.com",
  },
];

export const skills = [
  "React / Next.js",
  "TypeScript / JavaScript (ES6+)",
  "State management (Zustand, Redux, Context)",
  "Responsive design & accessibility",
  "Motion & interaction (Framer Motion, GSAP)",
  "API integration & data fetching",
  "Node.js / Express / Fastify",
  "RESTful & GraphQL API design",
  "PostgreSQL / Prisma ORM",
  "Authentication & authorization",
  "WebSockets & real-time systems",
];

export const articles: Article[] = [
  {
    slug: "scaling-side-project",
    title: "Scaling a side project to 10k users",
    excerpt:
      "What started as a weekend idea slowly turned into a product used by thousands. Here's what I learned about scaling infrastructure, support, and myself along the way.",
    date: "Nov 4, 2025",
    href: "/articles/scaling-side-project",
  },
  {
    slug: "vanilla-javascript",
    title: "Why I still love writing vanilla JavaScript",
    excerpt:
      "Even with frameworks evolving every month, I keep coming back to plain JavaScript. There's something clarifying about leaving the abstractions behind.",
    date: "Nov 1, 2025",
    href: "/articles/vanilla-javascript",
  },
  {
    slug: "thinking-in-components",
    title: "Thinking in components",
    excerpt:
      "Building modern interfaces isn't about pages anymore — it's about systems. Thinking in components changes how you design, document, and ship.",
    date: "Oct 25, 2025",
    href: "/articles/thinking-in-components",
  },
  {
    slug: "cost-of-over-engineering",
    title: "The cost of over-engineering",
    excerpt:
      "Sometimes we build systems so flexible that no one can understand them later. A reminder that clarity beats cleverness almost every time.",
    date: "Oct 20, 2025",
    href: "/articles/cost-of-over-engineering",
  },
];
