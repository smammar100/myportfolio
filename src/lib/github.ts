import "server-only";

import { unstable_cache } from "next/cache";
import type {
  ContributionCalendar,
  ContributionLevel,
} from "@/types/portfolio";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

/** 12 hours — contributions don't need to be real-time. */
const REVALIDATE_SECONDS = 43200;

const CONTRIBUTIONS_QUERY = `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

/** GitHub's GraphQL enum → the 0–4 scale the UI renders. */
const LEVEL_MAP: Record<string, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

interface RawDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

interface RawCalendar {
  totalContributions: number;
  weeks: { contributionDays: RawDay[] }[];
}

interface GraphQLResponse {
  data?: {
    user: {
      contributionsCollection: { contributionCalendar: RawCalendar };
    } | null;
  };
  errors?: { message: string }[];
}

/**
 * Fetches + normalizes the contribution calendar.
 *
 * Throws on ANY failure (missing token, network error, non-200, GraphQL
 * error, unknown user). This is deliberate: it's wrapped by `unstable_cache`
 * below, and a thrown error is NOT written to the cache — so a transient
 * GitHub outage retries on the next request instead of blanking the graph
 * for the full revalidate window. Only successful results get cached.
 */
async function fetchContributions(
  username: string,
  year: number
): Promise<ContributionCalendar> {
  // Accept either name: GITHUB_TOKEN (local/.env.local, the documented
  // default) or GITGRAPH (the secret already configured on Netlify).
  const token = process.env.GITHUB_TOKEN ?? process.env.GITGRAPH;
  if (!token) {
    throw new Error("Neither GITHUB_TOKEN nor GITGRAPH is set");
  }

  // Whole calendar year (Jan 1 → Dec 31) rather than the trailing 365
  // days, so the grid reads Jan…Dec with future days simply empty —
  // matching GitHub's year view. GitHub returns all 53 weeks for this.
  const from = `${year}-01-01T00:00:00.000Z`;
  const to = `${year}-12-31T23:59:59.999Z`;

  const res = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-contribution-graph",
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { login: username, from, to },
    }),
    // unstable_cache handles persistence; don't double-cache the POST.
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `GitHub responded ${res.status} ${res.statusText}`
    );
  }

  const json = (await res.json()) as GraphQLResponse;

  if (json.errors?.length) {
    throw new Error(
      `GraphQL errors: ${json.errors.map((e) => e.message).join("; ")}`
    );
  }

  const raw = json.data?.user?.contributionsCollection.contributionCalendar;
  if (!raw) {
    throw new Error(`No contribution data for user "${username}"`);
  }

  return {
    totalContributions: raw.totalContributions,
    weeks: raw.weeks.map((week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVEL_MAP[day.contributionLevel] ?? 0,
      })),
    })),
  };
}

/**
 * Cached fetch. `unstable_cache` is used (still supported in Next 16) rather
 * than the `use cache` directive so we don't have to flip the app-wide
 * `cacheComponents` flag. The GraphQL call is a POST, which Next's fetch
 * Data Cache does not memoize automatically, so explicit caching is needed.
 * Keyed by username + year (both passed as arguments, so the year boundary
 * naturally busts the cache), revalidated every 12h. Only resolved values
 * are cached — thrown errors propagate uncached.
 */
const cachedFetch = unstable_cache(
  fetchContributions,
  ["github-contributions"],
  { revalidate: REVALIDATE_SECONDS, tags: ["github-contributions"] }
);

/** The calendar year the graph shows (the current year). */
export function contributionYear(): number {
  return new Date().getUTCFullYear();
}

/**
 * Public accessor. Wraps the cached fetch so the caller (the async footer)
 * always gets a graceful `null` on failure — the site never breaks because
 * GitHub is unreachable or the token is missing.
 */
export async function getContributions(
  username: string
): Promise<ContributionCalendar | null> {
  try {
    return await cachedFetch(username, contributionYear());
  } catch (err) {
    console.warn(
      "[github] Contribution fetch failed:",
      err instanceof Error ? err.message : err
    );
    return null;
  }
}
