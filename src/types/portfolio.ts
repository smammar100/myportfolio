export interface Project {
  slug: string;
  title: string;
  description: string;
  cover: string;
  href: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  start: string;
  end: string;
  href: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
}

export interface AboutPhoto {
  src: string;
  alt: string;
  emoji?: string;
}

export interface ProjectGoal {
  title: string;
  body: string;
}

export interface ProjectFeatureItem {
  title: string;
  body: string;
}

export interface ProjectFeatureSection {
  id: string;
  title: string;
  items: ProjectFeatureItem[];
}

export interface ProjectDetail {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  demoUrl?: string;
  version: string;
  platform: string;
  roles: string[];
  overviewSummary: string;
  team: string;
  overviewDetail: string;
  goals: ProjectGoal[];
  sections: ProjectFeatureSection[];
  conclusion: string;
}

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  /** ISO date string, e.g. "2025-11-11". */
  date: string;
  count: number;
  level: ContributionLevel;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}
