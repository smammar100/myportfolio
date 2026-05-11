export const aboutHero = {
  greeting: "Hey, I'm John",
  phonetic: "/dʒɒn/",
  paragraphs: [
    "I'm a product engineer by day and a designer by night. Saying I'm passionate about my work doesn't quite capture it; I live for the details and constantly look for ways to improve, whether it's in design, code, or any other aspect of my life.",
    "When I'm not designing and building I am usually outdoors. I am an avid hiker and a casual climber, and I'll happily spend a weekend walking a coastal trail with no service.",
    "I'm also a big-time games nerd with my favourite genres being roguelikes and small narrative indies. The current rotation: Hades II, Tunic, and the occasional Slay the Spire run on the train.",
  ],
  photo: "/images/about/coding.webp",
};

export const manifesto = {
  title: "Manifesto",
  body: "Good design solves problems, it doesn't just decorate them. I focus on making digital products that work well for the people who use them. My process starts with understanding what users actually need, not what I think looks good. I ask questions, test ideas early, and iterate based on real feedback. The best interfaces feel effortless because someone spent time making them that way, sweating the details. I believe technology should make life easier, not more complicated. When aesthetics and usability work together, that's when products truly connect with people. My job is finding that balance on every project.",
};

export type ToolColor = "blue" | "amber" | "emerald";

export interface ToolEntry {
  name: string;
  color: ToolColor;
}

export const tools: ToolEntry[] = [
  { name: "Figma", color: "blue" },
  { name: "Rive", color: "blue" },
  { name: "Framer", color: "blue" },
  { name: "Spline", color: "blue" },
  { name: "React", color: "blue" },
  { name: "Motion.dev", color: "amber" },
  { name: "Shadcn UI", color: "amber" },
  { name: "Next.js", color: "amber" },
  { name: "Tailwind CSS", color: "amber" },
  { name: "TypeScript", color: "emerald" },
  { name: "Node.js", color: "emerald" },
  { name: "Vercel", color: "emerald" },
  { name: "Convex", color: "emerald" },
];

export interface Tune {
  title: string;
  artist: string;
  gradient: string;
  vinylColor: string;
}

export const tunes: Tune[] = [
  {
    title: "Sundara",
    artist: "Ásgeir",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1f2937 60%, #000 100%)",
    vinylColor: "#0a0a0a",
  },
  {
    title: "Sweet Disposition",
    artist: "The Temper Trap",
    gradient: "linear-gradient(180deg, #cbd5e1 0%, #475569 100%)",
    vinylColor: "#1f1f1f",
  },
  {
    title: "Glimpse of Us",
    artist: "Joji",
    gradient: "linear-gradient(160deg, #0e7490 0%, #fcd34d 70%, #f97316 100%)",
    vinylColor: "#0a0a0a",
  },
  {
    title: "Heat Waves",
    artist: "Glass Animals",
    gradient: "linear-gradient(160deg, #f5f5f4 0%, #d6d3d1 100%)",
    vinylColor: "#262626",
  },
  {
    title: "Holocene",
    artist: "Bon Iver",
    gradient: "linear-gradient(180deg, #92400e 0%, #1e293b 100%)",
    vinylColor: "#0a0a0a",
  },
  {
    title: "Pink + White",
    artist: "Frank Ocean",
    gradient: "linear-gradient(135deg, #f5f5f4 0%, #d4d4d4 100%)",
    vinylColor: "#1f1f1f",
  },
];
