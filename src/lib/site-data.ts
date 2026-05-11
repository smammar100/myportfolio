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
    "Full-stack developer who loves building things from idea to launch.",
  email: "hi@john.me",
  avatar: "/images/home/avatar.webp",
  socials: {
    twitter: "https://x.com",
    github: "https://github.com",
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
    slug: "echo-ui",
    title: "Echo UI v3",
    description: "Component library & design system",
    cover: "/images/projects/echo-ui/cover.webp",
    href: "/projects/echo-ui",
  },
  {
    slug: "justos",
    title: "JustOS",
    description: "Productivity OS for Creators",
    cover: "/images/projects/justos/cover.svg",
    href: "/projects/justos",
  },
  {
    slug: "happy-stats",
    title: "Happy Stats",
    description: "Lightweight analytics dashboard",
    cover: "/images/projects/happy-stats/cover.webp",
    href: "/projects/happy-stats",
  },
  {
    slug: "cactus-plant",
    title: "Cactus Plant",
    description: "Realtime collaboration framework",
    cover: "/images/projects/cactus-plant/cover.webp",
    href: "/projects/cactus-plant",
  },
];

export const aboutParagraphs = [
  "I started coding out of curiosity — building small browser games and landing pages — and over time grew into a developer who loves the entire journey from an empty repo to a shipped product. There's something deeply satisfying about turning vague ideas into things people actually use.",
  "My stack includes TypeScript, React, Next.js, Node, and PostgreSQL, but I love exploring new technologies whenever a project asks for it. I care about clean abstractions, tight feedback loops, and interfaces that respect the people using them.",
  "Outside of coding, I enjoy writing, contributing to open source, and teaching others what I've learned along the way. I think the best way to deepen your own understanding is to help someone else find theirs.",
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
